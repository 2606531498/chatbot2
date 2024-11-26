'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function SponsorButton() {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="fixed bottom-20 right-4">
      <button
        onClick={() => setShowQR(true)}
        className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600"
        title="赞助支持"
        aria-label="打开赞助窗口"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">支持作者</h3>
            
            {/* 收款码显示 */}
            <div className="flex justify-center items-center mb-4">
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src="/images/wechat.png"
                  alt="微信收款码"
                  width={550}
                  height={550}
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
            </div>

            <p className="text-center text-gray-600 mb-4">
              如果这个项目对您有帮助，欢迎赞助支持！
            </p>

            <button
              onClick={() => setShowQR(false)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}