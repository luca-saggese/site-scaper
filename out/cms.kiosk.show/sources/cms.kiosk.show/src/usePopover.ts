"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopover = void 0;
var react_1 = require("react");
var util_1 = require("./util");
var useElementRef_1 = require("./useElementRef");
exports.usePopover = function (_a) {
    var childRef = _a.childRef, positions = _a.positions, containerClassName = _a.containerClassName, containerParent = _a.containerParent, contentLocation = _a.contentLocation, align = _a.align, padding = _a.padding, reposition = _a.reposition, boundaryInset = _a.boundaryInset, onPositionPopover = _a.onPositionPopover;
    var popoverRef = useElementRef_1.useElementRef(containerClassName, {
        position: 'fixed',
        overflow: 'visible',
        top: '0px',
        left: '0px',
    });
    var positionPopover = react_1.useCallback(function (positionIndex, childRect, popoverRect, parentRect) {
        var _a;
        if (positionIndex === void 0) { positionIndex = 0; }
        if (childRect === void 0) { childRect = childRef.current.getBoundingClientRect(); }
        if (popoverRect === void 0) { popoverRect = popoverRef.current.getBoundingClientRect(); }
        if (parentRect === void 0) { parentRect = containerParent.getBoundingClientRect(); }
        if (contentLocation) {
            var _b = typeof contentLocation === 'function'
                ? contentLocation({
                    childRect: childRect,
                    popoverRect: popoverRect,
                    parentRect: parentRect,
                    position: 'custom',
                    align: 'custom',
                    padding: padding,
                    nudgedTop: 0,
                    nudgedLeft: 0,
                    boundaryInset: boundaryInset,
                })
                : contentLocation, inputTop = _b.top, inputLeft = _b.left;
            var left_1 = parentRect.left + inputLeft;
            var top_1 = parentRect.top + inputTop;
            popoverRef.current.style.transform = "translate(" + left_1 + "px, " + top_1 + "px)";
            onPositionPopover({
                childRect: childRect,
                popoverRect: popoverRect,
                parentRect: parentRect,
                position: 'custom',
                align: 'custom',
                padding: padding,
                nudgedTop: 0,
                nudgedLeft: 0,
                boundaryInset: boundaryInset,
            });
            return;
        }
        var isExhausted = positionIndex === positions.length;
        var position = isExhausted ? positions[0] : positions[positionIndex];
        var _c = util_1.getNewPopoverRect({
            childRect: childRect,
            popoverRect: popoverRect,
            parentRect: parentRect,
            position: position,
            align: align,
            padding: padding,
            reposition: reposition,
        }, boundaryInset), rect = _c.rect, boundaryViolation = _c.boundaryViolation;
        if (boundaryViolation && reposition && !isExhausted) {
            positionPopover(positionIndex + 1, childRect, popoverRect, parentRect);
            return;
        }
        var top = rect.top, left = rect.left, width = rect.width, height = rect.height;
        var finalTop = top;
        var finalLeft = left;
        if (reposition && !isExhausted) {
            (_a = util_1.getNudgedPopoverRect(rect, parentRect, boundaryInset), finalTop = _a.top, finalLeft = _a.left);
        }
        popoverRef.current.style.transform = "translate(" + finalLeft + "px, " + finalTop + "px)";
        onPositionPopover({
            childRect: childRect,
            popoverRect: {
                top: finalTop,
                left: finalLeft,
                width: width,
                height: height,
                right: finalLeft + width,
                bottom: finalTop + height,
            },
            parentRect: parentRect,
            position: position,
            align: align,
            padding: padding,
            nudgedTop: finalTop - top,
            nudgedLeft: finalLeft - left,
            boundaryInset: boundaryInset,
        });
    }, [
        childRef,
        popoverRef,
        positions,
        align,
        padding,
        reposition,
        boundaryInset,
        containerParent,
        contentLocation,
        onPositionPopover,
    ]);
    return [positionPopover, popoverRef];
};
//# sourceMappingURL=usePopover.js.map