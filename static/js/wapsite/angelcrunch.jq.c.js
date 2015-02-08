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

$.Angelcrunch.back2top = function () {
    $(".st-top").click(function () {
        $(document).scrollTop(0);
    })
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

/**********************
      Slider module
  **********************/
(function () {
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
}


// Module Initialize
$(function () {
    $.Angelcrunch.back2top();
    $.Angelcrunch.dialogueConfirm();
    $.Angelcrunch.notificationInit();
})