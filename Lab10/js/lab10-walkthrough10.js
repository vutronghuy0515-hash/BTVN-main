$(function () {
    $('.animLoading').hide();
    $("#consume").click(function () {
        $('.animLoading').show();
        var url = "https://geocoding-api.open-meteo.com/v1/search?name=London&count=10&language=en&format=json";

        $.get(url)
            // done will happen first
            .done(function (data) {
                $.each(data.results, function (index, value) {
                    var li = $('<li/>').html(value.name);
                    li.appendTo("div#results ul");
                });
            })
            // if error occurs will execute, but before always()
            .fail(function (xhr, status, error) {
                alert("failed loading data - status=" + status +
                        " error=" + error);
            })
            // always should be last
            .always(function (data) {
                $('.animLoading').fadeOut("slow");
            });
    });
});
