/*/
/*
/* Rank: 1
/* Wap site main intialization
/* Rely on jquery files
/*
/*/

// Native language prototype chain extensions
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
String.prototype.keepDigital = function () {
    return this.replace(/\D/g, "");
};
String.keepDecimal = function () {
    var str;
    str = this.replace(/[^\d\.]*/g, "")
    var reg = /^\.\d+/g;
    var reg2 = /\./g;
    if (reg.test(str))
        return parseFloat(str.replace(/\./, "0."))
    return parseFloat(str);
};

// return random of from 0 to Number-1 
Number.prototype.GetRandom = function () {
    return Math.floor(Math.random() * this)
};

// Convert text to html
window.txt2html = function (txt) {
    var html, txt_list, _i, _len;
    txt_list = txt.split('\n');
    html = '';
    for (_i = 0, _len = txt_list.length; _i < _len; _i++)
        html += "<p>" + txt_list[_i] + "</p>";
    return html;
};


// 监测整个页面的click事件，如果事件源是数组中的值，那么将不会执行fn方法
$.documentClick = function (arr, fn) {
    $(document).mousedown(function (e) {
        var target = e.target;
        var end = false;
        for (var i in arr) {
            $(arr[i]).each(function () {
                if ($(this)[0] == target) {
                    end = true;
                    return false;
                }
            })
            if (end)
                return;
        }
        if (fn)
            fn();
    })
}


// Angelcrunch namespace
$.Angelcrunch = $.Angelcrunch || {};

// Angelcrunch data set
$.Angelcrunch.dataSet = $.Angelcrunch.dataSet || {};
(function () {
    var $dataSet = $.Angelcrunch.dataSet;

    var _matchFields = function (data1, data2) {
        //if (!(data1 && data2)) return false;
            for (var K in data1)
                data1[K] = data2[K] || "";
            return data1;
    }

    $dataSet.Model = {
        user: {
            id: "",
            access_token: ""
        },
        projectDetails: "",
        projectBasicInformation: ""
    };
    $dataSet.operation = {
        setUser: function (userData) {
            $dataSet.Model.user = _matchFields($dataSet.Model.user, userData);
        }
    }
}).call(this);

(function () {
    var analysis_comid = function () {
        // Url format : http://12917928.tonghs.me/
        // Discard   // Url format : http://localhost:46051/html/investor/details/38201920/?xx=xxx
        var reg, href, matchStr, comid;
        // reg = /\/details\/(\d+)\//i;
        reg = /(\d+)\./;
        href = location.href;
        matchStr = href.match(reg);
        comid = matchStr ? matchStr[1] : "";
        return comid || "";
    }

    $.Angelcrunch.url = {
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        getSource: function () {
            return unescape(this.getQueryString("source"));
        },
        getComid: function () {
            return this.getQueryString("comid") || "";
        }
    }
}).call(this);

// Tools

$.Angelcrunch.regexStr = {
    phone: /^\d{11}$/,
    strict_validation_phone: /^(1(([35][0-9])|(47)|[8][0126789]))\d{8}$/,
    mail: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/,
    qq: /^\d{5,10}$/,
    chinese_Unicode: /^[\u2E80-\u9FFF]+$/,
    chinese_Name: /^[\u2E80-\u9FFF]{2,5}$/
};

$.Angelcrunch.preventRepeatClick = function ($this, time) {
    if ($this.hasClass("js-wait"))
        return true;
    else {
        $this.addClass("js-wait");
        setTimeout((function ($this) {
            return function () {
                $this.removeClass("js-wait");
            }
        })($this), 600);
        return false;
    }
};

$.fn.keyCode_enter_bind = function (fn) {
    $(this).keydown(function (e) {
        var enter = 13;
        if (e.keyCode == enter) {
            if (typeof fn == "function")
                fn();
            $(this).blur();
        }
    })
    return $(this);
};

$.fn.input_text_autocomplete = function (turn_on) {
    var auto = turn_on ? "on" : "off";
    $(this).attr("autocomplete", auto);
};

// 使input元素只能输入数字
$.fn.justNumber = function (Decimal) {
    $(this).keydown(function (e) {
        var minNum = 48, maxNum = 57,
            del = 46, back = 8,
            tab = 9,
            home = 36, end = 35,
            min2 = 37, max2 = 40;
        var dec = 190;
        if ((e.keyCode >= minNum && e.keyCode <= maxNum) ||
            e.keyCode == del || e.keyCode == back ||
            e.keyCode == tab ||
            e.keyCode == home || e.keyCode == end ||
            (e.keyCode >= min2 && e.keyCode <= max2)) {
            return true;
        }
        if (Decimal)
            if (e.keyCode == 190) return true;

        return false;
    })
    return $(this);
};

$.fn.ReplacedVSHalfWidthSymbols = function (onlyText) {
    var htm = $(this).html().replace(/，/g, ", ").replace(/：/g, ": ").replace(/；/g, "; ");
    $(this).html(htm);
};

// Modules

$.Angelcrunch.back2top = function () {
    $(".st-top").click(function () {
        $(document).scrollTop(0);
    })
};

$.Angelcrunch.changeTitleTxt = function (str) {
    if (str) $("head title").text(str);
};

/**********************
      Slider module
  **********************/
;(function () {
    var className = {
        container: ".slider-container",
        list: ".slider-container > ul",
    };
    var defaultConfig = {
        toRight: false,
        rightSpaceWidth: 60
    }

    var _imgManipulation = function ($img, options) {
        var $container = $img.closest(className.container);
        $img.hide();
        $img.load(function () {
            $img.show();
            $container.calculateSliderModuleWidth(options);
        })
    };
    var _calculationLogic = function (options) {
        var toRight, varible,
            measure, globeWidth,
            config;
        var $image;
        config = options || defaultConfig;
        toRight = config.toRight || defaultConfig.toRight,
        varible = config.rightSpaceWidth != undefined ?
                  config.rightSpaceWidth : defaultConfig.rightSpaceWidth,
        measure = varible,
        globeWidth = $(".details").width();

        $(this).find("li").each(function () {
            $image = $(this).find("img");
            if (!$(this).width() && $image && $image.attr("src")) {
                _imgManipulation($image, toRight);
            };
            measure += $(this).outerWidth();
        });
        if (((measure - varible) > globeWidth)) {
            $(this).width(measure);
            if (toRight) $(this).parent().scrollLeft(measure);
            else $(this).parent().scrollLeft(0);
        }
    };
    // Group Method
    // Slider module overflow initial
    $.Angelcrunch.calculateSliderModuleWidth = function (options) {
        $(className.list).each(function () {
            _calculationLogic.call(options);
        });
    };
    // Single Method
    // Slider module overflow initial
    $.fn.calculateSliderModuleWidth = function (options) {
        $(this).find("ul").each(function () {
            _calculationLogic.call(this, options)
        });
    };
}).call(this);

(function () {
    var className = {
        container: ".mentos-container",
        checkbox: ".mentos-container :checkbox",
        // State
        beChecked: "checked"
    };
    var _changeCheckboxModuleState = function () {
        var $container = $($(this).closest(className.container));
        if ($(this).is(":checked")) $container.addClass(className.beChecked);
        else $container.removeClass(className.beChecked);
    };

    $.Angelcrunch.formModules = function () {
        var $container, $checkbox;
        $checkbox = $(className.checkbox);
        $checkbox.change(function () {
            _changeCheckboxModuleState.call(this);
        })

    }
}).call(this);

$.Angelcrunch.dialogueConfirm = function () {
    $("[data-confirm-dialogue]").click(function () {
        if (confirm($(this).attr("data-confirm-dialogue"))) return true;
        else return false;
    });
};

$.Angelcrunch.notificationInit = function () {
    var className = {
        bar: ".notification"
    }
    var $bar, $close;
    $bar = $(className.bar);
    $close = $bar.find(".close");
    $close.click(function () {
        $(this).closest(className.bar).fadeOut(240);
    });
};

$.Angelcrunch.linkBtnInit = function () {
    $("button[data-href]").click(function () {
        var href = $(this).attr("data-href"),
            _target = $(this).attr("data-target");
        if (_target == "_blank") window.open(href);
        else location.href = href;
    });
};


// Module Initialize
$(function () {
    $.Angelcrunch.back2top();
    $.Angelcrunch.dialogueConfirm();
    $.Angelcrunch.notificationInit();
    $.Angelcrunch.formModules();
    $.Angelcrunch.linkBtnInit();
})