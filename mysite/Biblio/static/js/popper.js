/**
 * @popperjs/core v2.11.2 - MIT License
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Popper =
          {})
      );
})(this, function (e) {
  "use strict";
  function t(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function n(e) {
    return e instanceof t(e).Element || e instanceof Element;
  }
  function r(e) {
    return e instanceof t(e).HTMLElement || e instanceof HTMLElement;
  }
  function o(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var i = Math.max,
    a = Math.min,
    s = Math.round;
  function f(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      o = 1,
      i = 1;
    if (r(e) && t) {
      var a = e.offsetHeight,
        f = e.offsetWidth;
      f > 0 && (o = s(n.width) / f || 1), a > 0 && (i = s(n.height) / a || 1);
    }
    return {
      width: n.width / o,
      height: n.height / i,
      top: n.top / i,
      right: n.right / o,
      bottom: n.bottom / i,
      left: n.left / o,
      x: n.left / o,
      y: n.top / i,
    };
  }
  function c(e) {
    var n = t(e);
    return { scrollLeft: n.pageXOffset, scrollTop: n.pageYOffset };
  }
  function p(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function u(e) {
    return (
      (n(e) ? e.ownerDocument : e.document) || window.document
    ).documentElement;
  }
  function l(e) {
    return f(u(e)).left + c(e).scrollLeft;
  }
  function d(e) {
    return t(e).getComputedStyle(e);
  }
  function h(e) {
    var t = d(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function m(e, n, o) {
    void 0 === o && (o = !1);
    var i,
      a,
      d = r(n),
      m =
        r(n) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = s(t.width) / e.offsetWidth || 1,
            r = s(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== r;
        })(n),
      v = u(n),
      g = f(e, m),
      y = { scrollLeft: 0, scrollTop: 0 },
      b = { x: 0, y: 0 };
    return (
      (d || (!d && !o)) &&
        (("body" !== p(n) || h(v)) &&
          (y =
            (i = n) !== t(i) && r(i)
              ? { scrollLeft: (a = i).scrollLeft, scrollTop: a.scrollTop }
              : c(i)),
        r(n)
          ? (((b = f(n, !0)).x += n.clientLeft), (b.y += n.clientTop))
          : v && (b.x = l(v))),
      {
        x: g.left + y.scrollLeft - b.x,
        y: g.top + y.scrollTop - b.y,
        width: g.width,
        height: g.height,
      }
    );
  }
  function v(e) {
    var t = f(e),
      n = e.offsetWidth,
      r = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - r) <= 1 && (r = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
    );
  }
  function g(e) {
    return "html" === p(e)
      ? e
      : e.assignedSlot || e.parentNode || (o(e) ? e.host : null) || u(e);
  }
  function y(e) {
    return ["html", "body", "#document"].indexOf(p(e)) >= 0
      ? e.ownerDocument.body
      : r(e) && h(e)
      ? e
      : y(g(e));
  }
  function b(e, n) {
    var r;
    void 0 === n && (n = []);
    var o = y(e),
      i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
      a = t(o),
      s = i ? [a].concat(a.visualViewport || [], h(o) ? o : []) : o,
      f = n.concat(s);
    return i ? f : f.concat(b(g(s)));
  }
  function x(e) {
    return ["table", "td", "th"].indexOf(p(e)) >= 0;
  }
  function w(e) {
    return r(e) && "fixed" !== d(e).position ? e.offsetParent : null;
  }
  function O(e) {
    for (var n = t(e), o = w(e); o && x(o) && "static" === d(o).position; )
      o = w(o);
    return o &&
      ("html" === p(o) || ("body" === p(o) && "static" === d(o).position))
      ? n
      : o ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              r(e) &&
              "fixed" === d(e).position
            )
              return null;
            for (var n = g(e); r(n) && ["html", "body"].indexOf(p(n)) < 0; ) {
              var o = d(n);
              if (
                "none" !== o.transform ||
                "none" !== o.perspective ||
                "paint" === o.contain ||
                -1 !== ["transform", "perspective"].indexOf(o.willChange) ||
                (t && "filter" === o.willChange) ||
                (t && o.filter && "none" !== o.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          n;
  }
  var j = "top",
    E = "bottom",
    D = "right",
    A = "left",
    L = "auto",
    P = [j, E, D, A],
    M = "start",
    k = "end",
    W = "viewport",
    B = "popper",
    H = P.reduce(function (e, t) {
      return e.concat([t + "-" + M, t + "-" + k]);
    }, []),
    T = [].concat(P, [L]).reduce(function (e, t) {
      return e.concat([t, t + "-" + M, t + "-" + k]);
    }, []),
    R = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function S(e) {
    var t = new Map(),
      n = new Set(),
      r = [];
    function o(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && o(r);
            }
          }),
        r.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || o(e);
      }),
      r
    );
  }
  function C(e) {
    return e.split("-")[0];
  }
  function q(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && o(n)) {
      var r = t;
      do {
        if (r && e.isSameNode(r)) return !0;
        r = r.parentNode || r.host;
      } while (r);
    }
    return !1;
  }
  function V(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function N(e, r) {
    return r === W
      ? V(
          (function (e) {
            var n = t(e),
              r = u(e),
              o = n.visualViewport,
              i = r.clientWidth,
              a = r.clientHeight,
              s = 0,
              f = 0;
            return (
              o &&
                ((i = o.width),
                (a = o.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((s = o.offsetLeft), (f = o.offsetTop))),
              { width: i, height: a, x: s + l(e), y: f }
            );
          })(e)
        )
      : n(r)
      ? (function (e) {
          var t = f(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(r)
      : V(
          (function (e) {
            var t,
              n = u(e),
              r = c(e),
              o = null == (t = e.ownerDocument) ? void 0 : t.body,
              a = i(
                n.scrollWidth,
                n.clientWidth,
                o ? o.scrollWidth : 0,
                o ? o.clientWidth : 0
              ),
              s = i(
                n.scrollHeight,
                n.clientHeight,
                o ? o.scrollHeight : 0,
                o ? o.clientHeight : 0
              ),
              f = -r.scrollLeft + l(e),
              p = -r.scrollTop;
            return (
              "rtl" === d(o || n).direction &&
                (f += i(n.clientWidth, o ? o.clientWidth : 0) - a),
              { width: a, height: s, x: f, y: p }
            );
          })(u(e))
        );
  }
  function I(e, t, o) {
    var s =
        "clippingParents" === t
          ? (function (e) {
              var t = b(g(e)),
                o =
                  ["absolute", "fixed"].indexOf(d(e).position) >= 0 && r(e)
                    ? O(e)
                    : e;
              return n(o)
                ? t.filter(function (e) {
                    return n(e) && q(e, o) && "body" !== p(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      f = [].concat(s, [o]),
      c = f[0],
      u = f.reduce(function (t, n) {
        var r = N(e, n);
        return (
          (t.top = i(r.top, t.top)),
          (t.right = a(r.right, t.right)),
          (t.bottom = a(r.bottom, t.bottom)),
          (t.left = i(r.left, t.left)),
          t
        );
      }, N(e, c));
    return (
      (u.width = u.right - u.left),
      (u.height = u.bottom - u.top),
      (u.x = u.left),
      (u.y = u.top),
      u
    );
  }
  function _(e) {
    return e.split("-")[1];
  }
  function F(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function U(e) {
    var t,
      n = e.reference,
      r = e.element,
      o = e.placement,
      i = o ? C(o) : null,
      a = o ? _(o) : null,
      s = n.x + n.width / 2 - r.width / 2,
      f = n.y + n.height / 2 - r.height / 2;
    switch (i) {
      case j:
        t = { x: s, y: n.y - r.height };
        break;
      case E:
        t = { x: s, y: n.y + n.height };
        break;
      case D:
        t = { x: n.x + n.width, y: f };
        break;
      case A:
        t = { x: n.x - r.width, y: f };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = i ? F(i) : null;
    if (null != c) {
      var p = "y" === c ? "height" : "width";
      switch (a) {
        case M:
          t[c] = t[c] - (n[p] / 2 - r[p] / 2);
          break;
        case k:
          t[c] = t[c] + (n[p] / 2 - r[p] / 2);
      }
    }
    return t;
  }
  function z(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function X(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function Y(e, t) {
    void 0 === t && (t = {});
    var r = t,
      o = r.placement,
      i = void 0 === o ? e.placement : o,
      a = r.boundary,
      s = void 0 === a ? "clippingParents" : a,
      c = r.rootBoundary,
      p = void 0 === c ? W : c,
      l = r.elementContext,
      d = void 0 === l ? B : l,
      h = r.altBoundary,
      m = void 0 !== h && h,
      v = r.padding,
      g = void 0 === v ? 0 : v,
      y = z("number" != typeof g ? g : X(g, P)),
      b = d === B ? "reference" : B,
      x = e.rects.popper,
      w = e.elements[m ? b : d],
      O = I(n(w) ? w : w.contextElement || u(e.elements.popper), s, p),
      A = f(e.elements.reference),
      L = U({ reference: A, element: x, strategy: "absolute", placement: i }),
      M = V(Object.assign({}, x, L)),
      k = d === B ? M : A,
      H = {
        top: O.top - k.top + y.top,
        bottom: k.bottom - O.bottom + y.bottom,
        left: O.left - k.left + y.left,
        right: k.right - O.right + y.right,
      },
      T = e.modifiersData.offset;
    if (d === B && T) {
      var R = T[i];
      Object.keys(H).forEach(function (e) {
        var t = [D, E].indexOf(e) >= 0 ? 1 : -1,
          n = [j, E].indexOf(e) >= 0 ? "y" : "x";
        H[e] += R[n] * t;
      });
    }
    return H;
  }
  var G = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function J() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function K(e) {
    void 0 === e && (e = {});
    var t = e,
      r = t.defaultModifiers,
      o = void 0 === r ? [] : r,
      i = t.defaultOptions,
      a = void 0 === i ? G : i;
    return function (e, t, r) {
      void 0 === r && (r = a);
      var i,
        s,
        f = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, G, a),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        p = !1,
        u = {
          state: f,
          setOptions: function (r) {
            var i = "function" == typeof r ? r(f.options) : r;
            l(),
              (f.options = Object.assign({}, a, f.options, i)),
              (f.scrollParents = {
                reference: n(e)
                  ? b(e)
                  : e.contextElement
                  ? b(e.contextElement)
                  : [],
                popper: b(t),
              });
            var s,
              p,
              d = (function (e) {
                var t = S(e);
                return R.reduce(function (e, n) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === n;
                    })
                  );
                }, []);
              })(
                ((s = [].concat(o, f.options.modifiers)),
                (p = s.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {})),
                Object.keys(p).map(function (e) {
                  return p[e];
                }))
              );
            return (
              (f.orderedModifiers = d.filter(function (e) {
                return e.enabled;
              })),
              f.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  o = e.effect;
                if ("function" == typeof o) {
                  var i = o({ state: f, name: t, instance: u, options: r }),
                    a = function () {};
                  c.push(i || a);
                }
              }),
              u.update()
            );
          },
          forceUpdate: function () {
            if (!p) {
              var e = f.elements,
                t = e.reference,
                n = e.popper;
              if (J(t, n)) {
                (f.rects = {
                  reference: m(t, O(n), "fixed" === f.options.strategy),
                  popper: v(n),
                }),
                  (f.reset = !1),
                  (f.placement = f.options.placement),
                  f.orderedModifiers.forEach(function (e) {
                    return (f.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var r = 0; r < f.orderedModifiers.length; r++)
                  if (!0 !== f.reset) {
                    var o = f.orderedModifiers[r],
                      i = o.fn,
                      a = o.options,
                      s = void 0 === a ? {} : a,
                      c = o.name;
                    "function" == typeof i &&
                      (f =
                        i({ state: f, options: s, name: c, instance: u }) || f);
                  } else (f.reset = !1), (r = -1);
              }
            }
          },
          update:
            ((i = function () {
              return new Promise(function (e) {
                u.forceUpdate(), e(f);
              });
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (s = void 0), e(i());
                    });
                  })),
                s
              );
            }),
          destroy: function () {
            l(), (p = !0);
          },
        };
      if (!J(e, t)) return u;
      function l() {
        c.forEach(function (e) {
          return e();
        }),
          (c = []);
      }
      return (
        u.setOptions(r).then(function (e) {
          !p && r.onFirstUpdate && r.onFirstUpdate(e);
        }),
        u
      );
    };
  }
  var Q = { passive: !0 };
  var Z = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var n = e.state,
        r = e.instance,
        o = e.options,
        i = o.scroll,
        a = void 0 === i || i,
        s = o.resize,
        f = void 0 === s || s,
        c = t(n.elements.popper),
        p = [].concat(n.scrollParents.reference, n.scrollParents.popper);
      return (
        a &&
          p.forEach(function (e) {
            e.addEventListener("scroll", r.update, Q);
          }),
        f && c.addEventListener("resize", r.update, Q),
        function () {
          a &&
            p.forEach(function (e) {
              e.removeEventListener("scroll", r.update, Q);
            }),
            f && c.removeEventListener("resize", r.update, Q);
        }
      );
    },
    data: {},
  };
  var $ = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (e) {
        var t = e.state,
          n = e.name;
        t.modifiersData[n] = U({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: "absolute",
          placement: t.placement,
        });
      },
      data: {},
    },
    ee = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function te(e) {
    var n,
      r = e.popper,
      o = e.popperRect,
      i = e.placement,
      a = e.variation,
      f = e.offsets,
      c = e.position,
      p = e.gpuAcceleration,
      l = e.adaptive,
      h = e.roundOffsets,
      m = e.isFixed,
      v = f.x,
      g = void 0 === v ? 0 : v,
      y = f.y,
      b = void 0 === y ? 0 : y,
      x = "function" == typeof h ? h({ x: g, y: b }) : { x: g, y: b };
    (g = x.x), (b = x.y);
    var w = f.hasOwnProperty("x"),
      L = f.hasOwnProperty("y"),
      P = A,
      M = j,
      W = window;
    if (l) {
      var B = O(r),
        H = "clientHeight",
        T = "clientWidth";
      if (
        (B === t(r) &&
          "static" !== d((B = u(r))).position &&
          "absolute" === c &&
          ((H = "scrollHeight"), (T = "scrollWidth")),
        (B = B),
        i === j || ((i === A || i === D) && a === k))
      )
        (M = E),
          (b -=
            (m && W.visualViewport ? W.visualViewport.height : B[H]) -
            o.height),
          (b *= p ? 1 : -1);
      if (i === A || ((i === j || i === E) && a === k))
        (P = D),
          (g -=
            (m && W.visualViewport ? W.visualViewport.width : B[T]) - o.width),
          (g *= p ? 1 : -1);
    }
    var R,
      S = Object.assign({ position: c }, l && ee),
      C =
        !0 === h
          ? (function (e) {
              var t = e.x,
                n = e.y,
                r = window.devicePixelRatio || 1;
              return { x: s(t * r) / r || 0, y: s(n * r) / r || 0 };
            })({ x: g, y: b })
          : { x: g, y: b };
    return (
      (g = C.x),
      (b = C.y),
      p
        ? Object.assign(
            {},
            S,
            (((R = {})[M] = L ? "0" : ""),
            (R[P] = w ? "0" : ""),
            (R.transform =
              (W.devicePixelRatio || 1) <= 1
                ? "translate(" + g + "px, " + b + "px)"
                : "translate3d(" + g + "px, " + b + "px, 0)"),
            R)
          )
        : Object.assign(
            {},
            S,
            (((n = {})[M] = L ? b + "px" : ""),
            (n[P] = w ? g + "px" : ""),
            (n.transform = ""),
            n)
          )
    );
  }
  var ne = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        o = void 0 === r || r,
        i = n.adaptive,
        a = void 0 === i || i,
        s = n.roundOffsets,
        f = void 0 === s || s,
        c = {
          placement: C(t.placement),
          variation: _(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: o,
          isFixed: "fixed" === t.options.strategy,
        };
      null != t.modifiersData.popperOffsets &&
        (t.styles.popper = Object.assign(
          {},
          t.styles.popper,
          te(
            Object.assign({}, c, {
              offsets: t.modifiersData.popperOffsets,
              position: t.options.strategy,
              adaptive: a,
              roundOffsets: f,
            })
          )
        )),
        null != t.modifiersData.arrow &&
          (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            te(
              Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: f,
              })
            )
          )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-placement": t.placement,
        }));
    },
    data: {},
  };
  var re = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          o = t.attributes[e] || {},
          i = t.elements[e];
        r(i) &&
          p(i) &&
          (Object.assign(i.style, n),
          Object.keys(o).forEach(function (e) {
            var t = o[e];
            !1 === t
              ? i.removeAttribute(e)
              : i.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var o = t.elements[e],
              i = t.attributes[e] || {},
              a = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            r(o) &&
              p(o) &&
              (Object.assign(o.style, a),
              Object.keys(i).forEach(function (e) {
                o.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  var oe = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (e) {
        var t = e.state,
          n = e.options,
          r = e.name,
          o = n.offset,
          i = void 0 === o ? [0, 0] : o,
          a = T.reduce(function (e, n) {
            return (
              (e[n] = (function (e, t, n) {
                var r = C(e),
                  o = [A, j].indexOf(r) >= 0 ? -1 : 1,
                  i =
                    "function" == typeof n
                      ? n(Object.assign({}, t, { placement: e }))
                      : n,
                  a = i[0],
                  s = i[1];
                return (
                  (a = a || 0),
                  (s = (s || 0) * o),
                  [A, D].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
                );
              })(n, t.rects, i)),
              e
            );
          }, {}),
          s = a[t.placement],
          f = s.x,
          c = s.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += f),
          (t.modifiersData.popperOffsets.y += c)),
          (t.modifiersData[r] = a);
      },
    },
    ie = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ae(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return ie[e];
    });
  }
  var se = { start: "end", end: "start" };
  function fe(e) {
    return e.replace(/start|end/g, function (e) {
      return se[e];
    });
  }
  function ce(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.placement,
      o = n.boundary,
      i = n.rootBoundary,
      a = n.padding,
      s = n.flipVariations,
      f = n.allowedAutoPlacements,
      c = void 0 === f ? T : f,
      p = _(r),
      u = p
        ? s
          ? H
          : H.filter(function (e) {
              return _(e) === p;
            })
        : P,
      l = u.filter(function (e) {
        return c.indexOf(e) >= 0;
      });
    0 === l.length && (l = u);
    var d = l.reduce(function (t, n) {
      return (
        (t[n] = Y(e, {
          placement: n,
          boundary: o,
          rootBoundary: i,
          padding: a,
        })[C(n)]),
        t
      );
    }, {});
    return Object.keys(d).sort(function (e, t) {
      return d[e] - d[t];
    });
  }
  var pe = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (
          var o = n.mainAxis,
            i = void 0 === o || o,
            a = n.altAxis,
            s = void 0 === a || a,
            f = n.fallbackPlacements,
            c = n.padding,
            p = n.boundary,
            u = n.rootBoundary,
            l = n.altBoundary,
            d = n.flipVariations,
            h = void 0 === d || d,
            m = n.allowedAutoPlacements,
            v = t.options.placement,
            g = C(v),
            y =
              f ||
              (g === v || !h
                ? [ae(v)]
                : (function (e) {
                    if (C(e) === L) return [];
                    var t = ae(e);
                    return [fe(e), t, fe(t)];
                  })(v)),
            b = [v].concat(y).reduce(function (e, n) {
              return e.concat(
                C(n) === L
                  ? ce(t, {
                      placement: n,
                      boundary: p,
                      rootBoundary: u,
                      padding: c,
                      flipVariations: h,
                      allowedAutoPlacements: m,
                    })
                  : n
              );
            }, []),
            x = t.rects.reference,
            w = t.rects.popper,
            O = new Map(),
            P = !0,
            k = b[0],
            W = 0;
          W < b.length;
          W++
        ) {
          var B = b[W],
            H = C(B),
            T = _(B) === M,
            R = [j, E].indexOf(H) >= 0,
            S = R ? "width" : "height",
            q = Y(t, {
              placement: B,
              boundary: p,
              rootBoundary: u,
              altBoundary: l,
              padding: c,
            }),
            V = R ? (T ? D : A) : T ? E : j;
          x[S] > w[S] && (V = ae(V));
          var N = ae(V),
            I = [];
          if (
            (i && I.push(q[H] <= 0),
            s && I.push(q[V] <= 0, q[N] <= 0),
            I.every(function (e) {
              return e;
            }))
          ) {
            (k = B), (P = !1);
            break;
          }
          O.set(B, I);
        }
        if (P)
          for (
            var F = function (e) {
                var t = b.find(function (t) {
                  var n = O.get(t);
                  if (n)
                    return n.slice(0, e).every(function (e) {
                      return e;
                    });
                });
                if (t) return (k = t), "break";
              },
              U = h ? 3 : 1;
            U > 0;
            U--
          ) {
            if ("break" === F(U)) break;
          }
        t.placement !== k &&
          ((t.modifiersData[r]._skip = !0), (t.placement = k), (t.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  function ue(e, t, n) {
    return i(e, a(t, n));
  }
  var le = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        o = n.mainAxis,
        s = void 0 === o || o,
        f = n.altAxis,
        c = void 0 !== f && f,
        p = n.boundary,
        u = n.rootBoundary,
        l = n.altBoundary,
        d = n.padding,
        h = n.tether,
        m = void 0 === h || h,
        g = n.tetherOffset,
        y = void 0 === g ? 0 : g,
        b = Y(t, { boundary: p, rootBoundary: u, padding: d, altBoundary: l }),
        x = C(t.placement),
        w = _(t.placement),
        L = !w,
        P = F(x),
        k = "x" === P ? "y" : "x",
        W = t.modifiersData.popperOffsets,
        B = t.rects.reference,
        H = t.rects.popper,
        T =
          "function" == typeof y
            ? y(Object.assign({}, t.rects, { placement: t.placement }))
            : y,
        R =
          "number" == typeof T
            ? { mainAxis: T, altAxis: T }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
        S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        q = { x: 0, y: 0 };
      if (W) {
        if (s) {
          var V,
            N = "y" === P ? j : A,
            I = "y" === P ? E : D,
            U = "y" === P ? "height" : "width",
            z = W[P],
            X = z + b[N],
            G = z - b[I],
            J = m ? -H[U] / 2 : 0,
            K = w === M ? B[U] : H[U],
            Q = w === M ? -H[U] : -B[U],
            Z = t.elements.arrow,
            $ = m && Z ? v(Z) : { width: 0, height: 0 },
            ee = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            te = ee[N],
            ne = ee[I],
            re = ue(0, B[U], $[U]),
            oe = L
              ? B[U] / 2 - J - re - te - R.mainAxis
              : K - re - te - R.mainAxis,
            ie = L
              ? -B[U] / 2 + J + re + ne + R.mainAxis
              : Q + re + ne + R.mainAxis,
            ae = t.elements.arrow && O(t.elements.arrow),
            se = ae ? ("y" === P ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
            fe = null != (V = null == S ? void 0 : S[P]) ? V : 0,
            ce = z + ie - fe,
            pe = ue(m ? a(X, z + oe - fe - se) : X, z, m ? i(G, ce) : G);
          (W[P] = pe), (q[P] = pe - z);
        }
        if (c) {
          var le,
            de = "x" === P ? j : A,
            he = "x" === P ? E : D,
            me = W[k],
            ve = "y" === k ? "height" : "width",
            ge = me + b[de],
            ye = me - b[he],
            be = -1 !== [j, A].indexOf(x),
            xe = null != (le = null == S ? void 0 : S[k]) ? le : 0,
            we = be ? ge : me - B[ve] - H[ve] - xe + R.altAxis,
            Oe = be ? me + B[ve] + H[ve] - xe - R.altAxis : ye,
            je =
              m && be
                ? (function (e, t, n) {
                    var r = ue(e, t, n);
                    return r > n ? n : r;
                  })(we, me, Oe)
                : ue(m ? we : ge, me, m ? Oe : ye);
          (W[k] = je), (q[k] = je - me);
        }
        t.modifiersData[r] = q;
      }
    },
    requiresIfExists: ["offset"],
  };
  var de = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        r = e.name,
        o = e.options,
        i = n.elements.arrow,
        a = n.modifiersData.popperOffsets,
        s = C(n.placement),
        f = F(s),
        c = [A, D].indexOf(s) >= 0 ? "height" : "width";
      if (i && a) {
        var p = (function (e, t) {
            return z(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : X(e, P)
            );
          })(o.padding, n),
          u = v(i),
          l = "y" === f ? j : A,
          d = "y" === f ? E : D,
          h =
            n.rects.reference[c] +
            n.rects.reference[f] -
            a[f] -
            n.rects.popper[c],
          m = a[f] - n.rects.reference[f],
          g = O(i),
          y = g ? ("y" === f ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          x = p[l],
          w = y - u[c] - p[d],
          L = y / 2 - u[c] / 2 + b,
          M = ue(x, L, w),
          k = f;
        n.modifiersData[r] = (((t = {})[k] = M), (t.centerOffset = M - L), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        r = void 0 === n ? "[data-popper-arrow]" : n;
      null != r &&
        ("string" != typeof r || (r = t.elements.popper.querySelector(r))) &&
        q(t.elements.popper, r) &&
        (t.elements.arrow = r);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function he(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function me(e) {
    return [j, D, E, A].some(function (t) {
      return e[t] >= 0;
    });
  }
  var ve = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (e) {
        var t = e.state,
          n = e.name,
          r = t.rects.reference,
          o = t.rects.popper,
          i = t.modifiersData.preventOverflow,
          a = Y(t, { elementContext: "reference" }),
          s = Y(t, { altBoundary: !0 }),
          f = he(a, r),
          c = he(s, o, i),
          p = me(f),
          u = me(c);
        (t.modifiersData[n] = {
          referenceClippingOffsets: f,
          popperEscapeOffsets: c,
          isReferenceHidden: p,
          hasPopperEscaped: u,
        }),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            "data-popper-reference-hidden": p,
            "data-popper-escaped": u,
          }));
      },
    },
    ge = K({ defaultModifiers: [Z, $, ne, re] }),
    ye = [Z, $, ne, re, oe, pe, le, de, ve],
    be = K({ defaultModifiers: ye });
  (e.applyStyles = re),
    (e.arrow = de),
    (e.computeStyles = ne),
    (e.createPopper = be),
    (e.createPopperLite = ge),
    (e.defaultModifiers = ye),
    (e.detectOverflow = Y),
    (e.eventListeners = Z),
    (e.flip = pe),
    (e.hide = ve),
    (e.offset = oe),
    (e.popperGenerator = K),
    (e.popperOffsets = $),
    (e.preventOverflow = le),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=popper.min.js.map