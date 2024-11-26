import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const API_ENDPOINTS = {
  primary: 'https://api.deepseek.com/v1',
  backup: 'https://api-backup.deepseek.com/v1'  // 假设的备用地址
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-f9f06505a0c647bcba8b5d643d9c9b02',
  baseURL: API_ENDPOINTS.primary,
});

export async function POST(request: Request) {
  let lastError;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const { messages } = await request.json()
      
      const response = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: messages,
      })

      return NextResponse.json(response.choices[0].message)
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error)
      lastError = error
      await sleep(RETRY_DELAY * (i + 1)) // 指数退避
    }
  }

  return NextResponse.json(
    { error: '网络连接不稳定，请稍后重试。' },
    { status: 500 }
  )
} 