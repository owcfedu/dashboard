// Dealing with window resizing event

$(function() {
    // show the side menu
    $('#side-menu').metisMenu();
    $(window).bind("load resize", function() {

        // 1. Bootstrap framework resizing
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse')
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse')
        }

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }

        // 2. Resize all the charts
        // for index main metrics
        if (typeof drawChildren != 'undefined') {
            drawChildren();
        }
        if (typeof drawDollars != 'undefined') {
            drawDollars();
        }

        // for continental
        if (typeof drawAge != 'undefined') {
            drawAge();
        }
        if (typeof drawGender != 'undefined') {
            drawGender();
        }
        if (typeof drawCountry != 'undefined') {
            drawCountry();
        }
        if (typeof drawEducat != 'undefined') {
            drawEducat();
        }
    });
})

