import { headers } from "next/headers"
import SuccessPage from "../success-page" // Đã đổi tên import cho rõ ràng hơn

export default function Page() {
  const headersList = headers()
  const host = headersList.get("host") || "localhost" // Lấy tên miền hiện tại

  let userName = "V24101610(Đỗ Hồng Quân)" // Tên mặc định

  // Logic để xác định tên người dùng dựa trên tên miền
  // Bạn có thể mở rộng phần này với nhiều tên miền và tên khác nhau
  switch (host) {
    case "your-domain-1.com": // Thay thế bằng tên miền thực tế của bạn
    case "www.your-domain-1.com":
      userName = "Người dùng A (Domain 1)"
      break
    case "your-domain-2.com": // Thay thế bằng tên miền thực tế khác
    case "www.your-domain-2.com":
      userName = "Người dùng B (Domain 2)"
      break
    // Thêm các trường hợp khác nếu cần
    default:
      userName = "V24101610(Đỗ Hồng Quân)" // Mặc định cho localhost hoặc các tên miền không xác định
      break
  }

  return <SuccessPage userName={userName} />
}
