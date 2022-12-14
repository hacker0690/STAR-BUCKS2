function trace(msg) {
    "undefined" != typeof console && "function" == typeof console.log && console.log(msg)
}! function($, undefined) {
    function focusable(element, isTabIndexNotNaN) {
        var nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            var img, map = element.parentNode,
                mapName = map.name;
            return !(!element.href || !mapName || "map" !== map.nodeName.toLowerCase()) && (img = $("img[usemap=#" + mapName + "]")[0], !!img && visible(img))
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" == nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
    }

    function visible(element) {
        return !$(element).parents().andSelf().filter(function() {
            return "hidden" === $.curCSS(this, "visibility") || $.expr.filters.hidden(this)
        }).length
    }
    $.ui = $.ui || {}, $.ui.version || ($.extend($.ui, {
        version: "1.8.16",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), $.fn.extend({
        propAttr: $.fn.prop || $.fn.attr,
        _focus: $.fn.focus,
        focus: function(delay, fn) {
            return "number" == typeof delay ? this.each(function() {
                var elem = this;
                setTimeout(function() {
                    $(elem).focus(), fn && fn.call(elem)
                }, delay)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var scrollParent;
            return scrollParent = $.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test($.curCSS(this, "position", 1)) && /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent
        },
        zIndex: function(zIndex) {
            if (zIndex !== undefined) return this.css("zIndex", zIndex);
            if (this.length)
                for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document;) {
                    if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
                    elem = elem.parent()
                }
            return 0
        },
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(event) {
                event.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), $.each(["Width", "Height"], function(i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.curCSS(elem, "padding" + this, !0)) || 0, border && (size -= parseFloat($.curCSS(elem, "border" + this + "Width", !0)) || 0), margin && (size -= parseFloat($.curCSS(elem, "margin" + this, !0)) || 0)
            }), size
        }
        var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"],
            type = name.toLowerCase(),
            orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };
        $.fn["inner" + name] = function(size) {
            return size === undefined ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px")
            })
        }, $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px")
            })
        }
    }), $.extend($.expr[":"], {
        data: function(elem, i, match) {
            return !!$.data(elem, match[3])
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    }), $(function() {
        var body = document.body,
            div = body.appendChild(div = document.createElement("div"));
        $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), $.support.minHeight = 100 === div.offsetHeight, $.support.selectstart = "onselectstart" in div, body.removeChild(div).style.display = "none"
    }), $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var proto = $.ui[module].prototype;
                for (var i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([option, set[i]])
            },
            call: function(instance, name, args) {
                var set = instance.plugins[name];
                if (set && instance.element[0].parentNode)
                    for (var i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? 16 & a.compareDocumentPosition(b) : a !== b && a.contains(b)
        },
        hasScroll: function(el, a) {
            if ("hidden" === $(el).css("overflow")) return !1;
            var scroll = a && "left" === a ? "scrollLeft" : "scrollTop",
                has = !1;
            return el[scroll] > 0 || (el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, has)
        },
        isOverAxis: function(x, reference, size) {
            return x > reference && x < reference + size
        },
        isOver: function(y, x, top, left, height, width) {
            return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width)
        }
    }))
}(jQuery),
function($, undefined) {
    if ($.cleanData) {
        var _cleanData = $.cleanData;
        $.cleanData = function(elems) {
            for (var elem, i = 0; null != (elem = elems[i]); i++) try {
                $(elem).triggerHandler("remove")
            } catch (e) {}
            _cleanData(elems)
        }
    } else {
        var _remove = $.fn.remove;
        $.fn.remove = function(selector, keepData) {
            return this.each(function() {
                return keepData || selector && !$.filter(selector, [this]).length || $("*", this).add([this]).each(function() {
                    try {
                        $(this).triggerHandler("remove")
                    } catch (e) {}
                }), _remove.call($(this), selector, keepData)
            })
        }
    }
    $.widget = function(name, base, prototype) {
        var fullName, namespace = name.split(".")[0];
        name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, base = $.Widget), $.expr[":"][fullName] = function(elem) {
            return !!$.data(elem, name)
        }, $[namespace] = $[namespace] || {}, $[namespace][name] = function(options, element) {
            arguments.length && this._createWidget(options, element)
        };
        var basePrototype = new base;
        basePrototype.options = $.extend(!0, {}, basePrototype.options), $[namespace][name].prototype = $.extend(!0, basePrototype, {
            namespace: namespace,
            widgetName: name,
            widgetEventPrefix: $[namespace][name].prototype.widgetEventPrefix || name,
            widgetBaseClass: fullName
        }, prototype), $.widget.bridge(name, $[namespace][name])
    }, $.widget.bridge = function(name, object) {
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options,
                args = Array.prototype.slice.call(arguments, 1),
                returnValue = this;
            return options = !isMethodCall && args.length ? $.extend.apply(null, [!0, options].concat(args)) : options, isMethodCall && "_" === options.charAt(0) ? returnValue : (isMethodCall ? this.each(function() {
                var instance = $.data(this, name),
                    methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;
                if (methodValue !== instance && methodValue !== undefined) return returnValue = methodValue, !1
            }) : this.each(function() {
                var instance = $.data(this, name);
                instance ? instance.option(options || {})._init() : $.data(this, name, new object(options, this))
            }), returnValue)
        }
    }, $.Widget = function(options, element) {
        arguments.length && this._createWidget(options, element)
    }, $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(options, element) {
            $.data(element, this.widgetName, this), this.element = $(element), this.options = $.extend(!0, {}, this.options, this._getCreateOptions(), options);
            var self = this;
            this.element.bind("remove." + this.widgetName, function() {
                self.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return $.metadata && $.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var options = key;
            if (0 === arguments.length) return $.extend({}, this.options);
            if ("string" == typeof key) {
                if (value === undefined) return this.options[key];
                options = {}, options[key] = value
            }
            return this._setOptions(options), this
        },
        _setOptions: function(options) {
            var self = this;
            return $.each(options, function(key, value) {
                self._setOption(key, value)
            }), this
        },
        _setOption: function(key, value) {
            return this.options[key] = value, "disabled" === key && this.widget()[value ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", value), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(type, event, data) {
            var callback = this.options[type];
            if (event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), data = data || {}, event.originalEvent)
                for (var prop, i = $.event.props.length; i;) prop = $.event.props[--i], event[prop] = event.originalEvent[prop];
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.call(this.element[0], event, data) === !1 || event.isDefaultPrevented())
        }
    }
}(jQuery),
function($, undefined) {
    var mouseHandled = !1;
    $(document).mouseup(function(e) {
        mouseHandled = !1
    }), $.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var self = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return self._mouseDown(event)
            }).bind("click." + this.widgetName, function(event) {
                if (!0 === $.data(event.target, self.widgetName + ".preventClickEvent")) return $.removeData(event.target, self.widgetName + ".preventClickEvent"), event.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(event) {
            if (!mouseHandled) {
                this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
                var self = this,
                    btnIsLeft = 1 == event.which,
                    elIsCancel = !("string" != typeof this.options.cancel || !event.target.nodeName) && $(event.target).closest(this.options.cancel).length;
                return !(btnIsLeft && !elIsCancel && this._mouseCapture(event)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    self.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1, !this._mouseStarted) ? (event.preventDefault(), !0) : (!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(event) {
                    return self._mouseMove(event)
                }, this._mouseUpDelegate = function(event) {
                    return self._mouseUp(event)
                }, $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), event.preventDefault(), mouseHandled = !0, !0))
            }
        },
        _mouseMove: function(event) {
            return !$.browser.msie || document.documentMode >= 9 || event.button ? this._mouseStarted ? (this._mouseDrag(event), event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1, this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted) : this._mouseUp(event)
        },
        _mouseUp: function(event) {
            return $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, event.target == this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(event)), !1
        },
        _mouseDistanceMet: function(event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(event) {
            return this.mouseDelayMet
        },
        _mouseStart: function(event) {},
        _mouseDrag: function(event) {},
        _mouseStop: function(event) {},
        _mouseCapture: function(event) {
            return !0
        }
    })
}(jQuery),
function($, undefined) {
    $.ui = $.ui || {};
    var horizontalPositions = /left|center|right/,
        verticalPositions = /top|center|bottom/,
        center = "center",
        _position = $.fn.position,
        _offset = $.fn.offset;
    $.fn.position = function(options) {
        if (!options || !options.of) return _position.apply(this, arguments);
        options = $.extend({}, options);
        var targetWidth, targetHeight, basePosition, target = $(options.of),
            targetElem = target[0],
            collision = (options.collision || "flip").split(" "),
            offset = options.offset ? options.offset.split(" ") : [0, 0];
        return 9 === targetElem.nodeType ? (targetWidth = target.width(), targetHeight = target.height(), basePosition = {
            top: 0,
            left: 0
        }) : targetElem.setTimeout ? (targetWidth = target.width(), targetHeight = target.height(), basePosition = {
            top: target.scrollTop(),
            left: target.scrollLeft()
        }) : targetElem.preventDefault ? (options.at = "left top", targetWidth = targetHeight = 0, basePosition = {
            top: options.of.pageY,
            left: options.of.pageX
        }) : (targetWidth = target.outerWidth(), targetHeight = target.outerHeight(), basePosition = target.offset()), $.each(["my", "at"], function() {
            var pos = (options[this] || "").split(" ");
            1 === pos.length && (pos = horizontalPositions.test(pos[0]) ? pos.concat([center]) : verticalPositions.test(pos[0]) ? [center].concat(pos) : [center, center]), pos[0] = horizontalPositions.test(pos[0]) ? pos[0] : center, pos[1] = verticalPositions.test(pos[1]) ? pos[1] : center, options[this] = pos
        }), 1 === collision.length && (collision[1] = collision[0]), offset[0] = parseInt(offset[0], 10) || 0, 1 === offset.length && (offset[1] = offset[0]), offset[1] = parseInt(offset[1], 10) || 0, "right" === options.at[0] ? basePosition.left += targetWidth : options.at[0] === center && (basePosition.left += targetWidth / 2), "bottom" === options.at[1] ? basePosition.top += targetHeight : options.at[1] === center && (basePosition.top += targetHeight / 2), basePosition.left += offset[0], basePosition.top += offset[1], this.each(function() {
            var collisionPosition, elem = $(this),
                elemWidth = elem.outerWidth(),
                elemHeight = elem.outerHeight(),
                marginLeft = parseInt($.curCSS(this, "marginLeft", !0)) || 0,
                marginTop = parseInt($.curCSS(this, "marginTop", !0)) || 0,
                collisionWidth = elemWidth + marginLeft + (parseInt($.curCSS(this, "marginRight", !0)) || 0),
                collisionHeight = elemHeight + marginTop + (parseInt($.curCSS(this, "marginBottom", !0)) || 0),
                position = $.extend({}, basePosition);
            "right" === options.my[0] ? position.left -= elemWidth : options.my[0] === center && (position.left -= elemWidth / 2), "bottom" === options.my[1] ? position.top -= elemHeight : options.my[1] === center && (position.top -= elemHeight / 2), position.left = Math.round(position.left), position.top = Math.round(position.top), collisionPosition = {
                left: position.left - marginLeft,
                top: position.top - marginTop
            }, $.each(["left", "top"], function(i, dir) {
                $.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
                    targetWidth: targetWidth,
                    targetHeight: targetHeight,
                    elemWidth: elemWidth,
                    elemHeight: elemHeight,
                    collisionPosition: collisionPosition,
                    collisionWidth: collisionWidth,
                    collisionHeight: collisionHeight,
                    offset: offset,
                    my: options.my,
                    at: options.at
                })
            }), $.fn.bgiframe && elem.bgiframe(), elem.offset($.extend(position, {
                using: options.using
            }))
        })
    }, $.ui.position = {
        fit: {
            left: function(position, data) {
                var win = $(window),
                    over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
                position.left = over > 0 ? position.left - over : Math.max(position.left - data.collisionPosition.left, position.left)
            },
            top: function(position, data) {
                var win = $(window),
                    over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
                position.top = over > 0 ? position.top - over : Math.max(position.top - data.collisionPosition.top, position.top)
            }
        },
        flip: {
            left: function(position, data) {
                if (data.at[0] !== center) {
                    var win = $(window),
                        over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(),
                        myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0,
                        atOffset = "left" === data.at[0] ? data.targetWidth : -data.targetWidth,
                        offset = -2 * data.offset[0];
                    position.left += data.collisionPosition.left < 0 ? myOffset + atOffset + offset : over > 0 ? myOffset + atOffset + offset : 0
                }
            },
            top: function(position, data) {
                if (data.at[1] !== center) {
                    var win = $(window),
                        over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(),
                        myOffset = "top" === data.my[1] ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0,
                        atOffset = "top" === data.at[1] ? data.targetHeight : -data.targetHeight,
                        offset = -2 * data.offset[1];
                    position.top += data.collisionPosition.top < 0 ? myOffset + atOffset + offset : over > 0 ? myOffset + atOffset + offset : 0
                }
            }
        }
    }, $.offset.setOffset || ($.offset.setOffset = function(elem, options) {
        /static/.test($.curCSS(elem, "position")) && (elem.style.position = "relative");
        var curElem = $(elem),
            curOffset = curElem.offset(),
            curTop = parseInt($.curCSS(elem, "top", !0), 10) || 0,
            curLeft = parseInt($.curCSS(elem, "left", !0), 10) || 0,
            props = {
                top: options.top - curOffset.top + curTop,
                left: options.left - curOffset.left + curLeft
            };
        "using" in options ? options.using.call(elem, props) : curElem.css(props)
    }, $.fn.offset = function(options) {
        var elem = this[0];
        return elem && elem.ownerDocument ? options ? this.each(function() {
            $.offset.setOffset(this, options)
        }) : _offset.call(this) : null
    })
}(jQuery),
function($, undefined) {
    $.widget("ui.resizable", $.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function() {
            var self = this,
                o = this.options;
            if (this.element.addClass("ui-resizable"), $.extend(this, {
                    _aspectRatio: !!o.aspectRatio,
                    aspectRatio: o.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (/relative/.test(this.element.css("position")) && $.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                }), this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor == String) {
                "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var n = this.handles.split(",");
                this.handles = {};
                for (var i = 0; i < n.length; i++) {
                    var handle = $.trim(n[i]),
                        hname = "ui-resizable-" + handle,
                        axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');
                    /sw|se|ne|nw/.test(handle) && axis.css({
                        zIndex: ++o.zIndex
                    }), "se" == handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[handle] = ".ui-resizable-" + handle, this.element.append(axis)
                }
            }
            this._renderAxis = function(target) {
                target = target || this.element;
                for (var i in this.handles) {
                    if (this.handles[i].constructor == String && (this.handles[i] = $(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var axis = $(this.handles[i], this.element),
                            padWrapper = 0;
                        padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
                        var padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                        target.css(padPos, padWrapper), this._proportionallyResize()
                    }
                    $(this.handles[i]).length
                }
            }, this._renderAxis(this.element), this._handles = $(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                if (!self.resizing) {
                    if (this.className) var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    self.axis = axis && axis[1] ? axis[1] : "se"
                }
            }), o.autoHide && (this._handles.hide(), $(this.element).addClass("ui-resizable-autohide").hover(function() {
                o.disabled || ($(this).removeClass("ui-resizable-autohide"), self._handles.show())
            }, function() {
                o.disabled || self.resizing || ($(this).addClass("ui-resizable-autohide"), self._handles.hide())
            })), this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var _destroy = function(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                _destroy(this.element);
                var wrapper = this.element;
                wrapper.after(this.originalElement.css({
                    position: wrapper.css("position"),
                    width: wrapper.outerWidth(),
                    height: wrapper.outerHeight(),
                    top: wrapper.css("top"),
                    left: wrapper.css("left")
                })).remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), _destroy(this.originalElement), this
        },
        _mouseCapture: function(event) {
            var handle = !1;
            for (var i in this.handles) $(this.handles[i])[0] == event.target && (handle = !0);
            return !this.options.disabled && handle
        },
        _mouseStart: function(event) {
            var o = this.options,
                iniPos = this.element.position(),
                el = this.element;
            this.resizing = !0, this.documentScroll = {
                top: $(document).scrollTop(),
                left: $(document).scrollLeft()
            }, (el.is(".ui-draggable") || /absolute/.test(el.css("position"))) && el.css({
                position: "absolute",
                top: iniPos.top,
                left: iniPos.left
            }), $.browser.opera && /relative/.test(el.css("position")) && el.css({
                position: "relative",
                top: "auto",
                left: "auto"
            }), this._renderProxy();
            var curleft = num(this.helper.css("left")),
                curtop = num(this.helper.css("top"));
            o.containment && (curleft += $(o.containment).scrollLeft() || 0, curtop += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: curleft,
                top: curtop
            }, this.size = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            }, this.originalSize = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            }, this.originalPosition = {
                left: curleft,
                top: curtop
            }, this.sizeDiff = {
                width: el.outerWidth() - el.width(),
                height: el.outerHeight() - el.height()
            }, this.originalMousePosition = {
                left: event.pageX,
                top: event.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var cursor = $(".ui-resizable-" + this.axis).css("cursor");
            return $("body").css("cursor", "auto" == cursor ? this.axis + "-resize" : cursor), el.addClass("ui-resizable-resizing"), this._propagate("start", event), !0
        },
        _mouseDrag: function(event) {
            var el = this.helper,
                smp = (this.options, this.originalMousePosition),
                a = this.axis,
                dx = event.pageX - smp.left || 0,
                dy = event.pageY - smp.top || 0,
                trigger = this._change[a];
            if (!trigger) return !1;
            var data = trigger.apply(this, [event, dx, dy]);
            $.browser.msie && $.browser.version < 7, this.sizeDiff;
            return this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), data = this._respectSize(data, event), this._propagate("resize", event), el.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(data), this._trigger("resize", event, this.ui()), !1
        },
        _mouseStop: function(event) {
            this.resizing = !1;
            var o = this.options,
                self = this;
            if (this._helper) {
                var pr = this._proportionallyResizeElements,
                    ista = pr.length && /textarea/i.test(pr[0].nodeName),
                    soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : self.sizeDiff.height,
                    soffsetw = ista ? 0 : self.sizeDiff.width,
                    s = {
                        width: self.helper.width() - soffsetw,
                        height: self.helper.height() - soffseth
                    },
                    left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null,
                    top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
                o.animate || this.element.css($.extend(s, {
                    top: top,
                    left: left
                })), self.helper.height(self.size.height), self.helper.width(self.size.width), this._helper && !o.animate && this._proportionallyResize()
            }
            return $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", event), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(forceAspectRatio) {
            var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
            b = {
                minWidth: isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
            }, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b
        },
        _updateCache: function(data) {
            this.options;
            this.offset = this.helper.offset(), isNumber(data.left) && (this.position.left = data.left), isNumber(data.top) && (this.position.top = data.top), isNumber(data.height) && (this.size.height = data.height), isNumber(data.width) && (this.size.width = data.width)
        },
        _updateRatio: function(data, event) {
            var cpos = (this.options, this.position),
                csize = this.size,
                a = this.axis;
            return isNumber(data.height) ? data.width = data.height * this.aspectRatio : isNumber(data.width) && (data.height = data.width / this.aspectRatio), "sw" == a && (data.left = cpos.left + (csize.width - data.width), data.top = null), "nw" == a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), data
        },
        _respectSize: function(data, event) {
            var o = (this.helper, this._vBoundaries),
                a = (this._aspectRatio || event.shiftKey, this.axis),
                ismaxw = isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
                ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
                isminw = isNumber(data.width) && o.minWidth && o.minWidth > data.width,
                isminh = isNumber(data.height) && o.minHeight && o.minHeight > data.height;
            isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), ismaxw && (data.width = o.maxWidth), ismaxh && (data.height = o.maxHeight);
            var dw = this.originalPosition.left + this.originalSize.width,
                dh = this.position.top + this.size.height,
                cw = /sw|nw|w/.test(a),
                ch = /nw|ne|n/.test(a);
            isminw && cw && (data.left = dw - o.minWidth), ismaxw && cw && (data.left = dw - o.maxWidth), isminh && ch && (data.top = dh - o.minHeight), ismaxh && ch && (data.top = dh - o.maxHeight);
            var isNotwh = !data.width && !data.height;
            return isNotwh && !data.left && data.top ? data.top = null : isNotwh && !data.top && data.left && (data.left = null), data
        },
        _proportionallyResize: function() {
            this.options;
            if (this._proportionallyResizeElements.length)
                for (var element = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                    var prel = this._proportionallyResizeElements[i];
                    if (!this.borderDif) {
                        var b = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")],
                            p = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")];
                        this.borderDif = $.map(b, function(v, i) {
                            var border = parseInt(v, 10) || 0,
                                padding = parseInt(p[i], 10) || 0;
                            return border + padding
                        })
                    }
                    $.browser.msie && ($(element).is(":hidden") || $(element).parents(":hidden").length) || prel.css({
                        height: element.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: element.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function() {
            var el = this.element,
                o = this.options;
            if (this.elementOffset = el.offset(), this._helper) {
                this.helper = this.helper || $('<div style="overflow:hidden;"></div>');
                var ie6 = $.browser.msie && $.browser.version < 7,
                    ie6offset = ie6 ? 1 : 0,
                    pxyoffset = ie6 ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + pxyoffset,
                    height: this.element.outerHeight() + pxyoffset,
                    position: "absolute",
                    left: this.elementOffset.left - ie6offset + "px",
                    top: this.elementOffset.top - ie6offset + "px",
                    zIndex: ++o.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(event, dx, dy) {
                return {
                    width: this.originalSize.width + dx
                }
            },
            w: function(event, dx, dy) {
                var cs = (this.options, this.originalSize),
                    sp = this.originalPosition;
                return {
                    left: sp.left + dx,
                    width: cs.width - dx
                }
            },
            n: function(event, dx, dy) {
                var cs = (this.options, this.originalSize),
                    sp = this.originalPosition;
                return {
                    top: sp.top + dy,
                    height: cs.height - dy
                }
            },
            s: function(event, dx, dy) {
                return {
                    height: this.originalSize.height + dy
                }
            },
            se: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            sw: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            },
            ne: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            nw: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            }
        },
        _propagate: function(n, event) {
            $.ui.plugin.call(this, n, [event, this.ui()]), "resize" != n && this._trigger(n, event, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), $.extend($.ui.resizable, {
        version: "1.8.16"
    }), $.ui.plugin.add("resizable", "alsoResize", {
        start: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                _store = function(exp) {
                    $(exp).each(function() {
                        var el = $(this);
                        el.data("resizable-alsoresize", {
                            width: parseInt(el.width(), 10),
                            height: parseInt(el.height(), 10),
                            left: parseInt(el.css("left"), 10),
                            top: parseInt(el.css("top"), 10),
                            position: el.css("position")
                        })
                    })
                };
            "object" != typeof o.alsoResize || o.alsoResize.parentNode ? _store(o.alsoResize) : o.alsoResize.length ? (o.alsoResize = o.alsoResize[0], _store(o.alsoResize)) : $.each(o.alsoResize, function(exp) {
                _store(exp)
            })
        },
        resize: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                os = self.originalSize,
                op = self.originalPosition,
                delta = {
                    height: self.size.height - os.height || 0,
                    width: self.size.width - os.width || 0,
                    top: self.position.top - op.top || 0,
                    left: self.position.left - op.left || 0
                },
                _alsoResize = function(exp, c) {
                    $(exp).each(function() {
                        var el = $(this),
                            start = $(this).data("resizable-alsoresize"),
                            style = {},
                            css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        $.each(css, function(i, prop) {
                            var sum = (start[prop] || 0) + (delta[prop] || 0);
                            sum && sum >= 0 && (style[prop] = sum || null)
                        }), $.browser.opera && /relative/.test(el.css("position")) && (self._revertToRelativePosition = !0, el.css({
                            position: "absolute",
                            top: "auto",
                            left: "auto"
                        })), el.css(style)
                    })
                };
            "object" != typeof o.alsoResize || o.alsoResize.nodeType ? _alsoResize(o.alsoResize) : $.each(o.alsoResize, function(exp, c) {
                _alsoResize(exp, c)
            })
        },
        stop: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                _reset = function(exp) {
                    $(exp).each(function() {
                        var el = $(this);
                        el.css({
                            position: el.data("resizable-alsoresize").position
                        })
                    })
                };
            self._revertToRelativePosition && (self._revertToRelativePosition = !1, "object" != typeof o.alsoResize || o.alsoResize.nodeType ? _reset(o.alsoResize) : $.each(o.alsoResize, function(exp) {
                _reset(exp)
            })), $(this).removeData("resizable-alsoresize")
        }
    }), $.ui.plugin.add("resizable", "animate", {
        stop: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                pr = self._proportionallyResizeElements,
                ista = pr.length && /textarea/i.test(pr[0].nodeName),
                soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : self.sizeDiff.height,
                soffsetw = ista ? 0 : self.sizeDiff.width,
                style = {
                    width: self.size.width - soffsetw,
                    height: self.size.height - soffseth
                },
                left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null,
                top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
            self.element.animate($.extend(style, top && left ? {
                top: top,
                left: left
            } : {}), {
                duration: o.animateDuration,
                easing: o.animateEasing,
                step: function() {
                    var data = {
                        width: parseInt(self.element.css("width"), 10),
                        height: parseInt(self.element.css("height"), 10),
                        top: parseInt(self.element.css("top"), 10),
                        left: parseInt(self.element.css("left"), 10)
                    };
                    pr && pr.length && $(pr[0]).css({
                        width: data.width,
                        height: data.height
                    }), self._updateCache(data), self._propagate("resize", event)
                }
            })
        }
    }), $.ui.plugin.add("resizable", "containment", {
        start: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                el = self.element,
                oc = o.containment,
                ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
            if (ce)
                if (self.containerElement = $(ce), /document/.test(oc) || oc == document) self.containerOffset = {
                    left: 0,
                    top: 0
                }, self.containerPosition = {
                    left: 0,
                    top: 0
                }, self.parentData = {
                    element: $(document),
                    left: 0,
                    top: 0,
                    width: $(document).width(),
                    height: $(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var element = $(ce),
                        p = [];
                    $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
                        p[i] = num(element.css("padding" + name))
                    }), self.containerOffset = element.offset(), self.containerPosition = element.position(), self.containerSize = {
                        height: element.innerHeight() - p[3],
                        width: element.innerWidth() - p[1]
                    };
                    var co = self.containerOffset,
                        ch = self.containerSize.height,
                        cw = self.containerSize.width,
                        width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw,
                        height = $.ui.hasScroll(ce) ? ce.scrollHeight : ch;
                    self.parentData = {
                        element: ce,
                        left: co.left,
                        top: co.top,
                        width: width,
                        height: height
                    }
                }
        },
        resize: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                co = (self.containerSize, self.containerOffset),
                cp = (self.size, self.position),
                pRatio = self._aspectRatio || event.shiftKey,
                cop = {
                    top: 0,
                    left: 0
                },
                ce = self.containerElement;
            ce[0] != document && /static/.test(ce.css("position")) && (cop = co), cp.left < (self._helper ? co.left : 0) && (self.size.width = self.size.width + (self._helper ? self.position.left - co.left : self.position.left - cop.left), pRatio && (self.size.height = self.size.width / o.aspectRatio), self.position.left = o.helper ? co.left : 0), cp.top < (self._helper ? co.top : 0) && (self.size.height = self.size.height + (self._helper ? self.position.top - co.top : self.position.top), pRatio && (self.size.width = self.size.height * o.aspectRatio), self.position.top = self._helper ? co.top : 0), self.offset.left = self.parentData.left + self.position.left, self.offset.top = self.parentData.top + self.position.top;
            var woset = Math.abs((self._helper ? self.offset.left - cop.left : self.offset.left - cop.left) + self.sizeDiff.width),
                hoset = Math.abs((self._helper ? self.offset.top - cop.top : self.offset.top - co.top) + self.sizeDiff.height),
                isParent = self.containerElement.get(0) == self.element.parent().get(0),
                isOffsetRelative = /relative|absolute/.test(self.containerElement.css("position"));
            isParent && isOffsetRelative && (woset -= self.parentData.left), woset + self.size.width >= self.parentData.width && (self.size.width = self.parentData.width - woset, pRatio && (self.size.height = self.size.width / self.aspectRatio)), hoset + self.size.height >= self.parentData.height && (self.size.height = self.parentData.height - hoset, pRatio && (self.size.width = self.size.height * self.aspectRatio))
        },
        stop: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                co = (self.position, self.containerOffset),
                cop = self.containerPosition,
                ce = self.containerElement,
                helper = $(self.helper),
                ho = helper.offset(),
                w = helper.outerWidth() - self.sizeDiff.width,
                h = helper.outerHeight() - self.sizeDiff.height;
            self._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            }), self._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            })
        }
    }), $.ui.plugin.add("resizable", "ghost", {
        start: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                cs = self.size;
            self.ghost = self.originalElement.clone(), self.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost : ""), self.ghost.appendTo(self.helper)
        },
        resize: function(event, ui) {
            var self = $(this).data("resizable");
            self.options;
            self.ghost && self.ghost.css({
                position: "relative",
                height: self.size.height,
                width: self.size.width
            })
        },
        stop: function(event, ui) {
            var self = $(this).data("resizable");
            self.options;
            self.ghost && self.helper && self.helper.get(0).removeChild(self.ghost.get(0))
        }
    }), $.ui.plugin.add("resizable", "grid", {
        resize: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                cs = self.size,
                os = self.originalSize,
                op = self.originalPosition,
                a = self.axis;
            o._aspectRatio || event.shiftKey;
            o.grid = "number" == typeof o.grid ? [o.grid, o.grid] : o.grid;
            var ox = Math.round((cs.width - os.width) / (o.grid[0] || 1)) * (o.grid[0] || 1),
                oy = Math.round((cs.height - os.height) / (o.grid[1] || 1)) * (o.grid[1] || 1);
            /^(se|s|e)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy) : /^(ne)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy, self.position.top = op.top - oy) : /^(sw)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy, self.position.left = op.left - ox) : (self.size.width = os.width + ox, self.size.height = os.height + oy, self.position.top = op.top - oy, self.position.left = op.left - ox)
        }
    });
    var num = function(v) {
            return parseInt(v, 10) || 0
        },
        isNumber = function(value) {
            return !isNaN(parseInt(value, 10))
        }
}(jQuery),
function($, undefined) {
    $.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: !0,
            clearStyle: !1,
            collapsible: !1,
            event: "click",
            fillSpace: !1,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: !1,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function() {
            var self = this,
                options = self.options;
            if (self.running = 0, self.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), self.headers = self.element.find(options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                    options.disabled || $(this).addClass("ui-state-hover")
                }).bind("mouseleave.accordion", function() {
                    options.disabled || $(this).removeClass("ui-state-hover")
                }).bind("focus.accordion", function() {
                    options.disabled || $(this).addClass("ui-state-focus")
                }).bind("blur.accordion", function() {
                    options.disabled || $(this).removeClass("ui-state-focus")
                }), self.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), options.navigation) {
                var current = self.element.find("a").filter(options.navigationFilter).eq(0);
                if (current.length) {
                    var header = current.closest(".ui-accordion-header");
                    header.length ? self.active = header : self.active = current.closest(".ui-accordion-content").prev()
                }
            }
            self.active = self._findActive(self.active || options.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), self.active.next().addClass("ui-accordion-content-active"), self._createIcons(), self.resize(), self.element.attr("role", "tablist"), self.headers.attr("role", "tab").bind("keydown.accordion", function(event) {
                return self._keydown(event)
            }).next().attr("role", "tabpanel"), self.headers.not(self.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide(), self.active.length ? self.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : self.headers.eq(0).attr("tabIndex", 0), $.browser.safari || self.headers.find("a").attr("tabIndex", -1), options.event && self.headers.bind(options.event.split(" ").join(".accordion ") + ".accordion", function(event) {
                self._clickHandler.call(self, event, this), event.preventDefault()
            })
        },
        _createIcons: function() {
            var options = this.options;
            options.icons && ($("<span></span>").addClass("ui-icon " + options.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(options.icons.header).toggleClass(options.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
        },
        destroy: function() {
            var options = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
            var contents = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            return (options.autoHeight || options.fillHeight) && contents.css("height", ""), $.Widget.prototype.destroy.call(this)
        },
        _setOption: function(key, value) {
            $.Widget.prototype._setOption.apply(this, arguments), "active" == key && this.activate(value), "icons" == key && (this._destroyIcons(), value && this._createIcons()), "disabled" == key && this.headers.add(this.headers.next())[value ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function(event) {
            if (!(this.options.disabled || event.altKey || event.ctrlKey)) {
                var keyCode = $.ui.keyCode,
                    length = this.headers.length,
                    currentIndex = this.headers.index(event.target),
                    toFocus = !1;
                switch (event.keyCode) {
                    case keyCode.RIGHT:
                    case keyCode.DOWN:
                        toFocus = this.headers[(currentIndex + 1) % length];
                        break;
                    case keyCode.LEFT:
                    case keyCode.UP:
                        toFocus = this.headers[(currentIndex - 1 + length) % length];
                        break;
                    case keyCode.SPACE:
                    case keyCode.ENTER:
                        this._clickHandler({
                            target: event.target
                        }, event.target), event.preventDefault()
                }
                return !toFocus || ($(event.target).attr("tabIndex", -1), $(toFocus).attr("tabIndex", 0), toFocus.focus(), !1)
            }
        },
        resize: function() {
            var maxHeight, options = this.options;
            if (options.fillSpace) {
                if ($.browser.msie) {
                    var defOverflow = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                maxHeight = this.element.parent().height(), $.browser.msie && this.element.parent().css("overflow", defOverflow), this.headers.each(function() {
                    maxHeight -= $(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
                }).css("overflow", "auto")
            } else options.autoHeight && (maxHeight = 0, this.headers.next().each(function() {
                maxHeight = Math.max(maxHeight, $(this).height("").height())
            }).height(maxHeight));
            return this
        },
        activate: function(index) {
            this.options.active = index;
            var active = this._findActive(index)[0];
            return this._clickHandler({
                target: active
            }, active), this
        },
        _findActive: function(selector) {
            return selector ? "number" == typeof selector ? this.headers.filter(":eq(" + selector + ")") : this.headers.not(this.headers.not(selector)) : selector === !1 ? $([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function(event, target) {
            var options = this.options;
            if (!options.disabled) {
                if (!event.target) {
                    if (!options.collapsible) return;
                    this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), this.active.next().addClass("ui-accordion-content-active");
                    var toHide = this.active.next(),
                        data = {
                            options: options,
                            newHeader: $([]),
                            oldHeader: options.active,
                            newContent: $([]),
                            oldContent: toHide
                        },
                        toShow = this.active = $([]);
                    return void this._toggle(toShow, toHide, data)
                }
                var clicked = $(event.currentTarget || target),
                    clickedIsActive = clicked[0] === this.active[0];
                if (options.active = (!options.collapsible || !clickedIsActive) && this.headers.index(clicked), !(this.running || !options.collapsible && clickedIsActive)) {
                    var active = this.active,
                        toShow = clicked.next(),
                        toHide = this.active.next(),
                        data = {
                            options: options,
                            newHeader: clickedIsActive && options.collapsible ? $([]) : clicked,
                            oldHeader: this.active,
                            newContent: clickedIsActive && options.collapsible ? $([]) : toShow,
                            oldContent: toHide
                        },
                        down = this.headers.index(this.active[0]) > this.headers.index(clicked[0]);
                    this.active = clickedIsActive ? $([]) : clicked, this._toggle(toShow, toHide, data, clickedIsActive, down), active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), clickedIsActive || (clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(options.icons.header).addClass(options.icons.headerSelected), clicked.next().addClass("ui-accordion-content-active"))
                }
            }
        },
        _toggle: function(toShow, toHide, data, clickedIsActive, down) {
            var self = this,
                options = self.options;
            self.toShow = toShow, self.toHide = toHide, self.data = data;
            var complete = function() {
                if (self) return self._completed.apply(self, arguments)
            };
            if (self._trigger("changestart", null, self.data), self.running = 0 === toHide.size() ? toShow.size() : toHide.size(), options.animated) {
                var animOptions = {};
                animOptions = options.collapsible && clickedIsActive ? {
                    toShow: $([]),
                    toHide: toHide,
                    complete: complete,
                    down: down,
                    autoHeight: options.autoHeight || options.fillSpace
                } : {
                    toShow: toShow,
                    toHide: toHide,
                    complete: complete,
                    down: down,
                    autoHeight: options.autoHeight || options.fillSpace
                }, options.proxied || (options.proxied = options.animated), options.proxiedDuration || (options.proxiedDuration = options.duration), options.animated = $.isFunction(options.proxied) ? options.proxied(animOptions) : options.proxied, options.duration = $.isFunction(options.proxiedDuration) ? options.proxiedDuration(animOptions) : options.proxiedDuration;
                var animations = $.ui.accordion.animations,
                    duration = options.duration,
                    easing = options.animated;
                !easing || animations[easing] || $.easing[easing] || (easing = "slide"), animations[easing] || (animations[easing] = function(options) {
                    this.slide(options, {
                        easing: easing,
                        duration: duration || 700
                    })
                }), animations[easing](animOptions)
            } else options.collapsible && clickedIsActive ? toShow.toggle() : (toHide.hide(), toShow.show()), complete(!0);
            toHide.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur(), toShow.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function(cancel) {
            this.running = cancel ? 0 : --this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
                height: "",
                overflow: ""
            }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
        }
    }), $.extend($.ui.accordion, {
        version: "1.8.16",
        animations: {
            slide: function(options, additions) {
                if (options = $.extend({
                        easing: "swing",
                        duration: 300
                    }, options, additions), !options.toHide.size()) return void options.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                }, options);
                if (!options.toShow.size()) return void options.toHide.animate({
                    height: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                }, options);
                var originalWidth, overflow = options.toShow.css("overflow"),
                    percentDone = 0,
                    showProps = {},
                    hideProps = {},
                    fxAttrs = ["height", "paddingTop", "paddingBottom"],
                    s = options.toShow;
                originalWidth = s[0].style.width, s.width(parseInt(s.parent().width(), 10) - parseInt(s.css("paddingLeft"), 10) - parseInt(s.css("paddingRight"), 10) - (parseInt(s.css("borderLeftWidth"), 10) || 0) - (parseInt(s.css("borderRightWidth"), 10) || 0)), $.each(fxAttrs, function(i, prop) {
                    hideProps[prop] = "hide";
                    var parts = ("" + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
                    showProps[prop] = {
                        value: parts[1],
                        unit: parts[2] || "px"
                    }
                }), options.toShow.css({
                    height: 0,
                    overflow: "hidden"
                }).show(), options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps, {
                    step: function(now, settings) {
                        "height" == settings.prop && (percentDone = settings.end - settings.start === 0 ? 0 : (settings.now - settings.start) / (settings.end - settings.start)), options.toShow[0].style[settings.prop] = percentDone * showProps[settings.prop].value + showProps[settings.prop].unit
                    },
                    duration: options.duration,
                    easing: options.easing,
                    complete: function() {
                        options.autoHeight || options.toShow.css("height", ""), options.toShow.css({
                            width: originalWidth,
                            overflow: overflow
                        }), options.complete()
                    }
                })
            },
            bounceslide: function(options) {
                this.slide(options, {
                    easing: options.down ? "easeOutBounce" : "swing",
                    duration: options.down ? 1e3 : 200
                })
            }
        }
    })
}(jQuery),
function($, undefined) {
    var requestIndex = 0;
    $.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function() {
            var suppressKeyPress, self = this,
                doc = this.element[0].ownerDocument;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function(event) {
                if (!self.options.disabled && !self.element.propAttr("readOnly")) {
                    suppressKeyPress = !1;
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                        case keyCode.PAGE_UP:
                            self._move("previousPage", event);
                            break;
                        case keyCode.PAGE_DOWN:
                            self._move("nextPage", event);
                            break;
                        case keyCode.UP:
                            self._move("previous", event), event.preventDefault();
                            break;
                        case keyCode.DOWN:
                            self._move("next", event), event.preventDefault();
                            break;
                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                            self.menu.active && (suppressKeyPress = !0, event.preventDefault());
                        case keyCode.TAB:
                            if (!self.menu.active) return;
                            self.menu.select(event);
                            break;
                        case keyCode.ESCAPE:
                            self.element.val(self.term), self.close(event);
                            break;
                        default:
                            clearTimeout(self.searching), self.searching = setTimeout(function() {
                                self.term != self.element.val() && (self.selectedItem = null, self.search(null, event))
                            }, self.options.delay)
                    }
                }
            }).bind("keypress.autocomplete", function(event) {
                suppressKeyPress && (suppressKeyPress = !1, event.preventDefault())
            }).bind("focus.autocomplete", function() {
                self.options.disabled || (self.selectedItem = null, self.previous = self.element.val())
            }).bind("blur.autocomplete", function(event) {
                self.options.disabled || (clearTimeout(self.searching), self.closing = setTimeout(function() {
                    self.close(event), self._change(event)
                }, 150))
            }), this._initSource(), this.response = function() {
                return self._response.apply(self, arguments)
            }, this.menu = $("<ul></ul>").addClass("ui-autocomplete").appendTo($(this.options.appendTo || "body", doc)[0]).mousedown(function(event) {
                var menuElement = self.menu.element[0];
                $(event.target).closest(".ui-menu-item").length || setTimeout(function() {
                    $(document).one("mousedown", function(event) {
                        event.target === self.element[0] || event.target === menuElement || $.ui.contains(menuElement, event.target) || self.close()
                    })
                }, 1), setTimeout(function() {
                    clearTimeout(self.closing)
                }, 13)
            }).menu({
                focus: function(event, ui) {
                    var item = ui.item.data("item.autocomplete");
                    !1 !== self._trigger("focus", event, {
                        item: item
                    }) && /^key/.test(event.originalEvent.type) && self.element.val(item.value)
                },
                selected: function(event, ui) {
                    var item = ui.item.data("item.autocomplete"),
                        previous = self.previous;
                    self.element[0] !== doc.activeElement && (self.element.focus(), self.previous = previous, setTimeout(function() {
                        self.previous = previous, self.selectedItem = item
                    }, 1)), !1 !== self._trigger("select", event, {
                        item: item
                    }) && self.element.val(item.value), self.term = self.element.val(), self.close(event), self.selectedItem = item
                },
                blur: function(event, ui) {
                    self.menu.element.is(":visible") && self.element.val() !== self.term && self.element.val(self.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu"), $.fn.bgiframe && this.menu.element.bgiframe()
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), $.Widget.prototype.destroy.call(this)
        },
        _setOption: function(key, value) {
            $.Widget.prototype._setOption.apply(this, arguments), "source" === key && this._initSource(), "appendTo" === key && this.menu.element.appendTo($(value || "body", this.element[0].ownerDocument)[0]), "disabled" === key && value && this.xhr && this.xhr.abort()
        },
        _initSource: function() {
            var array, url, self = this;
            $.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
                response($.ui.autocomplete.filter(array, request.term))
            }) : "string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
                self.xhr && self.xhr.abort(), self.xhr = $.ajax({
                    url: url,
                    data: request,
                    dataType: "json",
                    autocompleteRequest: ++requestIndex,
                    success: function(data, status) {
                        this.autocompleteRequest === requestIndex && response(data)
                    },
                    error: function() {
                        this.autocompleteRequest === requestIndex && response([])
                    }
                })
            }) : this.source = this.options.source
        },
        search: function(value, event) {
            return value = null != value ? value : this.element.val(), this.term = this.element.val(), value.length < this.options.minLength ? this.close(event) : (clearTimeout(this.closing), this._trigger("search", event) !== !1 ? this._search(value) : void 0)
        },
        _search: function(value) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                term: value
            }, this.response)
        },
        _response: function(content) {
            !this.options.disabled && content && content.length ? (content = this._normalize(content), this._suggest(content), this._trigger("open")) : this.close(), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function(event) {
            clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", event))
        },
        _change: function(event) {
            this.previous !== this.element.val() && this._trigger("change", event, {
                item: this.selectedItem
            })
        },
        _normalize: function(items) {
            return items.length && items[0].label && items[0].value ? items : $.map(items, function(item) {
                return "string" == typeof item ? {
                    label: item,
                    value: item
                } : $.extend({
                    label: item.label || item.value,
                    value: item.value || item.label
                }, item)
            })
        },
        _suggest: function(items) {
            var ul = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(ul, items), this.menu.deactivate(), this.menu.refresh(), ul.show(), this._resizeMenu(), ul.position($.extend({ of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next(new $.Event("mouseover"))
        },
        _resizeMenu: function() {
            var ul = this.menu.element;
            ul.outerWidth(Math.max(ul.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function(ul, items) {
            var self = this;
            $.each(items, function(index, item) {
                self._renderItem(ul, item)
            })
        },
        _renderItem: function(ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").text(item.label)).appendTo(ul)
        },
        _move: function(direction, event) {
            return this.menu.element.is(":visible") ? this.menu.first() && /^previous/.test(direction) || this.menu.last() && /^next/.test(direction) ? (this.element.val(this.term), void this.menu.deactivate()) : void this.menu[direction](event) : void this.search(null, event)
        },
        widget: function() {
            return this.menu.element
        }
    }), $.extend($.ui.autocomplete, {
        escapeRegex: function(value) {
            return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        filter: function(array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function(value) {
                return matcher.test(value.label || value.value || value)
            })
        }
    })
}(jQuery),
function($) {
    $.widget("ui.menu", {
        _create: function() {
            var self = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(event) {
                $(event.target).closest(".ui-menu-item a").length && (event.preventDefault(), self.select(event))
            }), this.refresh()
        },
        refresh: function() {
            var self = this,
                items = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
            items.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(event) {
                self.activate(event, $(this).parent())
            }).mouseleave(function() {
                self.deactivate()
            })
        },
        activate: function(event, item) {
            if (this.deactivate(), this.hasScroll()) {
                var offset = item.offset().top - this.element.offset().top,
                    scroll = this.element.scrollTop(),
                    elementHeight = this.element.height();
                offset < 0 ? this.element.scrollTop(scroll + offset) : offset >= elementHeight && this.element.scrollTop(scroll + offset - elementHeight + item.height())
            }
            this.active = item.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", event, {
                item: item
            })
        },
        deactivate: function() {
            this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null)
        },
        next: function(event) {
            this.move("next", ".ui-menu-item:first", event)
        },
        previous: function(event) {
            this.move("prev", ".ui-menu-item:last", event)
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function(direction, edge, event) {
            if (!this.active) return void this.activate(event, this.element.children(edge));
            var next = this.active[direction + "All"](".ui-menu-item").eq(0);
            next.length ? this.activate(event, next) : this.activate(event, this.element.children(edge))
        },
        nextPage: function(event) {
            if (this.hasScroll()) {
                if (!this.active || this.last()) return void this.activate(event, this.element.children(".ui-menu-item:first"));
                var base = this.active.offset().top,
                    height = this.element.height(),
                    result = this.element.children(".ui-menu-item").filter(function() {
                        var close = $(this).offset().top - base - height + $(this).height();
                        return close < 10 && close > -10
                    });
                result.length || (result = this.element.children(".ui-menu-item:last")), this.activate(event, result)
            } else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        },
        previousPage: function(event) {
            if (this.hasScroll()) {
                if (!this.active || this.first()) return void this.activate(event, this.element.children(".ui-menu-item:last"));
                var base = this.active.offset().top,
                    height = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function() {
                    var close = $(this).offset().top - base + height - $(this).height();
                    return close < 10 && close > -10
                }), result.length || (result = this.element.children(".ui-menu-item:first")), this.activate(event, result)
            } else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        },
        hasScroll: function() {
            return this.element.height() < this.element[$.fn.prop ? "prop" : "attr"]("scrollHeight")
        },
        select: function(event) {
            this._trigger("selected", event, {
                item: this.active
            })
        }
    })
}(jQuery),
function($, undefined) {
    var lastActive, startXPos, startYPos, clickDragged, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
        stateClasses = "ui-state-hover ui-state-active ",
        typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        formResetHandler = function() {
            var buttons = $(this).find(":ui-button");
            setTimeout(function() {
                buttons.button("refresh")
            }, 1)
        },
        radioGroup = function(radio) {
            var name = radio.name,
                form = radio.form,
                radios = $([]);
            return name && (radios = form ? $(form).find("[name='" + name + "']") : $("[name='" + name + "']", radio.ownerDocument).filter(function() {
                return !this.form
            })), radios
        };
    $.widget("ui.button", {
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset.button").bind("reset.button", formResetHandler), "boolean" != typeof this.options.disabled && (this.options.disabled = this.element.propAttr("disabled")), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var self = this,
                options = this.options,
                toggleButton = "checkbox" === this.type || "radio" === this.type,
                hoverClass = "ui-state-hover" + (toggleButton ? "" : " ui-state-active"),
                focusClass = "ui-state-focus";
            null === options.label && (options.label = this.buttonElement.html()), this.element.is(":disabled") && (options.disabled = !0), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter.button", function() {
                options.disabled || ($(this).addClass("ui-state-hover"), this === lastActive && $(this).addClass("ui-state-active"))
            }).bind("mouseleave.button", function() {
                options.disabled || $(this).removeClass(hoverClass)
            }).bind("click.button", function(event) {
                options.disabled && (event.preventDefault(), event.stopImmediatePropagation())
            }), this.element.bind("focus.button", function() {
                self.buttonElement.addClass(focusClass)
            }).bind("blur.button", function() {
                self.buttonElement.removeClass(focusClass)
            }), toggleButton && (this.element.bind("change.button", function() {
                clickDragged || self.refresh()
            }), this.buttonElement.bind("mousedown.button", function(event) {
                options.disabled || (clickDragged = !1, startXPos = event.pageX, startYPos = event.pageY)
            }).bind("mouseup.button", function(event) {
                options.disabled || startXPos === event.pageX && startYPos === event.pageY || (clickDragged = !0)
            })), "checkbox" === this.type ? this.buttonElement.bind("click.button", function() {
                return !options.disabled && !clickDragged && ($(this).toggleClass("ui-state-active"), void self.buttonElement.attr("aria-pressed", self.element[0].checked))
            }) : "radio" === this.type ? this.buttonElement.bind("click.button", function() {
                if (options.disabled || clickDragged) return !1;
                $(this).addClass("ui-state-active"), self.buttonElement.attr("aria-pressed", "true");
                var radio = self.element[0];
                radioGroup(radio).not(radio).map(function() {
                    return $(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown.button", function() {
                return !options.disabled && ($(this).addClass("ui-state-active"), lastActive = this, void $(document).one("mouseup", function() {
                    lastActive = null
                }))
            }).bind("mouseup.button", function() {
                return !options.disabled && void $(this).removeClass("ui-state-active")
            }).bind("keydown.button", function(event) {
                return !options.disabled && void(event.keyCode != $.ui.keyCode.SPACE && event.keyCode != $.ui.keyCode.ENTER || $(this).addClass("ui-state-active"))
            }).bind("keyup.button", function() {
                $(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
                event.keyCode === $.ui.keyCode.SPACE && $(this).click()
            })), this._setOption("disabled", options.disabled), this._resetButton()
        },
        _determineButtonType: function() {
            if (this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type) {
                var ancestor = this.element.parents().filter(":last"),
                    labelSelector = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = ancestor.find(labelSelector), this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings(), this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), this.element.addClass("ui-helper-hidden-accessible");
                var checked = this.element.is(":checked");
                checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", checked)
            } else this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " " + stateClasses + " " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), $.Widget.prototype.destroy.call(this)
        },
        _setOption: function(key, value) {
            return $.Widget.prototype._setOption.apply(this, arguments), "disabled" === key ? void(value ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1)) : void this._resetButton()
        },
        refresh: function() {
            var isDisabled = this.element.is(":disabled");
            isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), "radio" === this.type ? radioGroup(this.element[0]).each(function() {
                $(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
            var buttonElement = this.buttonElement.removeClass(typeClasses),
                buttonText = $("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),
                icons = this.options.icons,
                multipleIcons = icons.primary && icons.secondary,
                buttonClasses = [];
            icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary")),
                icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || buttonElement.attr("title", buttonText))) : buttonClasses.push("ui-button-text-only"), buttonElement.addClass(buttonClasses.join(" "))
        }
    }), $.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(key, value) {
            "disabled" === key && this.buttons.button("option", key, value), $.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function() {
            var ltr = "ltr" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(ltr ? "ui-corner-left" : "ui-corner-right").end().filter(":last").addClass(ltr ? "ui-corner-right" : "ui-corner-left").end().end()
        },
        destroy: function() {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), $.Widget.prototype.destroy.call(this)
        }
    })
}(jQuery),
function($, undefined) {
    var uiDialogClasses = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
        sizeRelatedOptions = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        attrFn = $.attrFn || {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0,
            click: !0
        };
    $.widget("ui.dialog", {
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    topOffset < 0 && $(this).css("top", pos.top - topOffset)
                }
            },
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1e3
        },
        _create: function() {
            this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
            var self = this,
                options = self.options,
                title = options.title || "&#160;",
                titleId = $.ui.dialog.getTitleId(self.element),
                uiDialog = (self.uiDialog = $("<div></div>")).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({
                    zIndex: options.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function(event) {
                    options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (self.close(event), event.preventDefault())
                }).attr({
                    role: "dialog",
                    "aria-labelledby": titleId
                }).mousedown(function(event) {
                    self.moveToTop(!1, event)
                }),
                uiDialogTitlebar = (self.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(uiDialog), (self.uiDialogTitlebar = $("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(uiDialog)),
                uiDialogTitlebarClose = $('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                    uiDialogTitlebarClose.addClass("ui-state-hover")
                }, function() {
                    uiDialogTitlebarClose.removeClass("ui-state-hover")
                }).focus(function() {
                    uiDialogTitlebarClose.addClass("ui-state-focus")
                }).blur(function() {
                    uiDialogTitlebarClose.removeClass("ui-state-focus")
                }).click(function(event) {
                    return self.close(event), !1
                }).appendTo(uiDialogTitlebar);
            (self.uiDialogTitlebarCloseText = $("<span></span>")).addClass("ui-icon ui-icon-closethick").text(options.closeText).appendTo(uiDialogTitlebarClose), $("<span></span>").addClass("ui-dialog-title").attr("id", titleId).html(title).prependTo(uiDialogTitlebar);
            $.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose) && (options.beforeClose = options.beforeclose), uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection(), options.draggable && $.fn.draggable && self._makeDraggable(), options.resizable && $.fn.resizable && self._makeResizable(), self._createButtons(options.buttons), self._isOpen = !1, $.fn.bgiframe && uiDialog.bgiframe()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        destroy: function() {
            var self = this;
            return self.overlay && self.overlay.destroy(), self.uiDialog.hide(), self.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), self.uiDialog.remove(), self.originalTitle && self.element.attr("title", self.originalTitle), self
        },
        widget: function() {
            return this.uiDialog
        },
        close: function(event) {
            var maxZ, thisZ, self = this;
            if (!1 !== self._trigger("beforeClose", event)) return self.overlay && self.overlay.destroy(), self.uiDialog.unbind("keypress.ui-dialog"), self._isOpen = !1, self.options.hide ? self.uiDialog.hide(self.options.hide, function() {
                self._trigger("close", event)
            }) : (self.uiDialog.hide(), self._trigger("close", event)), $.ui.dialog.overlay.resize(), self.options.modal && (maxZ = 0, $(".ui-dialog").each(function() {
                this !== self.uiDialog[0] && (thisZ = $(this).css("z-index"), isNaN(thisZ) || (maxZ = Math.max(maxZ, thisZ)))
            }), $.ui.dialog.maxZ = maxZ), self
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function(force, event) {
            var saveScroll, self = this,
                options = self.options;
            return options.modal && !force || !options.stack && !options.modal ? self._trigger("focus", event) : (options.zIndex > $.ui.dialog.maxZ && ($.ui.dialog.maxZ = options.zIndex), self.overlay && ($.ui.dialog.maxZ += 1, self.overlay.$el.css("z-index", $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ)), saveScroll = {
                scrollTop: self.element.scrollTop(),
                scrollLeft: self.element.scrollLeft()
            }, $.ui.dialog.maxZ += 1, self.uiDialog.css("z-index", $.ui.dialog.maxZ), self.element.attr(saveScroll), self._trigger("focus", event), self)
        },
        open: function() {
            if (!this._isOpen) {
                var self = this,
                    options = self.options,
                    uiDialog = self.uiDialog;
                return self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null, self._size(), self._position(options.position), uiDialog.show(options.show), self.moveToTop(!0), options.modal && uiDialog.bind("keypress.ui-dialog", function(event) {
                    if (event.keyCode === $.ui.keyCode.TAB) {
                        var tabbables = $(":tabbable", this),
                            first = tabbables.filter(":first"),
                            last = tabbables.filter(":last");
                        return event.target !== last[0] || event.shiftKey ? event.target === first[0] && event.shiftKey ? (last.focus(1), !1) : void 0 : (first.focus(1), !1)
                    }
                }), $(self.element.find(":tabbable").get().concat(uiDialog.find(".ui-dialog-buttonpane :tabbable").get().concat(uiDialog.get()))).eq(0).focus(), self._isOpen = !0, self._trigger("open"), self
            }
        },
        _createButtons: function(buttons) {
            var self = this,
                hasButtons = !1,
                uiDialogButtonPane = $("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                uiButtonSet = $("<div></div>").addClass("ui-dialog-buttonset").appendTo(uiDialogButtonPane);
            self.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof buttons && null !== buttons && $.each(buttons, function() {
                return !(hasButtons = !0)
            }), hasButtons && ($.each(buttons, function(name, props) {
                props = $.isFunction(props) ? {
                    click: props,
                    text: name
                } : props;
                var button = $('<button type="button"></button>').click(function() {
                    props.click.apply(self.element[0], arguments)
                }).appendTo(uiButtonSet);
                $.each(props, function(key, value) {
                    "click" !== key && (key in attrFn ? button[key](value) : button.attr(key, value))
                }), $.fn.button && button.button()
            }), uiDialogButtonPane.appendTo(self.uiDialog))
        },
        _makeDraggable: function() {
            function filteredUi(ui) {
                return {
                    position: ui.position,
                    offset: ui.offset
                }
            }
            var heightBeforeDrag, self = this,
                options = self.options,
                doc = $(document);
            self.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(event, ui) {
                    heightBeforeDrag = "auto" === options.height ? "auto" : $(this).height(), $(this).height($(this).height()).addClass("ui-dialog-dragging"), self._trigger("dragStart", event, filteredUi(ui))
                },
                drag: function(event, ui) {
                    self._trigger("drag", event, filteredUi(ui))
                },
                stop: function(event, ui) {
                    options.position = [ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop()], $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag), self._trigger("dragStop", event, filteredUi(ui)), $.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function(handles) {
            function filteredUi(ui) {
                return {
                    originalPosition: ui.originalPosition,
                    originalSize: ui.originalSize,
                    position: ui.position,
                    size: ui.size
                }
            }
            handles = handles === undefined ? this.options.resizable : handles;
            var self = this,
                options = self.options,
                position = self.uiDialog.css("position"),
                resizeHandles = "string" == typeof handles ? handles : "n,e,s,w,se,sw,ne,nw";
            self.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: self.element,
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: self._minHeight(),
                handles: resizeHandles,
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-resizing"), self._trigger("resizeStart", event, filteredUi(ui))
                },
                resize: function(event, ui) {
                    self._trigger("resize", event, filteredUi(ui))
                },
                stop: function(event, ui) {
                    $(this).removeClass("ui-dialog-resizing"), options.height = $(this).height(), options.width = $(this).width(), self._trigger("resizeStop", event, filteredUi(ui)), $.ui.dialog.overlay.resize()
                }
            }).css("position", position).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function() {
            var options = this.options;
            return "auto" === options.height ? options.minHeight : Math.min(options.minHeight, options.height)
        },
        _position: function(position) {
            var isVisible, myAt = [],
                offset = [0, 0];
            position ? (("string" == typeof position || "object" == typeof position && "0" in position) && (myAt = position.split ? position.split(" ") : [position[0], position[1]], 1 === myAt.length && (myAt[1] = myAt[0]), $.each(["left", "top"], function(i, offsetPosition) {
                +myAt[i] === myAt[i] && (offset[i] = myAt[i], myAt[i] = offsetPosition)
            }), position = {
                my: myAt.join(" "),
                at: myAt.join(" "),
                offset: offset.join(" ")
            }), position = $.extend({}, $.ui.dialog.prototype.options.position, position)) : position = $.ui.dialog.prototype.options.position, isVisible = this.uiDialog.is(":visible"), isVisible || this.uiDialog.show(), this.uiDialog.css({
                top: 0,
                left: 0
            }).position($.extend({ of: window
            }, position)), isVisible || this.uiDialog.hide()
        },
        _setOptions: function(options) {
            var self = this,
                resizableOptions = {},
                resize = !1;
            $.each(options, function(key, value) {
                self._setOption(key, value), key in sizeRelatedOptions && (resize = !0), key in resizableRelatedOptions && (resizableOptions[key] = value)
            }), resize && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", resizableOptions)
        },
        _setOption: function(key, value) {
            var self = this,
                uiDialog = self.uiDialog;
            switch (key) {
                case "beforeclose":
                    key = "beforeClose";
                    break;
                case "buttons":
                    self._createButtons(value);
                    break;
                case "closeText":
                    self.uiDialogTitlebarCloseText.text("" + value);
                    break;
                case "dialogClass":
                    uiDialog.removeClass(self.options.dialogClass).addClass(uiDialogClasses + value);
                    break;
                case "disabled":
                    value ? uiDialog.addClass("ui-dialog-disabled") : uiDialog.removeClass("ui-dialog-disabled");
                    break;
                case "draggable":
                    var isDraggable = uiDialog.is(":data(draggable)");
                    isDraggable && !value && uiDialog.draggable("destroy"), !isDraggable && value && self._makeDraggable();
                    break;
                case "position":
                    self._position(value);
                    break;
                case "resizable":
                    var isResizable = uiDialog.is(":data(resizable)");
                    isResizable && !value && uiDialog.resizable("destroy"), isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value), isResizable || value === !1 || self._makeResizable(value);
                    break;
                case "title":
                    $(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || "&#160;"))
            }
            $.Widget.prototype._setOption.apply(self, arguments)
        },
        _size: function() {
            var nonContentHeight, minContentHeight, options = this.options,
                isVisible = this.uiDialog.is(":visible");
            if (this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    height: 0
                }), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
                    height: "auto",
                    width: options.width
                }).height(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight), "auto" === options.height)
                if ($.support.minHeight) this.element.css({
                    minHeight: minContentHeight,
                    height: "auto"
                });
                else {
                    this.uiDialog.show();
                    var autoHeight = this.element.css("height", "auto").height();
                    isVisible || this.uiDialog.hide(), this.element.height(Math.max(autoHeight, minContentHeight))
                }
            else this.element.height(Math.max(options.height - nonContentHeight, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }), $.extend($.ui.dialog, {
        version: "1.8.16",
        uuid: 0,
        maxZ: 0,
        getTitleId: function($el) {
            var id = $el.attr("id");
            return id || (this.uuid += 1, id = this.uuid), "ui-dialog-title-" + id
        },
        overlay: function(dialog) {
            this.$el = $.ui.dialog.overlay.create(dialog)
        }
    }), $.extend($.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: $.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(event) {
            return event + ".dialog-overlay"
        }).join(" "),
        create: function(dialog) {
            0 === this.instances.length && (setTimeout(function() {
                $.ui.dialog.overlay.instances.length && $(document).bind($.ui.dialog.overlay.events, function(event) {
                    if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) return !1
                })
            }, 1), $(document).bind("keydown.dialog-overlay", function(event) {
                dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (dialog.close(event), event.preventDefault())
            }), $(window).bind("resize.dialog-overlay", $.ui.dialog.overlay.resize));
            var $el = (this.oldInstances.pop() || $("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            return $.fn.bgiframe && $el.bgiframe(), this.instances.push($el), $el
        },
        destroy: function($el) {
            var indexOf = $.inArray($el, this.instances);
            indexOf != -1 && this.oldInstances.push(this.instances.splice(indexOf, 1)[0]), 0 === this.instances.length && $([document, window]).unbind(".dialog-overlay"), $el.remove();
            var maxZ = 0;
            $.each(this.instances, function() {
                maxZ = Math.max(maxZ, this.css("z-index"))
            }), this.maxZ = maxZ
        },
        height: function() {
            var scrollHeight, offsetHeight;
            return $.browser.msie && $.browser.version < 7 ? (scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), scrollHeight < offsetHeight ? $(window).height() + "px" : scrollHeight + "px") : $(document).height() + "px"
        },
        width: function() {
            var scrollWidth, offsetWidth;
            return $.browser.msie ? (scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), scrollWidth < offsetWidth ? $(window).width() + "px" : scrollWidth + "px") : $(document).width() + "px"
        },
        resize: function() {
            var $overlays = $([]);
            $.each($.ui.dialog.overlay.instances, function() {
                $overlays = $overlays.add(this)
            }), $overlays.css({
                width: 0,
                height: 0
            }).css({
                width: $.ui.dialog.overlay.width(),
                height: $.ui.dialog.overlay.height()
            })
        }
    }), $.extend($.ui.dialog.overlay.prototype, {
        destroy: function() {
            $.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery),
function($, undefined) {
    var numPages = 5;
    $.widget("ui.slider", $.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var self = this,
                o = this.options,
                existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                handleCount = o.values && o.values.length || 1,
                handles = [];
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (o.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = $([]), o.range && (o.range === !0 && (o.values || (o.values = [this._valueMin(), this._valueMin()]), o.values.length && 2 !== o.values.length && (o.values = [o.values[0], o.values[0]])), this.range = $("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === o.range || "max" === o.range ? " ui-slider-range-" + o.range : "")));
            for (var i = existingHandles.length; i < handleCount; i += 1) handles.push(handle);
            this.handles = existingHandles.add($(handles.join("")).appendTo(self.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(event) {
                event.preventDefault()
            }).hover(function() {
                o.disabled || $(this).addClass("ui-state-hover")
            }, function() {
                $(this).removeClass("ui-state-hover")
            }).focus(function() {
                o.disabled ? $(this).blur() : ($(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), $(this).addClass("ui-state-focus"))
            }).blur(function() {
                $(this).removeClass("ui-state-focus")
            }), this.handles.each(function(i) {
                $(this).data("index.ui-slider-handle", i)
            }), this.handles.keydown(function(event) {
                var allowed, curVal, newVal, step, ret = !0,
                    index = $(this).data("index.ui-slider-handle");
                if (!self.options.disabled) {
                    switch (event.keyCode) {
                        case $.ui.keyCode.HOME:
                        case $.ui.keyCode.END:
                        case $.ui.keyCode.PAGE_UP:
                        case $.ui.keyCode.PAGE_DOWN:
                        case $.ui.keyCode.UP:
                        case $.ui.keyCode.RIGHT:
                        case $.ui.keyCode.DOWN:
                        case $.ui.keyCode.LEFT:
                            if (ret = !1, !self._keySliding && (self._keySliding = !0, $(this).addClass("ui-state-active"), allowed = self._start(event, index), allowed === !1)) return
                    }
                    switch (step = self.options.step, curVal = newVal = self.options.values && self.options.values.length ? self.values(index) : self.value(), event.keyCode) {
                        case $.ui.keyCode.HOME:
                            newVal = self._valueMin();
                            break;
                        case $.ui.keyCode.END:
                            newVal = self._valueMax();
                            break;
                        case $.ui.keyCode.PAGE_UP:
                            newVal = self._trimAlignValue(curVal + (self._valueMax() - self._valueMin()) / numPages);
                            break;
                        case $.ui.keyCode.PAGE_DOWN:
                            newVal = self._trimAlignValue(curVal - (self._valueMax() - self._valueMin()) / numPages);
                            break;
                        case $.ui.keyCode.UP:
                        case $.ui.keyCode.RIGHT:
                            if (curVal === self._valueMax()) return;
                            newVal = self._trimAlignValue(curVal + step);
                            break;
                        case $.ui.keyCode.DOWN:
                        case $.ui.keyCode.LEFT:
                            if (curVal === self._valueMin()) return;
                            newVal = self._trimAlignValue(curVal - step)
                    }
                    return self._slide(event, index, newVal), ret
                }
            }).keyup(function(event) {
                var index = $(this).data("index.ui-slider-handle");
                self._keySliding && (self._keySliding = !1, self._stop(event, index), self._change(event, index), $(this).removeClass("ui-state-active"))
            }), this._refreshValue(), this._animateOff = !1
        },
        destroy: function() {
            return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
        },
        _mouseCapture: function(event) {
            var position, normValue, distance, closestHandle, self, index, allowed, offset, mouseOverHandle, o = this.options;
            return !o.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), position = {
                x: event.pageX,
                y: event.pageY
            }, normValue = this._normValueFromMouse(position), distance = this._valueMax() - this._valueMin() + 1, self = this, this.handles.each(function(i) {
                var thisDistance = Math.abs(normValue - self.values(i));
                distance > thisDistance && (distance = thisDistance, closestHandle = $(this), index = i)
            }), o.range === !0 && this.values(1) === o.min && (index += 1, closestHandle = $(this.handles[index])), allowed = this._start(event, index), allowed !== !1 && (this._mouseSliding = !0, self._handleIndex = index, closestHandle.addClass("ui-state-active").focus(), offset = closestHandle.offset(), mouseOverHandle = !$(event.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = mouseOverHandle ? {
                left: 0,
                top: 0
            } : {
                left: event.pageX - offset.left - closestHandle.width() / 2,
                top: event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue), this._animateOff = !0, !0))
        },
        _mouseStart: function(event) {
            return !0
        },
        _mouseDrag: function(event) {
            var position = {
                    x: event.pageX,
                    y: event.pageY
                },
                normValue = this._normValueFromMouse(position);
            return this._slide(event, this._handleIndex, normValue), !1
        },
        _mouseStop: function(event) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(event, this._handleIndex), this._change(event, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(position) {
            var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
            return "horizontal" === this.orientation ? (pixelTotal = this.elementSize.width, pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (pixelTotal = this.elementSize.height, pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), percentMouse = pixelMouse / pixelTotal, percentMouse > 1 && (percentMouse = 1), percentMouse < 0 && (percentMouse = 0), "vertical" === this.orientation && (percentMouse = 1 - percentMouse), valueTotal = this._valueMax() - this._valueMin(), valueMouse = this._valueMin() + percentMouse * valueTotal, this._trimAlignValue(valueMouse)
        },
        _start: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("start", event, uiHash)
        },
        _slide: function(event, index, newVal) {
            var otherVal, newValues, allowed;
            this.options.values && this.options.values.length ? (otherVal = this.values(index ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === index && newVal > otherVal || 1 === index && newVal < otherVal) && (newVal = otherVal), newVal !== this.values(index) && (newValues = this.values(), newValues[index] = newVal, allowed = this._trigger("slide", event, {
                handle: this.handles[index],
                value: newVal,
                values: newValues
            }), otherVal = this.values(index ? 0 : 1), allowed !== !1 && this.values(index, newVal, !0))) : newVal !== this.value() && (allowed = this._trigger("slide", event, {
                handle: this.handles[index],
                value: newVal
            }), allowed !== !1 && this.value(newVal))
        },
        _stop: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("stop", event, uiHash)
        },
        _change: function(event, index) {
            if (!this._keySliding && !this._mouseSliding) {
                var uiHash = {
                    handle: this.handles[index],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("change", event, uiHash)
            }
        },
        value: function(newValue) {
            return arguments.length ? (this.options.value = this._trimAlignValue(newValue), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function(index, newValue) {
            var vals, newValues, i;
            if (arguments.length > 1) return this.options.values[index] = this._trimAlignValue(newValue), this._refreshValue(), void this._change(null, index);
            if (!arguments.length) return this._values();
            if (!$.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(index) : this.value();
            for (vals = this.options.values, newValues = arguments[0], i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(newValues[i]), this._change(null, i);
            this._refreshValue()
        },
        _setOption: function(key, value) {
            var i, valsLength = 0;
            switch ($.isArray(this.options.values) && (valsLength = this.options.values.length), $.Widget.prototype._setOption.apply(this, arguments), key) {
                case "disabled":
                    value ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                    break;
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), i = 0; i < valsLength; i += 1) this._change(null, i);
                    this._animateOff = !1
            }
        },
        _value: function() {
            var val = this.options.value;
            return val = this._trimAlignValue(val)
        },
        _values: function(index) {
            var val, vals, i;
            if (arguments.length) return val = this.options.values[index], val = this._trimAlignValue(val);
            for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(vals[i]);
            return vals
        },
        _trimAlignValue: function(val) {
            if (val <= this._valueMin()) return this._valueMin();
            if (val >= this._valueMax()) return this._valueMax();
            var step = this.options.step > 0 ? this.options.step : 1,
                valModStep = (val - this._valueMin()) % step,
                alignValue = val - valModStep;
            return 2 * Math.abs(valModStep) >= step && (alignValue += valModStep > 0 ? step : -step), parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var valPercent, lastValPercent, value, valueMin, valueMax, oRange = this.options.range,
                o = this.options,
                self = this,
                animate = !this._animateOff && o.animate,
                _set = {};
            this.options.values && this.options.values.length ? this.handles.each(function(i, j) {
                valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100, _set["horizontal" === self.orientation ? "left" : "bottom"] = valPercent + "%", $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), self.options.range === !0 && ("horizontal" === self.orientation ? (0 === i && self.range.stop(1, 1)[animate ? "animate" : "css"]({
                    left: valPercent + "%"
                }, o.animate), 1 === i && self.range[animate ? "animate" : "css"]({
                    width: valPercent - lastValPercent + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                })) : (0 === i && self.range.stop(1, 1)[animate ? "animate" : "css"]({
                    bottom: valPercent + "%"
                }, o.animate), 1 === i && self.range[animate ? "animate" : "css"]({
                    height: valPercent - lastValPercent + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                }))), lastValPercent = valPercent
            }) : (value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(), valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0, _set["horizontal" === self.orientation ? "left" : "bottom"] = valPercent + "%", this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), "min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                width: valPercent + "%"
            }, o.animate), "max" === oRange && "horizontal" === this.orientation && this.range[animate ? "animate" : "css"]({
                width: 100 - valPercent + "%"
            }, {
                queue: !1,
                duration: o.animate
            }), "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                height: valPercent + "%"
            }, o.animate), "max" === oRange && "vertical" === this.orientation && this.range[animate ? "animate" : "css"]({
                height: 100 - valPercent + "%"
            }, {
                queue: !1,
                duration: o.animate
            }))
        }
    }), $.extend($.ui.slider, {
        version: "1.8.16"
    })
}(jQuery),
function($, undefined) {
    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.bind("mouseout", function(event) {
            var elem = $(event.target).closest(selector);
            elem.length && elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function(event) {
            var elem = $(event.target).closest(selector);
            !$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) && elem.length && (elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), elem.addClass("ui-state-hover"), elem.hasClass("ui-datepicker-prev") && elem.addClass("ui-datepicker-prev-hover"), elem.hasClass("ui-datepicker-next") && elem.addClass("ui-datepicker-next-hover"))
        })
    }

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) null != props[name] && props[name] != undefined || (target[name] = props[name]);
        return target
    }

    function isArray(a) {
        return a && ($.browser.safari && "object" == typeof a && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
    }
    $.extend($.ui, {
        datepicker: {
            version: "1.8.16"
        }
    });
    var PROP_NAME = "datepicker",
        dpuuid = (new Date).getTime(),
        instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(settings) {
            return extendRemove(this._defaults, settings || {}), this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(),
                inline = "div" == nodeName || "span" == nodeName;
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: inline ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            }), this._autoSize(inst), $.data(target, PROP_NAME, inst), inst.settings.disabled && this._disableDatepicker(target))
        },
        _attachments: function(input, inst) {
            var appendText = this._get(inst, "appendText"),
                isRTL = this._get(inst, "isRTL");
            inst.append && inst.append.remove(), appendText && (inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>"),
                input[isRTL ? "before" : "after"](inst.append)), input.unbind("focus", this._showDatepicker), inst.trigger && inst.trigger.remove();
            var showOn = this._get(inst, "showOn");
            if ("focus" != showOn && "both" != showOn || input.focus(this._showDatepicker), "button" == showOn || "both" == showOn) {
                var buttonText = this._get(inst, "buttonText"),
                    buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == buttonImage ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }))), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.click(function() {
                    return $.datepicker._datepickerShowing && $.datepicker._lastInput == input[0] ? $.datepicker._hideDatepicker() : $.datepicker._showDatepicker(input[0]), !1
                })
            }
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var date = new Date(2009, 11, 20),
                    dateFormat = this._get(inst, "dateFormat");
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function(names) {
                        for (var max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, maxI = i);
                        return maxI
                    };
                    date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())
                }
                inst.input.attr("size", this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key)
            }), $.data(target, PROP_NAME, inst), this._setDate(inst, this._getDefaultDate(inst), !0), this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), inst.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                var id = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            if (extendRemove(inst.settings, settings || {}), date = date && date.constructor == Date ? this._formatDate(inst, date) : date, this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null, !this._pos) {
                var browserWidth = document.documentElement.clientWidth,
                    browserHeight = document.documentElement.clientHeight,
                    scrollX = document.documentElement.scrollLeft || document.body.scrollLeft,
                    scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, inst), this
        },
        _destroyDatepicker: function(target) {
            var $target = $(target),
                inst = $.data(target, PROP_NAME);
            if ($target.hasClass(this.markerClassName)) {
                var nodeName = target.nodeName.toLowerCase();
                $.removeData(target, PROP_NAME), "input" == nodeName ? (inst.append.remove(), inst.trigger.remove(), $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" != nodeName && "span" != nodeName || $target.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function(target) {
            var $target = $(target),
                inst = $.data(target, PROP_NAME);
            if ($target.hasClass(this.markerClassName)) {
                var nodeName = target.nodeName.toLowerCase();
                if ("input" == nodeName) target.disabled = !1, inst.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                });
                else if ("div" == nodeName || "span" == nodeName) {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs, function(value) {
                    return value == target ? null : value
                })
            }
        },
        _disableDatepicker: function(target) {
            var $target = $(target),
                inst = $.data(target, PROP_NAME);
            if ($target.hasClass(this.markerClassName)) {
                var nodeName = target.nodeName.toLowerCase();
                if ("input" == nodeName) target.disabled = !0, inst.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                });
                else if ("div" == nodeName || "span" == nodeName) {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs, function(value) {
                    return value == target ? null : value
                }), this._disabledInputs[this._disabledInputs.length] = target
            }
        },
        _isDisabledDatepicker: function(target) {
            if (!target) return !1;
            for (var i = 0; i < this._disabledInputs.length; i++)
                if (this._disabledInputs[i] == target) return !0;
            return !1
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var inst = this._getInst(target);
            if (2 == arguments.length && "string" == typeof name) return "defaults" == name ? $.extend({}, $.datepicker._defaults) : inst ? "all" == name ? $.extend({}, inst.settings) : this._get(inst, name) : null;
            var settings = name || {};
            if ("string" == typeof name && (settings = {}, settings[name] = value), inst) {
                this._curInst == inst && this._hideDatepicker();
                var date = this._getDateDatepicker(target, !0),
                    minDate = this._getMinMaxDate(inst, "min"),
                    maxDate = this._getMinMaxDate(inst, "max");
                extendRemove(inst.settings, settings), null !== minDate && settings.dateFormat !== undefined && settings.minDate === undefined && (inst.settings.minDate = this._formatDate(inst, minDate)), null !== maxDate && settings.dateFormat !== undefined && settings.maxDate === undefined && (inst.settings.maxDate = this._formatDate(inst, maxDate)), this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), this._updateAlternate(inst), this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            inst && this._updateDatepicker(inst)
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst))
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null
        },
        _doKeyDown: function(event) {
            var inst = $.datepicker._getInst(event.target),
                handled = !0,
                isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(), handled = !1;
                    break;
                case 13:
                    var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                    sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                    var onSelect = $.datepicker._get(inst, "onSelect");
                    if (onSelect) {
                        var dateStr = $.datepicker._formatDate(inst);
                        onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])
                    } else $.datepicker._hideDatepicker();
                    return !1;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 35:
                    (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 38:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 40:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = !1
            } else 36 == event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
            handled && (event.preventDefault(), event.stopPropagation())
        },
        _doKeyPress: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")),
                    chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1
            }
        },
        _doKeyUp: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) try {
                var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));
                date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), $.datepicker._updateDatepicker(inst))
            } catch (event) {
                $.datepicker.log(event)
            }
            return !0
        },
        _showDatepicker: function(input) {
            if (input = input.target || input, "input" != input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput != input) {
                var inst = $.datepicker._getInst(input);
                $.datepicker._curInst && $.datepicker._curInst != inst && ($.datepicker._datepickerShowing && $.datepicker._triggerOnClose($.datepicker._curInst), $.datepicker._curInst.dpDiv.stop(!0, !0));
                var beforeShow = $.datepicker._get(inst, "beforeShow"),
                    beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
                if (beforeShowSettings !== !1) {
                    extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight);
                    var isFixed = !1;
                    $(input).parents().each(function() {
                        return isFixed |= "fixed" == $(this).css("position"), !isFixed
                    }), isFixed && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                    var offset = {
                        left: $.datepicker._pos[0],
                        top: $.datepicker._pos[1]
                    };
                    if ($.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                            position: "absolute",
                            display: "block",
                            top: "-1000px"
                        }), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), inst.dpDiv.css({
                            position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                            display: "none",
                            left: offset.left + "px",
                            top: offset.top + "px"
                        }), !inst.inline) {
                        var showAnim = $.datepicker._get(inst, "showAnim"),
                            duration = $.datepicker._get(inst, "duration"),
                            postProcess = function() {
                                var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
                                if (cover.length) {
                                    var borders = $.datepicker._getBorders(inst.dpDiv);
                                    cover.css({
                                        left: -borders[0],
                                        top: -borders[1],
                                        width: inst.dpDiv.outerWidth(),
                                        height: inst.dpDiv.outerHeight()
                                    })
                                }
                            };
                        inst.dpDiv.zIndex($(input).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null, postProcess), showAnim && duration || postProcess(), inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input.focus(), $.datepicker._curInst = inst
                    }
                }
            }
        },
        _updateDatepicker: function(inst) {
            var self = this;
            self.maxRows = 4;
            var borders = $.datepicker._getBorders(inst.dpDiv);
            instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst));
            var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
            cover.length && cover.css({
                left: -borders[0],
                top: -borders[1],
                width: inst.dpDiv.outerWidth(),
                height: inst.dpDiv.outerHeight()
            }), inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var numMonths = this._getNumberOfMonths(inst),
                cols = numMonths[1],
                width = 17;
            if (inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), inst.dpDiv[(1 != numMonths[0] || 1 != numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] != document.activeElement && inst.input.focus(), inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                setTimeout(function() {
                    origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), origyearshtml = inst.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function(elem) {
            var convert = function(value) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[value] || value
            };
            return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(),
                dpHeight = inst.dpDiv.outerHeight(),
                inputWidth = inst.input ? inst.input.outerWidth() : 0,
                inputHeight = inst.input ? inst.input.outerHeight() : 0,
                viewWidth = document.documentElement.clientWidth + $(document).scrollLeft(),
                viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
            return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left == inst.input.offset().left ? $(document).scrollLeft() : 0, offset.top -= isFixed && offset.top == inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), offset
        },
        _findPos: function(obj) {
            for (var inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" == obj.type || 1 != obj.nodeType || $.expr.filters.hidden(obj));) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _triggerOnClose: function(inst) {
            var onClose = this._get(inst, "onClose");
            onClose && onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst])
        },
        _hideDatepicker: function(input) {
            var inst = this._curInst;
            if (inst && (!input || inst == $.data(input, PROP_NAME)) && this._datepickerShowing) {
                var showAnim = this._get(inst, "showAnim"),
                    duration = this._get(inst, "duration"),
                    postProcess = function() {
                        $.datepicker._tidyDialog(inst), this._curInst = null
                    };
                $.effects && $.effects[showAnim] ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" == showAnim ? "slideUp" : "fadeIn" == showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), showAnim || postProcess(), $.datepicker._triggerOnClose(inst), this._datepickerShowing = !1, this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
            }
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(event) {
            if ($.datepicker._curInst) {
                var $target = $(event.target);
                $target[0].id == $.datepicker._mainDivId || 0 != $target.parents("#" + $.datepicker._mainDivId).length || $target.hasClass($.datepicker.markerClassName) || $target.hasClass($.datepicker._triggerClass) || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI || $.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id),
                inst = this._getInst(target[0]);
            this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" == period ? this._get(inst, "showCurrentAtPos") : 0), period), this._updateDatepicker(inst))
        },
        _gotoToday: function(id) {
            var target = $(id),
                inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) inst.selectedDay = inst.currentDay, inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear;
            else {
                var date = new Date;
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst), this._adjustDate(target)
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id),
                inst = this._getInst(target[0]);
            inst["selected" + ("M" == period ? "Month" : "Year")] = inst["draw" + ("M" == period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), this._notifyChange(inst), this._adjustDate(target)
        },
        _selectDay: function(id, month, year, td) {
            var target = $(id);
            if (!$(td).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(target[0])) {
                var inst = this._getInst(target[0]);
                inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
            }
        },
        _clearDate: function(id) {
            var target = $(id);
            this._getInst(target[0]);
            this._selectDate(target, "")
        },
        _selectDate: function(id, dateStr) {
            var target = $(id),
                inst = this._getInst(target[0]);
            dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]) : inst.input && inst.input.trigger("change"), inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], "object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"),
                    date = this._getDate(inst),
                    dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [day > 0 && day < 6, ""]
        },
        iso8601Week: function(date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            return checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (null == format || null == value) throw "Invalid arguments";
            if (value = "object" == typeof value ? value.toString() : value + "", "" == value) return null;
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10);
            for (var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                    return matches && iFormat++, matches
                }, getNumber = function(match) {
                    var isDoubled = lookAhead(match),
                        size = "@" == match ? 14 : "!" == match ? 20 : "y" == match && isDoubled ? 4 : "o" == match ? 3 : 2,
                        digits = new RegExp("^\\d{1," + size + "}"),
                        num = value.substring(iValue).match(digits);
                    if (!num) throw "Missing number at position " + iValue;
                    return iValue += num[0].length, parseInt(num[0], 10)
                }, getName = function(match, shortNames, longNames) {
                    var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                            return [
                                [k, v]
                            ]
                        }).sort(function(a, b) {
                            return -(a[1].length - b[1].length)
                        }),
                        index = -1;
                    if ($.each(names, function(i, pair) {
                            var name = pair[1];
                            if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) return index = pair[0], iValue += name.length, !1
                        }), index != -1) return index + 1;
                    throw "Unknown name at position " + iValue
                }, checkLiteral = function() {
                    if (value.charAt(iValue) != format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                    iValue++
                }, iValue = 0, iFormat = 0; iFormat < format.length; iFormat++)
                if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1;
                else switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        var date = new Date(getNumber("@"));
                        year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                        break;
                    case "!":
                        var date = new Date((getNumber("!") - this._ticksTo1970) / 1e4);
                        year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                        break;
                    case "'":
                        lookAhead("'") ? checkLiteral() : literal = !0;
                        break;
                    default:
                        checkLiteral()
                }
            if (iValue < value.length) throw "Extra/unparsed characters found in date: " + value.substring(iValue);
            if (year == -1 ? year = (new Date).getFullYear() : year < 100 && (year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)), doy > -1)
                for (month = 1, day = doy;;) {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) break;
                    month++, day -= dim
                }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) throw "Invalid date";
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(format, date, settings) {
            if (!date) return "";
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
                dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
                monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
                monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
                lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                    return matches && iFormat++, matches
                },
                formatNumber = function(match, value, len) {
                    var num = "" + value;
                    if (lookAhead(match))
                        for (; num.length < len;) num = "0" + num;
                    return num
                },
                formatName = function(match, value, shortNames, longNames) {
                    return lookAhead(match) ? longNames[value] : shortNames[value]
                },
                output = "",
                literal = !1;
            if (date)
                for (var iFormat = 0; iFormat < format.length; iFormat++)
                    if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1;
                    else switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += 1e4 * date.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            lookAhead("'") ? output += "'" : literal = !0;
                            break;
                        default:
                            output += format.charAt(iFormat)
                    }
            return output
        },
        _possibleChars: function(format) {
            for (var chars = "", literal = !1, lookAhead = function(match) {
                    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                    return matches && iFormat++, matches
                }, iFormat = 0; iFormat < format.length; iFormat++)
                if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1;
                else switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        lookAhead("'") ? chars += "'" : literal = !0;
                        break;
                    default:
                        chars += format.charAt(iFormat)
                }
            return chars
        },
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() != inst.lastVal) {
                var date, defaultDate, dateFormat = this._get(inst, "dateFormat"),
                    dates = inst.lastVal = inst.input ? inst.input.val() : null;
                date = defaultDate = this._getDefaultDate(inst);
                var settings = this._getFormatConfig(inst);
                try {
                    date = this.parseDate(dateFormat, dates, settings) || defaultDate
                } catch (event) {
                    this.log(event), dates = noDefault ? "" : dates
                }
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, this._adjustInstDate(inst)
            }
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date))
        },
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                    var date = new Date;
                    return date.setDate(date.getDate() + offset), date
                },
                offsetString = function(offset) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                    } catch (e) {}
                    for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches;) {
                        switch (matches[2] || "d") {
                            case "d":
                            case "D":
                                day += parseInt(matches[1], 10);
                                break;
                            case "w":
                            case "W":
                                day += 7 * parseInt(matches[1], 10);
                                break;
                            case "m":
                            case "M":
                                month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                break;
                            case "y":
                            case "Y":
                                year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month))
                        }
                        matches = pattern.exec(offset)
                    }
                    return new Date(year, month, day)
                },
                newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
            return newDate = newDate && "Invalid Date" == newDate.toString() ? defaultDate : newDate, newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function(date) {
            return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date,
                origMonth = inst.selectedMonth,
                origYear = inst.selectedYear,
                newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date));
            inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth == inst.selectedMonth && origYear == inst.selectedYear || noChange || this._notifyChange(inst), this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst))
        },
        _getDate: function(inst) {
            var startDate = !inst.currentYear || inst.input && "" == inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return startDate
        },
        _generateHTML: function(inst) {
            var today = new Date;
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL"),
                showButtonPanel = this._get(inst, "showButtonPanel"),
                hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
                navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
                numMonths = this._getNumberOfMonths(inst),
                showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
                stepMonths = this._get(inst, "stepMonths"),
                isMultiMonth = 1 != numMonths[0] || 1 != numMonths[1],
                currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)),
                minDate = this._getMinMaxDate(inst, "min"),
                maxDate = this._getMinMaxDate(inst, "max"),
                drawMonth = inst.drawMonth - showCurrentAtPos,
                drawYear = inst.drawYear;
            if (drawMonth < 0 && (drawMonth += 12, drawYear--), maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
                for (maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw;) drawMonth--, drawMonth < 0 && (drawMonth = 11, drawYear--)
            }
            inst.drawMonth = drawMonth, inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText;
            var prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>",
                nextText = this._get(inst, "nextText");
            nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText;
            var next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>",
                currentText = this._get(inst, "currentText"),
                gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
            currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText;
            var controls = inst.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>",
                buttonPanel = showButtonPanel ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "",
                firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = isNaN(firstDay) ? 0 : firstDay;
            for (var showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = (this._get(inst, "dayNamesShort"), this._get(inst, "dayNamesMin")), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = (this._get(inst, "calculateWeek") || this.iso8601Week, this._getDefaultDate(inst)), html = "", row = 0; row < numMonths[0]; row++) {
                var group = "";
                this.maxRows = 4;
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)),
                        cornerClass = " ui-corner-all",
                        calender = "";
                    if (isMultiMonth) {
                        if (calender += '<div class="ui-datepicker-group',
                            numMonths[1] > 1) switch (col) {
                            case 0:
                                calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += " ui-datepicker-group-middle", cornerClass = ""
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && 0 == row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 == row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    for (var thead = showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "", dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    drawYear == inst.selectedYear && drawMonth == inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth));
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7,
                        curRows = Math.ceil((leadDays + daysInMonth) / 7),
                        numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows;
                    this.maxRows = numRows;
                    for (var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        for (var tbody = showWeek ? '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", dow = 0; dow < 7; dow++) {
                            var daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [!0, ""],
                                otherMonth = printDate.getMonth() != drawMonth,
                                unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent || defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : ' title="' + daySettings[2] + '"') + (unselectable ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + inst.id + "'," + printDate.getMonth() + "," + printDate.getFullYear() + ', this);return false;"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>") + "</td>", printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col == numMonths[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), group += calender
                }
                html += group
            }
            return html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), inst._keyEvent = !1, html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, "changeMonth"),
                changeYear = this._get(inst, "changeYear"),
                showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
                html = '<div class="ui-datepicker-title">',
                monthHtml = "";
            if (secondary || !changeMonth) monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>";
            else {
                var inMinYear = minDate && minDate.getFullYear() == drawYear,
                    inMaxYear = maxDate && maxDate.getFullYear() == drawYear;
                monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'M');\" >";
                for (var month = 0; month < 12; month++)(!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>");
                monthHtml += "</select>"
            }
            if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), !inst.yearshtml)
                if (inst.yearshtml = "", secondary || !changeYear) html += '<span class="ui-datepicker-year">' + drawYear + "</span>";
                else {
                    var years = this._get(inst, "yearRange").split(":"),
                        thisYear = (new Date).getFullYear(),
                        determineYear = function(value) {
                            var year = value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                            return isNaN(year) ? thisYear : year
                        },
                        year = determineYear(years[0]),
                        endYear = Math.max(year, determineYear(years[1] || ""));
                    for (year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, inst.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'Y');\" >"; year <= endYear; year++) inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>";
                    inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null
                }
            return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), html += "</div>"
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + ("Y" == period ? offset : 0),
                month = inst.drawMonth + ("M" == period ? offset : 0),
                day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" == period ? offset : 0),
                date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), "M" != period && "Y" != period || this._notifyChange(inst)
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"),
                maxDate = this._getMinMaxDate(inst, "max"),
                newDate = minDate && date < minDate ? minDate : date;
            return newDate = maxDate && newDate > maxDate ? maxDate : newDate
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            onChange && onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst])
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return null == numMonths ? [1, 1] : "number" == typeof numMonths ? [1, numMonths] : numMonths
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst),
                date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            return offset < 0 && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), this._isInRange(inst, date)
        },
        _isInRange: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"),
                maxDate = this._getMinMaxDate(inst, "max");
            return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime())
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10), {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, day, month, year) {
            day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, inst.currentYear = inst.selectedYear);
            var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    }), $.fn.datepicker = function(options) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof options || "isDisabled" != options && "getDate" != options && "widget" != options ? "option" == options && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs)) : this.each(function() {
            "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        }) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.16", window["DP_jQuery_" + dpuuid] = $
}(jQuery), jQuery.effects || function($, undefined) {
        function getRGB(color) {
            var result;
            return color && color.constructor == Array && 3 == color.length ? color : (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) ? [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)] : (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) ? [2.55 * parseFloat(result[1]), 2.55 * parseFloat(result[2]), 2.55 * parseFloat(result[3])] : (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) ? [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)] : (result = /rgba\(0, 0, 0, 0\)/.exec(color)) ? colors.transparent : colors[$.trim(color).toLowerCase()]
        }

        function getColor(elem, attr) {
            var color;
            do {
                if (color = $.curCSS(elem, attr), "" != color && "transparent" != color || $.nodeName(elem, "body")) break;
                attr = "backgroundColor"
            } while (elem = elem.parentNode);
            return getRGB(color)
        }

        function getElementStyles() {
            var key, camelCase, style = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
                newStyle = {};
            if (style && style.length && style[0] && style[style[0]])
                for (var len = style.length; len--;) key = style[len], "string" == typeof style[key] && (camelCase = key.replace(/\-(\w)/g, function(all, letter) {
                    return letter.toUpperCase()
                }), newStyle[camelCase] = style[key]);
            else
                for (key in style) "string" == typeof style[key] && (newStyle[key] = style[key]);
            return newStyle
        }

        function filterStyles(styles) {
            var name, value;
            for (name in styles) value = styles[name], (null == value || $.isFunction(value) || name in shorthandStyles || /scrollbar/.test(name) || !/color/i.test(name) && isNaN(parseFloat(value))) && delete styles[name];
            return styles
        }

        function styleDifference(oldStyle, newStyle) {
            var name, diff = {
                _: 0
            };
            for (name in newStyle) oldStyle[name] != newStyle[name] && (diff[name] = newStyle[name]);
            return diff
        }

        function _normalizeArguments(effect, options, speed, callback) {
            return "object" == typeof effect && (callback = options, speed = null, options = effect, effect = options.effect), $.isFunction(options) && (callback = options, speed = null, options = {}), ("number" == typeof options || $.fx.speeds[options]) && (callback = speed, speed = options, options = {}), $.isFunction(speed) && (callback = speed, speed = null), options = options || {}, speed = speed || options.duration, speed = $.fx.off ? 0 : "number" == typeof speed ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default, callback = callback || options.complete, [effect, options, speed, callback]
        }

        function standardSpeed(speed) {
            return !(speed && "number" != typeof speed && !$.fx.speeds[speed]) || "string" == typeof speed && !$.effects[speed]
        }
        $.effects = {}, $.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(i, attr) {
            $.fx.step[attr] = function(fx) {
                fx.colorInit || (fx.start = getColor(fx.elem, attr), fx.end = getRGB(fx.end), fx.colorInit = !0), fx.elem.style[attr] = "rgb(" + Math.max(Math.min(parseInt(fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0) + ")"
            }
        });
        var colors = {
                aqua: [0, 255, 255],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                black: [0, 0, 0],
                blue: [0, 0, 255],
                brown: [165, 42, 42],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgrey: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkviolet: [148, 0, 211],
                fuchsia: [255, 0, 255],
                gold: [255, 215, 0],
                green: [0, 128, 0],
                indigo: [75, 0, 130],
                khaki: [240, 230, 140],
                lightblue: [173, 216, 230],
                lightcyan: [224, 255, 255],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                navy: [0, 0, 128],
                olive: [128, 128, 0],
                orange: [255, 165, 0],
                pink: [255, 192, 203],
                purple: [128, 0, 128],
                violet: [128, 0, 128],
                red: [255, 0, 0],
                silver: [192, 192, 192],
                white: [255, 255, 255],
                yellow: [255, 255, 0],
                transparent: [255, 255, 255]
            },
            classAnimationActions = ["add", "remove", "toggle"],
            shorthandStyles = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        $.effects.animateClass = function(value, duration, easing, callback) {
            return $.isFunction(easing) && (callback = easing, easing = null), this.queue(function() {
                var newStyle, that = $(this),
                    originalStyleAttr = that.attr("style") || " ",
                    originalStyle = filterStyles(getElementStyles.call(this)),
                    className = that.attr("class");
                $.each(classAnimationActions, function(i, action) {
                    value[action] && that[action + "Class"](value[action])
                }), newStyle = filterStyles(getElementStyles.call(this)), that.attr("class", className), that.animate(styleDifference(originalStyle, newStyle), {
                    queue: !1,
                    duration: duration,
                    easing: easing,
                    complete: function() {
                        $.each(classAnimationActions, function(i, action) {
                            value[action] && that[action + "Class"](value[action])
                        }), "object" == typeof that.attr("style") ? (that.attr("style").cssText = "", that.attr("style").cssText = originalStyleAttr) : that.attr("style", originalStyleAttr), callback && callback.apply(this, arguments), $.dequeue(this)
                    }
                })
            })
        }, $.fn.extend({
            _addClass: $.fn.addClass,
            addClass: function(classNames, speed, easing, callback) {
                return speed ? $.effects.animateClass.apply(this, [{
                    add: classNames
                }, speed, easing, callback]) : this._addClass(classNames)
            },
            _removeClass: $.fn.removeClass,
            removeClass: function(classNames, speed, easing, callback) {
                return speed ? $.effects.animateClass.apply(this, [{
                    remove: classNames
                }, speed, easing, callback]) : this._removeClass(classNames)
            },
            _toggleClass: $.fn.toggleClass,
            toggleClass: function(classNames, force, speed, easing, callback) {
                return "boolean" == typeof force || force === undefined ? speed ? $.effects.animateClass.apply(this, [force ? {
                    add: classNames
                } : {
                    remove: classNames
                }, speed, easing, callback]) : this._toggleClass(classNames, force) : $.effects.animateClass.apply(this, [{
                    toggle: classNames
                }, force, speed, easing])
            },
            switchClass: function(remove, add, speed, easing, callback) {
                return $.effects.animateClass.apply(this, [{
                    add: add,
                    remove: remove
                }, speed, easing, callback])
            }
        }), $.extend($.effects, {
            version: "1.8.16",
            save: function(element, set) {
                for (var i = 0; i < set.length; i++) null !== set[i] && element.data("ec.storage." + set[i], element[0].style[set[i]])
            },
            restore: function(element, set) {
                for (var i = 0; i < set.length; i++) null !== set[i] && element.css(set[i], element.data("ec.storage." + set[i]))
            },
            setMode: function(el, mode) {
                return "toggle" == mode && (mode = el.is(":hidden") ? "show" : "hide"), mode
            },
            getBaseline: function(origin, original) {
                var y, x;
                switch (origin[0]) {
                    case "top":
                        y = 0;
                        break;
                    case "middle":
                        y = .5;
                        break;
                    case "bottom":
                        y = 1;
                        break;
                    default:
                        y = origin[0] / original.height
                }
                switch (origin[1]) {
                    case "left":
                        x = 0;
                        break;
                    case "center":
                        x = .5;
                        break;
                    case "right":
                        x = 1;
                        break;
                    default:
                        x = origin[1] / original.width
                }
                return {
                    x: x,
                    y: y
                }
            },
            createWrapper: function(element) {
                if (element.parent().is(".ui-effects-wrapper")) return element.parent();
                var props = {
                        width: element.outerWidth(!0),
                        height: element.outerHeight(!0),
                        "float": element.css("float")
                    },
                    wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    active = document.activeElement;
                return element.wrap(wrapper), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), wrapper = element.parent(), "static" == element.css("position") ? (wrapper.css({
                    position: "relative"
                }), element.css({
                    position: "relative"
                })) : ($.extend(props, {
                    position: element.css("position"),
                    zIndex: element.css("z-index")
                }), $.each(["top", "left", "bottom", "right"], function(i, pos) {
                    props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto")
                }), element.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), wrapper.css(props).show()
            },
            removeWrapper: function(element) {
                var parent, active = document.activeElement;
                return element.parent().is(".ui-effects-wrapper") ? (parent = element.parent().replaceWith(element), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), parent) : element
            },
            setTransition: function(element, list, factor, value) {
                return value = value || {}, $.each(list, function(i, x) {
                    unit = element.cssUnit(x), unit[0] > 0 && (value[x] = unit[0] * factor + unit[1])
                }), value
            }
        }), $.fn.extend({
            effect: function(effect, options, speed, callback) {
                var args = _normalizeArguments.apply(this, arguments),
                    args2 = {
                        options: args[1],
                        duration: args[2],
                        callback: args[3]
                    },
                    mode = args2.options.mode,
                    effectMethod = $.effects[effect];
                return $.fx.off || !effectMethod ? mode ? this[mode](args2.duration, args2.callback) : this.each(function() {
                    args2.callback && args2.callback.call(this)
                }) : effectMethod.call(this, args2)
            },
            _show: $.fn.show,
            show: function(speed) {
                if (standardSpeed(speed)) return this._show.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args[1].mode = "show", this.effect.apply(this, args)
            },
            _hide: $.fn.hide,
            hide: function(speed) {
                if (standardSpeed(speed)) return this._hide.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args[1].mode = "hide", this.effect.apply(this, args)
            },
            __toggle: $.fn.toggle,
            toggle: function(speed) {
                if (standardSpeed(speed) || "boolean" == typeof speed || $.isFunction(speed)) return this.__toggle.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args[1].mode = "toggle", this.effect.apply(this, args)
            },
            cssUnit: function(key) {
                var style = this.css(key),
                    val = [];
                return $.each(["em", "px", "%", "pt"], function(i, unit) {
                    style.indexOf(unit) > 0 && (val = [parseFloat(style), unit])
                }), val
            }
        }), $.easing.jswing = $.easing.swing, $.extend($.easing, {
            def: "easeOutQuad",
            swing: function(x, t, b, c, d) {
                return $.easing[$.easing.def](x, t, b, c, d)
            },
            easeInQuad: function(x, t, b, c, d) {
                return c * (t /= d) * t + b
            },
            easeOutQuad: function(x, t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b
            },
            easeInOutQuad: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b
            },
            easeInCubic: function(x, t, b, c, d) {
                return c * (t /= d) * t * t + b
            },
            easeOutCubic: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b
            },
            easeInOutCubic: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b
            },
            easeInQuart: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t + b
            },
            easeOutQuart: function(x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b
            },
            easeInOutQuart: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b
            },
            easeInQuint: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b
            },
            easeOutQuint: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b
            },
            easeInOutQuint: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b
            },
            easeInSine: function(x, t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
            },
            easeOutSine: function(x, t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b
            },
            easeInOutSine: function(x, t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
            },
            easeInExpo: function(x, t, b, c, d) {
                return 0 == t ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
            },
            easeOutExpo: function(x, t, b, c, d) {
                return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
            },
            easeInOutExpo: function(x, t, b, c, d) {
                return 0 == t ? b : t == d ? b + c : (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
            },
            easeInCirc: function(x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
            },
            easeOutCirc: function(x, t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
            },
            easeInOutCirc: function(x, t, b, c, d) {
                return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
            },
            easeInElastic: function(x, t, b, c, d) {
                var s = 1.70158,
                    p = 0,
                    a = c;
                if (0 == t) return b;
                if (1 == (t /= d)) return b + c;
                if (p || (p = .3 * d), a < Math.abs(c)) {
                    a = c;
                    var s = p / 4
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
            },
            easeOutElastic: function(x, t, b, c, d) {
                var s = 1.70158,
                    p = 0,
                    a = c;
                if (0 == t) return b;
                if (1 == (t /= d)) return b + c;
                if (p || (p = .3 * d), a < Math.abs(c)) {
                    a = c;
                    var s = p / 4
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
            },
            easeInOutElastic: function(x, t, b, c, d) {
                var s = 1.70158,
                    p = 0,
                    a = c;
                if (0 == t) return b;
                if (2 == (t /= d / 2)) return b + c;
                if (p || (p = d * (.3 * 1.5)), a < Math.abs(c)) {
                    a = c;
                    var s = p / 4
                } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return t < 1 ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
            },
            easeInBack: function(x, t, b, c, d, s) {
                return s == undefined && (s = 1.70158), c * (t /= d) * t * ((s + 1) * t - s) + b
            },
            easeOutBack: function(x, t, b, c, d, s) {
                return s == undefined && (s = 1.70158), c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
            },
            easeInOutBack: function(x, t, b, c, d, s) {
                return s == undefined && (s = 1.70158), (t /= d / 2) < 1 ? c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
            },
            easeInBounce: function(x, t, b, c, d) {
                return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b
            },
            easeOutBounce: function(x, t, b, c, d) {
                return (t /= d) < 1 / 2.75 ? c * (7.5625 * t * t) + b : t < 2 / 2.75 ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : t < 2.5 / 2.75 ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b
            },
            easeInOutBounce: function(x, t, b, c, d) {
                return t < d / 2 ? .5 * $.easing.easeInBounce(x, 2 * t, 0, c, d) + b : .5 * $.easing.easeOutBounce(x, 2 * t - d, 0, c, d) + .5 * c + b
            }
        })
    }(jQuery),
    function($, undefined) {
        $.effects.fade = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    mode = $.effects.setMode(elem, o.options.mode || "hide");
                elem.animate({
                    opacity: mode
                }, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        o.callback && o.callback.apply(this, arguments), elem.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($, undefined) {
        $.effects.slide = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right"],
                    mode = $.effects.setMode(el, o.options.mode || "show"),
                    direction = o.options.direction || "left";
                $.effects.save(el, props), el.show(), $.effects.createWrapper(el).css({
                    overflow: "hidden"
                });
                var ref = "up" == direction || "down" == direction ? "top" : "left",
                    motion = "up" == direction || "left" == direction ? "pos" : "neg",
                    distance = o.options.distance || ("top" == ref ? el.outerHeight({
                        margin: !0
                    }) : el.outerWidth({
                        margin: !0
                    }));
                "show" == mode && el.css(ref, "pos" == motion ? isNaN(distance) ? "-" + distance : -distance : distance);
                var animation = {};
                animation[ref] = ("show" == mode ? "pos" == motion ? "+=" : "-=" : "pos" == motion ? "-=" : "+=") + distance, el.animate(animation, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        "hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments), el.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($, undefined) {
        $.effects.transfer = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    target = $(o.options.to),
                    endPosition = target.offset(),
                    animation = {
                        top: endPosition.top,
                        left: endPosition.left,
                        height: target.innerHeight(),
                        width: target.innerWidth()
                    },
                    startPosition = elem.offset(),
                    transfer = $('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(o.options.className).css({
                        top: startPosition.top,
                        left: startPosition.left,
                        height: elem.innerHeight(),
                        width: elem.innerWidth(),
                        position: "absolute"
                    }).animate(animation, o.duration, o.options.easing, function() {
                        transfer.remove(), o.callback && o.callback.apply(elem[0], arguments), elem.dequeue()
                    })
            })
        }
    }(jQuery),
    function($) {
        function debug(s) {
            $.fn.cycle.debug && log(s)
        }

        function log() {
            window.console && window.console.log && window.console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
        }

        function handleArguments(cont, options, arg2) {
            function checkInstantResume(isPaused, arg2, cont) {
                if (!isPaused && arg2 === !0) {
                    var options = $(cont).data("cycle.opts");
                    if (!options) return log("options not found, can not resume"), !1;
                    cont.cycleTimeout && (clearTimeout(cont.cycleTimeout), cont.cycleTimeout = 0), go(options.elements, options, 1, 1)
                }
            }
            if (void 0 == cont.cycleStop && (cont.cycleStop = 0), void 0 !== options && null !== options || (options = {}), options.constructor == String) {
                switch (options) {
                    case "destroy":
                    case "stop":
                        var opts = $(cont).data("cycle.opts");
                        return !!opts && (cont.cycleStop++, cont.cycleTimeout && clearTimeout(cont.cycleTimeout), cont.cycleTimeout = 0, $(cont).removeData("cycle.opts"), "destroy" == options && destroy(opts), !1);
                    case "toggle":
                        return cont.cyclePause = 1 === cont.cyclePause ? 0 : 1, checkInstantResume(cont.cyclePause, arg2, cont), !1;
                    case "pause":
                        return cont.cyclePause = 1, !1;
                    case "resume":
                        return cont.cyclePause = 0, checkInstantResume(!1, arg2, cont), !1;
                    case "prev":
                    case "next":
                        var opts = $(cont).data("cycle.opts");
                        return opts ? ($.fn.cycle[options](opts), !1) : (log('options not found, "prev/next" ignored'), !1);
                    default:
                        options = {
                            fx: options
                        }
                }
                return options
            }
            if (options.constructor == Number) {
                var num = options;
                return (options = $(cont).data("cycle.opts")) ? num < 0 || num >= options.elements.length ? (log("invalid slide index: " + num), !1) : (options.nextSlide = num, cont.cycleTimeout && (clearTimeout(cont.cycleTimeout), cont.cycleTimeout = 0), "string" == typeof arg2 && (options.oneTimeFx = arg2), go(options.elements, options, 1, num >= options.currSlide), !1) : (log("options not found, can not advance slide"), !1)
            }
            return options
        }

        function removeFilter(el, opts) {
            if (!$.support.opacity && opts.cleartype && el.style.filter) try {
                el.style.removeAttribute("filter")
            } catch (smother) {}
        }

        function destroy(opts) {
            opts.next && $(opts.next).unbind(opts.prevNextEvent), opts.prev && $(opts.prev).unbind(opts.prevNextEvent), (opts.pager || opts.pagerAnchorBuilder) && $.each(opts.pagerAnchors || [], function() {
                this.unbind().remove()
            }), opts.pagerAnchors = null, opts.destroy && opts.destroy(opts)
        }

        function buildOptions($cont, $slides, els, options, o) {
            var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
            opts.autostop && (opts.countdown = opts.autostopCount || els.length);
            var cont = $cont[0];
            if ($cont.data("cycle.opts", opts), opts.$cont = $cont, opts.stopCount = cont.cycleStop, opts.elements = els, opts.before = opts.before ? [opts.before] : [], opts.after = opts.after ? [opts.after] : [], opts.after.unshift(function() {
                    opts.busy = 0
                }), !$.support.opacity && opts.cleartype && opts.after.push(function() {
                    removeFilter(this, opts)
                }), opts.continuous && opts.after.push(function() {
                    go(els, opts, 0, !opts.rev)
                }), saveOriginalOpts(opts), $.support.opacity || !opts.cleartype || opts.cleartypeNoBg || clearTypeFix($slides), "static" == $cont.css("position") && $cont.css("position", "relative"), opts.width && $cont.width(opts.width), opts.height && "auto" != opts.height && $cont.height(opts.height), opts.startingSlide && (opts.startingSlide = parseInt(opts.startingSlide)), opts.random) {
                opts.randomMap = [];
                for (var i = 0; i < els.length; i++) opts.randomMap.push(i);
                opts.randomMap.sort(function(a, b) {
                    return Math.random() - .5
                }), opts.randomIndex = 1, opts.startingSlide = opts.randomMap[1]
            } else opts.startingSlide >= els.length && (opts.startingSlide = 0);
            opts.currSlide = opts.startingSlide || 0;
            var first = opts.startingSlide;
            $slides.css({
                position: "absolute",
                top: 0,
                left: 0
            }).hide().each(function(i) {
                var z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
                $(this).css("z-index", z)
            }), $(els[first]).css("opacity", 1).show(), removeFilter(els[first], opts), opts.fit && opts.width && $slides.width(opts.width), opts.fit && opts.height && "auto" != opts.height && $slides.height(opts.height);
            var reshape = opts.containerResize && !$cont.innerHeight();
            if (reshape) {
                for (var maxw = 0, maxh = 0, j = 0; j < els.length; j++) {
                    var $e = $(els[j]),
                        e = $e[0],
                        w = $e.outerWidth(),
                        h = $e.outerHeight();
                    w || (w = e.offsetWidth || e.width || $e.attr("width")), h || (h = e.offsetHeight || e.height || $e.attr("height")), maxw = w > maxw ? w : maxw, maxh = h > maxh ? h : maxh
                }
                maxw > 0 && maxh > 0 && $cont.css({
                    width: maxw + "px",
                    height: maxh + "px"
                })
            }
            if (opts.pause && $cont.hover(function() {
                    this.cyclePause++
                }, function() {
                    this.cyclePause--
                }), supportMultiTransitions(opts) === !1) return !1;
            var requeue = !1;
            if (options.requeueAttempts = options.requeueAttempts || 0, $slides.each(function() {
                    var $el = $(this);
                    if (this.cycleH = opts.fit && opts.height ? opts.height : $el.height() || this.offsetHeight || this.height || $el.attr("height") || 0, this.cycleW = opts.fit && opts.width ? opts.width : $el.width() || this.offsetWidth || this.width || $el.attr("width") || 0, $el.is("img")) {
                        var loadingIE = $.browser.msie && 28 == this.cycleW && 30 == this.cycleH && !this.complete,
                            loadingFF = $.browser.mozilla && 34 == this.cycleW && 19 == this.cycleH && !this.complete,
                            loadingOp = $.browser.opera && (42 == this.cycleW && 19 == this.cycleH || 37 == this.cycleW && 17 == this.cycleH) && !this.complete,
                            loadingOther = 0 == this.cycleH && 0 == this.cycleW && !this.complete;
                        if (loadingIE || loadingFF || loadingOp || loadingOther) {
                            if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) return log(options.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH), setTimeout(function() {
                                $(o.s, o.c).cycle(options)
                            }, opts.requeueTimeout), requeue = !0, !1;
                            log("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
                        }
                    }
                    return !0
                }), requeue) return !1;
            if (opts.cssBefore = opts.cssBefore || {}, opts.animIn = opts.animIn || {}, opts.animOut = opts.animOut || {}, $slides.not(":eq(" + first + ")").css(opts.cssBefore), opts.cssFirst && $($slides[first]).css(opts.cssFirst), opts.timeout) {
                opts.timeout = parseInt(opts.timeout), opts.speed.constructor == String && (opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed)), opts.sync || (opts.speed = opts.speed / 2);
                for (var buffer = "shuffle" == opts.fx ? 500 : 250; opts.timeout - opts.speed < buffer;) opts.timeout += opts.speed
            }
            if (opts.easing && (opts.easeIn = opts.easeOut = opts.easing), opts.speedIn || (opts.speedIn = opts.speed), opts.speedOut || (opts.speedOut = opts.speed), opts.slideCount = els.length, opts.currSlide = opts.lastSlide = first, opts.random ? (++opts.randomIndex == els.length && (opts.randomIndex = 0), opts.nextSlide = opts.randomMap[opts.randomIndex]) : opts.nextSlide = opts.startingSlide >= els.length - 1 ? 0 : opts.startingSlide + 1, !opts.multiFx) {
                var init = $.fn.cycle.transitions[opts.fx];
                if ($.isFunction(init)) init($cont, $slides, opts);
                else if ("custom" != opts.fx && !opts.multiFx) return log("unknown transition: " + opts.fx, "; slideshow terminating"), !1
            }
            var e0 = $slides[first];
            return opts.before.length && opts.before[0].apply(e0, [e0, e0, opts, !0]), opts.after.length > 1 && opts.after[1].apply(e0, [e0, e0, opts, !0]), opts.next && $(opts.next).bind(opts.prevNextEvent, function() {
                return advance(opts, opts.rev ? -1 : 1)
            }), opts.prev && $(opts.prev).bind(opts.prevNextEvent, function() {
                return advance(opts, opts.rev ? 1 : -1)
            }), (opts.pager || opts.pagerAnchorBuilder) && buildPager(els, opts), exposeAddSlide(opts, els), opts
        }

        function saveOriginalOpts(opts) {
            opts.original = {
                before: [],
                after: []
            }, opts.original.cssBefore = $.extend({}, opts.cssBefore), opts.original.cssAfter = $.extend({}, opts.cssAfter), opts.original.animIn = $.extend({}, opts.animIn), opts.original.animOut = $.extend({}, opts.animOut), $.each(opts.before, function() {
                opts.original.before.push(this)
            }), $.each(opts.after, function() {
                opts.original.after.push(this)
            })
        }

        function supportMultiTransitions(opts) {
            var i, tx, txs = $.fn.cycle.transitions;
            if (opts.fx.indexOf(",") > 0) {
                for (opts.multiFx = !0, opts.fxs = opts.fx.replace(/\s*/g, "").split(","), i = 0; i < opts.fxs.length; i++) {
                    var fx = opts.fxs[i];
                    tx = txs[fx], tx && txs.hasOwnProperty(fx) && $.isFunction(tx) || (log("discarding unknown transition: ", fx), opts.fxs.splice(i, 1), i--)
                }
                if (!opts.fxs.length) return log("No valid transitions named; slideshow terminating."), !1
            } else if ("all" == opts.fx) {
                opts.multiFx = !0, opts.fxs = [];
                for (p in txs) tx = txs[p], txs.hasOwnProperty(p) && $.isFunction(tx) && opts.fxs.push(p)
            }
            if (opts.multiFx && opts.randomizeEffects) {
                var r1 = Math.floor(20 * Math.random()) + 30;
                for (i = 0; i < r1; i++) {
                    var r2 = Math.floor(Math.random() * opts.fxs.length);
                    opts.fxs.push(opts.fxs.splice(r2, 1)[0])
                }
                debug("randomized fx sequence: ", opts.fxs)
            }
            return !0
        }

        function exposeAddSlide(opts, els) {
            opts.addSlide = function(newSlide, prepend) {
                var $s = $(newSlide),
                    s = $s[0];
                opts.autostopCount || opts.countdown++, els[prepend ? "unshift" : "push"](s), opts.els && opts.els[prepend ? "unshift" : "push"](s), opts.slideCount = els.length, $s.css("position", "absolute"), $s[prepend ? "prependTo" : "appendTo"](opts.$cont), prepend && (opts.currSlide++, opts.nextSlide++), $.support.opacity || !opts.cleartype || opts.cleartypeNoBg || clearTypeFix($s), opts.fit && opts.width && $s.width(opts.width), opts.fit && opts.height && "auto" != opts.height && $slides.height(opts.height), s.cycleH = opts.fit && opts.height ? opts.height : $s.height(), s.cycleW = opts.fit && opts.width ? opts.width : $s.width(), $s.css(opts.cssBefore), (opts.pager || opts.pagerAnchorBuilder) && $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts), $.isFunction(opts.onAddSlide) ? opts.onAddSlide($s) : $s.hide()
            }
        }

        function go(els, opts, manual, fwd) {
            if (manual && opts.busy && opts.manualTrump && (debug("manualTrump in go(), stopping active transition"), $(els).stop(!0, !0), opts.busy = !1), opts.busy) return void debug("transition active, ignoring new tx request");
            var p = opts.$cont[0],
                curr = els[opts.currSlide],
                next = els[opts.nextSlide];
            if (p.cycleStop == opts.stopCount && (0 !== p.cycleTimeout || manual)) {
                if (!manual && !p.cyclePause && (opts.autostop && --opts.countdown <= 0 || opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide)) return void(opts.end && opts.end(opts));
                var changed = !1;
                if ((manual || !p.cyclePause) && opts.nextSlide != opts.currSlide) {
                    changed = !0;
                    var fx = opts.fx;
                    curr.cycleH = curr.cycleH || $(curr).height(), curr.cycleW = curr.cycleW || $(curr).width(), next.cycleH = next.cycleH || $(next).height(), next.cycleW = next.cycleW || $(next).width(), opts.multiFx && ((void 0 == opts.lastFx || ++opts.lastFx >= opts.fxs.length) && (opts.lastFx = 0), fx = opts.fxs[opts.lastFx], opts.currFx = fx), opts.oneTimeFx && (fx = opts.oneTimeFx, opts.oneTimeFx = null), $.fn.cycle.resetState(opts, fx), opts.before.length && $.each(opts.before, function(i, o) {
                        p.cycleStop == opts.stopCount && o.apply(next, [curr, next, opts, fwd])
                    });
                    var after = function() {
                        $.each(opts.after, function(i, o) {
                            p.cycleStop == opts.stopCount && o.apply(next, [curr, next, opts, fwd])
                        })
                    };
                    debug("tx firing; currSlide: " + opts.currSlide + "; nextSlide: " + opts.nextSlide), opts.busy = 1, opts.fxFn ? opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent) : $.isFunction($.fn.cycle[opts.fx]) ? $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent) : $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent)
                }
                if (changed || opts.nextSlide == opts.currSlide)
                    if (opts.lastSlide = opts.currSlide, opts.random) opts.currSlide = opts.nextSlide, ++opts.randomIndex == els.length && (opts.randomIndex = 0), opts.nextSlide = opts.randomMap[opts.randomIndex], opts.nextSlide == opts.currSlide && (opts.nextSlide = opts.currSlide == opts.slideCount - 1 ? 0 : opts.currSlide + 1);
                    else {
                        var roll = opts.nextSlide + 1 == els.length;
                        opts.nextSlide = roll ? 0 : opts.nextSlide + 1, opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1
                    }
                changed && opts.pager && opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
                var ms = 0;
                opts.timeout && !opts.continuous ? ms = getTimeout(curr, next, opts, fwd) : opts.continuous && p.cyclePause && (ms = 10), ms > 0 && (p.cycleTimeout = setTimeout(function() {
                    go(els, opts, 0, !opts.rev)
                }, ms))
            }
        }

        function getTimeout(curr, next, opts, fwd) {
            if (opts.timeoutFn) {
                for (var t = opts.timeoutFn(curr, next, opts, fwd); t - opts.speed < 250;) t += opts.speed;
                if (debug("calculated timeout: " + t + "; speed: " + opts.speed), t !== !1) return t
            }
            return opts.timeout
        }

        function advance(opts, val) {
            var els = opts.elements,
                p = opts.$cont[0],
                timeout = p.cycleTimeout;
            if (timeout && (clearTimeout(timeout), p.cycleTimeout = 0), opts.random && val < 0) opts.randomIndex--, --opts.randomIndex == -2 ? opts.randomIndex = els.length - 2 : opts.randomIndex == -1 && (opts.randomIndex = els.length - 1), opts.nextSlide = opts.randomMap[opts.randomIndex];
            else if (opts.random) opts.nextSlide = opts.randomMap[opts.randomIndex];
            else if (opts.nextSlide = opts.currSlide + val, opts.nextSlide < 0) {
                if (opts.nowrap) return !1;
                opts.nextSlide = els.length - 1
            } else if (opts.nextSlide >= els.length) {
                if (opts.nowrap) return !1;
                opts.nextSlide = 0
            }
            var cb = opts.onPrevNextEvent || opts.prevNextClick;
            return $.isFunction(cb) && cb(val > 0, opts.nextSlide, els[opts.nextSlide]), go(els, opts, 1, val >= 0), !1
        }

        function buildPager(els, opts) {
            var $p = $(opts.pager);
            $.each(els, function(i, o) {
                $.fn.cycle.createPagerAnchor(i, o, $p, els, opts)
            }), opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass)
        }

        function clearTypeFix($slides) {
            function hex(s) {
                return s = parseInt(s).toString(16), s.length < 2 ? "0" + s : s
            }

            function getBg(e) {
                for (; e && "html" != e.nodeName.toLowerCase(); e = e.parentNode) {
                    var v = $.css(e, "background-color");
                    if (v.indexOf("rgb") >= 0) {
                        var rgb = v.match(/\d+/g);
                        return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2])
                    }
                    if (v && "transparent" != v) return v
                }
                return "#ffffff"
            }
            debug("applying clearType background-color hack"), $slides.each(function() {
                $(this).css("background-color", getBg(this))
            })
        }
        var ver = "2.86";
        void 0 == $.support && ($.support = {
            opacity: !$.browser.msie
        }), $.fn.cycle = function(options, arg2) {
            var o = {
                s: this.selector,
                c: this.context
            };
            return 0 === this.length && "stop" != options ? !$.isReady && o.s ? (log("DOM not ready, queuing slideshow"), $(function() {
                $(o.s, o.c).cycle(options, arg2)
            }), this) : (log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)")), this) : this.each(function() {
                var opts = handleArguments(this, options, arg2);
                if (opts !== !1) {
                    opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink, this.cycleTimeout && clearTimeout(this.cycleTimeout), this.cycleTimeout = this.cyclePause = 0;
                    var $cont = $(this),
                        $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children(),
                        els = $slides.get();
                    if (els.length < 2) return void log("terminating; too few slides: " + els.length);
                    var opts2 = buildOptions($cont, $slides, els, opts, o);
                    if (opts2 !== !1) {
                        var startTime = opts2.continuous ? 10 : getTimeout(opts2.currSlide, opts2.nextSlide, opts2, !opts2.rev);
                        startTime && (startTime += opts2.delay || 0, startTime < 10 && (startTime = 10), debug("first timeout: " + startTime), this.cycleTimeout = setTimeout(function() {
                            go(els, opts2, 0, !opts2.rev)
                        }, startTime))
                    }
                }
            })
        }, $.fn.cycle.resetState = function(opts, fx) {
            fx = fx || opts.fx, opts.before = [], opts.after = [], opts.cssBefore = $.extend({}, opts.original.cssBefore), opts.cssAfter = $.extend({}, opts.original.cssAfter), opts.animIn = $.extend({}, opts.original.animIn), opts.animOut = $.extend({}, opts.original.animOut), opts.fxFn = null, $.each(opts.original.before, function() {
                opts.before.push(this)
            }), $.each(opts.original.after, function() {
                opts.after.push(this)
            });
            var init = $.fn.cycle.transitions[fx];
            $.isFunction(init) && init(opts.$cont, $(opts.elements), opts)
        }, $.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
            $(pager).each(function() {
                $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName)
            })
        }, $.fn.cycle.next = function(opts) {
            advance(opts, opts.rev ? -1 : 1)
        }, $.fn.cycle.prev = function(opts) {
            advance(opts, opts.rev ? 1 : -1)
        }, $.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
            var a;
            if ($.isFunction(opts.pagerAnchorBuilder) ? (a = opts.pagerAnchorBuilder(i, el), debug("pagerAnchorBuilder(" + i + ", el) returned: " + a)) : a = '<a href="#">' + (i + 1) + "</a>", a) {
                var $a = $(a);
                if (0 === $a.parents("body").length) {
                    var arr = [];
                    $p.length > 1 ? ($p.each(function() {
                        var $clone = $a.clone(!0);
                        $(this).append($clone), arr.push($clone[0])
                    }), $a = $(arr)) : $a.appendTo($p)
                }
                opts.pagerAnchors = opts.pagerAnchors || [], opts.pagerAnchors.push($a), $a.bind(opts.pagerEvent, function(e) {
                    e.preventDefault(), opts.nextSlide = i;
                    var p = opts.$cont[0],
                        timeout = p.cycleTimeout;
                    timeout && (clearTimeout(timeout), p.cycleTimeout = 0);
                    var cb = opts.onPagerEvent || opts.pagerClick;
                    $.isFunction(cb) && cb(opts.nextSlide, els[opts.nextSlide]), go(els, opts, 1, opts.currSlide < i)
                }), /^click/.test(opts.pagerEvent) || opts.allowPagerClickBubble || $a.bind("click.cycle", function() {
                    return !1
                }), opts.pauseOnPagerHover && $a.hover(function() {
                    opts.$cont[0].cyclePause++
                }, function() {
                    opts.$cont[0].cyclePause--
                })
            }
        }, $.fn.cycle.hopsFromLast = function(opts, fwd) {
            var hops, l = opts.lastSlide,
                c = opts.currSlide;
            return hops = fwd ? c > l ? c - l : opts.slideCount - l : c < l ? l - c : l + opts.slideCount - c
        }, $.fn.cycle.commonReset = function(curr, next, opts, w, h, rev) {
            $(opts.elements).not(curr).hide(), opts.cssBefore.opacity = 1, opts.cssBefore.display = "block", w !== !1 && next.cycleW > 0 && (opts.cssBefore.width = next.cycleW), h !== !1 && next.cycleH > 0 && (opts.cssBefore.height = next.cycleH), opts.cssAfter = opts.cssAfter || {}, opts.cssAfter.display = "none", $(curr).css("zIndex", opts.slideCount + (rev === !0 ? 1 : 0)), $(next).css("zIndex", opts.slideCount + (rev === !0 ? 0 : 1))
        }, $.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
            var $l = $(curr),
                $n = $(next),
                speedIn = opts.speedIn,
                speedOut = opts.speedOut,
                easeIn = opts.easeIn,
                easeOut = opts.easeOut;
            $n.css(opts.cssBefore), speedOverride && (speedIn = speedOut = "number" == typeof speedOverride ? speedOverride : 1, easeIn = easeOut = null);
            var fn = function() {
                $n.animate(opts.animIn, speedIn, easeIn, cb)
            };
            $l.animate(opts.animOut, speedOut, easeOut, function() {
                opts.cssAfter && $l.css(opts.cssAfter), opts.sync || fn()
            }), opts.sync && fn()
        }, $.fn.cycle.transitions = {
            fade: function($cont, $slides, opts) {
                $slides.not(":eq(" + opts.currSlide + ")").css("opacity", 0), opts.before.push(function(curr, next, opts) {
                    $.fn.cycle.commonReset(curr, next, opts), opts.cssBefore.opacity = 0
                }), opts.animIn = {
                    opacity: 1
                }, opts.animOut = {
                    opacity: 0
                }, opts.cssBefore = {
                    top: 0,
                    left: 0
                }
            }
        }, $.fn.cycle.ver = function() {
            return ver
        }, $.fn.cycle.defaults = {
            fx: "fade",
            timeout: 4e3,
            timeoutFn: null,
            continuous: 0,
            speed: 1e3,
            speedIn: null,
            speedOut: null,
            next: null,
            prev: null,
            onPrevNextEvent: null,
            prevNextEvent: "click.cycle",
            pager: null,
            onPagerEvent: null,
            pagerEvent: "click.cycle",
            allowPagerClickBubble: !1,
            pagerAnchorBuilder: null,
            before: null,
            after: null,
            end: null,
            easing: null,
            easeIn: null,
            easeOut: null,
            shuffle: null,
            animIn: null,
            animOut: null,
            cssBefore: null,
            cssAfter: null,
            fxFn: null,
            height: "auto",
            startingSlide: 0,
            sync: 1,
            random: 0,
            fit: 0,
            containerResize: 1,
            pause: 0,
            pauseOnPagerHover: 0,
            autostop: 0,
            autostopCount: 0,
            delay: 0,
            slideExpr: null,
            cleartype: !$.support.opacity,
            cleartypeNoBg: !1,
            nowrap: 0,
            fastOnEvent: 0,
            randomizeEffects: 1,
            rev: 0,
            manualTrump: !0,
            requeueOnImageNotLoaded: !0,
            requeueTimeout: 250,
            activePagerClass: "activeSlide",
            updateActivePagerLink: null
        }
    }(jQuery),
    function(window, document, $) {
        function args(elem) {
            var newAttrs = {},
                rinlinejQuery = /^jQuery\d+$/;
            return $.each(elem.attributes, function(i, attr) {
                attr.specified && !rinlinejQuery.test(attr.name) && (newAttrs[attr.name] = attr.value)
            }), newAttrs
        }

        function clearPlaceholder(event, value) {
            var input = this,
                $input = $(input);
            if (input.value == $input.attr("placeholder") && $input.hasClass("placeholder"))
                if ($input.data("placeholder-password")) {
                    if ($input = $input.hide().next().show().attr("id", $input.removeAttr("id").data("placeholder-id")), event === !0) return $input[0].value = value;
                    $input.focus()
                } else input.value = "", $input.removeClass("placeholder"), input == document.activeElement && input.select()
        }

        function setPlaceholder() {
            var $replacement, input = this,
                $input = $(input),
                id = this.id;
            if ("" == input.value) {
                if ("password" == input.type) {
                    if (!$input.data("placeholder-textinput")) {
                        try {
                            $replacement = $input.clone().attr({
                                type: "text"
                            })
                        } catch (e) {
                            $replacement = $("<input>").attr($.extend(args(this), {
                                type: "text"
                            }))
                        }
                        $replacement.removeAttr("name").data({
                            "placeholder-password": $input,
                            "placeholder-id": id
                        }).bind("focus.placeholder", clearPlaceholder), $input.data({
                            "placeholder-textinput": $replacement,
                            "placeholder-id": id
                        }).before($replacement)
                    }
                    $input = $input.removeAttr("id").hide().prev().attr("id", id).show()
                }
                $input.addClass("placeholder"), $input[0].value = $input.attr("placeholder")
            } else $input.removeClass("placeholder")
        }
        var hooks, placeholder, isInputSupported = "placeholder" in document.createElement("input"),
            isTextareaSupported = "placeholder" in document.createElement("textarea"),
            prototype = $.fn,
            valHooks = $.valHooks,
            propHooks = $.propHooks;
        isInputSupported && isTextareaSupported ? (placeholder = prototype.placeholder = function() {
            return this
        }, placeholder.input = placeholder.textarea = !0) : (placeholder = prototype.placeholder = function() {
            var $this = this;
            return $this.filter((isInputSupported ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": clearPlaceholder,
                "blur.placeholder": setPlaceholder
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), $this
        }, placeholder.input = isInputSupported, placeholder.textarea = isTextareaSupported, hooks = {
            get: function(element) {
                var $element = $(element),
                    $passwordInput = $element.data("placeholder-password");
                return $passwordInput ? $passwordInput[0].value : $element.data("placeholder-enabled") && $element.hasClass("placeholder") ? "" : element.value
            },
            set: function(element, value) {
                var $element = $(element),
                    $passwordInput = $element.data("placeholder-password");
                return $passwordInput ? $passwordInput[0].value = value : $element.data("placeholder-enabled") ? ("" == value ? (element.value = value, element != document.activeElement && setPlaceholder.call(element)) : $element.hasClass("placeholder") ? clearPlaceholder.call(element, !0, value) || (element.value = value) : element.value = value, $element) : element.value = value
            }
        }, isInputSupported || (valHooks.input = hooks, propHooks.value = hooks), isTextareaSupported || (valHooks.textarea = hooks, propHooks.value = hooks), $(function() {
            $(document).delegate("form", "submit.placeholder", function() {
                var $inputs = $(".placeholder", this).each(clearPlaceholder);
                setTimeout(function() {
                    $inputs.each(setPlaceholder)
                }, 10)
            })
        }), $(window).bind("beforeunload.placeholder", function() {
            $(".placeholder").each(function() {
                this.value = ""
            })
        }))
    }(this, document, jQuery),
    function() {
        function setup($) {
            function install(el, opts) {
                var css, themedCSS, full = el == window,
                    msg = opts && void 0 !== opts.message ? opts.message : void 0;
                if (opts = $.extend({}, $.blockUI.defaults, opts || {}), !opts.ignoreIfBlocked || !$(el).data("blockUI.isBlocked")) {
                    if (opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {}), css = $.extend({}, $.blockUI.defaults.css, opts.css || {}), themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {}), msg = void 0 === msg ? opts.message : msg, full && pageBlock && remove(window, {
                            fadeOut: 0
                        }), msg && "string" != typeof msg && (msg.parentNode || msg.jquery)) {
                        var node = msg.jquery ? msg[0] : msg,
                            data = {};
                        $(el).data("blockUI.history", data), data.el = node, data.parent = node.parentNode, data.display = node.style.display, data.position = node.style.position, data.parent && data.parent.removeChild(node)
                    }
                    $(el).data("blockUI.onUnblock", opts.onUnblock);
                    var lyr3, s, z = opts.baseZ,
                        lyr1 = $($.browser.msie || opts.forceIframe ? '<iframe class="blockUI" style="z-index:' + z++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'),
                        lyr2 = $(opts.theme ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + z++ + ';display:none"></div>' : '<div class="blockUI blockOverlay" style="z-index:' + z++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
                    s = opts.theme && full ? '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : opts.theme ? '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : full ? '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>', lyr3 = $(s), msg && (opts.theme ? (lyr3.css(themedCSS), lyr3.addClass("ui-widget-content")) : lyr3.css(css)), opts.theme || opts.applyPlatformOpacityRules && $.browser.mozilla && /Linux/.test(navigator.platform) || lyr2.css(opts.overlayCSS), lyr2.css("position", full ? "fixed" : "absolute"), ($.browser.msie || opts.forceIframe) && lyr1.css("opacity", 0);
                    var layers = [lyr1, lyr2, lyr3],
                        $par = $(full ? "body" : el);
                    $.each(layers, function() {
                        this.appendTo($par)
                    }), opts.theme && opts.draggable && $.fn.draggable && lyr3.draggable({
                        handle: ".ui-dialog-titlebar",
                        cancel: "li"
                    });
                    var expr = setExpr && (!$.boxModel || $("object,embed", full ? null : el).length > 0);
                    if (ie6 || expr) {
                        if (full && opts.allowBodyStretch && $.boxModel && $("html,body").css("height", "100%"), (ie6 || !$.boxModel) && !full) var t = sz(el, "borderTopWidth"),
                            l = sz(el, "borderLeftWidth"),
                            fixT = t ? "(0 - " + t + ")" : 0,
                            fixL = l ? "(0 - " + l + ")" : 0;
                        $.each([lyr1, lyr2, lyr3], function(i, o) {
                            var s = o[0].style;
                            if (s.position = "absolute", i < 2) full ? s.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:" + opts.quirksmodeOffsetHack + ') + "px"') : s.setExpression("height", 'this.parentNode.offsetHeight + "px"'), full ? s.setExpression("width", 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : s.setExpression("width", 'this.parentNode.offsetWidth + "px"'), fixL && s.setExpression("left", fixL), fixT && s.setExpression("top", fixT);
                            else if (opts.centerY) full && s.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), s.marginTop = 0;
                            else if (!opts.centerY && full) {
                                var top = opts.css && opts.css.top ? parseInt(opts.css.top) : 0,
                                    expression = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + top + ') + "px"';
                                s.setExpression("top", expression)
                            }
                        })
                    }
                    if (msg && (opts.theme ? lyr3.find(".ui-widget-content").append(msg) : lyr3.append(msg), (msg.jquery || msg.nodeType) && $(msg).show()), ($.browser.msie || opts.forceIframe) && opts.showOverlay && lyr1.show(), opts.fadeIn) {
                        var cb = opts.onBlock ? opts.onBlock : noOp,
                            cb1 = opts.showOverlay && !msg ? cb : noOp,
                            cb2 = msg ? cb : noOp;
                        opts.showOverlay && lyr2._fadeIn(opts.fadeIn, cb1), msg && lyr3._fadeIn(opts.fadeIn, cb2)
                    } else opts.showOverlay && lyr2.show(), msg && lyr3.show(), opts.onBlock && opts.onBlock();
                    if (bind(1, el, opts), full ? (pageBlock = lyr3[0], pageBlockEls = $(":input:enabled:visible", pageBlock), opts.focusInput && setTimeout(focus, 20)) : center(lyr3[0], opts.centerX, opts.centerY), opts.timeout) {
                        var to = setTimeout(function() {
                            full ? $.unblockUI(opts) : $(el).unblock(opts)
                        }, opts.timeout);
                        $(el).data("blockUI.timeout", to)
                    }
                }
            }

            function remove(el, opts) {
                var full = el == window,
                    $el = $(el),
                    data = $el.data("blockUI.history"),
                    to = $el.data("blockUI.timeout");
                to && (clearTimeout(to), $el.removeData("blockUI.timeout")), opts = $.extend({}, $.blockUI.defaults, opts || {}), bind(0, el, opts), null === opts.onUnblock && (opts.onUnblock = $el.data("blockUI.onUnblock"), $el.removeData("blockUI.onUnblock"));
                var els;
                els = full ? $("body").children().filter(".blockUI").add("body > .blockUI") : $(".blockUI", el), full && (pageBlock = pageBlockEls = null), opts.fadeOut ? (els.fadeOut(opts.fadeOut), setTimeout(function() {
                    reset(els, data, opts, el)
                }, opts.fadeOut)) : reset(els, data, opts, el)
            }

            function reset(els, data, opts, el) {
                els.each(function(i, o) {
                    this.parentNode && this.parentNode.removeChild(this)
                }), data && data.el && (data.el.style.display = data.display, data.el.style.position = data.position, data.parent && data.parent.appendChild(data.el), $(el).removeData("blockUI.history")), "function" == typeof opts.onUnblock && opts.onUnblock(el, opts)
            }

            function bind(b, el, opts) {
                var full = el == window,
                    $el = $(el);
                if ((b || (!full || pageBlock) && (full || $el.data("blockUI.isBlocked"))) && ($el.data("blockUI.isBlocked", b), opts.bindEvents && (!b || opts.showOverlay))) {
                    var events = "mousedown mouseup keydown keypress";
                    b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler)
                }
            }

            function handler(e) {
                if (e.keyCode && 9 == e.keyCode && pageBlock && e.data.constrainTabKey) {
                    var els = pageBlockEls,
                        fwd = !e.shiftKey && e.target === els[els.length - 1],
                        back = e.shiftKey && e.target === els[0];
                    if (fwd || back) return setTimeout(function() {
                        focus(back)
                    }, 10), !1
                }
                var opts = e.data;
                return $(e.target).parents("div." + opts.blockMsgClass).length > 0 || 0 == $(e.target).parents().children().filter("div.blockUI").length
            }

            function focus(back) {
                if (pageBlockEls) {
                    var e = pageBlockEls[back === !0 ? pageBlockEls.length - 1 : 0];
                    e && e.focus()
                }
            }

            function center(el, x, y) {
                var p = el.parentNode,
                    s = el.style,
                    l = (p.offsetWidth - el.offsetWidth) / 2 - sz(p, "borderLeftWidth"),
                    t = (p.offsetHeight - el.offsetHeight) / 2 - sz(p, "borderTopWidth");
                x && (s.left = l > 0 ? l + "px" : "0"), y && (s.top = t > 0 ? t + "px" : "0")
            }

            function sz(el, p) {
                return parseInt($.css(el, p)) || 0
            }
            if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) return void alert("blockUI requires jQuery v1.2.3 or later!  You are using v" + $.fn.jquery);
            $.fn._fadeIn = $.fn.fadeIn;
            var noOp = function() {},
                mode = document.documentMode || 0,
                setExpr = $.browser.msie && ($.browser.version < 8 && !mode || mode < 8),
                ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;
            $.blockUI = function(opts) {
                install(window, opts)
            }, $.unblockUI = function(opts) {
                remove(window, opts)
            }, $.growlUI = function(title, message, timeout, onClose) {
                var $m = $('<div class="growlUI"></div>');
                title && $m.append("<h1>" + title + "</h1>"), message && $m.append("<h2>" + message + "</h2>"), void 0 == timeout && (timeout = 3e3), $.blockUI({
                    message: $m,
                    fadeIn: 700,
                    fadeOut: 1e3,
                    centerY: !1,
                    timeout: timeout,
                    showOverlay: !1,
                    onUnblock: onClose,
                    css: $.blockUI.defaults.growlCSS
                })
            }, $.fn.block = function(opts) {
                var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
                return this.each(function() {
                    var $el = $(this);
                    fullOpts.ignoreIfBlocked && $el.data("blockUI.isBlocked") || $el.unblock({
                        fadeOut: 0
                    })
                }), this.each(function() {
                    "static" == $.css(this, "position") && (this.style.position = "relative"), $.browser.msie && (this.style.zoom = 1), install(this, opts)
                })
            }, $.fn.unblock = function(opts) {
                return this.each(function() {
                    remove(this, opts)
                })
            }, $.blockUI.version = 2.42, $.blockUI.defaults = {
                message: "<h1>Please wait...</h1>",
                title: null,
                draggable: !0,
                theme: !1,
                css: {
                    padding: 0,
                    margin: 0,
                    width: "30%",
                    top: "40%",
                    left: "35%",
                    textAlign: "center",
                    color: "#000",
                    border: "3px solid #aaa",
                    backgroundColor: "#fff",
                    cursor: "wait"
                },
                themedCSS: {
                    width: "30%",
                    top: "40%",
                    left: "35%"
                },
                overlayCSS: {
                    backgroundColor: "#f7f7f7",
                    opacity: .5,
                    cursor: "wait"
                },
                growlCSS: {
                    width: "350px",
                    top: "10px",
                    left: "",
                    right: "10px",
                    border: "none",
                    padding: "5px",
                    opacity: .6,
                    cursor: "default",
                    color: "#fff",
                    backgroundColor: "#000",
                    "-webkit-border-radius": "10px",
                    "-moz-border-radius": "10px",
                    "border-radius": "10px"
                },
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
                forceIframe: !1,
                baseZ: 1e3,
                centerX: !0,
                centerY: !0,
                allowBodyStretch: !0,
                bindEvents: !0,
                constrainTabKey: !0,
                fadeIn: 200,
                fadeOut: 400,
                timeout: 0,
                showOverlay: !0,
                focusInput: !0,
                applyPlatformOpacityRules: !0,
                onBlock: null,
                onUnblock: null,
                quirksmodeOffsetHack: 4,
                blockMsgClass: "blockMsg",
                ignoreIfBlocked: !1
            };
            var pageBlock = null,
                pageBlockEls = []
        }
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], setup) : setup(jQuery)
    }(),
    function(sb, $) {
        "use strict";
        var nav = sb.megaMenu = {},
            $nav = $("#nav"),
            $navControl = $nav.find(".nav_control"),
            $navMenu = $nav.find(".nav_menu"),
            $navList = $navMenu.find("ul"),
            $navAnchors = $navList.find(".tab"),
            $megaMenus = $("#menus");
        0 !== $nav.length && (nav.currentType = "", nav.menuIsActive = !1, nav.keyMap = {}, nav.keyClose = 27, nav.keyForward = 9, nav.keyBack = [9, 16], nav.handleDOMMouseOver = function(e) {
            var target = $(e.target);
            target.parents(".nav_menu", $nav).length < 1 && target.parents("#menus").length < 1 && nav.full.close(nav.findItemName($navList.find("li.open")), !0)
        }, nav.handleDOMTouchEvent = function(e) {
            var touch = $(e.originalEvent.touches[0].target);
            touch.parents(".nav_menu", $nav).length < 1 && touch.parents("#menus").length < 1 && nav.full.close(nav.findItemName($navList.find("li.open")), !0)
        }, nav.handleKeyUp = function(e) {
            nav.keyMap[e.keyCode] = !1
        }, nav.handleKeydown = function(e) {
            function checkForMultipleBackKeys(e) {
                return nav.keyBack instanceof Array == 1 ? nav.keyMap[nav.keyBack[0]] && nav.keyMap[nav.keyBack[1]] : nav.keyMap[nav.keyBack]
            }
            var tab = $("li.open", $navList);
            tab.length < 1 || (nav.keyMap[e.keyCode] = !0, checkForMultipleBackKeys(e) ? tab.prev().length > 0 ? $("#menu_" + nav.findItemName(tab) + " a:first:focus").length > 0 ? (e.preventDefault(), e.stopPropagation(), $("a.tab", tab).focus()) : $("a.tab:focus", tab).length > 0 && (e.preventDefault(), e.stopPropagation(), $("a.tab", tab.prev()).focus(), nav.full.close(nav.findItemName(tab)), nav.full.open(nav.findItemName(tab.prev()))) : nav.full.close(nav.findItemName($("li.open", $navList)), !0) : e.keyCode == nav.keyForward ? $("a.tab:focus", tab).length > 0 ? (e.preventDefault(), e.stopPropagation(), $("#menu_" + nav.findItemName(tab) + " a:first").focus()) : $("#menu_" + nav.findItemName(tab) + " a:last:focus").length > 0 ? (e.preventDefault(), e.stopPropagation(), tab.next().length > 0 ? ($(".tab", tab.next()).focus(), nav.full.close(nav.findItemName(tab)), nav.full.open(nav.findItemName(tab.next()))) : (nav.full.close(nav.findItemName(tab), !0), $(".tab", tab).focus())) : $("*:focus", $navList).length < 1 && $("*:focus", $megaMenus).length < 1 && (e.preventDefault(), e.stopPropagation(), $("#menu_" + nav.findItemName(tab) + " a:first").focus()) : e.keyCode == nav.keyClose && (nav.full.close(nav.findItemName(tab), !0), $("a.tab", tab).focus()))
        }, nav.setMouseListeners = function() {
            $("body").on("mouseover", nav.handleDOMMouseOver)
        }, nav.removeMouseListeners = function() {
            $("body").off("mouseover", nav.handleDOMMouseOver)
        }, nav.setTouchListeners = function() {
            $("body").on("touchstart", nav.handleDOMTouchEvent)
        }, nav.removeTouchListeners = function() {
            $("body").off("touchstart", nav.handleDOMTouchEvent)
        }, nav.setKeyboardListeners = function() {
            nav.keyMap = {}, $(document).on("keydown", nav.handleKeydown).on("keyup", nav.handleKeyUp)
        }, nav.removeKeyboardListeners = function() {
            $(document).off("keydown", nav.handleKeydown).off("keyup", nav.handleKeyUp)
        }, nav.setActiveStateHandlers = function() {
            Modernizr.touch ? nav.setTouchListeners() : (nav.setMouseListeners(), nav.setKeyboardListeners()), nav.menuIsActive = !0
        }, nav.removeActiveStateHandlers = function() {
            Modernizr.touch ? nav.removeTouchListeners() : (nav.removeMouseListeners(), nav.removeKeyboardListeners()), nav.menuIsActive = !1
        }, nav.setInterfaceTouch = function() {
            $("li", $navList).each(function() {
                $(this).children("a").each(function() {
                    $(this).bind("touchstart", function(e) {
                        var touchTarget = $(e.originalEvent.touches[0].target);
                        if (touchTarget = "A" == touchTarget.get(0).tagName.toUpperCase() ? touchTarget : touchTarget.parents("a"), touchTarget.parents("ul").children("li.open").each(function() {
                                if ($(this).index() != touchTarget.parent().index()) return nav.full.close(nav.findItemName($navList.find("li.open"))), !1
                            }), !$(touchTarget).parents("li").hasClass("open")) return e.preventDefault(), e.stopPropagation(), nav.full.open(nav.findItemName($(touchTarget).parents("li"))), !1
                    }), $(this).bind("click", function(e) {
                        var $thisNav = $(this).parent("li"),
                            thisItem = nav.findItemName($thisNav),
                            isThisNavOpen = $thisNav.hasClass("open");
                        if ($megaMenus.find("#menu_" + thisItem).length > 0 && !isThisNavOpen) return e.originalEvent.preventDefault(), nav.full.open(thisItem), !1
                    })
                })
            })
        }, nav.setKeyboardAndMouseInterface = function() {
            var timer;
            $navList.find("li").on("mouseover", function() {
                var $target = $(this);
                $navList.find(".open").each(function() {
                    var $open = $(this);
                    $open.attr("id") !== $target.attr("id") && nav.full.close(nav.findItemName($open))
                }), $target.hasClass("open") || ($megaMenus.height() > 0 ? nav.full.open(nav.findItemName($target)) : timer = window.setTimeout(function() {
                    nav.full.open(nav.findItemName($target))
                }, 100))
            }).on("mouseout", function() {
                window.clearTimeout(timer)
            }), $navAnchors.bind("click", function(e) {
                var $thisNav = $(this).parent("li"),
                    thisItem = nav.findItemName($thisNav),
                    isThisNavOpen = $thisNav.hasClass("open");
                if ($megaMenus.find("#menu_" + thisItem).length > 0 && !isThisNavOpen) return e.preventDefault(), nav.full.open(thisItem), !1
            })
        }, nav.full = function() {
            nav.small.deactivate(), nav.full.init()
        }, nav.full.init = function() {
            nav.currentType = "full", $nav.addClass("full"), Modernizr.touch ? nav.setInterfaceTouch() : nav.setKeyboardAndMouseInterface()
        }, nav.full.deactivate = function() {
            $navList.find("li.open").length > 0 && nav.full.close(nav.findItemName($navList.find("li.open")), !0)
        }, nav.full.close = function(item, deactivate) {
            function handleCloseComplete() {
                $megaMenus.removeClass("openMega"), $megaMenus.find("#menu_" + item).removeClass("open"), $(document).off("click.megaMenu.full"), $nav.trigger("megaMenu.full.close")
            }

            function AnimateCSS() {
                $(".container", $megaMenus).attr("data-height", 0).removeAttr("style")
            }

            function AnimateJQuery(cb) {
                $(".container", $megaMenus).attr("data-height", 0).stop(!0, !0).animate({
                    height: 0
                }, {
                    duration: 110,
                    easing: "linear",
                    complete: cb
                })
            }
            $navList.find("#nav_" + item).removeClass("open"), Modernizr.csstransitions && deactivate ? (AnimateCSS(), handleCloseComplete(), nav.menuIsActive && nav.removeActiveStateHandlers()) : deactivate ? AnimateJQuery(function() {
                handleCloseComplete(), nav.menuIsActive && nav.removeActiveStateHandlers()
            }) : Modernizr.csstransitions ? handleCloseComplete() : AnimateJQuery(handleCloseComplete)
        }, nav.full.open = function(item) {
            $(document).trigger("megaMenuOpen"), sb.utilitiesMenus.menuOpen && sb.utilitiesMenus.closeUtilityDash();
            var $currentItem = $("#menu_" + item, $megaMenus);
            Modernizr.touch && $currentItem.css("opacity", "0"), Modernizr.csstransitions || $megaMenus.find("li.open").removeClass("open");
            var navListItem = $navList.find("#nav_" + item);
            navListItem.addClass("open"), $currentItem.addClass("open"), $megaMenus.addClass("openMega");
            var _currentItemHeight = $currentItem.css("height");
            return Modernizr.csstransitions ? $(".container", $megaMenus).attr("data-height", _currentItemHeight).css("height", _currentItemHeight) : $(".container", $megaMenus).attr("data-height", _currentItemHeight).stop(!0, !1).animate({
                height: _currentItemHeight
            }, 110, "linear"), $(document).on("click.megaMenu.full", function(e) {
                if ("A" == e.currentTarget.tagName) return !1
            }), Modernizr.touch && $currentItem.css("opacity", "1.0"), $nav.trigger("megaMenu.full.open"), nav.menuIsActive || nav.setActiveStateHandlers(), !1
        }, nav.small = function() {
            nav.full.deactivate(), nav.small.activate()
        }, nav.small.activate = function() {
            nav.currentType = "small", $nav.addClass("small"), $navControl.bind("click", function() {
                return $nav.hasClass("open") ? nav.small.close() : nav.small.open(), $("li.utility_dropdown.open").removeClass("open"), !1
            })
        }, nav.small.close = function() {
            Modernizr.csstransitions && $navMenu.css("height", "0").removeAttr("style"), $nav.removeClass("open")
        }, nav.small.deactivate = function() {
            "small" === nav.currentType && ($nav.removeClass("small"), $navControl.unbind("click"), nav.small.close())
        }, nav.small.open = function() {
            $(document).trigger("megaMenuOpen"), $nav.addClass("open"), Modernizr.csstransitions && $navMenu.css("height", $navList.outerHeight() + "px"), $(document).on("click.megaMenu.small", function(e) {
                1 !== $(e.target).parents().filter($("div.nav_menu")).length && nav.small.close()
            })
        }, nav.init = function() {
            sb.rwd.matchViewport("iPad-Portrait") ? "full" !== nav.currentType && nav.full() : "small" !== nav.currentType && nav.small()
        }, nav.findItemName = function($item) {
            var output;
            try {
                output = $item.attr("id").replace("nav_", "")
            } catch (e) {
                sb.console.log("error:" + e)
            }
            return output
        }, $(function() {
            sb.rwd.onDelayedResize(nav.init, !0)
        }))
    }(window.sb = window.sb || {}, jQuery),
    function(sb, $) {
        var menu = sb.utilitiesMenus = {},
            $utilities = $("#utilities"),
            $dropdown = $utilities.find(".utility_dropdown"),
            $utilitydash = $(".utility_dash"),
            $dashcontentwrap = $(".dash_content_wrap"),
            $header = $("#header"),
            layoutType = ($("#search"), "");
        menu.currentType = "", menu.menuOpen = !1, menu.touchEnabled = Modernizr.touch, menu.pushdownSearchOffset = 4, menu.pushdownContentOffset = "1.916667em", menu.pushdownContentOffsetAvatar = "2.3em", menu.pushdownUtilityDashOffset = 12, menu.dropdown = function() {
            menu.pushdown.deactivate(), menu.dropdown.activate()
        }, menu.dropdown.activate = function() {
            menu.currentType = "dropdown", $utilitydash.addClass("dropdown"), $dashcontentwrap.hide()
        }, menu.dropdown.deactivate = function() {
            menu.dropdown.close(function() {
                $utilitydash.removeClass("dropdown"), $(".utility_dash_item").removeClass("dropdown_open")
            })
        }, menu.dropdown.open = function() {
            sb.megaMenu.full.deactivate(), $(document).on("click.utilityDash", function(e) {
                1 !== $(e.target).parents().filter($utilitydash).length && menu.dropdown.close();
            }), $utilitydash.addClass("open"), $(".utility_dash_item").addClass("dropdown_open"), menu.menuOpen = !0, $dashcontentwrap.fadeIn(250)
        }, menu.dropdown.close = function(callback) {
            $(document).off("click.utilityDash"), $utilitydash.removeClass("open"), menu.menuOpen = !1, "function" == typeof callback ? $dashcontentwrap.fadeOut(250, callback) : $dashcontentwrap.fadeOut(250)
        }, menu.pushdown = function() {
            menu.dropdown.deactivate(), menu.pushdown.activate()
        }, menu.pushdown.activate = function() {
            menu.currentType = "pushdown"
        }, menu.pushdown.deactivate = function() {
            $header.hasClass("dash_open") && menu.pushdown.close()
        }, menu.pushdown.open = function() {
            var offsetHeight = 0,
                paddingOffset = 0;
            sb.megaMenu.full.deactivate(), $(document).on("click.utilityDash", function(e) {
                $(e.target).parents().filter($utilitydash).length < 1 && menu.pushdown.close()
            }), $utilitydash.addClass("open"), menu.menuOpen = !0, paddingOffset = parseInt($dashcontentwrap.css("padding-top"), 10) + parseInt($dashcontentwrap.css("padding-bottom"), 10), offsetHeight = $dashcontentwrap.height() + menu.pushdownUtilityDashOffset + paddingOffset, $dashcontentwrap.css("top", "-" + offsetHeight + "px").fadeIn(), $header.animate({
                marginTop: offsetHeight + "px"
            }).addClass("dash_open")
        }, menu.pushdown.close = function() {
            $(document).off("click.utilityDash"), $(document).off("touchstart.utilityDash"), menu.menuOpen = !1, $dashcontentwrap.fadeOut(250), $header.animate({
                marginTop: 0
            }, function() {
                $utilitydash.hasClass("w_user_avatar") ? $dashcontentwrap.css("top", menu.pushdownContentOffsetAvatar) : $dashcontentwrap.css("top", menu.pushdownContentOffset), $utilitydash.removeClass("open"), $(this).removeClass("dash_open")
            })
        }, menu.pushdown.adjustOffset = function() {
            var offsetHeight = 0,
                paddingOffset = 0;
            paddingOffset = parseInt($dashcontentwrap.css("padding-top"), 10) + parseInt($dashcontentwrap.css("padding-bottom"), 10), offsetHeight = $dashcontentwrap.height() + menu.pushdownUtilityDashOffset + paddingOffset, $header.css("margin-top", offsetHeight + "px"), $dashcontentwrap.css("top", "-" + offsetHeight + "px"), $dashcontentwrap.animate({
                top: "-" + offsetHeight + "px"
            }, 250)
        }, menu.pushdown.toggleLayout = function() {
            menu.menuOpen && "pushdown" === menu.currentType && (sb.rwd.matchViewport("M") ? ("double-column" !== layoutType && menu.pushdown.adjustOffset(), layoutType = "double-column") : ("single-column" !== layoutType && menu.pushdown.adjustOffset(), layoutType = "single-column"))
        }, menu.pushdown.changeLayoutWidth = function() {
            menu.menuOpen && "pushdown" === menu.currentType && sb.rwd.matchViewport("S") && menu.pushdown.adjustOffset()
        }, menu.init = function() {
            sb.rwd.matchViewport("iPad-Portrait") && !menu.touchEnabled ? "dropdown" !== menu.currentType && menu.dropdown() : "pushdown" !== menu.currentType && menu.pushdown()
        }, menu.closeUtilityDash = function() {
            "dropdown" === menu.currentType && menu.dropdown.close()
        }, menu.close = function() {
            $dropdown.hasClass("open") && $dropdown.removeClass("open"), $(document).off("click.utilitiesMenus"), $header.hasClass("dash_open") && menu.pushdown.close(), $.each($("video"), function(index, value) {
                $thisVideo = $(value), $thisVideo.attr("controls", $thisVideo.attr("data-controls")).removeAttr("data-controls")
            })
        }, menu.open = function($dropdownCurrent) {
            $dropdownCurrent.addClass("open"), $(document).on("click.utilitiesMenus", function(e) {
                1 !== $(e.target).parents().filter($dropdown).length && menu.close()
            }), $.each($("video"), function(index, value) {
                $thisVideo = $(value), $thisVideo.attr("data-controls", $thisVideo.attr("controls")).removeAttr("controls")
            })
        }, $(function() {
            var $languageSelection = $("#languageSelection"),
                $language_selections = $(".language_selections"),
                $signout_link = $(".util_signout_link"),
                selectionWidth = $languageSelection.width(),
                listWidth = $language_selections.width(),
                listHeight = $language_selections.height(),
                marginOffset = parseInt($language_selections.find("ul").css("margin-bottom"), 10),
                adjustedPosition = 0 - listHeight - marginOffset;
            $language_selections.css("top", adjustedPosition), selectionWidth > listWidth && $language_selections.width(selectionWidth), $dropdown.length < 0 || ($languageSelection.on("click", function() {
                return $(this).toggleClass("open"), !1
            }), $language_selections.click(function(e) {
                return !!$languageSelection.hasClass("open") && void e.stopPropagation()
            }), $signout_link.click(function() {
                var form = $(this).closest("form"),
                    action = form.attr("action");
                return form.attr("action", "https://" + location.host + action), form.submit(), !1
            }), $dropdown.on("click", ".current", function() {
                var $dropdownCurrent = $(this).parent();
                return $dropdown.not($dropdownCurrent).hasClass("open") && menu.close(), $utilitydash.hasClass("open") && ("dropdown" === menu.currentType ? menu.dropdown.close() : menu.pushdown.close()), $dropdownCurrent.hasClass("open") ? menu.close() : menu.open($dropdownCurrent), !1
            }), $utilitydash.on("click", ".current", function() {
                return $dropdown.hasClass("open") && menu.close(), $utilitydash.hasClass("open") ? "dropdown" === menu.currentType ? menu.dropdown.close() : menu.pushdown.close() : "dropdown" === menu.currentType ? menu.dropdown.open() : menu.pushdown.open(), !1
            }), sb.rwd.onDelayedResize(menu.init, !0), sb.rwd.onDelayedResize(menu.pushdown.toggleLayout, !0), sb.rwd.onDelayedResize(menu.pushdown.changeLayoutWidth, !0))
        })
    }(window.sb = window.sb || {}, jQuery), sb.instagramPromo = function() {
        function getInstagramData(tag) {
            promoWidth = promoDiv.parent().width(), $.getJSON("/promo/instagramdata/" + tag).success(displayImages).error(failed)
        }

        function getInstagramImage(fromCurrentPosition) {
            var tempPosition = currentPosition + fromCurrentPosition;
            return tempPosition < 0 && (tempPosition = responseData.length + tempPosition), $("#instagram" + responseData[tempPosition].id)
        }

        function displayImages(response) {
            responseData = new Array, $.each(response.instaData.data, function(i, item) {
                $.each(response.flags, function(j, flag) {
                    flag == item.id && (item.id = "0")
                }), "0" != item.id && (responseData[responseData.length] = item)
            }), currentPosition = 0;
            for (var imagesShowing = Math.ceil(promoWidth / responseData[currentPosition].images.thumbnail.width) + 1, i = 0; i < imagesShowing; i++) appendImage(responseData[currentPosition].images.thumbnail.url, responseData[currentPosition].id, responseData[currentPosition].link), currentPosition++, currentPosition >= responseData.length && (currentPosition = 0);
            setInterval(showNextImage, 3e3)
        }

        function appendImage(url, id, link) {
            if ($("#instagram" + responseData[currentPosition].id).length) $("#instagram" + responseData[currentPosition].id).css("left", promoWidth + "px");
            else if (linkImages) {
                var a = $("<a/>").attr({
                    href: link,
                    id: "instagram" + id,
                    title: "image details on instagram"
                }).css("left", promoWidth + "px");
                $("<img/>").attr("src", url).appendTo(a), a.appendTo(promoDiv)
            } else $("<img/>").attr("src", url).attr("id", "instagram" + id).css("left", promoWidth + "px").appendTo(promoDiv)
        }

        function showNextImage() {
            currentPosition >= responseData.length && (currentPosition = 0), appendImage(responseData[currentPosition].images.thumbnail.url, responseData[currentPosition].id, responseData[currentPosition].link), imgWidth = responseData[currentPosition].images.thumbnail.width;
            for (var imagesToMove = Math.ceil(promoWidth / imgWidth) + 1, offSet = -imgWidth - imgPad, i = 0; i < imagesToMove; i++) getInstagramImage(i - imagesToMove + 1).animate({
                left: offSet + "px"
            }, 200), offSet += imgWidth + imgPad;
            currentPosition++
        }

        function failed(response) {
            $(".instagramContent").hide()
        }
        var responseData, promoDiv, currentPosition = 0,
            imgWidth = 155,
            promoWidth = 0,
            imgPad = 5,
            linkImages = !1;
        return {
            initialize: function() {
                if (promoDiv = $(".instagramContent div"), promoDiv.length) {
                    var instaTag = promoDiv.attr("tag");
                    promoDiv.parent().hasClass("linkImages") && (linkImages = !0), getInstagramData(instaTag)
                }
            }
        }
    }(), $(document).ready(sb.instagramPromo.initialize),
    function(rwd, $) {
        "use strict";
        rwd.detectBoxSizing = function() {
            Modernizr.addTest("boxsizing", function() {
                return Modernizr.testAllProps("boxSizing") && (void 0 === document.documentMode || document.documentMode > 7)
            })
        }, rwd.detectNthChild = function() {
            Modernizr.addTest("nthchild", function() {
                function isSelectorSupported(sel) {
                    var bool, el = document.createElement("div");
                    try {
                        if (!document.styleSheets[0].cssRules) return
                    } catch (e) {
                        if ("SecurityError" !== e.name) throw e;
                        return
                    }
                    return el.setAttribute("id", "nthchild"), el.innerHTML = "<style>" + sel + "{}</style>", document.body.appendChild(el), bool = void 0 !== document.styleSheets[0].cssRules && !!el.lastChild.sheet.cssRules[0], document.body.removeChild(el), bool
                }
                return isSelectorSupported(":nth-child(2n)")
            })
        }, rwd.fixBoxSizing = function() {
            Modernizr.boxsizing || ($(".region").wrapInner('<div class="region-wrap"></div>'), $(".blocks > li").wrapInner('<div class="blocks-wrap"></div>'))
        }, rwd.fixIE7Grid = function() {
            var $html = $("html");
            $html.hasClass("ie7") && $html.find(".region:last-child").not(".region-centered").addClass("region-last")
        }, rwd.fixiOSOrientation = function() {
            var ua = navigator.userAgent;
            if (/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf("AppleWebKit") > -1 && document.querySelector) {
                var x, y, z, aig, meta = document.querySelector("meta[name=viewport]"),
                    initialContent = meta && meta.getAttribute("content"),
                    disabledZoom = initialContent + ",maximum-scale=1",
                    enabledZoom = initialContent + ",maximum-scale=10",
                    enabled = !0;
                if (meta) {
                    var restoreZoom = function() {
                            meta.setAttribute("content", enabledZoom), enabled = !0
                        },
                        disableZoom = function() {
                            meta.setAttribute("content", disabledZoom), enabled = !1
                        },
                        checkTilt = function(e) {
                            aig = e.accelerationIncludingGravity, x = Math.abs(aig.x), y = Math.abs(aig.y), z = Math.abs(aig.z), !window.orientation && (x > 7 || (z > 6 && y < 8 || z < 8 && y > 6) && x > 5) ? enabled && disableZoom() : enabled || restoreZoom()
                        };
                    window.addEventListener("orientationchange", restoreZoom, !1), window.addEventListener("devicemotion", checkTilt, !1)
                }
            }
        }, rwd.fixNthChild = function() {
            if (!Modernizr.nthchild) {
                var endClass = "blocks-end",
                    startClass = "blocks-start",
                    updateNthChild = function() {
                        var blocksEnd = !1,
                            blocksStart = !1;
                        rwd.matchViewport("M") ? (blocksEnd = ".blocks-two-up > li:nth-child(2n),.blocks-three-up > li:nth-child(3n),.blocks-four-up > li:nth-child(4n),.blocks-five-up > li:nth-child(5n),.blocks-six-up > li:nth-child(6n)", blocksStart = ".blocks-two-up > li:nth-child(2n+1),.blocks-three-up > li:nth-child(3n+1),.blocks-four-up > li:nth-child(4n+1),.blocks-five-up > li:nth-child(5n+1),.blocks-six-up > li:nth-child(6n+1)") : rwd.matchViewport("S") ? (blocksEnd = ".blocks-two-up > li:nth-child(2n),.blocks-three-up > li:nth-child(3n),.blocks-four-up > li:nth-child(2n),.blocks-five-up > li:nth-child(3n),.blocks-six-up > li:nth-child(3n)", blocksStart = ".blocks-two-up > li:nth-child(2n+1),.blocks-three-up > li:nth-child(3n+1),.blocks-four-up > li:nth-child(2n+1),.blocks-five-up > li:nth-child(3n+1),.blocks-six-up > li:nth-child(3n+1)") : rwd.matchViewport("XS") && (blocksEnd = ".blocks-four-up > li:nth-child(2n),.blocks-five-up > li:nth-child(2n),.blocks-six-up > li:nth-child(2n)", blocksStart = ".blocks-four-up > li:nth-child(2n+1),.blocks-five-up > li:nth-child(2n+1),.blocks-six-up > li:nth-child(2n+1)"), $(".blocks > li").removeClass(startClass).removeClass(endClass), blocksStart && $(blocksStart).addClass(startClass), blocksEnd && $("html").hasClass("ie7") && $(blocksEnd).addClass(endClass)
                    };
                rwd.onDelayedResize(updateNthChild, !0)
            }
        }, rwd.fontSize = parseInt($("html").css("font-size").replace("px", ""), 10), rwd.matchViewport = function(value) {
            return !(!value || !rwd.mediaQueries[value]) && (value = rwd.mediaQueries[value].query, window.matchMedia && window.matchMedia("only all").matches ? !!window.matchMedia(value).matches : value.indexOf("min-width") > 0 && rwd.viewportWidth() / rwd.fontSize >= value.replace("(min-width:", "").replace("em)", "") || value.indexOf("min-height") > 0 && rwd.viewportHeight() / rwd.fontSize >= value.replace("(min-height:", "").replace("em)", ""))
        }, rwd.mediaQueries = {
            XXS: {
                query: "(min-width:15em)"
            },
            XS: {
                query: "(min-width:20em)"
            },
            S: {
                query: "(min-width:30em)"
            },
            M: {
                query: "(min-width:37.5em)"
            },
            "iPad-Portrait": {
                query: "(min-width:48em)"
            },
            L: {
                query: "(min-width:48.0625em)"
            },
            XL: {
                query: "(min-width:62em)"
            },
            XXL: {
                query: "(min-width:64em)"
            },
            SmTab: {
                query: "(min-width:33.8125em) and (max-width:47.9375em)"
            },
            "High-DPI": {
                query: "(-moz-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)"
            },
            "Max-768": {
                query: "(max-device-width:768px)"
            }
        }, rwd.onDelayedResize = function(callback, fireNow) {
            if ("function" == typeof callback && "boolean" == typeof fireNow) {
                fireNow && callback();
                var delay = function() {
                    var timer = 0;
                    return function(callback, ms) {
                        clearTimeout(timer), timer = setTimeout(callback, ms || 250)
                    }
                }();
                $(window).resize(function() {
                    delay(callback)
                })
            }
        }, rwd.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }, rwd.viewportWidth = function() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0
        }, $(function() {
            rwd.detectBoxSizing(), rwd.detectNthChild(), rwd.fixBoxSizing(), rwd.fixIE7Grid(), rwd.fixiOSOrientation(), rwd.fixNthChild()
        })
    }(window.sb.rwd = window.sb.rwd || {}, jQuery),
    function(touch, $) {
        "use strict";

        function init() {
            return Modernizr.touch ? $.publish ? ($("body").addClass("touch"), void setListeners()) : void sb.console.info("@sb.touch:EXIT: Pubsub not loaded") : void sb.console.info("@sb.touch:EXIT: Modernizr says touch is not supported")
        }

        function setListeners() {
            document.body.addEventListener("touchstart", handleTouchStart), document.body.addEventListener("touchmove", handleTouchMove), document.body.addEventListener("touchend", handleTouchEnd)
        }

        function handleGestureTimeout() {
            _listenForGesture = !1
        }

        function handleTouchStart(e) {
            clearTimeout(_gestureTimeout), _gestureTimeout = setTimeout(handleGestureTimeout, _this.gestureTimeout), _listenForGesture = !0, _this.point.target = _this.swipe.target = $(e.touches[0].target), _this.point.x = _this.swipe.initX = e.touches[0].pageX, _this.point.y = e.touches[0].pageY
        }

        function handleTouchMove(e) {
            _this.point.x = e.touches[0].pageX, _this.point.y = e.touches[0].pageY, checkGestures(e)
        }

        function handleTouchEnd(e) {}

        function handleSwipe() {
            if (null != _this.swipe.target && _listenForGesture) {
                for (var i = 0; i < _this.swipeListenerContainers.length; i++) {
                    var item = _this.swipeListenerContainers[i];
                    if (item.target.has(_this.swipe.target).length > 0 && _this.swipe.direction == item.direction) {
                        item.cb();
                        break
                    }
                }
                _this.dispatchGlobalEventsWithoutContext && (_this.swipe.direction == _this.gestures.SWIPE_LEFT ? $.publish(_this.EVENTS.GESTURE_SWIPE_LEFT) : $.publish(_this.EVENTS.GESTURE_SWIPE_RIGHT)), _this.swipe.initX = _this.point.x, _this.swipe.target = null, _this.swipe.direction = ""
            }
        }

        function checkGestures(e) {
            Math.abs(_this.swipe.initX - _this.point.x) > _this.swipeScrollStopThreshold && e.preventDefault();
            var deltaX = Math.abs(_this.swipe.initX - _this.point.x);
            if (deltaX >= _this.swipeHorizontalPixelThreshhold) return _this.swipe.initX > _this.point.x ? _this.swipe.direction = _this.gestures.SWIPE_LEFT : _this.swipe.direction = _this.gestures.SWIPE_RIGHT, void handleSwipe()
        }

        function SwipeObject(target, direction, cb) {
            this.target = target, this.direction = direction, this.cb = cb, this.trigger = function() {
                cb(this.target)
            }
        }
        var _gestureTimeout, _this = touch,
            _listenForGesture = !1;
        touch.swipeListenerContainers = new Array, touch.swipeHorizontalPixelThreshhold = 30, touch.swipeScrollStopThreshold = 10, touch.gestureTimeout = 1e3, touch.dispatchGlobalEventsWithoutContext = !0, touch.point = {
            target: "",
            x: 0,
            y: 0
        }, touch.gestures = {
            SWIPE_RIGHT: "SWIPE_RIGHT",
            SWIPE_LEFT: "SWIPE_LEFT"
        }, touch.swipe = {
            target: "",
            initX: 0,
            directtion: ""
        }, touch.EVENTS = {
            TOUCH_START: "SB_TOUCH_START",
            TOUCH_MOVE: "SB_TOUCH_MOVE",
            TOUCH_END: "SB_TOUCH_END",
            GESTURE_SWIPE_RIGHT: "GESTURE_SWIPE_RIGHT",
            GESTURE_SWIPE_LEFT: "GESTURE_SWIPE_LEFT"
        }, sb.touch.bindSwipe = function(containerSelector, direction, cb) {
            var swipe = new SwipeObject(containerSelector, direction, cb);
            _this.swipeListenerContainers.push(swipe)
        }, $(init)
    }(window.sb.touch = window.sb.touch || {}, jQuery),
    function(blocks, $) {
        "use strict";
        var $blocks = $(".sectionBlock").parents(".grid");
        blocks.countColumns = function($headers) {
            var columns = $headers.length,
                firstOffset = blocks.getOffsetTop($headers.eq(0));
            return $.each($headers, function(index) {
                if (firstOffset !== blocks.getOffsetTop($headers.eq(index))) return columns = index, !1
            }), columns
        }, blocks.defineRow = function(array, number) {
            return [].concat.apply([], array.map(function(elem, i) {
                return i % number ? [] : [array.slice(i, i + number)]
            }))
        }, blocks.getOffsetTop = function($item) {
            return !!$item.offset() && $item.offset().top
        }, blocks.resetHeight = function() {
            $blocks.find(".sectionBlock__header").removeAttr("style"), sb.console.info("sb.sectionBlocks | reset height")
        }, blocks.setHeight = function() {
            blocks.resetHeight(), $.each($blocks, function(i, val) {
                var $headers = $blocks.eq(i).find(".sectionBlock__header"),
                    columns = blocks.countColumns($headers),
                    heights = [];
                $.each($headers, function(i1, val1) {
                    heights.push($(val1).height())
                }), $.each(blocks.defineRow(heights, columns), function(i2, val2) {
                    var tallest = Math.max.apply(null, val2) + "px";
                    $(blocks.defineRow($.makeArray($headers), columns)[i2]).css("height", tallest), sb.console.info("sb.sectionBlocks | list " + i + " | row " + i2 + " | set to " + tallest)
                })
            })
        }, $(function() {
            $blocks.length > 0 && !$("body").hasClass(".ie7") && sb.rwd.onDelayedResize(function() {
                blocks[(sb.rwd.matchViewport("S") ? "set" : "reset") + "Height"]()
            }, !0)
        })
    }(window.sb.sectionBlocks = window.sb.sectionBlocks || {}, jQuery),
    function(windows, $) {
        "use strict";

        function closeWindow(e) {
            e && e.preventDefault && e.preventDefault();
            try {
                window.open("", "_self", ""), window.close()
            } catch (ex) {
                console.log(ex)
            }
        }

        function openWindow(e) {
            this.href && (e.preventDefault(), window.open(this.href, "_blank", "toolbar=yes,scrollbars=yes,location=yes,statusbar=yes,menubar=yes,resizable=yes,status=yes"), $(this).hasClass("button_close_win") && closeWindow(e))
        }

        function applyHandlers() {
            $.browser && !$.browser.mozilla && ($(".close_win_only_hidden > a").on("click", closeWindow), $(".close_win_only_hidden").removeClass("close_win_only_hidden")), $("a.button_open_win").on("click", openWindow)
        }
        windows.applyHandlers || ($.extend(windows, {
            applyHandlers: applyHandlers
        }), $(function() {
            windows.applyHandlers()
        }))
    }(window.sb.windows = window.sb.windows || {}, jQuery),
    function(sb, $) {
        "use strict";

        function belowTheViewport(element, threshold) {
            var fold = sb.rwd.viewportHeight() + $(window).scrollTop();
            return fold <= $(element).offset().top + threshold
        }

        function aboveTheViewport(element, threshold) {
            var top = $(window).scrollTop();
            return top >= $(element).offset().top + $(element).height() - threshold
        }
        var utilities = sb.utilities = sb.utilities || {};
        utilities.inViewport = function(element, threshold) {
            if (element.length) return !belowTheViewport(element, threshold) && !aboveTheViewport(element, threshold)
        }, utilities.onDelayedScroll = function(callback, delayTime, fireNow) {
            if ("function" == typeof callback && "boolean" == typeof fireNow) {
                fireNow && callback();
                var ms = delayTime && "number" == typeof delayTime ? delayTime : 250,
                    delay = function() {
                        var timer = 0;
                        return function() {
                            clearTimeout(timer), timer = setTimeout(callback, ms)
                        }
                    }();
                window.onscroll = delay
            }
        }, utilities.whichTransitionEvent = function() {
            var t, el = document.createElement("testelement"),
                transitions = {
                    transition: "transitionend",
                    Otransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitioneEnd"
                };
            for (t in transitions)
                if (void 0 !== el.style[t]) return transitions[t]
        }, utilities.cancelFormFocusZoom = function($el) {
            function changeViewport(event) {
                viewportContent = viewportContent.replace(maxScaleRegex, ""), viewportContent = "blur" === event.type ? viewportContent + maxScale + "10" : viewportContent + maxScale + "1.0", $viewport.attr("content", viewportContent)
            }
            var $viewport = $('meta[name="viewport"]'),
                viewportContent = $viewport.attr("content"),
                maxScale = ",maximum-scale=",
                maxScaleRegex = /,maximum-scale=\d*\.*\d*/;
            $el.on({
                focus: changeViewport,
                blur: changeViewport
            })
        }
    }(window.sb = window.sb || {}, jQuery),
    function(sb, $) {
        sb.Dropdown = function(options) {
            function closeMegaMenu() {
                sb.megaMenu && sb.megaMenu.small && "function" == typeof sb.megaMenu.small.close && sb.megaMenu.small.close()
            }

            function setCloseHandler() {
                $(document).on("click." + ns, function(e) {
                    var $clicked = $(e.target);
                    $clicked.is($dropdown) || 0 !== $clicked.parents().filter($dropdown).length || close()
                })
            }

            function removeCloseHandler() {
                $(document).off("click." + ns)
            }

            function close() {
                $dropdown.data("status", "closed").slideUp(duration, "swing", transitionComplete), $toggle.focus().attr("aria-expanded", !1), removeCloseHandler(), $(document).trigger(ns + "Close")
            }

            function open() {
                $dropdown.data("status", "open").addClass("sb_dropdown_active").css("height", "auto").slideDown(duration, "swing", transitionComplete).focus(), $toggle.addClass("sb_dropdown_active").attr("aria-expanded", "true"), clickAnywhereToClose && setCloseHandler(), $(document).trigger(ns + "Open")
            }

            function toggleDropdown() {
                "closed" === $dropdown.data("status") ? open() : close(), closeMegaMenuOnToggle && closeMegaMenu()
            }

            function toggleHandler(e) {
                "keypress" === e.type && 13 !== e.which || (e.preventDefault(), e.stopPropagation(), toggleDropdown())
            }

            function transitionComplete() {
                "open" !== $dropdown.data("status") && ($dropdown.removeClass("sb_dropdown_active"), $toggle.removeClass("sb_dropdown_active"))
            }
            var $dropdown = options.dropdown,
                close_button_text = sb.config.globalTextResources.closeButtonText,
                $toggle = options.toggleButton,
                ns = options.namespace,
                closeMegaMenuOnToggle = !options.disableCloseMegaMenu,
                clickAnywhereToClose = !options.disableClickAnywhereToClose,
                duration = 250;
            $dropdown.addClass("sb_dropdown").data("status", "closed").attr({
                "aria-labelled-by": $toggle.attr("id"),
                tabindex: "-1",
                role: "region"
            }).append('<button class="sb_dropdown--accessible_close_button hidden_visually" tabindex="-1">' + close_button_text + "</button>"), $toggle.addClass("sb_dropdown_trigger").attr({
                "aria-controls": $dropdown.attr("id"),
                "aria-expanded": !1,
                tabindex: 0
            }), $(".sb_dropdown--accessible_close_button").click(close), $dropdown.on("click", function(e) {
                e.stopPropagation()
            }), $toggle.on("click", toggleHandler), $toggle.on("keypress", toggleHandler), this.open = open, this.close = close, this.toggleDropdown = toggleDropdown
        }
    }(window.sb || {}, jQuery), $(function() {
        if ($().cTree && $("h3.expandable, ol.expandable").cTree(), $("table colgroup col").length > 0 && $("table").each(function() {
                var thisTable = $(this);
                thisTable.children("colgroup").length > 0 && $(this).addClass("colgroup"), thisTable.find("col").each(function(i) {
                    var colClass = $(this).attr("class");
                    colClass && (thisTable.find("tr th:nth-child(" + (i + 1) + ")").addClass(colClass), thisTable.find("tr td:nth-child(" + (i + 1) + ")").addClass(colClass))
                })
            }), $("table").length > 0 && $("table.stripes tr:nth-child(even)").not("tfoot tr").addClass("even"), $(".rotate-promos").length > 0 && $(".rotate-promos").cycle({
                fx: "fade",
                random: !0,
                timeout: 1e4
            }), !navigator.cookieEnabled) {
            var cookieNote = document.getElementById("allow_message");
            cookieNote.style.display = "none"
        }
        $('a[href^="http"]').live("click", function(e) {
            this.hostname !== document.domain && _gaq.push(["_trackPageview", "/outbound/" + $(this).attr("href")])
        }), $('a[href$=".pdf"]').click(function() {
            _gaq.push(["_trackEvent", "Download", "Pdf", this.href])
        }), $("#language_name").change(function() {
            $("#language").submit()
        })
    }), jQuery.fn.extend({
        check: function() {
            return this.each(function() {
                this.checked = !0
            })
        },
        uncheck: function() {
            return this.each(function() {
                this.checked = !1
            })
        }
    }),
    function($) {
        $.preloadImages = function() {
            for (var imgPaths = [].slice.call(arguments), i = 0; i < imgPaths.length; i++) imgPaths[i].length > 0 && jQuery("<img>").attr("src", imgPaths[i])
        }
    }(jQuery), jQuery.cookie = function(key, value, options) {
        if (arguments.length > 1 && "[object Object]" !== String(value)) {
            if (options = jQuery.extend({}, options), null !== value && void 0 !== value || (options.expires = -1), "number" == typeof options.expires) {
                var days = options.expires,
                    t = options.expires = new Date;
                t.setDate(t.getDate() + days)
            }
            return value = String(value), document.cookie = [encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
        }
        options = value || {};
        var result, decode = options.raw ? function(s) {
            return s
        } : decodeURIComponent;
        return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null
    },
    function(sd, $) {
        "use strict";

        function init(mobilePromos) {
            if (mobilePromos && mobilePromos.length) {
                var flags, pattern, regex, verifyCookie = !0,
                    verifyUserAgent = !0,
                    cookieName = "sb.native.app.promo.show",
                    cookie = $.cookie(cookieName),
                    isStoreLocatorPage = location.href.indexOf("store-locator") > 1,
                    validPromos = [];
                if ((!verifyCookie || !cookie) && (mobilePromos.forEach(function(promo) {
                        promo.Enabled && promo.Filter && promo.Filter.length > 2 && (flags = promo.Filter.replace(/.*\/([gimy]*)$/, "$1"), pattern = promo.Filter.replace(new RegExp("^/(.*?)/" + flags + "$"), "$1"), regex = new RegExp(pattern, flags), verifyUserAgent && !regex.test(window.navigator.userAgent) || isStoreLocatorPage && promo.Content.indexOf("sb_app_promo_banner") > 0 || validPromos.push(promo.Content))
                    }), validPromos.length)) {
                    var $snap;
                    if ($("body").prepend(validPromos[Math.floor(Math.random() * validPromos.length)]), $.cookie(cookieName, location.href, {
                            path: "/"
                        }), $snap = $(".sb_native_app_promo")) {
                        var el, $el, promoName = $snap.attr("id"),
                            $promoOverlay = $("#sb_app_promo_overlay"),
                            $promoWrapper = $("#sb_app_promo_wrapper"),
                            $utils = $("#utilities"),
                            isTouchSupported = "ontouchstart" in window,
                            appStoreUrl = $("#visit_app_store").attr("href"),
                            moved = !1,
                            startX = 0,
                            startY = 0,
                            trackClose = function() {
                                _gaq.push(["_trackEvent", "close-app-promo", promoName])
                            },
                            trackVisit = function() {
                                _gaq.push(["_trackEvent", "visit-app-store", promoName]), window.location.href = appStoreUrl
                            };
                        $promoOverlay.length && ($promoOverlay.fadeIn(200, function() {
                            $promoWrapper.animate({
                                top: "20px"
                            }, 200)
                        }), $utils.hide()), $("#close_app_full").click(function() {
                            $promoWrapper.animate({
                                top: "-1000px"
                            }, 500, function() {
                                $("#sb_app_promo_overlay").fadeOut("fast")
                            }), $utils.show()
                        }), $("#close_app_banner").click(function() {
                            $("#sb_app_promo_banner").hide(), $utils.show()
                        }), _gaq.push(["_trackEvent", "render-native-app-promo", promoName]), isTouchSupported ? ($snap.on("touchstart", ".close_app_promo, .visit_app_store", function(e) {
                            console.log("touchstart"), moved = !1, startX = e.originalEvent.touches[0].clientX, startY = e.originalEvent.touches[0].clientY
                        }), $snap.on("touchmove", ".close_app_promo, .visit_app_store", function(e) {
                            (Math.abs(e.originalEvent.touches[0].clientX - startX) > 20 || Math.abs(e.originalEvent.touches[0].clientY - startY) > 20) && (moved = !0)
                        }), $snap.on("touchend", ".close_app_promo, .visit_app_store", function(e) {
                            moved || (el = e.originalEvent.changedTouches[0].target, 3 === el.nodeType && (el = el.parentNode), $el = $(el), $el.hasClass("close_app_promo") || $el.parents(".close_app_promo").length ? trackClose() : ($el.hasClass("visit_app_store") || $el.parents(".visit_app_store").length) && trackVisit())
                        }), $snap.on("touchcancel", ".close_app_promo, .visit_app_store", function(e) {
                            moved = !1, startX = 0, startY = 0
                        })) : ($snap.on("click", ".close_app_promo", trackClose), $snap.on("click", ".visit_app_store", trackVisit))
                    }
                }
            }
        }
        sb.mobilePromoInit = init
    }(window.sb = window.sb || {}, jQuery),
    function($) {
        "use strict";

        function init() {
            $(".accordion").find("label").click(function(e) {
                $(".accordion").find("label").removeClass("open");
                var $this = $(this),
                    section = $("#" + $this.attr("for"));
                section.prop("checked") ? (e.preventDefault(), section.prop("checked", !1)) : $this.addClass("open")
            })
        }
        $(init)
    }(jQuery),
    function(sb, $) {
        sb.facebook = function() {
            "use strict";

            function getFbIdCookie(fbId) {
                return $.cookie(cookieName)
            }

            function setFbIdCookie(fbId, sbuxFbId) {
                $.cookie(cookieName, fbId + cookieSegmentSeparator + sbuxFbId, {
                    path: "/"
                })
            }

            function deleteFbIdCookie() {
                $.cookie(cookieName, null, {
                    path: "/"
                })
            }

            function haveThisUserFacebookCookie(fbId) {
                var cookie = getFbIdCookie(fbId);
                return cookie && cookie.split(cookieSegmentSeparator)[0] === fbId
            }

            function fbLoginResponseHandler(resp, deferred) {
                resp.authResponse && resp.authResponse.userID && setSbuxConnectStatus(resp.authResponse).done(function() {
                    loginStatusCallback(resp, deferred)
                })
            }

            function getAvatarPath(userId, size) {
                var query = size && "string" == typeof size ? "?size=" + size : "";
                return graphUrl + "/" + userId + "/picture" + query
            }

            function updateAvatarSources(src) {
                $(".facebook_avatar").each(function(i, img) {
                    $(img).attr("src", src)
                })
            }

            function setAvatar(userId) {
                updateAvatarSources(getAvatarPath(userId))
            }

            function removeAvatar() {
                updateAvatarSources(defaultAvatarPath)
            }

            function respondToFbAuthorize(fbId, sbuxFbId) {
                setAvatar(fbId), setFbIdCookie(fbId, sbuxFbId)
            }

            function respondToFbDeauthorize() {
                deleteFbIdCookie(), removeAvatar()
            }

            function handleRevokedLogin(deferred, wasSuccessful) {
                var resp;
                wasSuccessful ? (resp = {
                    status: "unknown",
                    authResponse: null
                }, deferred.resolve(resp), respondToFbDeauthorize(), removeSbuxConnectStatus()) : deferred.reject()
            }

            function revokeLogin() {
                var deferred = $.Deferred();
                return FB.api("/me/permissions", "DELETE", function(response) {
                    handleRevokedLogin(deferred, response.success)
                }), deferred.promise()
            }

            function login() {
                var deferred = $.Deferred();
                return FB.login(function(resp) {
                    fbLoginResponseHandler(resp, deferred)
                }), deferred.promise()
            }

            function logout() {
                FB.logout(function(response) {
                    respondToFbDeauthorize()
                })
            }

            function checkSbuxConnectStatus(fbUserId) {
                var deferred = $.Deferred();
                return $.post("/connect/status", {
                    uId: fbUserId
                }, null, "json").done(function(data) {
                    deferred.resolve(data)
                }).fail(function(data) {
                    deferred.reject()
                }), deferred.promise()
            }

            function setSbuxConnectStatus(fbAuthResponse) {
                var deferred = $.Deferred();
                return $.post("/connect/connect", {
                    uId: fbAuthResponse.userID,
                    token: fbAuthResponse.access_token
                }, null, "json").done(function(data) {
                    data.success && data.fbUser.fbUserId && data.fbUser.sbuxFbUserId && respondToFbAuthorize(data.fbUser.fbUserId, data.fbUser.sbuxFbUserId)
                }).always(function(data) {
                    return deferred.resolve()
                }), deferred.promise()
            }

            function removeSbuxConnectStatus() {
                "" !== fbId && $.post("/connect/disconnect", {
                    uId: fbId
                }, null, "json")
            }

            function verifyConnectedUser(response, deferred) {
                fbId = response.authResponse.userID, checkSbuxConnectStatus(response.authResponse.userID).done(function(data) {
                    data.isConnected ? (haveThisUserFacebookCookie(fbId) || respondToFbAuthorize(response.authResponse.userID, data.sbuxFbUserId), deferred.resolve(response)) : (logout(), deferred.reject())
                }).fail(function() {
                    respondToFbDeauthorize(), deferred.reject()
                })
            }

            function handleUnconnectedFbUser(authResponse, deferred) {
                respondToFbDeauthorize(), deferred.resolve(authResponse)
            }

            function loginStatusCallback(response, deferred) {
                "connected" === response.status ? verifyConnectedUser(response, deferred) : "not_authorized" === response.status ? handleUnconnectedFbUser(response, deferred) : handleUnconnectedFbUser(response, deferred)
            }

            function getLoginStatus() {
                var deferred = $.Deferred();
                return FB.getLoginStatus(function(response) {
                    loginStatusCallback(response, deferred)
                }), deferred.promise()
            }
            var cookieName = "",
                defaultAvatarPath = "",
                graphUrl = "",
                isLoaded = !1,
                fbId = "",
                cookieSegmentSeparator = "_";
            return sb.config.facebook && (cookieName = sb.config.facebook.cookieName, defaultAvatarPath = sb.config.facebook.defaultAvatarPath, graphUrl = sb.config.facebook.graphUrl), {
                login: login,
                logout: logout,
                getLoginStatus: getLoginStatus,
                revokeLogin: revokeLogin,
                isLoaded: isLoaded
            }
        }()
    }(window.sb || {}, jQuery),
    function(sb, $) {
        "use strict";
        sb.namespace("analytics"), sb.analytics.isSearchOnTop = $("#search").offset() && $("#search").offset().top < 200, sb.analytics.events = {
            email_prospect: {
                name: "Email Prospect",
                url: !0,
                actions: [{
                    name: "Attempt to Sign Up For Email Prospect",
                    action: "click",
                    css: ".footer .NewsletterSignup button",
                    label: "in Footer"
                }, {
                    name: "Attempt to Sign Up For Email Prospect",
                    action: "click",
                    css: ".NewsletterSignup button",
                    label: "not in Footer"
                }]
            },
            social_icons: {
                name: "Social Icons",
                url: !0,
                actions: [{
                    name: "Click on Social Icons",
                    action: "click",
                    css: ".sb-social-icons a"
                }]
            },
            homepage: {
                name: "Homepage",
                url: "/",
                actions: [{
                    name: "Rewards Bar Videos",
                    action: "click",
                    css: ".rewards_bar a[data-video]"
                }, {
                    name: "Hero Container Videos",
                    action: "click",
                    css: ".hero_container a[data-video]"
                }, {
                    name: "Content Stripe Videos",
                    action: "click",
                    css: ".content_stripe a[data-video]"
                }, {
                    name: "Rewards Bar Links",
                    action: "click",
                    css: ".rewards_bar a[href]"
                }, {
                    name: "Hero Container Links",
                    action: "click",
                    css: ".hero_container a[href]"
                }, {
                    name: "Content Stripe Links",
                    action: "click",
                    css: ".content_stripe a[href]"
                }]
            },
            header_and_footer: {
                name: "Header and Footer",
                url: !0,
                actions: [{
                    name: "Click on Search Button",
                    action: "click",
                    css: "#search button",
                    label: sb.analytics.isSearchOnTop ? "Search on Top" : "Search in Footer"
                }, {
                    name: "Nav Links",
                    action: "click",
                    css: "#nav a[href]"
                }, {
                    name: "Menus Links",
                    action: "click",
                    css: "#menus a[href]"
                }, {
                    name: "General Header Links",
                    action: "click",
                    css: "#header a[href]"
                }, {
                    name: "Footer Links",
                    action: "click",
                    css: ".footer a[href]"
                }]
            }
        }, sb.analytics.track = function(event, action, label, value) {
            value = isNaN(value) ? 0 : value, _gaq && _gaq.push && action && label ? (_gaq.push(["_trackEvent", event, action, label, value]), sb.console.log("Event Tracking: event=" + event + "; action=" + action + "; label=" + label + "; value=" + value)) : sb.console.log("Event NOT tracked: event=" + event + "; action=" + action + "; label=" + label + "; value=" + value)
        }, $.each(sb.analytics.events, function(json_key, json_value) {
            var event_name = json_value.name,
                event_actions = json_value.actions,
                event_url = json_value.url;
            event_url !== !0 && window.location.pathname !== event_url || $.each(event_actions, function(index, action_json) {
                $(action_json.css).each(function() {
                    $(this).data("tracked") || ($(this).data("tracked", 1), $(this).on(action_json.action, function() {
                        var action_name = action_json.name,
                            label = "",
                            tagName = "",
                            isAnchorLink = null;
                        tagName = $(this).prop("tagName"), isAnchorLink = "A" === tagName, label = action_json.label || (isAnchorLink ? this.href : "-not used-"), sb.analytics.track(event_name, action_name, label, 0)
                    }))
                })
            })
        })
    }(window.sb = window.sb || {}, jQuery), $(function() {
        $("body").on("click", ".notice__closeButton", function() {
            var $parent = $(this).closest(".notice"),
                removeOnClose = $parent.attr("data-remove-on-close");
            $parent.hide("fast", function() {
                "false" !== removeOnClose && $parent.remove()
            })
        })
    }),
    function(sb, $) {
        "use strict";

        function setCloseHandler() {
            $(document).on("click.pageTopPromo", function(e) {
                var $clicked = $(e.target);
                $clicked.is($promoWrapper) || 0 !== $clicked.parents().filter($promoWrapper).length || (inhibitWrapping(), setOverflowIndicator(), $promoWrapper.off("click"), setClickHandler())
            })
        }

        function setClickHandler() {
            $promoWrapper.one("click", function() {
                return removeOverflowIndicator(), permitWrapping(), $promoText.parent("a").blur(), setNonLinkClickHandler(), setCloseHandler(), !1
            })
        }

        function setNonLinkClickHandler() {
            $promoWrapper.parents(".no_cta").length > 0 && !sb.rwd.matchViewport("iPad-Portrait") && $promoWrapper.one("click", function() {
                return inhibitWrapping(), setOverflowIndicator(), setClickHandler(), !1
            })
        }

        function setOverflowIndicator() {
            $promoWrapper.addClass("js-overflow"), $promoText.find(".cta").css("text-decoration", "underline")
        }

        function removeOverflowIndicator() {
            $promoWrapper.removeClass("js-overflow"), $promoWrapper.parents(".no_cta").length > 0 && $promoText.find(".cta").css("text-decoration", "none")
        }

        function inhibitWrapping() {
            $promoWrapper.removeClass("js-allow-overflow"), $promoWrapper.removeClass("js-open")
        }

        function permitWrapping() {
            $promoWrapper.addClass("js-allow-overflow"), $promoWrapper.addClass("js-open")
        }

        function restoreNaturalBehavior() {
            removeOverflowIndicator(), inhibitWrapping(), $promoWrapper.off("click"), $(document).off("click.pageTopPromo")
        }

        function checkPromoWidth() {
            var windowW = $("body").innerWidth();
            promoWidth <= windowW - 2 * gutterWidth ? restoreNaturalBehavior() : $promoWrapper.hasClass("js-open") || (setOverflowIndicator(), setClickHandler())
        }

        function init() {
            sb.rwd.matchViewport("iPad-Portrait") ? restoreNaturalBehavior() : checkPromoWidth()
        }
        var $promoText = $(".header_bar .promo_text"),
            $promoWrapper = $promoText.parents(".wrapper"),
            promoWidth = $promoText.innerWidth(),
            gutterWidth = 20;
        $promoText.length > 0 && sb.rwd.onDelayedResize(init, !0)
    }(window.sb = window.sb || {}, jQuery),
    function(sb, $) {
        sb.getResponseOnAction = function(options) {
            function defaultCallback(data) {
                $destination.replaceWith(data.responseText).show()
            }

            function showLoading() {
                $destination.fadeOut("fast").empty().append('<img src="' + opts.loadingImage + '"/>').fadeIn("fast")
            }
            if (options.triggerElement && options.destinationElement) {
                var $trigger = $(options.triggerElement),
                    $destination = $(options.destinationElement),
                    opts = $.extend({}, {
                        url: $trigger.attr("href") ? $trigger.attr("href") : $.data($trigger, "href"),
                        loadingImage: "/static/images/loader.gif",
                        callback: defaultCallback
                    }, options);
                $trigger.on("click", function() {
                    opts.url && $.ajax({
                        url: opts.url,
                        beforeSend: showLoading,
                        complete: opts.callback
                    })
                })
            }
        }
    }(window.sb || {}, jQuery),
    function($) {
        var o = $({});
        $.subscribe = function() {
            o.on.apply(o, arguments)
        }, $.unsubscribe = function() {
            o.off.apply(o, arguments)
        }, $.publish = function() {
            o.trigger.apply(o, arguments)
        }
    }(jQuery),
    function($, sb) {
        "use strict";

        function buildEl(className, appendTo, html) {
            var $el = $("<div />");
            return $el.addClass(className), html && $el.append(html), appendTo && $el.appendTo(appendTo), $el
        }

        function fadeOut($el) {
            $el && $el.fadeTo("fast", 0, function() {
                $el.remove()
            })
        }

        function fadeTo($el) {
            $el && $el.fadeTo("fast", maskOpacity)
        }

        function buildHtml(options) {
            var loadingImg = document.createElement("img"),
                loadingImgSrc = options.loadingImgSrc || "/static/images/loader.gif",
                maskClass = options.maskClass || "",
                layerClass = options.layerClass || "",
                containerClass = options.containerClass || "",
                contentClass = options.contentClass || "";
            maskOpacity = options && "undefined" != typeof options.maskOpacity ? options.maskOpacity : maskOpacity, sb.lightbox.mask = buildEl("lightbox_mask", $body), maskClass && sb.lightbox.mask.addClass(maskClass), options && "undefined" != typeof options.maskColor && sb.lightbox.mask.css("background-color", options.maskColor), fadeTo(sb.lightbox.mask), sb.lightbox.layer = buildEl("lightbox_layer"), layerClass && sb.lightbox.layer.addClass(layerClass), sb.lightbox.container = buildEl("lightbox_container", sb.lightbox.layer).on("click", sb.lightbox.close), containerClass && sb.lightbox.container.addClass(containerClass), sb.lightbox.content = buildEl("lightbox_content", sb.lightbox.container), contentClass && sb.lightbox.content.addClass(contentClass), loadingImg.src = loadingImgSrc, sb.lightbox.content.append(loadingImg), sb.lightbox.layer.appendTo($body)
        }
        var isOpen = !1,
            $body = $("body"),
            maskOpacity = .95,
            lightboxOptions = {};
        sb.lightbox = {
            open: function(options) {
                $.extend(lightboxOptions, options), "function" == typeof lightboxOptions.beforeOpen && lightboxOptions.beforeOpen(), isOpen ? sb.console.log("sb.lightbox in an unknown state!") : buildHtml(lightboxOptions), isOpen = !0, "function" == typeof lightboxOptions.afterOpen && lightboxOptions.afterOpen()
            },
            setContent: function(content) {
                var closeHtml = "undefined" != typeof lightboxOptions.closeHtml ? lightboxOptions.closeHtml : '<span aria-hidden="true" data-icon="&#x2715"></span><span class="hidden_visually">Close</span>';
                sb.lightbox.content.empty(), buildEl("lightbox_close", sb.lightbox.content, closeHtml).on("click", sb.lightbox.close), sb.lightbox.content.append(content)
            },
            getContentContainer: function() {
                return sb.lightbox.content
            },
            close: function(ev) {
                ev.stopPropagation(), "function" == typeof lightboxOptions.beforeClose && lightboxOptions.beforeClose(), fadeOut(sb.lightbox.mask, !0), fadeOut(sb.lightbox.layer, !0), isOpen = !1, "function" == typeof lightboxOptions.afterClose && lightboxOptions.afterClose()
            },
            isOpen: function() {
                return !!isOpen
            }
        }
    }(jQuery, sb || {}),
    function(f) {
        if (f.zepto && !f.fn.removeData) throw new ReferenceError("Zepto is loaded without the data module.");
        f.fn.noUiSlider = function(C, D) {
            function s(a, b) {
                return 100 * b / (a[1] - a[0])
            }

            function E(a, b) {
                return b * (a[1] - a[0]) / 100 + a[0]
            }

            function t(a) {
                return a instanceof f || f.zepto && f.zepto.isZ(a)
            }

            function n(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }

            function r(a, b) {
                f.isArray(a) || (a = [a]), f.each(a, function() {
                    "function" == typeof this && this.call(b)
                })
            }

            function F(a, b) {
                return function() {
                    var c = [null, null];
                    c[b] = f(this).val(), a.val(c, !0)
                }
            }

            function G(a, b) {
                return a = a.toFixed(b.decimals), 0 === parseFloat(a) && (a = a.replace("-0", "0")), a.replace(".", b.serialization.mark)
            }

            function u(a) {
                return parseFloat(a.toFixed(7))
            }

            function p(a, b, c, d) {
                var e = d.target;
                a = a.replace(/\s/g, h + " ") + h, b.on(a, function(a) {
                    var b = e.attr("disabled");
                    if (e.hasClass("noUi-state-tap") || void 0 !== b && null !== b) return !1;
                    var g;
                    a.preventDefault();
                    var v, b = 0 === a.type.indexOf("touch"),
                        h = 0 === a.type.indexOf("mouse"),
                        l = 0 === a.type.indexOf("pointer"),
                        H = a;
                    0 === a.type.indexOf("MSPointer") && (l = !0), a.originalEvent && (a = a.originalEvent), b && (g = a.changedTouches[0].pageX, v = a.changedTouches[0].pageY), (h || l) && (l || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset = document.documentElement.scrollTop), g = a.clientX + window.pageXOffset, v = a.clientY + window.pageYOffset), g = f.extend(H, {
                        pointX: g,
                        pointY: v,
                        cursor: h
                    }), c(g, d, e.data("base").data("options"))
                })
            }

            function I(a) {
                var b = this.target;
                return void 0 === a ? this.element.data("value") : (!0 === a ? a = this.element.data("value") : this.element.data("value", a), void(void 0 !== a && f.each(this.elements, function() {
                    "function" == typeof this ? this.call(b, a) : this[0][this[1]](a)
                })))
            }

            function J(a, b, c) {
                if (t(b)) {
                    var d = [],
                        e = a.data("target");
                    return a.data("options").direction && (c = c ? 0 : 1), b.each(function() {
                        f(this).on("change" + h, F(e, c)), d.push([f(this), "val"])
                    }), d
                }
                return "string" == typeof b && (b = [f('<input type="hidden" name="' + b + '">').appendTo(a).addClass(g[3]).change(function(a) {
                    a.stopPropagation()
                }), "val"]), [b]
            }

            function K(a, b, c) {
                var d = [];
                return f.each(c.to[b], function(e) {
                    d = d.concat(J(a, c.to[b][e], b))
                }), {
                    element: a,
                    elements: d,
                    target: a.data("target"),
                    val: I
                }
            }

            function L(a, b) {
                var c = a.data("target");
                c.hasClass(g[14]) || (b || (c.addClass(g[15]), setTimeout(function() {
                    c.removeClass(g[15])
                }, 450)), c.addClass(g[14]), r(a.data("options").h, c))
            }

            function w(a, b) {
                var c = a.data("options");
                b = u(b), a.data("target").removeClass(g[14]), a.css(c.style, b + "%").data("pct", b), a.is(":first-child") && a.toggleClass(g[13], 50 < b), c.direction && (b = 100 - b), a.data("store").val(G(E(c.range, b), c))
            }

            function x(a, b) {
                var c = a.data("base"),
                    d = c.data("options"),
                    c = c.data("handles"),
                    e = 0,
                    k = 100;
                if (!n(b)) return !1;
                if (d.step) {
                    var m = d.step;
                    b = Math.round(b / m) * m
                }
                return 1 < c.length && (a[0] !== c[0][0] ? e = u(c[0].data("pct") + d.margin) : k = u(c[1].data("pct") - d.margin)), b = Math.min(Math.max(b, e), 0 > k ? 100 : k), b === a.data("pct") ? [!!e && e, 100 !== k && k] : (w(a, b), !0)
            }

            function A(a, b, c, d) {
                a.addClass(g[5]), setTimeout(function() {
                    a.removeClass(g[5])
                }, 300), x(b, c), r(d, a.data("target")), a.data("target").change()
            }

            function M(a, b, c) {
                var d = b.a,
                    e = a[b.d] - b.start[b.d],
                    e = 100 * e / b.size;
                if (1 === d.length) {
                    if (a = x(d[0], b.c[0] + e), !0 !== a) return void(0 <= f.inArray(d[0].data("pct"), a) && L(b.b, !c.margin))
                } else {
                    var k, m;
                    if (c.step && (a = c.step, e = Math.round(e / a) * a), a = k = b.c[0] + e, e = m = b.c[1] + e, 0 > a ? (e += -1 * a, a = 0) : 100 < e && (a -= e - 100, e = 100), 0 > k && !a && !d[0].data("pct") || 100 === e && 100 < m && 100 === d[1].data("pct")) return;
                    w(d[0], a), w(d[1], e)
                }
                r(c.slide, b.target)
            }

            function N(a, b, c) {
                1 === b.a.length && b.a[0].data("grab").removeClass(g[4]), a.cursor && y.css("cursor", "").off(h), z.off(h), b.target.removeClass(g[14] + " " + g[20]).change(), r(c.set, b.target)
            }

            function B(a, b, c) {
                1 === b.a.length && b.a[0].data("grab").addClass(g[4]), a.stopPropagation(), p(q.move, z, M, {
                    start: a,
                    b: b.b,
                    target: b.target,
                    a: b.a,
                    c: [b.a[0].data("pct"), b.a[b.a.length - 1].data("pct")],
                    d: c.orientation ? "pointY" : "pointX",
                    size: c.orientation ? b.b.height() : b.b.width()
                }), p(q.end, z, N, {
                    target: b.target,
                    a: b.a
                }), a.cursor && (y.css("cursor", f(a.target).css("cursor")), 1 < b.a.length && b.target.addClass(g[20]), y.on("selectstart" + h, function() {
                    return !1
                }))
            }

            function O(a, b, c) {
                b = b.b;
                var d, e;
                a.stopPropagation(), c.orientation ? (a = a.pointY, e = b.height()) : (a = a.pointX, e = b.width()), d = b.data("handles");
                var k = a,
                    m = c.style;
                1 === d.length ? d = d[0] : (m = d[0].offset()[m] + d[1].offset()[m], d = d[k < m / 2 ? 0 : 1]), a = 100 * (a - b.offset()[c.style]) / e, A(b, d, a, [c.slide, c.set])
            }

            function P(a, b, c) {
                var e, d = b.b.data("handles");
                e = c.orientation ? a.pointY : a.pointX, a = (e = e < b.b.offset()[c.style]) ? 0 : 100, e = e ? 0 : d.length - 1, A(b.b, d[e], a, [c.slide, c.set])
            }

            function Q(a, b) {
                function c(a) {
                    return 2 === a.length && (a = [parseFloat(a[0]), parseFloat(a[1])], !(!n(a[0]) || !n(a[1]) || a[1] < a[0]) && a)
                }
                var d = {
                    f: function(a, b) {
                        switch (a) {
                            case 1:
                            case .1:
                            case .01:
                            case .001:
                            case 1e-4:
                            case 1e-5:
                                a = a.toString().split("."), b.decimals = "1" === a[0] ? 0 : a[1].length;
                                break;
                            case void 0:
                                b.decimals = 2;
                                break;
                            default:
                                return !1
                        }
                        return !0
                    },
                    e: function(a, b, c) {
                        if (!a) return b[c].mark = ".", !0;
                        switch (a) {
                            case ".":
                            case ",":
                                return !0;
                            default:
                                return !1
                        }
                    },
                    g: function(a, b, c) {
                        function d(a) {
                            return t(a) || "string" == typeof a || "function" == typeof a || !1 === a || t(a[0]) && "function" == typeof a[0][a[1]]
                        }

                        function g(a) {
                            var b = [
                                [],
                                []
                            ];
                            return d(a) ? b[0].push(a) : f.each(a, function(a, e) {
                                1 < a || (d(e) ? b[a].push(e) : b[a] = b[a].concat(e))
                            }), b
                        }
                        if (a) {
                            var l, h;
                            for (a = g(a), b.direction && a[1].length && a.reverse(), l = 0; l < b.handles; l++)
                                for (h = 0; h < a[l].length; h++) {
                                    if (!d(a[l][h])) return !1;
                                    a[l][h] || a[l].splice(h, 1)
                                }
                            b[c].to = a
                        } else b[c].to = [
                            [],
                            []
                        ];
                        return !0
                    }
                };
                f.each({
                    handles: {
                        r: !0,
                        t: function(a) {
                            return a = parseInt(a, 10), 1 === a || 2 === a
                        }
                    },
                    range: {
                        r: !0,
                        t: function(a, b, d) {
                            return b[d] = c(a), b[d] && b[d][0] !== b[d][1]
                        }
                    },
                    start: {
                        r: !0,
                        t: function(a, b, d) {
                            return 1 === b.handles ? (f.isArray(a) && (a = a[0]), a = parseFloat(a), b.start = [a], n(a)) : (b[d] = c(a), !!b[d])
                        }
                    },
                    connect: {
                        r: !0,
                        t: function(a, b, c) {
                            if ("lower" === a) b[c] = 1;
                            else if ("upper" === a) b[c] = 2;
                            else if (!0 === a) b[c] = 3;
                            else {
                                if (!1 !== a) return !1;
                                b[c] = 0
                            }
                            return !0
                        }
                    },
                    orientation: {
                        t: function(a, b, c) {
                            switch (a) {
                                case "horizontal":
                                    b[c] = 0;
                                    break;
                                case "vertical":
                                    b[c] = 1;
                                    break;
                                default:
                                    return !1
                            }
                            return !0
                        }
                    },
                    margin: {
                        r: !0,
                        t: function(a, b, c) {
                            return a = parseFloat(a), b[c] = s(b.range, a), n(a)
                        }
                    },
                    direction: {
                        r: !0,
                        t: function(a, b, c) {
                            switch (a) {
                                case "ltr":
                                    b[c] = 0;
                                    break;
                                case "rtl":
                                    b[c] = 1, b.connect = [0, 2, 1, 3][b.connect];
                                    break;
                                default:
                                    return !1
                            }
                            return !0
                        }
                    },
                    behaviour: {
                        r: !0,
                        t: function(a, b, c) {
                            return b[c] = {
                                tap: a !== (a = a.replace("tap", "")),
                                extend: a !== (a = a.replace("extend", "")),
                                drag: a !== (a = a.replace("drag", "")),
                                fixed: a !== (a = a.replace("fixed", ""))
                            }, !a.replace("none", "").replace(/\-/g, "")
                        }
                    },
                    serialization: {
                        r: !0,
                        t: function(a, b, c) {
                            return d.g(a.to, b, c) && d.f(a.resolution, b) && d.e(a.mark, b, c)
                        }
                    },
                    slide: {
                        t: function(a) {
                            return f.isFunction(a)
                        }
                    },
                    set: {
                        t: function(a) {
                            return f.isFunction(a)
                        }
                    },
                    block: {
                        t: function(a) {
                            return f.isFunction(a)
                        }
                    },
                    step: {
                        t: function(a, b, c) {
                            return a = parseFloat(a), b[c] = s(b.range, a), n(a)
                        }
                    }
                }, function(c, d) {
                    var f = a[c],
                        g = void 0 !== f;
                    if (d.r && !g || g && !d.t(f, a, c)) throw console && console.log && console.group && (console.group("Invalid noUiSlider initialisation:"), console.log("Option:\t", c), console.log("Value:\t", f), console.log("Slider(s):\t", b), console.groupEnd()), new RangeError("noUiSlider")
                })
            }

            function R(a) {
                return this.data("options", f.extend(!0, {}, a)), a = f.extend({
                    handles: 2,
                    margin: 0,
                    connect: !1,
                    direction: "ltr",
                    behaviour: "tap",
                    orientation: "horizontal"
                }, a), a.serialization = a.serialization || {}, Q(a, this), a.style = a.orientation ? "top" : "left", this.each(function() {
                    var c, e, b = f(this),
                        d = [],
                        k = f("<div/>").appendTo(b);
                    if (b.data("base")) throw Error("Slider was already initialized.");
                    for (b.data("base", k).addClass([g[6], g[16 + a.direction], g[10 + a.orientation]].join(" ")), c = 0; c < a.handles; c++) e = f("<div><div/></div>").appendTo(k), e.addClass(g[1]), e.children().addClass([g[2], g[2] + g[7 + a.direction + (a.direction ? -1 * c : c)]].join(" ")), e.data({
                        base: k,
                        target: b,
                        options: a,
                        grab: e.children(),
                        pct: -1
                    }).attr("data-style", a.style), e.data({
                        store: K(e, c, a.serialization)
                    }), d.push(e);
                    switch (a.connect) {
                        case 1:
                            b.addClass(g[9]), d[0].addClass(g[12]);
                            break;
                        case 3:
                            d[1].addClass(g[12]);
                        case 2:
                            d[0].addClass(g[9]);
                        case 0:
                            b.addClass(g[12])
                    }
                    if (k.addClass(g[0]).data({
                            target: b,
                            options: a,
                            handles: d
                        }), b.val(a.start), !a.behaviour.fixed)
                        for (c = 0; c < d.length; c++) p(q.start, d[c].children(), B, {
                            b: k,
                            target: b,
                            a: [d[c]]
                        });
                    a.behaviour.tap && p(q.start, k, O, {
                        b: k,
                        target: b
                    }), a.behaviour.extend && (b.addClass(g[19]), a.behaviour.tap && p(q.start, b, P, {
                        b: k,
                        target: b
                    })), a.behaviour.drag && (c = k.find("." + g[9]).addClass(g[18]), a.behaviour.fixed && (c = c.add(k.children().not(c).data("grab"))), p(q.start, c, B, {
                        b: k,
                        target: b,
                        a: d
                    }))
                })
            }

            function S() {
                var a = f(this).data("base"),
                    b = [];
                return f.each(a.data("handles"), function() {
                    b.push(f(this).data("store").val())
                }), 1 === b.length ? b[0] : a.data("options").direction ? b.reverse() : b
            }

            function T(a, b) {
                return f.isArray(a) || (a = [a]), this.each(function() {
                    var d, c = f(this).data("base"),
                        e = Array.prototype.slice.call(c.data("handles"), 0),
                        g = c.data("options");
                    for (1 < e.length && (e[2] = e[0]), g.direction && a.reverse(), c = 0; c < e.length; c++)
                        if (d = a[c % 2], null !== d && void 0 !== d) {
                            "string" === f.type(d) && (d = d.replace(",", "."));
                            var h = g.range;
                            d = parseFloat(d), d = s(h, 0 > h[0] ? d + Math.abs(h[0]) : d - h[0]), g.direction && (d = 100 - d), !0 !== x(e[c], d) && e[c].data("store").val(!0), !0 === b && r(g.set, f(this))
                        }
                })
            }

            function U(a) {
                var b = [
                    [a, ""]
                ];
                f.each(a.data("base").data("handles"), function() {
                    b = b.concat(f(this).data("store").elements)
                }), f.each(b, function() {
                    1 < this.length && this[0].off(h)
                }), a.removeClass(g.join(" ")), a.empty().removeData("base options")
            }

            function V(a) {
                return this.each(function() {
                    var b = f(this).val() || !1,
                        c = f(this).data("options"),
                        d = f.extend({}, c, a);
                    !1 !== b && U(f(this)), a && (f(this).noUiSlider(d), !1 !== b && d.start === c.start && f(this).val(b))
                })
            }
            var z = f(document),
                y = f("body"),
                h = ".nui",
                W = f.fn.val,
                g = "noUi-base noUi-origin noUi-handle noUi-input noUi-active noUi-state-tap noUi-target -lower -upper noUi-connect noUi-horizontal noUi-vertical noUi-background noUi-stacking noUi-block noUi-state-blocked noUi-ltr noUi-rtl noUi-dragable noUi-extended noUi-state-drag".split(" "),
                q = window.navigator.pointerEnabled ? {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled ? {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                } : {
                    start: "mousedown touchstart",
                    move: "mousemove touchmove",
                    end: "mouseup touchend"
                };
            return f.fn.val = function() {
                return this.hasClass(g[6]) ? arguments.length ? T.apply(this, arguments) : S.apply(this) : W.apply(this, arguments)
            }, (D ? V : R).call(this, C)
        }
    }(window.jQuery || window.Zepto),
    function(sb, $) {
        "use strict";
        sb.videoPlayer = sb.videoPlayer || {}, sb.videoPlayer.Html5video = function() {
            var instance = null,
                events = null,
                vidEl = null;
            return events = {
                setPlayToPause: function() {
                    $.publish("sb.video.setPlayToPause")
                },
                setPauseToPlay: function() {
                    $.publish("sb.video.setPauseToPlay")
                },
                updateTime: function() {
                    $.publish("sb.video.updateTime")
                },
                updateVolume: function() {
                    $.publish("sb.video.updateVolume")
                }
            }, instance = {
                initPlayer: function(options) {
                    options && ("undefined" != typeof options.el && (vidEl = options.el), vidEl && "undefined" != typeof vidEl.addEventListener && ("undefined" != typeof options.autoplay && options.autoplay && $(vidEl).prop("autoplay", "autoplay"), vidEl.addEventListener("timeupdate", events.updateTime, !1), vidEl.addEventListener("play", events.setPlayToPause, !1), vidEl.addEventListener("pause", events.setPauseToPlay, !1), vidEl.addEventListener("volumechange", events.updateVolume, !1)))
                },
                getDuration: function() {
                    return vidEl ? vidEl.duration : null
                },
                setDuration: function(time) {
                    return vidEl ? vidEl.duration : null
                },
                play: function() {
                    vidEl && vidEl.play && vidEl.play()
                },
                pause: function() {
                    vidEl && vidEl.pause && vidEl.pause()
                },
                playOrPause: function(ev) {
                    vidEl && (vidEl.paused ? vidEl.play() : vidEl.pause()), ev.stopPropagation()
                },
                getURL: function() {
                    return "/video/html5/"
                },
                isPaused: function() {
                    return vidEl ? vidEl.paused : null
                },
                getCurrentTime: function() {
                    return vidEl ? vidEl.currentTime : null
                },
                setCurrentTime: function(t) {
                    vidEl && !isNaN(t) && (vidEl.currentTime = t)
                },
                getVolume: function() {
                    return vidEl && !isNaN(vidEl.volume) ? vidEl.volume : null
                },
                setVolume: function(vol) {
                    vidEl && !isNaN(vol) && (vidEl.volume = vol)
                },
                hasElement: function(html) {
                    return $(html).find("video").length > 0
                },
                getElement: function() {
                    return $(".video_container video")[0]
                },
                close: function() {
                    vidEl && (vidEl.pause(), vidEl.removeEventListener("canplay", instance.play, !1), vidEl.removeEventListener("timeupdate", events.updateTime, !1), vidEl.removeEventListener("play", events.setPlayToPause, !1), vidEl.removeEventListener("pause", events.setPauseToPlay, !1), vidEl.removeEventListener("volumechange", events.updateVolume, !1), $(vidEl).find("source").remove(), vidEl.load())
                }
            }
        }
    }(window.sb = window.sb || {}, jQuery),
    function(sb, $) {
        "use strict";
        sb.videoPlayer = sb.videoPlayer || {}, sb.videoPlayer.Video = function(canPlayH264) {
            function togglePlayPauseButton(isPlaying) {
                vcontrols && ($(vcontrols).find(constants.controls.play).toggle(!isPlaying), $(vcontrols).find(constants.controls.pause).toggle(isPlaying))
            }

            function getDuration() {
                return $(constants.container.player).data("duration")
            }

            function hasCaptionData() {
                var transcriptLangString = $(constants.container.player).data("captiondata");
                return transcriptLangString && (transcriptLangs = $(constants.container.player).data("captiondata").split(";")), transcriptLangs.length > 0
            }

            function setTranscriptLang() {
                var bcCaptionLang = $(vidEl).data("captionlanguage");
                transcriptLangs.indexOf(bcCaptionLang) !== -1 ? selectedTranscriptLang = bcCaptionLang : transcriptLangs.indexOf(constants.defaultTranscriptLang) !== -1 ? selectedTranscriptLang = constants.defaultTranscriptLang : hideControlButton(constants.controls.transcript, !0)
            }

            function showControlButton(control, updateUI) {
                $(control).show(), numControls += 1, updateUI && updateControlsWidth()
            }

            function hideControlButton(control, updateUI) {
                $(control).hide(), numControls -= 1, updateUI && updateControlsWidth()
            }

            function updateControlsWidth() {
                var newControlsClass = constants.controls.numControls + numControls;
                $(constants.controls.self).removeClass(currentControlsClass), $(constants.controls.self).addClass(newControlsClass), currentControlsClass = newControlsClass
            }

            function redirect_to_landing_page(id) {
                isNaN(id) || (window.location.href = constants.url.landing + id)
            }
            var Player = sb.videoPlayer.Html5video,
                vPlayer = null,
                vidEl = null,
                vcontrols = null,
                numControls = 0,
                currentControlsClass = "",
                vcontainer = null,
                volume_adjust_timeout_handle = null,
                pausedForScrubbing = null,
                wasPlaying = null,
                constants = null,
                util = null,
                scrubber = null,
                volume = null,
                events = null,
                analytics = null,
                transcriptLangs = [],
                selectedTranscriptLang = "";
            return vPlayer = new Player, constants = {
                container: {
                    self: ".video_container",
                    player: ".video_player"
                },
                url: {
                    landing: "/video/play/"
                },
                controls: {
                    self: ".sb_video_controls",
                    pausedClass: "paused",
                    play: ".play",
                    pause: ".pause",
                    transcript: ".transcript",
                    numControls: "num_controls_",
                    volume: {
                        self: ".volume",
                        unmute: ".unmute",
                        mute: ".mute",
                        adjust: ".volume_adjust",
                        up: ".volume_adjust .plus",
                        down: ".volume_adjust .minus",
                        track: ".volume_adjust .volume_slider",
                        handle: ".volume_adjust .noUi-handle",
                        adjust_timeout: 3e3,
                        initial_level: 1,
                        minimum_threshold: 1e-4,
                        increment: .1
                    },
                    seek: {
                        self: ".seek",
                        current: ".seek .current_time",
                        total: ".seek .total_time",
                        track: ".seek .seek_slider",
                        handle: ".seek .noUi-handle",
                        progress: ".seek .progress"
                    }
                },
                defaultTranscriptLang: "eng"
            }, util = {
                isVideoId: function(vid) {
                    return !isNaN(parseInt(vid, 10))
                },
                toMMSS: function(num) {
                    var sec_num = Math.round(num),
                        minutes = Math.floor(sec_num / 60),
                        seconds = sec_num - 60 * minutes;
                    return minutes < 10 && (minutes = "0" + minutes), seconds < 10 && (seconds = "0" + seconds), minutes + ":" + seconds
                },
                findControls: function(el) {
                    var container = util.findContainer(el),
                        controls = container && container.length > 0 ? $(container[0]).find(constants.controls.self) : [];
                    return 0 === controls.length ? null : controls
                },
                findContainer: function(el) {
                    return el && $(el).closest ? $(el).closest(constants.container.self) : null
                },
                hasContainer: function(el) {
                    return $(el).closest(constants.container.self).length > 0
                }
            }, currentControlsClass = constants.controls.numControls + numControls, scrubber = {
                initialize: function() {
                    vPlayer && vidEl && vcontrols && vcontrols.find(constants.controls.seek.track).noUiSlider({
                        range: [0, 100],
                        start: 0,
                        handles: 1,
                        connect: "lower",
                        slide: function() {
                            var $this = $(this);
                            sb.console.log("slide callback fired"), pausedForScrubbing ? scrubber.setCurrentTime($this.val()) : (vcontrols.addClass("pause_animation"), vPlayer.isPaused() ? wasPlaying = !1 : (wasPlaying = !0, pausedForScrubbing = !0, vPlayer.pause(), sb.console.log("paused for scrubbing")))
                        }
                    }).change(function() {
                        vcontrols.removeClass("pause_animation"), scrubber.updateTime($(this).val())
                    })
                },
                setCurrentTime: function(time) {
                    vcontrols && !isNaN(time) && $(vcontrols).find(constants.controls.seek.current).text(util.toMMSS(time))
                },
                setTotalTime: function(duration) {
                    vcontrols && !isNaN(duration) && duration > 0 && ($(vcontrols).find(constants.controls.seek.total).text(util.toMMSS(duration)), sb.console.log("updated scrubber total time: " + duration))
                },
                updateTime: function(time) {
                    sb.console.log("time after scrub: " + time), vPlayer.setCurrentTime(time), wasPlaying && (sb.console.log("resumed play after scrubbing"), pausedForScrubbing = !1, vPlayer.play())
                },
                slider: {
                    range: function(duration) {
                        vcontrols && !isNaN(duration) && duration > 0 && (duration = Math.round(duration), $(vcontrols).find(constants.controls.seek.track).noUiSlider({
                            range: [0, duration]
                        }, !0), sb.console.log("updated seek range: " + duration))
                    },
                    time: function(time) {
                        vcontrols && $(vcontrols).find(constants.controls.seek.track).val(time)
                    }
                }
            }, volume = function() {
                var vcvolume = constants.controls.volume,
                    increment = vcvolume.increment,
                    initial_level = vcvolume.initial_level,
                    track = vcvolume.track,
                    adjust = vcvolume.adjust,
                    adjust_timeout = vcvolume.adjust_timeout;
                return {
                    initialize: function() {
                        vidEl && vcontrols && (vidEl.volume = initial_level, vcontrols.find(track).noUiSlider({
                            range: [0, 1],
                            start: initial_level,
                            handles: 1,
                            connect: "lower",
                            orientation: "vertical",
                            direction: "rtl",
                            slide: function() {
                                vPlayer.volume($(this).val())
                            }
                        }))
                    },
                    slider: function() {
                        vcontrols && vcontrols.find(track).val(vPlayer.volume())
                    },
                    up: function() {
                        var vol = null;
                        vPlayer && (vol = vPlayer.volume(), vol = vol + increment <= 1 ? vol + increment : 1, vPlayer.volume(vol), volume.slider())
                    },
                    down: function() {
                        var vol = null;
                        vPlayer && (vol = vPlayer.volume(), vol = vol - increment >= 0 ? vol - increment : 0, vPlayer.volume(vol), volume.slider())
                    },
                    mute: function() {
                        vidEl && vPlayer && ($(vidEl).data("volume", vPlayer.volume()), sb.console.log("before mute, set data-volume to " + $(vidEl).data("volume")), vPlayer.volume(0), volume.slider())
                    },
                    unmute: function() {
                        var vol = 0;
                        vidEl && vPlayer && (vol = $(vidEl).data("volume") || initial_level, vPlayer.volume(vol), volume.slider())
                    },
                    adjust: {
                        toggle: function(bool) {
                            vcontrols && ($(vcontrols).find(adjust).toggle(bool), bool && volume.adjust.hideLater())
                        },
                        hideLater: function() {
                            var volume_adjust = null;
                            vcontrols && vPlayer && (volume_adjust = $(vcontrols).find(adjust), volume_adjust_timeout_handle = setTimeout(function() {
                                volume_adjust.toggle(!1), sb.console.log("volume adjust hidden after 3 seconds.")
                            }, adjust_timeout), sb.console.log("hide volume adjust 3 seconds later"))
                        },
                        isVisible: function() {
                            return vcontrols ? $(vcontrols).find(adjust).is(":visible") : null
                        },
                        set: function() {
                            vcontrols && vPlayer && vcontrols.find(track).val(vPlayer.volume())
                        }
                    }
                }
            }(), analytics = function() {
                var event_name = "Video Player",
                    first_played = !1,
                    is_autoplay = !1,
                    video_id = 0;
                return {
                    set: function(id, autoplay) {
                        video_id = id, is_autoplay = autoplay
                    },
                    firstplay: function() {
                        !first_played && sb && sb.analytics && sb.analytics.track && (first_played = !0, sb.analytics.track(event_name, "html5 video started playing", is_autoplay ? "autoplay" : "user initiated"))
                    },
                    watched: function() {
                        var t = vPlayer.getCurrentTime(),
                            d = vPlayer.getDuration(),
                            percent_watched = t > .99 * d ? "100%" : t >= .75 * d ? "75-99%" : t >= .5 * d ? "50-75%" : t >= .25 * d ? "25-50%" : t >= .1 * d ? "10-25%" : "less than 10%";
                        first_played && sb && sb.analytics && sb.analytics.track && sb.analytics.track(event_name, "html5 video closed at " + percent_watched, video_id)
                    },
                    transcript: function() {
                        sb && sb.analytics && sb.analytics.track && sb.analytics.track(event_name, "open transcript", video_id)
                    }
                }
            }(), events = {
                video: {
                    initialize: function(id, el, autoplay) {
                        var vctrlsClassObj = constants.controls,
                            vcvolume = vctrlsClassObj.volume;
                        vidEl = el, vcontrols = util.findControls(vidEl), vcontainer = util.findContainer(vidEl), vidEl && vcontrols && vPlayer && ($(vcontrols).show(), vPlayer.initPlayer({
                            el: vidEl,
                            autoplay: autoplay
                        }), analytics.set(id, autoplay), hasCaptionData() && (setTranscriptLang(), showControlButton(constants.controls.transcript, !0)), $(vcontainer).find(constants.container.player).on("click", vPlayer.playOrPause), $(vcontrols).on("click", function(ev) {
                            ev.stopPropagation()
                        }), $(vcontrols).find(vcvolume.self).on("click", events.volume.adjust), $(vcontrols).find(vctrlsClassObj.play).on("click", events.video.play), $(vcontrols).find(vctrlsClassObj.pause).on("click", events.video.pause), $(vcontrols).find(vcvolume.unmute).on("click", events.volume.unmute), $(vcontrols).find(vcvolume.mute).on("click", events.volume.mute), $(vcontrols).find(vcvolume.up).on("click", events.volume.up), $(vcontrols).find(vcvolume.down).on("click", events.volume.down), $(vcontrols).find(vctrlsClassObj.transcript).on("click", function() {
                            events.openTranscript(id), analytics.transcript()
                        }), scrubber.initialize(), volume.initialize(), events.video.initDuration(), $.subscribe("sb.video.setPlayToPause", events.video.setPlayToPause), $.subscribe("sb.video.setPauseToPlay", events.video.setPauseToPlay), $.subscribe("sb.video.updateTime", events.updateTime), $.subscribe("sb.video.updateVolume", events.volume.toggleVolumeAndMute))
                    },
                    play: function() {
                        vPlayer.play()
                    },
                    pause: function() {
                        vPlayer.pause()
                    },
                    setPlayToPause: function() {
                        analytics.firstplay(), togglePlayPauseButton(!0)
                    },
                    setPauseToPlay: function() {
                        togglePlayPauseButton(!1)
                    },
                    initDuration: function() {
                        var time = getDuration();
                        !isNaN(time) && time > 0 && (scrubber.slider.range(time), scrubber.setTotalTime(time))
                    },
                    cleanup: function() {
                        $.unsubscribe("sb.video.setPlayToPause", events.video.setPlayToPause), $.unsubscribe("sb.video.setPauseToPlay", events.video.setPauseToPlay), $.unsubscribe("sb.video.updateTime", events.updateTime), $.unsubscribe("sb.video.updateVolume", events.volume.toggleVolumeAndMute)
                    }
                },
                volume: {
                    up: function() {
                        volume.up()
                    },
                    down: function() {
                        volume.down()
                    },
                    mute: function() {
                        volume.unmute(), volume.adjust.toggle(!0)
                    },
                    unmute: function() {
                        volume.adjust.isVisible() ? (volume.adjust.toggle(!1), volume.mute()) : volume.adjust.toggle(!0)
                    },
                    adjust: function() {
                        volume_adjust_timeout_handle && (clearTimeout(volume_adjust_timeout_handle), volume_adjust_timeout_handle = null, sb.console.log("volume_adjust_timeout cleared")), volume.adjust.isVisible() && volume.adjust.hideLater()
                    },
                    toggleVolumeAndMute: function() {
                        var vcvolume = constants.controls.volume,
                            isMuted = !1;
                        vidEl && vcontrols && (isMuted = vPlayer.volume() < vcvolume.minimum_threshold, $(vcontrols).find(vcvolume.mute).toggle(isMuted), $(vcontrols).find(vcvolume.unmute).toggle(!isMuted), volume.adjust.set())
                    }
                },
                updateTime: function() {
                    var time = 0;
                    pausedForScrubbing || (time = vPlayer.getCurrentTime(), scrubber.setCurrentTime(time), scrubber.slider.time(time))
                },
                openTranscript: function(id) {
                    var baseUrl = "http://api.subply.com/content/transcript/" + selectedTranscriptLang + "?url=",
                        transcriptUrl = "http%3A%2F%2Flink.brightcove.com%2Fservices%2Fplayer%2Fbcpid605122090001%3Fbctid%3D" + id,
                        transcriptHref = baseUrl + transcriptUrl;
                    window.open(transcriptHref, "_blank")
                }
            }, {
                initEmbedded: function(id, obj) {
                    events.video.initialize(id, obj, !1), $(window).unload(analytics.watched)
                },
                cleanup: function() {
                    analytics.watched(), vPlayer.close(), events.video.cleanup(), vPlayer = null
                },
                getHtml: function(vid, callback) {
                    var getURL = vPlayer.getURL();
                    vid && $.ajax({
                        url: getURL + vid,
                        cache: !1,
                        success: function(html) {
                            var el = null;
                            "function" == typeof callback && (vPlayer.hasElement(html) && util.hasContainer(html) ? (callback(html), el = vPlayer.getElement(), $(constants.container.self).show(), events.video.initialize(vid, el, !0)) : redirect_to_landing_page(vid))
                        },
                        error: function(response) {
                            404 === response.status && "function" == typeof callback ? callback(response.responseText) : redirect_to_landing_page(vid)
                        }
                    })
                }
            }
        }
    }(window.sb = window.sb || {}, jQuery),
    function(sb, $) {
        "use strict";
        var elm = document.createElement("video"),
            hasCanPlayType = elm && "function" == typeof elm.canPlayType,
            mp4codecs = 'video/mp4; codecs="avc1.42E01E"',
            canPlayH264 = !!hasCanPlayType && "probably" === elm.canPlayType(mp4codecs),
            mayPlayH264 = !!hasCanPlayType && "maybe" === elm.canPlayType(mp4codecs);
        sb.videoPlayer = sb.videoPlayer || {}, sb.videoPlayer.manager = function() {
            function getContainer(obj) {
                return $(obj).parent(".video_player").parent(".video_container")
            }
            var Video = sb.videoPlayer.Video,
                vidEl = null,
                bcEl = null,
                videoObj = null,
                vid = null,
                video_container = null,
                replaceH264_link = null;
            $(function() {
                mayPlayH264 ? $("a[data-link]").each(function(index, link) {
                    $(link).attr("href", $(link).data("link"))
                }) : canPlayH264 && $(document).on("click", "a[data-video]", function() {
                    var vObj = new Video(canPlayH264),
                        vid = $(this).data("video").toString();
                    if (vid.match(/^[0-9]+$/)) return sb.lightbox.open({
                        beforeClose: vObj.cleanup,
                        afterClose: function() {
                            vObj = null
                        },
                        contentClass: "lightbox_content_video"
                    }), vObj.getHtml(vid, function(content) {
                        sb.lightbox.setContent(content)
                    }), !1
                }), vidEl = $("video")[0], (vidEl || bcEl) && (vid = $("[data-videoid]").data("videoid")), vidEl && (canPlayH264 ? (vidEl.removeAttribute("controls"), videoObj = new Video((!0)), videoObj.initEmbedded(vid, vidEl)) : (video_container = getContainer(vidEl), replaceH264_link = mayPlayH264 ? $(vidEl).find("a.video_image_link") : $(vidEl).find("object"), 1 === replaceH264_link.length && ($(video_container).empty(), replaceH264_link.appendTo(video_container))))
            })
        }
    }(window.sb = window.sb || {}, jQuery), sb.videoPlayer.manager(),
    function($, sb) {
        "use strict";

        function init(r) {
            $howToBrew = $(".heroBanner--howToBrew"), $backgroundVideo = $howToBrew.find("video"), showVideoWhenReady($backgroundVideo), $brewLinks = $howToBrew.find(".brewLinksList li"), $marker = $howToBrew.find(".marker"), title = $("title").html(), rwd = r, $brewLinks.find("a").each(function() {
                window.location.href.toLowerCase().indexOf($(this).attr("href").toLowerCase()) !== -1 && (stateObj.currentPage = $(this).parent().attr("class").replace(" on", "").replace("brewLinksList__item ", ""), $(this).parent().addClass("on"))
            }).click(function(e) {
                e.preventDefault(), $(".touch body").animate({
                    scrollTop: parseInt($howToBrew.offset().top) + 2
                }, 900), loadContent($(this))
            }), supportsHistory && (history.replaceState(stateObj, title), window.addEventListener("popstate", function(event) {
                history.replaceState(stateObj, title), loadContent($howToBrew.find(".brewLinksList ." + event.state.currentPage).find("a"))
            })), rwd && rwd.onDelayedResize(moveMarker, !0), $marker.fadeIn()
        }

        function loadContent($newLink) {
            $.get($newLink.attr("href"), function(data) {
                var $data = $(data),
                    $htbContainer = $(".howToBrewContainer");
                $howToBrew.find(".grid_align_left").replaceWith($data.find(".heroBanner--howToBrew .grid_align_left")), $htbContainer.find(".video--howToBrew").replaceWith($data.find(".video--howToBrew")), $htbContainer.find(".instructions").replaceWith($data.find(".instructions"));
                var $backgroundVideo = $howToBrew.find("video");
                if ($backgroundVideo.length > 0) {
                    $backgroundVideo.replaceWith($data.find("video"));
                    var $newVideo = $howToBrew.find("video");
                    showVideoWhenReady($newVideo)
                }
                supportsHistory && (stateObj.currentPage = $newLink.parent().attr("class").replace(" on", "").replace("brewLinksList__item ", ""), history.pushState(stateObj, title, $newLink.attr("href")))
            }), $brewLinks.removeClass("on"), $newLink.parent().addClass("on"), moveMarker(!0), _gaq && _gaq.push && _gaq.push(["_trackEvent", "HowToBrewGoogle", "ChangedBrewMethod", $newLink.text(), rwd && rwd.viewportWidth ? rwd.viewportWidth() : 0])
        }

        function showVideoWhenReady(targetVid) {
            targetVid && targetVid[0] && targetVid[0].addEventListener("canplay", fadeInVideo)
        }

        function fadeInVideo(e) {
            $(e.currentTarget).addClass("active"), e.currentTarget.currentTime = 0, e.currentTarget.removeEventListener("canplay", fadeInVideo)
        }

        function moveMarker(doAnimate) {
            var $onLink = $(".brewLinksList .on");
            (!$onLink || $onLink.length <= 0) && ($onLink = $brewLinks.first().addClass("on")), menuOrientationIsVertical() ? $marker.css({
                left: "0",
                bottom: "auto"
            }).animate({
                top: $onLink.position().top + $onLink.height() / 2
            }, doAnimate ? 200 : 0) : $marker.css({
                bottom: "0",
                top: "auto"
            }).animate({
                left: $onLink.position().left + $onLink.width() / 2 - 9
            }, doAnimate ? 200 : 0)
        }

        function menuOrientationIsVertical() {
            return document.body.clientWidth < 465
        }
        var $brewLinks, $marker, $howToBrew, title, rwd, $backgroundVideo, supportsHistory = window.history && window.history.pushState,
            stateObj = {};
        sb.HowToBrew = {
            init: init
        }
    }(jQuery, sb), $(document).ready(function() {
        $(".howToBrewContainer").length > 0 && sb.HowToBrew.init(sb.rwd)
    }),
    function($) {
        "use strict";

        function setViewportDescription() {
            viewportDescription = window.inerWidth > 767 ? "DESKTOP" : "NARROW"
        }

        function showTooltip(myTrigger) {
            var leftOffset, pointerOffset = 20,
                $myTrigger = $(myTrigger),
                id = $myTrigger.attr("aria-describedby"),
                $aside = $("aside[id=" + id + "]"),
                asideOriginLeft = $aside.css("left"),
                triggerHeight = $myTrigger.height(),
                coords = $myTrigger.position();
            $myTrigger.addClass("active"), $aside.data("left", asideOriginLeft), "NARROW" !== viewportDescription ? (leftOffset = $aside.width() + $myTrigger.width(), $aside.css({
                top: coords.top + triggerHeight + pointerOffset,
                left: coords.left - leftOffset / 2
            })) : $aside.css({
                top: coords.top + triggerHeight + pointerOffset,
                left: 0
            }), $aside.addClass("active")
        }

        function handleResize() {
            var myTrigger = $(".sb_tooltip.active");
            setViewportDescription(), myTrigger.length > 0 && showTooltip(myTrigger.get())
        }

        function generateTips() {
            var tipContent, tipStr, i, tooltipArray = $("span.sb_tooltip"),
                len = tooltipArray.length;
            for (i = 0; i < len; i += 1) tipContent = $(tooltipArray[i]).attr("title"), $(tooltipArray[i]).attr("aria-describedby", "tipID" + i).attr("tabindex", 0).removeAttr("title"), tipStr = '<aside id="tipID' + i + '" class="sb_tooltip" aria-hidden="true">' + tipContent + "</aside>\n", $(tooltipArray[i]).after(tipStr)
        }

        function hideTooltip(myTrigger) {
            var $myTrigger = $(myTrigger),
                id = $myTrigger.attr("aria-describedby"),
                $aside = $("aside[id=" + id + "]");
            $myTrigger.is(":focus") || ($(".sb_tooltip").removeClass("active"), $aside.css("left", $aside.data("left")))
        }

        function initListeners() {
            var $sb_tooltip = $("span.sb_tooltip");
            $(window).on("resize", handleResize), $(window).on("orientationchange", function() {
                $sb_tooltip.removeClass("active")
            }), $sb_tooltip.focusin(function() {
                showTooltip(this)
            }), $sb_tooltip.focusout(function() {
                hideTooltip(this)
            }), $sb_tooltip.hover(function() {
                showTooltip(this)
            }, function() {
                return hideTooltip(this), !1
            }), $sb_tooltip.click(function() {
                return showTooltip(this), !1
            }), $("body").on("click touchstart", function() {
                hideTooltip(this)
            })
        }
        var viewportDescription = "NARROW";
        setViewportDescription(), generateTips(), initListeners()
    }(jQuery),
    function(t) {
        "use strict";
        var i = t.jCarousel = {};
        i.version = "0.3.1";
        var s = /^([+\-]=)?(.+)$/;
        i.parseTarget = function(t) {
            var i = !1,
                e = "object" != typeof t ? s.exec(t) : null;
            return e ? (t = parseInt(e[2], 10) || 0, e[1] && (i = !0, "-=" === e[1] && (t *= -1))) : "object" != typeof t && (t = parseInt(t, 10) || 0), {
                target: t,
                relative: i
            }
        }, i.detectCarousel = function(t) {
            for (var i; t.length > 0;) {
                if (i = t.filter("[data-jcarousel]"), i.length > 0) return i;
                if (i = t.find("[data-jcarousel]"), i.length > 0) return i;
                t = t.parent()
            }
            return null
        }, i.base = function(s) {
            return {
                version: i.version,
                _options: {},
                _element: null,
                _carousel: null,
                _init: t.noop,
                _create: t.noop,
                _destroy: t.noop,
                _reload: t.noop,
                create: function() {
                    return this._element.attr("data-" + s.toLowerCase(), !0).data(s, this), !1 === this._trigger("create") ? this : (this._create(), this._trigger("createend"), this)
                },
                destroy: function() {
                    return !1 === this._trigger("destroy") ? this : (this._destroy(), this._trigger("destroyend"), this._element.removeData(s).removeAttr("data-" + s.toLowerCase()), this)
                },
                reload: function(t) {
                    return !1 === this._trigger("reload") ? this : (t && this.options(t), this._reload(), this._trigger("reloadend"), this)
                },
                element: function() {
                    return this._element
                },
                options: function(i, s) {
                    if (0 === arguments.length) return t.extend({}, this._options);
                    if ("string" == typeof i) {
                        if (void 0 === s) return void 0 === this._options[i] ? null : this._options[i];
                        this._options[i] = s
                    } else this._options = t.extend({}, this._options, i);
                    return this
                },
                carousel: function() {
                    return this._carousel || (this._carousel = i.detectCarousel(this.options("carousel") || this._element), this._carousel || t.error('Could not detect carousel for plugin "' + s + '"')), this._carousel
                },
                _trigger: function(i, e, r) {
                    var n, o = !1;
                    return r = [this].concat(r || []), (e || this._element).each(function() {
                        n = t.Event((s + ":" + i).toLowerCase()), t(this).trigger(n, r), n.isDefaultPrevented() && (o = !0)
                    }), !o
                }
            }
        }, i.plugin = function(s, e) {
            var r = t[s] = function(i, s) {
                this._element = t(i), this.options(s), this._init(), this.create()
            };
            return r.fn = r.prototype = t.extend({}, i.base(s), e), t.fn[s] = function(i) {
                var e = Array.prototype.slice.call(arguments, 1),
                    n = this;
                return "string" == typeof i ? this.each(function() {
                    var r = t(this).data(s);
                    if (!r) return t.error("Cannot call methods on " + s + ' prior to initialization; attempted to call method "' + i + '"');
                    if (!t.isFunction(r[i]) || "_" === i.charAt(0)) return t.error('No such method "' + i + '" for ' + s + " instance");
                    var o = r[i].apply(r, e);
                    return o !== r && void 0 !== o ? (n = o, !1) : void 0
                }) : this.each(function() {
                    var e = t(this).data(s);
                    e instanceof r ? e.reload(i) : new r(this, i)
                }), n
            }, r
        }
    }(jQuery),
    function(t, i) {
        "use strict";
        var s = function(t) {
            return parseFloat(t) || 0
        };
        t.jCarousel.plugin("jcarousel", {
            animating: !1,
            tail: 0,
            inTail: !1,
            resizeTimer: null,
            lt: null,
            vertical: !1,
            rtl: !1,
            circular: !1,
            underflow: !1,
            relative: !1,
            _options: {
                list: function() {
                    return this.element().children().eq(0)
                },
                items: function() {
                    return this.list().children()
                },
                animation: 400,
                transitions: !1,
                wrap: null,
                vertical: null,
                rtl: null,
                center: !1
            },
            _list: null,
            _items: null,
            _target: null,
            _first: null,
            _last: null,
            _visible: null,
            _fullyvisible: null,
            _init: function() {
                var t = this;
                return this.onWindowResize = function() {
                    t.resizeTimer && clearTimeout(t.resizeTimer), t.resizeTimer = setTimeout(function() {
                        t.reload()
                    }, 100)
                }, this
            },
            _create: function() {
                this._reload(), t(i).on("resize.jcarousel", this.onWindowResize)
            },
            _destroy: function() {
                t(i).off("resize.jcarousel", this.onWindowResize)
            },
            _reload: function() {
                this.vertical = this.options("vertical"), null == this.vertical && (this.vertical = this.list().height() > this.list().width()), this.rtl = this.options("rtl"), null == this.rtl && (this.rtl = function(i) {
                    if ("rtl" === ("" + i.attr("dir")).toLowerCase()) return !0;
                    var s = !1;
                    return i.parents("[dir]").each(function() {
                        return /rtl/i.test(t(this).attr("dir")) ? (s = !0, !1) : void 0
                    }), s
                }(this._element)), this.lt = this.vertical ? "top" : "left", this.relative = "relative" === this.list().css("position"), this._list = null, this._items = null;
                var i = this._target && this.index(this._target) >= 0 ? this._target : this.closest();
                this.circular = "circular" === this.options("wrap"), this.underflow = !1;
                var s = {
                    left: 0,
                    top: 0
                };
                return i.length > 0 && (this._prepare(i), this.list().find("[data-jcarousel-clone]").remove(), this._items = null, this.underflow = this._fullyvisible.length >= this.items().length, this.circular = this.circular && !this.underflow, s[this.lt] = this._position(i) + "px"), this.move(s), this
            },
            list: function() {
                if (null === this._list) {
                    var i = this.options("list");
                    this._list = t.isFunction(i) ? i.call(this) : this._element.find(i)
                }
                return this._list
            },
            items: function() {
                if (null === this._items) {
                    var i = this.options("items");
                    this._items = (t.isFunction(i) ? i.call(this) : this.list().find(i)).not("[data-jcarousel-clone]")
                }
                return this._items
            },
            index: function(t) {
                return this.items().index(t)
            },
            closest: function() {
                var i, e = this,
                    r = this.list().position()[this.lt],
                    n = t(),
                    o = !1,
                    l = this.vertical ? "bottom" : this.rtl && !this.relative ? "left" : "right";
                return this.rtl && this.relative && !this.vertical && (r += this.list().width() - this.clipping()), this.items().each(function() {
                    if (n = t(this), o) return !1;
                    var a = e.dimension(n);
                    if (r += a, r >= 0) {
                        if (i = a - s(n.css("margin-" + l)), !(0 >= Math.abs(r) - a + i / 2)) return !1;
                        o = !0
                    }
                }), n
            },
            target: function() {
                return this._target
            },
            first: function() {
                return this._first
            },
            last: function() {
                return this._last
            },
            visible: function() {
                return this._visible
            },
            fullyvisible: function() {
                return this._fullyvisible
            },
            hasNext: function() {
                if (!1 === this._trigger("hasnext")) return !0;
                var t = this.options("wrap"),
                    i = this.items().length - 1;
                return !!(i >= 0 && !this.underflow && (t && "first" !== t || i > this.index(this._last) || this.tail && !this.inTail))
            },
            hasPrev: function() {
                if (!1 === this._trigger("hasprev")) return !0;
                var t = this.options("wrap");
                return !!(this.items().length > 0 && !this.underflow && (t && "last" !== t || this.index(this._first) > 0 || this.tail && this.inTail))
            },
            clipping: function() {
                return this._element["inner" + (this.vertical ? "Height" : "Width")]()
            },
            dimension: function(t) {
                return t["outer" + (this.vertical ? "Height" : "Width")](!0)
            },
            scroll: function(i, s, e) {
                if (this.animating) return this;
                if (!1 === this._trigger("scroll", null, [i, s])) return this;
                t.isFunction(s) && (e = s, s = !0);
                var r = t.jCarousel.parseTarget(i);
                if (r.relative) {
                    var n, o, l, a, h, u, c, f, d = this.items().length - 1,
                        _ = Math.abs(r.target),
                        p = this.options("wrap");
                    if (r.target > 0) {
                        var g = this.index(this._last);
                        if (g >= d && this.tail) this.inTail ? "both" === p || "last" === p ? this._scroll(0, s, e) : t.isFunction(e) && e.call(this, !1) : this._scrollTail(s, e);
                        else if (n = this.index(this._target), this.underflow && n === d && ("circular" === p || "both" === p || "last" === p) || !this.underflow && g === d && ("both" === p || "last" === p)) this._scroll(0, s, e);
                        else if (l = n + _, this.circular && l > d) {
                            for (f = d, h = this.items().get(-1); l > f++;) h = this.items().eq(0), u = this._visible.index(h) >= 0, u && h.after(h.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(h), u || (c = {}, c[this.lt] = this.dimension(h), this.moveBy(c)), this._items = null;
                            this._scroll(h, s, e)
                        } else this._scroll(Math.min(l, d), s, e)
                    } else if (this.inTail) this._scroll(Math.max(this.index(this._first) - _ + 1, 0), s, e);
                    else if (o = this.index(this._first), n = this.index(this._target), a = this.underflow ? n : o, l = a - _, 0 >= a && (this.underflow && "circular" === p || "both" === p || "first" === p)) this._scroll(d, s, e);
                    else if (this.circular && 0 > l) {
                        for (f = l, h = this.items().get(0); 0 > f++;) {
                            h = this.items().eq(-1), u = this._visible.index(h) >= 0, u && h.after(h.clone(!0).attr("data-jcarousel-clone", !0)), this.list().prepend(h), this._items = null;
                            var v = this.dimension(h);
                            c = {}, c[this.lt] = -v, this.moveBy(c)
                        }
                        this._scroll(h, s, e)
                    } else this._scroll(Math.max(l, 0), s, e)
                } else this._scroll(r.target, s, e);
                return this._trigger("scrollend"), this
            },
            moveBy: function(t, i) {
                var e = this.list().position(),
                    r = 1,
                    n = 0;
                return this.rtl && !this.vertical && (r = -1, this.relative && (n = this.list().width() - this.clipping())), t.left && (t.left = e.left + n + s(t.left) * r + "px"), t.top && (t.top = e.top + n + s(t.top) * r + "px"), this.move(t, i)
            },
            move: function(i, s) {
                s = s || {};
                var e = this.options("transitions"),
                    r = !!e,
                    n = !!e.transforms,
                    o = !!e.transforms3d,
                    l = s.duration || 0,
                    a = this.list();
                if (!r && l > 0) return void a.animate(i, s);
                var h = s.complete || t.noop,
                    u = {};
                if (r) {
                    var c = a.css(["transitionDuration", "transitionTimingFunction", "transitionProperty"]),
                        f = h;
                    h = function() {
                        t(this).css(c), f.call(this)
                    }, u = {
                        transitionDuration: (l > 0 ? l / 1e3 : 0) + "s",
                        transitionTimingFunction: e.easing || s.easing,
                        transitionProperty: l > 0 ? function() {
                            return n || o ? "all" : i.left ? "left" : "top"
                        }() : "none",
                        transform: "none"
                    }
                }
                o ? u.transform = "translate3d(" + (i.left || 0) + "," + (i.top || 0) + ",0)" : n ? u.transform = "translate(" + (i.left || 0) + "," + (i.top || 0) + ")" : t.extend(u, i), r && l > 0 && a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", h), a.css(u), 0 >= l && a.each(function() {
                    h.call(this)
                })
            },
            _scroll: function(i, s, e) {
                if (this.animating) return t.isFunction(e) && e.call(this, !1), this;
                if ("object" != typeof i ? i = this.items().eq(i) : void 0 === i.jquery && (i = t(i)), 0 === i.length) return t.isFunction(e) && e.call(this, !1), this;
                this.inTail = !1, this._prepare(i);
                var r = this._position(i),
                    n = this.list().position()[this.lt];
                if (r === n) return t.isFunction(e) && e.call(this, !1), this;
                var o = {};
                return o[this.lt] = r + "px", this._animate(o, s, e), this
            },
            _scrollTail: function(i, s) {
                if (this.animating || !this.tail) return t.isFunction(s) && s.call(this, !1), this;
                var e = this.list().position()[this.lt];
                this.rtl && this.relative && !this.vertical && (e += this.list().width() - this.clipping()), this.rtl && !this.vertical ? e += this.tail : e -= this.tail, this.inTail = !0;
                var r = {};
                return r[this.lt] = e + "px", this._update({
                    target: this._target.next(),
                    fullyvisible: this._fullyvisible.slice(1).add(this._visible.last())
                }), this._animate(r, i, s), this
            },
            _animate: function(i, s, e) {
                if (e = e || t.noop, !1 === this._trigger("animate")) return e.call(this, !1), this;
                this.animating = !0;
                var r = this.options("animation"),
                    n = t.proxy(function() {
                        this.animating = !1;
                        var t = this.list().find("[data-jcarousel-clone]");
                        t.length > 0 && (t.remove(), this._reload()), this._trigger("animateend"), e.call(this, !0)
                    }, this),
                    o = "object" == typeof r ? t.extend({}, r) : {
                        duration: r
                    },
                    l = o.complete || t.noop;
                return s === !1 ? o.duration = 0 : void 0 !== t.fx.speeds[o.duration] && (o.duration = t.fx.speeds[o.duration]), o.complete = function() {
                    n(), l.call(this)
                }, this.move(i, o), this
            },
            _prepare: function(i) {
                var e, r, n, o, l = this.index(i),
                    a = l,
                    h = this.dimension(i),
                    u = this.clipping(),
                    c = this.vertical ? "bottom" : this.rtl ? "left" : "right",
                    f = this.options("center"),
                    d = {
                        target: i,
                        first: i,
                        last: i,
                        visible: i,
                        fullyvisible: u >= h ? i : t()
                    };
                if (f && (h /= 2, u /= 2), u > h)
                    for (;;) {
                        if (e = this.items().eq(++a), 0 === e.length) {
                            if (!this.circular) break;
                            if (e = this.items().eq(0), i.get(0) === e.get(0)) break;
                            if (r = this._visible.index(e) >= 0, r && e.after(e.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(e), !r) {
                                var _ = {};
                                _[this.lt] = this.dimension(e), this.moveBy(_)
                            }
                            this._items = null
                        }
                        if (o = this.dimension(e), 0 === o) break;
                        if (h += o, d.last = e, d.visible = d.visible.add(e), n = s(e.css("margin-" + c)), u >= h - n && (d.fullyvisible = d.fullyvisible.add(e)), h >= u) break
                    }
                if (!this.circular && !f && u > h)
                    for (a = l; !(0 > --a) && (e = this.items().eq(a), 0 !== e.length) && (o = this.dimension(e), 0 !== o) && (h += o, d.first = e, d.visible = d.visible.add(e), n = s(e.css("margin-" + c)), u >= h - n && (d.fullyvisible = d.fullyvisible.add(e)), !(h >= u)););
                return this._update(d), this.tail = 0, f || "circular" === this.options("wrap") || "custom" === this.options("wrap") || this.index(d.last) !== this.items().length - 1 || (h -= s(d.last.css("margin-" + c)), h > u && (this.tail = h - u)), this
            },
            _position: function(t) {
                var i = this._first,
                    s = i.position()[this.lt],
                    e = this.options("center"),
                    r = e ? this.clipping() / 2 - this.dimension(i) / 2 : 0;
                return this.rtl && !this.vertical ? (s -= this.relative ? this.list().width() - this.dimension(i) : this.clipping() - this.dimension(i), s += r) : s -= r, !e && (this.index(t) > this.index(i) || this.inTail) && this.tail ? (s = this.rtl && !this.vertical ? s - this.tail : s + this.tail, this.inTail = !0) : this.inTail = !1, -s
            },
            _update: function(i) {
                var s, e = this,
                    r = {
                        target: this._target || t(),
                        first: this._first || t(),
                        last: this._last || t(),
                        visible: this._visible || t(),
                        fullyvisible: this._fullyvisible || t()
                    },
                    n = this.index(i.first || r.first) < this.index(r.first),
                    o = function(s) {
                        var o = [],
                            l = [];
                        i[s].each(function() {
                            0 > r[s].index(this) && o.push(this)
                        }), r[s].each(function() {
                            0 > i[s].index(this) && l.push(this)
                        }), n ? o = o.reverse() : l = l.reverse(), e._trigger(s + "in", t(o)), e._trigger(s + "out", t(l)), e["_" + s] = i[s]
                    };
                for (s in i) o(s);
                return this
            }
        })
    }(jQuery, window),
    function(t) {
        "use strict";
        t.jcarousel.fn.scrollIntoView = function(i, s, e) {
            var r, n = t.jCarousel.parseTarget(i),
                o = this.index(this._fullyvisible.first()),
                l = this.index(this._fullyvisible.last());
            if (r = n.relative ? 0 > n.target ? Math.max(0, o + n.target) : l + n.target : "object" != typeof n.target ? n.target : this.index(n.target), o > r) return this.scroll(r, s, e);
            if (r >= o && l >= r) return t.isFunction(e) && e.call(this, !1), this;
            for (var a, h = this.items(), u = this.clipping(), c = this.vertical ? "bottom" : this.rtl ? "left" : "right", f = 0; a = h.eq(r), 0 !== a.length;) {
                if (f += this.dimension(a), f >= u) {
                    var d = parseFloat(a.css("margin-" + c)) || 0;
                    f - d !== u && r++;
                    break
                }
                if (0 >= r) break;
                r--
            }
            return this.scroll(r, s, e)
        }
    }(jQuery),
    function(t) {
        "use strict";
        t.jCarousel.plugin("jcarouselControl", {
            _options: {
                target: "+=1",
                event: "click",
                method: "scroll"
            },
            _active: null,
            _init: function() {
                this.onDestroy = t.proxy(function() {
                    this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this))
                }, this), this.onReload = t.proxy(this._reload, this), this.onEvent = t.proxy(function(i) {
                    i.preventDefault();
                    var s = this.options("method");
                    t.isFunction(s) ? s.call(this) : this.carousel().jcarousel(this.options("method"), this.options("target"))
                }, this)
            },
            _create: function() {
                this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend", this.onReload), this._element.on(this.options("event") + ".jcarouselcontrol", this.onEvent), this._reload()
            },
            _destroy: function() {
                this._element.off(".jcarouselcontrol", this.onEvent), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend", this.onReload)
            },
            _reload: function() {
                var i, s = t.jCarousel.parseTarget(this.options("target")),
                    e = this.carousel();
                if (s.relative) i = e.jcarousel(s.target > 0 ? "hasNext" : "hasPrev");
                else {
                    var r = "object" != typeof s.target ? e.jcarousel("items").eq(s.target) : s.target;
                    i = e.jcarousel("target").index(r) >= 0
                }
                return this._active !== i && (this._trigger(i ? "active" : "inactive"), this._active = i), this
            }
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.jCarousel.plugin("jcarouselPagination", {
            _options: {
                perPage: null,
                item: function(t) {
                    return '<a href="#' + t + '">' + t + "</a>"
                },
                event: "click",
                method: "scroll"
            },
            _carouselItems: null,
            _pages: {},
            _items: {},
            _currentPage: null,
            _init: function() {
                this.onDestroy = t.proxy(function() {
                    this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this))
                }, this), this.onReload = t.proxy(this._reload, this), this.onScroll = t.proxy(this._update, this)
            },
            _create: function() {
                this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend", this.onReload).on("jcarousel:scrollend", this.onScroll), this._reload()
            },
            _destroy: function() {
                this._clear(), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend", this.onReload).off("jcarousel:scrollend", this.onScroll), this._carouselItems = null
            },
            _reload: function() {
                var i = this.options("perPage");
                if (this._pages = {}, this._items = {}, t.isFunction(i) && (i = i.call(this)), null == i) this._pages = this._calculatePages();
                else
                    for (var s, e = parseInt(i, 10) || 0, r = this._getCarouselItems(), n = 1, o = 0; s = r.eq(o++), 0 !== s.length;) this._pages[n] = this._pages[n] ? this._pages[n].add(s) : s, 0 === o % e && n++;
                this._clear();
                var l = this,
                    a = this.carousel().data("jcarousel"),
                    h = this._element,
                    u = this.options("item"),
                    c = this._getCarouselItems().length;
                t.each(this._pages, function(i, s) {
                    var e = l._items[i] = t(u.call(l, i, s));
                    e.on(l.options("event") + ".jcarouselpagination", t.proxy(function() {
                        var t = s.eq(0);
                        if (a.circular) {
                            var e = a.index(a.target()),
                                r = a.index(t);
                            parseFloat(i) > parseFloat(l._currentPage) ? e > r && (t = "+=" + (c - e + r)) : r > e && (t = "-=" + (e + (c - r)))
                        }
                        a[this.options("method")](t)
                    }, l)), h.append(e)
                }), this._update()
            },
            _update: function() {
                var i, s = this.carousel().jcarousel("target");
                t.each(this._pages, function(t, e) {
                    return e.each(function() {
                        return s.is(this) ? (i = t, !1) : void 0
                    }), !i && void 0
                }), this._currentPage !== i && (this._trigger("inactive", this._items[this._currentPage]), this._trigger("active", this._items[i])), this._currentPage = i
            },
            items: function() {
                return this._items
            },
            reloadCarouselItems: function() {
                return this._carouselItems = null, this
            },
            _clear: function() {
                this._element.empty(), this._currentPage = null
            },
            _calculatePages: function() {
                for (var t, i = this.carousel().data("jcarousel"), s = this._getCarouselItems(), e = i.clipping(), r = 0, n = 0, o = 1, l = {}; t = s.eq(n++), 0 !== t.length;) l[o] = l[o] ? l[o].add(t) : t, r += i.dimension(t), r >= e && (o++, r = 0);
                return l
            },
            _getCarouselItems: function() {
                return this._carouselItems || (this._carouselItems = this.carousel().jcarousel("items")), this._carouselItems
            }
        })
    }(jQuery),
    function(t) {
        "use strict";
        t.jCarousel.plugin("jcarouselAutoscroll", {
            _options: {
                target: "+=1",
                interval: 3e3,
                autostart: !0
            },
            _timer: null,
            _init: function() {
                this.onDestroy = t.proxy(function() {
                    this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this))
                }, this), this.onAnimateEnd = t.proxy(this.start, this)
            },
            _create: function() {
                this.carousel().one("jcarousel:destroy", this.onDestroy), this.options("autostart") && this.start()
            },
            _destroy: function() {
                this.stop(), this.carousel().off("jcarousel:destroy", this.onDestroy)
            },
            start: function() {
                return this.stop(), this.carousel().one("jcarousel:animateend", this.onAnimateEnd), this._timer = setTimeout(t.proxy(function() {
                    this.carousel().jcarousel("scroll", this.options("target"))
                }, this), this.options("interval")), this
            },
            stop: function() {
                return this._timer && (this._timer = clearTimeout(this._timer)), this.carousel().off("jcarousel:animateend", this.onAnimateEnd), this
            }
        })
    }(jQuery),
    function(a) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], a) : a(jQuery)
    }(function(f) {
        function w(E) {
            return !E || void 0 !== E.allowPageScroll || void 0 === E.swipe && void 0 === E.swipeStatus || (E.allowPageScroll = m), void 0 !== E.click && void 0 === E.tap && (E.tap = E.click), E || (E = {}), E = f.extend({}, f.fn.swipe.defaults, E), this.each(function() {
                var G = f(this),
                    F = G.data(B);
                F || (F = new C(this, E), G.data(B, F))
            })
        }

        function C(a4, av) {
            function aN(bd) {
                if (!(aB() || f(bd.target).closest(av.excludedElements, aR).length > 0)) {
                    var bc, be = bd.originalEvent ? bd.originalEvent : bd,
                        bb = a ? be.touches[0] : be;
                    return Z = g, a ? W = be.touches.length : bd.preventDefault(), ag = 0, aP = null, aJ = null, ab = 0, a1 = 0, aZ = 0, G = 1, aq = 0, aQ = aj(), M = aa(), R(), !a || W === av.fingers || av.fingers === i || aX() ? (ai(0, bb), T = at(), 2 == W && (ai(1, be.touches[1]), a1 = aZ = au(aQ[0].start, aQ[1].start)), (av.swipeStatus || av.pinchStatus) && (bc = O(be, Z))) : bc = !1, bc === !1 ? (Z = q, O(be, Z), bc) : (av.hold && (af = setTimeout(f.proxy(function() {
                        aR.trigger("hold", [be.target]), av.hold && (bc = av.hold.call(aR, be, be.target))
                    }, this), av.longTapThreshold)), ao(!0), null)
                }
            }

            function a3(be) {
                var bh = be.originalEvent ? be.originalEvent : be;
                if (Z !== h && Z !== q && !am()) {
                    var bd, bc = a ? bh.touches[0] : bh,
                        bf = aH(bc);
                    if (a2 = at(), a && (W = bh.touches.length), av.hold && clearTimeout(af), Z = k, 2 == W && (0 == a1 ? (ai(1, bh.touches[1]), a1 = aZ = au(aQ[0].start, aQ[1].start)) : (aH(bh.touches[1]), aZ = au(aQ[0].end, aQ[1].end), aJ = ar(aQ[0].end, aQ[1].end)), G = a7(a1, aZ), aq = Math.abs(a1 - aZ)), W === av.fingers || av.fingers === i || !a || aX()) {
                        if (aP = aL(bf.start, bf.end), al(be, aP), ag = aS(bf.start, bf.end), ab = aM(), aI(aP, ag), (av.swipeStatus || av.pinchStatus) && (bd = O(bh, Z)), !av.triggerOnTouchEnd || av.triggerOnTouchLeave) {
                            var bb = !0;
                            if (av.triggerOnTouchLeave) {
                                var bg = aY(this);
                                bb = E(bf.end, bg)
                            }!av.triggerOnTouchEnd && bb ? Z = aC(k) : av.triggerOnTouchLeave && !bb && (Z = aC(h)), Z != q && Z != h || O(bh, Z)
                        }
                    } else Z = q, O(bh, Z);
                    bd === !1 && (Z = q, O(bh, Z))
                }
            }

            function L(bb) {
                var bc = bb.originalEvent;
                return a && bc.touches.length > 0 ? (F(), !0) : (am() && (W = ad), a2 = at(), ab = aM(), ba() || !an() ? (Z = q, O(bc, Z)) : av.triggerOnTouchEnd || 0 == av.triggerOnTouchEnd && Z === k ? (bb.preventDefault(), Z = h, O(bc, Z)) : !av.triggerOnTouchEnd && a6() ? (Z = h, aF(bc, Z, A)) : Z === k && (Z = q, O(bc, Z)), ao(!1), null)
            }

            function a9() {
                W = 0, a2 = 0, T = 0, a1 = 0, aZ = 0, G = 1, R(), ao(!1)
            }

            function K(bb) {
                var bc = bb.originalEvent;
                av.triggerOnTouchLeave && (Z = aC(h), O(bc, Z))
            }

            function aK() {
                aR.unbind(J, aN), aR.unbind(aD, a9), aR.unbind(ay, a3), aR.unbind(U, L), S && aR.unbind(S, K), ao(!1)
            }

            function aC(bf) {
                var be = bf,
                    bd = aA(),
                    bc = an(),
                    bb = ba();
                return !bd || bb ? be = q : !bc || bf != k || av.triggerOnTouchEnd && !av.triggerOnTouchLeave ? !bc && bf == h && av.triggerOnTouchLeave && (be = q) : be = h, be
            }

            function O(bd, bb) {
                var bc = void 0;
                return I() || V() ? bc = aF(bd, bb, l) : (P() || aX()) && bc !== !1 && (bc = aF(bd, bb, t)), aG() && bc !== !1 ? bc = aF(bd, bb, j) : ap() && bc !== !1 ? bc = aF(bd, bb, b) : ah() && bc !== !1 && (bc = aF(bd, bb, A)), bb === q && a9(bd), bb === h && (a ? 0 == bd.touches.length && a9(bd) : a9(bd)), bc
            }

            function aF(be, bb, bd) {
                var bc = void 0;
                if (bd == l) {
                    if (aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]), av.swipeStatus && (bc = av.swipeStatus.call(aR, be, bb, aP || null, ag || 0, ab || 0, W, aQ), bc === !1)) return !1;
                    if (bb == h && aV()) {
                        if (aR.trigger("swipe", [aP, ag, ab, W, aQ]), av.swipe && (bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ), bc === !1)) return !1;
                        switch (aP) {
                            case p:
                                aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]), av.swipeLeft && (bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ));
                                break;
                            case o:
                                aR.trigger("swipeRight", [aP, ag, ab, W, aQ]), av.swipeRight && (bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ));
                                break;
                            case e:
                                aR.trigger("swipeUp", [aP, ag, ab, W, aQ]), av.swipeUp && (bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ));
                                break;
                            case x:
                                aR.trigger("swipeDown", [aP, ag, ab, W, aQ]), av.swipeDown && (bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ))
                        }
                    }
                }
                if (bd == t) {
                    if (aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]), av.pinchStatus && (bc = av.pinchStatus.call(aR, be, bb, aJ || null, aq || 0, ab || 0, W, G, aQ), bc === !1)) return !1;
                    if (bb == h && a8()) switch (aJ) {
                        case c:
                            aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]), av.pinchIn && (bc = av.pinchIn.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ));
                            break;
                        case z:
                            aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]), av.pinchOut && (bc = av.pinchOut.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ))
                    }
                }
                return bd == A ? bb !== q && bb !== h || (clearTimeout(aW), clearTimeout(af), Y() && !H() ? (N = at(), aW = setTimeout(f.proxy(function() {
                    N = null, aR.trigger("tap", [be.target]), av.tap && (bc = av.tap.call(aR, be, be.target))
                }, this), av.doubleTapThreshold)) : (N = null, aR.trigger("tap", [be.target]), av.tap && (bc = av.tap.call(aR, be, be.target)))) : bd == j ? bb !== q && bb !== h || (clearTimeout(aW), N = null, aR.trigger("doubletap", [be.target]), av.doubleTap && (bc = av.doubleTap.call(aR, be, be.target))) : bd == b && (bb !== q && bb !== h || (clearTimeout(aW), N = null, aR.trigger("longtap", [be.target]), av.longTap && (bc = av.longTap.call(aR, be, be.target)))), bc
            }

            function an() {
                var bb = !0;
                return null !== av.threshold && (bb = ag >= av.threshold), bb
            }

            function ba() {
                var bb = !1;
                return null !== av.cancelThreshold && null !== aP && (bb = aT(aP) - ag >= av.cancelThreshold), bb
            }

            function ae() {
                return null === av.pinchThreshold || aq >= av.pinchThreshold
            }

            function aA() {
                var bb;
                return bb = !av.maxTimeThreshold || !(ab >= av.maxTimeThreshold)
            }

            function al(bb, bc) {
                if (av.allowPageScroll === m || aX()) bb.preventDefault();
                else {
                    var bd = av.allowPageScroll === s;
                    switch (bc) {
                        case p:
                            (av.swipeLeft && bd || !bd && av.allowPageScroll != D) && bb.preventDefault();
                            break;
                        case o:
                            (av.swipeRight && bd || !bd && av.allowPageScroll != D) && bb.preventDefault();
                            break;
                        case e:
                            (av.swipeUp && bd || !bd && av.allowPageScroll != u) && bb.preventDefault();
                            break;
                        case x:
                            (av.swipeDown && bd || !bd && av.allowPageScroll != u) && bb.preventDefault()
                    }
                }
            }

            function a8() {
                var bc = aO(),
                    bb = X(),
                    bd = ae();
                return bc && bb && bd
            }

            function aX() {
                return !!(av.pinchStatus || av.pinchIn || av.pinchOut)
            }

            function P() {
                return !(!a8() || !aX())
            }

            function aV() {
                var be = aA(),
                    bg = an(),
                    bd = aO(),
                    bb = X(),
                    bc = ba(),
                    bf = !bc && bb && bd && bg && be;
                return bf
            }

            function V() {
                return !!(av.swipe || av.swipeStatus || av.swipeLeft || av.swipeRight || av.swipeUp || av.swipeDown)
            }

            function I() {
                return !(!aV() || !V())
            }

            function aO() {
                return W === av.fingers || av.fingers === i || !a
            }

            function X() {
                return 0 !== aQ[0].end.x
            }

            function a6() {
                return !!av.tap
            }

            function Y() {
                return !!av.doubleTap
            }

            function aU() {
                return !!av.longTap
            }

            function Q() {
                if (null == N) return !1;
                var bb = at();
                return Y() && bb - N <= av.doubleTapThreshold
            }

            function H() {
                return Q()
            }

            function ax() {
                return (1 === W || !a) && (isNaN(ag) || ag < av.threshold)
            }

            function a0() {
                return ab > av.longTapThreshold && ag < r
            }

            function ah() {
                return !(!ax() || !a6())
            }

            function aG() {
                return !(!Q() || !Y())
            }

            function ap() {
                return !(!a0() || !aU())
            }

            function F() {
                a5 = at(), ad = event.touches.length + 1
            }

            function R() {
                a5 = 0, ad = 0
            }

            function am() {
                var bb = !1;
                if (a5) {
                    var bc = at() - a5;
                    bc <= av.fingerReleaseThreshold && (bb = !0)
                }
                return bb
            }

            function aB() {
                return !(aR.data(B + "_intouch") !== !0)
            }

            function ao(bb) {
                bb === !0 ? (aR.bind(ay, a3), aR.bind(U, L), S && aR.bind(S, K)) : (aR.unbind(ay, a3, !1), aR.unbind(U, L, !1), S && aR.unbind(S, K, !1)), aR.data(B + "_intouch", bb === !0)
            }

            function ai(bc, bb) {
                var bd = void 0 !== bb.identifier ? bb.identifier : 0;
                return aQ[bc].identifier = bd, aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX, aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY, aQ[bc]
            }

            function aH(bb) {
                var bd = void 0 !== bb.identifier ? bb.identifier : 0,
                    bc = ac(bd);
                return bc.end.x = bb.pageX || bb.clientX, bc.end.y = bb.pageY || bb.clientY, bc
            }

            function ac(bc) {
                for (var bb = 0; bb < aQ.length; bb++)
                    if (aQ[bb].identifier == bc) return aQ[bb]
            }

            function aj() {
                for (var bb = [], bc = 0; bc <= 5; bc++) bb.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return bb
            }

            function aI(bb, bc) {
                bc = Math.max(bc, aT(bb)), M[bb].distance = bc
            }

            function aT(bb) {
                if (M[bb]) return M[bb].distance
            }

            function aa() {
                var bb = {};
                return bb[p] = aw(p), bb[o] = aw(o), bb[e] = aw(e), bb[x] = aw(x), bb
            }

            function aw(bb) {
                return {
                    direction: bb,
                    distance: 0
                }
            }

            function aM() {
                return a2 - T
            }

            function au(be, bd) {
                var bc = Math.abs(be.x - bd.x),
                    bb = Math.abs(be.y - bd.y);
                return Math.round(Math.sqrt(bc * bc + bb * bb))
            }

            function a7(bb, bc) {
                var bd = bc / bb * 1;
                return bd.toFixed(2)
            }

            function ar() {
                return G < 1 ? z : c
            }

            function aS(bc, bb) {
                return Math.round(Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2)))
            }

            function aE(be, bc) {
                var bb = be.x - bc.x,
                    bg = bc.y - be.y,
                    bd = Math.atan2(bg, bb),
                    bf = Math.round(180 * bd / Math.PI);
                return bf < 0 && (bf = 360 - Math.abs(bf)), bf
            }

            function aL(bc, bb) {
                var bd = aE(bc, bb);
                return bd <= 45 && bd >= 0 ? p : bd <= 360 && bd >= 315 ? p : bd >= 135 && bd <= 225 ? o : bd > 45 && bd < 135 ? x : e
            }

            function at() {
                var bb = new Date;
                return bb.getTime()
            }

            function aY(bb) {
                bb = f(bb);
                var bd = bb.offset(),
                    bc = {
                        left: bd.left,
                        right: bd.left + bb.outerWidth(),
                        top: bd.top,
                        bottom: bd.top + bb.outerHeight()
                    };
                return bc
            }

            function E(bb, bc) {
                return bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom
            }
            var az = a || d || !av.fallbackToMouseEvents,
                J = az ? d ? v ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
                ay = az ? d ? v ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
                U = az ? d ? v ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
                S = az ? null : "mouseleave",
                aD = d ? v ? "MSPointerCancel" : "pointercancel" : "touchcancel",
                ag = 0,
                aP = null,
                ab = 0,
                a1 = 0,
                aZ = 0,
                G = 1,
                aq = 0,
                aJ = 0,
                M = null,
                aR = f(a4),
                Z = "start",
                W = 0,
                aQ = null,
                T = 0,
                a2 = 0,
                a5 = 0,
                ad = 0,
                N = 0,
                aW = null,
                af = null;
            try {
                aR.bind(J, aN), aR.bind(aD, a9)
            } catch (ak) {
                f.error("events not supported " + J + "," + aD + " on jQuery.swipe")
            }
            this.enable = function() {
                return aR.bind(J, aN), aR.bind(aD, a9), aR
            }, this.disable = function() {
                return aK(), aR
            }, this.destroy = function() {
                return aK(), aR.data(B, null), aR
            }, this.option = function(bc, bb) {
                if (void 0 !== av[bc]) {
                    if (void 0 === bb) return av[bc];
                    av[bc] = bb
                } else f.error("Option " + bc + " does not exist on jQuery.swipe.options");
                return null
            }
        }
        var p = "left",
            o = "right",
            e = "up",
            x = "down",
            c = "in",
            z = "out",
            m = "none",
            s = "auto",
            l = "swipe",
            t = "pinch",
            A = "tap",
            j = "doubletap",
            b = "longtap",
            D = "horizontal",
            u = "vertical",
            i = "all",
            r = 10,
            g = "start",
            k = "move",
            h = "end",
            q = "cancel",
            a = "ontouchstart" in window,
            v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
            d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            B = "TouchSwipe",
            n = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe"
            };
        f.fn.swipe = function(G) {
            var F = f(this),
                E = F.data(B);
            if (E && "string" == typeof G) {
                if (E[G]) return E[G].apply(this, Array.prototype.slice.call(arguments, 1));
                f.error("Method " + G + " does not exist on jQuery.swipe")
            } else if (!(E || "object" != typeof G && G)) return w.apply(this, arguments);
            return F
        }, f.fn.swipe.defaults = n, f.fn.swipe.phases = {
            PHASE_START: g,
            PHASE_MOVE: k,
            PHASE_END: h,
            PHASE_CANCEL: q
        }, f.fn.swipe.directions = {
            LEFT: p,
            RIGHT: o,
            UP: e,
            DOWN: x,
            IN: c,
            OUT: z
        }, f.fn.swipe.pageScroll = {
            NONE: m,
            HORIZONTAL: D,
            VERTICAL: u,
            AUTO: s
        }, f.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: i
        }
    }),
    function($, sb) {
        "use strict";

        function init() {
            carousel = $(".coffeeFinder form.coffeeFinder__selection").addClass("jcarousel-vertical"), $answers = carousel.find(".options").fadeIn(), $answers.find("input").prop("checked", !1), title = $("title").html(), carousel.find(".questions").fadeIn(), carousel.on("jcarousel:create jcarousel:reload", function() {
                var slideHeight = $(this).innerHeight() + "px";
                $(this).jcarousel("items").css("height", slideHeight), carousel.css("height", slideHeight), $answers.eq(0).addClass("animateIn"), numberOfSlides = carousel.jcarousel("items").size() - 1
            }).on("jcarousel:targetin", "li", function() {
                $(this).find("img").attr("tabindex", 0), $(this).find("span.sb_tooltip").attr("tabindex", 0)
            }).jcarousel({
                vertical: !0,
                animation: 1100
            }), carousel.on("jcarousel:animate", function() {
                currentSlide = carousel.jcarousel("items").index(carousel.jcarousel("last")) - 1, $answers.eq(currentSlide + 1).addClass("animateIn")
            }), $answers.find("label").bind("click keypress", function(event) {
                if (console.log("I have been clicked: " + carousel.jcarousel("items").index(carousel.jcarousel("last"))), "click" == event.type || 13 == event.which)
                    if (event.preventDefault(), $(".pageTitleBlock").fadeOut().addClass("animateIn"), $(this).find("input").prop("checked", !0), currentSlide = carousel.jcarousel("items").index(carousel.jcarousel("last")), currentSlide == numberOfSlides) carousel.closest("form").submit();
                    else if (carousel.jcarousel("scroll", "+=1"), $(this).parent().children().find("img").attr("tabindex", -1), supportsHistory) {
                    var path = location.pathname;
                    path = path.replace(new RegExp("^\\/" + path.split("/")[1] + "\\/", "i"), ""), history.pushState({}, title, path + "#" + (currentSlide + 2))
                }
            }), Modernizr.touch && carousel.not(".answers label").not("li:first-child").swipe({
                swipeDown: function() {
                    goToPrevious()
                }
            }), supportsHistory && (null !== history.state && "undefined" != typeof history.state || history.replaceState({}, ""), window.addEventListener("popstate", function() {
                history.replaceState({}, title), goToPrevious()
            }))
        }

        function goToPrevious() {
            currentSlide > -1 && ($answers.eq(currentSlide + 1).removeClass("animateIn"), carousel.jcarousel("scroll", "-=1"))
        }
        sb.CoffeeFinder = {
            init: init
        };
        var carousel, currentSlide, numberOfSlides, $answers, title, supportsHistory = window.history && window.history.pushState
    }(jQuery, sb), $(document).ready(function() {
        sb.CoffeeFinder.init()
    }),
    function() {
        function createReduce(dir) {
            function iterator(obj, iteratee, memo, keys, index, length) {
                for (; index >= 0 && index < length; index += dir) {
                    var currentKey = keys ? keys[index] : index;
                    memo = iteratee(memo, obj[currentKey], currentKey, obj)
                }
                return memo
            }
            return function(obj, iteratee, memo, context) {
                iteratee = optimizeCb(iteratee, context, 4);
                var keys = !isArrayLike(obj) && _.keys(obj),
                    length = (keys || obj).length,
                    index = dir > 0 ? 0 : length - 1;
                return arguments.length < 3 && (memo = obj[keys ? keys[index] : index], index += dir), iterator(obj, iteratee, memo, keys, index, length)
            }
        }

        function createPredicateIndexFinder(dir) {
            return function(array, predicate, context) {
                predicate = cb(predicate, context);
                for (var length = getLength(array), index = dir > 0 ? 0 : length - 1; index >= 0 && index < length; index += dir)
                    if (predicate(array[index], index, array)) return index;
                return -1
            }
        }

        function createIndexFinder(dir, predicateFind, sortedIndex) {
            return function(array, item, idx) {
                var i = 0,
                    length = getLength(array);
                if ("number" == typeof idx) dir > 0 ? i = idx >= 0 ? idx : Math.max(idx + length, i) : length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                else if (sortedIndex && idx && length) return idx = sortedIndex(array, item), array[idx] === item ? idx : -1;
                if (item !== item) return idx = predicateFind(slice.call(array, i, length), _.isNaN), idx >= 0 ? idx + i : -1;
                for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir)
                    if (array[idx] === item) return idx;
                return -1
            }
        }

        function collectNonEnumProps(obj, keys) {
            var nonEnumIdx = nonEnumerableProps.length,
                constructor = obj.constructor,
                proto = _.isFunction(constructor) && constructor.prototype || ObjProto,
                prop = "constructor";
            for (_.has(obj, prop) && !_.contains(keys, prop) && keys.push(prop); nonEnumIdx--;) prop = nonEnumerableProps[nonEnumIdx], prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop) && keys.push(prop)
        }
        var root = this,
            previousUnderscore = root._,
            ArrayProto = Array.prototype,
            ObjProto = Object.prototype,
            FuncProto = Function.prototype,
            push = ArrayProto.push,
            slice = ArrayProto.slice,
            toString = ObjProto.toString,
            hasOwnProperty = ObjProto.hasOwnProperty,
            nativeIsArray = Array.isArray,
            nativeKeys = Object.keys,
            nativeBind = FuncProto.bind,
            nativeCreate = Object.create,
            Ctor = function() {},
            _ = function(obj) {
                return obj instanceof _ ? obj : this instanceof _ ? void(this._wrapped = obj) : new _(obj)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), exports._ = _) : root._ = _, _.VERSION = "1.8.3";
        var optimizeCb = function(func, context, argCount) {
                if (void 0 === context) return func;
                switch (null == argCount ? 3 : argCount) {
                    case 1:
                        return function(value) {
                            return func.call(context, value)
                        };
                    case 2:
                        return function(value, other) {
                            return func.call(context, value, other)
                        };
                    case 3:
                        return function(value, index, collection) {
                            return func.call(context, value, index, collection)
                        };
                    case 4:
                        return function(accumulator, value, index, collection) {
                            return func.call(context, accumulator, value, index, collection)
                        }
                }
                return function() {
                    return func.apply(context, arguments)
                }
            },
            cb = function(value, context, argCount) {
                return null == value ? _.identity : _.isFunction(value) ? optimizeCb(value, context, argCount) : _.isObject(value) ? _.matcher(value) : _.property(value)
            };
        _.iteratee = function(value, context) {
            return cb(value, context, 1 / 0)
        };
        var createAssigner = function(keysFunc, undefinedOnly) {
                return function(obj) {
                    var length = arguments.length;
                    if (length < 2 || null == obj) return obj;
                    for (var index = 1; index < length; index++)
                        for (var source = arguments[index], keys = keysFunc(source), l = keys.length, i = 0; i < l; i++) {
                            var key = keys[i];
                            undefinedOnly && void 0 !== obj[key] || (obj[key] = source[key])
                        }
                    return obj
                }
            },
            baseCreate = function(prototype) {
                if (!_.isObject(prototype)) return {};
                if (nativeCreate) return nativeCreate(prototype);
                Ctor.prototype = prototype;
                var result = new Ctor;
                return Ctor.prototype = null, result
            },
            property = function(key) {
                return function(obj) {
                    return null == obj ? void 0 : obj[key]
                }
            },
            MAX_ARRAY_INDEX = Math.pow(2, 53) - 1,
            getLength = property("length"),
            isArrayLike = function(collection) {
                var length = getLength(collection);
                return "number" == typeof length && length >= 0 && length <= MAX_ARRAY_INDEX
            };
        _.each = _.forEach = function(obj, iteratee, context) {
            iteratee = optimizeCb(iteratee, context);
            var i, length;
            if (isArrayLike(obj))
                for (i = 0, length = obj.length; i < length; i++) iteratee(obj[i], i, obj);
            else {
                var keys = _.keys(obj);
                for (i = 0, length = keys.length; i < length; i++) iteratee(obj[keys[i]], keys[i], obj)
            }
            return obj
        }, _.map = _.collect = function(obj, iteratee, context) {
            iteratee = cb(iteratee, context);
            for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length), index = 0; index < length; index++) {
                var currentKey = keys ? keys[index] : index;
                results[index] = iteratee(obj[currentKey], currentKey, obj)
            }
            return results
        }, _.reduce = _.foldl = _.inject = createReduce(1), _.reduceRight = _.foldr = createReduce(-1), _.find = _.detect = function(obj, predicate, context) {
            var key;
            if (key = isArrayLike(obj) ? _.findIndex(obj, predicate, context) : _.findKey(obj, predicate, context), void 0 !== key && key !== -1) return obj[key]
        }, _.filter = _.select = function(obj, predicate, context) {
            var results = [];
            return predicate = cb(predicate, context), _.each(obj, function(value, index, list) {
                predicate(value, index, list) && results.push(value)
            }), results
        }, _.reject = function(obj, predicate, context) {
            return _.filter(obj, _.negate(cb(predicate)), context)
        }, _.every = _.all = function(obj, predicate, context) {
            predicate = cb(predicate, context);
            for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = 0; index < length; index++) {
                var currentKey = keys ? keys[index] : index;
                if (!predicate(obj[currentKey], currentKey, obj)) return !1
            }
            return !0
        }, _.some = _.any = function(obj, predicate, context) {
            predicate = cb(predicate, context);
            for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = 0; index < length; index++) {
                var currentKey = keys ? keys[index] : index;
                if (predicate(obj[currentKey], currentKey, obj)) return !0
            }
            return !1
        }, _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
            return isArrayLike(obj) || (obj = _.values(obj)), ("number" != typeof fromIndex || guard) && (fromIndex = 0), _.indexOf(obj, item, fromIndex) >= 0
        }, _.invoke = function(obj, method) {
            var args = slice.call(arguments, 2),
                isFunc = _.isFunction(method);
            return _.map(obj, function(value) {
                var func = isFunc ? method : value[method];
                return null == func ? func : func.apply(value, args)
            })
        }, _.pluck = function(obj, key) {
            return _.map(obj, _.property(key))
        }, _.where = function(obj, attrs) {
            return _.filter(obj, _.matcher(attrs))
        }, _.findWhere = function(obj, attrs) {
            return _.find(obj, _.matcher(attrs))
        }, _.max = function(obj, iteratee, context) {
            var value, computed, result = -(1 / 0),
                lastComputed = -(1 / 0);
            if (null == iteratee && null != obj) {
                obj = isArrayLike(obj) ? obj : _.values(obj);
                for (var i = 0, length = obj.length; i < length; i++) value = obj[i], value > result && (result = value)
            } else iteratee = cb(iteratee, context), _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list), (computed > lastComputed || computed === -(1 / 0) && result === -(1 / 0)) && (result = value, lastComputed = computed)
            });
            return result
        }, _.min = function(obj, iteratee, context) {
            var value, computed, result = 1 / 0,
                lastComputed = 1 / 0;
            if (null == iteratee && null != obj) {
                obj = isArrayLike(obj) ? obj : _.values(obj);
                for (var i = 0, length = obj.length; i < length; i++) value = obj[i], value < result && (result = value)
            } else iteratee = cb(iteratee, context), _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list), (computed < lastComputed || computed === 1 / 0 && result === 1 / 0) && (result = value, lastComputed = computed)
            });
            return result
        }, _.shuffle = function(obj) {
            for (var rand, set = isArrayLike(obj) ? obj : _.values(obj), length = set.length, shuffled = Array(length), index = 0; index < length; index++) rand = _.random(0, index), rand !== index && (shuffled[index] = shuffled[rand]), shuffled[rand] = set[index];
            return shuffled
        }, _.sample = function(obj, n, guard) {
            return null == n || guard ? (isArrayLike(obj) || (obj = _.values(obj)), obj[_.random(obj.length - 1)]) : _.shuffle(obj).slice(0, Math.max(0, n))
        }, _.sortBy = function(obj, iteratee, context) {
            return iteratee = cb(iteratee, context), _.pluck(_.map(obj, function(value, index, list) {
                return {
                    value: value,
                    index: index,
                    criteria: iteratee(value, index, list)
                }
            }).sort(function(left, right) {
                var a = left.criteria,
                    b = right.criteria;
                if (a !== b) {
                    if (a > b || void 0 === a) return 1;
                    if (a < b || void 0 === b) return -1
                }
                return left.index - right.index
            }), "value")
        };
        var group = function(behavior) {
            return function(obj, iteratee, context) {
                var result = {};
                return iteratee = cb(iteratee, context), _.each(obj, function(value, index) {
                    var key = iteratee(value, index, obj);
                    behavior(result, value, key)
                }), result
            }
        };
        _.groupBy = group(function(result, value, key) {
            _.has(result, key) ? result[key].push(value) : result[key] = [value]
        }), _.indexBy = group(function(result, value, key) {
            result[key] = value
        }), _.countBy = group(function(result, value, key) {
            _.has(result, key) ? result[key]++ : result[key] = 1
        }), _.toArray = function(obj) {
            return obj ? _.isArray(obj) ? slice.call(obj) : isArrayLike(obj) ? _.map(obj, _.identity) : _.values(obj) : []
        }, _.size = function(obj) {
            return null == obj ? 0 : isArrayLike(obj) ? obj.length : _.keys(obj).length
        }, _.partition = function(obj, predicate, context) {
            predicate = cb(predicate, context);
            var pass = [],
                fail = [];
            return _.each(obj, function(value, key, obj) {
                (predicate(value, key, obj) ? pass : fail).push(value)
            }), [pass, fail]
        }, _.first = _.head = _.take = function(array, n, guard) {
            if (null != array) return null == n || guard ? array[0] : _.initial(array, array.length - n)
        }, _.initial = function(array, n, guard) {
            return slice.call(array, 0, Math.max(0, array.length - (null == n || guard ? 1 : n)))
        }, _.last = function(array, n, guard) {
            if (null != array) return null == n || guard ? array[array.length - 1] : _.rest(array, Math.max(0, array.length - n))
        }, _.rest = _.tail = _.drop = function(array, n, guard) {
            return slice.call(array, null == n || guard ? 1 : n)
        }, _.compact = function(array) {
            return _.filter(array, _.identity)
        };
        var flatten = function(input, shallow, strict, startIndex) {
            for (var output = [], idx = 0, i = startIndex || 0, length = getLength(input); i < length; i++) {
                var value = input[i];
                if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                    shallow || (value = flatten(value, shallow, strict));
                    var j = 0,
                        len = value.length;
                    for (output.length += len; j < len;) output[idx++] = value[j++]
                } else strict || (output[idx++] = value)
            }
            return output
        };
        _.flatten = function(array, shallow) {
            return flatten(array, shallow, !1)
        }, _.without = function(array) {
            return _.difference(array, slice.call(arguments, 1))
        }, _.uniq = _.unique = function(array, isSorted, iteratee, context) {
            _.isBoolean(isSorted) || (context = iteratee, iteratee = isSorted, isSorted = !1), null != iteratee && (iteratee = cb(iteratee, context));
            for (var result = [], seen = [], i = 0, length = getLength(array); i < length; i++) {
                var value = array[i],
                    computed = iteratee ? iteratee(value, i, array) : value;
                isSorted ? (i && seen === computed || result.push(value), seen = computed) : iteratee ? _.contains(seen, computed) || (seen.push(computed), result.push(value)) : _.contains(result, value) || result.push(value)
            }
            return result
        }, _.union = function() {
            return _.uniq(flatten(arguments, !0, !0))
        }, _.intersection = function(array) {
            for (var result = [], argsLength = arguments.length, i = 0, length = getLength(array); i < length; i++) {
                var item = array[i];
                if (!_.contains(result, item)) {
                    for (var j = 1; j < argsLength && _.contains(arguments[j], item); j++);
                    j === argsLength && result.push(item)
                }
            }
            return result
        }, _.difference = function(array) {
            var rest = flatten(arguments, !0, !0, 1);
            return _.filter(array, function(value) {
                return !_.contains(rest, value)
            })
        }, _.zip = function() {
            return _.unzip(arguments)
        }, _.unzip = function(array) {
            for (var length = array && _.max(array, getLength).length || 0, result = Array(length), index = 0; index < length; index++) result[index] = _.pluck(array, index);
            return result
        }, _.object = function(list, values) {
            for (var result = {}, i = 0, length = getLength(list); i < length; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
            return result
        }, _.findIndex = createPredicateIndexFinder(1), _.findLastIndex = createPredicateIndexFinder(-1), _.sortedIndex = function(array, obj, iteratee, context) {
            iteratee = cb(iteratee, context, 1);
            for (var value = iteratee(obj), low = 0, high = getLength(array); low < high;) {
                var mid = Math.floor((low + high) / 2);
                iteratee(array[mid]) < value ? low = mid + 1 : high = mid
            }
            return low
        }, _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex), _.lastIndexOf = createIndexFinder(-1, _.findLastIndex), _.range = function(start, stop, step) {
            null == stop && (stop = start || 0, start = 0), step = step || 1;
            for (var length = Math.max(Math.ceil((stop - start) / step), 0), range = Array(length), idx = 0; idx < length; idx++, start += step) range[idx] = start;
            return range
        };
        var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
            if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
            var self = baseCreate(sourceFunc.prototype),
                result = sourceFunc.apply(self, args);
            return _.isObject(result) ? result : self
        };
        _.bind = function(func, context) {
            if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
            if (!_.isFunction(func)) throw new TypeError("Bind must be called on a function");
            var args = slice.call(arguments, 2),
                bound = function() {
                    return executeBound(func, bound, context, this, args.concat(slice.call(arguments)))
                };
            return bound
        }, _.partial = function(func) {
            var boundArgs = slice.call(arguments, 1),
                bound = function() {
                    for (var position = 0, length = boundArgs.length, args = Array(length), i = 0; i < length; i++) args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
                    for (; position < arguments.length;) args.push(arguments[position++]);
                    return executeBound(func, bound, this, this, args)
                };
            return bound
        }, _.bindAll = function(obj) {
            var i, key, length = arguments.length;
            if (length <= 1) throw new Error("bindAll must be passed function names");
            for (i = 1; i < length; i++) key = arguments[i], obj[key] = _.bind(obj[key], obj);
            return obj
        }, _.memoize = function(func, hasher) {
            var memoize = function(key) {
                var cache = memoize.cache,
                    address = "" + (hasher ? hasher.apply(this, arguments) : key);
                return _.has(cache, address) || (cache[address] = func.apply(this, arguments)), cache[address]
            };
            return memoize.cache = {}, memoize
        }, _.delay = function(func, wait) {
            var args = slice.call(arguments, 2);
            return setTimeout(function() {
                return func.apply(null, args)
            }, wait)
        }, _.defer = _.partial(_.delay, _, 1), _.throttle = function(func, wait, options) {
            var context, args, result, timeout = null,
                previous = 0;
            options || (options = {});
            var later = function() {
                previous = options.leading === !1 ? 0 : _.now(), timeout = null, result = func.apply(context, args), timeout || (context = args = null)
            };
            return function() {
                var now = _.now();
                previous || options.leading !== !1 || (previous = now);
                var remaining = wait - (now - previous);
                return context = this, args = arguments, remaining <= 0 || remaining > wait ? (timeout && (clearTimeout(timeout), timeout = null), previous = now, result = func.apply(context, args), timeout || (context = args = null)) : timeout || options.trailing === !1 || (timeout = setTimeout(later, remaining)), result
            }
        }, _.debounce = function(func, wait, immediate) {
            var timeout, args, context, timestamp, result, later = function() {
                var last = _.now() - timestamp;
                last < wait && last >= 0 ? timeout = setTimeout(later, wait - last) : (timeout = null, immediate || (result = func.apply(context, args), timeout || (context = args = null)))
            };
            return function() {
                context = this, args = arguments, timestamp = _.now();
                var callNow = immediate && !timeout;
                return timeout || (timeout = setTimeout(later, wait)), callNow && (result = func.apply(context, args), context = args = null), result
            }
        }, _.wrap = function(func, wrapper) {
            return _.partial(wrapper, func)
        }, _.negate = function(predicate) {
            return function() {
                return !predicate.apply(this, arguments)
            }
        }, _.compose = function() {
            var args = arguments,
                start = args.length - 1;
            return function() {
                for (var i = start, result = args[start].apply(this, arguments); i--;) result = args[i].call(this, result);
                return result
            }
        }, _.after = function(times, func) {
            return function() {
                if (--times < 1) return func.apply(this, arguments)
            }
        }, _.before = function(times, func) {
            var memo;
            return function() {
                return --times > 0 && (memo = func.apply(this, arguments)), times <= 1 && (func = null), memo
            }
        }, _.once = _.partial(_.before, 2);
        var hasEnumBug = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            nonEnumerableProps = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        _.keys = function(obj) {
            if (!_.isObject(obj)) return [];
            if (nativeKeys) return nativeKeys(obj);
            var keys = [];
            for (var key in obj) _.has(obj, key) && keys.push(key);
            return hasEnumBug && collectNonEnumProps(obj, keys), keys
        }, _.allKeys = function(obj) {
            if (!_.isObject(obj)) return [];
            var keys = [];
            for (var key in obj) keys.push(key);
            return hasEnumBug && collectNonEnumProps(obj, keys), keys
        }, _.values = function(obj) {
            for (var keys = _.keys(obj), length = keys.length, values = Array(length), i = 0; i < length; i++) values[i] = obj[keys[i]];
            return values
        }, _.mapObject = function(obj, iteratee, context) {
            iteratee = cb(iteratee, context);
            for (var currentKey, keys = _.keys(obj), length = keys.length, results = {}, index = 0; index < length; index++) currentKey = keys[index], results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
            return results
        }, _.pairs = function(obj) {
            for (var keys = _.keys(obj), length = keys.length, pairs = Array(length), i = 0; i < length; i++) pairs[i] = [keys[i], obj[keys[i]]];
            return pairs
        }, _.invert = function(obj) {
            for (var result = {}, keys = _.keys(obj), i = 0, length = keys.length; i < length; i++) result[obj[keys[i]]] = keys[i];
            return result
        }, _.functions = _.methods = function(obj) {
            var names = [];
            for (var key in obj) _.isFunction(obj[key]) && names.push(key);
            return names.sort()
        }, _.extend = createAssigner(_.allKeys), _.extendOwn = _.assign = createAssigner(_.keys), _.findKey = function(obj, predicate, context) {
            predicate = cb(predicate, context);
            for (var key, keys = _.keys(obj), i = 0, length = keys.length; i < length; i++)
                if (key = keys[i], predicate(obj[key], key, obj)) return key
        }, _.pick = function(object, oiteratee, context) {
            var iteratee, keys, result = {},
                obj = object;
            if (null == obj) return result;
            _.isFunction(oiteratee) ? (keys = _.allKeys(obj), iteratee = optimizeCb(oiteratee, context)) : (keys = flatten(arguments, !1, !1, 1), iteratee = function(value, key, obj) {
                return key in obj
            }, obj = Object(obj));
            for (var i = 0, length = keys.length; i < length; i++) {
                var key = keys[i],
                    value = obj[key];
                iteratee(value, key, obj) && (result[key] = value)
            }
            return result
        }, _.omit = function(obj, iteratee, context) {
            if (_.isFunction(iteratee)) iteratee = _.negate(iteratee);
            else {
                var keys = _.map(flatten(arguments, !1, !1, 1), String);
                iteratee = function(value, key) {
                    return !_.contains(keys, key)
                }
            }
            return _.pick(obj, iteratee, context)
        }, _.defaults = createAssigner(_.allKeys, !0), _.create = function(prototype, props) {
            var result = baseCreate(prototype);
            return props && _.extendOwn(result, props), result
        }, _.clone = function(obj) {
            return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj
        }, _.tap = function(obj, interceptor) {
            return interceptor(obj), obj
        }, _.isMatch = function(object, attrs) {
            var keys = _.keys(attrs),
                length = keys.length;
            if (null == object) return !length;
            for (var obj = Object(object), i = 0; i < length; i++) {
                var key = keys[i];
                if (attrs[key] !== obj[key] || !(key in obj)) return !1
            }
            return !0
        };
        var eq = function(a, b, aStack, bStack) {
            if (a === b) return 0 !== a || 1 / a === 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
            var className = toString.call(a);
            if (className !== toString.call(b)) return !1;
            switch (className) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + a == "" + b;
                case "[object Number]":
                    return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a === +b
            }
            var areArrays = "[object Array]" === className;
            if (!areArrays) {
                if ("object" != typeof a || "object" != typeof b) return !1;
                var aCtor = a.constructor,
                    bCtor = b.constructor;
                if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) return !1
            }
            aStack = aStack || [], bStack = bStack || [];
            for (var length = aStack.length; length--;)
                if (aStack[length] === a) return bStack[length] === b;
            if (aStack.push(a), bStack.push(b), areArrays) {
                if (length = a.length, length !== b.length) return !1;
                for (; length--;)
                    if (!eq(a[length], b[length], aStack, bStack)) return !1
            } else {
                var key, keys = _.keys(a);
                if (length = keys.length, _.keys(b).length !== length) return !1;
                for (; length--;)
                    if (key = keys[length], !_.has(b, key) || !eq(a[key], b[key], aStack, bStack)) return !1
            }
            return aStack.pop(), bStack.pop(), !0
        };
        _.isEqual = function(a, b) {
            return eq(a, b)
        }, _.isEmpty = function(obj) {
            return null == obj || (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) ? 0 === obj.length : 0 === _.keys(obj).length)
        }, _.isElement = function(obj) {
            return !(!obj || 1 !== obj.nodeType)
        }, _.isArray = nativeIsArray || function(obj) {
            return "[object Array]" === toString.call(obj)
        }, _.isObject = function(obj) {
            var type = typeof obj;
            return "function" === type || "object" === type && !!obj
        }, _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(name) {
            _["is" + name] = function(obj) {
                return toString.call(obj) === "[object " + name + "]"
            }
        }), _.isArguments(arguments) || (_.isArguments = function(obj) {
            return _.has(obj, "callee")
        }), "function" != typeof /./ && "object" != typeof Int8Array && (_.isFunction = function(obj) {
            return "function" == typeof obj || !1
        }), _.isFinite = function(obj) {
            return isFinite(obj) && !isNaN(parseFloat(obj))
        }, _.isNaN = function(obj) {
            return _.isNumber(obj) && obj !== +obj
        }, _.isBoolean = function(obj) {
            return obj === !0 || obj === !1 || "[object Boolean]" === toString.call(obj)
        }, _.isNull = function(obj) {
            return null === obj
        }, _.isUndefined = function(obj) {
            return void 0 === obj
        }, _.has = function(obj, key) {
            return null != obj && hasOwnProperty.call(obj, key)
        }, _.noConflict = function() {
            return root._ = previousUnderscore, this
        }, _.identity = function(value) {
            return value
        }, _.constant = function(value) {
            return function() {
                return value
            }
        }, _.noop = function() {}, _.property = property, _.propertyOf = function(obj) {
            return null == obj ? function() {} : function(key) {
                return obj[key]
            }
        }, _.matcher = _.matches = function(attrs) {
            return attrs = _.extendOwn({}, attrs),
                function(obj) {
                    return _.isMatch(obj, attrs)
                }
        }, _.times = function(n, iteratee, context) {
            var accum = Array(Math.max(0, n));
            iteratee = optimizeCb(iteratee, context, 1);
            for (var i = 0; i < n; i++) accum[i] = iteratee(i);
            return accum
        }, _.random = function(min, max) {
            return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1))
        }, _.now = Date.now || function() {
            return (new Date).getTime()
        };
        var escapeMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            unescapeMap = _.invert(escapeMap),
            createEscaper = function(map) {
                var escaper = function(match) {
                        return map[match]
                    },
                    source = "(?:" + _.keys(map).join("|") + ")",
                    testRegexp = RegExp(source),
                    replaceRegexp = RegExp(source, "g");
                return function(string) {
                    return string = null == string ? "" : "" + string, testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
                }
            };
        _.escape = createEscaper(escapeMap), _.unescape = createEscaper(unescapeMap), _.result = function(object, property, fallback) {
            var value = null == object ? void 0 : object[property];
            return void 0 === value && (value = fallback), _.isFunction(value) ? value.call(object) : value
        };
        var idCounter = 0;
        _.uniqueId = function(prefix) {
            var id = ++idCounter + "";
            return prefix ? prefix + id : id
        }, _.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/,
            escapes = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            escaper = /\\|'|\r|\n|\u2028|\u2029/g,
            escapeChar = function(match) {
                return "\\" + escapes[match]
            };
        _.template = function(text, settings, oldSettings) {
            !settings && oldSettings && (settings = oldSettings), settings = _.defaults({}, settings, _.templateSettings);
            var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"),
                index = 0,
                source = "__p+='";
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                return source += text.slice(index, offset).replace(escaper, escapeChar), index = offset + match.length, escape ? source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" : interpolate ? source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" : evaluate && (source += "';\n" + evaluate + "\n__p+='"), match
            }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
            try {
                var render = new Function(settings.variable || "obj", "_", source)
            } catch (e) {
                throw e.source = source, e
            }
            var template = function(data) {
                    return render.call(this, data, _)
                },
                argument = settings.variable || "obj";
            return template.source = "function(" + argument + "){\n" + source + "}", template
        }, _.chain = function(obj) {
            var instance = _(obj);
            return instance._chain = !0, instance
        };
        var result = function(instance, obj) {
            return instance._chain ? _(obj).chain() : obj
        };
        _.mixin = function(obj) {
            _.each(_.functions(obj), function(name) {
                var func = _[name] = obj[name];
                _.prototype[name] = function() {
                    var args = [this._wrapped];
                    return push.apply(args, arguments), result(this, func.apply(_, args))
                }
            })
        }, _.mixin(_), _.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
            var method = ArrayProto[name];
            _.prototype[name] = function() {
                var obj = this._wrapped;
                return method.apply(obj, arguments), "shift" !== name && "splice" !== name || 0 !== obj.length || delete obj[0], result(this, obj)
            }
        }), _.each(["concat", "join", "slice"], function(name) {
            var method = ArrayProto[name];
            _.prototype[name] = function() {
                return result(this, method.apply(this._wrapped, arguments))
            }
        }), _.prototype.value = function() {
            return this._wrapped
        }, _.prototype.valueOf = _.prototype.toJSON = _.prototype.value, _.prototype.toString = function() {
            return "" + this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return _
        })
    }.call(this),
    function(root, factory) {
        if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function(_, $, exports) {
            root.Backbone = factory(root, exports, _, $)
        });
        else if ("undefined" != typeof exports) {
            var _ = require("underscore");
            factory(root, exports, _)
        } else root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$)
    }(this, function(root, Backbone, _, $) {
        var previousBackbone = root.Backbone,
            array = [],
            slice = (array.push, array.slice);
        array.splice;
        Backbone.VERSION = "1.1.2", Backbone.$ = $, Backbone.noConflict = function() {
            return root.Backbone = previousBackbone, this
        }, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
        var Events = Backbone.Events = {
                on: function(name, callback, context) {
                    if (!eventsApi(this, "on", name, [callback, context]) || !callback) return this;
                    this._events || (this._events = {});
                    var events = this._events[name] || (this._events[name] = []);
                    return events.push({
                        callback: callback,
                        context: context,
                        ctx: context || this
                    }), this
                },
                once: function(name, callback, context) {
                    if (!eventsApi(this, "once", name, [callback, context]) || !callback) return this;
                    var self = this,
                        once = _.once(function() {
                            self.off(name, once), callback.apply(this, arguments)
                        });
                    return once._callback = callback, this.on(name, once, context)
                },
                off: function(name, callback, context) {
                    var retain, ev, events, names, i, l, j, k;
                    if (!this._events || !eventsApi(this, "off", name, [callback, context])) return this;
                    if (!name && !callback && !context) return this._events = void 0, this;
                    for (names = name ? [name] : _.keys(this._events), i = 0, l = names.length; i < l; i++)
                        if (name = names[i], events = this._events[name]) {
                            if (this._events[name] = retain = [], callback || context)
                                for (j = 0, k = events.length; j < k; j++) ev = events[j], (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
                            retain.length || delete this._events[name]
                        }
                    return this
                },
                trigger: function(name) {
                    if (!this._events) return this;
                    var args = slice.call(arguments, 1);
                    if (!eventsApi(this, "trigger", name, args)) return this;
                    var events = this._events[name],
                        allEvents = this._events.all;
                    return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), this
                },
                stopListening: function(obj, name, callback) {
                    var listeningTo = this._listeningTo;
                    if (!listeningTo) return this;
                    var remove = !name && !callback;
                    callback || "object" != typeof name || (callback = this), obj && ((listeningTo = {})[obj._listenId] = obj);
                    for (var id in listeningTo) obj = listeningTo[id], obj.off(name, callback, this), (remove || _.isEmpty(obj._events)) && delete this._listeningTo[id];
                    return this
                }
            },
            eventSplitter = /\s+/,
            eventsApi = function(obj, action, name, rest) {
                if (!name) return !0;
                if ("object" == typeof name) {
                    for (var key in name) obj[action].apply(obj, [key, name[key]].concat(rest));
                    return !1
                }
                if (eventSplitter.test(name)) {
                    for (var names = name.split(eventSplitter), i = 0, l = names.length; i < l; i++) obj[action].apply(obj, [names[i]].concat(rest));
                    return !1
                }
                return !0
            },
            triggerEvents = function(events, args) {
                var ev, i = -1,
                    l = events.length,
                    a1 = args[0],
                    a2 = args[1],
                    a3 = args[2];
                switch (args.length) {
                    case 0:
                        for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx);
                        return;
                    case 1:
                        for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx, a1);
                        return;
                    case 2:
                        for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx, a1, a2);
                        return;
                    case 3:
                        for (; ++i < l;)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                        return;
                    default:
                        for (; ++i < l;)(ev = events[i]).callback.apply(ev.ctx, args);
                        return
                }
            },
            listenMethods = {
                listenTo: "on",
                listenToOnce: "once"
            };
        _.each(listenMethods, function(implementation, method) {
            Events[method] = function(obj, name, callback) {
                var listeningTo = this._listeningTo || (this._listeningTo = {}),
                    id = obj._listenId || (obj._listenId = _.uniqueId("l"));
                return listeningTo[id] = obj, callback || "object" != typeof name || (callback = this), obj[implementation](name, callback, this), this
            }
        }), Events.bind = Events.on, Events.unbind = Events.off, _.extend(Backbone, Events);
        var Model = Backbone.Model = function(attributes, options) {
            var attrs = attributes || {};
            options || (options = {}), this.cid = _.uniqueId("c"), this.attributes = {}, options.collection && (this.collection = options.collection), options.parse && (attrs = this.parse(attrs, options) || {}), attrs = _.defaults({}, attrs, _.result(this, "defaults")), this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments)
        };
        _.extend(Model.prototype, Events, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function(options) {
                return _.clone(this.attributes)
            },
            sync: function() {
                return Backbone.sync.apply(this, arguments)
            },
            get: function(attr) {
                return this.attributes[attr]
            },
            escape: function(attr) {
                return _.escape(this.get(attr))
            },
            has: function(attr) {
                return null != this.get(attr)
            },
            set: function(key, val, options) {
                var attr, attrs, unset, changes, silent, changing, prev, current;
                if (null == key) return this;
                if ("object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, options || (options = {}), !this._validate(attrs, options)) return !1;
                unset = options.unset, silent = options.silent, changes = [], changing = this._changing, this._changing = !0, changing || (this._previousAttributes = _.clone(this.attributes), this.changed = {}), current = this.attributes, prev = this._previousAttributes, this.idAttribute in attrs && (this.id = attrs[this.idAttribute]);
                for (attr in attrs) val = attrs[attr], _.isEqual(current[attr], val) || changes.push(attr), _.isEqual(prev[attr], val) ? delete this.changed[attr] : this.changed[attr] = val, unset ? delete current[attr] : current[attr] = val;
                if (!silent) {
                    changes.length && (this._pending = options);
                    for (var i = 0, l = changes.length; i < l; i++) this.trigger("change:" + changes[i], this, current[changes[i]], options)
                }
                if (changing) return this;
                if (!silent)
                    for (; this._pending;) options = this._pending, this._pending = !1, this.trigger("change", this, options);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(attr, options) {
                return this.set(attr, void 0, _.extend({}, options, {
                    unset: !0
                }))
            },
            clear: function(options) {
                var attrs = {};
                for (var key in this.attributes) attrs[key] = void 0;
                return this.set(attrs, _.extend({}, options, {
                    unset: !0
                }))
            },
            hasChanged: function(attr) {
                return null == attr ? !_.isEmpty(this.changed) : _.has(this.changed, attr)
            },
            changedAttributes: function(diff) {
                if (!diff) return !!this.hasChanged() && _.clone(this.changed);
                var val, changed = !1,
                    old = this._changing ? this._previousAttributes : this.attributes;
                for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
                return changed
            },
            previous: function(attr) {
                return null != attr && this._previousAttributes ? this._previousAttributes[attr] : null
            },
            previousAttributes: function() {
                return _.clone(this._previousAttributes)
            },
            fetch: function(options) {
                options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
                var model = this,
                    success = options.success;
                return options.success = function(resp) {
                    return !!model.set(model.parse(resp, options), options) && (success && success(model, resp, options), void model.trigger("sync", model, resp, options))
                }, wrapError(this, options), this.sync("read", this, options)
            },
            save: function(key, val, options) {
                var attrs, method, xhr, attributes = this.attributes;
                if (null == key || "object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, options = _.extend({
                        validate: !0
                    }, options), attrs && !options.wait) {
                    if (!this.set(attrs, options)) return !1
                } else if (!this._validate(attrs, options)) return !1;
                attrs && options.wait && (this.attributes = _.extend({}, attributes, attrs)), void 0 === options.parse && (options.parse = !0);
                var model = this,
                    success = options.success;
                return options.success = function(resp) {
                    model.attributes = attributes;
                    var serverAttrs = model.parse(resp, options);
                    return options.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs)), !(_.isObject(serverAttrs) && !model.set(serverAttrs, options)) && (success && success(model, resp, options), void model.trigger("sync", model, resp, options))
                }, wrapError(this, options), method = this.isNew() ? "create" : options.patch ? "patch" : "update", "patch" === method && (options.attrs = attrs), xhr = this.sync(method, this, options), attrs && options.wait && (this.attributes = attributes), xhr
            },
            destroy: function(options) {
                options = options ? _.clone(options) : {};
                var model = this,
                    success = options.success,
                    destroy = function() {
                        model.trigger("destroy", model, model.collection, options)
                    };
                if (options.success = function(resp) {
                        (options.wait || model.isNew()) && destroy(), success && success(model, resp, options), model.isNew() || model.trigger("sync", model, resp, options)
                    }, this.isNew()) return options.success(), !1;
                wrapError(this, options);
                var xhr = this.sync("delete", this, options);
                return options.wait || destroy(), xhr
            },
            url: function() {
                var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
                return this.isNew() ? base : base.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
            },
            parse: function(resp, options) {
                return resp
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return !this.has(this.idAttribute)
            },
            isValid: function(options) {
                return this._validate({}, _.extend(options || {}, {
                    validate: !0
                }))
            },
            _validate: function(attrs, options) {
                if (!options.validate || !this.validate) return !0;
                attrs = _.extend({}, this.attributes, attrs);
                var error = this.validationError = this.validate(attrs, options) || null;
                return !error || (this.trigger("invalid", this, error, _.extend(options, {
                    validationError: error
                })), !1)
            }
        });
        var modelMethods = ["keys", "values", "pairs", "invert", "pick", "omit"];
        _.each(modelMethods, function(method) {
            Model.prototype[method] = function() {
                var args = slice.call(arguments);
                return args.unshift(this.attributes), _[method].apply(_, args)
            }
        });
        var Collection = Backbone.Collection = function(models, options) {
                options || (options = {}), options.model && (this.model = options.model), void 0 !== options.comparator && (this.comparator = options.comparator), this._reset(), this.initialize.apply(this, arguments), models && this.reset(models, _.extend({
                    silent: !0
                }, options))
            },
            setOptions = {
                add: !0,
                remove: !0,
                merge: !0
            },
            addOptions = {
                add: !0,
                remove: !1
            };
        _.extend(Collection.prototype, Events, {
            model: Model,
            initialize: function() {},
            toJSON: function(options) {
                return this.map(function(model) {
                    return model.toJSON(options)
                })
            },
            sync: function() {
                return Backbone.sync.apply(this, arguments)
            },
            add: function(models, options) {
                return this.set(models, _.extend({
                    merge: !1
                }, options, addOptions))
            },
            remove: function(models, options) {
                var singular = !_.isArray(models);
                models = singular ? [models] : _.clone(models), options || (options = {});
                var i, l, index, model;
                for (i = 0, l = models.length; i < l; i++) model = models[i] = this.get(models[i]), model && (delete this._byId[model.id], delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), this.length--, options.silent || (options.index = index, model.trigger("remove", model, this, options)), this._removeReference(model, options));
                return singular ? models[0] : models
            },
            set: function(models, options) {
                options = _.defaults({}, options, setOptions), options.parse && (models = this.parse(models, options));
                var singular = !_.isArray(models);
                models = singular ? models ? [models] : [] : _.clone(models);
                var i, l, id, model, attrs, existing, sort, at = options.at,
                    targetModel = this.model,
                    sortable = this.comparator && null == at && options.sort !== !1,
                    sortAttr = _.isString(this.comparator) ? this.comparator : null,
                    toAdd = [],
                    toRemove = [],
                    modelMap = {},
                    add = options.add,
                    merge = options.merge,
                    remove = options.remove,
                    order = !(sortable || !add || !remove) && [];
                for (i = 0, l = models.length; i < l; i++) {
                    if (attrs = models[i] || {}, id = attrs instanceof Model ? model = attrs : attrs[targetModel.prototype.idAttribute || "id"], existing = this.get(id)) remove && (modelMap[existing.cid] = !0), merge && (attrs = attrs === model ? model.attributes : attrs, options.parse && (attrs = existing.parse(attrs, options)), existing.set(attrs, options), sortable && !sort && existing.hasChanged(sortAttr) && (sort = !0)), models[i] = existing;
                    else if (add) {
                        if (model = models[i] = this._prepareModel(attrs, options), !model) continue;
                        toAdd.push(model), this._addReference(model, options)
                    }
                    model = existing || model, !order || !model.isNew() && modelMap[model.id] || order.push(model), modelMap[model.id] = !0
                }
                if (remove) {
                    for (i = 0, l = this.length; i < l; ++i) modelMap[(model = this.models[i]).cid] || toRemove.push(model);
                    toRemove.length && this.remove(toRemove, options)
                }
                if (toAdd.length || order && order.length)
                    if (sortable && (sort = !0), this.length += toAdd.length, null != at)
                        for (i = 0, l = toAdd.length; i < l; i++) this.models.splice(at + i, 0, toAdd[i]);
                    else {
                        order && (this.models.length = 0);
                        var orderedModels = order || toAdd;
                        for (i = 0, l = orderedModels.length; i < l; i++) this.models.push(orderedModels[i])
                    }
                if (sort && this.sort({
                        silent: !0
                    }), !options.silent) {
                    for (i = 0, l = toAdd.length; i < l; i++)(model = toAdd[i]).trigger("add", model, this, options);
                    (sort || order && order.length) && this.trigger("sort", this, options)
                }
                return singular ? models[0] : models
            },
            reset: function(models, options) {
                options || (options = {});
                for (var i = 0, l = this.models.length; i < l; i++) this._removeReference(this.models[i], options);
                return options.previousModels = this.models, this._reset(), models = this.add(models, _.extend({
                    silent: !0
                }, options)), options.silent || this.trigger("reset", this, options), models
            },
            push: function(model, options) {
                return this.add(model, _.extend({
                    at: this.length
                }, options))
            },
            pop: function(options) {
                var model = this.at(this.length - 1);
                return this.remove(model, options), model
            },
            unshift: function(model, options) {
                return this.add(model, _.extend({
                    at: 0
                }, options))
            },
            shift: function(options) {
                var model = this.at(0);
                return this.remove(model, options), model
            },
            slice: function() {
                return slice.apply(this.models, arguments)
            },
            get: function(obj) {
                if (null != obj) return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid]
            },
            at: function(index) {
                return this.models[index]
            },
            where: function(attrs, first) {
                return _.isEmpty(attrs) ? first ? void 0 : [] : this[first ? "find" : "filter"](function(model) {
                    for (var key in attrs)
                        if (attrs[key] !== model.get(key)) return !1;
                    return !0
                })
            },
            findWhere: function(attrs) {
                return this.where(attrs, !0)
            },
            sort: function(options) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return options || (options = {}), _.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(_.bind(this.comparator, this)), options.silent || this.trigger("sort", this, options), this
            },
            pluck: function(attr) {
                return _.invoke(this.models, "get", attr)
            },
            fetch: function(options) {
                options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
                var success = options.success,
                    collection = this;
                return options.success = function(resp) {
                    var method = options.reset ? "reset" : "set";
                    collection[method](resp, options), success && success(collection, resp, options), collection.trigger("sync", collection, resp, options)
                }, wrapError(this, options), this.sync("read", this, options)
            },
            create: function(model, options) {
                if (options = options ? _.clone(options) : {}, !(model = this._prepareModel(model, options))) return !1;
                options.wait || this.add(model, options);
                var collection = this,
                    success = options.success;
                return options.success = function(model, resp) {
                    options.wait && collection.add(model, options), success && success(model, resp, options)
                }, model.save(null, options), model
            },
            parse: function(resp, options) {
                return resp
            },
            clone: function() {
                return new this.constructor(this.models)
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(attrs, options) {
                if (attrs instanceof Model) return attrs;
                options = options ? _.clone(options) : {}, options.collection = this;
                var model = new this.model(attrs, options);
                return model.validationError ? (this.trigger("invalid", this, model.validationError, options), !1) : model
            },
            _addReference: function(model, options) {
                this._byId[model.cid] = model, null != model.id && (this._byId[model.id] = model), model.collection || (model.collection = this), model.on("all", this._onModelEvent, this)
            },
            _removeReference: function(model, options) {
                this === model.collection && delete model.collection, model.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(event, model, collection, options) {
                ("add" !== event && "remove" !== event || collection === this) && ("destroy" === event && this.remove(model, options), model && event === "change:" + model.idAttribute && (delete this._byId[model.previous(model.idAttribute)], null != model.id && (this._byId[model.id] = model)), this.trigger.apply(this, arguments))
            }
        });
        var methods = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
        _.each(methods, function(method) {
            Collection.prototype[method] = function() {
                var args = slice.call(arguments);
                return args.unshift(this.models), _[method].apply(_, args)
            }
        });
        var attributeMethods = ["groupBy", "countBy", "sortBy", "indexBy"];
        _.each(attributeMethods, function(method) {
            Collection.prototype[method] = function(value, context) {
                var iterator = _.isFunction(value) ? value : function(model) {
                    return model.get(value)
                };
                return _[method](this.models, iterator, context)
            }
        });
        var View = Backbone.View = function(options) {
                this.cid = _.uniqueId("view"), options || (options = {}), _.extend(this, _.pick(options, viewOptions)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            delegateEventSplitter = /^(\S+)\s*(.*)$/,
            viewOptions = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        _.extend(View.prototype, Events, {
            tagName: "div",
            $: function(selector) {
                return this.$el.find(selector)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function(element, delegate) {
                return this.$el && this.undelegateEvents(), this.$el = element instanceof Backbone.$ ? element : Backbone.$(element), this.el = this.$el[0], delegate !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function(events) {
                if (!events && !(events = _.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var key in events) {
                    var method = events[key];
                    if (_.isFunction(method) || (method = this[events[key]]), method) {
                        var match = key.match(delegateEventSplitter),
                            eventName = match[1],
                            selector = match[2];
                        method = _.bind(method, this), eventName += ".delegateEvents" + this.cid, "" === selector ? this.$el.on(eventName, method) : this.$el.on(eventName, selector, method)
                    }
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _ensureElement: function() {
                if (this.el) this.setElement(_.result(this, "el"), !1);
                else {
                    var attrs = _.extend({}, _.result(this, "attributes"));
                    this.id && (attrs.id = _.result(this, "id")), this.className && (attrs["class"] = _.result(this, "className"));
                    var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
                    this.setElement($el, !1)
                }
            }
        }), Backbone.sync = function(method, model, options) {
            var type = methodMap[method];
            _.defaults(options || (options = {}), {
                emulateHTTP: Backbone.emulateHTTP,
                emulateJSON: Backbone.emulateJSON
            });
            var params = {
                type: type,
                dataType: "json"
            };
            if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== method && "update" !== method && "patch" !== method || (params.contentType = "application/json", params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", params.data = params.data ? {
                    model: params.data
                } : {}), options.emulateHTTP && ("PUT" === type || "DELETE" === type || "PATCH" === type)) {
                params.type = "POST", options.emulateJSON && (params.data._method = type);
                var beforeSend = options.beforeSend;
                options.beforeSend = function(xhr) {
                    if (xhr.setRequestHeader("X-HTTP-Method-Override", type), beforeSend) return beforeSend.apply(this, arguments)
                }
            }
            "GET" === params.type || options.emulateJSON || (params.processData = !1), "PATCH" === params.type && noXhrPatch && (params.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
            return model.trigger("request", model, xhr, options), xhr
        };
        var noXhrPatch = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
            methodMap = {
                create: "POST",
                update: "PUT",
                patch: "PATCH",
                "delete": "DELETE",
                read: "GET"
            };
        Backbone.ajax = function() {
            return Backbone.$.ajax.apply(Backbone.$, arguments)
        };
        var Router = Backbone.Router = function(options) {
                options || (options = {}), options.routes && (this.routes = options.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            optionalParam = /\((.*?)\)/g,
            namedParam = /(\(\?)?:\w+/g,
            splatParam = /\*\w+/g,
            escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        _.extend(Router.prototype, Events, {
            initialize: function() {},
            route: function(route, name, callback) {
                _.isRegExp(route) || (route = this._routeToRegExp(route)), _.isFunction(name) && (callback = name, name = ""), callback || (callback = this[name]);
                var router = this;
                return Backbone.history.route(route, function(fragment) {
                    var args = router._extractParameters(route, fragment);
                    router.execute(callback, args), router.trigger.apply(router, ["route:" + name].concat(args)), router.trigger("route", name, args), Backbone.history.trigger("route", router, name, args)
                }), this
            },
            execute: function(callback, args) {
                callback && callback.apply(this, args)
            },
            navigate: function(fragment, options) {
                return Backbone.history.navigate(fragment, options), this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = _.result(this, "routes");
                    for (var route, routes = _.keys(this.routes); null != (route = routes.pop());) this.route(route, this.routes[route])
                }
            },
            _routeToRegExp: function(route) {
                return route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
                    return optional ? match : "([^/?]+)"
                }).replace(splatParam, "([^?]*?)"), new RegExp("^" + route + "(?:\\?([\\s\\S]*))?$")
            },
            _extractParameters: function(route, fragment) {
                var params = route.exec(fragment).slice(1);
                return _.map(params, function(param, i) {
                    return i === params.length - 1 ? param || null : param ? decodeURIComponent(param) : null
                })
            }
        });
        var History = Backbone.History = function() {
                this.handlers = [], _.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            routeStripper = /^[#\/]|\s+$/g,
            rootStripper = /^\/+|\/+$/g,
            isExplorer = /msie [\w.]+/,
            trailingSlash = /\/$/,
            pathStripper = /#.*$/;
        History.started = !1, _.extend(History.prototype, Events, {
            interval: 50,
            atRoot: function() {
                return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
            },
            getHash: function(window) {
                var match = (window || this).location.href.match(/#(.*)$/);
                return match ? match[1] : ""
            },
            getFragment: function(fragment, forcePushState) {
                if (null == fragment)
                    if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                        fragment = decodeURI(this.location.pathname + this.location.search);
                        var root = this.root.replace(trailingSlash, "");
                        fragment.indexOf(root) || (fragment = fragment.slice(root.length))
                    } else fragment = this.getHash();
                return fragment.replace(routeStripper, "")
            },
            start: function(options) {
                if (History.started) throw new Error("Backbone.history has already been started");
                History.started = !0, this.options = _.extend({
                    root: "/"
                }, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var fragment = this.getFragment(),
                    docMode = document.documentMode,
                    oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7);
                if (this.root = ("/" + this.root + "/").replace(rootStripper, "/"), oldIE && this._wantsHashChange) {
                    var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
                    this.iframe = frame.hide().appendTo("body")[0].contentWindow, this.navigate(fragment)
                }
                this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !oldIE ? Backbone.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = fragment;
                var loc = this.location;
                if (this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                    this._hasPushState && this.atRoot() && loc.hash && (this.fragment = this.getHash().replace(routeStripper, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
                }
                if (!this.options.silent) return this.loadUrl()
            },
            stop: function() {
                Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), History.started = !1
            },
            route: function(route, callback) {
                this.handlers.unshift({
                    route: route,
                    callback: callback
                })
            },
            checkUrl: function(e) {
                var current = this.getFragment();
                return current === this.fragment && this.iframe && (current = this.getFragment(this.getHash(this.iframe))), current !== this.fragment && (this.iframe && this.navigate(current), void this.loadUrl())
            },
            loadUrl: function(fragment) {
                return fragment = this.fragment = this.getFragment(fragment), _.any(this.handlers, function(handler) {
                    if (handler.route.test(fragment)) return handler.callback(fragment), !0
                })
            },
            navigate: function(fragment, options) {
                if (!History.started) return !1;
                options && options !== !0 || (options = {
                    trigger: !!options
                });
                var url = this.root + (fragment = this.getFragment(fragment || ""));
                if (fragment = fragment.replace(pathStripper, ""), this.fragment !== fragment) {
                    if (this.fragment = fragment, "" === fragment && "/" !== url && (url = url.slice(0, -1)), this._hasPushState) this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(url);
                        this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getFragment(this.getHash(this.iframe)) && (options.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, fragment, options.replace))
                    }
                    return options.trigger ? this.loadUrl(fragment) : void 0
                }
            },
            _updateHash: function(location, fragment, replace) {
                if (replace) {
                    var href = location.href.replace(/(javascript:|#).*$/, "");
                    location.replace(href + "#" + fragment)
                } else location.hash = "#" + fragment
            }
        }), Backbone.history = new History;
        var extend = function(protoProps, staticProps) {
            var child, parent = this;
            child = protoProps && _.has(protoProps, "constructor") ? protoProps.constructor : function() {
                return parent.apply(this, arguments)
            }, _.extend(child, parent, staticProps);
            var Surrogate = function() {
                this.constructor = child
            };
            return Surrogate.prototype = parent.prototype, child.prototype = new Surrogate, protoProps && _.extend(child.prototype, protoProps), child.__super__ = parent.prototype, child
        };
        Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
        var urlError = function() {
                throw new Error('A "url" property or function must be specified')
            },
            wrapError = function(model, options) {
                var error = options.error;
                options.error = function(resp) {
                    error && error(model, resp, options), model.trigger("error", model, resp, options)
                }
            };
        return Backbone
    });
var ourCoffees = ourCoffees || {};
ourCoffees.eventTracker = _.extend({}, Backbone.Events), ourCoffees.DrawerView = function($, rwd, vent) {
    return Backbone.View.extend({
        template: "#coffeeDetails-template",
        className: "coffeeDetails",
        initialize: function(options) {
            var self = this;
            this.model = options.model, this.element = options.element, this.windowWidth = $(window).width(), this.drawerClass = ".coffeeDetails", this.template = _.template($(this.template).html()), rwd.onDelayedResize(function() {
                $(window).width() != self.windowWidth && self.isOpen() && ($(".coffeeItem .minor a.less").toggleClass("less more"), self.close(), self.windowWidth = $(window).width())
            }, !1)
        },
        render: function() {
            if (this.isOpen()) {
                var oldLink = $(".coffeeItem .minor a.less").toggleClass("less more");
                if (oldLink.parents(".coffeeItem").offset().top === this.element.offset().top) {
                    var that = this;
                    $(this.drawerClass).find(".marker").animate({
                        left: that.element.offset().left + that.element.width() / 2
                    }, 200, function() {
                        that.moveDrawer()
                    })
                } else this.close(this.element)
            } else this.moveDrawer();
            return this
        },
        close: function(reopen) {
            var that = this;
            $(this.drawerClass).slideUp(function() {
                $(this).remove(), reopen && that.moveDrawer(reopen, that.$el)
            })
        },
        isOpen: function() {
            return $(this.drawerClass).is(":visible")
        },
        moveDrawer: function(allowShortening) {
            var drawer = this.isOpen() ? $(this.drawerClass) : this.$el;
            this.$el.css("margin-left", $(".coffeeItems").width() / 2 - $(window).width() / 2);
            var top = this.element.offset().top,
                $blocks = this.element.nextAll(".coffeeItem");
            0 === $blocks.length && this.element.after(drawer), $blocks.each(function(i) {
                return $(this).offset().top != top ? ($(this).prev(".coffeeItem").after(drawer), !1) : i + 1 === $blocks.length ? ($(this).after(drawer), !1) : void 0
            }), drawer.html(this.template(this.model.attributes)).attr("id", this.model.get("roast")), drawer.find(".marker").css("left", this.element.offset().left + this.element.width() / 2), drawer.slideDown(300, function() {
                var containerHeight = drawer.find(".container").height() + 50;
                (containerHeight > drawer.height() || allowShortening === !0) && drawer.animate({
                    height: containerHeight
                }, 150), drawer.css("display", "inline-block")
            }), this.$el = drawer, vent.trigger("trackEvent", {
                action: "DrawerOpen",
                label: "Learn more"
            })
        }
    })
}(jQuery, sb.rwd, ourCoffees.eventTracker);
var ourCoffees = ourCoffees || {};
ourCoffees.CoffeeItem = function() {
    return Backbone.Model.extend({
        defaults: {
            name: "",
            roast: "",
            roastDisplay: "",
            params: "",
            image: "",
            imageAlt: "",
            detailUrl: "",
            storeUrl: "",
            details: "",
            shortDescription: "",
            drawerImage: "",
            isOnline: !0,
            isLocal: !0,
            isStore: !0
        }
    })
}();
var _gaq = _gaq || [];
! function(Drawer, tracker) {
    ourCoffees.eventTracker.on("renderDrawer", function(args) {
        var drawer = new Drawer({
            model: args.model,
            element: args.element
        });
        args.doClose ? drawer.close() : drawer.render()
    }), ourCoffees.eventTracker.on("trackEvent", function(args) {
        var action = args.action || "",
            label = args.label || "",
            value = args.value || (sb && sb.rwd && sb.rwd.viewportWidth ? sb.rwd.viewportWidth() : 0);
        tracker && tracker.push && action && tracker.push(["_trackEvent", "OurCoffeesGoogle", action, label, value])
    })
}(ourCoffees.DrawerView, _gaq), ourCoffees.CoffeeView = function($, vent) {
        return Backbone.View.extend({
            template: "#coffee-template",
            className: "coffeeItem",
            events: {
                "click .minor a": "drawDrawer"
            },
            initialize: function() {
                this.template = _.template($(this.template).html())
            },
            render: function() {
                return this.$el.html(this.template(this.model.attributes)), this
            },
            drawDrawer: function(event) {
                event.preventDefault();
                var link = this.$el.find(".minor a");
                vent.trigger("renderDrawer", {
                    element: this.$el,
                    model: this.model,
                    doClose: link.hasClass("less")
                }), link.toggleClass("less more")
            }
        })
    }(jQuery, ourCoffees.eventTracker),
    function($, sb, CoffeeView, Coffee) {
        "use strict";

        function init() {
            var coffeeResults = $(".coffeeItems"),
                container = document.createDocumentFragment();
            coffeeResults.find(".coffeeItem").each(function() {
                var $this = $(this);
                container.appendChild(new CoffeeView({
                    model: new Coffee({
                        roast: $this.data("type"),
                        roastDisplay: $this.find("type").text(),
                        detailUrl: $this.find(".button_wrap a").prop("href"),
                        details: $this.data("detail"),
                        image: $this.find("img").prop("src"),
                        shortDescription: $this.find("p").text(),
                        imageAlt: $this.find("img").prop("alt"),
                        name: $this.find("h5").text(),
                        drawerImage: $this.data("drawer"),
                        storeUrl: $this.data("storelink"),
                        isOnline: "True" == $this.data("isonline"),
                        isLocal: "True" == $this.data("isgrocery"),
                        isStore: "True" == $this.data("store")
                    })
                }).render().el)
            }).remove(), coffeeResults.find("h3").after(container)
        }
        sb.CoffeeFinderResults = {
            init: init
        }
    }(jQuery, sb, ourCoffees.CoffeeView, ourCoffees.CoffeeItem), $(document).ready(function() {
        $(".coffeeFinderResults") && sb.CoffeeFinderResults.init()
    }),
    function($, sb) {
        "use strict";

        function init() {
            var popupClickedCookie = getCookie(popupClickedCookieName);
            void 0 !== popupClickedCookie && null !== popupClickedCookie && "true" !== popupClickedCookie && $(".popupwindow").show({
                effect: "slide",
                easing: "swing",
                direction: "right",
                duration: slideDuration,
                complete: function() {
                    var popupWindow = $(this),
                        closeLink = $(popupWindow).children(".popupwindow_closelink");
                    $(closeLink).click(function(event) {
                        event.preventDefault(), $(popupWindow).hide({
                            effect: "slide",
                            easing: "swing",
                            direction: "right",
                            duration: slideDuration,
                            complete: function() {
                                setCookie(popupClickedCookieName, !0)
                            }
                        })
                    })
                }
            })
        }

        function setCookie(cname, cvalue) {
            document.cookie = cname + "=" + cvalue
        }

        function getCookie(cname) {
            for (var name = cname + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                for (var c = ca[i];
                    " " == c.charAt(0);) c = c.substring(1);
                if (0 == c.indexOf(name)) return c.substring(name.length, c.length)
            }
            return ""
        }
        var popupClickedCookieName = "opupClicked",
            slideDuration = 2e3;
        sb.PopupWindow = {
            init: init
        }
    }(jQuery, sb), $(document).ready(function() {
        $(".popupwindow").length > 0 && sb.PopupWindow.init()
    });