# AI Social Listener

## Tổng Quan

**AI Social Listener** là một công cụ được thiết kế để tự động thu thập, phân tích và đánh giá cảm xúc liên quan đến các nội dung thương hiệu trên các nền tảng mạng xã hội. Công cụ này tích hợp các mô hình AI để phân tích cảm xúc của các bài đăng trên mạng xã hội (tích cực, tiêu cực hoặc trung lập) và theo dõi các xu hướng mới nổi, giúp các doanh nghiệp và cá nhân có cái nhìn sâu sắc về dư luận, phát hiện xu hướng và quản lý danh tiếng trực tuyến một cách hiệu quả.

## Vấn Đề

Với sự phát triển nhanh chóng của các nền tảng mạng xã hội, lượng dữ liệu người dùng tạo ra ngày càng lớn và phân tán trên các nền tảng như Facebook, Instagram, TikTok, YouTube, v.v. Việc thu thập và phân tích dữ liệu này để hiểu được cảm xúc của người dùng và phát hiện các xu hướng mới trở nên rất khó khăn và tốn kém. Đặc biệt, việc phân biệt giữa thông tin chính xác và thông tin sai lệch cũng là một thách thức lớn đối với các doanh nghiệp.

## Giải Pháp

**AI Social Listener** sẽ tự động thu thập dữ liệu từ các nền tảng mạng xã hội thông qua công cụ tự động hóa n8n và API. Sau đó, sử dụng các mô hình AI tiên tiến để phân tích cảm xúc của các bài đăng, phân loại nội dung và xác định các xu hướng mới. Dữ liệu đã được xử lý sẽ được trình bày trên một bảng điều khiển web trực quan, giúp người dùng theo dõi các xu hướng và cảm xúc liên quan đến thương hiệu.

### Các Tính Năng Chính
- **Thu Thập Dữ Liệu**: Tự động thu thập các bài đăng từ các nền tảng mạng xã hội bằng n8n và API.
- **Phân Tích Cảm Xúc**: Sử dụng AI để phân loại các bài đăng là tích cực, tiêu cực hoặc trung lập.
- **Phát Hiện Xu Hướng**: Xác định các xu hướng mới dựa trên tần suất và cảm xúc của bài viết.
- **Bảng Điều Khiển Tùy Biến**: Hiển thị dữ liệu qua các biểu đồ, với khả năng lọc theo chủ đề, cảm xúc và thời gian.
- **Thông Báo Thực Thời**: Cảnh báo người dùng khi có xu hướng mới hoặc thay đổi quan trọng.

## Công Nghệ Sử Dụng

- **n8n**: Công cụ tự động hóa thu thập dữ liệu qua API.
- **Puppeteer/Selenium**: Công cụ web scraping khi API bị hạn chế.
- **Google Gemini**: Mô hình AI để phân tích cảm xúc và chủ đề.
- **ReactJS**: Framework frontend để xây dựng giao diện người dùng.
- **ExpressJS**: Framework backend.
- **MongoDB**: Cơ sở dữ liệu lưu trữ dữ liệu thu thập được.
- **Web Unlocker (Bright Data)**: Vượt qua CAPTCHA và proxy khi cần.

## Phương Pháp

- **Thu Thập Dữ Liệu**: Công cụ sử dụng n8n để thu thập dữ liệu từ các API mạng xã hội hoặc sử dụng web scraping bằng Puppeteer/Selenium khi API bị giới hạn.
- **Phân Tích Dữ Liệu**: Phân tích cảm xúc và phân loại chủ đề được thực hiện bằng các mô hình AI như Google Gemini.
- **Bảng Điều Khiển**: Giao diện web hiển thị kết quả phân tích qua các biểu đồ và đồ thị.
- **Kiểm Thử**: Sử dụng phương pháp kiểm thử k-fold cross-validation để đánh giá hiệu suất mô hình.

## Đối Tượng Sử Dụng

- **Doanh Nghiệp**: Các công ty muốn có cái nhìn tổng quan về cảm xúc khách hàng, xu hướng thị trường và phân tích đối thủ cạnh tranh.
- **Cá Nhân**: Những người có ảnh hưởng trên mạng xã hội hoặc người sáng tạo nội dung muốn theo dõi tác động của thương hiệu cá nhân.
- **Nhà Tiếp Thị**: Những người muốn sử dụng dữ liệu mạng xã hội để hình thành chiến lược marketing.

## Các Giai Đoạn Phát Triển

1. **Nghiên Cứu Thị Trường & Phân Tích**: Tìm hiểu nhu cầu người dùng và các công cụ đối thủ.
2. **Huấn Luyện Mô Hình AI**: Phát triển và huấn luyện các mô hình phân tích cảm xúc và phát hiện xu hướng.
3. **Phát Triển Hệ Thống**: Xây dựng hệ thống thu thập và xử lý dữ liệu, tạo bảng điều khiển web.
4. **Kiểm Thử & Tối Ưu Hóa**: Kiểm thử hệ thống để tối ưu độ chính xác và hiệu suất.
5. **Beta Testing**: Thử nghiệm với nhóm người dùng nhỏ để cải thiện sản phẩm.
6. **Ra Mắt**: Phát hành sản phẩm chính thức.

## Tính Khả Thi

Dự án sử dụng công nghệ AI, tự động hóa và web scraping để cung cấp một giải pháp mở rộng cho việc theo dõi và phân tích mạng xã hội. Sự kết hợp giữa các công nghệ này giúp sản phẩm hoạt động hiệu quả trên nhiều nền tảng mà không cần can thiệp thủ công.

## Tác Động Và Ý Nghĩa

Công cụ này giúp doanh nghiệp, cá nhân và nhà tiếp thị dễ dàng thu thập và đánh giá cảm xúc trên các nền tảng mạng xã hội, từ đó đưa ra chiến lược kinh doanh và marketing chính xác hơn. Đồng thời, nó cũng giúp lọc bỏ thông tin sai lệch và giảm thiểu tác động của thông tin gây nhiễu.

## Nghiên Cứu Thị Trường & Đối Tượng

Việc hiểu và lắng nghe khách hàng qua các công cụ lắng nghe xã hội AI ngày càng trở thành lợi thế cạnh tranh quan trọng. Các công cụ này giúp các doanh nghiệp phản ứng kịp thời với các xu hướng và sự thay đổi trong thị trường, tiết kiệm thời gian và tăng trưởng doanh thu.

## Hướng Dẫn Cài Đặt

### Yêu Cầu
- Node.js (để phát triển backend)
- MongoDB (cho cơ sở dữ liệu)
- ReactJS (cho frontend)

### Cài Đặt

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/ai-social-listener.git```
2. Cài đặt các phụ thuộc:
```cd ai-social-listener
    npm install```
3. Cấu hình các biến môi trường (API keys, credentials cơ sở dữ liệu, v.v.).
4. Chạy ứng dụng:
```npm start```