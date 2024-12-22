!function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? e(require("jquery")) : (e(t.jQuery),
    t.jqueryAsPieProgressEs = {})
}(this, function(t) {
    "use strict";
    var e, i = (e = t,
    e && e.__esModule ? e : {
        default: e
    }), n = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i),
            n && t(e, n),
            e
        }
    }(), s = function t(e, i) {
        var n = document.createElementNS("http://www.w3.org/2000/svg", e);
        if (!i)
            return n;
        for (var s in i)
            Object.hasOwnProperty.call(i, s) && n.setAttribute(s, i[s]);
        return n
    };
    Date.now || (Date.now = function() {
        return new Date().getTime()
    }
    );
    for (var a = ["webkit", "moz"], r = 0; r < a.length && !window.requestAnimationFrame; ++r) {
        var o = a[r];
        window.requestAnimationFrame = window[o + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[o + "CancelAnimationFrame"] || window[o + "CancelRequestAnimationFrame"]
    }
    if (/iP(ad|hone|od).*OS (6|7|8)/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var h = 0;
        window.requestAnimationFrame = function(t) {
            var e = u()
              , i = Math.max(h + 16, e);
            return setTimeout(function() {
                t(h = i)
            }, i - e)
        }
        ,
        window.cancelAnimationFrame = clearTimeout
    }
    var u = function t() {
        return void 0 !== window.performance && window.performance.now ? window.performance.now() : Date.now()
    }
      , l = "createElementNS"in document && new s("svg",{}).createSVGRect
      , f = function t(e, i, n, s) {
        var a = function t(e, i) {
            return 1 - 3 * i + 3 * e
        }
          , r = function t(e, i) {
            return 3 * i - 6 * e
        }
          , o = function t(e) {
            return 3 * e
        }
          , h = function t(e, i, n) {
            return ((a(i, n) * e + r(i, n)) * e + o(i)) * e
        }
          , u = function t(e, i, n) {
            return 3 * a(i, n) * e * e + 2 * r(i, n) * e + o(i)
        }
          , l = function t(i) {
            for (var s = i, a = 0; a < 4; ++a) {
                var r = u(s, e, n);
                if (0 === r)
                    break;
                var o = h(s, e, n) - i;
                s -= o / r
            }
            return s
        };
        return e === i && n === s ? {
            css: "linear",
            fn: function t(e) {
                return e
            }
        } : {
            css: "cubic-bezier(" + e + "," + i + "," + n + "," + s + ")",
            fn: function t(e) {
                return h(l(e), i, s)
            }
        }
    }
      , c = {
        ease: f(.25, .1, .25, 1),
        linear: f(0, 0, 1, 1),
        "ease-in": f(.42, 0, 1, 1),
        "ease-out": f(0, 0, .58, 1),
        "ease-in-out": f(.42, 0, .58, 1)
    }
      , m = {
        namespace: "asPieProgress",
        classes: {
            svg: "pie_progress__svg",
            element: "pie_progress",
            number: "pie_progress__number",
            content: "pie_progress__content"
        },
        min: 0,
        max: 100,
        goal: 100,
        size: 160,
        speed: 15,
        barcolor: "#ef1e25",
        barsize: "4",
        trackcolor: "#f2f2f2",
        fillcolor: "none",
        easing: "ease",
        numberCallback: function t(e) {
            return Math.round(this.getPercentage(e)) + "%"
        },
        contentCallback: null
    }
      , g = "asPieProgress"
      , $ = function() {
        function t(e, n) {
            !function t(e, i) {
                if (!(e instanceof i))
                    throw TypeError("Cannot call a class as a function")
            }(this, t),
            this.element = e,
            this.$element = (0,
            i.default)(e),
            this.options = i.default.extend(!0, {}, m, n, this.$element.data()),
            this.namespace = this.options.namespace,
            this.classes = this.options.classes,
            this.easing = c[this.options.easing] || c.ease,
            this.$element.addClass(this.classes.element),
            this.min = this.$element.attr("aria-valuemin"),
            this.max = this.$element.attr("aria-valuemax"),
            this.min = this.min ? parseInt(this.min, 10) : this.options.min,
            this.max = this.max ? parseInt(this.max, 10) : this.options.max,
            this.first = this.$element.attr("aria-valuenow"),
            this.first = this.first ? parseInt(this.first, 10) : this.options.first ? this.options.first : this.min,
            this.now = this.first,
            this.goal = this.options.goal,
            this._frameId = null,
            this.initialized = !1,
            this._trigger("init"),
            this.init()
        }
        return n(t, [{
            key: "init",
            value: function t() {
                this.$number = this.$element.find("." + this.classes.number),
                this.$content = this.$element.find("." + this.classes.content),
                this.size = this.options.size,
                this.width = this.size,
                this.height = this.size,
                this.prepare(),
                this.initialized = !0,
                this._trigger("ready")
            }
        }, {
            key: "prepare",
            value: function t() {
                l && (this.svg = new s("svg",{
                    version: "1.1",
                    preserveAspectRatio: "xMinYMin meet",
                    viewBox: "0 0 " + this.width + " " + this.height
                }),
                this.buildTrack(),
                this.buildBar(),
                (0,
                i.default)('<div class="' + this.classes.svg + '"></div>').append(this.svg).appendTo(this.$element))
            }
        }, {
            key: "buildTrack",
            value: function t() {
                var e = this.size
                  , i = this.size / 2
                  , n = e / 2
                  , a = this.options.barsize
                  , r = new s("ellipse",{
                    rx: i - a / 2,
                    ry: n - a / 2,
                    cx: i,
                    cy: n,
                    stroke: this.options.trackcolor,
                    fill: this.options.fillcolor,
                    "stroke-width": a
                });
                this.svg.appendChild(r)
            }
        }, {
            key: "buildBar",
            value: function t() {
                if (l) {
                    var e = new s("path",{
                        fill: "none",
                        "stroke-width": this.options.barsize,
                        stroke: this.options.barcolor
                    });
                    this.bar = e,
                    this.svg.appendChild(e),
                    this._drawBar(this.first),
                    this._updateBar()
                }
            }
        }, {
            key: "_drawBar",
            value: function t(e) {
                if (l) {
                    this.barGoal = e;
                    var i = this.size
                      , n = this.size / 2
                      , s = i / 2
                      , a = Math.min(n, s) - this.options.barsize / 2;
                    this.r = a;
                    var r = this.getPercentage(e);
                    100 === r && (r -= 1e-4);
                    var o = 0 + r * Math.PI * 2 / 100
                      , h = 0;
                    o - 0 > Math.PI && (h = 1);
                    var u = "M" + (n + 0 * a) + "," + (s - 1 * a) + " A" + a + "," + a + " 0 " + h + " 1 " + (n + a * Math.sin(o)) + "," + (s - a * Math.cos(o));
                    this.bar.setAttribute("d", u)
                }
            }
        }, {
            key: "_updateBar",
            value: function t() {
                if (l) {
                    var e = this.getPercentage(this.now)
                      , i = this.bar.getTotalLength()
                      , n = i * (1 - e / this.getPercentage(this.barGoal));
                    this.bar.style.strokeDasharray = i + " " + i,
                    this.bar.style.strokeDashoffset = n
                }
            }
        }, {
            key: "_trigger",
            value: function t(e) {
                for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
                    n[s - 1] = arguments[s];
                var a = [this].concat(n);
                this.$element.trigger(g + "::" + e, a);
                var r = "on" + (e = e.replace(/\b\w+\b/g, function(t) {
                    return t.substring(0, 1).toUpperCase() + t.substring(1)
                }));
                "function" == typeof this.options[r] && this.options[r].apply(this, n)
            }
        }, {
            key: "getPercentage",
            value: function t(e) {
                return 100 * (e - this.min) / (this.max - this.min)
            }
        }, {
            key: "go",
            value: function t(e) {
                var i, n = this;
                this._clear(),
                "string" == typeof (i = e) && -1 !== i.indexOf("%") && (e = parseInt(e.replace("%", ""), 10),
                e = Math.round(this.min + e / 100 * (this.max - this.min))),
                void 0 === e && (e = this.goal),
                e > this.max ? e = this.max : e < this.min && (e = this.min),
                this.barGoal < e && this._drawBar(e),
                n.now,
                u(),
                n.options.speed,
                n.max,
                n.min;
                var s = function t(i) {
                    var s = void 0;
                    s = e,
                    n._update(s),
                    s === e ? (window.cancelAnimationFrame(n._frameId),
                    n._frameId = null,
                    n.now === n.goal && n._trigger("finish")) : n._frameId = window.requestAnimationFrame(t)
                };
                n._frameId = window.requestAnimationFrame(s)
            }
        }, {
            key: "_update",
            value: function t(e) {
                this.now = e,
                this._updateBar(),
                this.$element.attr("aria-valuenow", this.now),
                this.$number.length > 0 && "function" == typeof this.options.numberCallback && this.$number.html(this.options.numberCallback.call(this, [this.now])),
                this.$content.length > 0 && "function" == typeof this.options.contentCallback && this.$content.html(this.options.contentCallback.call(this, [this.now])),
                this._trigger("update", e)
            }
        }, {
            key: "_clear",
            value: function t() {
                this._frameId && (window.cancelAnimationFrame(this._frameId),
                this._frameId = null)
            }
        }, {
            key: "get",
            value: function t() {
                return this.now
            }
        }, {
            key: "start",
            value: function t() {
                this._clear(),
                this._trigger("start"),
                this.go(this.goal)
            }
        }, {
            key: "reset",
            value: function t() {
                this._clear(),
                this._drawBar(this.first),
                this._update(this.first),
                this._trigger("reset")
            }
        }, {
            key: "stop",
            value: function t() {
                this._clear(),
                this._trigger("stop")
            }
        }, {
            key: "finish",
            value: function t() {
                this._clear(),
                this._update(this.goal),
                this._trigger("finish")
            }
        }, {
            key: "destroy",
            value: function t() {
                this.$element.data(g, null),
                this._trigger("destroy")
            }
        }], [{
            key: "registerEasing",
            value: function t(e) {
                for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
                    n[s - 1] = arguments[s];
                c[e] = f.apply(void 0, n)
            }
        }, {
            key: "getEasing",
            value: function t(e) {
                return c[e]
            }
        }, {
            key: "setDefaults",
            value: function t(e) {
                i.default.extend(!0, m, i.default.isPlainObject(e) && e)
            }
        }]),
        t
    }()
      , p = "asPieProgress"
      , d = i.default.fn.asPieProgress
      , v = function t(e) {
        for (var n = arguments.length, s = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
            s[a - 1] = arguments[a];
        if ("string" == typeof e) {
            var r = e;
            if (/^_/.test(r))
                return !1;
            if (!/^(get)/.test(r))
                return this.each(function() {
                    var t = i.default.data(this, p);
                    t && "function" == typeof t[r] && t[r].apply(t, s)
                });
            var o = this.first().data(p);
            if (o && "function" == typeof o[r])
                return o[r].apply(o, s)
        }
        return this.each(function() {
            (0,
            i.default)(this).data(p) || (0,
            i.default)(this).data(p, new $(this,e))
        })
    };
    i.default.fn.asPieProgress = v,
    i.default.asPieProgress = i.default.extend({
        setDefaults: $.setDefaults,
        registerEasing: $.registerEasing,
        getEasing: $.getEasing,
        noConflict: function t() {
            return i.default.fn.asPieProgress = d,
            v
        }
    }, {
        version: "0.4.7"
    })
});
