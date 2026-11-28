# ASP-CORE – Website bán phim (ASP.NET Core MVC, .NET 10)

Bài thực hành cá nhân **“Phát triển ứng dụng Web – ASP.NET Core MVC”**, học phần *Phát triển ứng dụng Thương mại điện tử*.

| Thông tin | Chi tiết |
|---|---|
| Sinh viên | Vũ Trọng Huy |
| MSSV | 31241022181 |
| Mã học phần | INF509027 |
| Lớp học phần | 26C1INF50902702 |
| Giảng viên | TS. Nguyễn Mạnh Tuấn |
| Website triển khai | http://uehptudw31241022181.somee.com |

## 1. Mục tiêu dự án

Xây dựng website thương mại điện tử nhỏ **VTH Movie Store** bán phim (DVD/Blu-ray) bằng ASP.NET Core MVC theo tài liệu `BaiTap_CaNhan_ASP_CORE_LMS.pdf`. Nội dung gồm: đăng ký tài khoản bằng ASP.NET Core Identity, kết nối SQL Server trên Somee bằng Entity Framework Core, quản lý phim và thể loại, upload hình ảnh, giỏ hàng lưu trong Session, đặt hàng (Checkout) có gửi email xác nhận, và publish website lên hosting Somee.

## 2. Công nghệ sử dụng

- ASP.NET Core MVC trên **.NET 10** (C#), Razor View, Bootstrap 5 (có sẵn trong template)
- ASP.NET Core Identity (template *Individual Authentication*)
- Entity Framework Core 10 + **SQL Server** (CSDL `PTUDW_31241022181` trên somee.com), Migrations
- `Microsoft.VisualStudio.Web.CodeGeneration.Design` + `dotnet-aspnet-codegenerator` (scaffold Controller/View)
- `Microsoft.AspNetCore.Mvc.NewtonsoftJson` (lưu giỏ hàng vào Session dạng JSON)
- `System.Net.Mail.SmtpClient` + Gmail App Password (gửi email đơn hàng)
- Công cụ: Windows 11, VS Code + C# Dev Kit, SQL Server Management Studio, Google Chrome

## 3. Chức năng

| Nhóm | Chức năng |
|---|---|
| Tài khoản | Đăng ký, xác nhận tài khoản, đăng nhập/đăng xuất (Identity) |
| Phim (Movies) | Danh sách dạng lưới, thêm/xem/sửa/xóa; validation tiêu đề, ngày phát hành > hôm nay (`CheckDateGreaterThanTodayAttribute`), thể loại tồn tại (`GenreAttribute`), giá ≥ 5.000, xếp hạng 1–5 |
| Thể loại (Genres) | Thêm/xem/sửa/xóa; quan hệ 1–n với Movie |
| Hình ảnh | Upload ảnh vào `wwwroot/images` (tên file ngẫu nhiên, chỉ nhận .jpg/.jpeg/.png/.gif/.webp); dùng `no-image.jpg` khi không chọn ảnh; khi sửa mà không chọn ảnh mới thì giữ ảnh cũ |
| Giỏ hàng | Thêm vào giỏ (cộng dồn số lượng), xóa khỏi giỏ, tính thành tiền và tổng tiền, hiển thị tóm tắt giỏ hàng trên menu |
| Checkout | Nhập thông tin giao hàng có kiểm tra dữ liệu, lưu `HoaDon`, `ChiTietHoaDon`, `ShippingDetail` vào CSDL, gửi email xác nhận, trang Thanks |

## 4. Cấu trúc thư mục

```
ASP-CORE/
├── README.md
├── SourceCode/
│   └── 31241022181_VuTrongHuy/
│       ├── Controllers/        (MoviesController, GenresController, HomeController)
│       ├── Data/               (ApplicationDbContext)
│       ├── Extension/          (SessionExtensions, EmailServiceNew)
│       ├── Migrations/         (InitialCreate, Movie, HoaDon, Shipping)
│       ├── Models/             (Movie, Genre, HoaDon, ChiTietHoaDon, ShippingDetail)
│       ├── Validation/         (CheckDateGreaterThanTodayAttribute, GenreAttribute)
│       ├── Views/              (Movies, Genres, Shared, ...)
│       ├── wwwroot/images/     (ảnh sản phẩm + no-image.jpg)
│       ├── appsettings.example.json   (file cấu hình mẫu, không chứa mật khẩu)
│       ├── Program.cs
│       └── 31241022181_VuTrongHuy.csproj
└── Report/
    ├── BaiTap_CaNhan_ASP_CORE_LMS.docx
    └── images/                 (ảnh minh chứng NNN_Hinh_x.y.png)
```

`appsettings.json` (chứa chuỗi kết nối và App Password), `bin/`, `obj/`, `publish/`, `publish.zip`, `app.db` **không** được đưa lên GitHub (xem `.gitignore`).

## 5. Cấu hình cơ sở dữ liệu

1. Tạo CSDL MS SQL trên somee.com (hoặc SQL Server bất kỳ) và lấy connection string.
2. Copy `appsettings.example.json` thành `appsettings.json`, điền chuỗi kết nối (thêm `TrustServerCertificate=True`) và thông tin Gmail:

```json
"ConnectionStrings": {
  "DefaultConnection": "workstation id=<DB>.mssql.somee.com;packet size=4096;user id=<LOGIN>;pwd=<MATKHAU>;data source=<DB>.mssql.somee.com;persist security info=False;initial catalog=<DB>;TrustServerCertificate=True"
},
"Email": {
  "Address": "your@gmail.com",
  "AppPassword": "mat-khau-ung-dung-16-ky-tu"
}
```

3. Tạo bảng bằng migrations có sẵn:

```bash
dotnet tool install --global dotnet-ef --version 10.0.*
dotnet ef database update
```

## 6. Cách chạy ứng dụng

```bash
cd SourceCode/31241022181_VuTrongHuy
dotnet restore
dotnet dev-certs https --trust
dotnet run --launch-profile https
```

Mở địa chỉ in ở dòng `Now listening on: https://localhost:7111`. Trang mặc định là danh sách phim (`/Movies`). Nên tạo thể loại (`/Genres`) trước khi thêm phim.

## 7. Cách publish

```bash
dotnet publish -c Release -r win-x86 --self-contained false -o ./publish
```

- PDF hướng dẫn dùng `dotnet publish -c Release -o ./publish`; bản publish này nặng khoảng 152 MB, vượt hạn mức 150 MB của gói Free Somee (do thư mục `runtimes` chứa thư viện native cho Linux/macOS). Thêm `-r win-x86 --self-contained false` (app pool của Somee chạy 32-bit) thì còn khoảng 90 MB, vẫn là bản framework-dependent.
- Nén **toàn bộ nội dung bên trong** thư mục `publish` thành `publish.zip` (web.config nằm ở gốc file zip).
- Somee: *Websites → (gói Free) → tạo website* với ASP.NET version **.NET Core (all versions)** → *File manager* → xóa `default.asp` → *Upload archive* (upload và giải nén) `publish.zip`.
- Truy cập: http://uehptudw31241022181.somee.com (gói free chỉ có HTTP và chèn banner quảng cáo của Somee).
