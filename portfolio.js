(function(f) {
    var h = false,
    a;
    f.boss = function(m) {
        if (h) {
            return
        }
        a = f.extend({},
        f.boss.defaults, m);
        g();
        if ("origin" in a) {
            b({
                iTy: a.origin,
                sUrl: encodeURIComponent(location.href),
                sRefer: encodeURIComponent(document.referrer)
            })
        }
        h = true
    };
    f.boss.defaults = {
        recurse: true
    };
    var d, j = null,
    i = null,
    c = function(o) {
        var m = ["http://btrace.qq.com/collect?sIp=&iQQ="];
        if ("iQQ" in o) {
            m.push(o.iQQ)
        } else {
            if (typeof(window.trimUin) == "function" && typeof(window.pgvGetCookieByName) == "function") {
                m.push(window.trimUin(window.pgvGetCookieByName("o_cookie=")))
            } else {
                var p = f.cookie("o_cookie") || f.cookie("uin") || f.cookie("luin");
                if (p) {
                    p = p.replace(/^o0+/, "");
                    m.push(p)
                }
            }
        }
        m.push("&sBiz=", ("sBiz" in o) ? o.sBiz: "", "&sOp=", ("sOp" in o) ? o.sOp: "", "&iSta=", ("iSta" in o) ? o.iSta: "", "&iTy=", ("iTy" in o) ? o.iTy: "", "&iFlow=", ("iFlow" in o) ? o.iFlow: "");
        for (var q in o) {
            if ("&sIp&iQQ&sBiz&sOp&iSta&iTy&iFlow".indexOf("&" + q) < 0) {
                m.push("&", q, "=", o[q])
            }
        }
        m.push("&", Math.random());
        return m.join("")
    },
    e = [],
    b = function(m) {
        if (m) {
            m.iTy = m.iTy || a.iTy;
            e.push(m)
        }
        if (j === null) {
            j = new Image();
            j.onload = j.onerror = function() {
                if (i !== null) {
                    clearTimeout(i);
                    i = null
                }
                b()
            }
        }
        if (e.length === 0) {
            if (typeof b.onClear == "function") {
                b.onClear()
            }
        } else {
            if (i === null) {
                m = e.pop();
                if (m) {
                    j.src = c(m);
                    i = setTimeout(function() {
                        i = null;
                        b()
                    },
                    5000)
                }
            }
        }
    },
    l = (function() {
        if (f.browser.msie) {
            var m = "du-win-open-a";
            return function(n, o) {
                var p = f("#" + m);
                if (!p) {
                    f(document.body).append('<a id="' + m + '" style="display:none;"></a>');
                    p = f("#" + m)
                }
                if (p && p.click) {
                    p.target = o;
                    p.attr("href", n);
                    p.click()
                } else {
                    window.open(n, o)
                }
            }
        } else {
            return function(n, o) {
                window.open(n, o)
            }
        }
    } ()),
    k = {
        click: function(t) {
            if (f.browser.mozilla && t.button !== 0) {
                return true
            }
            var n = t.target || t.srcElement,
            m, r;
            while (n && n.getAttribute) {
                r = n.getAttribute("boss");
                m = n.tagName.toLowerCase();
                if (f.browser.safari && !r & m == "select") {
                    var o = n.getAttribute("bossmemo");
                    if (!o) {
                        n.setAttribute("bossmemo", 1);
                        f(n).bind("change", (function() {
                            var u = n;
                            return function() {
                                var v = u.options[u.selectedIndex].getAttribute("boss");
                                if (v) {
                                    b({
                                        sOp: v
                                    })
                                }
                            }
                        } ()))
                    }
                }
                if (!r && f.browser.msie && m == "select") {
                    var s = n.getAttribute("bossmemo"),
                    q = n.selectedIndex;
                    if (s != q) {
                        n.setAttribute("bossmemo", q);
                        r = n.options[q].getAttribute("boss")
                    }
                }
                if (r) {
                    b({
                        iTy: f.boss.defaults.iTy,
                        sOp: r
                    });
                    if (m == "a" && (n.target == "_self" || n.target === "")) {
                        var p = n.href;
                        t.preventDefault(t);
                        b.onClear = function() {
                            l(p, "_self")
                        };
                        setTimeout(function() {
                            b.onClear()
                        },
                        100)
                    }
                }
                n = f.boss.defaults.recurse ? n.parentNode: null
            }
            return true
        }
    },
    g = function() {
        f(document).bind("mousedown", k.click)
    }
})(jQuery);
/*
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(e, b, f) {
    var a = /\+/g;
    function d(g) {
        return g
    }
    function c(g) {
        return decodeURIComponent(g.replace(a, " "))
    }
    e.cookie = function(l, k, p) {
        if (k !== f && !/Object/.test(Object.prototype.toString.call(k))) {
            p = e.extend({},
            e.cookie.defaults, p);
            if (k === null) {
                p.expires = -1
            }
            if (typeof p.expires === "number") {
                var m = p.expires,
                o = p.expires = new Date();
                o.setDate(o.getDate() + m)
            }
            k = String(k);
            return (b.cookie = [encodeURIComponent(l), "=", p.raw ? k: encodeURIComponent(k), p.expires ? "; expires=" + p.expires.toUTCString() : "", p.path ? "; path=" + p.path: "", p.domain ? "; domain=" + p.domain: "", p.secure ? "; secure": ""].join(""))
        }
        p = k || e.cookie.defaults || {};
        var g = p.raw ? d: c;
        var n = b.cookie.split("; ");
        for (var j = 0,
        h; (h = n[j] && n[j].split("=")); j++) {
            if (g(h.shift()) === l) {
                return g(h.join("="))
            }
        }
        return null
    };
    e.cookie.defaults = {};
    e.removeCookie = function(h, g) {
        if (e.cookie(h, g) !== null) {
            e.cookie(h, null, g);
            return true
        }
        return false
    }
})(jQuery, document); (function(a) {
    var b = {
        animationType: "fade",
        animate: true,
        first_slide: 0,
        easing: "linear",
        speed: "normal",
        type: "sequence",
        timeout: 2000,
        startDelay: 0,
        loop: true,
        containerHeight: "auto",
        runningClass: "innerFade",
        children: null,
        cancelLink: null,
        pauseLink: null,
        prevLink: null,
        nextLink: null,
        indexContainer: null,
        currentItemContainer: null,
        totalItemsContainer: null,
        callback_index_update: null,
        isEnd: true
    };
    a(function() {
        window.isActive = true;
        a(window).focus(function() {
            this.isActive = true
        });
        a(window).blur(function() {
            this.isActive = false
        })
    });
    a.fn.innerFade = function(c) {
        return this.each(function() {
            $fade_object = new Object();
            $fade_object.container = this;
            $fade_object.settings = a.extend({},
            b, c);
            $fade_object.elements = ($fade_object.settings.children === null) ? a($fade_object.container).children() : a($fade_object.container).children($fade_object.settings.children);
            $fade_object.count = 0;
            a($fade_object.container).data("object", $fade_object);
            if ($fade_object.elements.length > 1) {
                if ($fade_object.settings.nextLink || $fade_object.settings.prevLink) {
                    a.bindControls($fade_object)
                }
                if ($fade_object.settings.cancelLink) {
                    a.bindCancel($fade_object)
                }
                a($fade_object.container).css({
                    position: "relative"
                }).addClass($fade_object.settings.runningClass);
                if ($fade_object.settings.containerHeight == "auto") {
                    height = a($fade_object.elements).filter(":first").height();
                    a($fade_object.container).css({
                        height: height + "px"
                    })
                } else {
                    a($fade_object.container).css({
                        height: $fade_object.settings.containerHeight
                    })
                }
                if ($fade_object.settings.indexContainer) {
                    a.innerFadeIndex($fade_object)
                }
                a($fade_object.elements).filter(":gt(0)").hide(0);
                for (var f = 0; f < $fade_object.elements.length; f++) {
                    a($fade_object.elements[f]).css("z-index", String($fade_object.elements.length - f)).css("position", "absolute")
                }
                var d = "";
                var e = "";
                if ($fade_object.settings.type == "random") {
                    e = Math.floor(Math.random() * $fade_object.elements.length);
                    do {
                        d = Math.floor(Math.random() * $fade_object.elements.length)
                    } while ( e == d );
                    a($fade_object.elements[e]).show()
                } else {
                    if ($fade_object.settings.type == "random_start") {
                        $fade_object.settings.type = "sequence";
                        e = Math.floor(Math.random() * ($fade_object.elements.length));
                        d = (e + 1) % $fade_object.elements.length
                    } else {
                        d = $fade_object.settings.first_slide;
                        e = ($fade_object.settings.first_slide == 0) ? $fade_object.elements.length - 1 : $fade_object.settings.first_slide - 1
                    }
                }
                if ($fade_object.settings.animate) {
                    a.fadeTimeout($fade_object, d, e, true)
                } else {
                    a($fade_object.elements[d]).show();
                    a($fade_object.elements[e]).hide();
                    a.updateIndexes($fade_object, d)
                }
                a.updateIndexes($fade_object, d);
                if ($fade_object.settings.type == "random") {
                    a($fade_object.elements[e]).show()
                } else {
                    a($fade_object.elements[d]).show()
                }
                if ($fade_object.settings.currentItemContainer) {
                    a.currentItem($fade_object, d)
                }
                if ($fade_object.settings.totalItemsContainer) {
                    a.totalItems($fade_object)
                }
                if ($fade_object.settings.pauseLink) {
                    a.bind_pause($fade_object)
                }
            }
        })
    };
    a.fn.innerFadeTo = function(c) {
        return this.each(function(d) {
            var f = a(this).data("object");
            var g = a(f.elements).filter(":visible");
            var e = a(f.elements).index(g);
            a.stopSlideshow(f);
            if (c != e) {
                a.fadeToItem(f, c, e)
            }
        })
    };
    a.fadeToItem = function(c, d, k) {
        var g = c.settings.speed;
        a(c.container).trigger("custom", [d, k]);
        switch (c.settings.animationType) {
        case "slide":
            a(c.elements[k]).slideUp(g);
            a(c.elements[d]).slideDown(g);
            break;
        case "slideOver":
            var j = a(c.elements[0]).width(),
            f = {},
            i = {},
            h = {},
            e = {};
            a(c.container).css({
                overflow: "hidden"
            });
            f = {
                position: "absolute",
                top: "0px"
            };
            i = a.extend({},
            f);
            if (d > k) {
                f.left = "0px";
                f.right = "auto";
                i.left = "auto";
                i.right = "-" + j + "px";
                h.left = "-" + j + "px";
                e.right = "0px";
                console.log(f)
            } else {
                f.left = "auto";
                f.right = "0px";
                i.left = "-" + j + "px";
                i.right = "auto";
                h.right = "-" + j + "px";
                e.left = "0px"
            }
            a(c.elements[k]).css(f);
            a(c.elements[d]).css(i).show();
            a(c.elements[k]).animate(h, g, c.settings.easing,
            function() {
                a(this).hide()
            });
            a(c.elements[d]).animate(e, g, c.settings.easing);
            break;
        case "fadeEmpty":
            a(c.elements[k]).fadeOut(g,
            function() {
                a(c.elements[d]).fadeIn(g)
            });
            break;
        case "slideEmpty":
            a(c.elements[k]).slideUp(g,
            function() {
                a(c.elements[d]).slideDown(g)
            });
            break;
        default:
            a(c.elements[k]).fadeOut(g);
            a(c.elements[d]).fadeIn(g);
            break
        }
        if (c.settings.currentItemContainer) {
            a.currentItem(c, d)
        }
        if (c.settings.indexContainer || c.settings.callback_index_update) {
            a.updateIndexes(c, d)
        }
    };
    a.fadeTimeout = function(e, c, d, g) {
        if (window.isActive) {
            if (g != true) {
                a.fadeToItem(e, c, d)
            }
            e.count++;
            if (e.settings.loop == false && e.count >= e.elements.length) {
                a.stopSlideshow(e);
                return
            }
            if (e.settings.type == "random") {
                d = c;
                while (c == d) {
                    c = Math.floor(Math.random() * e.elements.length)
                }
            } else {
                d = (d > c) ? 0 : c;
                c = (c + 1 >= e.elements.length) ? 0 : c + 1
            }
        }
        var f = (g && e.settings.startDelay) ? e.settings.startDelay: e.settings.timeout;
        a(e.container).data("current_timeout", setTimeout((function() {
            a.fadeTimeout(e, c, d, false)
        }), f))
    };
    a.fn.innerFadeUnbind = function() {
        return this.each(function(c) {
            var d = a(this).data("object");
            a.stopSlideshow(d)
        })
    };
    a.stopSlideshow = function(c) {
        clearTimeout(a(c.container).data("current_timeout"));
        a(c.container).data("current_timeout", null)
    };
    a.bindControls = function(c) {
        a(c.settings.nextLink).on("click",
        function(g) {
            g.preventDefault();
            a.stopSlideshow(c);
            var e = a(c.elements).filter(":visible");
            var h = a(c.elements).index(e);
            var d = (e.next().length > 0) ? e.next() : a(c.elements).filter(":first");
            var f = a(c.elements).index(d);
            if (c.settings.isEnd) {
                c.settings.isEnd = false;
                a.fadeToItem(c, f, h);
                setTimeout(function() {
                    c.settings.isEnd = true
                },
                1000)
            }
        });
        a(c.settings.prevLink).on("click",
        function(g) {
            g.preventDefault();
            a.stopSlideshow(c);
            var e = a(c.elements).filter(":visible");
            var h = a(c.elements).index(e);
            var f = (e.prev().length > 0) ? e.prev() : a(c.elements).filter(":last");
            var d = a(c.elements).index(f);
            if (c.settings.isEnd) {
                c.settings.isEnd = false;
                a.fadeToItem(c, d, h);
                setTimeout(function() {
                    c.settings.isEnd = true
                },
                1000)
            }
        })
    };
    a.bind_pause = function(c) {
        a(c.settings.pauseLink).unbind().click(function(g) {
            g.preventDefault();
            if (a(c.container).data("current_timeout") != null) {
                a.stopSlideshow(c)
            } else {
                var e = a(c.container).children(":first")[0].tagName.toLowerCase();
                var d = "";
                var f = "";
                if (c.settings.type == "random") {
                    f = Math.floor(Math.random() * c.elements.length);
                    do {
                        d = Math.floor(Math.random() * c.elements.length)
                    } while ( f == d )
                } else {
                    if (c.settings.type == "random_start") {
                        f = Math.floor(Math.random() * c.elements.length);
                        d = (f + 1) % c.elements.length
                    } else {
                        f = a(e, a(c.container)).index(a(e + ":visible", a(c.container)));
                        d = ((f + 1) == c.elements.length) ? 0 : f + 1
                    }
                }
                setTimeout(function() {
                    a.fadeTimeout(c, d, f, false)
                },
                5000)
            }
        })
    };
    a.bindCancel = function(c) {
        a(c.settings.cancelLink).unbind().click(function(d) {
            d.preventDefault();
            a.stopSlideshow(c)
        })
    };
    a.updateIndexes = function(d, c) {
        a(d.settings.indexContainer).children().removeClass("active");
        a("> :eq(" + c + ")", a(d.settings.indexContainer)).addClass("active");
        if (typeof(d.settings.callback_index_update) == "function") {
            d.settings.callback_index_update.call(this, c)
        }
    };
    a.createIndexHandler = function(e, d, c) {
        a(c).click(function(g) {
            g.preventDefault();
            var h = a(e.elements).filter(":visible");
            var f = a(e.elements).index(h);
            a.stopSlideshow(e);
            if (h.size() <= 1 && d != f) {
                a.fadeToItem(e, d, f)
            }
        })
    };
    a.createIndexes = function(f) {
        var c = a(f.settings.indexContainer);
        for (var e = 0; e < f.elements.length; e++) {
            var d = a('<li><a href="#">' + (e + 1) + "</a></li>");
            a.createIndexHandler(f, e, d);
            c.append(d)
        }
    };
    a.linkIndexes = function(g) {
        var c = a(g.settings.indexContainer);
        var e = a("> :visible", c);
        if (e.size() == g.elements.length) {
            var f = g.elements.length;
            for (var d = 0; d < f; d++) {
                a("a", c).click(function(h) {
                    h.preventDefault()
                });
                a.createIndexHandler(g, d, e[d])
            }
        } else {
            alert("There is a different number of items in the menu and slides. There needs to be the same number in both.\nThere are " + e.size() + " in the indexContainer.\nThere are " + g.elements.length + " in the slides container.")
        }
    };
    a.innerFadeIndex = function(d) {
        var c = a(d.settings.indexContainer);
        if (a(":visible", c).size() <= 0) {
            a.createIndexes(d)
        } else {
            a.linkIndexes(d)
        }
    };
    a.currentItem = function(c, d) {
        var e = a(c.settings.currentItemContainer);
        e.text(d + 1)
    };
    a.totalItems = function(c) {
        var d = a(c.settings.totalItemsContainer);
        d.text(c.elements.length)
    }
})(jQuery); (function(g) {
    var l, f, i, b = "",
    c, a, d, e, k;
    g.ptlogin = function(n) {
        var o = g.extend({},
        g.ptlogin.defaults, n);
        if (o.s_url) {
            b = ["http://ui.ptlogin2.qq.com/cgi-bin/login?qlogin_auto_login=1&target=self", o.low_login_enable > 0 ? "&low_login=1": "", "&appid=5000801&s_url=", encodeURIComponent(o.s_url), "&f_url=loginerroralert"].join("")
        }
        a = o.appn;
        k = o.action;
        g(document).scroll(function() {
            h(d, e)
        })
    };
    g.ptlogin.defaults = {
        mask: true,
        code: null,
        appn: null,
        active: 1,
        login_appn: null,
        url: null,
        s_url: "http://finance.qq.com/products/portfolio/proxy.htm",
        low_login_enable: 2,
        low_login_hour: 4320
    };
    var h = function(r, n) {
        if (f && l) {
            var o = document.documentElement.scrollWidth,
            q = document.documentElement.clientHeight,
            p = document.documentElement.scrollHeight;
            if (f) {
                f.css("height", (p > q ? p: q) + "px");
                f.css("left", 0 + "px")
            }
            l.css("top", g(document).scrollTop() + (q - l.innerHeight()) / 2 + "px");
            l.css("left", (o - l.innerHeight()) / 2 + "px");
            if (r && n) {
                if (r < 300) {
                    r = 371;
                    n = 276
                }
                l.css("width", r + "px");
                l.css("height", n + "px");
                l.css("visibility", "hidden");
                l.css("visibility", "visible")
            }
        }
        if (!c) {
            c = setInterval(h, 50)
        }
    };
    var j = function() {
        g(document).trigger(k + "_onSuccess");
        g.ptlogin.close()
    };
    g.ptlogin.open = function(n) {
        g.ptlogin(n);
        if (!l) {
            g(document.body).append('<div id="ptlogin-node-1" align="center" style="display:none;position:absolute;visibility:hidden;width:1px; height:1px;padding:0;margin:0px;z-index:1000;"></div>');
            l = g("#ptlogin-node-1");
            l.html('<iframe id="ptlogin-node-2" width="100%" height="100%" frameBorder="0" scrolling="auto"></iframe>');
            g(document.body).append('<div id="ptlogin-node-3" style="position:absolute;width:100%;height:100%;background:#000;display:none;top:0px;left:0px;z-index:999;filter:alpha(opacity=30);-moz-opacity:0.3;opacity: 0.3;"></div>');
            i = g("#ptlogin-node-2");
            f = g("#ptlogin-node-3")
        }
        try {
            i.attr("src", b);
            f.css("display", g.ptlogin.defaults.mask ? "block": "none");
            l.css("display", "block");
            h()
        } catch(o) {}
    };
    g.ptlogin.close = function() {
        if (l) {
            l.css("display", "none")
        }
        if (f) {
            f.css("display", "none")
        }
        if (c) {
            clearTimeout(c);
            c = 0
        }
    };
    var m = true;
    window.ptlogin2_onResize = function(p, n) {
        h(p, n);
        d = p;
        e = n;
        if (m) {
            m = false;
            try {
                var r = i.contentDocument || i.Document;
                if (g.ptlogin.defaults.low_login_enable == 2) {
                    var s = r.getElementById("low_login_enable");
                    if (s) {
                        s.checked = true
                    }
                }
                if (g.ptlogin.defaults.low_login_enable && g.ptlogin.defaults.low_login_hour) {
                    s = g('select[name="low_login_hour"]', r);
                    if (s) {
                        s.value = g.ptlogin.defaults.low_login_hour
                    }
                }
            } catch(q) {}
        }
    };
    window.ptlogin2_onClose = function() {
        g.ptlogin.close()
    };
    window.ptlogin2_onSuccess = function() {
        j()
    }
})(jQuery);
/*
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k) {
    k.transit = {
        version: "0.1.3",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: true,
        useTransitionEnd: false
    };
    var d = document.createElement("div");
    var p = {};
    function b(u) {
        var t = ["Moz", "Webkit", "O", "ms"];
        var q = u.charAt(0).toUpperCase() + u.substr(1);
        if (u in d.style) {
            return u
        }
        for (var s = 0; s < t.length; ++s) {
            var r = t[s] + q;
            if (r in d.style) {
                return r
            }
        }
    }
    function e() {
        d.style[p.transform] = "";
        d.style[p.transform] = "rotateY(90deg)";
        return d.style[p.transform] !== ""
    }
    var a = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    p.transition = b("transition");
    p.transitionDelay = b("transitionDelay");
    p.transform = b("transform");
    p.transformOrigin = b("transformOrigin");
    p.transform3d = e();
    k.extend(k.support, p);
    var i = {
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    };
    var f = p.transitionEnd = i[p.transition] || null;
    d = null;
    k.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)"
    };
    k.cssHooks.transform = {
        get: function(q) {
            return k(q).data("transform")
        },
        set: function(r, q) {
            var s = q;
            if (! (s instanceof j)) {
                s = new j(s)
            }
            if (p.transform === "WebkitTransform" && !a) {
                r.style[p.transform] = s.toString(true)
            } else {
                r.style[p.transform] = s.toString()
            }
            k(r).data("transform", s)
        }
    };
    k.cssHooks.transformOrigin = {
        get: function(q) {
            return q.style[p.transformOrigin]
        },
        set: function(q, r) {
            q.style[p.transformOrigin] = r
        }
    };
    k.cssHooks.transition = {
        get: function(q) {
            return q.style[p.transition]
        },
        set: function(q, r) {
            q.style[p.transition] = r
        }
    };
    n("scale");
    n("translate");
    n("rotate");
    n("rotateX");
    n("rotateY");
    n("rotate3d");
    n("perspective");
    n("skewX");
    n("skewY");
    n("x", true);
    n("y", true);
    function j(q) {
        if (typeof q === "string") {
            this.parse(q)
        }
        return this
    }
    j.prototype = {
        setFromString: function(s, r) {
            var q = (typeof r === "string") ? r.split(",") : (r.constructor === Array) ? r: [r];
            q.unshift(s);
            j.prototype.set.apply(this, q)
        },
        set: function(r) {
            var q = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[r]) {
                this.setter[r].apply(this, q)
            } else {
                this[r] = q.join(",")
            }
        },
        get: function(q) {
            if (this.getter[q]) {
                return this.getter[q].apply(this)
            } else {
                return this[q] || 0
            }
        },
        setter: {
            rotate: function(q) {
                this.rotate = o(q, "deg")
            },
            rotateX: function(q) {
                this.rotateX = o(q, "deg")
            },
            rotateY: function(q) {
                this.rotateY = o(q, "deg")
            },
            scale: function(q, r) {
                if (r === undefined) {
                    r = q
                }
                this.scale = q + "," + r
            },
            skewX: function(q) {
                this.skewX = o(q, "deg")
            },
            skewY: function(q) {
                this.skewY = o(q, "deg")
            },
            perspective: function(q) {
                this.perspective = o(q, "px")
            },
            x: function(q) {
                this.set("translate", q, null)
            },
            y: function(q) {
                this.set("translate", null, q)
            },
            translate: function(q, r) {
                if (this._translateX === undefined) {
                    this._translateX = 0
                }
                if (this._translateY === undefined) {
                    this._translateY = 0
                }
                if (q !== null) {
                    this._translateX = o(q, "px")
                }
                if (r !== null) {
                    this._translateY = o(r, "px")
                }
                this.translate = this._translateX + "," + this._translateY
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0
            },
            y: function() {
                return this._translateY || 0
            },
            scale: function() {
                var q = (this.scale || "1,1").split(",");
                if (q[0]) {
                    q[0] = parseFloat(q[0])
                }
                if (q[1]) {
                    q[1] = parseFloat(q[1])
                }
                return (q[0] === q[1]) ? q[0] : q
            },
            rotate3d: function() {
                var r = (this.rotate3d || "0,0,0,0deg").split(",");
                for (var q = 0; q <= 3; ++q) {
                    if (r[q]) {
                        r[q] = parseFloat(r[q])
                    }
                }
                if (r[3]) {
                    r[3] = o(r[3], "deg")
                }
                return r
            }
        },
        parse: function(r) {
            var q = this;
            r.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,
            function(s, u, t) {
                q.setFromString(u, t)
            })
        },
        toString: function(s) {
            var r = [];
            for (var q in this) {
                if (this.hasOwnProperty(q)) {
                    if ((!p.transform3d) && ((q === "rotateX") || (q === "rotateY") || (q === "perspective") || (q === "transformOrigin"))) {
                        continue
                    }
                    if (q[0] !== "_") {
                        if (s && (q === "scale")) {
                            r.push(q + "3d(" + this[q] + ",1)")
                        } else {
                            if (s && (q === "translate")) {
                                r.push(q + "3d(" + this[q] + ",0)")
                            } else {
                                r.push(q + "(" + this[q] + ")")
                            }
                        }
                    }
                }
            }
            return r.join(" ")
        }
    };
    function m(r, q, s) {
        if (q === true) {
            r.queue(s)
        } else {
            if (q) {
                r.queue(q, s)
            } else {
                s()
            }
        }
    }
    function h(r) {
        var q = [];
        k.each(r,
        function(s) {
            s = k.camelCase(s);
            s = k.transit.propertyMap[s] || s;
            s = c(s);
            if (k.inArray(s, q) === -1) {
                q.push(s)
            }
        });
        return q
    }
    function g(r, u, w, q) {
        var s = h(r);
        if (k.cssEase[w]) {
            w = k.cssEase[w]
        }
        var v = "" + l(u) + " " + w;
        if (parseInt(q, 10) > 0) {
            v += " " + l(q)
        }
        var t = [];
        k.each(s,
        function(y, x) {
            t.push(x + " " + v)
        });
        return t.join(", ")
    }
    k.fn.transition = k.fn.transit = function(y, r, x, B) {
        var C = this;
        var t = 0;
        var v = true;
        if (typeof r === "function") {
            B = r;
            r = undefined
        }
        if (typeof x === "function") {
            B = x;
            x = undefined
        }
        if (typeof y.easing !== "undefined") {
            x = y.easing;
            delete y.easing
        }
        if (typeof y.duration !== "undefined") {
            r = y.duration;
            delete y.duration
        }
        if (typeof y.complete !== "undefined") {
            B = y.complete;
            delete y.complete
        }
        if (typeof y.queue !== "undefined") {
            v = y.queue;
            delete y.queue
        }
        if (typeof y.delay !== "undefined") {
            t = y.delay;
            delete y.delay
        }
        if (typeof r === "undefined") {
            r = k.fx.speeds._default
        }
        if (typeof x === "undefined") {
            x = k.cssEase._default
        }
        r = l(r);
        var D = g(y, r, x, t);
        var A = k.transit.enabled && p.transition;
        var s = A ? (parseInt(r, 10) + parseInt(t, 10)) : 0;
        if (s === 0) {
            var z = function(E) {
                C.css(y);
                if (B) {
                    B.apply(C)
                }
                if (E) {
                    E()
                }
            };
            m(C, v, z);
            return C
        }
        var w = {};
        var q = function(G) {
            var F = false;
            var E = function() {
                if (F) {
                    C.unbind(f, E)
                }
                if (s > 0) {
                    C.each(function() {
                        this.style[p.transition] = (w[this] || null)
                    })
                }
                if (typeof B === "function") {
                    B.apply(C)
                }
                if (typeof G === "function") {
                    G()
                }
            };
            if ((s > 0) && (f) && (k.transit.useTransitionEnd)) {
                F = true;
                C.bind(f, E)
            } else {
                window.setTimeout(E, s)
            }
            C.each(function() {
                if (s > 0) {
                    this.style[p.transition] = D
                }
                k(this).css(y)
            })
        };
        var u = function(F) {
            var E = 0;
            if ((p.transition === "MozTransition") && (E < 25)) {
                E = 25
            }
            window.setTimeout(function() {
                q(F)
            },
            E)
        };
        m(C, v, u);
        return this
    };
    function n(r, q) {
        if (!q) {
            k.cssNumber[r] = true
        }
        k.transit.propertyMap[r] = p.transform;
        k.cssHooks[r] = {
            get: function(u) {
                var s = k(u).css("transform");
                if (!s || s === "none") {
                    s = new j()
                }
                return s.get(r)
            },
            set: function(u, v) {
                var s = k(u).css("transform");
                if (!s || s === "none") {
                    s = new j()
                }
                s.setFromString(r, v);
                k(u).css({
                    transform: s
                })
            }
        }
    }
    function c(q) {
        return q.replace(/([A-Z])/g,
        function(r) {
            return "-" + r.toLowerCase()
        })
    }
    function o(r, q) {
        if ((typeof r === "string") && (!r.match(/^[\-0-9\.]+$/))) {
            return r
        } else {
            return "" + r + q
        }
    }
    function l(r) {
        var q = r;
        if (k.fx.speeds[q]) {
            q = k.fx.speeds[q]
        }
        return o(q, "ms")
    }
    k.transit.getTransitionValue = g
})(jQuery);
// document.domain = "qq.com";
$(function() {
    $("#slides-gallery").bind("custom",
    function(c, b, d) {
        a(b, d,
        function() {})
    });
    function a(i, f, h) {
        if ($.browser.msie) {
            var c = $("#slides-anim-" + parseInt(f + 1) + " div:nth-child(1)");
            var b = $("#slides-anim-" + parseInt(f + 1) + " div:nth-child(2)");
            var d = $("#anim-btn-" + parseInt(f + 1));
            var j = $("#slides-anim-" + parseInt(i + 1) + " div:nth-child(1)");
            var g = $("#slides-anim-" + parseInt(i + 1) + " div:nth-child(2)");
            var e = $("#anim-btn-" + parseInt(i + 1));
            isAnim = false;
            c.hide();
            b.hide();
            d.hide();
            if (i == 0) {
                j.css({
                    left: "115px",
                    "z-index": "990"
                }).show();
                g.css({
                    left: "517px",
                    top: "36px",
                    "z-index": "990"
                }).show()
            } else {
                if (i == 1) {
                    j.css({
                        left: "135px",
                        "z-index": "990"
                    }).show();
                    g.css({
                        left: "515px",
                        top: "140px",
                        "z-index": "990"
                    }).show()
                } else {
                    if (i == 2) {
                        j.css({
                            left: "115px",
                            "z-index": "990",
                            "z-index": "990"
                        }).show();
                        g.css({
                            left: "515px",
                            top: "38px",
                            "z-index": "990"
                        }).show()
                    } else {
                        if (i == 3) {
                            j.css({
                                left: "115px",
                                "z-index": "990"
                            }).show();
                            g.css({
                                left: "518px",
                                top: "36px",
                                "z-index": "990"
                            }).show()
                        }
                    }
                }
            }
            e.show();
            h()
        } else {
            var c = $("#slides-anim-" + parseInt(f + 1) + " div:nth-child(1)");
            var b = $("#slides-anim-" + parseInt(f + 1) + " div:nth-child(2)");
            var d = $("#anim-btn-" + parseInt(f + 1));
            var j = $("#slides-anim-" + parseInt(i + 1) + " div:nth-child(1)");
            var g = $("#slides-anim-" + parseInt(i + 1) + " div:nth-child(2)");
            var e = $("#anim-btn-" + parseInt(i + 1));
            isAnim = false;
            c.transition({
                zIndex: 0,
                opacity: 0
            },
            function() {
                c.transition({
                    x: 0
                })
            });
            b.transition({
                zIndex: 0,
                opacity: 0
            },
            function() {
                b.transition({
                    x: 0,
                    y: 0
                })
            });
            d.hide();
            if ($.browser.mozilla && $.browser.version == "16.0") {
                $("#slides-anim-1 div:nth-child(1)").css("left", "135px");
                $("#slides-anim-1 div:nth-child(2)").css("top", "142px");
                $("#slides #anim-btn-1").css("left", "139px");
                $("#slides #anim-btn-2").css({
                    left: "538px",
                    top: "384px"
                });
                $("#slides #anim-btn-3").css({
                    left: "538px",
                    top: "384px"
                })
            }
            j.transition({
                opacity: 1,
                "z-index": 998,
                x: "50px"
            },
            500, "ease",
            function() {
                e.show()
            }).show();
            g.transition({
                opacity: 1,
                "z-index": 998,
                x: "-18px",
                y: "0px"
            },
            500, "ease",
            function() {
                h()
            }).show()
        }
    }
    $("#slides-gallery").innerFade({
        timeout: 5000,
        prevLink: "#btn-prev",
        nextLink: "#btn-next"
    });
    $("#btn-prev").mouseover(function() {
        $("#btn-prev").addClass("btn-prev-cur")
    }).mouseout(function() {
        $("#btn-prev").removeClass("btn-prev-cur")
    }).mousedown(function() {
        $("#btn-prev").addClass("btn-prev-click")
    }).mouseup(function() {
        $("#btn-prev").removeClass("btn-prev-click")
    });
    $("#btn-next").mouseover(function() {
        $("#btn-next").addClass("btn-next-cur")
    }).mouseout(function() {
        $("#btn-next").removeClass("btn-next-cur")
    }).mousedown(function() {
        $("#btn-next").addClass("btn-next-click")
    }).mouseup(function() {
        $("#btn-next").removeClass("btn-next-click")
    });
    a(0, 4,
    function() {})
});
$(function() {
    $(".l_right").find("a").click(function() {
        var a = $(this).parent().find("a");
        a.eq(0).removeClass().addClass("sms_iphone");
        a.eq(1).removeClass().addClass("sms_android");
        var b = $(this).attr("class");
        if (b.indexOf("on_") > -1) {
            $(this).removeClass(b);
            $(this).addClass(b.substring(3))
        } else {
            $("#type").val(b.substring(4));
            $(this).removeClass(b);
            $(this).addClass("on_" + b)
        }
    });
    $.boss({
        iTy: 1514
    })
});
function SendAppSms() {
    var a = {
        mobile: "send-mobile",
        form: "send-form",
        type: "send-type",
        uin: "send-uin",
        sendBox: "send-msg-box",
        loading: "send-msg-loading",
        finish: "send-msg-finish",
        msgSpan: "send-msg-text"
    };
    this.cfg = a || {}
}
SendAppSms.prototype = {
    isSubmit: true,
    check: function() {
        var a = this.mobile.val();
        if (/^1[3458]\d{9}$/.test(a)) {
            return true
        }
        return false
    },
    wait: function(b) {
        var a = this;
        if (b > 0) {
            if (a.isSubmit) {
                this.sendBox.hide();
                this.loading.show();
                a.isSubmit = false
            }
            a.msgSpan.html(b);
            b--;
            if (a.randomNum < b) {
                timer = setTimeout(function() {
                    a.wait(b)
                },
                1000)
            } else {
                clearTimeout(timer);
                a.loading.hide();
                a.finish.show();
                setTimeout(function() {
                    a.sendBox.show();
                    a.finish.hide();
                    a.isSubmit = true
                },
                2000)
            }
        } else {
            a.sendBox.show();
            a.finish.hide();
            a.isSubmit = true;
            a.msgSpan.html("")
        }
    },
    random: function(a, c) {
        var d = c - a;
        var b = Math.random();
        return (a + Math.round(b * d))
    },
    init: function() {
        this.form = $("#" + this.cfg.form);
        this.sendBox = $("#" + this.cfg.sendBox);
        this.mobile = $("#" + this.cfg.mobile);
        this.loading = $("#" + this.cfg.loading);
        this.finish = $("#" + this.cfg.finish);
        this.msgSpan = $("#" + this.cfg.msgSpan);
        this.uin = $("#" + this.cfg.uin);
        this.uin.val(($.cookie("uin") || $.cookie("luin") || "358116359").replace(/o0*/, ""));
        var a = this;
        a.randomNum = a.random(50, 55);
        $(".send_button").click(function() {
            if (a.isSubmit && a.check()) {
                if (a.uin.val() != "358116359") {
                    a.form.submit();
                    a.wait(59)
                } else {
                    $.ptlogin.open({
                        action: "sms"
                    })
                }
            }
        });
        $(document).bind("sms_onSuccess",
        function() {
            a.uin.val(($.cookie("uin") || $.cookie("luin") || "358116359").replace(/o0*/, ""));
            a.form.submit();
            a.wait(59)
        })
    }
};
SendAppSms.prototype.constructor = "SendAppSms";
var ss = new SendAppSms();
ss.init();
$(function() {
    window.PCPUSH = window.PCPUSH || [];
    $(".icon_android_download").click(function() {
        var a = $.cookie("uin") && $.cookie("luin") && $.cookie("uin").replace(/o0*/, "");
        if (a !== null) {
            PCPUSH.show("100686920", "EXTERNAL", "\u624b\u673a\u81ea\u9009\u80a1")
        } else {
            $.ptlogin.open({
                action: "pcpush"
            })
        }
    });
    $(document).bind("pcpush_onSuccess",
    function() {
        PCPUSH.show("100686920", "EXTERNAL", "\u624b\u673a\u81ea\u9009\u80a1")
    })
});
/*  |xGv00|2af5022d58876fcb97d99abc612b637e */