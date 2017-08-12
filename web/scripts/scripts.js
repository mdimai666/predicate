
function bootstrap_equalizer(selector) {
    var heights = $(selector).map(function () {
        return $(this).height();
    }).get();
    maxHeight = Math.max.apply(null, heights);
    $(selector).height(maxHeight);
}


$(function () { 
    //anchor scroll smoth
    // $('a[href^=\\#]:not([data-slide])[href!=\\#]').on('click', function (event) {
    //     event.preventDefault();
    //     $('html,body').animate({
    //         scrollTop: $(this.hash).offset().top
    //     }, 500);
    // });

    //add scroll to top btn
    // (function () {
    //     var v = '<i class=""></i>';
    //     var e = $('<a href="#" class="scrollToTop scale2">' + v + '</a>');
    //     $('body').append(e);

    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() > 1000) {
    //             e.fadeIn();
    //         } else {
    //             e.fadeOut();
    //         }
    //     });

    //     e.click(function () {
    //         $('html, body').animate({
    //             scrollTop: 0
    //         }, 800);
    //         return false;
    //     });

    // })();

    // $('.xslider').slider({
    //     formatter: function(value) {
    //         return abc2(value);

    //         // return '' + value;
    //     },
    //     tooltip: 'always'

    // });

    $('nav.navbar a').click(function(){
        f_nav(this);
    });

    $('#send1').click(function(){
        f_nav(this);
    });
});

function f_nav(a){
    var h = $(a).attr('href').substr(1);
    $('#main .page.active').removeClass('active');
    $('#main .page#'+h).addClass('active');
    $('nav .navbar-collapse').collapse('hide');
}

function abc2(n) {
    n += "";
    n = new Array(4 - n.length % 3).join("U") + n;
    return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}