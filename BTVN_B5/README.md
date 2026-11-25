# 📘 BÀI TẬP THỰC HÀNH – PHÁT TRIỂN ỨNG DỤNG THƯƠNG MẠI ĐIỆN TỬ

**BTVN_B5 · Chương 6: Advanced FrontEnd · Nhóm 2 – Áp dụng vào tình huống thực tế**

🌐 **Xem trực tiếp:** <https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/>
📂 **Mã nguồn:** <https://github.com/vutronghuy0515-hash/BTVN-main/tree/main/BTVN_B5>

---

## 📋 Thông tin môn học

| Mục | Nội dung |
|---|---|
| Học phần | Phát triển ứng dụng Thương mại điện tử |
| Trường | Đại học Kinh tế TP. Hồ Chí Minh (UEH) |
| Giảng viên | TS. Nguyễn Mạnh Tuấn |
| Chương | Chương 6 – Advanced FrontEnd |
| Nhóm bài tập | Nhóm 2 – Áp dụng vào tình huống thực tế |
| Sinh viên thực hiện | _(Họ tên – MSSV)_ |

### 🎯 Mục đích bài tập

- Vận dụng **Bootstrap 3** (Grid, Navbar, Carousel, List Group, Thumbnail, Progress Bar) để xây dựng giao diện website TMĐT responsive.
- Tích hợp thư viện jQuery bên ngoài: **xZoom** (phóng to ảnh sản phẩm) và **Bootstrap Star Rating** (đánh giá sao).
- Dùng **jQuery** để đọc và xử lý dữ liệu trên một trang web thực tế (LMS UEH).
- Dùng **jQuery + `setInterval`** để hoàn thiện một trò chơi trên trình duyệt (Flappy Bird).

---

## 🗂️ Tổng hợp các bài tập

| # | Bài tập | Mô tả ngắn | Truy cập |
|---|---|---|---|
| 1 | 🛍️ **E-commerce – Mây Basic** | Website cửa hàng thời trang basic: trang danh sách sản phẩm, trang chi tiết sản phẩm, trang trạng thái đơn hàng | [Cửa hàng](https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/ecommerce/ecommerce.html) · [Chi tiết](https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/ecommerce/ecommerce-detail.html) · [Đơn hàng](https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/ecommerce/ecommerce-status.html) |
| 2 | 📊 **jQuery cho LMS-UEH** | Script chạy trong Console của trang môn học LMS: in bài tập thứ 5, liệt kê chủ đề, bài tập và deadline | [Mã nguồn](jquery-lms/lms-assignments.js) · [Hướng dẫn](jquery-lms/README.md) |
| 3 | 🐦 **Flappy Bird** | Game Flappy Bird bằng jQuery, có Level, điều khiển bằng phím ↓, màn hình chiến thắng ở 50 điểm | [Chơi game](https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/flappy-bird/index.html) |

> 💡 Trang tổng hợp [`index.html`](https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/) có nút mở nhanh cả 3 bài.

---

## 1️⃣ Bài 1 – E-commerce: Cửa hàng thời trang Mây Basic

Xây dựng theo tài liệu hướng dẫn *Building an E-Commerce Website with Bootstrap* của giảng viên. Loại hình kinh doanh được chọn là **cửa hàng thời trang basic** (áo thun, áo sơ mi, quần, áo khoác, váy, phụ kiện), giá bán tính bằng VNĐ.

### 📄 `ecommerce.html` – Trang danh sách sản phẩm

- **Navigation** (Bootstrap Navbar): logo Mây Basic, menu Trang chủ, dropdown Danh mục, Đơn hàng, ô tìm kiếm, biểu tượng giỏ hàng có số lượng, liên kết Tài khoản. Có nút thu gọn menu trên Mobile; ô tìm kiếm riêng cho Mobile (`visible-xs`) và Desktop (`hidden-xs`).
- **Carousel**: 3 banner bộ sưu tập, có nút chuyển trái/phải và chấm chỉ số.
- **Categories** (List Group): 7 mục, số lượng sản phẩm mỗi danh mục được jQuery tự đếm; bấm vào để lọc sản phẩm.
- **Product Listing**: 9 sản phẩm, bố cục `col-sm-4 col-md-3` (sidebar) và `col-sm-8 col-md-9` (sản phẩm), mỗi sản phẩm `col-sm-6 col-md-4` (3 sản phẩm/hàng trên Desktop). Mỗi sản phẩm có ảnh, tên, mô tả, giá bán, giá gốc, đánh giá sao, số lượt đánh giá và nút (+) thêm vào giỏ.
- **% giảm giá** ở góc trên bên trái ảnh, tính tự động: `(giá gốc − giá bán) / giá gốc × 100`.
- **Nhãn New / Best Seller** ở góc trên bên phải ảnh.
- **Trạng thái kho** bằng **Bootstrap Progress Bar**: hiển thị "Đã bán X", chuyển sang màu đỏ "Sắp bán hết" khi đã bán từ 80% số lượng.
- **Tìm kiếm** theo tên sản phẩm; tìm từ trang khác sẽ chuyển về trang này kèm từ khóa (`?q=`).

### 📄 `ecommerce-detail.html` – Trang chi tiết sản phẩm

- **xZoom**: ảnh chính (`.xzoom` + `xoriginal`) và 4 ảnh nhỏ (`.xzoom-gallery` + `xpreview`). Bấm ảnh nhỏ để đổi ảnh chính, rê chuột vào ảnh chính để phóng to. Ảnh lớn 1500×1200 dùng để zoom.
- **Thông tin và form**: tên, giá, giá gốc, % giảm, mô tả; chọn số lượng, màu sắc (đổi màu thì đổi ảnh tương ứng) và kích thước XS–XL.
- **Contact Seller** hiển thị thông tin liên hệ mẫu; **Add to Cart** kiểm tra đã chọn kích thước, hiện thông báo và cộng số lượng vào giỏ hàng trên Navigation.
- **Đánh giá**: mô tả, điểm trung bình, số lượt đánh giá, nút **Leave a Review** mở form chọn sao, nhập tên và nhận xét. Gửi đánh giá sẽ thêm bình luận mới và tính lại điểm trung bình.
- **Comments**: danh sách bình luận của khách hàng.
- **Other Products**: 3 sản phẩm liên quan.

### 📄 `ecommerce-status.html` – Trang trạng thái đơn hàng

- **Sidebar Manage Orders**: All Order, Manage Feedback, My Coupons, My Shipping Address; bấm để chuyển nội dung hiển thị.
- **Orders Status**: 6 đơn hàng mẫu, mỗi đơn gồm ảnh, tên sản phẩm, mã đơn, số lượng, giá, nhãn trạng thái, nút **Track / Completed / Cancelled** và số tin nhắn. Nút **Track** mở/đóng thông tin vận chuyển của đơn.

### ⭐ Bootstrap Star Rating thay cho `glyphicon-star`

Toàn bộ biểu tượng `glyphicon-star` / `glyphicon-star-empty` dùng cho đánh giá đã được thay bằng thư viện **Bootstrap Star Rating (Kartik)**: chế độ chỉ đọc (`displayOnly`) cho danh sách sản phẩm, điểm trung bình, bình luận, Other Products; chế độ chọn sao cho form Leave a Review.

### 🛒 Giỏ hàng

Số lượng sản phẩm trong giỏ được lưu bằng `localStorage` để giữ nguyên khi chuyển giữa 3 trang. Bài tập không xây dựng Backend, đăng nhập hay thanh toán.

---

## 2️⃣ Bài 2 – jQuery cho trang LMS-UEH

Script [`jquery-lms/lms-assignments.js`](jquery-lms/lms-assignments.js) chạy trong **Console** của trình duyệt trên trang môn học LMS UEH (đã đăng nhập), dựa trên code mẫu của giảng viên với selector `.modtype_assign` và `.instancename`.

| Yêu cầu | Cách thực hiện |
|---|---|
| In tên tất cả bài tập | Code mẫu của giảng viên: `$(".modtype_assign").each(...)` → `.find(".instancename")` |
| **Yêu cầu 1:** In bài nộp thứ 5 | `$(".modtype_assign").eq(4)` → in tên, link (`a.aalink`) và deadline; báo rõ nếu trang có ít hơn 5 bài |
| **Yêu cầu 2:** Hiển thị tất cả chủ đề | Duyệt `li.section`, lấy tên ở `.sectionname`, đếm `li.modtype_assign` trong từng chủ đề; chủ đề không có bài ghi **"Không có bài tập"** |
| Deadline | Đọc dòng `<strong>Due:</strong>` trong `[data-region="activity-dates"]`, bỏ qua dòng `Opened:` |
| Kết quả | In theo từng chủ đề, bảng `console.table()` và phần tổng kết (số chủ đề, số chủ đề có/không có bài tập, tổng số bài tập) |

Chỉ `modtype_assign` được tính là bài tập; tài liệu (`modtype_resource`) và nhãn (`modtype_label`) không được tính.

> ⚠️ Đây là script chạy trong Console khi đã đăng nhập LMS, **không phải trang web độc lập** nên không có link chạy trên GitHub Pages. Hướng dẫn chi tiết: [`jquery-lms/README.md`](jquery-lms/README.md).

---

## 3️⃣ Bài 3 – Flappy Bird

Hoàn thiện theo bài hướng dẫn [Viết game Flappy Bird đơn giản với HTML, CSS và jQuery (Freetuts)](https://freetuts.net/viet-game-flappy-bird-don-gian-voi-html-css-va-jquery-713.html), giữ cách làm gốc: HTML tạo khung game, CSS định vị, jQuery điều khiển, `setInterval` làm vòng lặp game, hàm `collision()` kiểm tra va chạm.

| Yêu cầu của giảng viên | Thực hiện |
|---|---|
| Đổi hình Bird và ống khói | Chim xanh `sprites/bird.png`, ống tre `sprites/pipe.png`, nền hoàng hôn `sprites/bg.png` |
| Hiển thị Level | Góc trên bên trái khung game |
| Mốc Level | Ban đầu Level 1 · 5 điểm → Level 2 · 20 điểm → Level 3 · 40 điểm → Level 4 |
| Interval theo Level | Level 1: **40 ms** · Level 2: **30 ms** · Level 3: **25 ms** · Level 4: **20 ms** |
| Chiến thắng | Đạt **50 điểm**: dừng vòng lặp, chim và ống đứng yên, hiện **Victory** |
| Điều khiển | Thay `mousedown` bằng `keydown` phím **↓ (ArrowDown)**: giữ phím để bay lên, nhả phím để rơi; chặn cuộn trang khi nhấn phím |

**Sửa lỗi so với code gốc:**
- Code gốc gọi `clearInterval(playGame())` nên không dừng được game → lưu mã interval vào biến `game_loop` để dừng đúng.
- Mỗi lần đổi Level đều `clearInterval` trước khi tạo lại, đảm bảo chỉ có **một** vòng lặp game.
- Nút **Chơi lại** khởi tạo lại điểm, Level, vị trí chim và ống mà không cần tải lại trang.

**➕ Tính năng bổ sung – Auto Play:** nút bật/tắt chế độ tự động chơi bên dưới khung game. Bot dựa vào vị trí chim và khe hở giữa 2 ống để quyết định bay lên hay rơi xuống, chạy ngay trong vòng lặp game (không tạo thêm interval), tự tắt khi Game Over hoặc Victory.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản | Dùng ở |
|---|---|---|
| HTML5 | – | Cả 3 bài |
| CSS3 (Media Query, position, transition) | – | E-commerce, Flappy Bird |
| JavaScript | – | Cả 3 bài |
| jQuery | 1.12.4 (kèm trong dự án) | E-commerce, Flappy Bird |
| jQuery có sẵn trên LMS UEH | 3.5.1 | Bài LMS (không kèm file) |
| Bootstrap | 3.4.1 | E-commerce |
| xZoom | 1.0.15 | E-commerce – trang chi tiết |
| Bootstrap Star Rating (Kartik) | 4.1.2, theme `krajee-svg` | E-commerce |
| Web Storage (`localStorage`) | – | E-commerce – số lượng giỏ hàng |

Tất cả thư viện được lưu sẵn trong dự án (`ecommerce/lib/`, `flappy-bird/js/`), không phụ thuộc CDN. Không sử dụng framework, Backend hay Database.

---

## 📁 Cấu trúc thư mục

```text
BTVN_B5/
├── index.html                      # Trang tổng hợp, liên kết tới 3 bài tập
├── README.md                       # Tài liệu mô tả (file này)
├── BaiTap_CaNhan_Advance_FE_1.pdf  # Đề bài: các nhóm bài tập Chương 6
├── BaiThucHanh_Responsive_JQuery.pdf # Đề bài: yêu cầu chi tiết Nhóm 2
├── BTVN_B5.zip                     # File nén thư mục bài tập
│
├── ecommerce/                      # Bài 1 – Website TMĐT Mây Basic
│   ├── ecommerce.html              # Trang danh sách sản phẩm
│   ├── ecommerce-detail.html       # Trang chi tiết sản phẩm
│   ├── ecommerce-status.html       # Trang trạng thái đơn hàng
│   ├── css/style.css               # CSS riêng: nhãn giảm giá, nhãn New/Best Seller, responsive...
│   ├── js/script.js                # jQuery: % giảm giá, progress bar, star rating, lọc/tìm kiếm,
│   │                               #   giỏ hàng, xZoom, form, review, trang đơn hàng
│   ├── lib/                        # Bootstrap 3.4.1, jQuery 1.12.4, xZoom, Star Rating
│   ├── fonts/                      # Font Glyphicons của Bootstrap
│   └── images/
│       ├── logo.png                # Logo Mây Basic
│       ├── banners/                # 3 ảnh Carousel
│       ├── products/               # 9 ảnh sản phẩm
│       └── detail/                 # Ảnh xZoom: ảnh lớn, ảnh xem trước, ảnh nhỏ
│
├── jquery-lms/                     # Bài 2 – jQuery cho LMS-UEH
│   ├── lms-assignments.js          # Script chạy trong Console trang môn học
│   └── README.md                   # Hướng dẫn sử dụng và cách đọc kết quả
│
└── flappy-bird/                    # Bài 3 – Game Flappy Bird
    ├── index.html                  # Khung game, nút chơi, chơi lại, Auto Play
    ├── css/style.css               # Giao diện game
    ├── js/
    │   ├── jquery.min.js           # jQuery 1.12.4
    │   └── script.js               # Vòng lặp game, Level, va chạm, ArrowDown, Auto Play
    └── sprites/                    # bird.png, pipe.png, bg.png
```

---

## 🚀 Hướng dẫn truy cập và chạy

### Cách 1 – Xem trực tiếp trên GitHub Pages (khuyến nghị)

1. Mở <https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/>.
2. Chọn bài cần xem trên trang tổng hợp.

### Cách 2 – Chạy trên máy

1. Tải repository: <https://github.com/vutronghuy0515-hash/BTVN-main> (**Code → Download ZIP**) hoặc:
   ```bash
   git clone https://github.com/vutronghuy0515-hash/BTVN-main.git
   ```
2. Mở thư mục `BTVN_B5`, mở file `index.html` bằng trình duyệt (Chrome / Edge). Không cần cài đặt thêm.

### Cách dùng từng bài

| Bài | Thao tác |
|---|---|
| 🛍️ E-commerce | Mở `ecommerce/ecommerce.html`. Thử lọc danh mục, tìm kiếm, bấm (+) thêm giỏ; vào trang chi tiết để bấm ảnh nhỏ, rê chuột zoom ảnh, chọn size rồi Add to Cart, viết đánh giá; mở trang Đơn hàng và bấm Track. |
| 📊 jQuery LMS | Đăng nhập LMS UEH → mở trang môn học → **F12** → **Console** → dán toàn bộ nội dung `lms-assignments.js` → **Enter**. |
| 🐦 Flappy Bird | Mở `flappy-bird/index.html` → bấm vào khung game hoặc nhấn **↓** để bắt đầu → **giữ ↓** để bay lên, **nhả** để rơi. Bấm **Auto Play** để máy tự chơi. |

---

## 🔗 Liên kết

| | Link |
|---|---|
| 📦 GitHub Repository | <https://github.com/vutronghuy0515-hash/BTVN-main> |
| 📂 Thư mục BTVN_B5 | <https://github.com/vutronghuy0515-hash/BTVN-main/tree/main/BTVN_B5> |
| 🌐 GitHub Pages – Trang tổng hợp | <https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/> |
| 🛍️ E-commerce | <https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/ecommerce/ecommerce.html> |
| 🐦 Flappy Bird | <https://vutronghuy0515-hash.github.io/BTVN-main/BTVN_B5/flappy-bird/index.html> |
| 📊 jQuery LMS (mã nguồn) | <https://github.com/vutronghuy0515-hash/BTVN-main/blob/main/BTVN_B5/jquery-lms/lms-assignments.js> |

---

<p align="center"><i>BTVN_B5 · Học phần Phát triển ứng dụng Thương mại điện tử · UEH</i></p>
