//================================================
//CORE class
//================================================
var core = {};
init();

function init() {

    function def(arg, val) {
        return typeof arg !== 'undefined' ? arg : val;
    }

    if (def(corep.js_show_errors, false))
        window.onerror = function (msg, url, linenumber) {
            alert('JS ERROR\n' + msg);
        };

    $(document).ready(function () {
        //Success,Info,Warning,Error
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        if (def(corep.js_show_errors, false))
            window.onerror = function (msg, url, linenumber) {
                var t = 'Error message: ' + msg;
                toastr["error"]("JavaScript", t);
            };
    });

    var util = {
        dump: function (obj) {
            var out = '';
            for (var i in obj) {
                out += i + ": " + obj[i] + "\n";
            }
            return out;
        },
        reject: function (data, yesMessage, noMessage) {
            if (data.result === 'ok')
                toastr['success'](def(yesMessage, data.message));
            else
                toastr['error'](def(noMessage, data.message));
        }
    };

    //------------------------------------------
    //Sidebar
    //------------------------------------------

    var sidebar = {
        isNoBackBtn: false,
        //functions
        init: function () {
            var $dynamicBody = $('#dynamicBody');
            $('.sidebar a', $dynamicBody).click(function () {
                core.sidebar.click(this);
            }).attr('onclick', 'return false;');

            if (window.location.hash !== '')
                this.nav(window.location.hash);
            $('[data-toggle=offcanvas]', $dynamicBody).click(function () {
                $('.row-offcanvas', $dynamicBody).toggleClass('active');
                window.scrollTo(0, 0);
            });
            $('[data-spy=affix]', $dynamicBody).affix('checkPosition');
        },
        nav: function (link) {
            this.isNoBackBtn = true;
            window.location.hash = link;
            //set link
            $('.row-offcanvas.active').removeClass('active');
            $('.sidebar a.active').removeClass('active');
            $('.sidebar a[href="' + link + '"]').addClass('active');
            //set view
            var n = $('.vis-blocks' + link);
            var c = $('.vis-blocks.active');
            if (c.attr('id') === n.attr('id')) return;
            c.removeClass('active');
            n.addClass('active');
            window.scrollTo(0, 0);

        },
        click: function (sender) {
            var href = $(sender).attr('href');
            //hide sidebar

            this.nav(href);
            return false;
        }
    };

    //------------------------------------------
    //Navbar
    //------------------------------------------

    var topnav = {
        //var
        inited: false,

        //functions
        init: function () {
            if (this.inited) return;
            $('.navbar .navbar-nav li a:not(.noajax)').click(function () {
                if ($(this).attr('href') !== '') {
                    core.topnav.click(this);
                    $(this).attr('onclick', 'return false;');
                    return false;
                }
            });

            // $(window).resize(function(){
            //     core.topnav.move_hr_toActive();
            // });

            this.inited = true;
            // this.move_hr_toActive();
        },
        click: function (sender) {
            var $navbar = $('.navbar .navbar-nav');
            var link = $(sender).attr('href');
            core.load(link.toString().trimSlash());
            
            if(!$(sender).hasClass('notab'))
                this.move_hr(sender);

        },
        update: function () {
            var $navbar = $('.navbar .navbar-nav');
            var link = core.uri(0);
            if (link.toLowerCase() === 'admin') {
                var d = core.uri(1);
                link = core.uri(0) + '/' + d; //(!d?'/':d);
            }
            $('li', $navbar).removeClass('active');
            var $a = $('li a[href="/' + link + '"]', $navbar);
            $a.parent().addClass('active');
            $('.get-title').html($a.text());

        },
        move_hr: function(obj){
            $(function(){
                //alert(typeof(obj) == 'undefined');
                //console.log(obj);

                var tt = $('#topnav_underline');
                var x = $(obj).offset().left;
                var w = $(obj).width();
                var pl = parseInt($(obj).css('padding-left'));
                var pp = 4;
                x = x+pl-pp;
                w = w+pp*2;
                
                tt.css({left:x, width:w});

                $('.collapse').collapse('hide');
            });
        },
        move_hr_toActive: function(){
            var p1 = $('.navbar .navbar-nav li.active');
            this.move_hr(p1);
        }
    };
    //------------------------------------------
    //News
    //------------------------------------------

    // var news = {
    //     delete: function (id, callback, _confirm) {
    //         _confirm = def(confirm, true);
    //         if (_confirm)
    //             if (!confirm('Вы уверены что хотите удалить?')) return;

    //         if (def(id, -1) === -1) return;
    //         core.api('editor', {
    //             id: id,
    //             action: 'delete'
    //         }, function (data) {
    //             core.news.reject(data, 'Удалено', 'Ошибка при удалении');
    //             callback(data);
    //         });
    //     },
    //     reject: function (data, yesMessage, noMessage) {
    //         if (data.result === 'ok')
    //             toastr['success']('Редактор', yesMessage);
    //         else
    //             toastr['error']('Редактор', noMessage);
    //     }
    // };

    // var images = {
    //     previewUpdate: function () {
    //         $('img.preview').each(function () {
    //             var link = $(this).attr('src');
    //             var j = link.split('/');

    //             var index = $.inArray('thumbs', j);
    //             if (index > -1) j[index] = 'files';

    //             link = j.join('/');
    //             $(this).click(function () {
    //                 // alert(link);
    //                 $modal = $("#imgpreview");
    //                 // $('.modal-body',$modal).html('<img src="'+link+'"/>');
    //                 $('.img01', $modal).attr('src', link);
    //                 $modal.modal();
    //             });

    //         });
    //     }
    // };

    //------------------------------------------
    //Core function
    //------------------------------------------

    core.load = function (pageName) {
        //dynamicBody
        // $('#dynamicBody').html('...');
        
        $('.navbar .loader').show();
        $.ajax({
            url: '/' + pageName.trimSlash(),
            type: 'POST',
            data: {
                ajax: true
            },
            success: function (data) {
                $('.navbar .loader').hide();
                $('#dynamicBody').html(data);
                // $('#dynamicBody').html($('body',data).html());
                window.history.pushState("", document.title, "/" + pageName);
                core.topnav.update();
                core.sidebar.init();
                core.images.previewUpdate();
                
            },
            error: function () {
                $('.navbar .loader').hide();
                $('#dynamicBody').html('<h2>Ошибка передачи данных</h2>');
            }
        });
    };

    core.nav = function (uri) {
        window.location = uri;
    };

    core.uri = function (index) {
        var path = window.location.pathname;
        var pp = path.trimSlash().split('/');
        if (index < pp.length)
            return pp[index];
        else
            return false;
    };

    core.pushLocation = function (add) {
        window.history.pushState("Details", "Title", window.location + "/" + add);
    };

    core.logout = function () {
        this.api('admin', {
            action: 'ajax_logout'
        }, function (data) {
            if (data.result === 'ok')
                core.nav('/');
        }, true);
    };


    core.api = function (controller, postdata, callback, reject) {
        postdata.ajax = true;
        $.post('/api/' + controller, postdata, function (data) {
            if (data.sys !== undefined) {
                if (data.sys['phper'] !== undefined) {
                    var dump = core.util.dump(data.sys['phper']);
                    toastr['error'](dump.replace('\n', '<br>'), 'PHP Error:');
                }

                if (data.sys['sqler'] !== undefined) {
                    var dump3 = core.util.dump(data.sys['sqler']);
                    toastr['error'](dump3.replace('\n', '<br>'), 'SQL Error:');
                }

                if (data.sys['apiInclude'] !== undefined) {
                    var dump2 = core.util.dump(data.sys['apiInclude']);
                    toastr['error'](dump2.replace('\n', '<br>'), 'API Error:');
                }
            }
            if (def(reject, false))
                core.util.reject(data.data);
            callback(data.data);
        }, 'json');
    };





    //append
    core.sidebar = sidebar;
    core.topnav = topnav;
    // core.news = news;
    core.util = util;
    // core.images = images;

    //back btn fix
    window.onpopstate = function () {
        if (core.sidebar.isNoBackBtn) {
            core.sidebar.isNoBackBtn = false;
            return;
        }
        core.sidebar.nav(location.hash);
        return false;
    };

}
//core end

//================================================
//PROTOTYPE
//================================================

String.prototype.trimSlash = function () {
    return this.replace(/^\/|\/$/g, "");
};

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


//////////////////////////////////////////////////////////////////////

function def() {
    for (var i = 0; i < arguments.length; i++) {
        if ((arguments[i] === null)
            || (typeof (arguments[i]) === 'undefined'))
            return false;
    }
    return true;
}

function defkey(obj,k) {
    return obj.hasOwnProperty(k);
}


//////////////////////////////////////////////////////////////////////

//Obj 'd'; coming d.record.InsertDateTime 2016-10-02T000:00:00:000
function recordInsertDateToStr(d) {
    var t;
    if (d.record.InsertDateTime == undefined)
        t = d.record.DateTimeInsert.split('T')[0].split('-');
    else
        t = d.record.InsertDateTime.split('T')[0].split('-');
    return "{0}-{1}-{2}".format(t[2], t[1], t[0]);
}

function DT_str(d, str) {
    if (d.record[str] == undefined) return '-';

    var date = new Date(d.record[str]);
    //var dt = localtime.split('T');
    //var t = dt[0].split('-');
    //try {
    //    var tt = dt[1].split('.')[0].split(':');
    //    return "{0}-{1}-{2} {3}:{4}:{5}".format(t[2], t[1], t[0], tt[0], tt[1], tt[2]);
    //} catch (ex) { };

    //return "{0}-{1}-{2}".format(t[2], t[1], t[0]);

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = date;
    var secondDate = new Date();

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

    var dts;
    if (diffDays < 1)
        dts = "сегодня в"
    else if (diffDays < 2)
        dts = "вчера в"
    else 
        dts = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

    var dth = (date + "").split(" ")[4];

    var r = dts + " " + dth;

    return r;
}


function q(selector) {
    return document.querySelector(selector);
}

function qa(selector) {
    return document.querySelectorAll(selector);
}

function getRandomInt(min, max) {
    if (!max)
      return Math.floor(Math.random() * (min));
    else
      return Math.floor(Math.random() * (max - min)) + min;
  }