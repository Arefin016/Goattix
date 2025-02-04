/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
!(function (e) {
  e.fn.niceSelect = function (t) {
    function s(t) {
      t.after(
        e("<div></div>")
          .addClass("nice-select")
          .addClass(t.attr("class") || "")
          .addClass(t.attr("disabled") ? "disabled" : "")
          .attr("tabindex", t.attr("disabled") ? null : "0")
          .html('<span class="current"></span><ul class="list"></ul>')
      );
      var s = t.next(),
        n = t.find("option"),
        i = t.find("option:selected");
      s.find(".current").html(i.data("display") || i.text()),
        n.each(function (t) {
          var n = e(this),
            i = n.data("display");
          s.find("ul").append(
            e("<li></li>")
              .attr("data-value", n.val())
              .attr("data-display", i || null)
              .addClass(
                "option" +
                  (n.is(":selected") ? " selected" : "") +
                  (n.is(":disabled") ? " disabled" : "")
              )
              .html(n.text())
          );
        });
    }
    if ("string" == typeof t)
      return (
        "update" == t
          ? this.each(function () {
              var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
              n.length && (n.remove(), s(t), i && t.next().trigger("click"));
            })
          : "destroy" == t
          ? (this.each(function () {
              var t = e(this),
                s = e(this).next(".nice-select");
              s.length && (s.remove(), t.css("display", ""));
            }),
            0 == e(".nice-select").length && e(document).off(".nice_select"))
          : console.log('Method "' + t + '" does not exist.'),
        this
      );
    this.hide(),
      this.each(function () {
        var t = e(this);
        t.next().hasClass("nice-select") || s(t);
      }),
      e(document).off(".nice_select"),
      e(document).on("click.nice_select", ".nice-select", function (t) {
        var s = e(this);
        e(".nice-select").not(s).removeClass("open"),
          s.toggleClass("open"),
          s.hasClass("open")
            ? (s.find(".option"),
              s.find(".focus").removeClass("focus"),
              s.find(".selected").addClass("focus"))
            : s.focus();
      }),
      e(document).on("click.nice_select", function (t) {
        0 === e(t.target).closest(".nice-select").length &&
          e(".nice-select").removeClass("open").find(".option");
      }),
      e(document).on(
        "click.nice_select",
        ".nice-select .option:not(.disabled)",
        function (t) {
          var s = e(this),
            n = s.closest(".nice-select");
          n.find(".selected").removeClass("selected"), s.addClass("selected");
          var i = s.data("display") || s.text();
          n.find(".current").text(i),
            n.prev("select").val(s.data("value")).trigger("change");
        }
      ),
      e(document).on("keydown.nice_select", ".nice-select", function (t) {
        var s = e(this),
          n = e(s.find(".focus") || s.find(".list .option.selected"));
        if (32 == t.keyCode || 13 == t.keyCode)
          return (
            s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1
          );
        if (40 == t.keyCode) {
          if (s.hasClass("open")) {
            var i = n.nextAll(".option:not(.disabled)").first();
            i.length > 0 &&
              (s.find(".focus").removeClass("focus"), i.addClass("focus"));
          } else s.trigger("click");
          return !1;
        }
        if (38 == t.keyCode) {
          if (s.hasClass("open")) {
            var l = n.prevAll(".option:not(.disabled)").first();
            l.length > 0 &&
              (s.find(".focus").removeClass("focus"), l.addClass("focus"));
          } else s.trigger("click");
          return !1;
        }
        if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
        else if (9 == t.keyCode && s.hasClass("open")) return !1;
      });
    var n = document.createElement("a").style;
    return (
      (n.cssText = "pointer-events:auto"),
      "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"),
      this
    );
  };
})(jQuery);

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g > 0; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i),
              (g -= 1);
          (this._clones = b),
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center &&
              this.$stage.children().eq(this.current()).addClass("center");
        },
      },
    ]),
    (e.prototype.initializeStage = function () {
      (this.$stage = this.$element.find("." + this.settings.stageClass)),
        this.$stage.length ||
          (this.$element.addClass(this.options.loadingClass),
          (this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass,
          }).wrap(a("<div/>", { class: this.settings.stageOuterClass }))),
          this.$element.append(this.$stage.parent()));
    }),
    (e.prototype.initializeItems = function () {
      var b = this.$element.find(".owl-item");
      if (b.length)
        return (
          (this._items = b.get().map(function (b) {
            return a(b);
          })),
          (this._mergers = this._items.map(function () {
            return 1;
          })),
          void this.refresh()
        );
      this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass);
    }),
    (e.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var a, b, c;
        (a = this.$element.find("img")),
          (b = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (c = this.$element.children(b).width()),
          a.length && c <= 0 && this.preloadAutoWidthImages(a);
      }
      this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.isVisible = function () {
      return !this.settings.checkVisibility || this.$element.is(":visible");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.isVisible() &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        !1 !== this.settings.responsive &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function (a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function (b, c) {
      var e = -1,
        f = 30,
        g = this.width(),
        h = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            h,
            a.proxy(function (a, i) {
              return (
                "left" === c && b > i - f && b < i + f
                  ? (e = a)
                  : "right" === c && b > i - g - f && b < i - g + f
                  ? (e = a + 1)
                  : this.op(b, "<", i) &&
                    this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) &&
                    (e = "left" === c ? a + 1 : a),
                -1 === e
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", h[this.minimum()])
            ? (e = b = this.minimum())
            : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
        e
      );
    }),
    (e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition:
                this.speed() / 1e3 +
                "s" +
                (this.settings.slideTransition
                  ? " " + this.settings.slideTransition
                  : ""),
            })
          : c
          ? this.$stage.animate(
              { left: b + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)) !== d &&
        ((this._speed = 0),
        (this._current = a),
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        if ((b = this._items.length))
          for (
            c = this._items[--b].width(), d = this.$element.width();
            b-- && !((c += this._items[b].width() + this.settings.margin) > d);

          );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function (a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function (a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h) !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function () {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)) !== d &&
        (this.trigger("remove", { content: this._items[a], position: a }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && -1 !== a.namespace.indexOf("owl"))
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function (a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.isVisible()),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function () {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              ) {
                var c = this._core.settings,
                  e = (c.center && Math.ceil(c.items / 2)) || c.items,
                  f = (c.center && -1 * e) || 0,
                  g =
                    (b.property && b.property.value !== d
                      ? b.property.value
                      : this._core.current()) + f,
                  h = this._core.clones().length,
                  i = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                for (
                  c.lazyLoadEager > 0 &&
                  ((e += c.lazyLoadEager),
                  c.loop && ((g -= c.lazyLoadEager), e++));
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
              }
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
      (e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src") ||
                  f.attr("data-srcset");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : f.is("source")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          this._core.trigger(
                            "loaded",
                            { element: f, url: g },
                            "lazy"
                          );
                        }, this)
                      )
                      .attr("srcset", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (c) {
      (this._core = c),
        (this._previousHeight = null),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" === a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      var d = this;
      a(b).on("load", function () {
        d._core.settings.autoHeight && d.update();
      }),
        a(b).resize(function () {
          d._core.settings.autoHeight &&
            (null != d._intervalId && clearTimeout(d._intervalId),
            (d._intervalId = setTimeout(function () {
              d.update();
            }, 250)));
        });
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function () {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.settings.lazyLoad,
          e = this._core.$stage.children().toArray().slice(b, c),
          f = [],
          g = 0;
        a.each(e, function (b, c) {
          f.push(a(c).height());
        }),
          (g = Math.max.apply(null, f)),
          g <= 1 && d && this._previousHeight && (g = this._previousHeight),
          (this._previousHeight = g),
          this._core.$stage
            .parent()
            .height(g)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        var c = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? "width:" + c.width + "px;height:" + c.height + "px;"
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (c) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? a("<div/>", { class: "owl-video-tn " + j, srcType: c })
                : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + c + ")",
                  })),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap(a("<div/>", { class: "owl-video-wrapper", style: g })),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a[0].thumbnail_large), l(f);
              },
            })
          : "vzaar" === c.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function (b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          (c = a(
            '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
          )),
          c.attr("height", h),
          c.attr("width", g),
          "youtube" === f.type
            ? c.attr(
                "src",
                "//www.youtube.com/embed/" +
                  f.id +
                  "?autoplay=1&rel=0&v=" +
                  f.id
              )
            : "vimeo" === f.type
            ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1")
            : "vzaar" === f.type &&
              c.attr(
                "src",
                "//view.vzaar.com/" + f.id + "/player?autoplay=true"
              ),
          a(c)
            .wrap('<div class="owl-video-frame" />')
            .insertAfter(e.find(".owl-video")),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function () {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame");
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            }, this),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._paused &&
                (this._time = 0);
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype._next = function (d) {
        (this._call = b.setTimeout(
          a.proxy(this._next, this, d),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
            this.read()
        )),
          this._core.is("interacting") ||
            c.hidden ||
            this._core.next(d || this._core.settings.autoplaySpeed);
      }),
      (e.prototype.read = function () {
        return new Date().getTime() - this._time;
      }),
      (e.prototype.play = function (c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"),
          (c = c || this._core.settings.autoplayTimeout),
          (e = Math.min(this._time % (this._timeout || c), c)),
          this._paused
            ? ((this._time = this.read()), (this._paused = !1))
            : b.clearTimeout(this._call),
          (this._time += (this.read() % c) - e),
          (this._timeout = c),
          (this._call = b.setTimeout(a.proxy(this._next, this, d), c - e));
      }),
      (e.prototype.stop = function () {
        this._core.is("rotating") &&
          ((this._time = 0),
          (this._paused = !0),
          b.clearTimeout(this._call),
          this._core.leave("rotating"));
      }),
      (e.prototype.pause = function () {
        this._core.is("rotating") &&
          !this._paused &&
          ((this._time = this.read()),
          (this._paused = !0),
          b.clearTimeout(this._call));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (
          c.navContainer
            ? a(c.navContainer)
            : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a('<button role="button">')
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            c.dotsContainer
              ? a(c.dotsContainer)
              : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "button",
            a.proxy(function (b) {
              var d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function () {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls)
          "$relative" === b && e.navContainer
            ? this._controls[b].html("")
            : this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function () {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function (a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      j = {
        csstransforms: function () {
          return !!e("transform");
        },
        csstransforms3d: function () {
          return !!e("perspective");
        },
        csstransitions: function () {
          return !!e("transition");
        },
        cssanimations: function () {
          return !!e("animation");
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});

// inview js
!(function (t) {
  function e() {
    var e,
      i,
      n = { height: a.innerHeight, width: a.innerWidth };
    return (
      n.height ||
        ((e = r.compatMode),
        (e || !t.support.boxModel) &&
          ((i = "CSS1Compat" === e ? f : r.body),
          (n = { height: i.clientHeight, width: i.clientWidth }))),
      n
    );
  }
  function i() {
    return {
      top: a.pageYOffset || f.scrollTop || r.body.scrollTop,
      left: a.pageXOffset || f.scrollLeft || r.body.scrollLeft,
    };
  }
  function n() {
    var n,
      l = t(),
      r = 0;
    if (
      (t.each(d, function (t, e) {
        var i = e.data.selector,
          n = e.$element;
        l = l.add(i ? n.find(i) : n);
      }),
      (n = l.length))
    )
      for (o = o || e(), h = h || i(); n > r; r++)
        if (t.contains(f, l[r])) {
          var a,
            c,
            p,
            s = t(l[r]),
            u = { height: s.height(), width: s.width() },
            g = s.offset(),
            v = s.data("inview");
          if (!h || !o) return;
          g.top + u.height > h.top &&
          g.top < h.top + o.height &&
          g.left + u.width > h.left &&
          g.left < h.left + o.width
            ? ((a =
                h.left > g.left
                  ? "right"
                  : h.left + o.width < g.left + u.width
                  ? "left"
                  : "both"),
              (c =
                h.top > g.top
                  ? "bottom"
                  : h.top + o.height < g.top + u.height
                  ? "top"
                  : "both"),
              (p = a + "-" + c),
              (v && v === p) ||
                s.data("inview", p).trigger("inview", [!0, a, c]))
            : v && s.data("inview", !1).trigger("inview", [!1]);
        }
  }
  var o,
    h,
    l,
    d = {},
    r = document,
    a = window,
    f = r.documentElement,
    c = t.expando;
  (t.event.special.inview = {
    add: function (e) {
      (d[e.guid + "-" + this[c]] = { data: e, $element: t(this) }),
        l || t.isEmptyObject(d) || (l = setInterval(n, 250));
    },
    remove: function (e) {
      try {
        delete d[e.guid + "-" + this[c]];
      } catch (i) {}
      t.isEmptyObject(d) && (clearInterval(l), (l = null));
    },
  }),
    t(a).bind("scroll resize scrollstop", function () {
      o = h = null;
    }),
    !f.addEventListener &&
      f.attachEvent &&
      f.attachEvent("onfocusin", function () {
        h = null;
      });
})(jQuery);

// aos
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.AOS = t())
    : (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { exports: {}, id: o, loaded: !1 });
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = "dist/"), t(0);
  })([
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        s = o(c),
        f = n(8),
        d = o(f),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        },
        j = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k))
            return (w = (0, y.default)(w, x)), (0, b.default)(w, x.once), w;
        },
        O = function () {
          (w = (0, h.default)()), j();
        },
        M = function () {
          w.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        S = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && p.default.mobile()) ||
            ("phone" === e && p.default.phone()) ||
            ("tablet" === e && p.default.tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        _ = function (e) {
          (x = i(x, e)), (w = (0, h.default)());
          var t = document.all && !window.atob;
          return S(x.disable) || t
            ? M()
            : (x.disableMutationObserver ||
                d.default.isSupported() ||
                (console.info(
                  '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                ),
                (x.disableMutationObserver = !0)),
              document
                .querySelector("body")
                .setAttribute("data-aos-easing", x.easing),
              document
                .querySelector("body")
                .setAttribute("data-aos-duration", x.duration),
              document
                .querySelector("body")
                .setAttribute("data-aos-delay", x.delay),
              "DOMContentLoaded" === x.startEvent &&
              ["complete", "interactive"].indexOf(document.readyState) > -1
                ? j(!0)
                : "load" === x.startEvent
                ? window.addEventListener(x.startEvent, function () {
                    j(!0);
                  })
                : document.addEventListener(x.startEvent, function () {
                    j(!0);
                  }),
              window.addEventListener(
                "resize",
                (0, s.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "orientationchange",
                (0, s.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "scroll",
                (0, u.default)(function () {
                  (0, b.default)(w, x.once);
                }, x.throttleDelay)
              ),
              x.disableMutationObserver || d.default.ready("[data-aos]", O),
              w);
        };
      e.exports = { init: _, refresh: j, refreshHard: O };
    },
    function (e, t) {},
    ,
    ,
    ,
    ,
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function o(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (k = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (k = e), (h = setTimeout(f, t)), M ? o(e) : g;
          }
          function a(e) {
            var n = e - w,
              o = e - k,
              i = t - n;
            return S ? j(i, y - o) : i;
          }
          function c(e) {
            var n = e - w,
              o = e - k;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function f() {
            var e = O();
            return c(e) ? d(e) : void (h = setTimeout(f, a(e)));
          }
          function d(e) {
            return (h = void 0), _ && b ? o(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(O());
          }
          function m() {
            var e = O(),
              n = c(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(f, t)), o(w);
            }
            return void 0 === h && (h = setTimeout(f, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            M = !1,
            S = !1,
            _ = !0;
          if ("function" != typeof e) throw new TypeError(s);
          return (
            (t = u(t) || 0),
            i(n) &&
              ((M = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (_ = "trailing" in n ? !!n.trailing : _)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e, t, o) {
          var r = !0,
            a = !0;
          if ("function" != typeof e) throw new TypeError(s);
          return (
            i(o) &&
              ((r = "leading" in o ? !!o.leading : r),
              (a = "trailing" in o ? !!o.trailing : a)),
            n(e, t, { leading: r, maxWait: t, trailing: a })
          );
        }
        function i(e) {
          var t = "undefined" == typeof e ? "undefined" : c(e);
          return !!e && ("object" == t || "function" == t);
        }
        function r(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
          );
        }
        function a(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) ||
            (r(e) && k.call(e) == d)
          );
        }
        function u(e) {
          if ("number" == typeof e) return e;
          if (a(e)) return f;
          if (i(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = i(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(l, "");
          var n = m.test(e);
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? f : +e;
        }
        var c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          s = "Expected a function",
          f = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y =
            "object" == ("undefined" == typeof t ? "undefined" : c(t)) &&
            t &&
            t.Object === Object &&
            t,
          g =
            "object" == ("undefined" == typeof self ? "undefined" : c(self)) &&
            self &&
            self.Object === Object &&
            self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function () {
            return h.Date.now();
          };
        e.exports = o;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function i(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (O = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (O = e), (h = setTimeout(f, t)), M ? i(e) : g;
          }
          function u(e) {
            var n = e - w,
              o = e - O,
              i = t - n;
            return S ? x(i, y - o) : i;
          }
          function s(e) {
            var n = e - w,
              o = e - O;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function f() {
            var e = j();
            return s(e) ? d(e) : void (h = setTimeout(f, u(e)));
          }
          function d(e) {
            return (h = void 0), _ && b ? i(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(j());
          }
          function m() {
            var e = j(),
              n = s(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(f, t)), i(w);
            }
            return void 0 === h && (h = setTimeout(f, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            M = !1,
            S = !1,
            _ = !0;
          if ("function" != typeof e) throw new TypeError(c);
          return (
            (t = a(t) || 0),
            o(n) &&
              ((M = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (_ = "trailing" in n ? !!n.trailing : _)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e) {
          var t = "undefined" == typeof e ? "undefined" : u(e);
          return !!e && ("object" == t || "function" == t);
        }
        function i(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
          );
        }
        function r(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) ||
            (i(e) && w.call(e) == f)
          );
        }
        function a(e) {
          if ("number" == typeof e) return e;
          if (r(e)) return s;
          if (o(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(d, "");
          var n = p.test(e);
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? s : +e;
        }
        var u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          c = "Expected a function",
          s = NaN,
          f = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v =
            "object" == ("undefined" == typeof t ? "undefined" : u(t)) &&
            t &&
            t.Object === Object &&
            t,
          y =
            "object" == ("undefined" == typeof self ? "undefined" : u(self)) &&
            self &&
            self.Object === Object &&
            self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function () {
            return g.Date.now();
          };
        e.exports = n;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      "use strict";
      function n(e) {
        var t = void 0,
          o = void 0,
          i = void 0;
        for (t = 0; t < e.length; t += 1) {
          if (((o = e[t]), o.dataset && o.dataset.aos)) return !0;
          if ((i = o.children && n(o.children))) return !0;
        }
        return !1;
      }
      function o() {
        return (
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver
        );
      }
      function i() {
        return !!o();
      }
      function r(e, t) {
        var n = window.document,
          i = o(),
          r = new i(a);
        (u = t),
          r.observe(n.documentElement, {
            childList: !0,
            subtree: !0,
            removedNodes: !0,
          });
      }
      function a(e) {
        e &&
          e.forEach(function (e) {
            var t = Array.prototype.slice.call(e.addedNodes),
              o = Array.prototype.slice.call(e.removedNodes),
              i = t.concat(o);
            if (n(i)) return u();
          });
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = function () {};
      t.default = { isSupported: i, ready: r };
    },
    function (e, t) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        r =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        s = (function () {
          function e() {
            n(this, e);
          }
          return (
            i(e, [
              {
                key: "phone",
                value: function () {
                  var e = o();
                  return !(!r.test(e) && !a.test(e.substr(0, 4)));
                },
              },
              {
                key: "mobile",
                value: function () {
                  var e = o();
                  return !(!u.test(e) && !c.test(e.substr(0, 4)));
                },
              },
              {
                key: "tablet",
                value: function () {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t.default = new s();
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e, t, n) {
          var o = e.node.getAttribute("data-aos-once");
          t > e.position
            ? e.node.classList.add("aos-animate")
            : "undefined" != typeof o &&
              ("false" === o || (!n && "true" !== o)) &&
              e.node.classList.remove("aos-animate");
        },
        o = function (e, t) {
          var o = window.pageYOffset,
            i = window.innerHeight;
          e.forEach(function (e, r) {
            n(e, i + o, t);
          });
        };
      t.default = o;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(12),
        r = o(i),
        a = function (e, t) {
          return (
            e.forEach(function (e, n) {
              e.node.classList.add("aos-init"),
                (e.position = (0, r.default)(e.node, t.offset));
            }),
            e
          );
        };
      t.default = a;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(13),
        r = o(i),
        a = function (e, t) {
          var n = 0,
            o = 0,
            i = window.innerHeight,
            a = {
              offset: e.getAttribute("data-aos-offset"),
              anchor: e.getAttribute("data-aos-anchor"),
              anchorPlacement: e.getAttribute("data-aos-anchor-placement"),
            };
          switch (
            (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
            a.anchor &&
              document.querySelectorAll(a.anchor) &&
              (e = document.querySelectorAll(a.anchor)[0]),
            (n = (0, r.default)(e).top),
            a.anchorPlacement)
          ) {
            case "top-bottom":
              break;
            case "center-bottom":
              n += e.offsetHeight / 2;
              break;
            case "bottom-bottom":
              n += e.offsetHeight;
              break;
            case "top-center":
              n += i / 2;
              break;
            case "bottom-center":
              n += i / 2 + e.offsetHeight;
              break;
            case "center-center":
              n += i / 2 + e.offsetHeight / 2;
              break;
            case "top-top":
              n += i;
              break;
            case "bottom-top":
              n += e.offsetHeight + i;
              break;
            case "center-top":
              n += e.offsetHeight / 2 + i;
          }
          return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
        };
      t.default = a;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        for (
          var t = 0, n = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        )
          (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
            (n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
            (e = e.offsetParent);
        return { top: n, left: t };
      };
      t.default = n;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        return (
          (e = e || document.querySelectorAll("[data-aos]")),
          Array.prototype.map.call(e, function (e) {
            return { node: e };
          })
        );
      };
      t.default = n;
    },
  ]);
});

// flatpicker

/* flatpickr v4.6.13,, @license MIT */
!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).flatpickr =
        n());
})(this, function () {
  "use strict";
  var e = function () {
    return (e =
      Object.assign ||
      function (e) {
        for (var n, t = 1, a = arguments.length; t < a; t++)
          for (var i in (n = arguments[t]))
            Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        return e;
      }).apply(this, arguments);
  };
  function n() {
    for (var e = 0, n = 0, t = arguments.length; n < t; n++)
      e += arguments[n].length;
    var a = Array(e),
      i = 0;
    for (n = 0; n < t; n++)
      for (var o = arguments[n], r = 0, l = o.length; r < l; r++, i++)
        a[i] = o[r];
    return a;
  }
  var t = [
      "onChange",
      "onClose",
      "onDayCreate",
      "onDestroy",
      "onKeyDown",
      "onMonthChange",
      "onOpen",
      "onParseConfig",
      "onReady",
      "onValueUpdate",
      "onYearChange",
      "onPreCalendarPosition",
    ],
    a = {
      _disable: [],
      allowInput: !1,
      allowInvalidPreload: !1,
      altFormat: "F j, Y",
      altInput: !1,
      altInputClass: "form-control input",
      animate:
        "object" == typeof window &&
        -1 === window.navigator.userAgent.indexOf("MSIE"),
      ariaDateFormat: "F j, Y",
      autoFillDefaultTime: !0,
      clickOpens: !0,
      closeOnSelect: !0,
      conjunction: ", ",
      dateFormat: "Y-m-d",
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: !1,
      enableSeconds: !1,
      enableTime: !1,
      errorHandler: function (e) {
        return "undefined" != typeof console && console.warn(e);
      },
      getWeek: function (e) {
        var n = new Date(e.getTime());
        n.setHours(0, 0, 0, 0),
          n.setDate(n.getDate() + 3 - ((n.getDay() + 6) % 7));
        var t = new Date(n.getFullYear(), 0, 4);
        return (
          1 +
          Math.round(
            ((n.getTime() - t.getTime()) / 864e5 - 3 + ((t.getDay() + 6) % 7)) /
              7
          )
        );
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: !1,
      locale: "default",
      minuteIncrement: 5,
      mode: "single",
      monthSelectorType: "dropdown",
      nextArrow:
        "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: !1,
      now: new Date(),
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      onPreCalendarPosition: [],
      plugins: [],
      position: "auto",
      positionElement: void 0,
      prevArrow:
        "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: !1,
      showMonths: 1,
      static: !1,
      time_24hr: !1,
      weekNumbers: !1,
      wrap: !1,
    },
    i = {
      weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      months: {
        shorthand: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        longhand: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: function (e) {
        var n = e % 100;
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      },
      rangeSeparator: " to ",
      weekAbbreviation: "Wk",
      scrollTitle: "Scroll to increment",
      toggleTitle: "Click to toggle",
      amPM: ["AM", "PM"],
      yearAriaLabel: "Year",
      monthAriaLabel: "Month",
      hourAriaLabel: "Hour",
      minuteAriaLabel: "Minute",
      time_24hr: !1,
    },
    o = function (e, n) {
      return void 0 === n && (n = 2), ("000" + e).slice(-1 * n);
    },
    r = function (e) {
      return !0 === e ? 1 : 0;
    };
  function l(e, n) {
    var t;
    return function () {
      var a = this,
        i = arguments;
      clearTimeout(t),
        (t = setTimeout(function () {
          return e.apply(a, i);
        }, n));
    };
  }
  var c = function (e) {
    return e instanceof Array ? e : [e];
  };
  function s(e, n, t) {
    if (!0 === t) return e.classList.add(n);
    e.classList.remove(n);
  }
  function d(e, n, t) {
    var a = window.document.createElement(e);
    return (
      (n = n || ""),
      (t = t || ""),
      (a.className = n),
      void 0 !== t && (a.textContent = t),
      a
    );
  }
  function u(e) {
    for (; e.firstChild; ) e.removeChild(e.firstChild);
  }
  function f(e, n) {
    return n(e) ? e : e.parentNode ? f(e.parentNode, n) : void 0;
  }
  function m(e, n) {
    var t = d("div", "numInputWrapper"),
      a = d("input", "numInput " + e),
      i = d("span", "arrowUp"),
      o = d("span", "arrowDown");
    if (
      (-1 === navigator.userAgent.indexOf("MSIE 9.0")
        ? (a.type = "number")
        : ((a.type = "text"), (a.pattern = "\\d*")),
      void 0 !== n)
    )
      for (var r in n) a.setAttribute(r, n[r]);
    return t.appendChild(a), t.appendChild(i), t.appendChild(o), t;
  }
  function g(e) {
    try {
      return "function" == typeof e.composedPath
        ? e.composedPath()[0]
        : e.target;
    } catch (n) {
      return e.target;
    }
  }
  var p = function () {},
    h = function (e, n, t) {
      return t.months[n ? "shorthand" : "longhand"][e];
    },
    v = {
      D: p,
      F: function (e, n, t) {
        e.setMonth(t.months.longhand.indexOf(n));
      },
      G: function (e, n) {
        e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(n));
      },
      H: function (e, n) {
        e.setHours(parseFloat(n));
      },
      J: function (e, n) {
        e.setDate(parseFloat(n));
      },
      K: function (e, n, t) {
        e.setHours(
          (e.getHours() % 12) + 12 * r(new RegExp(t.amPM[1], "i").test(n))
        );
      },
      M: function (e, n, t) {
        e.setMonth(t.months.shorthand.indexOf(n));
      },
      S: function (e, n) {
        e.setSeconds(parseFloat(n));
      },
      U: function (e, n) {
        return new Date(1e3 * parseFloat(n));
      },
      W: function (e, n, t) {
        var a = parseInt(n),
          i = new Date(e.getFullYear(), 0, 2 + 7 * (a - 1), 0, 0, 0, 0);
        return i.setDate(i.getDate() - i.getDay() + t.firstDayOfWeek), i;
      },
      Y: function (e, n) {
        e.setFullYear(parseFloat(n));
      },
      Z: function (e, n) {
        return new Date(n);
      },
      d: function (e, n) {
        e.setDate(parseFloat(n));
      },
      h: function (e, n) {
        e.setHours((e.getHours() >= 12 ? 12 : 0) + parseFloat(n));
      },
      i: function (e, n) {
        e.setMinutes(parseFloat(n));
      },
      j: function (e, n) {
        e.setDate(parseFloat(n));
      },
      l: p,
      m: function (e, n) {
        e.setMonth(parseFloat(n) - 1);
      },
      n: function (e, n) {
        e.setMonth(parseFloat(n) - 1);
      },
      s: function (e, n) {
        e.setSeconds(parseFloat(n));
      },
      u: function (e, n) {
        return new Date(parseFloat(n));
      },
      w: p,
      y: function (e, n) {
        e.setFullYear(2e3 + parseFloat(n));
      },
    },
    D = {
      D: "",
      F: "",
      G: "(\\d\\d|\\d)",
      H: "(\\d\\d|\\d)",
      J: "(\\d\\d|\\d)\\w+",
      K: "",
      M: "",
      S: "(\\d\\d|\\d)",
      U: "(.+)",
      W: "(\\d\\d|\\d)",
      Y: "(\\d{4})",
      Z: "(.+)",
      d: "(\\d\\d|\\d)",
      h: "(\\d\\d|\\d)",
      i: "(\\d\\d|\\d)",
      j: "(\\d\\d|\\d)",
      l: "",
      m: "(\\d\\d|\\d)",
      n: "(\\d\\d|\\d)",
      s: "(\\d\\d|\\d)",
      u: "(.+)",
      w: "(\\d\\d|\\d)",
      y: "(\\d{2})",
    },
    w = {
      Z: function (e) {
        return e.toISOString();
      },
      D: function (e, n, t) {
        return n.weekdays.shorthand[w.w(e, n, t)];
      },
      F: function (e, n, t) {
        return h(w.n(e, n, t) - 1, !1, n);
      },
      G: function (e, n, t) {
        return o(w.h(e, n, t));
      },
      H: function (e) {
        return o(e.getHours());
      },
      J: function (e, n) {
        return void 0 !== n.ordinal
          ? e.getDate() + n.ordinal(e.getDate())
          : e.getDate();
      },
      K: function (e, n) {
        return n.amPM[r(e.getHours() > 11)];
      },
      M: function (e, n) {
        return h(e.getMonth(), !0, n);
      },
      S: function (e) {
        return o(e.getSeconds());
      },
      U: function (e) {
        return e.getTime() / 1e3;
      },
      W: function (e, n, t) {
        return t.getWeek(e);
      },
      Y: function (e) {
        return o(e.getFullYear(), 4);
      },
      d: function (e) {
        return o(e.getDate());
      },
      h: function (e) {
        return e.getHours() % 12 ? e.getHours() % 12 : 12;
      },
      i: function (e) {
        return o(e.getMinutes());
      },
      j: function (e) {
        return e.getDate();
      },
      l: function (e, n) {
        return n.weekdays.longhand[e.getDay()];
      },
      m: function (e) {
        return o(e.getMonth() + 1);
      },
      n: function (e) {
        return e.getMonth() + 1;
      },
      s: function (e) {
        return e.getSeconds();
      },
      u: function (e) {
        return e.getTime();
      },
      w: function (e) {
        return e.getDay();
      },
      y: function (e) {
        return String(e.getFullYear()).substring(2);
      },
    },
    b = function (e) {
      var n = e.config,
        t = void 0 === n ? a : n,
        o = e.l10n,
        r = void 0 === o ? i : o,
        l = e.isMobile,
        c = void 0 !== l && l;
      return function (e, n, a) {
        var i = a || r;
        return void 0 === t.formatDate || c
          ? n
              .split("")
              .map(function (n, a, o) {
                return w[n] && "\\" !== o[a - 1]
                  ? w[n](e, i, t)
                  : "\\" !== n
                  ? n
                  : "";
              })
              .join("")
          : t.formatDate(e, n, i);
      };
    },
    C = function (e) {
      var n = e.config,
        t = void 0 === n ? a : n,
        o = e.l10n,
        r = void 0 === o ? i : o;
      return function (e, n, i, o) {
        if (0 === e || e) {
          var l,
            c = o || r,
            s = e;
          if (e instanceof Date) l = new Date(e.getTime());
          else if ("string" != typeof e && void 0 !== e.toFixed)
            l = new Date(e);
          else if ("string" == typeof e) {
            var d = n || (t || a).dateFormat,
              u = String(e).trim();
            if ("today" === u) (l = new Date()), (i = !0);
            else if (t && t.parseDate) l = t.parseDate(e, d);
            else if (/Z$/.test(u) || /GMT$/.test(u)) l = new Date(e);
            else {
              for (
                var f = void 0, m = [], g = 0, p = 0, h = "";
                g < d.length;
                g++
              ) {
                var w = d[g],
                  b = "\\" === w,
                  C = "\\" === d[g - 1] || b;
                if (D[w] && !C) {
                  h += D[w];
                  var M = new RegExp(h).exec(e);
                  M &&
                    (f = !0) &&
                    m["Y" !== w ? "push" : "unshift"]({
                      fn: v[w],
                      val: M[++p],
                    });
                } else b || (h += ".");
              }
              (l =
                t && t.noCalendar
                  ? new Date(new Date().setHours(0, 0, 0, 0))
                  : new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)),
                m.forEach(function (e) {
                  var n = e.fn,
                    t = e.val;
                  return (l = n(l, t, c) || l);
                }),
                (l = f ? l : void 0);
            }
          }
          if (l instanceof Date && !isNaN(l.getTime()))
            return !0 === i && l.setHours(0, 0, 0, 0), l;
          t.errorHandler(new Error("Invalid date provided: " + s));
        }
      };
    };
  function M(e, n, t) {
    return (
      void 0 === t && (t = !0),
      !1 !== t
        ? new Date(e.getTime()).setHours(0, 0, 0, 0) -
          new Date(n.getTime()).setHours(0, 0, 0, 0)
        : e.getTime() - n.getTime()
    );
  }
  var y = function (e, n, t) {
      return 3600 * e + 60 * n + t;
    },
    x = 864e5;
  function E(e) {
    var n = e.defaultHour,
      t = e.defaultMinute,
      a = e.defaultSeconds;
    if (void 0 !== e.minDate) {
      var i = e.minDate.getHours(),
        o = e.minDate.getMinutes(),
        r = e.minDate.getSeconds();
      n < i && (n = i),
        n === i && t < o && (t = o),
        n === i && t === o && a < r && (a = e.minDate.getSeconds());
    }
    if (void 0 !== e.maxDate) {
      var l = e.maxDate.getHours(),
        c = e.maxDate.getMinutes();
      (n = Math.min(n, l)) === l && (t = Math.min(c, t)),
        n === l && t === c && (a = e.maxDate.getSeconds());
    }
    return { hours: n, minutes: t, seconds: a };
  }
  "function" != typeof Object.assign &&
    (Object.assign = function (e) {
      for (var n = [], t = 1; t < arguments.length; t++)
        n[t - 1] = arguments[t];
      if (!e) throw TypeError("Cannot convert undefined or null to object");
      for (
        var a = function (n) {
            n &&
              Object.keys(n).forEach(function (t) {
                return (e[t] = n[t]);
              });
          },
          i = 0,
          o = n;
        i < o.length;
        i++
      ) {
        var r = o[i];
        a(r);
      }
      return e;
    });
  function k(p, v) {
    var w = { config: e(e({}, a), I.defaultConfig), l10n: i };
    function k() {
      var e;
      return (
        (null === (e = w.calendarContainer) || void 0 === e
          ? void 0
          : e.getRootNode()
        ).activeElement || document.activeElement
      );
    }
    function T(e) {
      return e.bind(w);
    }
    function S() {
      var e = w.config;
      (!1 === e.weekNumbers && 1 === e.showMonths) ||
        (!0 !== e.noCalendar &&
          window.requestAnimationFrame(function () {
            if (
              (void 0 !== w.calendarContainer &&
                ((w.calendarContainer.style.visibility = "hidden"),
                (w.calendarContainer.style.display = "block")),
              void 0 !== w.daysContainer)
            ) {
              var n = (w.days.offsetWidth + 1) * e.showMonths;
              (w.daysContainer.style.width = n + "px"),
                (w.calendarContainer.style.width =
                  n +
                  (void 0 !== w.weekWrapper ? w.weekWrapper.offsetWidth : 0) +
                  "px"),
                w.calendarContainer.style.removeProperty("visibility"),
                w.calendarContainer.style.removeProperty("display");
            }
          }));
    }
    function _(e) {
      if (0 === w.selectedDates.length) {
        var n =
            void 0 === w.config.minDate || M(new Date(), w.config.minDate) >= 0
              ? new Date()
              : new Date(w.config.minDate.getTime()),
          t = E(w.config);
        n.setHours(t.hours, t.minutes, t.seconds, n.getMilliseconds()),
          (w.selectedDates = [n]),
          (w.latestSelectedDateObj = n);
      }
      void 0 !== e &&
        "blur" !== e.type &&
        (function (e) {
          e.preventDefault();
          var n = "keydown" === e.type,
            t = g(e),
            a = t;
          void 0 !== w.amPM &&
            t === w.amPM &&
            (w.amPM.textContent =
              w.l10n.amPM[r(w.amPM.textContent === w.l10n.amPM[0])]);
          var i = parseFloat(a.getAttribute("min")),
            l = parseFloat(a.getAttribute("max")),
            c = parseFloat(a.getAttribute("step")),
            s = parseInt(a.value, 10),
            d = e.delta || (n ? (38 === e.which ? 1 : -1) : 0),
            u = s + c * d;
          if (void 0 !== a.value && 2 === a.value.length) {
            var f = a === w.hourElement,
              m = a === w.minuteElement;
            u < i
              ? ((u = l + u + r(!f) + (r(f) && r(!w.amPM))),
                m && L(void 0, -1, w.hourElement))
              : u > l &&
                ((u = a === w.hourElement ? u - l - r(!w.amPM) : i),
                m && L(void 0, 1, w.hourElement)),
              w.amPM &&
                f &&
                (1 === c ? u + s === 23 : Math.abs(u - s) > c) &&
                (w.amPM.textContent =
                  w.l10n.amPM[r(w.amPM.textContent === w.l10n.amPM[0])]),
              (a.value = o(u));
          }
        })(e);
      var a = w._input.value;
      O(), ye(), w._input.value !== a && w._debouncedChange();
    }
    function O() {
      if (void 0 !== w.hourElement && void 0 !== w.minuteElement) {
        var e,
          n,
          t = (parseInt(w.hourElement.value.slice(-2), 10) || 0) % 24,
          a = (parseInt(w.minuteElement.value, 10) || 0) % 60,
          i =
            void 0 !== w.secondElement
              ? (parseInt(w.secondElement.value, 10) || 0) % 60
              : 0;
        void 0 !== w.amPM &&
          ((e = t),
          (n = w.amPM.textContent),
          (t = (e % 12) + 12 * r(n === w.l10n.amPM[1])));
        var o =
            void 0 !== w.config.minTime ||
            (w.config.minDate &&
              w.minDateHasTime &&
              w.latestSelectedDateObj &&
              0 === M(w.latestSelectedDateObj, w.config.minDate, !0)),
          l =
            void 0 !== w.config.maxTime ||
            (w.config.maxDate &&
              w.maxDateHasTime &&
              w.latestSelectedDateObj &&
              0 === M(w.latestSelectedDateObj, w.config.maxDate, !0));
        if (
          void 0 !== w.config.maxTime &&
          void 0 !== w.config.minTime &&
          w.config.minTime > w.config.maxTime
        ) {
          var c = y(
              w.config.minTime.getHours(),
              w.config.minTime.getMinutes(),
              w.config.minTime.getSeconds()
            ),
            s = y(
              w.config.maxTime.getHours(),
              w.config.maxTime.getMinutes(),
              w.config.maxTime.getSeconds()
            ),
            d = y(t, a, i);
          if (d > s && d < c) {
            var u = (function (e) {
              var n = Math.floor(e / 3600),
                t = (e - 3600 * n) / 60;
              return [n, t, e - 3600 * n - 60 * t];
            })(c);
            (t = u[0]), (a = u[1]), (i = u[2]);
          }
        } else {
          if (l) {
            var f =
              void 0 !== w.config.maxTime ? w.config.maxTime : w.config.maxDate;
            (t = Math.min(t, f.getHours())) === f.getHours() &&
              (a = Math.min(a, f.getMinutes())),
              a === f.getMinutes() && (i = Math.min(i, f.getSeconds()));
          }
          if (o) {
            var m =
              void 0 !== w.config.minTime ? w.config.minTime : w.config.minDate;
            (t = Math.max(t, m.getHours())) === m.getHours() &&
              a < m.getMinutes() &&
              (a = m.getMinutes()),
              a === m.getMinutes() && (i = Math.max(i, m.getSeconds()));
          }
        }
        A(t, a, i);
      }
    }
    function F(e) {
      var n = e || w.latestSelectedDateObj;
      n && n instanceof Date && A(n.getHours(), n.getMinutes(), n.getSeconds());
    }
    function A(e, n, t) {
      void 0 !== w.latestSelectedDateObj &&
        w.latestSelectedDateObj.setHours(e % 24, n, t || 0, 0),
        w.hourElement &&
          w.minuteElement &&
          !w.isMobile &&
          ((w.hourElement.value = o(
            w.config.time_24hr ? e : ((12 + e) % 12) + 12 * r(e % 12 == 0)
          )),
          (w.minuteElement.value = o(n)),
          void 0 !== w.amPM && (w.amPM.textContent = w.l10n.amPM[r(e >= 12)]),
          void 0 !== w.secondElement && (w.secondElement.value = o(t)));
    }
    function N(e) {
      var n = g(e),
        t = parseInt(n.value) + (e.delta || 0);
      (t / 1e3 > 1 || ("Enter" === e.key && !/[^\d]/.test(t.toString()))) &&
        ee(t);
    }
    function P(e, n, t, a) {
      return n instanceof Array
        ? n.forEach(function (n) {
            return P(e, n, t, a);
          })
        : e instanceof Array
        ? e.forEach(function (e) {
            return P(e, n, t, a);
          })
        : (e.addEventListener(n, t, a),
          void w._handlers.push({
            remove: function () {
              return e.removeEventListener(n, t, a);
            },
          }));
    }
    function Y() {
      De("onChange");
    }
    function j(e, n) {
      var t =
          void 0 !== e
            ? w.parseDate(e)
            : w.latestSelectedDateObj ||
              (w.config.minDate && w.config.minDate > w.now
                ? w.config.minDate
                : w.config.maxDate && w.config.maxDate < w.now
                ? w.config.maxDate
                : w.now),
        a = w.currentYear,
        i = w.currentMonth;
      try {
        void 0 !== t &&
          ((w.currentYear = t.getFullYear()), (w.currentMonth = t.getMonth()));
      } catch (e) {
        (e.message = "Invalid date supplied: " + t), w.config.errorHandler(e);
      }
      n && w.currentYear !== a && (De("onYearChange"), q()),
        !n ||
          (w.currentYear === a && w.currentMonth === i) ||
          De("onMonthChange"),
        w.redraw();
    }
    function H(e) {
      var n = g(e);
      ~n.className.indexOf("arrow") &&
        L(e, n.classList.contains("arrowUp") ? 1 : -1);
    }
    function L(e, n, t) {
      var a = e && g(e),
        i = t || (a && a.parentNode && a.parentNode.firstChild),
        o = we("increment");
      (o.delta = n), i && i.dispatchEvent(o);
    }
    function R(e, n, t, a) {
      var i = ne(n, !0),
        o = d("span", e, n.getDate().toString());
      return (
        (o.dateObj = n),
        (o.$i = a),
        o.setAttribute("aria-label", w.formatDate(n, w.config.ariaDateFormat)),
        -1 === e.indexOf("hidden") &&
          0 === M(n, w.now) &&
          ((w.todayDateElem = o),
          o.classList.add("today"),
          o.setAttribute("aria-current", "date")),
        i
          ? ((o.tabIndex = -1),
            be(n) &&
              (o.classList.add("selected"),
              (w.selectedDateElem = o),
              "range" === w.config.mode &&
                (s(
                  o,
                  "startRange",
                  w.selectedDates[0] && 0 === M(n, w.selectedDates[0], !0)
                ),
                s(
                  o,
                  "endRange",
                  w.selectedDates[1] && 0 === M(n, w.selectedDates[1], !0)
                ),
                "nextMonthDay" === e && o.classList.add("inRange"))))
          : o.classList.add("flatpickr-disabled"),
        "range" === w.config.mode &&
          (function (e) {
            return (
              !("range" !== w.config.mode || w.selectedDates.length < 2) &&
              M(e, w.selectedDates[0]) >= 0 &&
              M(e, w.selectedDates[1]) <= 0
            );
          })(n) &&
          !be(n) &&
          o.classList.add("inRange"),
        w.weekNumbers &&
          1 === w.config.showMonths &&
          "prevMonthDay" !== e &&
          a % 7 == 6 &&
          w.weekNumbers.insertAdjacentHTML(
            "beforeend",
            "<span class='flatpickr-day'>" + w.config.getWeek(n) + "</span>"
          ),
        De("onDayCreate", o),
        o
      );
    }
    function W(e) {
      e.focus(), "range" === w.config.mode && oe(e);
    }
    function B(e) {
      for (
        var n = e > 0 ? 0 : w.config.showMonths - 1,
          t = e > 0 ? w.config.showMonths : -1,
          a = n;
        a != t;
        a += e
      )
        for (
          var i = w.daysContainer.children[a],
            o = e > 0 ? 0 : i.children.length - 1,
            r = e > 0 ? i.children.length : -1,
            l = o;
          l != r;
          l += e
        ) {
          var c = i.children[l];
          if (-1 === c.className.indexOf("hidden") && ne(c.dateObj)) return c;
        }
    }
    function J(e, n) {
      var t = k(),
        a = te(t || document.body),
        i =
          void 0 !== e
            ? e
            : a
            ? t
            : void 0 !== w.selectedDateElem && te(w.selectedDateElem)
            ? w.selectedDateElem
            : void 0 !== w.todayDateElem && te(w.todayDateElem)
            ? w.todayDateElem
            : B(n > 0 ? 1 : -1);
      void 0 === i
        ? w._input.focus()
        : a
        ? (function (e, n) {
            for (
              var t =
                  -1 === e.className.indexOf("Month")
                    ? e.dateObj.getMonth()
                    : w.currentMonth,
                a = n > 0 ? w.config.showMonths : -1,
                i = n > 0 ? 1 : -1,
                o = t - w.currentMonth;
              o != a;
              o += i
            )
              for (
                var r = w.daysContainer.children[o],
                  l =
                    t - w.currentMonth === o
                      ? e.$i + n
                      : n < 0
                      ? r.children.length - 1
                      : 0,
                  c = r.children.length,
                  s = l;
                s >= 0 && s < c && s != (n > 0 ? c : -1);
                s += i
              ) {
                var d = r.children[s];
                if (
                  -1 === d.className.indexOf("hidden") &&
                  ne(d.dateObj) &&
                  Math.abs(e.$i - s) >= Math.abs(n)
                )
                  return W(d);
              }
            w.changeMonth(i), J(B(i), 0);
          })(i, n)
        : W(i);
    }
    function K(e, n) {
      for (
        var t = (new Date(e, n, 1).getDay() - w.l10n.firstDayOfWeek + 7) % 7,
          a = w.utils.getDaysInMonth((n - 1 + 12) % 12, e),
          i = w.utils.getDaysInMonth(n, e),
          o = window.document.createDocumentFragment(),
          r = w.config.showMonths > 1,
          l = r ? "prevMonthDay hidden" : "prevMonthDay",
          c = r ? "nextMonthDay hidden" : "nextMonthDay",
          s = a + 1 - t,
          u = 0;
        s <= a;
        s++, u++
      )
        o.appendChild(R("flatpickr-day " + l, new Date(e, n - 1, s), 0, u));
      for (s = 1; s <= i; s++, u++)
        o.appendChild(R("flatpickr-day", new Date(e, n, s), 0, u));
      for (
        var f = i + 1;
        f <= 42 - t && (1 === w.config.showMonths || u % 7 != 0);
        f++, u++
      )
        o.appendChild(R("flatpickr-day " + c, new Date(e, n + 1, f % i), 0, u));
      var m = d("div", "dayContainer");
      return m.appendChild(o), m;
    }
    function U() {
      if (void 0 !== w.daysContainer) {
        u(w.daysContainer), w.weekNumbers && u(w.weekNumbers);
        for (
          var e = document.createDocumentFragment(), n = 0;
          n < w.config.showMonths;
          n++
        ) {
          var t = new Date(w.currentYear, w.currentMonth, 1);
          t.setMonth(w.currentMonth + n),
            e.appendChild(K(t.getFullYear(), t.getMonth()));
        }
        w.daysContainer.appendChild(e),
          (w.days = w.daysContainer.firstChild),
          "range" === w.config.mode && 1 === w.selectedDates.length && oe();
      }
    }
    function q() {
      if (
        !(w.config.showMonths > 1 || "dropdown" !== w.config.monthSelectorType)
      ) {
        var e = function (e) {
          return (
            !(
              void 0 !== w.config.minDate &&
              w.currentYear === w.config.minDate.getFullYear() &&
              e < w.config.minDate.getMonth()
            ) &&
            !(
              void 0 !== w.config.maxDate &&
              w.currentYear === w.config.maxDate.getFullYear() &&
              e > w.config.maxDate.getMonth()
            )
          );
        };
        (w.monthsDropdownContainer.tabIndex = -1),
          (w.monthsDropdownContainer.innerHTML = "");
        for (var n = 0; n < 12; n++)
          if (e(n)) {
            var t = d("option", "flatpickr-monthDropdown-month");
            (t.value = new Date(w.currentYear, n).getMonth().toString()),
              (t.textContent = h(n, w.config.shorthandCurrentMonth, w.l10n)),
              (t.tabIndex = -1),
              w.currentMonth === n && (t.selected = !0),
              w.monthsDropdownContainer.appendChild(t);
          }
      }
    }
    function $() {
      var e,
        n = d("div", "flatpickr-month"),
        t = window.document.createDocumentFragment();
      w.config.showMonths > 1 || "static" === w.config.monthSelectorType
        ? (e = d("span", "cur-month"))
        : ((w.monthsDropdownContainer = d(
            "select",
            "flatpickr-monthDropdown-months"
          )),
          w.monthsDropdownContainer.setAttribute(
            "aria-label",
            w.l10n.monthAriaLabel
          ),
          P(w.monthsDropdownContainer, "change", function (e) {
            var n = g(e),
              t = parseInt(n.value, 10);
            w.changeMonth(t - w.currentMonth), De("onMonthChange");
          }),
          q(),
          (e = w.monthsDropdownContainer));
      var a = m("cur-year", { tabindex: "-1" }),
        i = a.getElementsByTagName("input")[0];
      i.setAttribute("aria-label", w.l10n.yearAriaLabel),
        w.config.minDate &&
          i.setAttribute("min", w.config.minDate.getFullYear().toString()),
        w.config.maxDate &&
          (i.setAttribute("max", w.config.maxDate.getFullYear().toString()),
          (i.disabled =
            !!w.config.minDate &&
            w.config.minDate.getFullYear() === w.config.maxDate.getFullYear()));
      var o = d("div", "flatpickr-current-month");
      return (
        o.appendChild(e),
        o.appendChild(a),
        t.appendChild(o),
        n.appendChild(t),
        { container: n, yearElement: i, monthElement: e }
      );
    }
    function V() {
      u(w.monthNav),
        w.monthNav.appendChild(w.prevMonthNav),
        w.config.showMonths && ((w.yearElements = []), (w.monthElements = []));
      for (var e = w.config.showMonths; e--; ) {
        var n = $();
        w.yearElements.push(n.yearElement),
          w.monthElements.push(n.monthElement),
          w.monthNav.appendChild(n.container);
      }
      w.monthNav.appendChild(w.nextMonthNav);
    }
    function z() {
      w.weekdayContainer
        ? u(w.weekdayContainer)
        : (w.weekdayContainer = d("div", "flatpickr-weekdays"));
      for (var e = w.config.showMonths; e--; ) {
        var n = d("div", "flatpickr-weekdaycontainer");
        w.weekdayContainer.appendChild(n);
      }
      return G(), w.weekdayContainer;
    }
    function G() {
      if (w.weekdayContainer) {
        var e = w.l10n.firstDayOfWeek,
          t = n(w.l10n.weekdays.shorthand);
        e > 0 && e < t.length && (t = n(t.splice(e, t.length), t.splice(0, e)));
        for (var a = w.config.showMonths; a--; )
          w.weekdayContainer.children[a].innerHTML =
            "\n      <span class='flatpickr-weekday'>\n        " +
            t.join("</span><span class='flatpickr-weekday'>") +
            "\n      </span>\n      ";
      }
    }
    function Z(e, n) {
      void 0 === n && (n = !0);
      var t = n ? e : e - w.currentMonth;
      (t < 0 && !0 === w._hidePrevMonthArrow) ||
        (t > 0 && !0 === w._hideNextMonthArrow) ||
        ((w.currentMonth += t),
        (w.currentMonth < 0 || w.currentMonth > 11) &&
          ((w.currentYear += w.currentMonth > 11 ? 1 : -1),
          (w.currentMonth = (w.currentMonth + 12) % 12),
          De("onYearChange"),
          q()),
        U(),
        De("onMonthChange"),
        Ce());
    }
    function Q(e) {
      return w.calendarContainer.contains(e);
    }
    function X(e) {
      if (w.isOpen && !w.config.inline) {
        var n = g(e),
          t = Q(n),
          a =
            !(
              n === w.input ||
              n === w.altInput ||
              w.element.contains(n) ||
              (e.path &&
                e.path.indexOf &&
                (~e.path.indexOf(w.input) || ~e.path.indexOf(w.altInput)))
            ) &&
            !t &&
            !Q(e.relatedTarget),
          i = !w.config.ignoredFocusElements.some(function (e) {
            return e.contains(n);
          });
        a &&
          i &&
          (w.config.allowInput &&
            w.setDate(
              w._input.value,
              !1,
              w.config.altInput ? w.config.altFormat : w.config.dateFormat
            ),
          void 0 !== w.timeContainer &&
            void 0 !== w.minuteElement &&
            void 0 !== w.hourElement &&
            "" !== w.input.value &&
            void 0 !== w.input.value &&
            _(),
          w.close(),
          w.config &&
            "range" === w.config.mode &&
            1 === w.selectedDates.length &&
            w.clear(!1));
      }
    }
    function ee(e) {
      if (
        !(
          !e ||
          (w.config.minDate && e < w.config.minDate.getFullYear()) ||
          (w.config.maxDate && e > w.config.maxDate.getFullYear())
        )
      ) {
        var n = e,
          t = w.currentYear !== n;
        (w.currentYear = n || w.currentYear),
          w.config.maxDate && w.currentYear === w.config.maxDate.getFullYear()
            ? (w.currentMonth = Math.min(
                w.config.maxDate.getMonth(),
                w.currentMonth
              ))
            : w.config.minDate &&
              w.currentYear === w.config.minDate.getFullYear() &&
              (w.currentMonth = Math.max(
                w.config.minDate.getMonth(),
                w.currentMonth
              )),
          t && (w.redraw(), De("onYearChange"), q());
      }
    }
    function ne(e, n) {
      var t;
      void 0 === n && (n = !0);
      var a = w.parseDate(e, void 0, n);
      if (
        (w.config.minDate &&
          a &&
          M(a, w.config.minDate, void 0 !== n ? n : !w.minDateHasTime) < 0) ||
        (w.config.maxDate &&
          a &&
          M(a, w.config.maxDate, void 0 !== n ? n : !w.maxDateHasTime) > 0)
      )
        return !1;
      if (!w.config.enable && 0 === w.config.disable.length) return !0;
      if (void 0 === a) return !1;
      for (
        var i = !!w.config.enable,
          o =
            null !== (t = w.config.enable) && void 0 !== t
              ? t
              : w.config.disable,
          r = 0,
          l = void 0;
        r < o.length;
        r++
      ) {
        if ("function" == typeof (l = o[r]) && l(a)) return i;
        if (l instanceof Date && void 0 !== a && l.getTime() === a.getTime())
          return i;
        if ("string" == typeof l) {
          var c = w.parseDate(l, void 0, !0);
          return c && c.getTime() === a.getTime() ? i : !i;
        }
        if (
          "object" == typeof l &&
          void 0 !== a &&
          l.from &&
          l.to &&
          a.getTime() >= l.from.getTime() &&
          a.getTime() <= l.to.getTime()
        )
          return i;
      }
      return !i;
    }
    function te(e) {
      return (
        void 0 !== w.daysContainer &&
        -1 === e.className.indexOf("hidden") &&
        -1 === e.className.indexOf("flatpickr-disabled") &&
        w.daysContainer.contains(e)
      );
    }
    function ae(e) {
      var n = e.target === w._input,
        t = w._input.value.trimEnd() !== Me();
      !n ||
        !t ||
        (e.relatedTarget && Q(e.relatedTarget)) ||
        w.setDate(
          w._input.value,
          !0,
          e.target === w.altInput ? w.config.altFormat : w.config.dateFormat
        );
    }
    function ie(e) {
      var n = g(e),
        t = w.config.wrap ? p.contains(n) : n === w._input,
        a = w.config.allowInput,
        i = w.isOpen && (!a || !t),
        o = w.config.inline && t && !a;
      if (13 === e.keyCode && t) {
        if (a)
          return (
            w.setDate(
              w._input.value,
              !0,
              n === w.altInput ? w.config.altFormat : w.config.dateFormat
            ),
            w.close(),
            n.blur()
          );
        w.open();
      } else if (Q(n) || i || o) {
        var r = !!w.timeContainer && w.timeContainer.contains(n);
        switch (e.keyCode) {
          case 13:
            r ? (e.preventDefault(), _(), fe()) : me(e);
            break;
          case 27:
            e.preventDefault(), fe();
            break;
          case 8:
          case 46:
            t && !w.config.allowInput && (e.preventDefault(), w.clear());
            break;
          case 37:
          case 39:
            if (r || t) w.hourElement && w.hourElement.focus();
            else {
              e.preventDefault();
              var l = k();
              if (void 0 !== w.daysContainer && (!1 === a || (l && te(l)))) {
                var c = 39 === e.keyCode ? 1 : -1;
                e.ctrlKey
                  ? (e.stopPropagation(), Z(c), J(B(1), 0))
                  : J(void 0, c);
              }
            }
            break;
          case 38:
          case 40:
            e.preventDefault();
            var s = 40 === e.keyCode ? 1 : -1;
            (w.daysContainer && void 0 !== n.$i) ||
            n === w.input ||
            n === w.altInput
              ? e.ctrlKey
                ? (e.stopPropagation(), ee(w.currentYear - s), J(B(1), 0))
                : r || J(void 0, 7 * s)
              : n === w.currentYearElement
              ? ee(w.currentYear - s)
              : w.config.enableTime &&
                (!r && w.hourElement && w.hourElement.focus(),
                _(e),
                w._debouncedChange());
            break;
          case 9:
            if (r) {
              var d = [w.hourElement, w.minuteElement, w.secondElement, w.amPM]
                  .concat(w.pluginElements)
                  .filter(function (e) {
                    return e;
                  }),
                u = d.indexOf(n);
              if (-1 !== u) {
                var f = d[u + (e.shiftKey ? -1 : 1)];
                e.preventDefault(), (f || w._input).focus();
              }
            } else
              !w.config.noCalendar &&
                w.daysContainer &&
                w.daysContainer.contains(n) &&
                e.shiftKey &&
                (e.preventDefault(), w._input.focus());
        }
      }
      if (void 0 !== w.amPM && n === w.amPM)
        switch (e.key) {
          case w.l10n.amPM[0].charAt(0):
          case w.l10n.amPM[0].charAt(0).toLowerCase():
            (w.amPM.textContent = w.l10n.amPM[0]), O(), ye();
            break;
          case w.l10n.amPM[1].charAt(0):
          case w.l10n.amPM[1].charAt(0).toLowerCase():
            (w.amPM.textContent = w.l10n.amPM[1]), O(), ye();
        }
      (t || Q(n)) && De("onKeyDown", e);
    }
    function oe(e, n) {
      if (
        (void 0 === n && (n = "flatpickr-day"),
        1 === w.selectedDates.length &&
          (!e ||
            (e.classList.contains(n) &&
              !e.classList.contains("flatpickr-disabled"))))
      ) {
        for (
          var t = e
              ? e.dateObj.getTime()
              : w.days.firstElementChild.dateObj.getTime(),
            a = w.parseDate(w.selectedDates[0], void 0, !0).getTime(),
            i = Math.min(t, w.selectedDates[0].getTime()),
            o = Math.max(t, w.selectedDates[0].getTime()),
            r = !1,
            l = 0,
            c = 0,
            s = i;
          s < o;
          s += x
        )
          ne(new Date(s), !0) ||
            ((r = r || (s > i && s < o)),
            s < a && (!l || s > l)
              ? (l = s)
              : s > a && (!c || s < c) && (c = s));
        Array.from(
          w.rContainer.querySelectorAll(
            "*:nth-child(-n+" + w.config.showMonths + ") > ." + n
          )
        ).forEach(function (n) {
          var i,
            o,
            s,
            d = n.dateObj.getTime(),
            u = (l > 0 && d < l) || (c > 0 && d > c);
          if (u)
            return (
              n.classList.add("notAllowed"),
              void ["inRange", "startRange", "endRange"].forEach(function (e) {
                n.classList.remove(e);
              })
            );
          (r && !u) ||
            (["startRange", "inRange", "endRange", "notAllowed"].forEach(
              function (e) {
                n.classList.remove(e);
              }
            ),
            void 0 !== e &&
              (e.classList.add(
                t <= w.selectedDates[0].getTime() ? "startRange" : "endRange"
              ),
              a < t && d === a
                ? n.classList.add("startRange")
                : a > t && d === a && n.classList.add("endRange"),
              d >= l &&
                (0 === c || d <= c) &&
                ((o = a),
                (s = t),
                (i = d) > Math.min(o, s) && i < Math.max(o, s)) &&
                n.classList.add("inRange")));
        });
      }
    }
    function re() {
      !w.isOpen || w.config.static || w.config.inline || de();
    }
    function le(e) {
      return function (n) {
        var t = (w.config["_" + e + "Date"] = w.parseDate(
            n,
            w.config.dateFormat
          )),
          a = w.config["_" + ("min" === e ? "max" : "min") + "Date"];
        void 0 !== t &&
          (w["min" === e ? "minDateHasTime" : "maxDateHasTime"] =
            t.getHours() > 0 || t.getMinutes() > 0 || t.getSeconds() > 0),
          w.selectedDates &&
            ((w.selectedDates = w.selectedDates.filter(function (e) {
              return ne(e);
            })),
            w.selectedDates.length || "min" !== e || F(t),
            ye()),
          w.daysContainer &&
            (ue(),
            void 0 !== t
              ? (w.currentYearElement[e] = t.getFullYear().toString())
              : w.currentYearElement.removeAttribute(e),
            (w.currentYearElement.disabled =
              !!a && void 0 !== t && a.getFullYear() === t.getFullYear()));
      };
    }
    function ce() {
      return w.config.wrap ? p.querySelector("[data-input]") : p;
    }
    function se() {
      "object" != typeof w.config.locale &&
        void 0 === I.l10ns[w.config.locale] &&
        w.config.errorHandler(
          new Error("flatpickr: invalid locale " + w.config.locale)
        ),
        (w.l10n = e(
          e({}, I.l10ns.default),
          "object" == typeof w.config.locale
            ? w.config.locale
            : "default" !== w.config.locale
            ? I.l10ns[w.config.locale]
            : void 0
        )),
        (D.D = "(" + w.l10n.weekdays.shorthand.join("|") + ")"),
        (D.l = "(" + w.l10n.weekdays.longhand.join("|") + ")"),
        (D.M = "(" + w.l10n.months.shorthand.join("|") + ")"),
        (D.F = "(" + w.l10n.months.longhand.join("|") + ")"),
        (D.K =
          "(" +
          w.l10n.amPM[0] +
          "|" +
          w.l10n.amPM[1] +
          "|" +
          w.l10n.amPM[0].toLowerCase() +
          "|" +
          w.l10n.amPM[1].toLowerCase() +
          ")"),
        void 0 ===
          e(e({}, v), JSON.parse(JSON.stringify(p.dataset || {}))).time_24hr &&
          void 0 === I.defaultConfig.time_24hr &&
          (w.config.time_24hr = w.l10n.time_24hr),
        (w.formatDate = b(w)),
        (w.parseDate = C({ config: w.config, l10n: w.l10n }));
    }
    function de(e) {
      if ("function" != typeof w.config.position) {
        if (void 0 !== w.calendarContainer) {
          De("onPreCalendarPosition");
          var n = e || w._positionElement,
            t = Array.prototype.reduce.call(
              w.calendarContainer.children,
              function (e, n) {
                return e + n.offsetHeight;
              },
              0
            ),
            a = w.calendarContainer.offsetWidth,
            i = w.config.position.split(" "),
            o = i[0],
            r = i.length > 1 ? i[1] : null,
            l = n.getBoundingClientRect(),
            c = window.innerHeight - l.bottom,
            d = "above" === o || ("below" !== o && c < t && l.top > t),
            u = window.pageYOffset + l.top + (d ? -t - 2 : n.offsetHeight + 2);
          if (
            (s(w.calendarContainer, "arrowTop", !d),
            s(w.calendarContainer, "arrowBottom", d),
            !w.config.inline)
          ) {
            var f = window.pageXOffset + l.left,
              m = !1,
              g = !1;
            "center" === r
              ? ((f -= (a - l.width) / 2), (m = !0))
              : "right" === r && ((f -= a - l.width), (g = !0)),
              s(w.calendarContainer, "arrowLeft", !m && !g),
              s(w.calendarContainer, "arrowCenter", m),
              s(w.calendarContainer, "arrowRight", g);
            var p =
                window.document.body.offsetWidth -
                (window.pageXOffset + l.right),
              h = f + a > window.document.body.offsetWidth,
              v = p + a > window.document.body.offsetWidth;
            if ((s(w.calendarContainer, "rightMost", h), !w.config.static))
              if (((w.calendarContainer.style.top = u + "px"), h))
                if (v) {
                  var D = (function () {
                    for (
                      var e = null, n = 0;
                      n < document.styleSheets.length;
                      n++
                    ) {
                      var t = document.styleSheets[n];
                      if (t.cssRules) {
                        try {
                          t.cssRules;
                        } catch (e) {
                          continue;
                        }
                        e = t;
                        break;
                      }
                    }
                    return null != e
                      ? e
                      : ((a = document.createElement("style")),
                        document.head.appendChild(a),
                        a.sheet);
                    var a;
                  })();
                  if (void 0 === D) return;
                  var b = window.document.body.offsetWidth,
                    C = Math.max(0, b / 2 - a / 2),
                    M = D.cssRules.length,
                    y = "{left:" + l.left + "px;right:auto;}";
                  s(w.calendarContainer, "rightMost", !1),
                    s(w.calendarContainer, "centerMost", !0),
                    D.insertRule(
                      ".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after" +
                        y,
                      M
                    ),
                    (w.calendarContainer.style.left = C + "px"),
                    (w.calendarContainer.style.right = "auto");
                } else
                  (w.calendarContainer.style.left = "auto"),
                    (w.calendarContainer.style.right = p + "px");
              else
                (w.calendarContainer.style.left = f + "px"),
                  (w.calendarContainer.style.right = "auto");
          }
        }
      } else w.config.position(w, e);
    }
    function ue() {
      w.config.noCalendar || w.isMobile || (q(), Ce(), U());
    }
    function fe() {
      w._input.focus(),
        -1 !== window.navigator.userAgent.indexOf("MSIE") ||
        void 0 !== navigator.msMaxTouchPoints
          ? setTimeout(w.close, 0)
          : w.close();
    }
    function me(e) {
      e.preventDefault(), e.stopPropagation();
      var n = f(g(e), function (e) {
        return (
          e.classList &&
          e.classList.contains("flatpickr-day") &&
          !e.classList.contains("flatpickr-disabled") &&
          !e.classList.contains("notAllowed")
        );
      });
      if (void 0 !== n) {
        var t = n,
          a = (w.latestSelectedDateObj = new Date(t.dateObj.getTime())),
          i =
            (a.getMonth() < w.currentMonth ||
              a.getMonth() > w.currentMonth + w.config.showMonths - 1) &&
            "range" !== w.config.mode;
        if (((w.selectedDateElem = t), "single" === w.config.mode))
          w.selectedDates = [a];
        else if ("multiple" === w.config.mode) {
          var o = be(a);
          o ? w.selectedDates.splice(parseInt(o), 1) : w.selectedDates.push(a);
        } else
          "range" === w.config.mode &&
            (2 === w.selectedDates.length && w.clear(!1, !1),
            (w.latestSelectedDateObj = a),
            w.selectedDates.push(a),
            0 !== M(a, w.selectedDates[0], !0) &&
              w.selectedDates.sort(function (e, n) {
                return e.getTime() - n.getTime();
              }));
        if ((O(), i)) {
          var r = w.currentYear !== a.getFullYear();
          (w.currentYear = a.getFullYear()),
            (w.currentMonth = a.getMonth()),
            r && (De("onYearChange"), q()),
            De("onMonthChange");
        }
        if (
          (Ce(),
          U(),
          ye(),
          i || "range" === w.config.mode || 1 !== w.config.showMonths
            ? void 0 !== w.selectedDateElem &&
              void 0 === w.hourElement &&
              w.selectedDateElem &&
              w.selectedDateElem.focus()
            : W(t),
          void 0 !== w.hourElement &&
            void 0 !== w.hourElement &&
            w.hourElement.focus(),
          w.config.closeOnSelect)
        ) {
          var l = "single" === w.config.mode && !w.config.enableTime,
            c =
              "range" === w.config.mode &&
              2 === w.selectedDates.length &&
              !w.config.enableTime;
          (l || c) && fe();
        }
        Y();
      }
    }
    (w.parseDate = C({ config: w.config, l10n: w.l10n })),
      (w._handlers = []),
      (w.pluginElements = []),
      (w.loadedPlugins = []),
      (w._bind = P),
      (w._setHoursFromDate = F),
      (w._positionCalendar = de),
      (w.changeMonth = Z),
      (w.changeYear = ee),
      (w.clear = function (e, n) {
        void 0 === e && (e = !0);
        void 0 === n && (n = !0);
        (w.input.value = ""), void 0 !== w.altInput && (w.altInput.value = "");
        void 0 !== w.mobileInput && (w.mobileInput.value = "");
        (w.selectedDates = []),
          (w.latestSelectedDateObj = void 0),
          !0 === n &&
            ((w.currentYear = w._initialDate.getFullYear()),
            (w.currentMonth = w._initialDate.getMonth()));
        if (!0 === w.config.enableTime) {
          var t = E(w.config),
            a = t.hours,
            i = t.minutes,
            o = t.seconds;
          A(a, i, o);
        }
        w.redraw(), e && De("onChange");
      }),
      (w.close = function () {
        (w.isOpen = !1),
          w.isMobile ||
            (void 0 !== w.calendarContainer &&
              w.calendarContainer.classList.remove("open"),
            void 0 !== w._input && w._input.classList.remove("active"));
        De("onClose");
      }),
      (w.onMouseOver = oe),
      (w._createElement = d),
      (w.createDay = R),
      (w.destroy = function () {
        void 0 !== w.config && De("onDestroy");
        for (var e = w._handlers.length; e--; ) w._handlers[e].remove();
        if (((w._handlers = []), w.mobileInput))
          w.mobileInput.parentNode &&
            w.mobileInput.parentNode.removeChild(w.mobileInput),
            (w.mobileInput = void 0);
        else if (w.calendarContainer && w.calendarContainer.parentNode)
          if (w.config.static && w.calendarContainer.parentNode) {
            var n = w.calendarContainer.parentNode;
            if ((n.lastChild && n.removeChild(n.lastChild), n.parentNode)) {
              for (; n.firstChild; ) n.parentNode.insertBefore(n.firstChild, n);
              n.parentNode.removeChild(n);
            }
          } else
            w.calendarContainer.parentNode.removeChild(w.calendarContainer);
        w.altInput &&
          ((w.input.type = "text"),
          w.altInput.parentNode &&
            w.altInput.parentNode.removeChild(w.altInput),
          delete w.altInput);
        w.input &&
          ((w.input.type = w.input._type),
          w.input.classList.remove("flatpickr-input"),
          w.input.removeAttribute("readonly"));
        [
          "_showTimeInput",
          "latestSelectedDateObj",
          "_hideNextMonthArrow",
          "_hidePrevMonthArrow",
          "__hideNextMonthArrow",
          "__hidePrevMonthArrow",
          "isMobile",
          "isOpen",
          "selectedDateElem",
          "minDateHasTime",
          "maxDateHasTime",
          "days",
          "daysContainer",
          "_input",
          "_positionElement",
          "innerContainer",
          "rContainer",
          "monthNav",
          "todayDateElem",
          "calendarContainer",
          "weekdayContainer",
          "prevMonthNav",
          "nextMonthNav",
          "monthsDropdownContainer",
          "currentMonthElement",
          "currentYearElement",
          "navigationCurrentMonth",
          "selectedDateElem",
          "config",
        ].forEach(function (e) {
          try {
            delete w[e];
          } catch (e) {}
        });
      }),
      (w.isEnabled = ne),
      (w.jumpToDate = j),
      (w.updateValue = ye),
      (w.open = function (e, n) {
        void 0 === n && (n = w._positionElement);
        if (!0 === w.isMobile) {
          if (e) {
            e.preventDefault();
            var t = g(e);
            t && t.blur();
          }
          return (
            void 0 !== w.mobileInput &&
              (w.mobileInput.focus(), w.mobileInput.click()),
            void De("onOpen")
          );
        }
        if (w._input.disabled || w.config.inline) return;
        var a = w.isOpen;
        (w.isOpen = !0),
          a ||
            (w.calendarContainer.classList.add("open"),
            w._input.classList.add("active"),
            De("onOpen"),
            de(n));
        !0 === w.config.enableTime &&
          !0 === w.config.noCalendar &&
          (!1 !== w.config.allowInput ||
            (void 0 !== e && w.timeContainer.contains(e.relatedTarget)) ||
            setTimeout(function () {
              return w.hourElement.select();
            }, 50));
      }),
      (w.redraw = ue),
      (w.set = function (e, n) {
        if (null !== e && "object" == typeof e)
          for (var a in (Object.assign(w.config, e), e))
            void 0 !== ge[a] &&
              ge[a].forEach(function (e) {
                return e();
              });
        else
          (w.config[e] = n),
            void 0 !== ge[e]
              ? ge[e].forEach(function (e) {
                  return e();
                })
              : t.indexOf(e) > -1 && (w.config[e] = c(n));
        w.redraw(), ye(!0);
      }),
      (w.setDate = function (e, n, t) {
        void 0 === n && (n = !1);
        void 0 === t && (t = w.config.dateFormat);
        if ((0 !== e && !e) || (e instanceof Array && 0 === e.length))
          return w.clear(n);
        pe(e, t),
          (w.latestSelectedDateObj =
            w.selectedDates[w.selectedDates.length - 1]),
          w.redraw(),
          j(void 0, n),
          F(),
          0 === w.selectedDates.length && w.clear(!1);
        ye(n), n && De("onChange");
      }),
      (w.toggle = function (e) {
        if (!0 === w.isOpen) return w.close();
        w.open(e);
      });
    var ge = {
      locale: [se, G],
      showMonths: [V, S, z],
      minDate: [j],
      maxDate: [j],
      positionElement: [ve],
      clickOpens: [
        function () {
          !0 === w.config.clickOpens
            ? (P(w._input, "focus", w.open), P(w._input, "click", w.open))
            : (w._input.removeEventListener("focus", w.open),
              w._input.removeEventListener("click", w.open));
        },
      ],
    };
    function pe(e, n) {
      var t = [];
      if (e instanceof Array)
        t = e.map(function (e) {
          return w.parseDate(e, n);
        });
      else if (e instanceof Date || "number" == typeof e)
        t = [w.parseDate(e, n)];
      else if ("string" == typeof e)
        switch (w.config.mode) {
          case "single":
          case "time":
            t = [w.parseDate(e, n)];
            break;
          case "multiple":
            t = e.split(w.config.conjunction).map(function (e) {
              return w.parseDate(e, n);
            });
            break;
          case "range":
            t = e.split(w.l10n.rangeSeparator).map(function (e) {
              return w.parseDate(e, n);
            });
        }
      else
        w.config.errorHandler(
          new Error("Invalid date supplied: " + JSON.stringify(e))
        );
      (w.selectedDates = w.config.allowInvalidPreload
        ? t
        : t.filter(function (e) {
            return e instanceof Date && ne(e, !1);
          })),
        "range" === w.config.mode &&
          w.selectedDates.sort(function (e, n) {
            return e.getTime() - n.getTime();
          });
    }
    function he(e) {
      return e
        .slice()
        .map(function (e) {
          return "string" == typeof e ||
            "number" == typeof e ||
            e instanceof Date
            ? w.parseDate(e, void 0, !0)
            : e && "object" == typeof e && e.from && e.to
            ? {
                from: w.parseDate(e.from, void 0),
                to: w.parseDate(e.to, void 0),
              }
            : e;
        })
        .filter(function (e) {
          return e;
        });
    }
    function ve() {
      w._positionElement = w.config.positionElement || w._input;
    }
    function De(e, n) {
      if (void 0 !== w.config) {
        var t = w.config[e];
        if (void 0 !== t && t.length > 0)
          for (var a = 0; t[a] && a < t.length; a++)
            t[a](w.selectedDates, w.input.value, w, n);
        "onChange" === e &&
          (w.input.dispatchEvent(we("change")),
          w.input.dispatchEvent(we("input")));
      }
    }
    function we(e) {
      var n = document.createEvent("Event");
      return n.initEvent(e, !0, !0), n;
    }
    function be(e) {
      for (var n = 0; n < w.selectedDates.length; n++) {
        var t = w.selectedDates[n];
        if (t instanceof Date && 0 === M(t, e)) return "" + n;
      }
      return !1;
    }
    function Ce() {
      w.config.noCalendar ||
        w.isMobile ||
        !w.monthNav ||
        (w.yearElements.forEach(function (e, n) {
          var t = new Date(w.currentYear, w.currentMonth, 1);
          t.setMonth(w.currentMonth + n),
            w.config.showMonths > 1 || "static" === w.config.monthSelectorType
              ? (w.monthElements[n].textContent =
                  h(t.getMonth(), w.config.shorthandCurrentMonth, w.l10n) + " ")
              : (w.monthsDropdownContainer.value = t.getMonth().toString()),
            (e.value = t.getFullYear().toString());
        }),
        (w._hidePrevMonthArrow =
          void 0 !== w.config.minDate &&
          (w.currentYear === w.config.minDate.getFullYear()
            ? w.currentMonth <= w.config.minDate.getMonth()
            : w.currentYear < w.config.minDate.getFullYear())),
        (w._hideNextMonthArrow =
          void 0 !== w.config.maxDate &&
          (w.currentYear === w.config.maxDate.getFullYear()
            ? w.currentMonth + 1 > w.config.maxDate.getMonth()
            : w.currentYear > w.config.maxDate.getFullYear())));
    }
    function Me(e) {
      var n =
        e || (w.config.altInput ? w.config.altFormat : w.config.dateFormat);
      return w.selectedDates
        .map(function (e) {
          return w.formatDate(e, n);
        })
        .filter(function (e, n, t) {
          return (
            "range" !== w.config.mode ||
            w.config.enableTime ||
            t.indexOf(e) === n
          );
        })
        .join(
          "range" !== w.config.mode
            ? w.config.conjunction
            : w.l10n.rangeSeparator
        );
    }
    function ye(e) {
      void 0 === e && (e = !0),
        void 0 !== w.mobileInput &&
          w.mobileFormatStr &&
          (w.mobileInput.value =
            void 0 !== w.latestSelectedDateObj
              ? w.formatDate(w.latestSelectedDateObj, w.mobileFormatStr)
              : ""),
        (w.input.value = Me(w.config.dateFormat)),
        void 0 !== w.altInput && (w.altInput.value = Me(w.config.altFormat)),
        !1 !== e && De("onValueUpdate");
    }
    function xe(e) {
      var n = g(e),
        t = w.prevMonthNav.contains(n),
        a = w.nextMonthNav.contains(n);
      t || a
        ? Z(t ? -1 : 1)
        : w.yearElements.indexOf(n) >= 0
        ? n.select()
        : n.classList.contains("arrowUp")
        ? w.changeYear(w.currentYear + 1)
        : n.classList.contains("arrowDown") && w.changeYear(w.currentYear - 1);
    }
    return (
      (function () {
        (w.element = w.input = p),
          (w.isOpen = !1),
          (function () {
            var n = [
                "wrap",
                "weekNumbers",
                "allowInput",
                "allowInvalidPreload",
                "clickOpens",
                "time_24hr",
                "enableTime",
                "noCalendar",
                "altInput",
                "shorthandCurrentMonth",
                "inline",
                "static",
                "enableSeconds",
                "disableMobile",
              ],
              i = e(e({}, JSON.parse(JSON.stringify(p.dataset || {}))), v),
              o = {};
            (w.config.parseDate = i.parseDate),
              (w.config.formatDate = i.formatDate),
              Object.defineProperty(w.config, "enable", {
                get: function () {
                  return w.config._enable;
                },
                set: function (e) {
                  w.config._enable = he(e);
                },
              }),
              Object.defineProperty(w.config, "disable", {
                get: function () {
                  return w.config._disable;
                },
                set: function (e) {
                  w.config._disable = he(e);
                },
              });
            var r = "time" === i.mode;
            if (!i.dateFormat && (i.enableTime || r)) {
              var l = I.defaultConfig.dateFormat || a.dateFormat;
              o.dateFormat =
                i.noCalendar || r
                  ? "H:i" + (i.enableSeconds ? ":S" : "")
                  : l + " H:i" + (i.enableSeconds ? ":S" : "");
            }
            if (i.altInput && (i.enableTime || r) && !i.altFormat) {
              var s = I.defaultConfig.altFormat || a.altFormat;
              o.altFormat =
                i.noCalendar || r
                  ? "h:i" + (i.enableSeconds ? ":S K" : " K")
                  : s + " h:i" + (i.enableSeconds ? ":S" : "") + " K";
            }
            Object.defineProperty(w.config, "minDate", {
              get: function () {
                return w.config._minDate;
              },
              set: le("min"),
            }),
              Object.defineProperty(w.config, "maxDate", {
                get: function () {
                  return w.config._maxDate;
                },
                set: le("max"),
              });
            var d = function (e) {
              return function (n) {
                w.config["min" === e ? "_minTime" : "_maxTime"] = w.parseDate(
                  n,
                  "H:i:S"
                );
              };
            };
            Object.defineProperty(w.config, "minTime", {
              get: function () {
                return w.config._minTime;
              },
              set: d("min"),
            }),
              Object.defineProperty(w.config, "maxTime", {
                get: function () {
                  return w.config._maxTime;
                },
                set: d("max"),
              }),
              "time" === i.mode &&
                ((w.config.noCalendar = !0), (w.config.enableTime = !0));
            Object.assign(w.config, o, i);
            for (var u = 0; u < n.length; u++)
              w.config[n[u]] =
                !0 === w.config[n[u]] || "true" === w.config[n[u]];
            t
              .filter(function (e) {
                return void 0 !== w.config[e];
              })
              .forEach(function (e) {
                w.config[e] = c(w.config[e] || []).map(T);
              }),
              (w.isMobile =
                !w.config.disableMobile &&
                !w.config.inline &&
                "single" === w.config.mode &&
                !w.config.disable.length &&
                !w.config.enable &&
                !w.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                ));
            for (u = 0; u < w.config.plugins.length; u++) {
              var f = w.config.plugins[u](w) || {};
              for (var m in f)
                t.indexOf(m) > -1
                  ? (w.config[m] = c(f[m]).map(T).concat(w.config[m]))
                  : void 0 === i[m] && (w.config[m] = f[m]);
            }
            i.altInputClass ||
              (w.config.altInputClass =
                ce().className + " " + w.config.altInputClass);
            De("onParseConfig");
          })(),
          se(),
          (function () {
            if (((w.input = ce()), !w.input))
              return void w.config.errorHandler(
                new Error("Invalid input element specified")
              );
            (w.input._type = w.input.type),
              (w.input.type = "text"),
              w.input.classList.add("flatpickr-input"),
              (w._input = w.input),
              w.config.altInput &&
                ((w.altInput = d(w.input.nodeName, w.config.altInputClass)),
                (w._input = w.altInput),
                (w.altInput.placeholder = w.input.placeholder),
                (w.altInput.disabled = w.input.disabled),
                (w.altInput.required = w.input.required),
                (w.altInput.tabIndex = w.input.tabIndex),
                (w.altInput.type = "text"),
                w.input.setAttribute("type", "hidden"),
                !w.config.static &&
                  w.input.parentNode &&
                  w.input.parentNode.insertBefore(
                    w.altInput,
                    w.input.nextSibling
                  ));
            w.config.allowInput ||
              w._input.setAttribute("readonly", "readonly");
            ve();
          })(),
          (function () {
            (w.selectedDates = []),
              (w.now = w.parseDate(w.config.now) || new Date());
            var e =
              w.config.defaultDate ||
              (("INPUT" !== w.input.nodeName &&
                "TEXTAREA" !== w.input.nodeName) ||
              !w.input.placeholder ||
              w.input.value !== w.input.placeholder
                ? w.input.value
                : null);
            e && pe(e, w.config.dateFormat);
            (w._initialDate =
              w.selectedDates.length > 0
                ? w.selectedDates[0]
                : w.config.minDate &&
                  w.config.minDate.getTime() > w.now.getTime()
                ? w.config.minDate
                : w.config.maxDate &&
                  w.config.maxDate.getTime() < w.now.getTime()
                ? w.config.maxDate
                : w.now),
              (w.currentYear = w._initialDate.getFullYear()),
              (w.currentMonth = w._initialDate.getMonth()),
              w.selectedDates.length > 0 &&
                (w.latestSelectedDateObj = w.selectedDates[0]);
            void 0 !== w.config.minTime &&
              (w.config.minTime = w.parseDate(w.config.minTime, "H:i"));
            void 0 !== w.config.maxTime &&
              (w.config.maxTime = w.parseDate(w.config.maxTime, "H:i"));
            (w.minDateHasTime =
              !!w.config.minDate &&
              (w.config.minDate.getHours() > 0 ||
                w.config.minDate.getMinutes() > 0 ||
                w.config.minDate.getSeconds() > 0)),
              (w.maxDateHasTime =
                !!w.config.maxDate &&
                (w.config.maxDate.getHours() > 0 ||
                  w.config.maxDate.getMinutes() > 0 ||
                  w.config.maxDate.getSeconds() > 0));
          })(),
          (w.utils = {
            getDaysInMonth: function (e, n) {
              return (
                void 0 === e && (e = w.currentMonth),
                void 0 === n && (n = w.currentYear),
                1 === e && ((n % 4 == 0 && n % 100 != 0) || n % 400 == 0)
                  ? 29
                  : w.l10n.daysInMonth[e]
              );
            },
          }),
          w.isMobile ||
            (function () {
              var e = window.document.createDocumentFragment();
              if (
                ((w.calendarContainer = d("div", "flatpickr-calendar")),
                (w.calendarContainer.tabIndex = -1),
                !w.config.noCalendar)
              ) {
                if (
                  (e.appendChild(
                    ((w.monthNav = d("div", "flatpickr-months")),
                    (w.yearElements = []),
                    (w.monthElements = []),
                    (w.prevMonthNav = d("span", "flatpickr-prev-month")),
                    (w.prevMonthNav.innerHTML = w.config.prevArrow),
                    (w.nextMonthNav = d("span", "flatpickr-next-month")),
                    (w.nextMonthNav.innerHTML = w.config.nextArrow),
                    V(),
                    Object.defineProperty(w, "_hidePrevMonthArrow", {
                      get: function () {
                        return w.__hidePrevMonthArrow;
                      },
                      set: function (e) {
                        w.__hidePrevMonthArrow !== e &&
                          (s(w.prevMonthNav, "flatpickr-disabled", e),
                          (w.__hidePrevMonthArrow = e));
                      },
                    }),
                    Object.defineProperty(w, "_hideNextMonthArrow", {
                      get: function () {
                        return w.__hideNextMonthArrow;
                      },
                      set: function (e) {
                        w.__hideNextMonthArrow !== e &&
                          (s(w.nextMonthNav, "flatpickr-disabled", e),
                          (w.__hideNextMonthArrow = e));
                      },
                    }),
                    (w.currentYearElement = w.yearElements[0]),
                    Ce(),
                    w.monthNav)
                  ),
                  (w.innerContainer = d("div", "flatpickr-innerContainer")),
                  w.config.weekNumbers)
                ) {
                  var n = (function () {
                      w.calendarContainer.classList.add("hasWeeks");
                      var e = d("div", "flatpickr-weekwrapper");
                      e.appendChild(
                        d("span", "flatpickr-weekday", w.l10n.weekAbbreviation)
                      );
                      var n = d("div", "flatpickr-weeks");
                      return (
                        e.appendChild(n), { weekWrapper: e, weekNumbers: n }
                      );
                    })(),
                    t = n.weekWrapper,
                    a = n.weekNumbers;
                  w.innerContainer.appendChild(t),
                    (w.weekNumbers = a),
                    (w.weekWrapper = t);
                }
                (w.rContainer = d("div", "flatpickr-rContainer")),
                  w.rContainer.appendChild(z()),
                  w.daysContainer ||
                    ((w.daysContainer = d("div", "flatpickr-days")),
                    (w.daysContainer.tabIndex = -1)),
                  U(),
                  w.rContainer.appendChild(w.daysContainer),
                  w.innerContainer.appendChild(w.rContainer),
                  e.appendChild(w.innerContainer);
              }
              w.config.enableTime &&
                e.appendChild(
                  (function () {
                    w.calendarContainer.classList.add("hasTime"),
                      w.config.noCalendar &&
                        w.calendarContainer.classList.add("noCalendar");
                    var e = E(w.config);
                    (w.timeContainer = d("div", "flatpickr-time")),
                      (w.timeContainer.tabIndex = -1);
                    var n = d("span", "flatpickr-time-separator", ":"),
                      t = m("flatpickr-hour", {
                        "aria-label": w.l10n.hourAriaLabel,
                      });
                    w.hourElement = t.getElementsByTagName("input")[0];
                    var a = m("flatpickr-minute", {
                      "aria-label": w.l10n.minuteAriaLabel,
                    });
                    (w.minuteElement = a.getElementsByTagName("input")[0]),
                      (w.hourElement.tabIndex = w.minuteElement.tabIndex = -1),
                      (w.hourElement.value = o(
                        w.latestSelectedDateObj
                          ? w.latestSelectedDateObj.getHours()
                          : w.config.time_24hr
                          ? e.hours
                          : (function (e) {
                              switch (e % 24) {
                                case 0:
                                case 12:
                                  return 12;
                                default:
                                  return e % 12;
                              }
                            })(e.hours)
                      )),
                      (w.minuteElement.value = o(
                        w.latestSelectedDateObj
                          ? w.latestSelectedDateObj.getMinutes()
                          : e.minutes
                      )),
                      w.hourElement.setAttribute(
                        "step",
                        w.config.hourIncrement.toString()
                      ),
                      w.minuteElement.setAttribute(
                        "step",
                        w.config.minuteIncrement.toString()
                      ),
                      w.hourElement.setAttribute(
                        "min",
                        w.config.time_24hr ? "0" : "1"
                      ),
                      w.hourElement.setAttribute(
                        "max",
                        w.config.time_24hr ? "23" : "12"
                      ),
                      w.hourElement.setAttribute("maxlength", "2"),
                      w.minuteElement.setAttribute("min", "0"),
                      w.minuteElement.setAttribute("max", "59"),
                      w.minuteElement.setAttribute("maxlength", "2"),
                      w.timeContainer.appendChild(t),
                      w.timeContainer.appendChild(n),
                      w.timeContainer.appendChild(a),
                      w.config.time_24hr &&
                        w.timeContainer.classList.add("time24hr");
                    if (w.config.enableSeconds) {
                      w.timeContainer.classList.add("hasSeconds");
                      var i = m("flatpickr-second");
                      (w.secondElement = i.getElementsByTagName("input")[0]),
                        (w.secondElement.value = o(
                          w.latestSelectedDateObj
                            ? w.latestSelectedDateObj.getSeconds()
                            : e.seconds
                        )),
                        w.secondElement.setAttribute(
                          "step",
                          w.minuteElement.getAttribute("step")
                        ),
                        w.secondElement.setAttribute("min", "0"),
                        w.secondElement.setAttribute("max", "59"),
                        w.secondElement.setAttribute("maxlength", "2"),
                        w.timeContainer.appendChild(
                          d("span", "flatpickr-time-separator", ":")
                        ),
                        w.timeContainer.appendChild(i);
                    }
                    w.config.time_24hr ||
                      ((w.amPM = d(
                        "span",
                        "flatpickr-am-pm",
                        w.l10n.amPM[
                          r(
                            (w.latestSelectedDateObj
                              ? w.hourElement.value
                              : w.config.defaultHour) > 11
                          )
                        ]
                      )),
                      (w.amPM.title = w.l10n.toggleTitle),
                      (w.amPM.tabIndex = -1),
                      w.timeContainer.appendChild(w.amPM));
                    return w.timeContainer;
                  })()
                );
              s(w.calendarContainer, "rangeMode", "range" === w.config.mode),
                s(w.calendarContainer, "animate", !0 === w.config.animate),
                s(w.calendarContainer, "multiMonth", w.config.showMonths > 1),
                w.calendarContainer.appendChild(e);
              var i =
                void 0 !== w.config.appendTo &&
                void 0 !== w.config.appendTo.nodeType;
              if (
                (w.config.inline || w.config.static) &&
                (w.calendarContainer.classList.add(
                  w.config.inline ? "inline" : "static"
                ),
                w.config.inline &&
                  (!i && w.element.parentNode
                    ? w.element.parentNode.insertBefore(
                        w.calendarContainer,
                        w._input.nextSibling
                      )
                    : void 0 !== w.config.appendTo &&
                      w.config.appendTo.appendChild(w.calendarContainer)),
                w.config.static)
              ) {
                var l = d("div", "flatpickr-wrapper");
                w.element.parentNode &&
                  w.element.parentNode.insertBefore(l, w.element),
                  l.appendChild(w.element),
                  w.altInput && l.appendChild(w.altInput),
                  l.appendChild(w.calendarContainer);
              }
              w.config.static ||
                w.config.inline ||
                (void 0 !== w.config.appendTo
                  ? w.config.appendTo
                  : window.document.body
                ).appendChild(w.calendarContainer);
            })(),
          (function () {
            w.config.wrap &&
              ["open", "close", "toggle", "clear"].forEach(function (e) {
                Array.prototype.forEach.call(
                  w.element.querySelectorAll("[data-" + e + "]"),
                  function (n) {
                    return P(n, "click", w[e]);
                  }
                );
              });
            if (w.isMobile)
              return void (function () {
                var e = w.config.enableTime
                  ? w.config.noCalendar
                    ? "time"
                    : "datetime-local"
                  : "date";
                (w.mobileInput = d(
                  "input",
                  w.input.className + " flatpickr-mobile"
                )),
                  (w.mobileInput.tabIndex = 1),
                  (w.mobileInput.type = e),
                  (w.mobileInput.disabled = w.input.disabled),
                  (w.mobileInput.required = w.input.required),
                  (w.mobileInput.placeholder = w.input.placeholder),
                  (w.mobileFormatStr =
                    "datetime-local" === e
                      ? "Y-m-d\\TH:i:S"
                      : "date" === e
                      ? "Y-m-d"
                      : "H:i:S"),
                  w.selectedDates.length > 0 &&
                    (w.mobileInput.defaultValue = w.mobileInput.value =
                      w.formatDate(w.selectedDates[0], w.mobileFormatStr));
                w.config.minDate &&
                  (w.mobileInput.min = w.formatDate(w.config.minDate, "Y-m-d"));
                w.config.maxDate &&
                  (w.mobileInput.max = w.formatDate(w.config.maxDate, "Y-m-d"));
                w.input.getAttribute("step") &&
                  (w.mobileInput.step = String(w.input.getAttribute("step")));
                (w.input.type = "hidden"),
                  void 0 !== w.altInput && (w.altInput.type = "hidden");
                try {
                  w.input.parentNode &&
                    w.input.parentNode.insertBefore(
                      w.mobileInput,
                      w.input.nextSibling
                    );
                } catch (e) {}
                P(w.mobileInput, "change", function (e) {
                  w.setDate(g(e).value, !1, w.mobileFormatStr),
                    De("onChange"),
                    De("onClose");
                });
              })();
            var e = l(re, 50);
            (w._debouncedChange = l(Y, 300)),
              w.daysContainer &&
                !/iPhone|iPad|iPod/i.test(navigator.userAgent) &&
                P(w.daysContainer, "mouseover", function (e) {
                  "range" === w.config.mode && oe(g(e));
                });
            P(w._input, "keydown", ie),
              void 0 !== w.calendarContainer &&
                P(w.calendarContainer, "keydown", ie);
            w.config.inline || w.config.static || P(window, "resize", e);
            void 0 !== window.ontouchstart
              ? P(window.document, "touchstart", X)
              : P(window.document, "mousedown", X);
            P(window.document, "focus", X, { capture: !0 }),
              !0 === w.config.clickOpens &&
                (P(w._input, "focus", w.open), P(w._input, "click", w.open));
            void 0 !== w.daysContainer &&
              (P(w.monthNav, "click", xe),
              P(w.monthNav, ["keyup", "increment"], N),
              P(w.daysContainer, "click", me));
            if (
              void 0 !== w.timeContainer &&
              void 0 !== w.minuteElement &&
              void 0 !== w.hourElement
            ) {
              var n = function (e) {
                return g(e).select();
              };
              P(w.timeContainer, ["increment"], _),
                P(w.timeContainer, "blur", _, { capture: !0 }),
                P(w.timeContainer, "click", H),
                P([w.hourElement, w.minuteElement], ["focus", "click"], n),
                void 0 !== w.secondElement &&
                  P(w.secondElement, "focus", function () {
                    return w.secondElement && w.secondElement.select();
                  }),
                void 0 !== w.amPM &&
                  P(w.amPM, "click", function (e) {
                    _(e);
                  });
            }
            w.config.allowInput && P(w._input, "blur", ae);
          })(),
          (w.selectedDates.length || w.config.noCalendar) &&
            (w.config.enableTime &&
              F(w.config.noCalendar ? w.latestSelectedDateObj : void 0),
            ye(!1)),
          S();
        var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        !w.isMobile && n && de(), De("onReady");
      })(),
      w
    );
  }
  function T(e, n) {
    for (
      var t = Array.prototype.slice.call(e).filter(function (e) {
          return e instanceof HTMLElement;
        }),
        a = [],
        i = 0;
      i < t.length;
      i++
    ) {
      var o = t[i];
      try {
        if (null !== o.getAttribute("data-fp-omit")) continue;
        void 0 !== o._flatpickr &&
          (o._flatpickr.destroy(), (o._flatpickr = void 0)),
          (o._flatpickr = k(o, n || {})),
          a.push(o._flatpickr);
      } catch (e) {
        console.error(e);
      }
    }
    return 1 === a.length ? a[0] : a;
  }
  "undefined" != typeof HTMLElement &&
    "undefined" != typeof HTMLCollection &&
    "undefined" != typeof NodeList &&
    ((HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr =
      function (e) {
        return T(this, e);
      }),
    (HTMLElement.prototype.flatpickr = function (e) {
      return T([this], e);
    }));
  var I = function (e, n) {
    return "string" == typeof e
      ? T(window.document.querySelectorAll(e), n)
      : e instanceof Node
      ? T([e], n)
      : T(e, n);
  };
  return (
    (I.defaultConfig = {}),
    (I.l10ns = { en: e({}, i), default: e({}, i) }),
    (I.localize = function (n) {
      I.l10ns.default = e(e({}, I.l10ns.default), n);
    }),
    (I.setDefaults = function (n) {
      I.defaultConfig = e(e({}, I.defaultConfig), n);
    }),
    (I.parseDate = C({})),
    (I.formatDate = b({})),
    (I.compareDates = M),
    "undefined" != typeof jQuery &&
      void 0 !== jQuery.fn &&
      (jQuery.fn.flatpickr = function (e) {
        return T(this, e);
      }),
    (Date.prototype.fp_incr = function (e) {
      return new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate() + ("string" == typeof e ? parseInt(e, 10) : e)
      );
    }),
    "undefined" != typeof window && (window.flatpickr = I),
    I
  );
});

// select-2::
/*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function (n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], n)
    : "object" == typeof module && module.exports
    ? (module.exports = function (e, t) {
        return (
          void 0 === t &&
            (t =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(e)),
          n(t),
          t
        );
      })
    : n(jQuery);
})(function (t) {
  var e,
    n,
    s,
    p,
    r,
    o,
    h,
    f,
    g,
    m,
    y,
    v,
    i,
    a,
    _,
    s =
      (((u =
        t && t.fn && t.fn.select2 && t.fn.select2.amd ? t.fn.select2.amd : u) &&
        u.requirejs) ||
        (u ? (n = u) : (u = {}),
        (g = {}),
        (m = {}),
        (y = {}),
        (v = {}),
        (i = Object.prototype.hasOwnProperty),
        (a = [].slice),
        (_ = /\.js$/),
        (h = function (e, t) {
          var n,
            s,
            i = c(e),
            r = i[0],
            t = t[1];
          return (
            (e = i[1]),
            r && (n = x((r = l(r, t)))),
            r
              ? (e =
                  n && n.normalize
                    ? n.normalize(
                        e,
                        ((s = t),
                        function (e) {
                          return l(e, s);
                        })
                      )
                    : l(e, t))
              : ((r = (i = c((e = l(e, t))))[0]), (e = i[1]), r && (n = x(r))),
            { f: r ? r + "!" + e : e, n: e, pr: r, p: n }
          );
        }),
        (f = {
          require: function (e) {
            return w(e);
          },
          exports: function (e) {
            var t = g[e];
            return void 0 !== t ? t : (g[e] = {});
          },
          module: function (e) {
            return {
              id: e,
              uri: "",
              exports: g[e],
              config:
                ((t = e),
                function () {
                  return (y && y.config && y.config[t]) || {};
                }),
            };
            var t;
          },
        }),
        (r = function (e, t, n, s) {
          var i,
            r,
            o,
            a,
            l,
            c = [],
            u = typeof n,
            d = A((s = s || e));
          if ("undefined" == u || "function" == u) {
            for (
              t = !t.length && n.length ? ["require", "exports", "module"] : t,
                a = 0;
              a < t.length;
              a += 1
            )
              if ("require" === (r = (o = h(t[a], d)).f)) c[a] = f.require(e);
              else if ("exports" === r) (c[a] = f.exports(e)), (l = !0);
              else if ("module" === r) i = c[a] = f.module(e);
              else if (b(g, r) || b(m, r) || b(v, r)) c[a] = x(r);
              else {
                if (!o.p) throw new Error(e + " missing " + r);
                o.p.load(
                  o.n,
                  w(s, !0),
                  (function (t) {
                    return function (e) {
                      g[t] = e;
                    };
                  })(r),
                  {}
                ),
                  (c[a] = g[r]);
              }
            (u = n ? n.apply(g[e], c) : void 0),
              e &&
                (i && i.exports !== p && i.exports !== g[e]
                  ? (g[e] = i.exports)
                  : (u === p && l) || (g[e] = u));
          } else e && (g[e] = n);
        }),
        (e =
          n =
          o =
            function (e, t, n, s, i) {
              if ("string" == typeof e) return f[e] ? f[e](t) : x(h(e, A(t)).f);
              if (!e.splice) {
                if (((y = e).deps && o(y.deps, y.callback), !t)) return;
                t.splice ? ((e = t), (t = n), (n = null)) : (e = p);
              }
              return (
                (t = t || function () {}),
                "function" == typeof n && ((n = s), (s = i)),
                s
                  ? r(p, e, t, n)
                  : setTimeout(function () {
                      r(p, e, t, n);
                    }, 4),
                o
              );
            }),
        (o.config = function (e) {
          return o(e);
        }),
        (e._defined = g),
        ((s = function (e, t, n) {
          if ("string" != typeof e)
            throw new Error(
              "See almond README: incorrect module build, no module name"
            );
          t.splice || ((n = t), (t = [])),
            b(g, e) || b(m, e) || (m[e] = [e, t, n]);
        }).amd = { jQuery: !0 }),
        (u.requirejs = e),
        (u.require = n),
        (u.define = s)),
      u.define("almond", function () {}),
      u.define("jquery", [], function () {
        var e = t || $;
        return (
          null == e &&
            console &&
            console.error &&
            console.error(
              "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
            ),
          e
        );
      }),
      u.define("select2/utils", ["jquery"], function (r) {
        var s = {};
        function c(e) {
          var t,
            n = e.prototype,
            s = [];
          for (t in n)
            "function" == typeof n[t] && "constructor" !== t && s.push(t);
          return s;
        }
        (s.Extend = function (e, t) {
          var n,
            s = {}.hasOwnProperty;
          function i() {
            this.constructor = e;
          }
          for (n in t) s.call(t, n) && (e[n] = t[n]);
          return (
            (i.prototype = t.prototype),
            (e.prototype = new i()),
            (e.__super__ = t.prototype),
            e
          );
        }),
          (s.Decorate = function (s, i) {
            var e = c(i),
              t = c(s);
            function r() {
              var e = Array.prototype.unshift,
                t = i.prototype.constructor.length,
                n = s.prototype.constructor;
              0 < t &&
                (e.call(arguments, s.prototype.constructor),
                (n = i.prototype.constructor)),
                n.apply(this, arguments);
            }
            (i.displayName = s.displayName),
              (r.prototype = new (function () {
                this.constructor = r;
              })());
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              r.prototype[o] = s.prototype[o];
            }
            for (var a = 0; a < e.length; a++) {
              var l = e[a];
              r.prototype[l] = (function (e) {
                var t = function () {};
                e in r.prototype && (t = r.prototype[e]);
                var n = i.prototype[e];
                return function () {
                  return (
                    Array.prototype.unshift.call(arguments, t),
                    n.apply(this, arguments)
                  );
                };
              })(l);
            }
            return r;
          });
        function e() {
          this.listeners = {};
        }
        (e.prototype.on = function (e, t) {
          (this.listeners = this.listeners || {}),
            e in this.listeners
              ? this.listeners[e].push(t)
              : (this.listeners[e] = [t]);
        }),
          (e.prototype.trigger = function (e) {
            var t = Array.prototype.slice,
              n = t.call(arguments, 1);
            (this.listeners = this.listeners || {}),
              0 === (n = null == n ? [] : n).length && n.push({}),
              (n[0]._type = e) in this.listeners &&
                this.invoke(this.listeners[e], t.call(arguments, 1)),
              "*" in this.listeners &&
                this.invoke(this.listeners["*"], arguments);
          }),
          (e.prototype.invoke = function (e, t) {
            for (var n = 0, s = e.length; n < s; n++) e[n].apply(this, t);
          }),
          (s.Observable = e),
          (s.generateChars = function (e) {
            for (var t = "", n = 0; n < e; n++)
              t += Math.floor(36 * Math.random()).toString(36);
            return t;
          }),
          (s.bind = function (e, t) {
            return function () {
              e.apply(t, arguments);
            };
          }),
          (s._convertData = function (e) {
            for (var t in e) {
              var n = t.split("-"),
                s = e;
              if (1 !== n.length) {
                for (var i = 0; i < n.length; i++) {
                  var r = n[i];
                  (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in s ||
                    (s[r] = {}),
                    i == n.length - 1 && (s[r] = e[t]),
                    (s = s[r]);
                }
                delete e[t];
              }
            }
            return e;
          }),
          (s.hasScroll = function (e, t) {
            var n = r(t),
              s = t.style.overflowX,
              i = t.style.overflowY;
            return (
              (s !== i || ("hidden" !== i && "visible" !== i)) &&
              ("scroll" === s ||
                "scroll" === i ||
                n.innerHeight() < t.scrollHeight ||
                n.innerWidth() < t.scrollWidth)
            );
          }),
          (s.escapeMarkup = function (e) {
            var t = {
              "\\": "&#92;",
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
              "/": "&#47;",
            };
            return "string" != typeof e
              ? e
              : String(e).replace(/[&<>"'\/\\]/g, function (e) {
                  return t[e];
                });
          }),
          (s.__cache = {});
        var n = 0;
        return (
          (s.GetUniqueElementId = function (e) {
            var t = e.getAttribute("data-select2-id");
            return (
              null != t ||
                ((t = e.id
                  ? "select2-data-" + e.id
                  : "select2-data-" +
                    (++n).toString() +
                    "-" +
                    s.generateChars(4)),
                e.setAttribute("data-select2-id", t)),
              t
            );
          }),
          (s.StoreData = function (e, t, n) {
            e = s.GetUniqueElementId(e);
            s.__cache[e] || (s.__cache[e] = {}), (s.__cache[e][t] = n);
          }),
          (s.GetData = function (e, t) {
            var n = s.GetUniqueElementId(e);
            return t
              ? s.__cache[n] && null != s.__cache[n][t]
                ? s.__cache[n][t]
                : r(e).data(t)
              : s.__cache[n];
          }),
          (s.RemoveData = function (e) {
            var t = s.GetUniqueElementId(e);
            null != s.__cache[t] && delete s.__cache[t],
              e.removeAttribute("data-select2-id");
          }),
          (s.copyNonInternalCssClasses = function (e, t) {
            var n = (n = e.getAttribute("class").trim().split(/\s+/)).filter(
                function (e) {
                  return 0 === e.indexOf("select2-");
                }
              ),
              t = (t = t.getAttribute("class").trim().split(/\s+/)).filter(
                function (e) {
                  return 0 !== e.indexOf("select2-");
                }
              ),
              t = n.concat(t);
            e.setAttribute("class", t.join(" "));
          }),
          s
        );
      }),
      u.define("select2/results", ["jquery", "./utils"], function (d, p) {
        function s(e, t, n) {
          (this.$element = e),
            (this.data = n),
            (this.options = t),
            s.__super__.constructor.call(this);
        }
        return (
          p.Extend(s, p.Observable),
          (s.prototype.render = function () {
            var e = d(
              '<ul class="select2-results__options" role="listbox"></ul>'
            );
            return (
              this.options.get("multiple") &&
                e.attr("aria-multiselectable", "true"),
              (this.$results = e)
            );
          }),
          (s.prototype.clear = function () {
            this.$results.empty();
          }),
          (s.prototype.displayMessage = function (e) {
            var t = this.options.get("escapeMarkup");
            this.clear(), this.hideLoading();
            var n = d(
                '<li role="alert" aria-live="assertive" class="select2-results__option"></li>'
              ),
              s = this.options.get("translations").get(e.message);
            n.append(t(s(e.args))),
              (n[0].className += " select2-results__message"),
              this.$results.append(n);
          }),
          (s.prototype.hideMessages = function () {
            this.$results.find(".select2-results__message").remove();
          }),
          (s.prototype.append = function (e) {
            this.hideLoading();
            var t = [];
            if (null != e.results && 0 !== e.results.length) {
              e.results = this.sort(e.results);
              for (var n = 0; n < e.results.length; n++) {
                var s = e.results[n],
                  s = this.option(s);
                t.push(s);
              }
              this.$results.append(t);
            } else
              0 === this.$results.children().length &&
                this.trigger("results:message", { message: "noResults" });
          }),
          (s.prototype.position = function (e, t) {
            t.find(".select2-results").append(e);
          }),
          (s.prototype.sort = function (e) {
            return this.options.get("sorter")(e);
          }),
          (s.prototype.highlightFirstItem = function () {
            var e = this.$results.find(".select2-results__option--selectable"),
              t = e.filter(".select2-results__option--selected");
            (0 < t.length ? t : e).first().trigger("mouseenter"),
              this.ensureHighlightVisible();
          }),
          (s.prototype.setClasses = function () {
            var t = this;
            this.data.current(function (e) {
              var s = e.map(function (e) {
                return e.id.toString();
              });
              t.$results
                .find(".select2-results__option--selectable")
                .each(function () {
                  var e = d(this),
                    t = p.GetData(this, "data"),
                    n = "" + t.id;
                  (null != t.element && t.element.selected) ||
                  (null == t.element && -1 < s.indexOf(n))
                    ? (this.classList.add("select2-results__option--selected"),
                      e.attr("aria-selected", "true"))
                    : (this.classList.remove(
                        "select2-results__option--selected"
                      ),
                      e.attr("aria-selected", "false"));
                });
            });
          }),
          (s.prototype.showLoading = function (e) {
            this.hideLoading();
            (e = {
              disabled: !0,
              loading: !0,
              text: this.options.get("translations").get("searching")(e),
            }),
              (e = this.option(e));
            (e.className += " loading-results"), this.$results.prepend(e);
          }),
          (s.prototype.hideLoading = function () {
            this.$results.find(".loading-results").remove();
          }),
          (s.prototype.option = function (e) {
            var t = document.createElement("li");
            t.classList.add("select2-results__option"),
              t.classList.add("select2-results__option--selectable");
            var n,
              s = { role: "option" },
              i =
                window.Element.prototype.matches ||
                window.Element.prototype.msMatchesSelector ||
                window.Element.prototype.webkitMatchesSelector;
            for (n in (((null != e.element && i.call(e.element, ":disabled")) ||
              (null == e.element && e.disabled)) &&
              ((s["aria-disabled"] = "true"),
              t.classList.remove("select2-results__option--selectable"),
              t.classList.add("select2-results__option--disabled")),
            null == e.id &&
              t.classList.remove("select2-results__option--selectable"),
            null != e._resultId && (t.id = e._resultId),
            e.title && (t.title = e.title),
            e.children &&
              ((s.role = "group"),
              (s["aria-label"] = e.text),
              t.classList.remove("select2-results__option--selectable"),
              t.classList.add("select2-results__option--group")),
            s)) {
              var r = s[n];
              t.setAttribute(n, r);
            }
            if (e.children) {
              var o = d(t),
                a = document.createElement("strong");
              (a.className = "select2-results__group"), this.template(e, a);
              for (var l = [], c = 0; c < e.children.length; c++) {
                var u = e.children[c],
                  u = this.option(u);
                l.push(u);
              }
              i = d("<ul></ul>", {
                class:
                  "select2-results__options select2-results__options--nested",
                role: "none",
              });
              i.append(l), o.append(a), o.append(i);
            } else this.template(e, t);
            return p.StoreData(t, "data", e), t;
          }),
          (s.prototype.bind = function (t, e) {
            var i = this,
              n = t.id + "-results";
            this.$results.attr("id", n),
              t.on("results:all", function (e) {
                i.clear(),
                  i.append(e.data),
                  t.isOpen() && (i.setClasses(), i.highlightFirstItem());
              }),
              t.on("results:append", function (e) {
                i.append(e.data), t.isOpen() && i.setClasses();
              }),
              t.on("query", function (e) {
                i.hideMessages(), i.showLoading(e);
              }),
              t.on("select", function () {
                t.isOpen() &&
                  (i.setClasses(),
                  i.options.get("scrollAfterSelect") && i.highlightFirstItem());
              }),
              t.on("unselect", function () {
                t.isOpen() &&
                  (i.setClasses(),
                  i.options.get("scrollAfterSelect") && i.highlightFirstItem());
              }),
              t.on("open", function () {
                i.$results.attr("aria-expanded", "true"),
                  i.$results.attr("aria-hidden", "false"),
                  i.setClasses(),
                  i.ensureHighlightVisible();
              }),
              t.on("close", function () {
                i.$results.attr("aria-expanded", "false"),
                  i.$results.attr("aria-hidden", "true"),
                  i.$results.removeAttr("aria-activedescendant");
              }),
              t.on("results:toggle", function () {
                var e = i.getHighlightedResults();
                0 !== e.length && e.trigger("mouseup");
              }),
              t.on("results:select", function () {
                var e,
                  t = i.getHighlightedResults();
                0 !== t.length &&
                  ((e = p.GetData(t[0], "data")),
                  t.hasClass("select2-results__option--selected")
                    ? i.trigger("close", {})
                    : i.trigger("select", { data: e }));
              }),
              t.on("results:previous", function () {
                var e,
                  t = i.getHighlightedResults(),
                  n = i.$results.find(".select2-results__option--selectable"),
                  s = n.index(t);
                s <= 0 ||
                  ((e = s - 1),
                  0 === t.length && (e = 0),
                  (s = n.eq(e)).trigger("mouseenter"),
                  (t = i.$results.offset().top),
                  (n = s.offset().top),
                  (s = i.$results.scrollTop() + (n - t)),
                  0 === e
                    ? i.$results.scrollTop(0)
                    : n - t < 0 && i.$results.scrollTop(s));
              }),
              t.on("results:next", function () {
                var e,
                  t = i.getHighlightedResults(),
                  n = i.$results.find(".select2-results__option--selectable"),
                  s = n.index(t) + 1;
                s >= n.length ||
                  ((e = n.eq(s)).trigger("mouseenter"),
                  (t = i.$results.offset().top + i.$results.outerHeight(!1)),
                  (n = e.offset().top + e.outerHeight(!1)),
                  (e = i.$results.scrollTop() + n - t),
                  0 === s
                    ? i.$results.scrollTop(0)
                    : t < n && i.$results.scrollTop(e));
              }),
              t.on("results:focus", function (e) {
                e.element[0].classList.add(
                  "select2-results__option--highlighted"
                ),
                  e.element[0].setAttribute("aria-selected", "true");
              }),
              t.on("results:message", function (e) {
                i.displayMessage(e);
              }),
              d.fn.mousewheel &&
                this.$results.on("mousewheel", function (e) {
                  var t = i.$results.scrollTop(),
                    n = i.$results.get(0).scrollHeight - t + e.deltaY,
                    t = 0 < e.deltaY && t - e.deltaY <= 0,
                    n = e.deltaY < 0 && n <= i.$results.height();
                  t
                    ? (i.$results.scrollTop(0),
                      e.preventDefault(),
                      e.stopPropagation())
                    : n &&
                      (i.$results.scrollTop(
                        i.$results.get(0).scrollHeight - i.$results.height()
                      ),
                      e.preventDefault(),
                      e.stopPropagation());
                }),
              this.$results.on(
                "mouseup",
                ".select2-results__option--selectable",
                function (e) {
                  var t = d(this),
                    n = p.GetData(this, "data");
                  t.hasClass("select2-results__option--selected")
                    ? i.options.get("multiple")
                      ? i.trigger("unselect", { originalEvent: e, data: n })
                      : i.trigger("close", {})
                    : i.trigger("select", { originalEvent: e, data: n });
                }
              ),
              this.$results.on(
                "mouseenter",
                ".select2-results__option--selectable",
                function (e) {
                  var t = p.GetData(this, "data");
                  i
                    .getHighlightedResults()
                    .removeClass("select2-results__option--highlighted")
                    .attr("aria-selected", "false"),
                    i.trigger("results:focus", { data: t, element: d(this) });
                }
              );
          }),
          (s.prototype.getHighlightedResults = function () {
            return this.$results.find(".select2-results__option--highlighted");
          }),
          (s.prototype.destroy = function () {
            this.$results.remove();
          }),
          (s.prototype.ensureHighlightVisible = function () {
            var e,
              t,
              n,
              s,
              i = this.getHighlightedResults();
            0 !== i.length &&
              ((e = this.$results
                .find(".select2-results__option--selectable")
                .index(i)),
              (s = this.$results.offset().top),
              (t = i.offset().top),
              (n = this.$results.scrollTop() + (t - s)),
              (s = t - s),
              (n -= 2 * i.outerHeight(!1)),
              e <= 2
                ? this.$results.scrollTop(0)
                : (s > this.$results.outerHeight() || s < 0) &&
                  this.$results.scrollTop(n));
          }),
          (s.prototype.template = function (e, t) {
            var n = this.options.get("templateResult"),
              s = this.options.get("escapeMarkup"),
              e = n(e, t);
            null == e
              ? (t.style.display = "none")
              : "string" == typeof e
              ? (t.innerHTML = s(e))
              : d(t).append(e);
          }),
          s
        );
      }),
      u.define("select2/keys", [], function () {
        return {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          ESC: 27,
          SPACE: 32,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46,
        };
      }),
      u.define(
        "select2/selection/base",
        ["jquery", "../utils", "../keys"],
        function (n, s, i) {
          function r(e, t) {
            (this.$element = e),
              (this.options = t),
              r.__super__.constructor.call(this);
          }
          return (
            s.Extend(r, s.Observable),
            (r.prototype.render = function () {
              var e = n(
                '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
              );
              return (
                (this._tabindex = 0),
                null != s.GetData(this.$element[0], "old-tabindex")
                  ? (this._tabindex = s.GetData(
                      this.$element[0],
                      "old-tabindex"
                    ))
                  : null != this.$element.attr("tabindex") &&
                    (this._tabindex = this.$element.attr("tabindex")),
                e.attr("title", this.$element.attr("title")),
                e.attr("tabindex", this._tabindex),
                e.attr("aria-disabled", "false"),
                (this.$selection = e)
              );
            }),
            (r.prototype.bind = function (e, t) {
              var n = this,
                s = e.id + "-results";
              (this.container = e),
                this.$selection.on("focus", function (e) {
                  n.trigger("focus", e);
                }),
                this.$selection.on("blur", function (e) {
                  n._handleBlur(e);
                }),
                this.$selection.on("keydown", function (e) {
                  n.trigger("keypress", e),
                    e.which === i.SPACE && e.preventDefault();
                }),
                e.on("results:focus", function (e) {
                  n.$selection.attr("aria-activedescendant", e.data._resultId);
                }),
                e.on("selection:update", function (e) {
                  n.update(e.data);
                }),
                e.on("open", function () {
                  n.$selection.attr("aria-expanded", "true"),
                    n.$selection.attr("aria-owns", s),
                    n._attachCloseHandler(e);
                }),
                e.on("close", function () {
                  n.$selection.attr("aria-expanded", "false"),
                    n.$selection.removeAttr("aria-activedescendant"),
                    n.$selection.removeAttr("aria-owns"),
                    n.$selection.trigger("focus"),
                    n._detachCloseHandler(e);
                }),
                e.on("enable", function () {
                  n.$selection.attr("tabindex", n._tabindex),
                    n.$selection.attr("aria-disabled", "false");
                }),
                e.on("disable", function () {
                  n.$selection.attr("tabindex", "-1"),
                    n.$selection.attr("aria-disabled", "true");
                });
            }),
            (r.prototype._handleBlur = function (e) {
              var t = this;
              window.setTimeout(function () {
                document.activeElement == t.$selection[0] ||
                  n.contains(t.$selection[0], document.activeElement) ||
                  t.trigger("blur", e);
              }, 1);
            }),
            (r.prototype._attachCloseHandler = function (e) {
              n(document.body).on("mousedown.select2." + e.id, function (e) {
                var t = n(e.target).closest(".select2");
                n(".select2.select2-container--open").each(function () {
                  this != t[0] && s.GetData(this, "element").select2("close");
                });
              });
            }),
            (r.prototype._detachCloseHandler = function (e) {
              n(document.body).off("mousedown.select2." + e.id);
            }),
            (r.prototype.position = function (e, t) {
              t.find(".selection").append(e);
            }),
            (r.prototype.destroy = function () {
              this._detachCloseHandler(this.container);
            }),
            (r.prototype.update = function (e) {
              throw new Error(
                "The `update` method must be defined in child classes."
              );
            }),
            (r.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (r.prototype.isDisabled = function () {
              return this.options.get("disabled");
            }),
            r
          );
        }
      ),
      u.define(
        "select2/selection/single",
        ["jquery", "./base", "../utils", "../keys"],
        function (e, t, n, s) {
          function i() {
            i.__super__.constructor.apply(this, arguments);
          }
          return (
            n.Extend(i, t),
            (i.prototype.render = function () {
              var e = i.__super__.render.call(this);
              return (
                e[0].classList.add("select2-selection--single"),
                e.html(
                  '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                ),
                e
              );
            }),
            (i.prototype.bind = function (t, e) {
              var n = this;
              i.__super__.bind.apply(this, arguments);
              var s = t.id + "-container";
              this.$selection
                .find(".select2-selection__rendered")
                .attr("id", s)
                .attr("role", "textbox")
                .attr("aria-readonly", "true"),
                this.$selection.attr("aria-labelledby", s),
                this.$selection.attr("aria-controls", s),
                this.$selection.on("mousedown", function (e) {
                  1 === e.which && n.trigger("toggle", { originalEvent: e });
                }),
                this.$selection.on("focus", function (e) {}),
                this.$selection.on("blur", function (e) {}),
                t.on("focus", function (e) {
                  t.isOpen() || n.$selection.trigger("focus");
                });
            }),
            (i.prototype.clear = function () {
              var e = this.$selection.find(".select2-selection__rendered");
              e.empty(), e.removeAttr("title");
            }),
            (i.prototype.display = function (e, t) {
              var n = this.options.get("templateSelection");
              return this.options.get("escapeMarkup")(n(e, t));
            }),
            (i.prototype.selectionContainer = function () {
              return e("<span></span>");
            }),
            (i.prototype.update = function (e) {
              var t, n;
              0 !== e.length
                ? ((n = e[0]),
                  (t = this.$selection.find(".select2-selection__rendered")),
                  (e = this.display(n, t)),
                  t.empty().append(e),
                  (n = n.title || n.text)
                    ? t.attr("title", n)
                    : t.removeAttr("title"))
                : this.clear();
            }),
            i
          );
        }
      ),
      u.define(
        "select2/selection/multiple",
        ["jquery", "./base", "../utils"],
        function (i, e, c) {
          function r(e, t) {
            r.__super__.constructor.apply(this, arguments);
          }
          return (
            c.Extend(r, e),
            (r.prototype.render = function () {
              var e = r.__super__.render.call(this);
              return (
                e[0].classList.add("select2-selection--multiple"),
                e.html('<ul class="select2-selection__rendered"></ul>'),
                e
              );
            }),
            (r.prototype.bind = function (e, t) {
              var n = this;
              r.__super__.bind.apply(this, arguments);
              var s = e.id + "-container";
              this.$selection
                .find(".select2-selection__rendered")
                .attr("id", s),
                this.$selection.on("click", function (e) {
                  n.trigger("toggle", { originalEvent: e });
                }),
                this.$selection.on(
                  "click",
                  ".select2-selection__choice__remove",
                  function (e) {
                    var t;
                    n.isDisabled() ||
                      ((t = i(this).parent()),
                      (t = c.GetData(t[0], "data")),
                      n.trigger("unselect", { originalEvent: e, data: t }));
                  }
                ),
                this.$selection.on(
                  "keydown",
                  ".select2-selection__choice__remove",
                  function (e) {
                    n.isDisabled() || e.stopPropagation();
                  }
                );
            }),
            (r.prototype.clear = function () {
              var e = this.$selection.find(".select2-selection__rendered");
              e.empty(), e.removeAttr("title");
            }),
            (r.prototype.display = function (e, t) {
              var n = this.options.get("templateSelection");
              return this.options.get("escapeMarkup")(n(e, t));
            }),
            (r.prototype.selectionContainer = function () {
              return i(
                '<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>'
              );
            }),
            (r.prototype.update = function (e) {
              if ((this.clear(), 0 !== e.length)) {
                for (
                  var t = [],
                    n =
                      this.$selection
                        .find(".select2-selection__rendered")
                        .attr("id") + "-choice-",
                    s = 0;
                  s < e.length;
                  s++
                ) {
                  var i = e[s],
                    r = this.selectionContainer(),
                    o = this.display(i, r),
                    a = n + c.generateChars(4) + "-";
                  i.id ? (a += i.id) : (a += c.generateChars(4)),
                    r
                      .find(".select2-selection__choice__display")
                      .append(o)
                      .attr("id", a);
                  var l = i.title || i.text;
                  l && r.attr("title", l);
                  (o = this.options.get("translations").get("removeItem")),
                    (l = r.find(".select2-selection__choice__remove"));
                  l.attr("title", o()),
                    l.attr("aria-label", o()),
                    l.attr("aria-describedby", a),
                    c.StoreData(r[0], "data", i),
                    t.push(r);
                }
                this.$selection.find(".select2-selection__rendered").append(t);
              }
            }),
            r
          );
        }
      ),
      u.define("select2/selection/placeholder", [], function () {
        function e(e, t, n) {
          (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
            e.call(this, t, n);
        }
        return (
          (e.prototype.normalizePlaceholder = function (e, t) {
            return (t = "string" == typeof t ? { id: "", text: t } : t);
          }),
          (e.prototype.createPlaceholder = function (e, t) {
            var n = this.selectionContainer();
            n.html(this.display(t)),
              n[0].classList.add("select2-selection__placeholder"),
              n[0].classList.remove("select2-selection__choice");
            t = t.title || t.text || n.text();
            return (
              this.$selection
                .find(".select2-selection__rendered")
                .attr("title", t),
              n
            );
          }),
          (e.prototype.update = function (e, t) {
            var n = 1 == t.length && t[0].id != this.placeholder.id;
            if (1 < t.length || n) return e.call(this, t);
            this.clear();
            t = this.createPlaceholder(this.placeholder);
            this.$selection.find(".select2-selection__rendered").append(t);
          }),
          e
        );
      }),
      u.define(
        "select2/selection/allowClear",
        ["jquery", "../keys", "../utils"],
        function (i, s, a) {
          function e() {}
          return (
            (e.prototype.bind = function (e, t, n) {
              var s = this;
              e.call(this, t, n),
                null == this.placeholder &&
                  this.options.get("debug") &&
                  window.console &&
                  console.error &&
                  console.error(
                    "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                  ),
                this.$selection.on(
                  "mousedown",
                  ".select2-selection__clear",
                  function (e) {
                    s._handleClear(e);
                  }
                ),
                t.on("keypress", function (e) {
                  s._handleKeyboardClear(e, t);
                });
            }),
            (e.prototype._handleClear = function (e, t) {
              if (!this.isDisabled()) {
                var n = this.$selection.find(".select2-selection__clear");
                if (0 !== n.length) {
                  t.stopPropagation();
                  var s = a.GetData(n[0], "data"),
                    i = this.$element.val();
                  this.$element.val(this.placeholder.id);
                  var r = { data: s };
                  if ((this.trigger("clear", r), r.prevented))
                    this.$element.val(i);
                  else {
                    for (var o = 0; o < s.length; o++)
                      if (
                        ((r = { data: s[o] }),
                        this.trigger("unselect", r),
                        r.prevented)
                      )
                        return void this.$element.val(i);
                    this.$element.trigger("input").trigger("change"),
                      this.trigger("toggle", {});
                  }
                }
              }
            }),
            (e.prototype._handleKeyboardClear = function (e, t, n) {
              n.isOpen() ||
                (t.which != s.DELETE && t.which != s.BACKSPACE) ||
                this._handleClear(t);
            }),
            (e.prototype.update = function (e, t) {
              var n, s;
              e.call(this, t),
                this.$selection.find(".select2-selection__clear").remove(),
                this.$selection[0].classList.remove(
                  "select2-selection--clearable"
                ),
                0 <
                  this.$selection.find(".select2-selection__placeholder")
                    .length ||
                  0 === t.length ||
                  ((n = this.$selection
                    .find(".select2-selection__rendered")
                    .attr("id")),
                  (s = this.options.get("translations").get("removeAllItems")),
                  (e = i(
                    '<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>'
                  )).attr("title", s()),
                  e.attr("aria-label", s()),
                  e.attr("aria-describedby", n),
                  a.StoreData(e[0], "data", t),
                  this.$selection.prepend(e),
                  this.$selection[0].classList.add(
                    "select2-selection--clearable"
                  ));
            }),
            e
          );
        }
      ),
      u.define(
        "select2/selection/search",
        ["jquery", "../utils", "../keys"],
        function (s, a, l) {
          function e(e, t, n) {
            e.call(this, t, n);
          }
          return (
            (e.prototype.render = function (e) {
              var t = this.options.get("translations").get("search"),
                n = s(
                  '<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>'
                );
              (this.$searchContainer = n),
                (this.$search = n.find("textarea")),
                this.$search.prop(
                  "autocomplete",
                  this.options.get("autocomplete")
                ),
                this.$search.attr("aria-label", t());
              e = e.call(this);
              return (
                this._transferTabIndex(), e.append(this.$searchContainer), e
              );
            }),
            (e.prototype.bind = function (e, t, n) {
              var s = this,
                i = t.id + "-results",
                r = t.id + "-container";
              e.call(this, t, n),
                s.$search.attr("aria-describedby", r),
                t.on("open", function () {
                  s.$search.attr("aria-controls", i),
                    s.$search.trigger("focus");
                }),
                t.on("close", function () {
                  s.$search.val(""),
                    s.resizeSearch(),
                    s.$search.removeAttr("aria-controls"),
                    s.$search.removeAttr("aria-activedescendant"),
                    s.$search.trigger("focus");
                }),
                t.on("enable", function () {
                  s.$search.prop("disabled", !1), s._transferTabIndex();
                }),
                t.on("disable", function () {
                  s.$search.prop("disabled", !0);
                }),
                t.on("focus", function (e) {
                  s.$search.trigger("focus");
                }),
                t.on("results:focus", function (e) {
                  e.data._resultId
                    ? s.$search.attr("aria-activedescendant", e.data._resultId)
                    : s.$search.removeAttr("aria-activedescendant");
                }),
                this.$selection.on(
                  "focusin",
                  ".select2-search--inline",
                  function (e) {
                    s.trigger("focus", e);
                  }
                ),
                this.$selection.on(
                  "focusout",
                  ".select2-search--inline",
                  function (e) {
                    s._handleBlur(e);
                  }
                ),
                this.$selection.on(
                  "keydown",
                  ".select2-search--inline",
                  function (e) {
                    var t;
                    e.stopPropagation(),
                      s.trigger("keypress", e),
                      (s._keyUpPrevented = e.isDefaultPrevented()),
                      e.which !== l.BACKSPACE ||
                        "" !== s.$search.val() ||
                        (0 <
                          (t = s.$selection
                            .find(".select2-selection__choice")
                            .last()).length &&
                          ((t = a.GetData(t[0], "data")),
                          s.searchRemoveChoice(t),
                          e.preventDefault()));
                  }
                ),
                this.$selection.on(
                  "click",
                  ".select2-search--inline",
                  function (e) {
                    s.$search.val() && e.stopPropagation();
                  }
                );
              var t = document.documentMode,
                o = t && t <= 11;
              this.$selection.on(
                "input.searchcheck",
                ".select2-search--inline",
                function (e) {
                  o
                    ? s.$selection.off("input.search input.searchcheck")
                    : s.$selection.off("keyup.search");
                }
              ),
                this.$selection.on(
                  "keyup.search input.search",
                  ".select2-search--inline",
                  function (e) {
                    var t;
                    o && "input" === e.type
                      ? s.$selection.off("input.search input.searchcheck")
                      : (t = e.which) != l.SHIFT &&
                        t != l.CTRL &&
                        t != l.ALT &&
                        t != l.TAB &&
                        s.handleSearch(e);
                  }
                );
            }),
            (e.prototype._transferTabIndex = function (e) {
              this.$search.attr("tabindex", this.$selection.attr("tabindex")),
                this.$selection.attr("tabindex", "-1");
            }),
            (e.prototype.createPlaceholder = function (e, t) {
              this.$search.attr("placeholder", t.text);
            }),
            (e.prototype.update = function (e, t) {
              var n = this.$search[0] == document.activeElement;
              this.$search.attr("placeholder", ""),
                e.call(this, t),
                this.resizeSearch(),
                n && this.$search.trigger("focus");
            }),
            (e.prototype.handleSearch = function () {
              var e;
              this.resizeSearch(),
                this._keyUpPrevented ||
                  ((e = this.$search.val()),
                  this.trigger("query", { term: e })),
                (this._keyUpPrevented = !1);
            }),
            (e.prototype.searchRemoveChoice = function (e, t) {
              this.trigger("unselect", { data: t }),
                this.$search.val(t.text),
                this.handleSearch();
            }),
            (e.prototype.resizeSearch = function () {
              this.$search.css("width", "25px");
              var e = "100%";
              "" === this.$search.attr("placeholder") &&
                (e = 0.75 * (this.$search.val().length + 1) + "em"),
                this.$search.css("width", e);
            }),
            e
          );
        }
      ),
      u.define("select2/selection/selectionCss", ["../utils"], function (n) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              e = this.options.get("selectionCssClass") || "";
            return (
              -1 !== e.indexOf(":all:") &&
                ((e = e.replace(":all:", "")),
                n.copyNonInternalCssClasses(t[0], this.$element[0])),
              t.addClass(e),
              t
            );
          }),
          e
        );
      }),
      u.define("select2/selection/eventRelay", ["jquery"], function (o) {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this,
              i = [
                "open",
                "opening",
                "close",
                "closing",
                "select",
                "selecting",
                "unselect",
                "unselecting",
                "clear",
                "clearing",
              ],
              r = [
                "opening",
                "closing",
                "selecting",
                "unselecting",
                "clearing",
              ];
            e.call(this, t, n),
              t.on("*", function (e, t) {
                var n;
                -1 !== i.indexOf(e) &&
                  ((t = t || {}),
                  (n = o.Event("select2:" + e, { params: t })),
                  s.$element.trigger(n),
                  -1 !== r.indexOf(e) &&
                    (t.prevented = n.isDefaultPrevented()));
              });
          }),
          e
        );
      }),
      u.define("select2/translation", ["jquery", "require"], function (t, n) {
        function s(e) {
          this.dict = e || {};
        }
        return (
          (s.prototype.all = function () {
            return this.dict;
          }),
          (s.prototype.get = function (e) {
            return this.dict[e];
          }),
          (s.prototype.extend = function (e) {
            this.dict = t.extend({}, e.all(), this.dict);
          }),
          (s._cache = {}),
          (s.loadPath = function (e) {
            var t;
            return (
              e in s._cache || ((t = n(e)), (s._cache[e] = t)),
              new s(s._cache[e])
            );
          }),
          s
        );
      }),
      u.define("select2/diacritics", [], function () {
        return {
          "Ⓐ": "A",
          Ａ: "A",
          À: "A",
          Á: "A",
          Â: "A",
          Ầ: "A",
          Ấ: "A",
          Ẫ: "A",
          Ẩ: "A",
          Ã: "A",
          Ā: "A",
          Ă: "A",
          Ằ: "A",
          Ắ: "A",
          Ẵ: "A",
          Ẳ: "A",
          Ȧ: "A",
          Ǡ: "A",
          Ä: "A",
          Ǟ: "A",
          Ả: "A",
          Å: "A",
          Ǻ: "A",
          Ǎ: "A",
          Ȁ: "A",
          Ȃ: "A",
          Ạ: "A",
          Ậ: "A",
          Ặ: "A",
          Ḁ: "A",
          Ą: "A",
          Ⱥ: "A",
          Ɐ: "A",
          Ꜳ: "AA",
          Æ: "AE",
          Ǽ: "AE",
          Ǣ: "AE",
          Ꜵ: "AO",
          Ꜷ: "AU",
          Ꜹ: "AV",
          Ꜻ: "AV",
          Ꜽ: "AY",
          "Ⓑ": "B",
          Ｂ: "B",
          Ḃ: "B",
          Ḅ: "B",
          Ḇ: "B",
          Ƀ: "B",
          Ƃ: "B",
          Ɓ: "B",
          "Ⓒ": "C",
          Ｃ: "C",
          Ć: "C",
          Ĉ: "C",
          Ċ: "C",
          Č: "C",
          Ç: "C",
          Ḉ: "C",
          Ƈ: "C",
          Ȼ: "C",
          Ꜿ: "C",
          "Ⓓ": "D",
          Ｄ: "D",
          Ḋ: "D",
          Ď: "D",
          Ḍ: "D",
          Ḑ: "D",
          Ḓ: "D",
          Ḏ: "D",
          Đ: "D",
          Ƌ: "D",
          Ɗ: "D",
          Ɖ: "D",
          Ꝺ: "D",
          Ǳ: "DZ",
          Ǆ: "DZ",
          ǲ: "Dz",
          ǅ: "Dz",
          "Ⓔ": "E",
          Ｅ: "E",
          È: "E",
          É: "E",
          Ê: "E",
          Ề: "E",
          Ế: "E",
          Ễ: "E",
          Ể: "E",
          Ẽ: "E",
          Ē: "E",
          Ḕ: "E",
          Ḗ: "E",
          Ĕ: "E",
          Ė: "E",
          Ë: "E",
          Ẻ: "E",
          Ě: "E",
          Ȅ: "E",
          Ȇ: "E",
          Ẹ: "E",
          Ệ: "E",
          Ȩ: "E",
          Ḝ: "E",
          Ę: "E",
          Ḙ: "E",
          Ḛ: "E",
          Ɛ: "E",
          Ǝ: "E",
          "Ⓕ": "F",
          Ｆ: "F",
          Ḟ: "F",
          Ƒ: "F",
          Ꝼ: "F",
          "Ⓖ": "G",
          Ｇ: "G",
          Ǵ: "G",
          Ĝ: "G",
          Ḡ: "G",
          Ğ: "G",
          Ġ: "G",
          Ǧ: "G",
          Ģ: "G",
          Ǥ: "G",
          Ɠ: "G",
          Ꞡ: "G",
          Ᵹ: "G",
          Ꝿ: "G",
          "Ⓗ": "H",
          Ｈ: "H",
          Ĥ: "H",
          Ḣ: "H",
          Ḧ: "H",
          Ȟ: "H",
          Ḥ: "H",
          Ḩ: "H",
          Ḫ: "H",
          Ħ: "H",
          Ⱨ: "H",
          Ⱶ: "H",
          Ɥ: "H",
          "Ⓘ": "I",
          Ｉ: "I",
          Ì: "I",
          Í: "I",
          Î: "I",
          Ĩ: "I",
          Ī: "I",
          Ĭ: "I",
          İ: "I",
          Ï: "I",
          Ḯ: "I",
          Ỉ: "I",
          Ǐ: "I",
          Ȉ: "I",
          Ȋ: "I",
          Ị: "I",
          Į: "I",
          Ḭ: "I",
          Ɨ: "I",
          "Ⓙ": "J",
          Ｊ: "J",
          Ĵ: "J",
          Ɉ: "J",
          "Ⓚ": "K",
          Ｋ: "K",
          Ḱ: "K",
          Ǩ: "K",
          Ḳ: "K",
          Ķ: "K",
          Ḵ: "K",
          Ƙ: "K",
          Ⱪ: "K",
          Ꝁ: "K",
          Ꝃ: "K",
          Ꝅ: "K",
          Ꞣ: "K",
          "Ⓛ": "L",
          Ｌ: "L",
          Ŀ: "L",
          Ĺ: "L",
          Ľ: "L",
          Ḷ: "L",
          Ḹ: "L",
          Ļ: "L",
          Ḽ: "L",
          Ḻ: "L",
          Ł: "L",
          Ƚ: "L",
          Ɫ: "L",
          Ⱡ: "L",
          Ꝉ: "L",
          Ꝇ: "L",
          Ꞁ: "L",
          Ǉ: "LJ",
          ǈ: "Lj",
          "Ⓜ": "M",
          Ｍ: "M",
          Ḿ: "M",
          Ṁ: "M",
          Ṃ: "M",
          Ɱ: "M",
          Ɯ: "M",
          "Ⓝ": "N",
          Ｎ: "N",
          Ǹ: "N",
          Ń: "N",
          Ñ: "N",
          Ṅ: "N",
          Ň: "N",
          Ṇ: "N",
          Ņ: "N",
          Ṋ: "N",
          Ṉ: "N",
          Ƞ: "N",
          Ɲ: "N",
          Ꞑ: "N",
          Ꞥ: "N",
          Ǌ: "NJ",
          ǋ: "Nj",
          "Ⓞ": "O",
          Ｏ: "O",
          Ò: "O",
          Ó: "O",
          Ô: "O",
          Ồ: "O",
          Ố: "O",
          Ỗ: "O",
          Ổ: "O",
          Õ: "O",
          Ṍ: "O",
          Ȭ: "O",
          Ṏ: "O",
          Ō: "O",
          Ṑ: "O",
          Ṓ: "O",
          Ŏ: "O",
          Ȯ: "O",
          Ȱ: "O",
          Ö: "O",
          Ȫ: "O",
          Ỏ: "O",
          Ő: "O",
          Ǒ: "O",
          Ȍ: "O",
          Ȏ: "O",
          Ơ: "O",
          Ờ: "O",
          Ớ: "O",
          Ỡ: "O",
          Ở: "O",
          Ợ: "O",
          Ọ: "O",
          Ộ: "O",
          Ǫ: "O",
          Ǭ: "O",
          Ø: "O",
          Ǿ: "O",
          Ɔ: "O",
          Ɵ: "O",
          Ꝋ: "O",
          Ꝍ: "O",
          Œ: "OE",
          Ƣ: "OI",
          Ꝏ: "OO",
          Ȣ: "OU",
          "Ⓟ": "P",
          Ｐ: "P",
          Ṕ: "P",
          Ṗ: "P",
          Ƥ: "P",
          Ᵽ: "P",
          Ꝑ: "P",
          Ꝓ: "P",
          Ꝕ: "P",
          "Ⓠ": "Q",
          Ｑ: "Q",
          Ꝗ: "Q",
          Ꝙ: "Q",
          Ɋ: "Q",
          "Ⓡ": "R",
          Ｒ: "R",
          Ŕ: "R",
          Ṙ: "R",
          Ř: "R",
          Ȑ: "R",
          Ȓ: "R",
          Ṛ: "R",
          Ṝ: "R",
          Ŗ: "R",
          Ṟ: "R",
          Ɍ: "R",
          Ɽ: "R",
          Ꝛ: "R",
          Ꞧ: "R",
          Ꞃ: "R",
          "Ⓢ": "S",
          Ｓ: "S",
          ẞ: "S",
          Ś: "S",
          Ṥ: "S",
          Ŝ: "S",
          Ṡ: "S",
          Š: "S",
          Ṧ: "S",
          Ṣ: "S",
          Ṩ: "S",
          Ș: "S",
          Ş: "S",
          Ȿ: "S",
          Ꞩ: "S",
          Ꞅ: "S",
          "Ⓣ": "T",
          Ｔ: "T",
          Ṫ: "T",
          Ť: "T",
          Ṭ: "T",
          Ț: "T",
          Ţ: "T",
          Ṱ: "T",
          Ṯ: "T",
          Ŧ: "T",
          Ƭ: "T",
          Ʈ: "T",
          Ⱦ: "T",
          Ꞇ: "T",
          Ꜩ: "TZ",
          "Ⓤ": "U",
          Ｕ: "U",
          Ù: "U",
          Ú: "U",
          Û: "U",
          Ũ: "U",
          Ṹ: "U",
          Ū: "U",
          Ṻ: "U",
          Ŭ: "U",
          Ü: "U",
          Ǜ: "U",
          Ǘ: "U",
          Ǖ: "U",
          Ǚ: "U",
          Ủ: "U",
          Ů: "U",
          Ű: "U",
          Ǔ: "U",
          Ȕ: "U",
          Ȗ: "U",
          Ư: "U",
          Ừ: "U",
          Ứ: "U",
          Ữ: "U",
          Ử: "U",
          Ự: "U",
          Ụ: "U",
          Ṳ: "U",
          Ų: "U",
          Ṷ: "U",
          Ṵ: "U",
          Ʉ: "U",
          "Ⓥ": "V",
          Ｖ: "V",
          Ṽ: "V",
          Ṿ: "V",
          Ʋ: "V",
          Ꝟ: "V",
          Ʌ: "V",
          Ꝡ: "VY",
          "Ⓦ": "W",
          Ｗ: "W",
          Ẁ: "W",
          Ẃ: "W",
          Ŵ: "W",
          Ẇ: "W",
          Ẅ: "W",
          Ẉ: "W",
          Ⱳ: "W",
          "Ⓧ": "X",
          Ｘ: "X",
          Ẋ: "X",
          Ẍ: "X",
          "Ⓨ": "Y",
          Ｙ: "Y",
          Ỳ: "Y",
          Ý: "Y",
          Ŷ: "Y",
          Ỹ: "Y",
          Ȳ: "Y",
          Ẏ: "Y",
          Ÿ: "Y",
          Ỷ: "Y",
          Ỵ: "Y",
          Ƴ: "Y",
          Ɏ: "Y",
          Ỿ: "Y",
          "Ⓩ": "Z",
          Ｚ: "Z",
          Ź: "Z",
          Ẑ: "Z",
          Ż: "Z",
          Ž: "Z",
          Ẓ: "Z",
          Ẕ: "Z",
          Ƶ: "Z",
          Ȥ: "Z",
          Ɀ: "Z",
          Ⱬ: "Z",
          Ꝣ: "Z",
          "ⓐ": "a",
          ａ: "a",
          ẚ: "a",
          à: "a",
          á: "a",
          â: "a",
          ầ: "a",
          ấ: "a",
          ẫ: "a",
          ẩ: "a",
          ã: "a",
          ā: "a",
          ă: "a",
          ằ: "a",
          ắ: "a",
          ẵ: "a",
          ẳ: "a",
          ȧ: "a",
          ǡ: "a",
          ä: "a",
          ǟ: "a",
          ả: "a",
          å: "a",
          ǻ: "a",
          ǎ: "a",
          ȁ: "a",
          ȃ: "a",
          ạ: "a",
          ậ: "a",
          ặ: "a",
          ḁ: "a",
          ą: "a",
          ⱥ: "a",
          ɐ: "a",
          ꜳ: "aa",
          æ: "ae",
          ǽ: "ae",
          ǣ: "ae",
          ꜵ: "ao",
          ꜷ: "au",
          ꜹ: "av",
          ꜻ: "av",
          ꜽ: "ay",
          "ⓑ": "b",
          ｂ: "b",
          ḃ: "b",
          ḅ: "b",
          ḇ: "b",
          ƀ: "b",
          ƃ: "b",
          ɓ: "b",
          "ⓒ": "c",
          ｃ: "c",
          ć: "c",
          ĉ: "c",
          ċ: "c",
          č: "c",
          ç: "c",
          ḉ: "c",
          ƈ: "c",
          ȼ: "c",
          ꜿ: "c",
          ↄ: "c",
          "ⓓ": "d",
          ｄ: "d",
          ḋ: "d",
          ď: "d",
          ḍ: "d",
          ḑ: "d",
          ḓ: "d",
          ḏ: "d",
          đ: "d",
          ƌ: "d",
          ɖ: "d",
          ɗ: "d",
          ꝺ: "d",
          ǳ: "dz",
          ǆ: "dz",
          "ⓔ": "e",
          ｅ: "e",
          è: "e",
          é: "e",
          ê: "e",
          ề: "e",
          ế: "e",
          ễ: "e",
          ể: "e",
          ẽ: "e",
          ē: "e",
          ḕ: "e",
          ḗ: "e",
          ĕ: "e",
          ė: "e",
          ë: "e",
          ẻ: "e",
          ě: "e",
          ȅ: "e",
          ȇ: "e",
          ẹ: "e",
          ệ: "e",
          ȩ: "e",
          ḝ: "e",
          ę: "e",
          ḙ: "e",
          ḛ: "e",
          ɇ: "e",
          ɛ: "e",
          ǝ: "e",
          "ⓕ": "f",
          ｆ: "f",
          ḟ: "f",
          ƒ: "f",
          ꝼ: "f",
          "ⓖ": "g",
          ｇ: "g",
          ǵ: "g",
          ĝ: "g",
          ḡ: "g",
          ğ: "g",
          ġ: "g",
          ǧ: "g",
          ģ: "g",
          ǥ: "g",
          ɠ: "g",
          ꞡ: "g",
          ᵹ: "g",
          ꝿ: "g",
          "ⓗ": "h",
          ｈ: "h",
          ĥ: "h",
          ḣ: "h",
          ḧ: "h",
          ȟ: "h",
          ḥ: "h",
          ḩ: "h",
          ḫ: "h",
          ẖ: "h",
          ħ: "h",
          ⱨ: "h",
          ⱶ: "h",
          ɥ: "h",
          ƕ: "hv",
          "ⓘ": "i",
          ｉ: "i",
          ì: "i",
          í: "i",
          î: "i",
          ĩ: "i",
          ī: "i",
          ĭ: "i",
          ï: "i",
          ḯ: "i",
          ỉ: "i",
          ǐ: "i",
          ȉ: "i",
          ȋ: "i",
          ị: "i",
          į: "i",
          ḭ: "i",
          ɨ: "i",
          ı: "i",
          "ⓙ": "j",
          ｊ: "j",
          ĵ: "j",
          ǰ: "j",
          ɉ: "j",
          "ⓚ": "k",
          ｋ: "k",
          ḱ: "k",
          ǩ: "k",
          ḳ: "k",
          ķ: "k",
          ḵ: "k",
          ƙ: "k",
          ⱪ: "k",
          ꝁ: "k",
          ꝃ: "k",
          ꝅ: "k",
          ꞣ: "k",
          "ⓛ": "l",
          ｌ: "l",
          ŀ: "l",
          ĺ: "l",
          ľ: "l",
          ḷ: "l",
          ḹ: "l",
          ļ: "l",
          ḽ: "l",
          ḻ: "l",
          ſ: "l",
          ł: "l",
          ƚ: "l",
          ɫ: "l",
          ⱡ: "l",
          ꝉ: "l",
          ꞁ: "l",
          ꝇ: "l",
          ǉ: "lj",
          "ⓜ": "m",
          ｍ: "m",
          ḿ: "m",
          ṁ: "m",
          ṃ: "m",
          ɱ: "m",
          ɯ: "m",
          "ⓝ": "n",
          ｎ: "n",
          ǹ: "n",
          ń: "n",
          ñ: "n",
          ṅ: "n",
          ň: "n",
          ṇ: "n",
          ņ: "n",
          ṋ: "n",
          ṉ: "n",
          ƞ: "n",
          ɲ: "n",
          ŉ: "n",
          ꞑ: "n",
          ꞥ: "n",
          ǌ: "nj",
          "ⓞ": "o",
          ｏ: "o",
          ò: "o",
          ó: "o",
          ô: "o",
          ồ: "o",
          ố: "o",
          ỗ: "o",
          ổ: "o",
          õ: "o",
          ṍ: "o",
          ȭ: "o",
          ṏ: "o",
          ō: "o",
          ṑ: "o",
          ṓ: "o",
          ŏ: "o",
          ȯ: "o",
          ȱ: "o",
          ö: "o",
          ȫ: "o",
          ỏ: "o",
          ő: "o",
          ǒ: "o",
          ȍ: "o",
          ȏ: "o",
          ơ: "o",
          ờ: "o",
          ớ: "o",
          ỡ: "o",
          ở: "o",
          ợ: "o",
          ọ: "o",
          ộ: "o",
          ǫ: "o",
          ǭ: "o",
          ø: "o",
          ǿ: "o",
          ɔ: "o",
          ꝋ: "o",
          ꝍ: "o",
          ɵ: "o",
          œ: "oe",
          ƣ: "oi",
          ȣ: "ou",
          ꝏ: "oo",
          "ⓟ": "p",
          ｐ: "p",
          ṕ: "p",
          ṗ: "p",
          ƥ: "p",
          ᵽ: "p",
          ꝑ: "p",
          ꝓ: "p",
          ꝕ: "p",
          "ⓠ": "q",
          ｑ: "q",
          ɋ: "q",
          ꝗ: "q",
          ꝙ: "q",
          "ⓡ": "r",
          ｒ: "r",
          ŕ: "r",
          ṙ: "r",
          ř: "r",
          ȑ: "r",
          ȓ: "r",
          ṛ: "r",
          ṝ: "r",
          ŗ: "r",
          ṟ: "r",
          ɍ: "r",
          ɽ: "r",
          ꝛ: "r",
          ꞧ: "r",
          ꞃ: "r",
          "ⓢ": "s",
          ｓ: "s",
          ß: "s",
          ś: "s",
          ṥ: "s",
          ŝ: "s",
          ṡ: "s",
          š: "s",
          ṧ: "s",
          ṣ: "s",
          ṩ: "s",
          ș: "s",
          ş: "s",
          ȿ: "s",
          ꞩ: "s",
          ꞅ: "s",
          ẛ: "s",
          "ⓣ": "t",
          ｔ: "t",
          ṫ: "t",
          ẗ: "t",
          ť: "t",
          ṭ: "t",
          ț: "t",
          ţ: "t",
          ṱ: "t",
          ṯ: "t",
          ŧ: "t",
          ƭ: "t",
          ʈ: "t",
          ⱦ: "t",
          ꞇ: "t",
          ꜩ: "tz",
          "ⓤ": "u",
          ｕ: "u",
          ù: "u",
          ú: "u",
          û: "u",
          ũ: "u",
          ṹ: "u",
          ū: "u",
          ṻ: "u",
          ŭ: "u",
          ü: "u",
          ǜ: "u",
          ǘ: "u",
          ǖ: "u",
          ǚ: "u",
          ủ: "u",
          ů: "u",
          ű: "u",
          ǔ: "u",
          ȕ: "u",
          ȗ: "u",
          ư: "u",
          ừ: "u",
          ứ: "u",
          ữ: "u",
          ử: "u",
          ự: "u",
          ụ: "u",
          ṳ: "u",
          ų: "u",
          ṷ: "u",
          ṵ: "u",
          ʉ: "u",
          "ⓥ": "v",
          ｖ: "v",
          ṽ: "v",
          ṿ: "v",
          ʋ: "v",
          ꝟ: "v",
          ʌ: "v",
          ꝡ: "vy",
          "ⓦ": "w",
          ｗ: "w",
          ẁ: "w",
          ẃ: "w",
          ŵ: "w",
          ẇ: "w",
          ẅ: "w",
          ẘ: "w",
          ẉ: "w",
          ⱳ: "w",
          "ⓧ": "x",
          ｘ: "x",
          ẋ: "x",
          ẍ: "x",
          "ⓨ": "y",
          ｙ: "y",
          ỳ: "y",
          ý: "y",
          ŷ: "y",
          ỹ: "y",
          ȳ: "y",
          ẏ: "y",
          ÿ: "y",
          ỷ: "y",
          ẙ: "y",
          ỵ: "y",
          ƴ: "y",
          ɏ: "y",
          ỿ: "y",
          "ⓩ": "z",
          ｚ: "z",
          ź: "z",
          ẑ: "z",
          ż: "z",
          ž: "z",
          ẓ: "z",
          ẕ: "z",
          ƶ: "z",
          ȥ: "z",
          ɀ: "z",
          ⱬ: "z",
          ꝣ: "z",
          Ά: "Α",
          Έ: "Ε",
          Ή: "Η",
          Ί: "Ι",
          Ϊ: "Ι",
          Ό: "Ο",
          Ύ: "Υ",
          Ϋ: "Υ",
          Ώ: "Ω",
          ά: "α",
          έ: "ε",
          ή: "η",
          ί: "ι",
          ϊ: "ι",
          ΐ: "ι",
          ό: "ο",
          ύ: "υ",
          ϋ: "υ",
          ΰ: "υ",
          ώ: "ω",
          ς: "σ",
          "’": "'",
        };
      }),
      u.define("select2/data/base", ["../utils"], function (n) {
        function s(e, t) {
          s.__super__.constructor.call(this);
        }
        return (
          n.Extend(s, n.Observable),
          (s.prototype.current = function (e) {
            throw new Error(
              "The `current` method must be defined in child classes."
            );
          }),
          (s.prototype.query = function (e, t) {
            throw new Error(
              "The `query` method must be defined in child classes."
            );
          }),
          (s.prototype.bind = function (e, t) {}),
          (s.prototype.destroy = function () {}),
          (s.prototype.generateResultId = function (e, t) {
            e = e.id + "-result-";
            return (
              (e += n.generateChars(4)),
              null != t.id
                ? (e += "-" + t.id.toString())
                : (e += "-" + n.generateChars(4)),
              e
            );
          }),
          s
        );
      }),
      u.define(
        "select2/data/select",
        ["./base", "../utils", "jquery"],
        function (e, a, l) {
          function n(e, t) {
            (this.$element = e),
              (this.options = t),
              n.__super__.constructor.call(this);
          }
          return (
            a.Extend(n, e),
            (n.prototype.current = function (e) {
              var t = this;
              e(
                Array.prototype.map.call(
                  this.$element[0].querySelectorAll(":checked"),
                  function (e) {
                    return t.item(l(e));
                  }
                )
              );
            }),
            (n.prototype.select = function (i) {
              var e,
                r = this;
              if (
                ((i.selected = !0),
                null != i.element &&
                  "option" === i.element.tagName.toLowerCase())
              )
                return (
                  (i.element.selected = !0),
                  void this.$element.trigger("input").trigger("change")
                );
              this.$element.prop("multiple")
                ? this.current(function (e) {
                    var t = [];
                    (i = [i]).push.apply(i, e);
                    for (var n = 0; n < i.length; n++) {
                      var s = i[n].id;
                      -1 === t.indexOf(s) && t.push(s);
                    }
                    r.$element.val(t),
                      r.$element.trigger("input").trigger("change");
                  })
                : ((e = i.id),
                  this.$element.val(e),
                  this.$element.trigger("input").trigger("change"));
            }),
            (n.prototype.unselect = function (i) {
              var r = this;
              if (this.$element.prop("multiple")) {
                if (
                  ((i.selected = !1),
                  null != i.element &&
                    "option" === i.element.tagName.toLowerCase())
                )
                  return (
                    (i.element.selected = !1),
                    void this.$element.trigger("input").trigger("change")
                  );
                this.current(function (e) {
                  for (var t = [], n = 0; n < e.length; n++) {
                    var s = e[n].id;
                    s !== i.id && -1 === t.indexOf(s) && t.push(s);
                  }
                  r.$element.val(t),
                    r.$element.trigger("input").trigger("change");
                });
              }
            }),
            (n.prototype.bind = function (e, t) {
              var n = this;
              (this.container = e).on("select", function (e) {
                n.select(e.data);
              }),
                e.on("unselect", function (e) {
                  n.unselect(e.data);
                });
            }),
            (n.prototype.destroy = function () {
              this.$element.find("*").each(function () {
                a.RemoveData(this);
              });
            }),
            (n.prototype.query = function (t, e) {
              var n = [],
                s = this;
              this.$element.children().each(function () {
                var e;
                ("option" !== this.tagName.toLowerCase() &&
                  "optgroup" !== this.tagName.toLowerCase()) ||
                  ((e = l(this)),
                  (e = s.item(e)),
                  null !== (e = s.matches(t, e)) && n.push(e));
              }),
                e({ results: n });
            }),
            (n.prototype.addOptions = function (e) {
              this.$element.append(e);
            }),
            (n.prototype.option = function (e) {
              var t;
              e.children
                ? ((t = document.createElement("optgroup")).label = e.text)
                : void 0 !== (t = document.createElement("option")).textContent
                ? (t.textContent = e.text)
                : (t.innerText = e.text),
                void 0 !== e.id && (t.value = e.id),
                e.disabled && (t.disabled = !0),
                e.selected && (t.selected = !0),
                e.title && (t.title = e.title);
              e = this._normalizeItem(e);
              return (e.element = t), a.StoreData(t, "data", e), l(t);
            }),
            (n.prototype.item = function (e) {
              var t = {};
              if (null != (t = a.GetData(e[0], "data"))) return t;
              var n = e[0];
              if ("option" === n.tagName.toLowerCase())
                t = {
                  id: e.val(),
                  text: e.text(),
                  disabled: e.prop("disabled"),
                  selected: e.prop("selected"),
                  title: e.prop("title"),
                };
              else if ("optgroup" === n.tagName.toLowerCase()) {
                t = {
                  text: e.prop("label"),
                  children: [],
                  title: e.prop("title"),
                };
                for (
                  var s = e.children("option"), i = [], r = 0;
                  r < s.length;
                  r++
                ) {
                  var o = l(s[r]),
                    o = this.item(o);
                  i.push(o);
                }
                t.children = i;
              }
              return (
                ((t = this._normalizeItem(t)).element = e[0]),
                a.StoreData(e[0], "data", t),
                t
              );
            }),
            (n.prototype._normalizeItem = function (e) {
              e !== Object(e) && (e = { id: e, text: e });
              return (
                null != (e = l.extend({}, { text: "" }, e)).id &&
                  (e.id = e.id.toString()),
                null != e.text && (e.text = e.text.toString()),
                null == e._resultId &&
                  e.id &&
                  null != this.container &&
                  (e._resultId = this.generateResultId(this.container, e)),
                l.extend({}, { selected: !1, disabled: !1 }, e)
              );
            }),
            (n.prototype.matches = function (e, t) {
              return this.options.get("matcher")(e, t);
            }),
            n
          );
        }
      ),
      u.define(
        "select2/data/array",
        ["./select", "../utils", "jquery"],
        function (e, t, c) {
          function s(e, t) {
            (this._dataToConvert = t.get("data") || []),
              s.__super__.constructor.call(this, e, t);
          }
          return (
            t.Extend(s, e),
            (s.prototype.bind = function (e, t) {
              s.__super__.bind.call(this, e, t),
                this.addOptions(this.convertToOptions(this._dataToConvert));
            }),
            (s.prototype.select = function (n) {
              var e = this.$element.find("option").filter(function (e, t) {
                return t.value == n.id.toString();
              });
              0 === e.length && ((e = this.option(n)), this.addOptions(e)),
                s.__super__.select.call(this, n);
            }),
            (s.prototype.convertToOptions = function (e) {
              var t = this,
                n = this.$element.find("option"),
                s = n
                  .map(function () {
                    return t.item(c(this)).id;
                  })
                  .get(),
                i = [];
              for (var r = 0; r < e.length; r++) {
                var o,
                  a,
                  l = this._normalizeItem(e[r]);
                0 <= s.indexOf(l.id)
                  ? ((o = n.filter(
                      (function (e) {
                        return function () {
                          return c(this).val() == e.id;
                        };
                      })(l)
                    )),
                    (a = this.item(o)),
                    (a = c.extend(!0, {}, l, a)),
                    (a = this.option(a)),
                    o.replaceWith(a))
                  : ((a = this.option(l)),
                    l.children &&
                      ((l = this.convertToOptions(l.children)), a.append(l)),
                    i.push(a));
              }
              return i;
            }),
            s
          );
        }
      ),
      u.define(
        "select2/data/ajax",
        ["./array", "../utils", "jquery"],
        function (e, t, r) {
          function n(e, t) {
            (this.ajaxOptions = this._applyDefaults(t.get("ajax"))),
              null != this.ajaxOptions.processResults &&
                (this.processResults = this.ajaxOptions.processResults),
              n.__super__.constructor.call(this, e, t);
          }
          return (
            t.Extend(n, e),
            (n.prototype._applyDefaults = function (e) {
              var t = {
                data: function (e) {
                  return r.extend({}, e, { q: e.term });
                },
                transport: function (e, t, n) {
                  e = r.ajax(e);
                  return e.then(t), e.fail(n), e;
                },
              };
              return r.extend({}, t, e, !0);
            }),
            (n.prototype.processResults = function (e) {
              return e;
            }),
            (n.prototype.query = function (t, n) {
              var s = this;
              null != this._request &&
                ("function" == typeof this._request.abort &&
                  this._request.abort(),
                (this._request = null));
              var i = r.extend({ type: "GET" }, this.ajaxOptions);
              function e() {
                var e = i.transport(
                  i,
                  function (e) {
                    e = s.processResults(e, t);
                    s.options.get("debug") &&
                      window.console &&
                      console.error &&
                      ((e && e.results && Array.isArray(e.results)) ||
                        console.error(
                          "Select2: The AJAX results did not return an array in the `results` key of the response."
                        )),
                      n(e);
                  },
                  function () {
                    ("status" in e && (0 === e.status || "0" === e.status)) ||
                      s.trigger("results:message", { message: "errorLoading" });
                  }
                );
                s._request = e;
              }
              "function" == typeof i.url &&
                (i.url = i.url.call(this.$element, t)),
                "function" == typeof i.data &&
                  (i.data = i.data.call(this.$element, t)),
                this.ajaxOptions.delay && null != t.term
                  ? (this._queryTimeout &&
                      window.clearTimeout(this._queryTimeout),
                    (this._queryTimeout = window.setTimeout(
                      e,
                      this.ajaxOptions.delay
                    )))
                  : e();
            }),
            n
          );
        }
      ),
      u.define("select2/data/tags", ["jquery"], function (t) {
        function e(e, t, n) {
          var s = n.get("tags"),
            i = n.get("createTag");
          void 0 !== i && (this.createTag = i);
          i = n.get("insertTag");
          if (
            (void 0 !== i && (this.insertTag = i),
            e.call(this, t, n),
            Array.isArray(s))
          )
            for (var r = 0; r < s.length; r++) {
              var o = s[r],
                o = this._normalizeItem(o),
                o = this.option(o);
              this.$element.append(o);
            }
        }
        return (
          (e.prototype.query = function (e, c, u) {
            var d = this;
            this._removeOldTags(),
              null != c.term && null == c.page
                ? e.call(this, c, function e(t, n) {
                    for (var s = t.results, i = 0; i < s.length; i++) {
                      var r = s[i],
                        o =
                          null != r.children && !e({ results: r.children }, !0);
                      if (
                        (r.text || "").toUpperCase() ===
                          (c.term || "").toUpperCase() ||
                        o
                      )
                        return !n && ((t.data = s), void u(t));
                    }
                    if (n) return !0;
                    var a,
                      l = d.createTag(c);
                    null != l &&
                      ((a = d.option(l)).attr("data-select2-tag", "true"),
                      d.addOptions([a]),
                      d.insertTag(s, l)),
                      (t.results = s),
                      u(t);
                  })
                : e.call(this, c, u);
          }),
          (e.prototype.createTag = function (e, t) {
            if (null == t.term) return null;
            t = t.term.trim();
            return "" === t ? null : { id: t, text: t };
          }),
          (e.prototype.insertTag = function (e, t, n) {
            t.unshift(n);
          }),
          (e.prototype._removeOldTags = function (e) {
            this.$element.find("option[data-select2-tag]").each(function () {
              this.selected || t(this).remove();
            });
          }),
          e
        );
      }),
      u.define("select2/data/tokenizer", ["jquery"], function (c) {
        function e(e, t, n) {
          var s = n.get("tokenizer");
          void 0 !== s && (this.tokenizer = s), e.call(this, t, n);
        }
        return (
          (e.prototype.bind = function (e, t, n) {
            e.call(this, t, n),
              (this.$search =
                t.dropdown.$search ||
                t.selection.$search ||
                n.find(".select2-search__field"));
          }),
          (e.prototype.query = function (e, t, n) {
            var s = this;
            t.term = t.term || "";
            var i = this.tokenizer(t, this.options, function (e) {
              var t,
                n = s._normalizeItem(e);
              s.$element.find("option").filter(function () {
                return c(this).val() === n.id;
              }).length ||
                ((t = s.option(n)).attr("data-select2-tag", !0),
                s._removeOldTags(),
                s.addOptions([t])),
                (t = n),
                s.trigger("select", { data: t });
            });
            i.term !== t.term &&
              (this.$search.length &&
                (this.$search.val(i.term), this.$search.trigger("focus")),
              (t.term = i.term)),
              e.call(this, t, n);
          }),
          (e.prototype.tokenizer = function (e, t, n, s) {
            for (
              var i = n.get("tokenSeparators") || [],
                r = t.term,
                o = 0,
                a =
                  this.createTag ||
                  function (e) {
                    return { id: e.term, text: e.term };
                  };
              o < r.length;

            ) {
              var l = r[o];
              -1 !== i.indexOf(l)
                ? ((l = r.substr(0, o)),
                  null != (l = a(c.extend({}, t, { term: l })))
                    ? (s(l), (r = r.substr(o + 1) || ""), (o = 0))
                    : o++)
                : o++;
            }
            return { term: r };
          }),
          e
        );
      }),
      u.define("select2/data/minimumInputLength", [], function () {
        function e(e, t, n) {
          (this.minimumInputLength = n.get("minimumInputLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.query = function (e, t, n) {
            (t.term = t.term || ""),
              t.term.length < this.minimumInputLength
                ? this.trigger("results:message", {
                    message: "inputTooShort",
                    args: {
                      minimum: this.minimumInputLength,
                      input: t.term,
                      params: t,
                    },
                  })
                : e.call(this, t, n);
          }),
          e
        );
      }),
      u.define("select2/data/maximumInputLength", [], function () {
        function e(e, t, n) {
          (this.maximumInputLength = n.get("maximumInputLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.query = function (e, t, n) {
            (t.term = t.term || ""),
              0 < this.maximumInputLength &&
              t.term.length > this.maximumInputLength
                ? this.trigger("results:message", {
                    message: "inputTooLong",
                    args: {
                      maximum: this.maximumInputLength,
                      input: t.term,
                      params: t,
                    },
                  })
                : e.call(this, t, n);
          }),
          e
        );
      }),
      u.define("select2/data/maximumSelectionLength", [], function () {
        function e(e, t, n) {
          (this.maximumSelectionLength = n.get("maximumSelectionLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("select", function () {
                s._checkIfMaximumSelected();
              });
          }),
          (e.prototype.query = function (e, t, n) {
            var s = this;
            this._checkIfMaximumSelected(function () {
              e.call(s, t, n);
            });
          }),
          (e.prototype._checkIfMaximumSelected = function (e, t) {
            var n = this;
            this.current(function (e) {
              e = null != e ? e.length : 0;
              0 < n.maximumSelectionLength && e >= n.maximumSelectionLength
                ? n.trigger("results:message", {
                    message: "maximumSelected",
                    args: { maximum: n.maximumSelectionLength },
                  })
                : t && t();
            });
          }),
          e
        );
      }),
      u.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
        function n(e, t) {
          (this.$element = e),
            (this.options = t),
            n.__super__.constructor.call(this);
        }
        return (
          e.Extend(n, e.Observable),
          (n.prototype.render = function () {
            var e = t(
              '<span class="select2-dropdown"><span class="select2-results"></span></span>'
            );
            return e.attr("dir", this.options.get("dir")), (this.$dropdown = e);
          }),
          (n.prototype.bind = function () {}),
          (n.prototype.position = function (e, t) {}),
          (n.prototype.destroy = function () {
            this.$dropdown.remove();
          }),
          n
        );
      }),
      u.define("select2/dropdown/search", ["jquery"], function (r) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              n = this.options.get("translations").get("search"),
              e = r(
                '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
              );
            return (
              (this.$searchContainer = e),
              (this.$search = e.find("input")),
              this.$search.prop(
                "autocomplete",
                this.options.get("autocomplete")
              ),
              this.$search.attr("aria-label", n()),
              t.prepend(e),
              t
            );
          }),
          (e.prototype.bind = function (e, t, n) {
            var s = this,
              i = t.id + "-results";
            e.call(this, t, n),
              this.$search.on("keydown", function (e) {
                s.trigger("keypress", e),
                  (s._keyUpPrevented = e.isDefaultPrevented());
              }),
              this.$search.on("input", function (e) {
                r(this).off("keyup");
              }),
              this.$search.on("keyup input", function (e) {
                s.handleSearch(e);
              }),
              t.on("open", function () {
                s.$search.attr("tabindex", 0),
                  s.$search.attr("aria-controls", i),
                  s.$search.trigger("focus"),
                  window.setTimeout(function () {
                    s.$search.trigger("focus");
                  }, 0);
              }),
              t.on("close", function () {
                s.$search.attr("tabindex", -1),
                  s.$search.removeAttr("aria-controls"),
                  s.$search.removeAttr("aria-activedescendant"),
                  s.$search.val(""),
                  s.$search.trigger("blur");
              }),
              t.on("focus", function () {
                t.isOpen() || s.$search.trigger("focus");
              }),
              t.on("results:all", function (e) {
                (null != e.query.term && "" !== e.query.term) ||
                  (s.showSearch(e)
                    ? s.$searchContainer[0].classList.remove(
                        "select2-search--hide"
                      )
                    : s.$searchContainer[0].classList.add(
                        "select2-search--hide"
                      ));
              }),
              t.on("results:focus", function (e) {
                e.data._resultId
                  ? s.$search.attr("aria-activedescendant", e.data._resultId)
                  : s.$search.removeAttr("aria-activedescendant");
              });
          }),
          (e.prototype.handleSearch = function (e) {
            var t;
            this._keyUpPrevented ||
              ((t = this.$search.val()), this.trigger("query", { term: t })),
              (this._keyUpPrevented = !1);
          }),
          (e.prototype.showSearch = function (e, t) {
            return !0;
          }),
          e
        );
      }),
      u.define("select2/dropdown/hidePlaceholder", [], function () {
        function e(e, t, n, s) {
          (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
            e.call(this, t, n, s);
        }
        return (
          (e.prototype.append = function (e, t) {
            (t.results = this.removePlaceholder(t.results)), e.call(this, t);
          }),
          (e.prototype.normalizePlaceholder = function (e, t) {
            return (t = "string" == typeof t ? { id: "", text: t } : t);
          }),
          (e.prototype.removePlaceholder = function (e, t) {
            for (var n = t.slice(0), s = t.length - 1; 0 <= s; s--) {
              var i = t[s];
              this.placeholder.id === i.id && n.splice(s, 1);
            }
            return n;
          }),
          e
        );
      }),
      u.define("select2/dropdown/infiniteScroll", ["jquery"], function (n) {
        function e(e, t, n, s) {
          (this.lastParams = {}),
            e.call(this, t, n, s),
            (this.$loadingMore = this.createLoadingMore()),
            (this.loading = !1);
        }
        return (
          (e.prototype.append = function (e, t) {
            this.$loadingMore.remove(),
              (this.loading = !1),
              e.call(this, t),
              this.showLoadingMore(t) &&
                (this.$results.append(this.$loadingMore),
                this.loadMoreIfNeeded());
          }),
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("query", function (e) {
                (s.lastParams = e), (s.loading = !0);
              }),
              t.on("query:append", function (e) {
                (s.lastParams = e), (s.loading = !0);
              }),
              this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
          }),
          (e.prototype.loadMoreIfNeeded = function () {
            var e = n.contains(document.documentElement, this.$loadingMore[0]);
            !this.loading &&
              e &&
              ((e = this.$results.offset().top + this.$results.outerHeight(!1)),
              this.$loadingMore.offset().top +
                this.$loadingMore.outerHeight(!1) <=
                e + 50 && this.loadMore());
          }),
          (e.prototype.loadMore = function () {
            this.loading = !0;
            var e = n.extend({}, { page: 1 }, this.lastParams);
            e.page++, this.trigger("query:append", e);
          }),
          (e.prototype.showLoadingMore = function (e, t) {
            return t.pagination && t.pagination.more;
          }),
          (e.prototype.createLoadingMore = function () {
            var e = n(
                '<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'
              ),
              t = this.options.get("translations").get("loadingMore");
            return e.html(t(this.lastParams)), e;
          }),
          e
        );
      }),
      u.define(
        "select2/dropdown/attachBody",
        ["jquery", "../utils"],
        function (u, o) {
          function e(e, t, n) {
            (this.$dropdownParent = u(
              n.get("dropdownParent") || document.body
            )),
              e.call(this, t, n);
          }
          return (
            (e.prototype.bind = function (e, t, n) {
              var s = this;
              e.call(this, t, n),
                t.on("open", function () {
                  s._showDropdown(),
                    s._attachPositioningHandler(t),
                    s._bindContainerResultHandlers(t);
                }),
                t.on("close", function () {
                  s._hideDropdown(), s._detachPositioningHandler(t);
                }),
                this.$dropdownContainer.on("mousedown", function (e) {
                  e.stopPropagation();
                });
            }),
            (e.prototype.destroy = function (e) {
              e.call(this), this.$dropdownContainer.remove();
            }),
            (e.prototype.position = function (e, t, n) {
              t.attr("class", n.attr("class")),
                t[0].classList.remove("select2"),
                t[0].classList.add("select2-container--open"),
                t.css({ position: "absolute", top: -999999 }),
                (this.$container = n);
            }),
            (e.prototype.render = function (e) {
              var t = u("<span></span>"),
                e = e.call(this);
              return t.append(e), (this.$dropdownContainer = t);
            }),
            (e.prototype._hideDropdown = function (e) {
              this.$dropdownContainer.detach();
            }),
            (e.prototype._bindContainerResultHandlers = function (e, t) {
              var n;
              this._containerResultsHandlersBound ||
                ((n = this),
                t.on("results:all", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("results:append", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("results:message", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("select", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("unselect", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                (this._containerResultsHandlersBound = !0));
            }),
            (e.prototype._attachPositioningHandler = function (e, t) {
              var n = this,
                s = "scroll.select2." + t.id,
                i = "resize.select2." + t.id,
                r = "orientationchange.select2." + t.id,
                t = this.$container.parents().filter(o.hasScroll);
              t.each(function () {
                o.StoreData(this, "select2-scroll-position", {
                  x: u(this).scrollLeft(),
                  y: u(this).scrollTop(),
                });
              }),
                t.on(s, function (e) {
                  var t = o.GetData(this, "select2-scroll-position");
                  u(this).scrollTop(t.y);
                }),
                u(window).on(s + " " + i + " " + r, function (e) {
                  n._positionDropdown(), n._resizeDropdown();
                });
            }),
            (e.prototype._detachPositioningHandler = function (e, t) {
              var n = "scroll.select2." + t.id,
                s = "resize.select2." + t.id,
                t = "orientationchange.select2." + t.id;
              this.$container.parents().filter(o.hasScroll).off(n),
                u(window).off(n + " " + s + " " + t);
            }),
            (e.prototype._positionDropdown = function () {
              var e = u(window),
                t = this.$dropdown[0].classList.contains(
                  "select2-dropdown--above"
                ),
                n = this.$dropdown[0].classList.contains(
                  "select2-dropdown--below"
                ),
                s = null,
                i = this.$container.offset();
              i.bottom = i.top + this.$container.outerHeight(!1);
              var r = { height: this.$container.outerHeight(!1) };
              (r.top = i.top), (r.bottom = i.top + r.height);
              var o = this.$dropdown.outerHeight(!1),
                a = e.scrollTop(),
                l = e.scrollTop() + e.height(),
                c = a < i.top - o,
                e = l > i.bottom + o,
                a = { left: i.left, top: r.bottom },
                l = this.$dropdownParent;
              "static" === l.css("position") && (l = l.offsetParent());
              i = { top: 0, left: 0 };
              (u.contains(document.body, l[0]) || l[0].isConnected) &&
                (i = l.offset()),
                (a.top -= i.top),
                (a.left -= i.left),
                t || n || (s = "below"),
                e || !c || t ? !c && e && t && (s = "below") : (s = "above"),
                ("above" == s || (t && "below" !== s)) &&
                  (a.top = r.top - i.top - o),
                null != s &&
                  (this.$dropdown[0].classList.remove(
                    "select2-dropdown--below"
                  ),
                  this.$dropdown[0].classList.remove("select2-dropdown--above"),
                  this.$dropdown[0].classList.add("select2-dropdown--" + s),
                  this.$container[0].classList.remove(
                    "select2-container--below"
                  ),
                  this.$container[0].classList.remove(
                    "select2-container--above"
                  ),
                  this.$container[0].classList.add("select2-container--" + s)),
                this.$dropdownContainer.css(a);
            }),
            (e.prototype._resizeDropdown = function () {
              var e = { width: this.$container.outerWidth(!1) + "px" };
              this.options.get("dropdownAutoWidth") &&
                ((e.minWidth = e.width),
                (e.position = "relative"),
                (e.width = "auto")),
                this.$dropdown.css(e);
            }),
            (e.prototype._showDropdown = function (e) {
              this.$dropdownContainer.appendTo(this.$dropdownParent),
                this._positionDropdown(),
                this._resizeDropdown();
            }),
            e
          );
        }
      ),
      u.define("select2/dropdown/minimumResultsForSearch", [], function () {
        function e(e, t, n, s) {
          (this.minimumResultsForSearch = n.get("minimumResultsForSearch")),
            this.minimumResultsForSearch < 0 &&
              (this.minimumResultsForSearch = 1 / 0),
            e.call(this, t, n, s);
        }
        return (
          (e.prototype.showSearch = function (e, t) {
            return (
              !(
                (function e(t) {
                  for (var n = 0, s = 0; s < t.length; s++) {
                    var i = t[s];
                    i.children ? (n += e(i.children)) : n++;
                  }
                  return n;
                })(t.data.results) < this.minimumResultsForSearch
              ) && e.call(this, t)
            );
          }),
          e
        );
      }),
      u.define("select2/dropdown/selectOnClose", ["../utils"], function (s) {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("close", function (e) {
                s._handleSelectOnClose(e);
              });
          }),
          (e.prototype._handleSelectOnClose = function (e, t) {
            if (t && null != t.originalSelect2Event) {
              var n = t.originalSelect2Event;
              if ("select" === n._type || "unselect" === n._type) return;
            }
            n = this.getHighlightedResults();
            n.length < 1 ||
              (null != (n = s.GetData(n[0], "data")).element &&
                n.element.selected) ||
              (null == n.element && n.selected) ||
              this.trigger("select", { data: n });
          }),
          e
        );
      }),
      u.define("select2/dropdown/closeOnSelect", [], function () {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("select", function (e) {
                s._selectTriggered(e);
              }),
              t.on("unselect", function (e) {
                s._selectTriggered(e);
              });
          }),
          (e.prototype._selectTriggered = function (e, t) {
            var n = t.originalEvent;
            (n && (n.ctrlKey || n.metaKey)) ||
              this.trigger("close", {
                originalEvent: n,
                originalSelect2Event: t,
              });
          }),
          e
        );
      }),
      u.define("select2/dropdown/dropdownCss", ["../utils"], function (n) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              e = this.options.get("dropdownCssClass") || "";
            return (
              -1 !== e.indexOf(":all:") &&
                ((e = e.replace(":all:", "")),
                n.copyNonInternalCssClasses(t[0], this.$element[0])),
              t.addClass(e),
              t
            );
          }),
          e
        );
      }),
      u.define(
        "select2/dropdown/tagsSearchHighlight",
        ["../utils"],
        function (s) {
          function e() {}
          return (
            (e.prototype.highlightFirstItem = function (e) {
              var t = this.$results.find(
                ".select2-results__option--selectable:not(.select2-results__option--selected)"
              );
              if (0 < t.length) {
                var n = t.first(),
                  t = s.GetData(n[0], "data").element;
                if (
                  t &&
                  t.getAttribute &&
                  "true" === t.getAttribute("data-select2-tag")
                )
                  return void n.trigger("mouseenter");
              }
              e.call(this);
            }),
            e
          );
        }
      ),
      u.define("select2/i18n/en", [], function () {
        return {
          errorLoading: function () {
            return "The results could not be loaded.";
          },
          inputTooLong: function (e) {
            var t = e.input.length - e.maximum,
              e = "Please delete " + t + " character";
            return 1 != t && (e += "s"), e;
          },
          inputTooShort: function (e) {
            return (
              "Please enter " +
              (e.minimum - e.input.length) +
              " or more characters"
            );
          },
          loadingMore: function () {
            return "Loading more results…";
          },
          maximumSelected: function (e) {
            var t = "You can only select " + e.maximum + " item";
            return 1 != e.maximum && (t += "s"), t;
          },
          noResults: function () {
            return "No results found";
          },
          searching: function () {
            return "Searching…";
          },
          removeAllItems: function () {
            return "Remove all items";
          },
          removeItem: function () {
            return "Remove item";
          },
          search: function () {
            return "Search";
          },
        };
      }),
      u.define(
        "select2/defaults",
        [
          "jquery",
          "./results",
          "./selection/single",
          "./selection/multiple",
          "./selection/placeholder",
          "./selection/allowClear",
          "./selection/search",
          "./selection/selectionCss",
          "./selection/eventRelay",
          "./utils",
          "./translation",
          "./diacritics",
          "./data/select",
          "./data/array",
          "./data/ajax",
          "./data/tags",
          "./data/tokenizer",
          "./data/minimumInputLength",
          "./data/maximumInputLength",
          "./data/maximumSelectionLength",
          "./dropdown",
          "./dropdown/search",
          "./dropdown/hidePlaceholder",
          "./dropdown/infiniteScroll",
          "./dropdown/attachBody",
          "./dropdown/minimumResultsForSearch",
          "./dropdown/selectOnClose",
          "./dropdown/closeOnSelect",
          "./dropdown/dropdownCss",
          "./dropdown/tagsSearchHighlight",
          "./i18n/en",
        ],
        function (
          l,
          r,
          o,
          a,
          c,
          u,
          d,
          p,
          h,
          f,
          g,
          t,
          m,
          y,
          v,
          _,
          b,
          $,
          w,
          x,
          A,
          D,
          S,
          E,
          O,
          C,
          L,
          T,
          q,
          I,
          e
        ) {
          function n() {
            this.reset();
          }
          return (
            (n.prototype.apply = function (e) {
              var t;
              null == (e = l.extend(!0, {}, this.defaults, e)).dataAdapter &&
                (null != e.ajax
                  ? (e.dataAdapter = v)
                  : null != e.data
                  ? (e.dataAdapter = y)
                  : (e.dataAdapter = m),
                0 < e.minimumInputLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, $)),
                0 < e.maximumInputLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, w)),
                0 < e.maximumSelectionLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, x)),
                e.tags && (e.dataAdapter = f.Decorate(e.dataAdapter, _)),
                (null == e.tokenSeparators && null == e.tokenizer) ||
                  (e.dataAdapter = f.Decorate(e.dataAdapter, b))),
                null == e.resultsAdapter &&
                  ((e.resultsAdapter = r),
                  null != e.ajax &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, E)),
                  null != e.placeholder &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, S)),
                  e.selectOnClose &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, L)),
                  e.tags &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, I))),
                null == e.dropdownAdapter &&
                  (e.multiple
                    ? (e.dropdownAdapter = A)
                    : ((t = f.Decorate(A, D)), (e.dropdownAdapter = t)),
                  0 !== e.minimumResultsForSearch &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, C)),
                  e.closeOnSelect &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, T)),
                  null != e.dropdownCssClass &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, q)),
                  (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, O))),
                null == e.selectionAdapter &&
                  (e.multiple
                    ? (e.selectionAdapter = a)
                    : (e.selectionAdapter = o),
                  null != e.placeholder &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, c)),
                  e.allowClear &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, u)),
                  e.multiple &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, d)),
                  null != e.selectionCssClass &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, p)),
                  (e.selectionAdapter = f.Decorate(e.selectionAdapter, h))),
                (e.language = this._resolveLanguage(e.language)),
                e.language.push("en");
              for (var n = [], s = 0; s < e.language.length; s++) {
                var i = e.language[s];
                -1 === n.indexOf(i) && n.push(i);
              }
              return (
                (e.language = n),
                (e.translations = this._processTranslations(
                  e.language,
                  e.debug
                )),
                e
              );
            }),
            (n.prototype.reset = function () {
              function a(e) {
                return e.replace(/[^\u0000-\u007E]/g, function (e) {
                  return t[e] || e;
                });
              }
              this.defaults = {
                amdLanguageBase: "./i18n/",
                autocomplete: "off",
                closeOnSelect: !0,
                debug: !1,
                dropdownAutoWidth: !1,
                escapeMarkup: f.escapeMarkup,
                language: {},
                matcher: function e(t, n) {
                  if (null == t.term || "" === t.term.trim()) return n;
                  if (n.children && 0 < n.children.length) {
                    for (
                      var s = l.extend(!0, {}, n), i = n.children.length - 1;
                      0 <= i;
                      i--
                    )
                      null == e(t, n.children[i]) && s.children.splice(i, 1);
                    return 0 < s.children.length ? s : e(t, s);
                  }
                  var r = a(n.text).toUpperCase(),
                    o = a(t.term).toUpperCase();
                  return -1 < r.indexOf(o) ? n : null;
                },
                minimumInputLength: 0,
                maximumInputLength: 0,
                maximumSelectionLength: 0,
                minimumResultsForSearch: 0,
                selectOnClose: !1,
                scrollAfterSelect: !1,
                sorter: function (e) {
                  return e;
                },
                templateResult: function (e) {
                  return e.text;
                },
                templateSelection: function (e) {
                  return e.text;
                },
                theme: "default",
                width: "resolve",
              };
            }),
            (n.prototype.applyFromElement = function (e, t) {
              var n = e.language,
                s = this.defaults.language,
                i = t.prop("lang"),
                t = t.closest("[lang]").prop("lang"),
                t = Array.prototype.concat.call(
                  this._resolveLanguage(i),
                  this._resolveLanguage(n),
                  this._resolveLanguage(s),
                  this._resolveLanguage(t)
                );
              return (e.language = t), e;
            }),
            (n.prototype._resolveLanguage = function (e) {
              if (!e) return [];
              if (l.isEmptyObject(e)) return [];
              if (l.isPlainObject(e)) return [e];
              for (
                var t, n = Array.isArray(e) ? e : [e], s = [], i = 0;
                i < n.length;
                i++
              )
                s.push(n[i]),
                  "string" == typeof n[i] &&
                    0 < n[i].indexOf("-") &&
                    ((t = n[i].split("-")[0]), s.push(t));
              return s;
            }),
            (n.prototype._processTranslations = function (e, t) {
              for (var n = new g(), s = 0; s < e.length; s++) {
                var i = new g(),
                  r = e[s];
                if ("string" == typeof r)
                  try {
                    i = g.loadPath(r);
                  } catch (e) {
                    try {
                      (r = this.defaults.amdLanguageBase + r),
                        (i = g.loadPath(r));
                    } catch (e) {
                      t &&
                        window.console &&
                        console.warn &&
                        console.warn(
                          'Select2: The language file for "' +
                            r +
                            '" could not be automatically loaded. A fallback will be used instead.'
                        );
                    }
                  }
                else i = l.isPlainObject(r) ? new g(r) : r;
                n.extend(i);
              }
              return n;
            }),
            (n.prototype.set = function (e, t) {
              var n = {};
              n[l.camelCase(e)] = t;
              n = f._convertData(n);
              l.extend(!0, this.defaults, n);
            }),
            new n()
          );
        }
      ),
      u.define(
        "select2/options",
        ["jquery", "./defaults", "./utils"],
        function (c, n, u) {
          function e(e, t) {
            (this.options = e),
              null != t && this.fromElement(t),
              null != t && (this.options = n.applyFromElement(this.options, t)),
              (this.options = n.apply(this.options));
          }
          return (
            (e.prototype.fromElement = function (e) {
              var t = ["select2"];
              null == this.options.multiple &&
                (this.options.multiple = e.prop("multiple")),
                null == this.options.disabled &&
                  (this.options.disabled = e.prop("disabled")),
                null == this.options.autocomplete &&
                  e.prop("autocomplete") &&
                  (this.options.autocomplete = e.prop("autocomplete")),
                null == this.options.dir &&
                  (e.prop("dir")
                    ? (this.options.dir = e.prop("dir"))
                    : e.closest("[dir]").prop("dir")
                    ? (this.options.dir = e.closest("[dir]").prop("dir"))
                    : (this.options.dir = "ltr")),
                e.prop("disabled", this.options.disabled),
                e.prop("multiple", this.options.multiple),
                u.GetData(e[0], "select2Tags") &&
                  (this.options.debug &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                    ),
                  u.StoreData(e[0], "data", u.GetData(e[0], "select2Tags")),
                  u.StoreData(e[0], "tags", !0)),
                u.GetData(e[0], "ajaxUrl") &&
                  (this.options.debug &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                    ),
                  e.attr("ajax--url", u.GetData(e[0], "ajaxUrl")),
                  u.StoreData(e[0], "ajax-Url", u.GetData(e[0], "ajaxUrl")));
              var n = {};
              function s(e, t) {
                return t.toUpperCase();
              }
              for (var i = 0; i < e[0].attributes.length; i++) {
                var r = e[0].attributes[i].name,
                  o = "data-";
                r.substr(0, o.length) == o &&
                  ((r = r.substring(o.length)),
                  (o = u.GetData(e[0], r)),
                  (n[r.replace(/-([a-z])/g, s)] = o));
              }
              c.fn.jquery &&
                "1." == c.fn.jquery.substr(0, 2) &&
                e[0].dataset &&
                (n = c.extend(!0, {}, e[0].dataset, n));
              var a,
                l = c.extend(!0, {}, u.GetData(e[0]), n);
              for (a in (l = u._convertData(l)))
                -1 < t.indexOf(a) ||
                  (c.isPlainObject(this.options[a])
                    ? c.extend(this.options[a], l[a])
                    : (this.options[a] = l[a]));
              return this;
            }),
            (e.prototype.get = function (e) {
              return this.options[e];
            }),
            (e.prototype.set = function (e, t) {
              this.options[e] = t;
            }),
            e
          );
        }
      ),
      u.define(
        "select2/core",
        ["jquery", "./options", "./utils", "./keys"],
        function (t, i, r, s) {
          var o = function (e, t) {
            null != r.GetData(e[0], "select2") &&
              r.GetData(e[0], "select2").destroy(),
              (this.$element = e),
              (this.id = this._generateId(e)),
              (t = t || {}),
              (this.options = new i(t, e)),
              o.__super__.constructor.call(this);
            var n = e.attr("tabindex") || 0;
            r.StoreData(e[0], "old-tabindex", n), e.attr("tabindex", "-1");
            t = this.options.get("dataAdapter");
            this.dataAdapter = new t(e, this.options);
            n = this.render();
            this._placeContainer(n);
            t = this.options.get("selectionAdapter");
            (this.selection = new t(e, this.options)),
              (this.$selection = this.selection.render()),
              this.selection.position(this.$selection, n);
            t = this.options.get("dropdownAdapter");
            (this.dropdown = new t(e, this.options)),
              (this.$dropdown = this.dropdown.render()),
              this.dropdown.position(this.$dropdown, n);
            n = this.options.get("resultsAdapter");
            (this.results = new n(e, this.options, this.dataAdapter)),
              (this.$results = this.results.render()),
              this.results.position(this.$results, this.$dropdown);
            var s = this;
            this._bindAdapters(),
              this._registerDomEvents(),
              this._registerDataEvents(),
              this._registerSelectionEvents(),
              this._registerDropdownEvents(),
              this._registerResultsEvents(),
              this._registerEvents(),
              this.dataAdapter.current(function (e) {
                s.trigger("selection:update", { data: e });
              }),
              e[0].classList.add("select2-hidden-accessible"),
              e.attr("aria-hidden", "true"),
              this._syncAttributes(),
              r.StoreData(e[0], "select2", this),
              e.data("select2", this);
          };
          return (
            r.Extend(o, r.Observable),
            (o.prototype._generateId = function (e) {
              return (
                "select2-" +
                (null != e.attr("id")
                  ? e.attr("id")
                  : null != e.attr("name")
                  ? e.attr("name") + "-" + r.generateChars(2)
                  : r.generateChars(4)
                ).replace(/(:|\.|\[|\]|,)/g, "")
              );
            }),
            (o.prototype._placeContainer = function (e) {
              e.insertAfter(this.$element);
              var t = this._resolveWidth(
                this.$element,
                this.options.get("width")
              );
              null != t && e.css("width", t);
            }),
            (o.prototype._resolveWidth = function (e, t) {
              var n =
                /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
              if ("resolve" == t) {
                var s = this._resolveWidth(e, "style");
                return null != s ? s : this._resolveWidth(e, "element");
              }
              if ("element" == t) {
                s = e.outerWidth(!1);
                return s <= 0 ? "auto" : s + "px";
              }
              if ("style" != t)
                return "computedstyle" != t
                  ? t
                  : window.getComputedStyle(e[0]).width;
              e = e.attr("style");
              if ("string" != typeof e) return null;
              for (var i = e.split(";"), r = 0, o = i.length; r < o; r += 1) {
                var a = i[r].replace(/\s/g, "").match(n);
                if (null !== a && 1 <= a.length) return a[1];
              }
              return null;
            }),
            (o.prototype._bindAdapters = function () {
              this.dataAdapter.bind(this, this.$container),
                this.selection.bind(this, this.$container),
                this.dropdown.bind(this, this.$container),
                this.results.bind(this, this.$container);
            }),
            (o.prototype._registerDomEvents = function () {
              var t = this;
              this.$element.on("change.select2", function () {
                t.dataAdapter.current(function (e) {
                  t.trigger("selection:update", { data: e });
                });
              }),
                this.$element.on("focus.select2", function (e) {
                  t.trigger("focus", e);
                }),
                (this._syncA = r.bind(this._syncAttributes, this)),
                (this._syncS = r.bind(this._syncSubtree, this)),
                (this._observer = new window.MutationObserver(function (e) {
                  t._syncA(), t._syncS(e);
                })),
                this._observer.observe(this.$element[0], {
                  attributes: !0,
                  childList: !0,
                  subtree: !1,
                });
            }),
            (o.prototype._registerDataEvents = function () {
              var n = this;
              this.dataAdapter.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerSelectionEvents = function () {
              var n = this,
                s = ["toggle", "focus"];
              this.selection.on("toggle", function () {
                n.toggleDropdown();
              }),
                this.selection.on("focus", function (e) {
                  n.focus(e);
                }),
                this.selection.on("*", function (e, t) {
                  -1 === s.indexOf(e) && n.trigger(e, t);
                });
            }),
            (o.prototype._registerDropdownEvents = function () {
              var n = this;
              this.dropdown.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerResultsEvents = function () {
              var n = this;
              this.results.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerEvents = function () {
              var n = this;
              this.on("open", function () {
                n.$container[0].classList.add("select2-container--open");
              }),
                this.on("close", function () {
                  n.$container[0].classList.remove("select2-container--open");
                }),
                this.on("enable", function () {
                  n.$container[0].classList.remove(
                    "select2-container--disabled"
                  );
                }),
                this.on("disable", function () {
                  n.$container[0].classList.add("select2-container--disabled");
                }),
                this.on("blur", function () {
                  n.$container[0].classList.remove("select2-container--focus");
                }),
                this.on("query", function (t) {
                  n.isOpen() || n.trigger("open", {}),
                    this.dataAdapter.query(t, function (e) {
                      n.trigger("results:all", { data: e, query: t });
                    });
                }),
                this.on("query:append", function (t) {
                  this.dataAdapter.query(t, function (e) {
                    n.trigger("results:append", { data: e, query: t });
                  });
                }),
                this.on("keypress", function (e) {
                  var t = e.which;
                  n.isOpen()
                    ? t === s.ESC || (t === s.UP && e.altKey)
                      ? (n.close(e), e.preventDefault())
                      : t === s.ENTER || t === s.TAB
                      ? (n.trigger("results:select", {}), e.preventDefault())
                      : t === s.SPACE && e.ctrlKey
                      ? (n.trigger("results:toggle", {}), e.preventDefault())
                      : t === s.UP
                      ? (n.trigger("results:previous", {}), e.preventDefault())
                      : t === s.DOWN &&
                        (n.trigger("results:next", {}), e.preventDefault())
                    : (t === s.ENTER ||
                        t === s.SPACE ||
                        (t === s.DOWN && e.altKey)) &&
                      (n.open(), e.preventDefault());
                });
            }),
            (o.prototype._syncAttributes = function () {
              this.options.set("disabled", this.$element.prop("disabled")),
                this.isDisabled()
                  ? (this.isOpen() && this.close(), this.trigger("disable", {}))
                  : this.trigger("enable", {});
            }),
            (o.prototype._isChangeMutation = function (e) {
              var t = this;
              if (e.addedNodes && 0 < e.addedNodes.length) {
                for (var n = 0; n < e.addedNodes.length; n++)
                  if (e.addedNodes[n].selected) return !0;
              } else {
                if (e.removedNodes && 0 < e.removedNodes.length) return !0;
                if (Array.isArray(e))
                  return e.some(function (e) {
                    return t._isChangeMutation(e);
                  });
              }
              return !1;
            }),
            (o.prototype._syncSubtree = function (e) {
              var e = this._isChangeMutation(e),
                t = this;
              e &&
                this.dataAdapter.current(function (e) {
                  t.trigger("selection:update", { data: e });
                });
            }),
            (o.prototype.trigger = function (e, t) {
              var n = o.__super__.trigger,
                s = {
                  open: "opening",
                  close: "closing",
                  select: "selecting",
                  unselect: "unselecting",
                  clear: "clearing",
                };
              if ((void 0 === t && (t = {}), e in s)) {
                var i = s[e],
                  s = { prevented: !1, name: e, args: t };
                if ((n.call(this, i, s), s.prevented))
                  return void (t.prevented = !0);
              }
              n.call(this, e, t);
            }),
            (o.prototype.toggleDropdown = function () {
              this.isDisabled() || (this.isOpen() ? this.close() : this.open());
            }),
            (o.prototype.open = function () {
              this.isOpen() || this.isDisabled() || this.trigger("query", {});
            }),
            (o.prototype.close = function (e) {
              this.isOpen() && this.trigger("close", { originalEvent: e });
            }),
            (o.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (o.prototype.isDisabled = function () {
              return this.options.get("disabled");
            }),
            (o.prototype.isOpen = function () {
              return this.$container[0].classList.contains(
                "select2-container--open"
              );
            }),
            (o.prototype.hasFocus = function () {
              return this.$container[0].classList.contains(
                "select2-container--focus"
              );
            }),
            (o.prototype.focus = function (e) {
              this.hasFocus() ||
                (this.$container[0].classList.add("select2-container--focus"),
                this.trigger("focus", {}));
            }),
            (o.prototype.enable = function (e) {
              this.options.get("debug") &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                );
              e = !(e = null == e || 0 === e.length ? [!0] : e)[0];
              this.$element.prop("disabled", e);
            }),
            (o.prototype.data = function () {
              this.options.get("debug") &&
                0 < arguments.length &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                );
              var t = [];
              return (
                this.dataAdapter.current(function (e) {
                  t = e;
                }),
                t
              );
            }),
            (o.prototype.val = function (e) {
              if (
                (this.options.get("debug") &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                  ),
                null == e || 0 === e.length)
              )
                return this.$element.val();
              e = e[0];
              Array.isArray(e) &&
                (e = e.map(function (e) {
                  return e.toString();
                })),
                this.$element.val(e).trigger("input").trigger("change");
            }),
            (o.prototype.destroy = function () {
              r.RemoveData(this.$container[0]),
                this.$container.remove(),
                this._observer.disconnect(),
                (this._observer = null),
                (this._syncA = null),
                (this._syncS = null),
                this.$element.off(".select2"),
                this.$element.attr(
                  "tabindex",
                  r.GetData(this.$element[0], "old-tabindex")
                ),
                this.$element[0].classList.remove("select2-hidden-accessible"),
                this.$element.attr("aria-hidden", "false"),
                r.RemoveData(this.$element[0]),
                this.$element.removeData("select2"),
                this.dataAdapter.destroy(),
                this.selection.destroy(),
                this.dropdown.destroy(),
                this.results.destroy(),
                (this.dataAdapter = null),
                (this.selection = null),
                (this.dropdown = null),
                (this.results = null);
            }),
            (o.prototype.render = function () {
              var e = t(
                '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
              );
              return (
                e.attr("dir", this.options.get("dir")),
                (this.$container = e),
                this.$container[0].classList.add(
                  "select2-container--" + this.options.get("theme")
                ),
                r.StoreData(e[0], "element", this.$element),
                e
              );
            }),
            o
          );
        }
      ),
      u.define("jquery-mousewheel", ["jquery"], function (e) {
        return e;
      }),
      u.define(
        "jquery.select2",
        [
          "jquery",
          "jquery-mousewheel",
          "./select2/core",
          "./select2/defaults",
          "./select2/utils",
        ],
        function (i, e, r, t, o) {
          var a;
          return (
            null == i.fn.select2 &&
              ((a = ["open", "close", "destroy"]),
              (i.fn.select2 = function (t) {
                if ("object" == typeof (t = t || {}))
                  return (
                    this.each(function () {
                      var e = i.extend(!0, {}, t);
                      new r(i(this), e);
                    }),
                    this
                  );
                if ("string" != typeof t)
                  throw new Error("Invalid arguments for Select2: " + t);
                var n,
                  s = Array.prototype.slice.call(arguments, 1);
                return (
                  this.each(function () {
                    var e = o.GetData(this, "select2");
                    null == e &&
                      window.console &&
                      console.error &&
                      console.error(
                        "The select2('" +
                          t +
                          "') method was called on an element that is not using Select2."
                      ),
                      (n = e[t].apply(e, s));
                  }),
                  -1 < a.indexOf(t) ? this : n
                );
              })),
            null == i.fn.select2.defaults && (i.fn.select2.defaults = t),
            r
          );
        }
      ),
      { define: u.define, require: u.require });
  function b(e, t) {
    return i.call(e, t);
  }
  function l(e, t) {
    var n,
      s,
      i,
      r,
      o,
      a,
      l,
      c,
      u,
      d,
      p = t && t.split("/"),
      h = y.map,
      f = (h && h["*"]) || {};
    if (e) {
      for (
        t = (e = e.split("/")).length - 1,
          y.nodeIdCompat && _.test(e[t]) && (e[t] = e[t].replace(_, "")),
          "." === e[0].charAt(0) &&
            p &&
            (e = p.slice(0, p.length - 1).concat(e)),
          c = 0;
        c < e.length;
        c++
      )
        "." === (d = e[c])
          ? (e.splice(c, 1), --c)
          : ".." === d &&
            (0 === c ||
              (1 === c && ".." === e[2]) ||
              ".." === e[c - 1] ||
              (0 < c && (e.splice(c - 1, 2), (c -= 2))));
      e = e.join("/");
    }
    if ((p || f) && h) {
      for (c = (n = e.split("/")).length; 0 < c; --c) {
        if (((s = n.slice(0, c).join("/")), p))
          for (u = p.length; 0 < u; --u)
            if (((i = h[p.slice(0, u).join("/")]), (i = i && i[s]))) {
              (r = i), (o = c);
              break;
            }
        if (r) break;
        !a && f && f[s] && ((a = f[s]), (l = c));
      }
      !r && a && ((r = a), (o = l)),
        r && (n.splice(0, o, r), (e = n.join("/")));
    }
    return e;
  }
  function w(t, n) {
    return function () {
      var e = a.call(arguments, 0);
      return (
        "string" != typeof e[0] && 1 === e.length && e.push(null),
        o.apply(p, e.concat([t, n]))
      );
    };
  }
  function x(e) {
    var t;
    if (
      (b(m, e) && ((t = m[e]), delete m[e], (v[e] = !0), r.apply(p, t)),
      !b(g, e) && !b(v, e))
    )
      throw new Error("No " + e);
    return g[e];
  }
  function c(e) {
    var t,
      n = e ? e.indexOf("!") : -1;
    return (
      -1 < n && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))),
      [t, e]
    );
  }
  function A(e) {
    return e ? c(e) : [];
  }
  var u = s.require("jquery.select2");
  return (t.fn.select2.amd = s), u;
});
