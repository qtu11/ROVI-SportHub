
# ⚡ ROVI Sporthub — Nền tảng Quản trị & Kết nối Thể thao Đa năng

[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Project Status](https://img.shields.io/badge/iVentures_Launchpad-2026_Project-sky?style=for-the-badge)](#)

**ROVI Sporthub** là giải pháp SaaS (Software-as-a-Service) toàn diện được thiết kế chuyên biệt nhằm số hóa toàn bộ hoạt động vận hành của các câu lạc bộ và cụm sân thể thao đa bộ môn (**B2B Tenant**), đồng thời kết nối trực tiếp với cộng đồng vận động viên phong trào (**B2C**). 

Hệ thống sở hữu ngôn ngữ thiết kế **Dark Tech / Ethereal Glass** cao cấp, mượt mà kết hợp cùng các thành phần toán học và hiệu ứng tương tác 3D Canvas trực quan.

---

## 🛠️ Hạ Tầng & Công Nghệ Core

| Lớp công nghệ | Khối thành phần đảm nhiệm | Chức năng chi tiết |
| :--- | :--- | :--- |
| **Framework** | Next.js 14.2 (App Router), React 18, TypeScript | Tối ưu SSR/ISR, kiến trúc thư mục modulized bảo mật cao, type-safe tuyệt đối từ API Contract đến Client UI. |
| **Styling Lõi** | Tailwind CSS v3, CSS Native Variables | Xử lý giao diện Glassmorphic nâng cao, cơ chế lọc mờ (Frosted glass) mượt mà trên đa trình duyệt. |
| **Engine 3D** | HTML5 Canvas & Pure JavaScript Math | Tạo dựng mô hình quả cầu mạng thể thao 3D (Wireframe Sports Ball) và hệ thống hạt (Particle system) tự cấp nguồn, tương tác thời gian thực theo tọa độ chuột mà không gây tụt FPS. |
| **Đồ Họa Động** | CSS 3D Transforms | Xử lý hiệu ứng lật/nghiêng động (Dynamic Card Tilt effect) dựa trên tương tác chuột. |
| **Data Viz** | Recharts Engine | Hệ thống biểu đồ tài chính tùy chỉnh tuyến tính, tích hợp Gradient sắc độ tối và Custom Tooltip kính mờ. |
| **Icon Set** | Lucide React | Thư viện Vector Icons chuẩn hóa phân giải hiển thị. |

---

## 💎 Phân Hệ Chức Năng Chính

### 1. Phân hệ B2B Tenant Dashboard (Hệ quản trị chủ sân)

*   **Tổng quan Vận hành Realtime:** Chỉ số trực quan hóa (Báo cáo doanh thu, công suất lấp đầy sân thực tế, số lượng slot đặt trong ngày, trạng thái sân giờ vàng).
*   **Dòng thời gian Đặt sân (Dynamic Booking Timeline):** Hệ thống lưới hiển thị trực quan trạng thái đặt lịch được phân loại màu thông minh (`Online Booking`, `Walk-in`, `Tournament Schedule`, `Maintenance Mode`) tích hợp đường chỉ giờ hiện tại (Current Timeline Line) tự động dịch chuyển theo phút.
*   **Quản lý Sân bãi Đa tầng:** Cấu hình loại mặt sân (Sân sàn gỗ, thảm cao su, cỏ nhân tạo), bộ môn hỗ trợ (Cầu lông, Pickleball, Bóng đá), quản lý bảng giá bậc thang (Giờ thường vs Giờ vàng) và đo lường hiệu suất khai thác riêng biệt từng sân.
*   **Lịch trình Thông minh & Đặt lịch Nhanh:** Xem lịch theo chế độ Ngày/Tuần mượt mà, hỗ trợ tạo nhanh lịch đặt/chỉnh sửa thông tin ngay lập tức thông qua Drawer Panel tích hợp bên phải màn hình.
*   **Hệ thống Quản lý Giải đấu (Automated Tournaments):** Tự động sinh sơ đồ thi đấu (Tournament Bracket Generator), theo dõi số lượng đội, cập nhật tỉ số trực tiếp và xuất báo cáo xếp hạng tự động.
*   **Điều phối Nhân sự:** Phân ca làm việc tự động (Sáng, Chiều, Tối) và theo dõi trạng thái điểm danh thời gian thực của nhân viên trực cụm sân.
*   **AdMarketplace (Quản lý Tài trợ):** Quản lý không gian hiển thị banner, đo lường lượt hiển thị (Impressions) và kiểm soát ngân sách chiến dịch từ các thương hiệu đồng hành.
*   **Báo cáo Tài chính Phức hợp:** Biểu đồ cột phân tích nguồn thu (Tiền sân, Dịch vụ đi kèm, Quảng cáo) kết hợp biểu đồ tròn giải mã hành vi thanh toán (Ví điện tử, QR Code động, Tiền mặt).

### 2. Trang chủ Landing Page (Cổng kết nối B2C)

*   **Interactive 3D Mesh World:** Background quả cầu mạng 3D xoay tự động quanh trục cố định, phản hồi quán tính (Dịch chuyển và thay đổi tiêu cự góc nhìn) dựa trên hành vi cuộn trang và di chuột của người dùng.
*   **ThreeDTilt Cards:** Các thẻ tính năng cốt lõi và gói bảng giá dịch vụ tự động tính toán góc nghiêng 3D theo góc tiếp cận của trỏ chuột, tạo chiều sâu vật lý học cho giao diện phẳng.
*   **Logo Wall Đồng bộ:** Tích hợp hệ thống nhận diện đối tác chiến lược bằng định dạng SVG đơn sắc gốc, tự động phát xạ nhẹ (Glow Effect) khi hover.

---

## 🎨 Kiến Trúc Giao Diện & Quy Tắc Thiết Kế (Design Directives)

### 1. Hệ thống Phông chữ (Typography Matrix)
Tích hợp trực tiếp thông qua gói `next/font/google` giúp tối ưu hóa tối đa tốc độ tải trang ban đầu và triệt tiêu hiện tượng FOUT (Flash of Unstyled Text):
*   `Outfit`: Font chữ hiển thị chính (Display Hero, Display Title, Card Heading) mang đường nét hình học khỏe khoắn, đậm chất thể thao công nghệ tương lai.
*   `Space Grotesk`: Dành riêng cho các nhãn phụ (Labels), thông số kỹ thuật, ký hiệu tiền tệ và dữ liệu số (`font-space`).
*   `Inter`: Font chữ tiêu chuẩn cho các khối nội dung, văn bản dài, văn bản hướng dẫn nhằm đảm bảo độ đọc (Readability) tốt nhất ở kích thước nhỏ.

### 2. Cấu trúc Doppelrand (Double-Bezel Architecture)

> 💡 **Triết lý thiết kế:** Để tạo ra chiều sâu không gian (Depth) trong môi trường Dark Theme mà không làm tăng độ tương phản gây nhức mắt, ROVI Sporthub áp dụng cấu trúc viền kép vật lý:

*   **Lớp ngoài (`bezel-outer`):** Đóng vai trò là khung xương kính mờ sẫm màu với viền siêu mảnh ($1\text{px}$) có màu sắc phản xạ ánh sáng (Border-slate-900/Sky) kết hợp đổ bóng phát quang nhẹ (`box-shadow`).
*   **Lớp trong (`bezel-inner`):** Đóng vai trò là lòng chứa nội dung, có màu nền sẫm hơn lớp ngoài $1$ tông màu, tạo cảm giác lõm vật lý sâu xuống dưới bề mặt, giúp thông tin hiển thị nổi bật và tập trung tuyệt đối.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Khởi tạo môi trường
Đảm bảo máy tính của bạn đã cài đặt NodeJS (Khuyến nghị phiên bản LTS mới nhất).

**1. Cài đặt các gói phụ thuộc:**
```bash
npm install

```

**2. Chạy ứng dụng trong môi trường phát triển (Development):**

```bash
npm run dev

```

Sau khi chạy lệnh, truy cập hệ thống tại: `http://localhost:3000`

**3. Biên dịch ứng dụng tối ưu hóa cho môi trường sản xuất (Production Build):**

```bash
npm run build

```

**4. Khởi chạy ứng dụng bản Production:**

```bash
npm start

```

---

🎯 Dự án được phát triển và bảo vệ bởi Đội ngũ kỹ sư **ROVI Sporthub** tại cuộc thi **iVentures Launchpad 2026**. Bảo lưu mọi quyền đối với cấu trúc mã nguồn và thiết kế giao diện.

```

```