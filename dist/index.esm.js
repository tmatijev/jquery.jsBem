/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var createBemHelper = function (blockName, config) {
    if (config === void 0) { config = {}; }
    config.elementSeparator; var _b = config.modifierSeparator, modifierSeparator = _b === void 0 ? '--' : _b; config.modifierClass;
    var findBemElements = function (root) {
        if (root === void 0) { root = document.body; }
        return root.querySelectorAll("[data-bem=\"".concat(blockName, "\"]"));
    };
    var findBemBlocks = function (root) {
        if (root === void 0) { root = document.body; }
        return root.querySelectorAll("[data-bem-block=\"".concat(blockName, "\"]"));
    };
    var addModifier = function (element, modifier) {
        var baseClass = element.getAttribute('data-bem-block') ?
            blockName :
            element.className.split(' ').find(function (c) { return c.startsWith(blockName); });
        if (baseClass) {
            element.classList.add("".concat(baseClass).concat(modifierSeparator).concat(modifier));
        }
    };
    return {
        findBemElements: findBemElements,
        findBemBlocks: findBemBlocks,
        addModifier: addModifier
    };
};

var bemClassController = function (_a) {
    var element = _a.element, classes = _a.classes, elementSeparator = _a.elementSeparator, modifierSeparator = _a.modifierSeparator, modifierClass = _a.modifierClass;
    var isBemElement = function (className) {
        return className.split(elementSeparator).length > 1;
    };
    var isBemModifier = function (className) {
        return className.split(modifierSeparator).length > 1;
    };
    var setFinalBemClass = function (baseClass, bemSeparator) {
        var splitClasses = baseClass.split(' ');
        var classesLength = splitClasses.length;
        var finalClass = '';
        for (var i = 0; i < classesLength; i++) {
            if (i === classesLength - 1 && i < 2) {
                finalClass += splitClasses[i];
            }
            else if (i < 1) {
                finalClass += splitClasses[i] + modifierSeparator + modifierClass + bemSeparator;
            }
            else if (i > 1) {
                finalClass += splitClasses[i];
                console.warn("Please try to keep your BEM elements with less nesting.", element);
            }
            else {
                finalClass += splitClasses[i] + bemSeparator;
            }
        }
        return finalClass;
    };
    var baseClass = classes[0];
    if (isBemElement(baseClass)) {
        var processedClass = baseClass.split(elementSeparator).join(' ');
        element.classList.add(setFinalBemClass(processedClass, elementSeparator));
    }
    else if (isBemModifier(baseClass)) {
        var processedClass = baseClass.split(modifierSeparator).join(' ');
        element.classList.add(setFinalBemClass(processedClass, modifierSeparator));
    }
};

var initBem = function (options) {
    var _a = options.bemESeparator, bemESeparator = _a === void 0 ? '__' : _a, _b = options.bemMSeparator, bemMSeparator = _b === void 0 ? '--' : _b, bemBlock = options.bemBlock, _c = options.modifierClass, modifierClass = _c === void 0 ? '' : _c;
    var bemHelper = createBemHelper(bemBlock, {
        elementSeparator: bemESeparator,
        modifierSeparator: bemMSeparator,
        modifierClass: modifierClass
    });
    // Initialize BEM classes
    var blocks = bemHelper.findBemBlocks();
    var elements = bemHelper.findBemElements();
    // Process blocks
    blocks.forEach(function (block) {
        if (modifierClass) {
            block.classList.add("".concat(bemBlock).concat(bemMSeparator).concat(modifierClass));
        }
    });
    // Process elements
    elements.forEach(function (element) {
        var classes = element.className.split(' ');
        var baseClass = classes.find(function (c) { return c.startsWith(bemBlock); });
        if (baseClass && modifierClass) {
            // Add modifier to base element class
            element.classList.add("".concat(bemBlock).concat(bemMSeparator).concat(modifierClass));
            // If it's an element (contains separator), add modified element class
            if (baseClass.includes(bemESeparator)) {
                var _a = baseClass.split(bemESeparator), block = _a[0], elementName = _a[1];
                element.classList.add("".concat(block).concat(bemMSeparator).concat(modifierClass).concat(bemESeparator).concat(elementName));
            }
        }
    });
    return __assign(__assign({}, bemHelper), { updateModifier: function (element, newModifier) {
            bemClassController({
                element: element,
                classes: [element.className],
                elementSeparator: bemESeparator,
                modifierSeparator: bemMSeparator,
                modifierClass: newModifier
            });
        } });
};

export { initBem };
