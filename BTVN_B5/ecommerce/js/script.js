/* =========================================================
   Mây Basic - JavaScript dùng chung cho 3 trang E-commerce
   Viết bằng jQuery. Mỗi phần chỉ chạy khi trang có phần tử tương ứng.
   ========================================================= */

$(function () {

    /* ---------- 0. HÀM TIỆN ÍCH ---------- */

    // Định dạng số thành tiền Việt: 159000 -> "159.000đ"
    function formatVND(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    }

    // Đọc số lượng giỏ hàng đã lưu (giữ số lượng khi chuyển trang)
    function getCartCount() {
        var count = 0;
        try {
            count = parseInt(localStorage.getItem("mayCartCount")) || 0;
        } catch (e) {
            count = 0; // trình duyệt chặn localStorage thì bắt đầu từ 0
        }
        return count;
    }

    // Lưu và hiển thị số lượng giỏ hàng lên Navigation
    function setCartCount(count) {
        try {
            localStorage.setItem("mayCartCount", count);
        } catch (e) { }
        $(".cart-count").text(count);
    }

    // Cộng thêm sản phẩm vào giỏ + hiệu ứng nhấp nháy badge
    function addToCart(quantity) {
        setCartCount(getCartCount() + quantity);
        $(".cart-count").addClass("bump");
        setTimeout(function () {
            $(".cart-count").removeClass("bump");
        }, 400);
    }

    // Hiển thị số giỏ hàng khi vừa mở trang
    setCartCount(getCartCount());

    // Bấm biểu tượng giỏ hàng: báo số sản phẩm hiện có (chưa làm trang giỏ hàng theo đề bài)
    $(".cart-link").click(function (e) {
        e.preventDefault();
        alert("Giỏ hàng của bạn đang có " + getCartCount() + " sản phẩm.");
    });

    // Bật tooltip của Bootstrap cho nút "Thêm vào giỏ"
    $('[data-toggle="tooltip"]').tooltip();


    /* ---------- 1. GIÁ, % GIẢM GIÁ, TRẠNG THÁI KHO ---------- */

    $(".product").each(function () {
        var $product = $(this);
        var price = parseInt($product.data("price"));
        var oldPrice = parseInt($product.data("old-price"));

        // Hiển thị giá bán và giá gốc
        $product.find(".price").text(formatVND(price));

        if (oldPrice > price) {
            // % giảm = (giá gốc - giá bán) / giá gốc * 100, làm tròn
            var percent = Math.round((oldPrice - price) / oldPrice * 100);
            $product.find(".old-price").text(formatVND(oldPrice));
            $product.find(".label-discount").text("-" + percent + "%");
            $product.find(".discount-text").text("Giảm " + percent + "%");
        } else {
            $product.find(".label-discount").hide();
        }

        // Trạng thái kho bằng Bootstrap Progress Bar
        var $stock = $product.find(".stock-status");
        if ($stock.length > 0) {
            var sold = parseInt($product.data("sold"));
            var stock = parseInt($product.data("stock"));
            var soldPercent = Math.round(sold / stock * 100);

            var barClass = "progress-bar-warning";
            var text = "Đã bán " + sold;
            if (soldPercent >= 80) {           // bán trên 80% thì báo sắp hết
                barClass = "progress-bar-danger";
                text = "Sắp bán hết";
            }

            var html =
                '<div class="progress">' +
                '  <div class="progress-bar ' + barClass + ' progress-bar-striped" role="progressbar"' +
                '       aria-valuenow="' + soldPercent + '" aria-valuemin="0" aria-valuemax="100"' +
                '       style="width: ' + soldPercent + '%;">' + text + '</div>' +
                '</div>' +
                '<small class="text-muted">Còn lại ' + (stock - sold) + ' / ' + stock + ' sản phẩm</small>';
            $stock.html(html);
        }
    });


    /* ---------- 2. BOOTSTRAP STAR RATING (thay cho glyphicon-star) ---------- */

    if ($.fn.rating) {
        // Sao chỉ đọc: dùng cho danh sách sản phẩm, điểm trung bình, bình luận
        $(".rating-show").rating({
            displayOnly: true,   // chỉ hiển thị, không cho bấm
            step: 0.1,           // cho phép hiển thị số lẻ như 4.3
            size: "xs",
            showCaption: false
        });

        // Sao cho người dùng chọn khi viết đánh giá
        $(".rating-input").rating({
            step: 1,
            size: "sm",
            showClear: false,
            starCaptions: { 1: "Rất tệ", 2: "Tệ", 3: "Bình thường", 4: "Tốt", 5: "Rất tốt" }
        });
    }


    /* ---------- 3. TRANG DANH SÁCH: DANH MỤC + TÌM KIẾM + THÊM GIỎ ---------- */

    // Đếm số sản phẩm của từng danh mục và ghi vào badge
    $(".category-list .list-group-item").each(function () {
        var cat = $(this).data("cat");
        var total;
        if (cat === "all") {
            total = $(".product-list .product-item").length;
        } else {
            total = $('.product-list .product-item[data-cat="' + cat + '"]').length;
        }
        $(this).find(".badge").text(total);
    });

    // Lọc sản phẩm theo danh mục
    function filterCategory(cat) {
        var shown = 0;
        $(".category-list .list-group-item").removeClass("active");
        $('.category-list .list-group-item[data-cat="' + cat + '"]').addClass("active");

        $(".product-list .product-item").each(function () {
            if (cat === "all" || $(this).data("cat") === cat) {
                $(this).show();
                shown++;
            } else {
                $(this).hide();
            }
        });

        var name = $('.category-list .list-group-item[data-cat="' + cat + '"]').clone().children().remove().end().text();
        $(".search-result").text(cat === "all" ? "" : "– " + name);
        $(".no-result").toggle(shown === 0);
    }

    // Bấm danh mục ở sidebar
    $(".category-list .list-group-item").click(function () {
        filterCategory($(this).data("cat"));
    });

    // Bấm danh mục trong menu dropdown
    $(".cat-link").click(function (e) {
        e.preventDefault();
        filterCategory($(this).data("cat"));
        $("html, body").animate({ scrollTop: $(".list-title").offset().top - 10 }, 300);
    });

    // Tìm kiếm theo tên sản phẩm (không phân biệt hoa thường)
    function searchProduct(keyword) {
        keyword = $.trim(keyword).toLowerCase();
        var shown = 0;
        $(".category-list .list-group-item").removeClass("active");
        $('.category-list .list-group-item[data-cat="all"]').addClass("active");

        $(".product-list .product-item").each(function () {
            var name = $(this).find(".product-name").text().toLowerCase();
            if (name.indexOf(keyword) >= 0) {
                $(this).show();
                shown++;
            } else {
                $(this).hide();
            }
        });

        $(".search-result").text(keyword === "" ? "" : '– kết quả cho "' + keyword + '" (' + shown + ")");
        $(".no-result").toggle(shown === 0);
    }

    $(".search-form").submit(function (e) {
        e.preventDefault();
        var keyword = $(this).find(".search-input").val();

        if ($(".category-list").length > 0) {
            searchProduct(keyword);               // đang ở trang danh sách: lọc ngay
        } else {
            // ở trang khác: chuyển về trang danh sách kèm từ khóa
            window.location.href = "ecommerce.html?q=" + encodeURIComponent(keyword);
        }
    });

    // Khi mở trang danh sách: đọc từ khóa (?q=) hoặc danh mục (#ao-thun) trên địa chỉ
    if ($(".category-list").length > 0) {
        var query = window.location.search.match(/[?&]q=([^&]*)/);
        var hash = window.location.hash.replace("#", "");

        if (query) {
            var keyword = decodeURIComponent(query[1].replace(/\+/g, " "));
            $(".search-input").val(keyword);
            searchProduct(keyword);
        } else if (hash !== "" && $('.category-list [data-cat="' + hash + '"]').length > 0) {
            filterCategory(hash);
        }
    }

    // Nút (+) thêm vào giỏ trên từng sản phẩm
    $(".btn-add-cart").click(function (e) {
        e.preventDefault();
        addToCart(1);
        var $btn = $(this);
        $btn.attr("data-original-title", "Đã thêm!").tooltip("show");
        setTimeout(function () {
            $btn.attr("data-original-title", "Thêm vào giỏ").tooltip("hide");
        }, 1000);
    });


    /* ---------- 4. TRANG CHI TIẾT: xZOOM ---------- */

    if ($.fn.xzoom && $(".xzoom").length > 0) {
        // Ảnh chính (.xzoom) + các ảnh nhỏ (.xzoom-gallery)
        var zoomPosition = $(window).width() < 768 ? "inside" : "right";
        $(".xzoom, .xzoom-gallery").xzoom({
            position: zoomPosition,  // khung zoom bên phải ảnh (Mobile: zoom trong ảnh)
            tint: "#333",
            Xoffset: 15,
            fadeOut: true
        });
    }

    // Chọn màu -> đổi sang ảnh nhỏ tương ứng (0: trắng, 1: đen, 2: xanh rêu)
    $("#color").change(function () {
        var index = parseInt($(this).val());
        $(".xzoom-gallery").eq(index).trigger("click");
    });


    /* ---------- 5. TRANG CHI TIẾT: CHỌN SIZE, ADD TO CART, CONTACT SELLER ---------- */

    var selectedSize = "";

    $(".size-group .btn").click(function () {
        $(".size-group .btn").removeClass("active btn-primary").addClass("btn-default");
        $(this).removeClass("btn-default").addClass("active btn-primary");
        selectedSize = $(this).text();
    });

    function showMessage(type, text) {
        $("#detail-message").html('<div class="alert alert-' + type + '">' + text + '</div>');
    }

    $("#add-cart-form").submit(function (e) {
        e.preventDefault();
        var quantity = parseInt($("#number").val());
        var color = $("#color option:selected").text();

        if (isNaN(quantity) || quantity < 1) {
            showMessage("warning", "Vui lòng nhập số lượng từ 1 trở lên.");
            return;
        }
        if (selectedSize === "") {
            showMessage("warning", "Vui lòng chọn kích thước (XS, S, M, L, XL).");
            return;
        }

        addToCart(quantity);
        showMessage("success", "Đã thêm <strong>" + quantity + "</strong> x Áo thun Basic Cotton (màu " +
            color + ", size " + selectedSize + ") vào giỏ hàng.");
    });

    $("#btn-contact").click(function () {
        showMessage("info", "Liên hệ Mây Basic: Hotline <strong>1900 0000</strong> (8h–22h) – " +
            "Email <strong>hotro@maybasic.vn</strong> (thông tin mẫu).");
    });


    /* ---------- 6. TRANG CHI TIẾT: LEAVE A REVIEW ---------- */

    $("#btn-leave-review").click(function () {
        $("#review-form").slideToggle(200);
    });

    $("#review-form").submit(function (e) {
        e.preventDefault();
        var name = $.trim($("#review-name").val());
        var content = $.trim($("#review-content").val());
        var star = parseInt($("#review-star").val()) || 0;

        if (name === "" || content === "" || star === 0) {
            $(".review-error").text("Vui lòng chọn số sao, nhập tên và nhận xét.");
            return;
        }
        $(".review-error").text("");

        // Tạo bình luận mới bằng jQuery (dùng .text() để tránh chèn mã HTML)
        var $comment = $('<div class="row comment"><div class="col-md-12">' +
            '<input class="rating-show" value="' + star + '"> <strong class="c-name"></strong>' +
            '<span class="pull-right text-muted">Vừa xong</span>' +
            '<p class="text-muted">Từ <em>Việt Nam</em></p><p class="c-content"></p>' +
            '</div></div>');
        $comment.find(".c-name").text(name);
        $comment.find(".c-content").text(content);

        $("#comments").prepend("<hr>").prepend($comment);
        $comment.find(".rating-show").rating({ displayOnly: true, size: "xs", showCaption: false });

        // Tính lại điểm trung bình và số lượt đánh giá
        var sum = 0;
        var total = 0;
        $("#comments .comment input.rating-show").each(function () {
            sum += parseFloat($(this).val());
            total++;
        });
        var avg = Math.round(sum / total * 10) / 10;
        $(".review-total").text(total);
        $(".avg-number").text(avg);
        $("#avg-rating").rating("update", avg);

        // Xóa form và ẩn đi
        $("#review-name").val("");
        $("#review-content").val("");
        $("#review-form").slideUp(200);
    });


    /* ---------- 7. TRANG TRẠNG THÁI ĐƠN HÀNG ---------- */

    // Sidebar Manage Orders: hiện khung nội dung tương ứng
    $(".manage-menu .list-group-item").click(function (e) {
        e.preventDefault();
        $(".manage-menu .list-group-item").removeClass("active");
        $(this).addClass("active");
        $(".manage-panel").hide();
        $($(this).data("panel")).show();
    });

    // Nút Track: hiện/ẩn thông tin vận chuyển của đơn
    $(".btn-track").click(function () {
        var $info = $(this).closest(".order-row").find(".track-info");
        $info.text($(this).data("info")).slideToggle(200);
    });

});
