<!DOCTYPE html>
<!--[if IE 6]><html id="ie6" class="ie9 lt-ie10 lt-ie9 lt-ie8 lt-ie7" lang="en"><![endif]-->
<!--[if IE 7]><html id="ie7" class="ie9 lt-ie10 lt-ie9 lt-ie8" lang="en"><![endif]-->
<!--[if IE 8]><html id="ie8" class="ie8 lt-ie10 lt-ie9" lang="en"><![endif]-->
<!--[if IE 9]><html id="ie9" class="ie9 lt-ie10"lang="en"><![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script type="text/javascript">
        window.NREUM || (NREUM = {});
        NREUM.info = {
            "beacon": "bam-cell.nr-data.net",
            "errorBeacon": "bam-cell.nr-data.net",
            "licenseKey": "671cca5e0f",
            "applicationID": "899226958",
            "transactionName": "NQMBZkJRXEAEAhJQCgxJLmRzH2JSAgQlVgsWFAxeXFVAHDUAAVw=",
            "queueTime": 0,
            "applicationTime": 269,
            "agent": "",
            "atts": ""
        }
    </script>
    <script type="text/javascript">
        (window.NREUM || (NREUM = {})).init = {
            ajax: {
                deny_list: ["bam-cell.nr-data.net"]
            }
        };
        (window.NREUM || (NREUM = {})).loader_config = {
            licenseKey: "671cca5e0f",
            applicationID: "899226958"
        };
        window.NREUM || (NREUM = {}), __nr_require = function(t, e, n) {
            function r(n) {
                if (!e[n]) {
                    var i = e[n] = {
                        exports: {}
                    };
                    t[n][0].call(i.exports, function(e) {
                        var i = t[n][1][e];
                        return r(i || e)
                    }, i, i.exports)
                }
                return e[n].exports
            }
            if ("function" == typeof __nr_require) return __nr_require;
            for (var i = 0; i < n.length; i++) r(n[i]);
            return r
        }({
            1: [function(t, e, n) {
                function r() {}

                function i(t, e, n, r) {
                    return function() {
                        return s.recordSupportability("API/" + e + "/called"), o(t + e, [u.now()].concat(c(arguments)), n ? null : this, r), n ? void 0 : this
                    }
                }
                var o = t("handle"),
                    a = t(10),
                    c = t(11),
                    f = t("ee").get("tracer"),
                    u = t("loader"),
                    s = t(4),
                    d = NREUM;
                "undefined" == typeof window.newrelic && (newrelic = d);
                var p = ["setPageViewName", "setCustomAttribute", "setErrorHandler", "finished", "addToTrace", "inlineHit", "addRelease"],
                    l = "api-",
                    v = l + "ixn-";
                a(p, function(t, e) {
                    d[e] = i(l, e, !0, "api")
                }), d.addPageAction = i(l, "addPageAction", !0), d.setCurrentRouteName = i(l, "routeName", !0), e.exports = newrelic, d.interaction = function() {
                    return (new r).get()
                };
                var m = r.prototype = {
                    createTracer: function(t, e) {
                        var n = {},
                            r = this,
                            i = "function" == typeof e;
                        return o(v + "tracer", [u.now(), t, n], r),
                            function() {
                                if (f.emit((i ? "" : "no-") + "fn-start", [u.now(), r, i], n), i) try {
                                    return e.apply(this, arguments)
                                } catch (t) {
                                    throw f.emit("fn-err", [arguments, this, t], n), t
                                } finally {
                                    f.emit("fn-end", [u.now()], n)
                                }
                            }
                    }
                };
                a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","), function(t, e) {
                    m[e] = i(v, e)
                }), newrelic.noticeError = function(t, e) {
                    "string" == typeof t && (t = new Error(t)), s.recordSupportability("API/noticeError/called"), o("err", [t, u.now(), !1, e])
                }
            }, {}],
            2: [function(t, e, n) {
                function r(t) {
                    if (NREUM.init) {
                        for (var e = NREUM.init, n = t.split("."), r = 0; r < n.length - 1; r++)
                            if (e = e[n[r]], "object" != typeof e) return;
                        return e = e[n[n.length - 1]]
                    }
                }
                e.exports = {
                    getConfiguration: r
                }
            }, {}],
            3: [function(t, e, n) {
                var r = !1;
                try {
                    var i = Object.defineProperty({}, "passive", {
                        get: function() {
                            r = !0
                        }
                    });
                    window.addEventListener("testPassive", null, i), window.removeEventListener("testPassive", null, i)
                } catch (o) {}
                e.exports = function(t) {
                    return r ? {
                        passive: !0,
                        capture: !!t
                    } : !!t
                }
            }, {}],
            4: [function(t, e, n) {
                function r(t, e) {
                    var n = [a, t, {
                        name: t
                    }, e];
                    return o("storeMetric", n, null, "api"), n
                }

                function i(t, e) {
                    var n = [c, t, {
                        name: t
                    }, e];
                    return o("storeEventMetrics", n, null, "api"), n
                }
                var o = t("handle"),
                    a = "sm",
                    c = "cm";
                e.exports = {
                    constants: {
                        SUPPORTABILITY_METRIC: a,
                        CUSTOM_METRIC: c
                    },
                    recordSupportability: r,
                    recordCustom: i
                }
            }, {}],
            5: [function(t, e, n) {
                function r() {
                    return c.exists && performance.now ? Math.round(performance.now()) : (o = Math.max((new Date).getTime(), o)) - a
                }

                function i() {
                    return o
                }
                var o = (new Date).getTime(),
                    a = o,
                    c = t(12);
                e.exports = r, e.exports.offset = a, e.exports.getLastTimestamp = i
            }, {}],
            6: [function(t, e, n) {
                function r(t) {
                    return !(!t || !t.protocol || "file:" === t.protocol)
                }
                e.exports = r
            }, {}],
            7: [function(t, e, n) {
                function r(t, e) {
                    var n = t.getEntries();
                    n.forEach(function(t) {
                        "first-paint" === t.name ? l("timing", ["fp", Math.floor(t.startTime)]) : "first-contentful-paint" === t.name && l("timing", ["fcp", Math.floor(t.startTime)])
                    })
                }

                function i(t, e) {
                    var n = t.getEntries();
                    if (n.length > 0) {
                        var r = n[n.length - 1];
                        if (u && u < r.startTime) return;
                        var i = [r],
                            o = a({});
                        o && i.push(o), l("lcp", i)
                    }
                }

                function o(t) {
                    t.getEntries().forEach(function(t) {
                        t.hadRecentInput || l("cls", [t])
                    })
                }

                function a(t) {
                    var e = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                    if (e) return e.type && (t["net-type"] = e.type), e.effectiveType && (t["net-etype"] = e.effectiveType), e.rtt && (t["net-rtt"] = e.rtt), e.downlink && (t["net-dlink"] = e.downlink), t
                }

                function c(t) {
                    if (t instanceof y && !w) {
                        var e = Math.round(t.timeStamp),
                            n = {
                                type: t.type
                            };
                        a(n), e <= v.now() ? n.fid = v.now() - e : e > v.offset && e <= Date.now() ? (e -= v.offset, n.fid = v.now() - e) : e = v.now(), w = !0, l("timing", ["fi", e, n])
                    }
                }

                function f(t) {
                    "hidden" === t && (u = v.now(), l("pageHide", [u]))
                }
                if (!("init" in NREUM && "page_view_timing" in NREUM.init && "enabled" in NREUM.init.page_view_timing && NREUM.init.page_view_timing.enabled === !1)) {
                    var u, s, d, p, l = t("handle"),
                        v = t("loader"),
                        m = t(9),
                        g = t(3),
                        y = NREUM.o.EV;
                    if ("PerformanceObserver" in window && "function" == typeof window.PerformanceObserver) {
                        s = new PerformanceObserver(r);
                        try {
                            s.observe({
                                entryTypes: ["paint"]
                            })
                        } catch (h) {}
                        d = new PerformanceObserver(i);
                        try {
                            d.observe({
                                entryTypes: ["largest-contentful-paint"]
                            })
                        } catch (h) {}
                        p = new PerformanceObserver(o);
                        try {
                            p.observe({
                                type: "layout-shift",
                                buffered: !0
                            })
                        } catch (h) {}
                    }
                    if ("addEventListener" in document) {
                        var w = !1,
                            b = ["click", "keydown", "mousedown", "pointerdown", "touchstart"];
                        b.forEach(function(t) {
                            document.addEventListener(t, c, g(!1))
                        })
                    }
                    m(f)
                }
            }, {}],
            8: [function(t, e, n) {
                function r(t, e) {
                    if (!i) return !1;
                    if (t !== i) return !1;
                    if (!e) return !0;
                    if (!o) return !1;
                    for (var n = o.split("."), r = e.split("."), a = 0; a < r.length; a++)
                        if (r[a] !== n[a]) return !1;
                    return !0
                }
                var i = null,
                    o = null,
                    a = /Version\/(\S+)\s+Safari/;
                if (navigator.userAgent) {
                    var c = navigator.userAgent,
                        f = c.match(a);
                    f && c.indexOf("Chrome") === -1 && c.indexOf("Chromium") === -1 && (i = "Safari", o = f[1])
                }
                e.exports = {
                    agent: i,
                    version: o,
                    match: r
                }
            }, {}],
            9: [function(t, e, n) {
                function r(t) {
                    function e() {
                        t(c && document[c] ? document[c] : document[o] ? "hidden" : "visible")
                    }
                    "addEventListener" in document && a && document.addEventListener(a, e, i(!1))
                }
                var i = t(3);
                e.exports = r;
                var o, a, c;
                "undefined" != typeof document.hidden ? (o = "hidden", a = "visibilitychange", c = "visibilityState") : "undefined" != typeof document.msHidden ? (o = "msHidden", a = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (o = "webkitHidden", a = "webkitvisibilitychange", c = "webkitVisibilityState")
            }, {}],
            10: [function(t, e, n) {
                function r(t, e) {
                    var n = [],
                        r = "",
                        o = 0;
                    for (r in t) i.call(t, r) && (n[o] = e(r, t[r]), o += 1);
                    return n
                }
                var i = Object.prototype.hasOwnProperty;
                e.exports = r
            }, {}],
            11: [function(t, e, n) {
                function r(t, e, n) {
                    e || (e = 0), "undefined" == typeof n && (n = t ? t.length : 0);
                    for (var r = -1, i = n - e || 0, o = Array(i < 0 ? 0 : i); ++r < i;) o[r] = t[e + r];
                    return o
                }
                e.exports = r
            }, {}],
            12: [function(t, e, n) {
                e.exports = {
                    exists: "undefined" != typeof window.performance && window.performance.timing && "undefined" != typeof window.performance.timing.navigationStart
                }
            }, {}],
            ee: [function(t, e, n) {
                function r() {}

                function i(t) {
                    function e(t) {
                        return t && t instanceof r ? t : t ? u(t, f, a) : a()
                    }

                    function n(n, r, i, o, a) {
                        if (a !== !1 && (a = !0), !l.aborted || o) {
                            t && a && t(n, r, i);
                            for (var c = e(i), f = m(n), u = f.length, s = 0; s < u; s++) f[s].apply(c, r);
                            var p = d[w[n]];
                            return p && p.push([b, n, r, c]), c
                        }
                    }

                    function o(t, e) {
                        h[t] = m(t).concat(e)
                    }

                    function v(t, e) {
                        var n = h[t];
                        if (n)
                            for (var r = 0; r < n.length; r++) n[r] === e && n.splice(r, 1)
                    }

                    function m(t) {
                        return h[t] || []
                    }

                    function g(t) {
                        return p[t] = p[t] || i(n)
                    }

                    function y(t, e) {
                        l.aborted || s(t, function(t, n) {
                            e = e || "feature", w[n] = e, e in d || (d[e] = [])
                        })
                    }
                    var h = {},
                        w = {},
                        b = {
                            on: o,
                            addEventListener: o,
                            removeEventListener: v,
                            emit: n,
                            get: g,
                            listeners: m,
                            context: e,
                            buffer: y,
                            abort: c,
                            aborted: !1
                        };
                    return b
                }

                function o(t) {
                    return u(t, f, a)
                }

                function a() {
                    return new r
                }

                function c() {
                    (d.api || d.feature) && (l.aborted = !0, d = l.backlog = {})
                }
                var f = "nr@context",
                    u = t("gos"),
                    s = t(10),
                    d = {},
                    p = {},
                    l = e.exports = i();
                e.exports.getOrSetContext = o, l.backlog = d
            }, {}],
            gos: [function(t, e, n) {
                function r(t, e, n) {
                    if (i.call(t, e)) return t[e];
                    var r = n();
                    if (Object.defineProperty && Object.keys) try {
                        return Object.defineProperty(t, e, {
                            value: r,
                            writable: !0,
                            enumerable: !1
                        }), r
                    } catch (o) {}
                    return t[e] = r, r
                }
                var i = Object.prototype.hasOwnProperty;
                e.exports = r
            }, {}],
            handle: [function(t, e, n) {
                function r(t, e, n, r) {
                    i.buffer([t], r), i.emit(t, e, n)
                }
                var i = t("ee").get("handle");
                e.exports = r, r.ee = i
            }, {}],
            id: [function(t, e, n) {
                function r(t) {
                    var e = typeof t;
                    return !t || "object" !== e && "function" !== e ? -1 : t === window ? 0 : a(t, o, function() {
                        return i++
                    })
                }
                var i = 1,
                    o = "nr@id",
                    a = t("gos");
                e.exports = r
            }, {}],
            loader: [function(t, e, n) {
                function r() {
                    if (!P++) {
                        var t = M.info = NREUM.info,
                            e = g.getElementsByTagName("script")[0];
                        if (setTimeout(u.abort, 3e4), !(t && t.licenseKey && t.applicationID && e)) return u.abort();
                        f(O, function(e, n) {
                            t[e] || (t[e] = n)
                        });
                        var n = a();
                        c("mark", ["onload", n + M.offset], null, "api"), c("timing", ["load", n]);
                        var r = g.createElement("script");
                        0 === t.agent.indexOf("http://") || 0 === t.agent.indexOf("https:///") ? r.src = t.agent : r.src = v + "://" + t.agent, e.parentNode.insertBefore(r, e)
                    }
                }

                function i() {
                    "complete" === g.readyState && o()
                }

                function o() {
                    c("mark", ["domContent", a() + M.offset], null, "api")
                }
                var a = t(5),
                    c = t("handle"),
                    f = t(10),
                    u = t("ee"),
                    s = t(8),
                    d = t(6),
                    p = t(2),
                    l = t(3),
                    v = p.getConfiguration("ssl") === !1 ? "http" : "https",
                    m = window,
                    g = m.document,
                    y = "addEventListener",
                    h = "attachEvent",
                    w = m.XMLHttpRequest,
                    b = w && w.prototype,
                    E = !d(m.location);
                NREUM.o = {
                    ST: setTimeout,
                    SI: m.setImmediate,
                    CT: clearTimeout,
                    XHR: w,
                    REQ: m.Request,
                    EV: m.Event,
                    PR: m.Promise,
                    MO: m.MutationObserver
                };
                var x = "" + location,
                    O = {
                        beacon: "bam.nr-data.net",
                        errorBeacon: "bam.nr-data.net",
                        agent: "js-agent.newrelic.com/nr-1215.min.js"
                    },
                    T = w && b && b[y] && !/CriOS/.test(navigator.userAgent),
                    M = e.exports = {
                        offset: a.getLastTimestamp(),
                        now: a,
                        origin: x,
                        features: {},
                        xhrWrappable: T,
                        userAgent: s,
                        disabled: E
                    };
                if (!E) {
                    t(1), t(7), g[y] ? (g[y]("DOMContentLoaded", o, l(!1)), m[y]("load", r, l(!1))) : (g[h]("onreadystatechange", i), m[h]("onload", r)), c("mark", ["firstbyte", a.getLastTimestamp()], null, "api");
                    var P = 0
                }
            }, {}],
            "wrap-function": [function(t, e, n) {
                function r(t, e) {
                    function n(e, n, r, f, u) {
                        function nrWrapper() {
                            var o, a, s, p;
                            try {
                                a = this, o = d(arguments), s = "function" == typeof r ? r(o, a) : r || {}
                            } catch (l) {
                                i([l, "", [o, a, f], s], t)
                            }
                            c(n + "start", [o, a, f], s, u);
                            try {
                                return p = e.apply(a, o)
                            } catch (v) {
                                throw c(n + "err", [o, a, v], s, u), v
                            } finally {
                                c(n + "end", [o, a, p], s, u)
                            }
                        }
                        return a(e) ? e : (n || (n = ""), nrWrapper[p] = e, o(e, nrWrapper, t), nrWrapper)
                    }

                    function r(t, e, r, i, o) {
                        r || (r = "");
                        var c, f, u, s = "-" === r.charAt(0);
                        for (u = 0; u < e.length; u++) f = e[u], c = t[f], a(c) || (t[f] = n(c, s ? f + r : r, i, f, o))
                    }

                    function c(n, r, o, a) {
                        if (!v || e) {
                            var c = v;
                            v = !0;
                            try {
                                t.emit(n, r, o, e, a)
                            } catch (f) {
                                i([f, n, r, o], t)
                            }
                            v = c
                        }
                    }
                    return t || (t = s), n.inPlace = r, n.flag = p, n
                }

                function i(t, e) {
                    e || (e = s);
                    try {
                        e.emit("internal-error", t)
                    } catch (n) {}
                }

                function o(t, e, n) {
                    if (Object.defineProperty && Object.keys) try {
                        var r = Object.keys(t);
                        return r.forEach(function(n) {
                            Object.defineProperty(e, n, {
                                get: function() {
                                    return t[n]
                                },
                                set: function(e) {
                                    return t[n] = e, e
                                }
                            })
                        }), e
                    } catch (o) {
                        i([o], n)
                    }
                    for (var a in t) l.call(t, a) && (e[a] = t[a]);
                    return e
                }

                function a(t) {
                    return !(t && t instanceof Function && t.apply && !t[p])
                }

                function c(t, e) {
                    var n = e(t);
                    return n[p] = t, o(t, n, s), n
                }

                function f(t, e, n) {
                    var r = t[e];
                    t[e] = c(r, n)
                }

                function u() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; ++n) e[n] = arguments[n];
                    return e
                }
                var s = t("ee"),
                    d = t(11),
                    p = "nr@original",
                    l = Object.prototype.hasOwnProperty,
                    v = !1;
                e.exports = r, e.exports.wrapFunction = c, e.exports.wrapInPlace = f, e.exports.argsToArray = u
            }, {}]
        }, {}, ["loader"]);
    </script>

    <title>Starbucks</title>

    <!-- BEGIN: MetaData -->
    <meta property="og:title" content="Starbucks" />
    <meta name="twitter:card" content="summary">
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en" />
    <meta name="description" content="Home">
    <meta property="og:description" content="Home" />
    <meta property="og:url" content="" />
    <meta property="og:site_name" content="Starbucks Coffee Company" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- END: MetaData -->
    <!-- BEGIN: CSS -->
    <link href="http://fonts.googleapis.com/css?family=Lato:400,700|Crete+Round:400,400italic" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="static/css/main.css">

    <!-- END: CSS -->
    <!-- BEGIN: Favicons -->
    <link rel="shortcut icon" type="image/x-icon" href="static/images/favicon.ico" />
    <link rel="apple-touch-icon" href="static/images/touch-icon-iphone.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="static/images/touch-icon-ipad.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="static/images/touch-icon-iphone4.png" />
    <!-- END: Favicons -->
    <!-- BEGIN: Top JavaScript -->
    <script type="text/javascript" src="static/js/vendor/modernizr.min.js"></script>
    <script>
        document.createElement("picture");
    </script>
    <script src="static/js/vendor/picturefill.min.js" async></script>

    <!-- END: Top JavaScript -->
</head>

<body>

    <!--[if lte IE 8]>
<aside class="notificationBar notificationBar--oldBrowser">
    <div >
        <section class="validation">
            <div class="validation_summary warning">
                <h2 class="validation_summary_title" >You may want to update your browser</h2>
                <div >
                    <p>You’re using an older browser. Starbucks will work better for you if you <a href="http://windows.microsoft.com/en-gb/internet-explorer/download-ie">upgrade your browser</a> or switch to another browser.</p>
                </div>
            </div>
        </section>
    </div>
</aside>
<![endif]-->

    <div id="consent_blackbar"></div>

    <aside class="notificationBar notificationBar--shop">
    </aside>

    <header class="header_container">
        <div class="container">
            <div class="grid">
                <div class="column size12of12">
                    <div class="" id="header">
                        <ul class="skip">
                            <li><a href="#nav">skip to Main Navigation</a></li>
                            <li><a href="#content">skip to Main Content</a></li>
                            <li><a href="#footer">skip to Footer</a></li>
                        </ul>
                        <div>
                            <a href="index.html" id="logo" rel="home" title="Starbucks Logo">
<img src="media/logo_tcm87-366_w1024_n.png" alt="Logo" data-aspect="0" class="logo" />        </a>
                        </div>

                        <div id="utilities">
                            <ul class="utility_list">
                                <li class="utility_link store_locator">
                                    <a href="https://rewards.starbucks.in/store-locator" target="_blank" title="Find A Store"><span aria-hidden="true" data-icon="&#x272a"></span><span class="hidden_visually med_render_visually">Find A Store</span></a>
                                </li>
                            </ul>
                        </div>

                        <nav id="nav">
                            <div class="nav_control">
                                <a href="#nav">
            <span class="hamburger"></span>
            <span class="hidden_visually">Navigation</span>
        </a>
                            </div>
                            <div class="nav_menu">
                                <ul>
                                    <li id="nav_0">
                                        <div class="null_left"></div>
                                        <a class="tab" href="coffee.html"><strong>Coffee</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_1">
                                        <div class="null_left"></div>
                                        <a class="tab" href="menu-list.html"><strong>Menu</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_2">
                                        <div class="null_left"></div>
                                        <a class="tab" href="coffeehouse.html"><strong>Coffeehouse</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_3">
                                        <div class="null_left"></div>
                                        <a class="tab" href="responsibility.html"><strong>Responsibility</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_4">
                                        <div class="null_left"></div>
                                        <a class="tab" href="https://rewards.starbucks.in/" target="_blank"><strong>Rewards</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_5">
                                        <div class="null_left"></div>
                                        <a class="tab" href="https://careers.starbucks.in/" target="_blank"><strong>Careers</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_6">
                                        <div class="null_left"></div>
                                        <a class="tab" href="Starbucks-Seasons-Gifting.html"><strong>Starbucks Season&#39;s Gifting</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_7">
                                        <div class="null_left"></div>
                                        <a class="tab" href="starbucks-delivers.html"><strong>Starbucks Delivers</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                    <li id="nav_8">
                                        <div class="null_left"></div>
                                        <a class="tab" href="about-us.html"><strong>About Us</strong></a>
                                        <div class="null_right"></div>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="menus" class="megaNav">
        <ol class="container">
            <li class="fields" id="menu_0">
                <div class="region size4of5 menu_content">
                    <ol class="blocks blocks-four-up">
                        <li>
                            <p>
                                <a href="coffee/our-coffees.html">Our Coffees</a>
                            </p>
                            <ol>
                                <li><a href="coffee/our-coffees/format/via.html">Starbucks VIA&#174;</a></li>
                                <li><a href="coffee/our-coffees/format/whole-bean.html">Whole Bean Coffee</a></li>
                                <li><a href="coffee/our-coffees/view-all-coffees.html">View All Coffees</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="coffee/finder.html">Find Your Perfect Coffee</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="coffee/espresso.html">Espresso</a>
                            </p>
                            <ol>
                                <li><a href="coffee/espresso/ingredients.html">The Ingredients</a></li>
                                <li><a href="coffee/espresso/best-equipment.html">The Best Equipment</a></li>
                                <li><a href="coffee/espresso/who-makes-it.html">Who Makes It</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="coffee/how-to-brew.html">How to Brew Great Coffee</a>
                            </p>
                            <ol>
                                <li><a href="coffee/how-to-brew/coffee-press.html">Coffee Press</a></li>
                                <li><a href="coffee/how-to-brew/pour-over.html">Pour-Over</a></li>
                                <li><a href="coffee/how-to-brew/iced-pour-over.html">Iced Pour-Over</a></li>
                                <li><a href="coffee/how-to-brew/coffee-brewer.html">Coffee Brewer</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="coffee/ethical-sourcing.html">Ethical Sourcing</a>
                            </p>
                            <ol>
                                <li><a href="responsibility/ethical-sourcing/coffee-sourcing.html">Coffee</a></li>
                                <li><a href="coffee/ethical-sourcing/coffee-quality.html">Coffee Quality</a></li>
                                <li><a href="responsibility/ethical-sourcing/farmer-support.html">Farmer Support</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="card/rewards/customer-service.html">Learn More</a>
                            </p>
                            <ol>
                                <li><a href="coffee/learn/roast.html">Starbucks Roast Spectrum</a></li>
                                <li><a href="coffee/learn/coffee-form.html">Coffee by Form</a></li>
                                <li><a href="coffee/learn/flavors-in-your-cup.html">Flavors in Your Cup</a></li>
                                <li><a href="coffee/learn/coffee-faqs.html">Coffee FAQ</a></li>
                            </ol>
                        </li>
                    </ol>
                    <p class="menu_suggestion_title">
                        Looking for Coffee Beverages? </p>
                    <ul class="menu_suggestion_links">
                        <li class="navGroup_menu_sugList_item">
                            <a class="link" href="menu-list/drinks.html">Drinks</a>
                        </li>
                    </ul>
                </div>
                <div class="region size1of5 menu_promo">
                    <div class="anchor">

                    </div>
                </div>
            </li>
            <li class="fields" id="menu_1">
                <div class="region size4of5 menu_content">
                    <ol class="blocks blocks-four-up">
                        <li>
                            <p>
                                <a href="menu-list/drinks.html">Drinks</a>
                            </p>
                            <ol>
                                <!-- <li><a href="menu-list/drinks-item/Featured_Beverages.html">Featured Beverages</a></li> -->
                                <li><a href="menu-list/drinks-item/Espresso_Beverages.html">Khushboo's Coffe</a></li>
                                <li><a href="menu-list/drinks-item/Freshly_Brewed_Coffee.html">Freshly Brewed Coffee</a></li>
                                <li><a href="menu-list/drinks-item/Coffee_Frappuccino.html">Coffee Frappuccino&#174;</a></li>
                                <li><a href="menu-list/drinks-item/Creme_Frappuccino.html">Cr&#232;me Frappuccino&#174;</a></li>
                                <li><a href="menu-list/drinks-item/Other_Beverages.html">Other Beverages</a></li>
                                <li><a href="menu-list/drinks-item/Cold_Brew.html">Cold Brew</a></li>
                                <li><a href="menu-list/drinks-item/Teavana_Tea.html">Teavana&#174; Tea</a></li>
                                <li><a href="menu-list/drinks-item/Iced_Shaken.html">Iced Shaken</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="menu-list/food-list.html">Food</a>
                            </p>
                            <ol>
                                <li><a href="menu-list/food-list/featured-food.html">Featured Food</a></li>
                                <li><a href="menu-list/food-list/Sweet_Bakery_Food.html">Sweet Bakery</a></li>
                                <li><a href="menu-list/food-list/Savoury_Bakery_food.html">Savoury Bakery</a></li>
                                <li><a href="menu-list/food-list/Sandwiches_Wraps.html">Sandwiches &amp; Wraps</a></li>
                                <li><a href="menu-list/food-list/Salads_Muesli.html">Salads &amp; Muesli</a></li>
                                <li><a href="menu-list/food-list/Desserts.html">Desserts</a></li>
                            </ol>
                        </li>
                    </ol>
                    <p class="menu_suggestion_title">
                    </p>
                </div>
                <div class="region size1of5 menu_promo">
                    <div class="anchor">

                    </div>
                </div>
            </li>
            <li class="fields" id="menu_2">
                <div class="region size4of5 menu_content">
                    <ol class="blocks blocks-four-up">
                        <li>
                            <p>
                                <a href="coffeehouse/wireless-internet.html">Wireless Internet</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="store-locator/search.html">Store Locations</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="coffeehouse/store-design.html">Store Design</a>
                            </p>
                            <ol>
                                <li><a href="coffeehouse/store-design/fort-mumbai.html">Fort – Mumbai</a></li>
                                <li><a href="coffeehouse/store-design/indiranagar-bangalore.html">Indiranagar Bangalore</a></li>
                                <li><a href="coffeehouse/store-design/koregaon-park-pune.html">Koregaon Park Pune</a></li>
                                <li><a href="coffeehouse/store-design/hamilton-house-delhi.html">Hamilton House Delhi</a></li>
                                <li><a href="coffeehouse/store-design/jubiliee-hills-hyderabad.html">Jubiliee Hills Hyderabad</a></li>
                                <li><a href="coffeehouse/store-design/phoenix-market-city-chennai.html">Phoenix Market City Chennai</a></li>
                                <li><a href="coffeehouse/store-design/park-mansions-kolkata.html">Park Mansions Kolkata</a></li>
                            </ol>
                        </li>
                    </ol>
                    <p class="menu_suggestion_title">
                    </p>
                </div>
                <div class="region size1of5 menu_promo">
                    <a href="card/mobile_application_campaign.html">
                        <p><img src="media/promomobile_tcm87-27713.png" alt="Starbucks app on mobile device" /></p>
                        <p><strong>Starbucks&#174; India Mobile app</strong></p>
                        <p>Scan, pay and earn rewards. It’s that simple. Get our mobile app today!</p>

                    </a>
                </div>
            </li>
            <li class="fields" id="menu_3">
                <div class="region size4of5 menu_content">
                    <ol class="blocks blocks-four-up">
                        <li>
                            <p>
                                <a href="responsibility/community.html">Community</a>
                            </p>
                            <ol>
                                <li><a href="responsibility/community/local-area-engagement.html">Local Area Engagement</a></li>
                                <li><a href="responsibility/community/Empowering-Girls-And-Young-Women.html">Empowering Girls And Young Women</a></li>
                                <li><a href="responsibility/community/swastha.html">Swastha</a></li>
                                <li><a href="responsibility/community/chai-project.html">Chai Project</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="responsibility/ethical-sourcing.html">Ethical Sourcing</a>
                            </p>
                            <ol>
                                <li><a href="responsibility/ethical-sourcing/coffee-sourcing.html">Coffee Sourcing</a></li>
                                <li><a href="responsibility/ethical-sourcing/farmer-support.html">Farmer Support</a></li>
                                <li><a href="responsibility/ethical-sourcing/tea-sourcing.html">Tea Sourcing</a></li>
                                <li><a href="responsibility/ethical-sourcing/cocoa-sourcing.html">Cocoa Sourcing</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="responsibility/environment.html">Environment</a>
                            </p>
                            <ol>
                                <li><a href="responsibility/environment/recycling.html">Recycling</a></li>
                                <li><a href="responsibility/environment/energy.html">Energy</a></li>
                                <li><a href="responsibility/environment/water.html">Water</a></li>
                                <li><a href="responsibility/environment/green-building.html">Green Building</a></li>
                                <li><a href="responsibility/environment/climate-change.html">Climate Change</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="responsibility/diversity.html">Diversity</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="card/rewards/customer-service.html">Learn More</a>
                            </p>
                            <ol>
                                <li><a href="responsibility/learn-more/shared-planet.html">Starbucks Shared Planet</a></li>
                                <li><a href="responsibility/learn-more/policies.html">Policies</a></li>
                            </ol>
                        </li>
                    </ol>
                    <p class="menu_suggestion_title">
                    </p>
                </div>
                <div class="region size1of5 menu_promo">
                    <div class="anchor">

                    </div>
                </div>
            </li>
            <li class="fields" id="menu_4">
            </li>
            <li class="fields" id="menu_5">
            </li>
            <li class="fields" id="menu_6">
            </li>
            <li class="fields" id="menu_7">
            </li>
            <li class="fields" id="menu_8">
                <div class="region size4of5 menu_content">
                    <ol class="blocks blocks-four-up">
                        <li>
                            <p>
                                <a href="about-us/our-heritage.html">Our Heritage</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="about-us/company-information.html">Our Company</a>
                            </p>
                            <ol>
                                <li><a href="about-us/company-information/mission-statement.html">Mission Statement</a></li>
                                <li><a href="about-us/company-information/newsroom.html">Starbucks Newsroom</a></li>
                                <li><a href="about-us/company-information/business-ethics-and-compliance.html">Business Ethics and Compliance</a></li>
                                <li><a href="about-us/company-information/online-policies.html">Online Policies</a></li>
                            </ol>
                        </li>
                        <li>
                            <p>
                                <a href="https://careers.starbucks.in/" target="_blank">Career Center</a>
                            </p>
                        </li>
                    </ol>
                    <p class="menu_suggestion_title">
                    </p>
                </div>
                <div class="region size1of5 menu_promo">
                    <div class="anchor">

                    </div>
                </div>
            </li>
        </ol>
    </div>




    <main class="main" id="main">
        <div typeof="Region" resource="Main">


            <!--COMPONENT: HERO -->
            <style>
                .hero62126 {
                    background-color: ;
                }

                .hero62126 .heroImage {
                    background-image: url("media/main-banner1.jpg");
                }

                @media screen and (min-width: 541px) {
                    .hero62126 .heroImage {
                        background-image: url("media/main-banner2.jpg");
                    }
                }

                .hero62126 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero62126 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero62126 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero62126 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero62126 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero62126 a,
                .hero62126 a:link,
                .hero62126 a:visited,
                .hero62126 a:hover,
                .hero62126 a:focus,
                .hero62126 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero62126 .btn--cta a,
                .hero62126 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero62126 a:hover,
            .hero62126 a:focus,
            .hero62126 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero62126 .btn--cta a:hover,
                .hero62126 .btn--cta a:focus,
                .hero62126 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero62126 {
            background-image: url("/media/w_Bonus_Stars_tcm87-59096.jpg");
        }
    </style>
<![endif]-->

            <!-- <article class="heroBanner  heroBanner--noTextOverlay hero62126" >
    <div class="heroImage">
        <span class="hidden_visually"></span>
    </div>
    <div class="container">
        <div class="fields">
            <div class="region size12of12">
                            </div>
        </div>
    </div>
</article> -->


            <!--COMPONENT: HERO -->
            <style>
                .hero71374 {
                    background-color: ;
                }

                .hero71374 .heroImage {
                    background-image: url("media/register4.jpg");
                }

                @media screen and (min-width: 541px) {
                    .hero71374 .heroImage {
                        background-image: url("media/register4.jpg");
                    }
                }

                @media screen and (min-width: 768px) {
                    .hero71374 .heroImage {
                        background-image: url("media/register3.jpg");
                    }
                }

                @media screen and (min-width: 1024px) {
                    .hero71374 .heroImage {
                        background-image: url("media/register2.jpg");
                    }
                }

                @media screen and (min-width: 1200px) {
                    .hero71374 .heroImage {
                        background-image: url("media/register3.jpg");
                    }
                }

                .hero71374 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero71374 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero71374 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero71374 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero71374 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero71374 a,
                .hero71374 a:link,
                .hero71374 a:visited,
                .hero71374 a:hover,
                .hero71374 a:focus,
                .hero71374 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero71374 .btn--cta a,
                .hero71374 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero71374 a:hover,
            .hero71374 a:focus,
            .hero71374 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero71374 .btn--cta a:hover,
                .hero71374 .btn--cta a:focus,
                .hero71374 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero71374 {
            background-image: url("/media/web_Registration_1_tcm87-71372.png");
        }
    </style>
<![endif]-->

            <article class="heroBanner  heroBanner--noTextOverlay hero71374">
                <!--CLASS: topLeft, topRight, topCenter, midLeft, midRight, midCenter, bottomLeft, bottomRight, bottomCenter, heroBanner--noTextOverlay -->
                <div class="heroImage">
                    <span class="hidden_visually"></span>
                </div>
                <div class="container">
                    <div class="fields">
                        <div class="region size12of12">
                        </div>
                    </div>
                </div>
            </article>


            <!--COMPONENT2: HERO -->
            <style>
                .hero71198 {
                    background-color: ;
                }

                .hero71198 .heroImage {
                    background-image: url("media/monsoon_delights_web_640x900.jpg");
                }

                @media screen and (min-width: 541px) {
                    .hero71198 .heroImage {
                        background-image: url("media/monsoon_delights_web_2400X560.jpg");
                    }
                }

                .hero71198 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero71198 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero71198 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero71198 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero71198 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero71198 a,
                .hero71198 a:link,
                .hero71198 a:visited,
                .hero71198 a:hover,
                .hero71198 a:focus,
                .hero71198 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero71198 .btn--cta a,
                .hero71198 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero71198 a:hover,
            .hero71198 a:focus,
            .hero71198 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero71198 .btn--cta a:hover,
                .hero71198 .btn--cta a:focus,
                .hero71198 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero71198 {
            background-image: url("/media/web_revised_tcm87-72096.jpg");
        }
    </style>
<![endif]-->

            <article class="heroBanner  heroBanner--noTextOverlay hero71198">
                <!--CLASS: topLeft, topRight, topCenter, midLeft, midRight, midCenter, bottomLeft, bottomRight, bottomCenter, heroBanner--noTextOverlay -->
                <div class="heroImage">
                    <span class="hidden_visually"></span>
                </div>
                <div class="container">
                    <div class="fields">
                        <div class="region size12of12">
                        </div>
                    </div>
                </div>
            </article>


            <!--COMPONENT3: HERO -->
            <style>
                .hero71191 {
                    background-color: ;
                }

                .hero71191 .heroImage {
                    background-image: url("media/tropical_favourite_web_640x900.jpg");
                }

                @media screen and (min-width: 541px) {
                    .hero71191 .heroImage {
                        background-image: url("media/tropical_favourite_web_2400X560.jpg");
                    }
                }

                .hero71191 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero71191 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero71191 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero71191 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero71191 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero71191 a,
                .hero71191 a:link,
                .hero71191 a:visited,
                .hero71191 a:hover,
                .hero71191 a:focus,
                .hero71191 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero71191 .btn--cta a,
                .hero71191 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero71191 a:hover,
            .hero71191 a:focus,
            .hero71191 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero71191 .btn--cta a:hover,
                .hero71191 .btn--cta a:focus,
                .hero71191 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero71191 {
            background-image: url("/media/web_revised_tcm87-72096.jpg");
        }
    </style>
<![endif]-->

            <article class="heroBanner  heroBanner--noTextOverlay hero71191">
                <!--CLASS: topLeft, topRight, topCenter, midLeft, midRight, midCenter, bottomLeft, bottomRight, bottomCenter, heroBanner--noTextOverlay -->
                <div class="heroImage">
                    <span class="hidden_visually"></span>
                </div>
                <div class="container">
                    <div class="fields">
                        <div class="region size12of12">
                        </div>
                    </div>
                </div>
            </article>



            <!--COMPONENT: HERO -->
            <style>
                .hero60317 {
                    background-color: ;
                }

                .hero60317 .heroImage {
                    background-image: url("media/scoope-banner2.png");
                }

                @media screen and (min-width: 541px) {
                    .hero60317 .heroImage {
                        background-image: url("media/scoope-banner2.png");
                    }
                }

                @media screen and (min-width: 768px) {
                    .hero60317 .heroImage {
                        background-image: url("media/scoope-banner4.png");
                    }
                }

                @media screen and (min-width: 1024px) {
                    .hero60317 .heroImage {
                        background-image: url("media/scoope-banner3.png");
                    }
                }

                @media screen and (min-width: 1200px) {
                    .hero60317 .heroImage {
                        background-image: url("media/scoope-banner4.png");
                    }
                }

                .hero60317 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero60317 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero60317 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero60317 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero60317 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero60317 a,
                .hero60317 a:link,
                .hero60317 a:visited,
                .hero60317 a:hover,
                .hero60317 a:focus,
                .hero60317 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero60317 .btn--cta a,
                .hero60317 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero60317 a:hover,
            .hero60317 a:focus,
            .hero60317 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero60317 .btn--cta a:hover,
                .hero60317 .btn--cta a:focus,
                .hero60317 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero60317 {
            background-image: url("/media/desktop_scoopsofdelights_tcm87-60316.png");
        }
    </style>
<![endif]-->

            <article class="heroBanner  heroBanner--noTextOverlay hero60317">
                <!--CLASS: topLeft, topRight, topCenter, midLeft, midRight, midCenter, bottomLeft, bottomRight, bottomCenter, heroBanner--noTextOverlay -->
                <div class="heroImage">
                    <span class="hidden_visually"></span>
                </div>
                <div class="container">
                    <div class="fields">
                        <div class="region size12of12">
                        </div>
                    </div>
                </div>
            </article>


            <!--COMPONENT: HERO -->



            <!--COMPONENT: HERO -->
            <style>
                .hero64506 {
                    background-color: ;
                }

                .hero64506 .heroImage {
                    background-image: url("media/Mobile_Mobile_Order_and_Pay_tcm87-64505.png");
                }

                @media screen and (min-width: 541px) {
                    .hero64506 .heroImage {
                        background-image: url("media/Desktop_Mobile_Order_and_Pay_tcm87-64504.png");
                    }
                }

                .hero64506 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero64506 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero64506 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero64506 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero64506 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero64506 a,
                .hero64506 a:link,
                .hero64506 a:visited,
                .hero64506 a:hover,
                .hero64506 a:focus,
                .hero64506 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero64506 .btn--cta a,
                .hero64506 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero64506 a:hover,
            .hero64506 a:focus,
            .hero64506 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero64506 .btn--cta a:hover,
                .hero64506 .btn--cta a:focus,
                .hero64506 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero64506 {
            background-image: url("/media/Desktop_Mobile_Order_and_Pay_tcm87-64504.png");
        }
    </style>
<![endif]-->

            <article class="heroBanner  heroBanner--noTextOverlay hero64506">
                <!--CLASS: topLeft, topRight, topCenter, midLeft, midRight, midCenter, bottomLeft, bottomRight, bottomCenter, heroBanner--noTextOverlay -->
                <div class="heroImage">
                    <span class="hidden_visually"></span>
                </div>
                <div class="container">
                    <div class="fields">
                        <div class="region size12of12">
                            <a href="card/learn-more/card-faq.html#question_about_mobile_order_and_pay" class="hero_link"></a>
                        </div>
                    </div>
                </div>
            </article>


            <!--COMPONENT: HERO -->
            <style>
                .hero72098 {
                    background-color: ;
                }

                .hero72098 .heroImage {
                    background-image: url("media/app_revised_tcm87-72097.jpg");
                }

                @media screen and (min-width: 541px) {
                    .hero72098 .heroImage {
                        background-image: url("media/web_revised_tcm87-72096.jpg");
                    }
                }

                .hero72098 .hero_overlay {
                    background: rgba(0, 0, 0, 0);
                    color: ;
                }

                /* Styles to handle the gradient before and after the image */

                .hero72098 .heroImage:after {
                    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }

                @media screen and (min-width: 541px) {
                    .hero72098 .heroImage:after {
                        background: none;
                        filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
                    }
                }

                @media screen and (min-width: 2400px) {
                    .hero72098 .heroImage:before {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(0, 0, 0, 0)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
                    }
                    .hero72098 .heroImage:after {
                        background: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 1)));
                        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -o-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: -ms-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
                    }
                }

                /* END Styles to handle the gradient before and after the image */

                /* Link Color */

                .hero72098 a,
                .hero72098 a:link,
                .hero72098 a:visited,
                .hero72098 a:hover,
                .hero72098 a:focus,
                .hero72098 a:active {
                    color: ;
                }

                /* CTA-Button Color */

                .hero72098 .btn--cta a,
                .hero72098 .btn--cta a:visited {
                    color: ;
                }

                /* Link Hover Color
            .hero72098 a:hover,
            .hero72098 a:focus,
            .hero72098 a:active {
              background: rgba(15,15,15,.1);
              border-bottom: 1px solid;
            }*/

                /* CTA-Button Hover Color */

                .hero72098 .btn--cta a:hover,
                .hero72098 .btn--cta a:focus,
                .hero72098 .btn--cta a:active {
                    background: rgba(15, 15, 15, .1);
                }
            </style>
            <!--[if lte IE 8]>
  <style>
        .hero72098 {
            background-image: url("/media/web_revised_tcm87-72096.jpg");
        }
    </style>
<![endif]-->

            <article class="heroBanner  heroBanner--noTextOverlay hero72098">
                <!--CLASS: topLeft, topRight, topCenter, midLeft, midRight, midCenter, bottomLeft, bottomRight, bottomCenter, heroBanner--noTextOverlay -->
                <div class="heroImage">
                    <span class="hidden_visually"></span>
                </div>
                <div class="container">
                    <div class="fields">
                        <div class="region size12of12">
                            <a href="https://www.flipkart.com/kitchen-cookware-serveware/pr?count=40&amp;p%5B%5D=facets.fulfilled_by%255B%255D%3DFlipkart%2BAssured&amp;sid=upp&amp;p%5B%5D=facets.brand%255B%255D%3DStarbucks&amp;pageUID=1632744337591&amp;sort=recency_desc" class="hero_link"></a>
                        </div>
                    </div>
                </div>
            </article>


            <!--COMPONENT: HERO -->


            <div class="contentStripesContainer">
                <style>
                    .contentStripe16217 {
                        /* Background Color */
                        background-color: #ffffff;
                        /* Background Repeating */
                        background-repeat: no-repeat;
                        /* Text Color */
                        color: #000000;
                    }

                    /* Link Color */

                    .contentStripe16217 a,
                    .contentStripe16217 a:link,
                    .contentStripe16217 a:visited,
                    .contentStripe16217 a:hover,
                    .contentStripe16217 a:focus,
                    .contentStripe16217 a:active {
                        color: #000000;
                    }

                    /* CTA-Button Color */

                    .contentStripe16217 .btn--cta a,
                    .contentStripe16217 .btn--cta a:visited {
                        color: #000000;
                    }

                    /* Link Hover Color */

                    .contentStripe16217 a:hover,
                    .contentStripe16217 a:focus,
                    .contentStripe16217 a:active {
                        background: rgba(15, 15, 15, .1);
                        border-bottom: 1px solid;
                    }

                    /* CTA-Button Hover Color */

                    .contentStripe16217 .btn--cta a:hover,
                    .contentStripe16217 .btn--cta a:focus,
                    .contentStripe16217 .btn--cta a:active {
                        background: rgba(15, 15, 15, .1);
                    }

                    /* Desktop Background Image-Repeating pattern */

                    @media screen and (min-width: 414px) {
                        .contentStripe16217 {
                            background-image: url();
                        }
                    }
                </style>
                <article class="contentStripe contentStripe16217 contentStripe--imgLeft">
                    <div class="contentStripe__container">
                        <div class="contentStripe__grid">
                            <figure class="contentStripe__media">
                                <picture class="contentStripe__picture">
                                    <img src="media/latte-starbucks_tcm87-16216_w1024_n.png" alt="" data-aspect="0" class="contentStripe_img" />
                                </picture>
                            </figure>
                            <div class="contentStripe__content">
                                <h2 class="contentStripe__title">Let us delight you. </h2>
                                <div class="contentStripe__body">
                                    <p>Delicious, handcrafted beverages and great-tasting food. The secret to making life better.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <div class="contentStripesContainer">
                <style>
                    .contentStripe16219 {
                        /* Background Color */
                        background-color: #ffffff;
                        /* Background Repeating */
                        background-repeat: no-repeat;
                        /* Text Color */
                        color: #000000;
                    }

                    /* Link Color */

                    .contentStripe16219 a,
                    .contentStripe16219 a:link,
                    .contentStripe16219 a:visited,
                    .contentStripe16219 a:hover,
                    .contentStripe16219 a:focus,
                    .contentStripe16219 a:active {
                        color: #000000;
                    }

                    /* CTA-Button Color */

                    .contentStripe16219 .btn--cta a,
                    .contentStripe16219 .btn--cta a:visited {
                        color: #000000;
                    }

                    /* Link Hover Color */

                    .contentStripe16219 a:hover,
                    .contentStripe16219 a:focus,
                    .contentStripe16219 a:active {
                        background: rgba(15, 15, 15, .1);
                        border-bottom: 1px solid;
                    }

                    /* CTA-Button Hover Color */

                    .contentStripe16219 .btn--cta a:hover,
                    .contentStripe16219 .btn--cta a:focus,
                    .contentStripe16219 .btn--cta a:active {
                        background: rgba(15, 15, 15, .1);
                    }

                    /* Desktop Background Image-Repeating pattern */

                    @media screen and (min-width: 414px) {
                        .contentStripe16219 {
                            background-image: url();
                        }
                    }
                </style>
                <article class="contentStripe contentStripe16219 contentStripe--imgRight">
                    <div class="contentStripe__container">
                        <div class="contentStripe__grid">
                            <figure class="contentStripe__media">
                                <picture class="contentStripe__picture">
                                    <img src="media/oportunity_tcm87-16218_w1024_n.png" alt="Two baristas making coffee" data-aspect="0" class="contentStripe_img" />
                                </picture>
                            </figure>
                            <div class="contentStripe__content">
                                <h2 class="contentStripe__title">Opportunity </h2>
                                <div class="contentStripe__body">
                                    <p>To be more than an employee, to be a partner.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </main>
    <footer id="footer" tabindex="0" class="footer">
        <div class="footer-top">

            <div class="container">
                <div class="grid">
                    <ul class="sb-social-icons column size12of12 med_size4of12 ">
                        <li class="facebook">
                            <a href="https://www.facebook.com/starbucksindia" title="Facebook">
                            <span class="hidden_visually">Facebook</span>
                        </a>
                        </li>
                        <li class="twitter">
                            <a href="https://twitter.com/starbucksindia" title="Twitter">
                            <span class="hidden_visually">Twitter</span>
                        </a>
                        </li>
                        <li class="instagram">
                            <a href="https://www.instagram.com/starbucksindia" title="Instagram">
                            <span class="hidden_visually">Instagram</span>
                        </a>
                        </li>
                    </ul>


                </div>
            </div>

        </div>
        <div class="footer-main">
            <div class="container">
                <div class="grid">

                    <style>
                        @media (min-width: 768px) {
                            .footer_global {
                                background-image: url(media/wordmark_footer_tcm87-397.png);
                            }
                        }
                    </style>



                    <div class="footer_global accordion">

                        <div class="info_block column size12of12 med_size4of12 lg_size2of12">
                            <h4>
                                <a href="about-us.html" title="About Us">
                    About Us
                </a>
                                <label for="footer_link_group_843df5f2-85ff-4e2a-ac7a-230f00a050b0" data-icon="&#x2304" tabindex="0"></label>
                            </h4>
                            <input id="footer_link_group_843df5f2-85ff-4e2a-ac7a-230f00a050b0" name="footer" type="radio" aria-hidden="true" />
                            <ol>
                                <li>
                                    <a href="about-us/our-heritage.html" title="Our HeritageInvestor Relations">Our Heritage</a>
                                </li>
                                <li>
                                    <a href="about-us/company-information.html" title="Our Company">Our Company</a>
                                </li>
                            </ol>
                        </div>
                        <div class="info_block column size12of12 med_size4of12 lg_size2of12">
                            <h4>
                                <a href="card/rewards/customer-service.html" title="Customer Service">
                    Customer Service
                </a>
                                <label for="footer_link_group_2cb82f29-3d53-4b19-8a9e-83faec6c6555" data-icon="&#x2304" tabindex="0"></label>
                            </h4>
                            <input id="footer_link_group_2cb82f29-3d53-4b19-8a9e-83faec6c6555" name="footer" type="radio" aria-hidden="true" />
                            <ol>
                                <li>
                                    <a href="customer-service/frequently-asked-questions.html" title="Frequently Asked QuestionsWorking at Starbucks">Frequently Asked Questions</a>
                                </li>
                            </ol>
                        </div>
                        <div class="info_block column size12of12 med_size4of12 lg_size2of12">
                            <h4>
                                Quick Links <label for="footer_link_group_77b06a06-5436-47ba-a291-5bf2c073c939" data-icon="&#x2304" tabindex="0"></label>
                            </h4>
                            <input id="footer_link_group_77b06a06-5436-47ba-a291-5bf2c073c939" name="footer" type="radio" aria-hidden="true" />
                            <ol>
                                <li>
                                    <a href="https://rewards.starbucks.in/store-locator" target="_blank" title="Store Locator">Store Locator</a>
                                </li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="grid">


                    <div class="column size12of12">
                        <ul class="footer_sub">
                            <li>
                                <a href="about-us/company-information/online-policies/web-accessibility.html" title="Web Accessiblity">Web Accessiblity</a>
                            </li>
                            <li>
                                <a href="card/learn-more/privacy-policy.html" title="Privacy Statement">Privacy Statement</a>
                            </li>
                            <li>
                                <a href="about-us/company-information/online-policies/terms-of-use.html" title="Terms of Use" target="_self">Terms of Use</a>
                            </li>
                            <li>
                                <a href="site-map.html" title="Site Map">Site Map</a>
                            </li>
                            <li>
                                <a href="card/rewards/customer-service.html" title="Contact Us">Contact Us</a>
                            </li>
                        </ul>
                        <div id="teconsent" class="teconsent_showBorder">
                            <script async="async" type="text/javascript" src="http://consent.truste.com/notice?domain=starbucks.com&amp;c=teconsent&amp;text=true&amp;js=nj&amp;noticeType=bb&amp;country=in&amp;language=en" crossorigin></script>
                        </div>
                    </div>

                    <div class="column size12of12">
                        <p class="footer_copyright">&#169; 2022 Starbucks Coffee Company. All rights reserved.</p>
                    </div>

                </div>
            </div>
        </div>
    </footer>





    <!-- BEGIN: Bottom JavaScript -->

    <script src="../ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="static/js/vendor/jquery-1.7.2.min.js"><\/script>')
    </script>

    <script type="text/javascript" src="static/js/framework.js"></script>
    <script>
        sb.namespace("config");

        sb.config.globalTextResources = {
            closeButtonText: 'Close'
        };
    </script>




    <script type="text/javascript" src="static/js/main.js"></script>
    <script type="text/javascript" src="static/js/our-coffees.js"></script>
    <!-- END: Bottom JavaScript -->
</body>

</html>
