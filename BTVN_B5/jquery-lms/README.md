# Bài 2 – jQuery cho trang LMS-UEH

File code: `lms-assignments.js`

## Cách sử dụng

1. Đăng nhập LMS UEH.
2. Vào trang môn học (trang liệt kê các chủ đề, địa chỉ dạng `https://lms.ueh.edu.vn/course/view.php?id=...`).
3. Nhấn **F12**.
4. Chọn tab **Console**.
5. Mở file `lms-assignments.js`.
6. Copy toàn bộ code và dán vào Console.
   (Lần đầu dán, Chrome có thể yêu cầu gõ `allow pasting` rồi Enter – gõ theo hướng dẫn rồi dán lại.)
7. Nhấn **Enter**.
8. Xem kết quả trong Console.

Trang LMS UEH có sẵn jQuery 3.5.1 nên không cần tải thêm thư viện.

## Kết quả in ra

1. **Code mẫu của giảng viên**: tên tất cả bài tập trên trang.
2. **Yêu cầu 1**: tên, link và deadline của bài tập thứ 5 (theo thứ tự xuất hiện trên trang).
   Nếu môn học có ít hơn 5 bài tập, Console báo rõ số bài hiện có.
3. **Yêu cầu 2**: từng chủ đề kèm số bài tập, tên và deadline của từng bài, ví dụ:
   ```
   Chủ đề "Tài liệu tham khảo": Không có bài tập
   Chủ đề "Tổng quan CSS": Có 3 bài tập
      1. ... | Deadline: Wednesday, 25 November 2026, 11:00 PM
   ```
   Sau đó là bảng `console.table()` và phần **Tổng kết** (tổng số chủ đề, số chủ đề có / không có bài tập,
   tổng số bài tập). Các con số này được đếm tự động từ trang, không ghi sẵn trong code.

## Cách đọc bảng `console.table()`

| Cột | Ý nghĩa |
|---|---|
| (index) | Số thứ tự dòng, bắt đầu từ 0 |
| Chủ đề | Tên chủ đề (lấy từ `.sectionname`) |
| Có bài tập | "Có" hoặc "Không" |
| Số bài tập | Số bài tập của chủ đề đó |
| Tên bài tập | Tên bài tập, hoặc "Không có bài tập" |
| Deadline | Ngày giờ ở dòng **Due:**, hoặc "Không hiển thị deadline" nếu bài không có dòng Due |

- Mỗi **bài tập** là một dòng, nên chủ đề có 3 bài tập sẽ chiếm 3 dòng liền nhau (cùng tên chủ đề).
- Chủ đề **không có bài tập** chiếm đúng 1 dòng.
- Bấm vào tên cột để sắp xếp bảng theo cột đó.

## Selector sử dụng (đã kiểm tra trên HTML thực tế của LMS UEH)

| Thành phần | Selector |
|---|---|
| Chủ đề | `li.section` |
| Tên chủ đề | `.sectionname` |
| Bài tập | `li.modtype_assign` (theo code mẫu của giảng viên) |
| Tên bài tập | `.instancename` (bỏ chữ ẩn ` Assignment` trong `.accesshide` nếu có) |
| Link bài tập | `a.aalink` |
| Deadline | `[data-region="activity-dates"] > div` có `<strong>Due:</strong>` |

- Chỉ đếm `modtype_assign` là bài tập. Tài liệu (`modtype_resource`) và nhãn/thông báo (`modtype_label`)
  không được tính, nên chủ đề như "Tài liệu tham khảo" hiển thị "Không có bài tập".
- Dòng `Opened:` là ngày mở bài, code bỏ qua dòng này và chỉ lấy dòng `Due:`.
- Riêng dòng code mẫu của giảng viên in nguyên chữ trong `.instancename`, nên có thể có thêm chữ " Assignment" ở cuối tên.

## Ghi chú

Code được kiểm tra cú pháp và chạy thử trên một trang HTML mẫu dựng lại theo cấu trúc LMS UEH,
không chạy trực tiếp trên tài khoản LMS. Kết quả thật phụ thuộc vào dữ liệu môn học tại thời điểm chạy.
