(function(window) {
    'use strict';

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    var hasClass, addClass, removeClass,emptyClass;
    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return element.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
        emptyClass = function (elem ,c) {
            elem.className = c;
        }
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            if (hasClass(elem, c)) {
                elem.className = elem.className.replace(classReg(c), ' ');
            }
        };
        emptyClass = function (elem ,c) {
            elem.className = c;
        }
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        emptyClass:emptyClass,

        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass,
        empty: emptyClass,
    };
    if (typeof define === 'function' && define.amd) {
        define(classie);
    } else {
        window.classie = classie;
    }
})(window);
