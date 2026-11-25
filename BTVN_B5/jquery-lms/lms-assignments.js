/* =========================================================
   BÀI 2 - jQuery cho trang LMS-UEH
   Cách chạy: đăng nhập LMS -> mở trang môn học -> F12 -> Console
              -> dán toàn bộ file này -> Enter.

   Selector dựa trên HTML thực tế của LMS UEH (đã kiểm tra bằng DevTools):
     - Chủ đề:          li.section      (tên chủ đề: .sectionname)
     - Bài tập:         li.modtype_assign (tên: .instancename, link: a.aalink)
     - Ngày tháng:      [data-region="activity-dates"], dòng deadline là <div> có <strong>Due:</strong>
   Chỉ đếm modtype_assign. Tài liệu (modtype_resource) và nhãn (modtype_label) KHÔNG phải bài tập.
   ========================================================= */

(function ($) {

    // LMS UEH có sẵn jQuery 3.5.1, nếu không thấy thì báo rồi dừng
    if (!$) {
        console.log("Không tìm thấy jQuery trên trang này. Hãy chắc chắn bạn đang ở trang môn học của LMS.");
        return;
    }

    /* ---------- CÁC HÀM LẤY THÔNG TIN 1 BÀI TẬP ---------- */

    // Tên bài tập: lấy chữ trong .instancename, bỏ chữ ẩn " Assignment" (thẻ .accesshide) nếu có
    function getAssignName(assign) {
        var $name = $(assign).find(".instancename").first().clone();
        $name.find(".accesshide").remove();
        return $.trim($name.text());
    }

    // Link bài tập: thuộc tính href của thẻ a.aalink
    function getAssignLink(assign) {
        var link = $(assign).find("a.aalink").first().attr("href");
        if (link) {
            return link;
        }
        return "Không có link";
    }

    // Deadline: trong [data-region="activity-dates"], tìm <div> có <strong> chứa "Due:"
    // (bỏ qua dòng "Opened:" để không lấy nhầm ngày mở bài)
    function getDeadline(assign) {
        var deadline = "Không hiển thị deadline";

        $(assign).find('[data-region="activity-dates"] > div').each(function (i, line) {
            var label = $.trim($(line).find("strong").text());   // VD: "Opened:" hoặc "Due:"

            if (label.indexOf("Due") === 0) {
                // Lấy chữ của cả dòng rồi bỏ phần "Due:" ở đầu -> chỉ còn ngày giờ
                var text = $.trim($(line).text()).replace(/\s+/g, " ");
                deadline = $.trim(text.replace(label, ""));
            }
        });

        return deadline;
    }


    /* =========================================================
       IN TÊN TẤT CẢ BÀI TẬP
       ========================================================= */
    console.log("===== Danh sách tất cả bài tập =====");
    $(".modtype_assign").each(function (index, value) {
        $(value).find(".instancename").each(function (index_Instancename, value_Instancename) {
            console.log($(value_Instancename).text());
        });
    });


    /* =========================================================
       YÊU CẦU 1: IN RA BÀI TẬP THỨ 5
       ========================================================= */
    console.log("===== Yêu cầu 1: Bài tập thứ 5 =====");

    var allAssign = $(".modtype_assign");   // theo đúng thứ tự xuất hiện trên trang

    if (allAssign.length >= 5) {
        var fifth = allAssign.eq(4);         // đếm từ 0 nên bài thứ 5 là vị trí 4
        console.log("Tên bài tập thứ 5: " + getAssignName(fifth));
        console.log("Link: " + getAssignLink(fifth));
        console.log("Deadline: " + getDeadline(fifth));
    } else {
        console.log("Trang này chỉ có " + allAssign.length + " bài tập, không đủ 5 bài để in bài thứ 5.");
    }


    /* =========================================================
       YÊU CẦU 2: TẤT CẢ CHỦ ĐỀ, BÀI TẬP VÀ DEADLINE
       ========================================================= */
    console.log("===== Yêu cầu 2: Các chủ đề của môn học =====");

    var table = [];              // dữ liệu cho console.table (mỗi dòng 1 bài tập)
    var totalTopic = 0;
    var topicHasAssign = 0;
    var topicNoAssign = 0;
    var totalAssign = 0;

    $("li.section").each(function (index, section) {
        var topicName = $.trim($(section).find(".sectionname").first().text());
        var assigns = $(section).find("li.modtype_assign");    // chỉ lấy bài tập
        var count = assigns.length;

        totalTopic++;
        totalAssign = totalAssign + count;

        if (count === 0) {
            topicNoAssign++;
            console.log("Chủ đề \"" + topicName + "\": Không có bài tập");

            table.push({
                "Chủ đề": topicName,
                "Có bài tập": "Không",
                "Số bài tập": 0,
                "Tên bài tập": "Không có bài tập",
                "Deadline": ""
            });
        } else {
            topicHasAssign++;
            console.log("Chủ đề \"" + topicName + "\": Có " + count + " bài tập");

            assigns.each(function (i, assign) {
                var name = getAssignName(assign);
                var deadline = getDeadline(assign);

                console.log("   " + (i + 1) + ". " + name + " | Deadline: " + deadline);

                table.push({
                    "Chủ đề": topicName,
                    "Có bài tập": "Có",
                    "Số bài tập": count,
                    "Tên bài tập": name,
                    "Deadline": deadline
                });
            });
        }
    });

    // Bảng tổng hợp: mỗi dòng là 1 bài tập, chủ đề không có bài tập chiếm 1 dòng
    console.table(table);

    console.log("===== Tổng kết =====");
    console.log("Tổng số chủ đề: " + totalTopic);
    console.log("Chủ đề có bài tập: " + topicHasAssign);
    console.log("Chủ đề không có bài tập: " + topicNoAssign);
    console.log("Tổng số bài tập: " + totalAssign);

    // Kiểm tra chéo: nếu có bài tập nằm ngoài các chủ đề thì báo để biết
    if (totalAssign !== allAssign.length) {
        console.log("Lưu ý: trang có " + allAssign.length + " bài tập nhưng chỉ " + totalAssign +
                    " bài nằm trong các chủ đề (li.section).");
    }

})(window.jQuery);
