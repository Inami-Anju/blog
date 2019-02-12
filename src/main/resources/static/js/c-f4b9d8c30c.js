function getMessage(o) {
    var t = $('<div class="alert alert-danger" role="alert" ></div>');
    t.append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    var e = $('<span id="signin-msg"></span>');
    return e.append(o), t.append(e), t.prop("outerHTML")
}

function signin() {
    $.ajax({
        url: "/login", type: "post", data: $("#signin-form").serialize(), dataType: "json", error: function (o) {
            console.log(o)
        }, success: function (o) {
            "success" == o.message ? location.reload() : $("#signin-msg").html(getMessage(o.message))
        }
    })
}

function signup() {
    $.ajax({
        url: "/signup", type: "post", data: $("#signup-form").serialize(), dataType: "json", error: function (o) {
            console.log(o)
        }, success: function (o) {
            $("#signup-msg").html(getMessage(o.message))
        }
    })
}

function setCookie(o, t) {
    var e = new Date;
    e.setTime(e.getTime() + 36e5), document.cookie = o + "=" + escape(t) + ";path=/;expires=" + e.toGMTString()
}

function getCookie(o) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(o + "="), -1 != c_start) ? (c_start = c_start + o.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}

!function (o) {
    "use strict";

    function t(o) {
        o.touches || (o.touches = o.originalEvent.touches)
    }

    function e(o, t) {
        t._startY = o.touches[0].pageY, t.touchScrollTop = t.$scrollArea.scrollTop()
    }

    function n(t, e) {
        e._curY = t.touches[0].pageY, e._moveY = e._curY - e._startY, e._moveY > 0 ? e.direction = "down" : e._moveY < 0 && (e.direction = "up");
        var n = Math.abs(e._moveY);
        "" != e.opts.loadUpFn && e.touchScrollTop <= 0 && "down" == e.direction && !e.isLockUp && (t.preventDefault(), e.$domUp = o("." + e.opts.domUp.domClass), e.upInsertDOM || (e.$element.prepend('<div class="' + e.opts.domUp.domClass + '"></div>'), e.upInsertDOM = !0), c(e.$domUp, 0), n <= e.opts.distance ? (e._offsetY = n, e.$domUp.html(e.opts.domUp.domRefresh)) : n > e.opts.distance && n <= 2 * e.opts.distance ? (e._offsetY = e.opts.distance + .5 * (n - e.opts.distance), e.$domUp.html(e.opts.domUp.domUpdate)) : e._offsetY = e.opts.distance + .5 * e.opts.distance + .2 * (n - 2 * e.opts.distance), e.$domUp.css({height: e._offsetY}))
    }

    function s(t) {
        var e = Math.abs(t._moveY);
        "" != t.opts.loadUpFn && t.touchScrollTop <= 0 && "down" == t.direction && !t.isLockUp && (c(t.$domUp, 300), e > t.opts.distance ? (t.$domUp.css({height: t.$domUp.children().height()}), t.$domUp.html(t.opts.domUp.domLoad), t.loading = !0, t.opts.loadUpFn(t)) : t.$domUp.css({height: "0"}).on("webkitTransitionEnd mozTransitionEnd transitionend", function () {
            t.upInsertDOM = !1, o(this).remove()
        }), t._moveY = 0)
    }

    function i(o) {
        "" != o.opts.loadDownFn && o.opts.autoLoad && o._scrollContentHeight - o._threshold <= o._scrollWindowHeight && d(o)
    }

    function a(o) {
        o._scrollContentHeight = o.opts.scrollArea == l ? h.height() : o.$element[0].scrollHeight
    }

    function d(o) {
        o.direction = "up", o.$domDown.html(o.opts.domDown.domLoad), o.loading = !0, o.opts.loadDownFn(o)
    }

    function c(o, t) {
        o.css({"-webkit-transition": "all " + t + "ms", transition: "all " + t + "ms"})
    }

    var r, l = window, p = document, m = o(l), h = o(p);
    o.fn.dropload = function (o) {
        return new r(this, o)
    }, r = function (o, t) {
        var e = this;
        e.$element = o, e.upInsertDOM = !1, e.loading = !1, e.isLockUp = !1, e.isLockDown = !1, e.isData = !0, e._scrollTop = 0, e._threshold = 0, e.init(t)
    }, r.prototype.init = function (a) {
        var c = this;
        c.opts = o.extend(!0, {}, {
            scrollArea: c.$element,
            domUp: {
                domClass: "dropload-up",
                domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate: '<div class="dropload-update">↑释放更新</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            domDown: {
                domClass: "dropload-down",
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">暂无数据</div>'
            },
            autoLoad: !0,
            distance: 50,
            threshold: "",
            loadUpFn: "",
            loadDownFn: ""
        }, a), "" != c.opts.loadDownFn && (c.$element.after('<div class="' + c.opts.domDown.domClass + '">' + c.opts.domDown.domRefresh + "</div>"), c.$domDown = o("." + c.opts.domDown.domClass)), c._threshold = c.$domDown && "" === c.opts.threshold ? Math.floor(1 * c.$domDown.height() / 3) : c.opts.threshold, c.opts.scrollArea == l ? (c.$scrollArea = m, c._scrollContentHeight = h.height(), c._scrollWindowHeight = p.documentElement.clientHeight) : (c.$scrollArea = c.opts.scrollArea, c._scrollContentHeight = c.$element[0].scrollHeight, c._scrollWindowHeight = c.$element.height()), i(c), m.on("resize", function () {
            clearTimeout(c.timer), c.timer = setTimeout(function () {
                c._scrollWindowHeight = c.opts.scrollArea == l ? l.innerHeight : c.$element.height(), i(c)
            }, 150)
        }), c.$element.on("touchstart", function (o) {
            c.loading || (t(o), e(o, c))
        }), c.$element.on("touchmove", function (o) {
            c.loading || (t(o), n(o, c))
        }), c.$element.on("touchend", function () {
            c.loading || s(c)
        }), c.$scrollArea.on("scroll", function () {
            c._scrollTop = c.$scrollArea.scrollTop(), "" != c.opts.loadDownFn && !c.loading && !c.isLockDown && c._scrollContentHeight - c._threshold <= c._scrollWindowHeight + c._scrollTop && d(c)
        })
    }, r.prototype.lock = function (o) {
        var t = this;
        void 0 === o ? "up" == t.direction ? t.isLockDown = !0 : "down" == t.direction ? t.isLockUp = !0 : (t.isLockUp = !0, t.isLockDown = !0) : "up" == o ? t.isLockUp = !0 : "down" == o && (t.isLockDown = !0, t.direction = "up")
    }, r.prototype.unlock = function () {
        var o = this;
        o.isLockUp = !1, o.isLockDown = !1, o.direction = "up"
    }, r.prototype.noData = function (o) {
        var t = this;
        void 0 === o || 1 == o ? t.isData = !1 : 0 == o && (t.isData = !0)
    }, r.prototype.resetload = function () {
        var t = this;
        "down" == t.direction && t.upInsertDOM ? t.$domUp.css({height: "0"}).on("webkitTransitionEnd mozTransitionEnd transitionend", function () {
            t.loading = !1, t.upInsertDOM = !1, o(this).remove(), a(t)
        }) : "up" == t.direction && (t.loading = !1, t.isData ? (t.$domDown.html(t.opts.domDown.domRefresh), a(t), i(t)) : t.$domDown.html(t.opts.domDown.domNoData))
    }
}(window.Zepto || window.jQuery), $.extend({
    parserCaption: function (o) {
        t = "_blank";
        return o && (o = o.replace(/@([^\s#@.,:"!?~<>]*)/g, "<a href='/$1' target='" + t + "'>@$1</a>"), o = o.replace(/#([^\s#@.,:"!?~<>]*)/g, "<a href='/tag/$1' target='" + t + "'>#$1</a>")), o
    }
});
var gotop = function () {
    $("html,body").animate({scrollTop: 0}, 100)
};
$(function () {
    var o = $("#js-go-top");
    o.css("display", "none"), $(window).scroll(function () {
        var t = $(this).height();
        $(this).scrollTop() > t + 70 ? o.css("display", "block") : o.css("display", "none")
    }), $("#web-note-ad-fixed .close").click(function () {
        return $("#web-note-ad-fixed").css("display", "none"), !1
    }), $(".signin a").click(function (o) {
        o.preventDefault(), $(this).tab("show")
    })
});
var _hmt = _hmt || [];
!function () {
    var o = document.createElement("script");
    o.src = "https://hm.baidu.com/hm.js?453ab3ca06e82d916be6d6937c3bf101";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(o, t)
}(), 1 == getCookie("hd_hongbao") || ($(".hongbao_hb").removeClass("hide"), setCookie("hd_hongbao", 1)), $(".hd_close,.hd-code a").on("click", function () {
    $(".hongbao_hb").remove()
});