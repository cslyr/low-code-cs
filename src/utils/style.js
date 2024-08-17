import { sin, cos, toPercent } from '@/utils/translate'

export function getShapeStyle(style) {
    const result = {};
    // 设置的是宽高位置和旋转角度
    ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        if (attr != 'rotate') {
            result[attr] = style[attr] + 'px'
        } else {
            result.transform = 'rotate(' + style[attr] + 'deg)'
        }
    })
    // console.log("样式结果",result)
    return result
}

const needUnit = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
]

export function getSVGStyle(style, filter = []) {
    const result = {};

    [
        'opacity',
        'width',
        'height',
        'top',
        'left',
        'rotate',
        'fontSize',
        'fontWeight',
        'lineHeight',
        'letterSpacing',
        'textAlign',
        'color',
    ].forEach(key => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                if (style[key] !== '') {
                    result[key] = style[key]

                    if (needUnit.includes(key)) {
                        result[key] += 'px'
                    }
                }
            } else {
                result.transform = key + '(' + style[key] + 'deg)'
            }
        }
    })

    return result
}

export function getStyle(style, filter = []) {
    // console.log('style',style)
    const result = {}
    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                if (style[key] !== '') {
                    result[key] = style[key]

                    if (needUnit.includes(key)) {
                        result[key] += 'px'
                    }
                }
            } else {
                result.transform = key + '(' + style[key] + 'deg)'
            }
        }
    })
    // console.log('最终样式显示',result)
    return result
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
    console.log("执行",111)
    console.log("style",style)
    // 首先进行深拷贝
    style = { ...style }
    if (style.rotate != 0) {
        const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
        // 这个当中的diffX算的并不是轴线显示的位置，而是中心点偏移的距离，
        const diffX = (style.width - newWidth) / 2
        // 将偏移之后的距离加上原来的左侧坐标得到的就是新的左侧坐标
        style.left += diffX
        // 右侧坐标等于左侧坐标加上新的宽度
        style.right = style.left + newWidth

        const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
        const diffY = (style.height - newHeight) / 2 // 始终是正
        style.top += diffY
        style.bottom = style.top + newHeight

        style.width = newWidth
        style.height = newHeight
    } else {
        style.bottom = style.top + style.height
        style.right = style.left + style.width
    }

    return style
}

const filterKeys = ['width', 'height', 'scale']
export function getCanvasStyle(canvasStyleData) {
    const result = {}
    Object.keys(canvasStyleData).filter(key => !filterKeys.includes(key)).forEach(key => {
        result[key] = canvasStyleData[key]
        if (key === 'fontSize') {
            result[key] += 'px'
        }
    })

    return result
}

export function createGroupStyle(groupComponent) {
    const parentStyle = groupComponent.style
    groupComponent.propValue.forEach(component => {
        // component.groupStyle 的 top left 是相对于 group 组件的位置
        // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
        if (!Object.keys(component.groupStyle).length) {
            const style = { ...component.style }
            if (component.component.startsWith('SVG')) {
                component.groupStyle = getSVGStyle(style)
            } else {
                component.groupStyle = getStyle(style)
            }

            component.groupStyle.left = toPercent((style.left - parentStyle.left) / parentStyle.width)
            component.groupStyle.top = toPercent((style.top - parentStyle.top) / parentStyle.height)
            component.groupStyle.width = toPercent(style.width / parentStyle.width)
            component.groupStyle.height = toPercent(style.height / parentStyle.height)
        }
    })
}
