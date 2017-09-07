//------------------------------------------
//Document Ready 
//------------------------------------------

function init_links() {
    // core.topnav.init();
    // core.sidebar.init();
    // core.images.previewUpdate();            
}

$(document).ready(function () {
    // core.topnav.update();
    // init_links();
});

$(document).ready(function () {

    // $('nav.navbar a').click(function(){
    //     f_nav(this);
    // });

    // $('#send1').click(function(){
    //     f_nav(this);
    // });
});

// function f_nav(a){
//     var h = $(a).attr('href').substr(1);
//     $('#main .page.active').removeClass('active');
//     $('#main .page#'+h).addClass('active');
//     $('nav .navbar-collapse').collapse('hide');
// }

// function abc2(n) {
//     n += "";
//     n = new Array(4 - n.length % 3).join("U") + n;
//     return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
// }

//tools
function bootstrap_equalizer(selector) {
    var heights = $(selector).map(function () {
        return $(this).height();
    }).get();
    maxHeight = Math.max.apply(null, heights);
    $(selector).height(maxHeight);
}
