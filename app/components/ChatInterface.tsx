'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css' // 代码高亮样式

// 添加类型定义
type CodeProps = {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{role: string, content: string, timestamp?: Date}>>([
    { role: 'assistant', content: '你好！我是AI助手，有什么我可以帮你的吗？', timestamp: new Date() },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      setIsLoading(true)
      // 添加用户消息
      const userMessage = { role: 'user', content: input.trim(), timestamp: new Date() }
      setMessages(prev => [...prev, userMessage])
      setInput('')

      // 准备发送给 API 的消息格式
      const apiMessages = messages.concat(userMessage).map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      // 调用我们的 API 路由
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error('API 请求失败')
      }

      const data = await response.json()

      // 添加 AI 回复
      const assistantMessage = {
        role: 'assistant',
        content: data.content || '抱歉，我现在无法回答。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('API 调用错误:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，发生了一些错误，请稍后再试。',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const MessageContent = ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        className="prose prose-sm max-w-none dark:prose-invert"
        components={{
          // 自定义段落样式
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          // 自定义代码块样式
          code: ({ node, inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="relative group">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ''))}
                    className="text-xs px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                  >
                    复制
                  </button>
                </div>
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            ) : (
              <code className="px-1 py-0.5 rounded bg-gray-100 text-gray-800" {...props}>
                {children}
              </code>
            )
          },
          // 自定义列表样式
          ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
          // 自定义标题样式
          h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
          // 自定义链接样式
          a: ({ children, href }) => (
            <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* 聊天消息区域 */}
      <div className="h-[600px] overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>开始一段新的对话吧</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
            >
              {/* 头像 */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-blue-500 flex items-center justify-center text-white' 
                  : 'bg-gray-100 flex items-center justify-center'
              }`}>
                {message.role === 'user' ? '我' : 'AI'}
              </div>
              
              {/* 消息气泡 */}
              <div className="flex flex-col">
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.role === 'user' ? (
                    message.content
                  ) : (
                    <MessageContent content={message.content} />
                  )}
                </div>
                {message.timestamp && (
                  <span className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <form 
          className="flex space-x-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100"
            placeholder={isLoading ? "AI正在思考中..." : "输入您的问题... (按Enter发送)"}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center disabled:bg-blue-300"
          >
            <span>{isLoading ? '发送中...' : '发送'}</span>
          </button>
        </form>
      </div>
    </div>
  )
} 