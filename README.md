# JavaScript Labs

## 1. Thông tin sinh viên

- Họ tên: Vũ Trọng Huy
- MSSV: 31241022181
- Lớp học phần: 26C1INF50902702
- Học phần: Phát triển ứng dụng Thương mại điện tử

## 2. Giới thiệu bài thực hành

Thư mục này tổng hợp ba bài thực hành JavaScript của học phần: lập trình JavaScript cơ bản, thao tác DOM và xử lý sự kiện, và sử dụng thư viện jQuery để xây dựng các chức năng tương tác trên website.

## 3. Nội dung ba Lab

- **Lab 08 - JavaScript 1: Language Foundations**: cú pháp JavaScript cơ bản, biến, kiểu dữ liệu, String/Date/Array/Object, hàm và Browser Console.
- **Lab 09 - JavaScript 2: DOM and Events**: truy xuất và chỉnh sửa phần tử qua DOM, thêm/xóa phần tử, xử lý sự kiện (click, mouseover, mouseout), tương tác form và kiểm tra dữ liệu đầu vào.
- **Lab 10 - JavaScript 3: jQuery**: jQuery Selectors, xử lý sự kiện và thao tác DOM bằng jQuery, hiệu ứng Fade/Slide/Animate, GET Requests với `$.get()`, `$.each()` và xử lý jqXHR.

## 4. Cấu trúc thư mục

```text
JavaScript-Labs/
├── index.html
├── README.md
├── css/
│   └── style.css
├── images/
│   └── anhcanhan.jpg
├── Lab08/
│   └── index.html
├── Lab09/
│   └── index.html
└── Lab10/
    └── index.html
```

## 5. Hướng dẫn truy cập

1. Mở `index.html` tại thư mục `JavaScript-Labs` để xem trang chủ.
2. Chọn Lab 08, Lab 09 hoặc Lab 10 từ trang chủ.
3. Từ trang `index.html` của từng Lab, truy cập các Exercise tương ứng.
4. Sau khi có GitHub Pages, có thể truy cập trực tuyến bằng liên kết được cập nhật ở mục 6.

## 6. Các tài nguyên gốc đã được thay thế

Trong quá trình thực hành, một số tài nguyên gốc theo tài liệu hướng dẫn không còn truy cập được, nên đã được thay thế như sau:

- **Lab 08 - Exercise 8.1 (Enabling/Disabling JavaScript)**: website gốc `http://examples.funwebdev.com/JavaScriptTest.php` bị lỗi phân giải DNS (đã kiểm tra bằng trình duyệt và `nslookup`, kể cả với DNS 8.8.8.8). Đã thay thế bằng trang cục bộ [`Lab08/kiemtra-js.html`](Lab08/kiemtra-js.html), dùng `<script>` để hiển thị thông báo khi JavaScript được bật và `<noscript>` khi JavaScript bị tắt.
- **Lab 10 - Exercise 10.9 và 10.10 (GET Requests / jqXHR Handling)**: API gốc `http://www.randyconnolly.com/funwebdev/services/travel/cities.php` bị lỗi `ERR_CONNECTION_TIMED_OUT`. Đã thay thế bằng Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search?...`) và cập nhật lại cấu trúc dữ liệu đọc từ `data.results` (thay vì `data[i]` như API gốc).
- **Lab 10 - Exercise 10.1 (Set Up jQuery)**: jQuery được tải qua CDN (`code.jquery.com`), kèm cơ chế dự phòng tự động tải file jQuery cục bộ (`Lab10/js/jquery-3.1.1.min.js`) nếu CDN không khả dụng.

## 7. Liên kết GitHub

- GitHub cá nhân: [github.com/vutronghuy0515-hash](https://github.com/vutronghuy0515-hash)
- GitHub Repository: [github.com/vutronghuy0515-hash/BTVN](https://github.com/vutronghuy0515-hash/BTVN) (sẽ chứa thư mục `JavaScript-Labs`)
- GitHub Pages: Chưa cập nhật (dự kiến dạng `https://vutronghuy0515-hash.github.io/BTVN/JavaScript-Labs/` sau khi triển khai).
