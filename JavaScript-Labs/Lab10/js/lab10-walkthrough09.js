$(function () {
    $("#consume").click(function () {
        var url = "https://geocoding-api.open-meteo.com/v1/search?name=London&count=10&language=en&format=json";
        $("#results").html("<ul></ul>");
        $.get(url, function (data, status) {
           if (status == "success" && data.results) {
                $.each(data.results, function (index, value) {
                    var li = $("<li/>").html(
                        value.name + " - " + value.country
                    );
                    li.appendTo("#results ul");

                });
            }

        }, "json");

    });

});