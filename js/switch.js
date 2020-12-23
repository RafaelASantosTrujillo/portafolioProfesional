$("#switch").on('click', function() {
    console.log("Se dio click")
    if ($("#fullpage").hasClass("night")) {
        $("#fullpage").removeClass("night");
        $("#switch").removeClass("switched");
    } else {
        $("#fullpage").addClass("night");
        $("#switch").addClass("switched");
    }
});