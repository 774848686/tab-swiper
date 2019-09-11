
/**
 * dom元素进行位移变化
 * @param {Object} ele  dom对象
 * @param {Number} x 坐标x轴
 * @param {Number} y 坐标y轴
 * @param {Number} z 坐标z轴
 */
export function _translate(ele, x, y, z) {
    _transform(
        ele,
        "translate3d(" + x + "px, " + y + "px, " + z + "px)"
    );
};
/**
 * dom元素位移修改
 * @param {Object} ele dom元素
 * @param {String} transform 位移属性
 */
export function _transform(ele, transform) {
    let elStyle = ele.style;
    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
};
/**
 * 设置过渡时间
 * @param {Object} ele dom元素
 * @param {Number} time 时间
 */
export function _transitionDuration(ele, time) {
    let elStyle = ele.style;
    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration =
        time + "ms";
};
/**
 * 获取当前元素的translate参数
 */
export function _getTranslate(el) {
    let curStyle = window.getComputedStyle(el);
    let curTransform = curStyle.transform || curStyle.webkitTransform;
    let x, y;
    x = y = 0;
    curTransform = curTransform.split(", ");
    if (curTransform.length === 6) {
        x = parseInt(curTransform[4], 10);
        y = parseInt(curTransform[5], 10);
    }
    return {
        x,
        y
    };
};

/**
 * 获取当前元素的宽高
 */
export function _getSize(el) {
    let curStyle = window.getComputedStyle(el);
    let { width, height } = curStyle;
    return {
        width: Number(width.replace("px", "")),
        height: Number(height.replace("px", ""))
    };
};