<template>
    <div class="svg-star-container">
        <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
            <title>Cat</title>
            <desc>Stick Figure of Cat</desc>
            <!-- 在这里绘制图像 -->
            <circle
                cx="70"
                cy="95"
                r="50"
                style="stroke: black; fill: none;"
            ></circle>
            <circle
                cx="55"
                cy="80"
                r="5"
                stroke="black"
                fill="#3339933"
            ></circle>
            <circle
                cx="85"
                cy="80"
                r="5"
                stroke="black"
                fill="#3339933"
            ></circle>
            <g id="whiskers">
                <line
                    x1="75"
                    y1="95"
                    x2="135"
                    y2="85"
                    style="stroke: black;"
                ></line>
                <line
                    x1="75"
                    y1="95"
                    x2="135"
                    y2="105"
                    style="stroke: black;"
                ></line>
            </g>
            <use xlink:href="#whiskers" transform="scale(-1 1) translate(-140 0)"></use>
            <!-- 耳朵 -->
            <polyline points="108 62,90 10, 70 45, 50, 10, 32, 62" style="stroke: black; fill: none;" />
            <!-- 嘴 -->
            <polyline points="35 110,45 120, 95 120, 105, 110" style="stroke: black; fill: none;" />
            <!-- 鼻子 -->
            <path d="M 75 90 L 65 90 A 5 10 0 0 0 75 90" style="stroke: black; fill: #fcc;" />
            <text
                x="60"
                y="165"
                style="font-family: sans-serif;font-size: 14pt;
    stroke: none; fill: black;
"
            >Cat</text>

        </svg>
        <v-text :prop-value="element.propValue" :element="element" />
    </div>
</template>

<script>
import OnEvent from '../../common/OnEvent'

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: String,
            required: true,
            default: '',
        },
        element: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {
            points: '',
        }
    },
    watch: {
        'element.style.width': function () {
            this.draw()
        },
        'element.style.height': function () {
            this.draw()
        },
    },
    mounted() {
        this.draw()
    },
    methods: {
        draw() {
            const { width, height } = this.element.style
            this.drawPolygon(width, height)
        },

        drawPolygon(width, height) {
            // 五角星十个坐标点的比例集合
            const points = [
                [0.5, 0],
                [0.625, 0.375],
                [1, 0.375],
                [0.75, 0.625],
                [0.875, 1],
                [0.5, 0.75],
                [0.125, 1],
                [0.25, 0.625],
                [0, 0.375],
                [0.375, 0.375],
            ]

            const coordinatePoints = points.map(point => width * point[0] + ' ' + height * point[1])
            this.points = coordinatePoints.toString()
        },
    },
}
</script>

<style lang="scss" scoped>
.svg-star-container {
    width: 100%;
    height: 100%;

    svg {
        width: 100%;
        height: 100%;
    }

    .v-text {
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 40%;
    }
}
</style>
