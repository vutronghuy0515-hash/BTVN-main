/* =========================================================
   Flappy Bird bằng jQuery - dựa theo bài hướng dẫn Freetuts
   Bổ sung: Level (interval 40/30/25/20 ms), chiến thắng ở 50 điểm,
   điều khiển bằng phím ArrowDown thay cho chuột, sửa lỗi dừng game.
   ========================================================= */

$(function () {

    /* ---------- 1. LẤY CÁC PHẦN TỬ VÀ THÔNG SỐ BAN ĐẦU ---------- */
    var container = $("#container");
    var bird = $("#bird");
    var poles = $(".pole");
    var pole_1 = $("#pole_1");
    var pole_2 = $("#pole_2");
    var score = $("#score");
    var level_text = $("#level");
    var message = $("#message");

    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(poles.css("right"));
    var pole_initial_height = parseInt(poles.css("height"));
    var bird_left = parseInt(bird.css("left"));
    var bird_height = parseInt(bird.height());
    var speed = 10;                       // số px ống tre di chuyển mỗi lần lặp

    /* ---------- 2. BIẾN TRẠNG THÁI GAME ---------- */
    var game_loop = null;                 // mã của setInterval (để dừng đúng vòng lặp)
    var go_up = false;                    // true khi đang giữ phím ArrowDown
    var score_updated = false;            // đã cộng điểm cho cặp ống hiện tại chưa
    var game_started = false;
    var game_over = false;
    var points = 0;
    var current_level = 1;
    var auto_play = false;                // true khi bật chế độ tự động chơi

    // Interval (ms) của từng Level theo yêu cầu giảng viên
    var LEVEL_INTERVAL = {
        1: 40,
        2: 30,
        3: 25,
        4: 20
    };
    var WIN_SCORE = 50;

    // Tính Level theo điểm: 5 điểm -> Level 2, 20 -> Level 3, 40 -> Level 4
    function getLevel(p) {
        if (p >= 40) {
            return 4;
        } else if (p >= 20) {
            return 3;
        } else if (p >= 5) {
            return 2;
        }
        return 1;
    }

    /* ---------- 3. VÒNG LẶP GAME ---------- */

    // Bắt đầu (hoặc khởi động lại) vòng lặp với interval của Level hiện tại.
    // Luôn clearInterval trước để KHÔNG bao giờ có 2 vòng lặp chạy chồng nhau.
    function startLoop() {
        clearInterval(game_loop);
        game_loop = setInterval(gameTick, LEVEL_INTERVAL[current_level]);
    }

    function playGame() {
        game_started = true;
        game_over = false;
        $("#play_btn").hide();
        startLoop();
    }

    // Hàm được gọi mỗi lần lặp
    function gameTick() {
        var pole_current_position = parseInt(poles.css("right"));
        var bird_top = parseInt(bird.css("top"));

        // Kiểm tra va chạm với ống tre hoặc chạm mép trên / mép dưới khung
        if (collision(bird, pole_1) || collision(bird, pole_2) ||
            bird_top <= 0 || bird_top > container_height - bird_height) {
            stop_the_game();
            return;
        }

        // Ống đã vượt qua con chim -> cộng 1 điểm (mỗi cặp ống chỉ cộng 1 lần)
        if (pole_current_position > container_width - bird_left && score_updated === false) {
            points++;
            score.text(points);
            score_updated = true;

            if (points >= WIN_SCORE) {        // đủ 50 điểm -> thắng, dừng ngay
                victory();
                return;
            }
            updateLevel();
        }

        // Ống đã ra khỏi khung bên trái -> đưa về bên phải với chiều cao ngẫu nhiên
        if (pole_current_position > container_width) {
            var new_height = parseInt(Math.random() * 100);
            pole_1.css("height", pole_initial_height + new_height);
            pole_2.css("height", pole_initial_height - new_height);
            score_updated = false;
            pole_current_position = pole_initial_position;
        }

        // Di chuyển ống tre sang trái
        poles.css("right", pole_current_position + speed);

        // Bật Auto Play thì bot tự quyết định "giữ" hay "nhả" phím (gọi ngay trong vòng lặp này,
        // không tạo thêm interval nào)
        if (auto_play) {
            autoPilot();
        }

        // Đang giữ ArrowDown thì bay lên, không thì rơi xuống
        if (go_up) {
            up();
        } else {
            go_down();
        }
    }

    // Đổi Level khi điểm đạt mốc và đổi interval tương ứng
    function updateLevel() {
        var new_level = getLevel(points);
        if (new_level !== current_level) {
            current_level = new_level;
            level_text.text("Level " + current_level);
            startLoop();                      // tạo lại vòng lặp với interval mới (đã clear cái cũ)
        }
    }

    /* ---------- 4. CHUYỂN ĐỘNG CỦA CHIM ---------- */
    function go_down() {
        bird.css("top", parseInt(bird.css("top")) + 10);
        bird.css("transform", "rotate(50deg)");
    }

    function up() {
        bird.css("top", parseInt(bird.css("top")) - 20);
        bird.css("transform", "rotate(-10deg)");
    }

    /* ---------- 5. ĐIỀU KHIỂN BẰNG PHÍM ARROW DOWN (thay cho mousedown/mouseup) ---------- */
    $(document).on("keydown", function (e) {
        if (e.key === "ArrowDown" || e.which === 40) {
            e.preventDefault();               // chặn cuộn trang khi nhấn phím mũi tên xuống

            if (!game_started && !game_over) {
                playGame();                   // chưa chơi thì nhấn ↓ để bắt đầu
            }
            // Chỉ bật cờ go_up; giữ phím (keydown lặp lại) cũng không tạo thêm interval nào
            if (game_started) {
                go_up = true;
            }
        }
    });

    $(document).on("keyup", function (e) {
        if (e.key === "ArrowDown" || e.which === 40) {
            go_up = false;                    // nhả phím -> chim rơi xuống lại
        }
    });

    /* ---------- 5b. AUTO PLAY (TỰ ĐỘNG CHƠI) ---------- */

    // Bot: giữ chim ở giữa khe hở của 2 ống tre
    // - Khe hở bắt đầu ở đáy ống trên (chiều cao pole_1)
    //   và kết thúc ở đỉnh ống dưới (container_height - chiều cao pole_2)
    // - Chim thấp hơn tâm khe -> "giữ phím" (go_up = true) để bay lên
    // - Chim cao hơn tâm khe  -> "nhả phím" (go_up = false) để rơi xuống
    function autoPilot() {
        var bird_center = parseInt(bird.css("top")) + bird_height / 2;
        var gap_top = parseInt(pole_1.css("height"));
        var gap_bottom = container_height - parseInt(pole_2.css("height"));
        var gap_center = (gap_top + gap_bottom) / 2;

        if (bird_center > gap_center) {
            go_up = true;
        } else {
            go_up = false;
        }
    }

    // Bật / tắt Auto Play và đổi chữ trên nút
    function setAutoPlay(on) {
        auto_play = on;
        if (on) {
            $("#auto_btn").text("Auto Play: BẬT").addClass("on");
        } else {
            go_up = false;                    // tắt bot thì "nhả phím"
            $("#auto_btn").text("Auto Play: TẮT").removeClass("on");
        }
    }

    $("#auto_btn").click(function () {
        if (auto_play) {
            setAutoPlay(false);
        } else {
            setAutoPlay(true);
            if (!game_started && !game_over) {
                playGame();                   // game chưa chạy thì bắt đầu luôn
            }
        }
        $(this).blur();
    });

    /* ---------- 6. BẮT ĐẦU / KẾT THÚC / CHƠI LẠI ---------- */
    $("#play_btn").click(function () {
        playGame();
        $(this).blur();
    });

    // Thua: dừng vòng lặp (code gốc gọi clearInterval(playGame()) nên không dừng được)
    function stop_the_game() {
        clearInterval(game_loop);
        game_loop = null;
        game_over = true;
        game_started = false;
        go_up = false;
        setAutoPlay(false);                   // thua thì bot dừng
        message.removeClass("win").text("Game Over!").show();
        $("#restart_btn").slideDown();
    }

    // Thắng khi đạt 50 điểm: dừng chim và ống, không cộng điểm nữa
    function victory() {
        clearInterval(game_loop);
        game_loop = null;
        game_over = true;
        game_started = false;
        go_up = false;
        setAutoPlay(false);                   // thắng thì bot dừng hoàn toàn
        bird.css("transform", "rotate(0deg)");
        message.addClass("win").html("Victory!<br>Bạn đã chiến thắng 🎉").show();
        $("#restart_btn").slideDown();
    }

    // Chơi lại: đưa mọi thứ về trạng thái ban đầu (không cần tải lại trang)
    function resetGame() {
        clearInterval(game_loop);
        game_loop = null;
        points = 0;
        current_level = 1;
        go_up = false;
        score_updated = false;
        game_over = false;
        game_started = false;

        score.text(points);
        level_text.text("Level 1");
        message.hide();
        bird.css({ top: "20%", transform: "rotate(0deg)" });
        poles.css({ right: pole_initial_position, height: pole_initial_height });
        $("#restart_btn").hide();
        $("#play_btn").show();
    }

    $("#restart_btn").click(function () {
        resetGame();
        $(this).blur();
    });

    /* ---------- 7. HÀM KIỂM TRA VA CHẠM (giữ như bài gốc) ---------- */
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        return true;
    }
});
