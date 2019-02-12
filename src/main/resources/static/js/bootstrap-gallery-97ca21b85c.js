!function (e) {
    "use strict";
    var t = function (n, i) {
        if (this.$gallery = e(n), this.options = e.extend({}, t.defaults), i && i.hasOwnProperty("iconset") && "fontawesome" == i.iconset && e.extend(this.options, t.fontawesomeOptions), e.extend(this.options, i), this.count = this.$gallery.children().length, this.index = 0, void 0 === t.elements) {
            var r = {
                $modal: e("<div/>").attr(this.options.modalAttrs),
                $container: e("<div/>").attr(this.options.containerAttrs),
                $closeBtn: e("<button/>").attr(this.options.closeBtnAttrs),
                $btnPrev: e("<button/>").attr(this.options.btnPrevAttrs),
                $btnNext: e("<button/>").attr(this.options.btnNextAttrs),
                $img: e("<img/>").attr(this.options.imgAttrs),
                $indicator: e("<span/>").attr(this.options.indicatorAttrs)
            };
            this.options.caption && (r.$caption = e("<div/>").attr({class: "caption "})), r.$header = e("<div/>").attr({class: "caption-header"}), r.$article = e("<div/>").attr({class: "article "}), r.$imgwrapper = e("<div/>").attr({class: "imgwrapper "}), r.$controler = e("<div/>").attr({class: "controler "}), r.$imgwrapper.append(r.$img), r.$article.append(r.$header, r.$imgwrapper, r.$caption);
            var a = e('<div class="next-prev"></div>');
            a.append(r.$btnPrev, r.$btnNext), r.$controler.append(a), r.$container.append(r.$article), r.$container.append(r.$indicator), r.$modal.append(r.$closeBtn, r.$controler, r.$container), e("body").append(r.$modal), this.elements = r, t.elements = r, this.registerKeys(), this.registerWindowResize(), this.registerTouches(), window.addEventListener("popstate", function () {
                location.href.indexOf("/p/") > 0 ? r.$modal.modal() : r.$modal.modal("hide")
            }), r.$modal.on("hidden.bs.modal", function (e) {
                location.href.indexOf("/p/") > 0 && history.go(-1)
            })
        } else this.elements = t.elements;
        this.registerThumbs()
    };
    t.defaults = {
        modalAttrs: {
            id: "gallery-modal",
            class: "modal fade",
            tabindex: "-1",
            role: "dialog",
            "aria-hidden": "true"
        },
        containerAttrs: {class: "img-container"},
        wrapperAttrs: {class: "img-wrapper"},
        imgAttrs: {class: "", src: "#"},
        closeBtnAttrs: {class: "btn-close glyphicon glyphicon-remove", "aria-hidden": "true"},
        btnPrevAttrs: {class: "btn-prev glyphicon glyphicon-chevron-left"},
        btnNextAttrs: {class: "btn-next glyphicon glyphicon-chevron-right"},
        indicatorAttrs: {class: "indicator glyphicon glyphicon-refresh"},
        captionAttrs: {class: "caption"},
        indicatorThreshold: 100,
        swipeThreshold: 30,
        caption: !1,
        hideUnnecessaryIcons: !0
    }, t.fontawesomeOptions = {
        closeBtnAttrs: {class: "btn-close fa fa-times", "aria-hidden": "true"},
        btnPrevAttrs: {class: "btn-prev fa fa-angle-left"},
        btnNextAttrs: {class: "btn-next fa fa-angle-right"},
        indicatorAttrs: {class: "indicator fa fa-refresh fa-spin"}
    }, t.prototype.registerBtns = function () {
        var e = this.elements, t = this.options, n = this;
        n.count < 2 && t.hideUnnecessaryIcons ? (e.$btnNext.addClass("hide"), e.$btnPrev.addClass("hide")) : (e.$btnNext.off("click").on("click", function (e) {
            return e.preventDefault(), n.index++, n.index >= n.count && (n.index = 0), n.updateImg(n.index), !1
        }), e.$btnPrev.off("click").on("click", function (e) {
            return e.preventDefault(), n.index--, n.index < 0 && (n.index = n.count - 1), n.updateImg(n.index), !1
        })), e.$container.off("click").on("click", function (t) {
            "img-container" != this.className && (t.preventDefault(), e.$modal.modal("hide"))
        }), e.$closeBtn.off("click").on("click", function (t) {
            t.preventDefault(), e.$modal.modal("hide")
        }), e.hasOwnProperty("$wrapper") ? (e.$container.off("click").on("click", function (t) {
            t.preventDefault(), e.$modal.modal("hide")
        }), e.$wrapper.off("click").on("click", function (e) {
            return e.preventDefault(), !1
        })) : e.$img.off("click").on("click", function (e) {
            return e.preventDefault(), !1
        })
    }, t.prototype.registerKeys = function () {
        var e = this.elements;
        e.$modal.off("keydown").on("keydown", function (t) {
            37 == t.keyCode && e.$btnPrev.click(), 39 == t.keyCode && e.$btnNext.click(), 27 == t.keyCode && e.$modal.modal("hide")
        })
    }, t.prototype.registerThumbs = function () {
        var t = this.elements, n = this;
        this.$gallery.children().each(function () {
            e(this).off("click").on("click", function (i) {
                e(i.target).hasClass("thumb") && (i.preventDefault(), t.$indicator.css("display", "none"), n.index = e(this).index(), n.updateImg(n.index, 1), t.$modal.modal(), n.registerBtns(), setTimeout(function () {
                    t.$modal.focus()
                }, 200))
            })
        })
    }, t.prototype.registerTouches = function () {
        var t = this;
        t.elements.$modal.on("touchstart", function (e) {
            var n = (e.originalEvent || e).touches[0];
            t.touchStart = {x: n.pageX, y: n.pageY}, t.isScrolling = void 0, t.touchDelta = {}
        }).on("touchmove", function (e) {
            "IMG" != e.target.nodeName && "VIDEO" != e.target.nodeName || (e.preventDefault(), e.stopPropagation);
            var n = (e.originalEvent || e).touches[0];
            t.touchDelta = {x: n.pageX - t.touchStart.x, y: n.pageY - t.touchStart.y}
        }).on("touchend", function (n) {
            if ("IMG" == n.target.nodeName || "VIDEO" == n.target.nodeName) {
                t.touchDelta.y > 50 ? t.elements.$modal.modal("hide") : t.touchDelta.y < -50 ? e(t.elements.$container).scrollTop(-t.touchDelta.y) : t.touchDelta.x < -20 ? t.elements.$btnNext.click() : t.touchDelta.x > 20 && t.elements.$btnPrev.click()
            }
        })
    }, t.prototype.registerWindowResize = function () {
        if (this.elements.hasOwnProperty("$wrapper")) {
            var t = this.elements.wrapper;
            e(window).resize(function () {
                t.style.display = "none", t.offsetHeight, t.style.display = "inline-block"
            })
        } else e(window).resize(function () {
        })
    }, t.prototype.updateImg = function (t, n) {
        var i = this,
            r = (i.$gallery.children().get(t), e(i.$gallery.children().get(t)).find(".img-wrap").attr("data-src")),
            a = (e(i.$gallery.children().get(t)).find(".thumb").attr("srcset"), e(i.$gallery.children().get(t)).find(".img-wrap").attr("data-code")),
            o = e(i.$gallery.children().get(t)).find(".thumb").attr("alt");
        if (o = e.parserCaption(o), a && (n && 1 == n ? history.pushState({}, "", "/p/" + a) : history.replaceState(null, null, "/p/" + a)), i.elements.$img.attr("src") != r) {
            if (i.elements.$imgwrapper.html(""), i.elements.$imgwrapper.css("background-color", "#e7e7e7"), i.elements.$img.attr("srcset", ""), i.options.caption && (i.elements.$caption.css("display", "inline-block"), o)) {
                i.elements.$caption.html(o);
                var s = ' <a href="/p/' + a + '" target="blank"><span >...查看评论</span></a>';
                i.elements.$caption.append(s)
            }
            i.elements.$img.attr("src", r).load(function () {
                i.elements.$imgwrapper.css("background-color", "#e7e7e7")
            }), i.elements.$imgwrapper.html(i.elements.$img), i.elements.$header.html(""), a && e.ajax({
                type: "post", url: "/p/" + a, success: function (t) {
                    var n = t.owner.profile_pic_url, r = t.owner.full_name, o = t.owner.username,
                        s = e('<ol class="carousel-indicators"></ol>');
                    if (t.sidecar && t.sidecar.length > 1) {
                        var l = e("<div/>").attr({class: "slides-controler"});
                        l.append('<a class="pre"><</a>'), l.append('<a class="next">></a>');
                        for (var c in t.sidecar) if (0 == c) {
                            s.append('<li data-slide-to="' + c + '" class="active"></li>');
                            var p = t.sidecar[c];
                            if ("GraphVideo" == p.__typename) {
                                i.elements.$imgwrapper.find("img").remove(), i.elements.$imgwrapper.find("video").remove();
                                var d = p.video_url,
                                    m = ' <video width="100%" height="100%"  controls="controls" poster="' + p.display_url + '" ><source src="' + d + '" type="video/mp4">Your browser does not support HTML5 video.</video>';
                                i.elements.$imgwrapper.find("img").remove(), i.elements.$imgwrapper.append(m)
                            }
                        } else s.append('<li data-slide-to="' + c + '" class=""></li>');
                        i.elements.$imgwrapper.append(s), i.elements.$imgwrapper.append(l), i.elements.$imgwrapper.hover(function () {
                            l.find("a").css("display", "block")
                        }), i.elements.$imgwrapper.mouseleave(function () {
                            l.find("a").css("display", "none")
                        }), l.find("a").click(function () {
                            var n, r = s.find(".active").data("slide-to");
                            n = e(this).hasClass("pre") ? -1 : 1;
                            var a = r + n;
                            if (a >= 0 && a < t.sidecar.length) {
                                e(".carousel-indicators li").removeClass("active"), e(".carousel-indicators li:eq(" + a + ")").addClass("active");
                                var o = t.sidecar[a];
                                if (i.elements.$imgwrapper.find("img").remove(), i.elements.$imgwrapper.find("video").remove(), "GraphImage" == o.__typename) i.elements.$img.attr("srcset", o.srcset), i.elements.$img.attr("src", o.display_url).load(function () {
                                    i.elements.$imgwrapper.css("background-color", "#ccc")
                                }), i.elements.$imgwrapper.append(i.elements.$img); else {
                                    var l = o.video_url,
                                        c = ' <video width="100%" height="100%"  controls="controls" poster="' + o.display_url + '" ><source src="' + l + '" type="video/mp4">Your browser does not support HTML5 video.</video>';
                                    i.elements.$imgwrapper.find("img").remove(), i.elements.$imgwrapper.append(c)
                                }
                            }
                        }), s.find("li").click(function () {
                            e(".carousel-indicators li").removeClass("active");
                            var n = e(this).data("slide-to");
                            e(this).addClass("active");
                            var r = t.sidecar[n];
                            if (i.elements.$imgwrapper.find("img").remove(), i.elements.$imgwrapper.find("video").remove(), "GraphImage" == r.__typename) i.elements.$img.attr("srcset", r.srcset), i.elements.$img.attr("src", r.display_url).load(function () {
                                i.elements.$imgwrapper.css("background-color", "#ccc")
                            }), i.elements.$imgwrapper.append(i.elements.$img); else {
                                var a = r.video_url,
                                    o = ' <video width="100%" height="100%"  controls="controls" poster="' + r.display_url + '" ><source src="' + a + '" type="video/mp4">Your browser does not support HTML5 video.</video>';
                                i.elements.$imgwrapper.find("img").remove(), i.elements.$imgwrapper.append(o)
                            }
                        })
                    }
                    var h = e('<img width="45px" src=' + n + ' class="img-circle avatar">'),
                        u = e("<a href=/" + o + "></a>");
                    u.append(h).append(r), i.elements.$header.html(u);
                    var f = ' <a href="/p/' + a + '" target="blank"><span class="glyphicon glyphicon-option-vertical "></span></a>';
                    if (i.elements.$header.append(f), t.is_video) {
                        var d = t.video_url,
                            m = ' <video width="100%" height="100%"  controls="controls" poster="' + t.display_url + '" ><source src="' + d + '" type="video/mp4">Your browser does not support HTML5 video.</video>';
                        i.elements.$imgwrapper.html(m)
                    }
                }
            })
        }
    };
    var n = e.fn.bootstrapGallery;
    e.fn.bootstrapGallery = function (n) {
        return this.each(function () {
            var i = e(this).data("bs.Gallery");
            if (i) {
                var r = i.elements, a = i;
                i.$gallery.children().each(function () {
                    e(this).off("click").on("click", function (t) {
                        e(t.target).hasClass("thumb") && (t.preventDefault(), r.$indicator.css("display", "none"), a.index = e(this).index(), a.updateImg(a.index, 1), r.$modal.modal(), a.registerBtns(), setTimeout(function () {
                            r.$modal.focus()
                        }, 200))
                    })
                }), i.count = i.$gallery.children().length
            } else e(this).data("bs.Gallery", i = new t(e(this), n))
        })
    }, e.fn.bootstrapGallery.Constructor = t, e.fn.bootstrapGallery.noConflict = function () {
        return e.fn.bootstrapGallery = n, this
    }
}(jQuery);