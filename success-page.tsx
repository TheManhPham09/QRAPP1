"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface SuccessPageProps {
  userName: string
}

export default function SuccessPage({ userName }: SuccessPageProps) {
  // Đã đổi tên component và thêm prop
  // Đã thay đổi giá trị khởi tạo của timeLeft thành 0 để đếm lên
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Đăng ký Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error)
          })
      })
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Đã thay đổi logic để tăng timeLeft lên 1 mỗi giây
      setTimeLeft((prev) => prev + 1)
    }, 1000) // Chạy mỗi 1000ms (1 giây)

    return () => clearInterval(timer) // Dọn dẹp khi component unmount
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  return (
    <div
      className="text-white relative overflow-hidden" // Đã loại bỏ min-h-screen ở đây
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        maxWidth: "414px",
        minHeight: "896px", // Đã điều chỉnh lại chiều cao tổng thể cho iPhone 11
        margin: "0 auto",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-4">
        {" "}
        {/* Đã đặt chiều cao cố định cho nội dung chính */}
        {/* Title */}
        {/* Đã điều chỉnh pt-12 thành pt-16 để di chuyển xuống thêm */}
        <div className="text-center pb-3.5 pt-3.5">
          {/* Chỉnh sửa màu chữ của tiêu đề "V24040025(Phạm Thế Mạnh)" */}
          {/* Đã đổi màu chữ sang #E0E0C0 */}
          <h1 className="text-lg font-medium text-[#E0E0C0]">{userName}</h1> {/* Sử dụng prop userName */}
        </div>
        {/* QR Card - Positioned higher */}
        <div className="flex-none mb-2.5">
          {/* Loại bỏ Card và thay bằng div với background image mới */}
          <div
            // Đã thay đổi max-w-sm thành max-w-xs để thu nhỏ khung
            className="relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundImage: "url('/card-background.png')",
              backgroundSize: "100% 100%", // Kéo dãn ảnh để vừa khung
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              // Đã điều chỉnh paddingTop và paddingBottom để thu nhỏ khung theo chiều dọc
              paddingTop: "10%", // Giảm khoảng cách cho phần màu vàng ở trên
              paddingBottom: "2%", // Giảm khoảng cách cho phần dưới
            }}
          >
            {/* Header content - đặt trực tiếp vào div này */}
            <div className="absolute top-0 left-0 right-0 px-5 text-center py-5">
              {/* Chỉnh sửa màu chữ của tiêu đề trong card (将二维码对准扫描器刷码出场) */}
              {/* Đã thay đổi nội dung và đảm bảo căn giữa */}
              {/* Đã thêm mt-[2px] để di chuyển xuống 2mm */}
              <p className="text-white font-medium text-base mt-[2px] border-0 tracking-widest">
                将二维码对准扫描器刷码出场
              </p>
            </div>

            {/* Content - đặt trực tiếp vào div này */}
            <div className="px-6 text-center text-black pb-0 pt-0 leading-3 pl-6 mx-0">
              {" "}
              {/* Đặt màu chữ đen cho nội dung bên trong */}
              {/* Timestamp */}
              {/* Đã điều chỉnh mt-8 thành mt-10 để di chuyển xuống thêm */}
              <div className="font-mono text-black border-0 px-0 tracking-normal mt-14 mb-px text-base">
                {formatDateTime(currentTime)}
              </div>
              {/* QR Code */}
              <div className="flex justify-center mb-4">
                {/* Đã loại bỏ viền của hình ảnh QR */}
                {/* Đã điều chỉnh kích thước mã QR từ w-56 h-56 thành w-64 h-64 */}
                <div className="bg-white rounded-lg flex items-center justify-center p-2 flex-row w-full h-full py-0 px-0">
                  <img src="/qr-code.png" alt="QR Code" className="w-full h-full object-contain" />
                </div>
              </div>
              {/* Refresh Button */}
              {/* Chỉnh sửa màu chữ của nút làm mới (刷新二维码) */}
              {/* Đã loại bỏ icon RefreshCw */}
              <Button variant="ghost" className="text-gray-600 hover:text-gray-800 p-0 h-auto font-normal mb-1.5">
                刷新二维码
              </Button>
              {/* Status */}
              <div className="space-y-2 leading-7">
                {/* Chỉnh sửa màu chữ của trạng thái (已生效) và loại bỏ font-semibold */}
                <div className="text-green-500 font-normal text-lg blink-text leading-3">已生效</div>
                {/* Chỉnh sửa màu chữ của bộ đếm thời gian (04:53) và loại bỏ font-bold */}
                <div className="text-green-500 font-mono font-normal text-lg">{formatTime(timeLeft)}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Text - Positioned at bottom */}
        <div className="flex-1 flex items-end pb-8">
          <div className="w-full px-4 text-center">
            {/* Chỉnh sửa màu chữ của thông báo bảo mật ở cuối trang */}
            <p className="text-[#E0E0C0] text-sm leading-relaxed">
              尊敬的员工您好，您已进入企业涉密区域，出于企业安全考虑，您的手机摄像头将被禁止拍摄，感谢您的配合。
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 30% { opacity: 1; }
          51%, 100% { opacity: 0; } /* Đã thay đổi từ 0.3 thành 0 để biến mất hoàn toàn */
        }
        .blink-text {
          animation: blink 1.5s infinite;
        }
      `}</style>
    </div>
  )
}
