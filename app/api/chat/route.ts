import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const TIMEOUT = 30000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const API_ENDPOINTS = [
  'https://api.deepseek.com/v1',
  'https://api-backup.deepseek.com/v1',
  'https://api-fallback.deepseek.com/v1'
];

export async function POST(request: Request) {
  let lastError;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    for (const endpoint of API_ENDPOINTS) {
      try {
        const client = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY || 'sk-f9f06505a0c647bcba8b5d643d9c9b02',
          baseURL: endpoint,
          timeout: TIMEOUT,
        });

        const { messages } = await request.json()
        const response = await client.chat.completions.create({
          model: 'deepseek-chat',
          messages: messages,
        })

        return NextResponse.json(response.choices[0].message)
      } catch (error) {
        console.error(`Attempt ${i + 1} with ${endpoint} failed:`, error)
        lastError = error
        await sleep(RETRY_DELAY * (i + 1))
        continue
      }
    }
  }

  return NextResponse.json(
    { error: '网络连接不稳定，请稍后重试。' },
    { status: 500 }
  )
} 