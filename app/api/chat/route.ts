import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const client = new OpenAI({
  apiKey: 'sk-f9f06505a0c647bcba8b5d643d9c9b02',
  baseURL: 'https://api.deepseek.com/v1',
})

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    
    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: messages,
    })

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: '抱歉，发生了一些错误，请稍后再试。' },
      { status: 500 }
    )
  }
} 