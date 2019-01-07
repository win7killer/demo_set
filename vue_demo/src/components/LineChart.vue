<template>
<div class="can-box">
    <canvas id="can" width=500 height=300></canvas>
</div>
</template>

<script>
import F2 from '@antv/f2/lib/core';
import '@antv/f2/lib/geom/line';
import '@antv/f2/lib/geom/point';
import '@antv/f2/lib/component/guide/text';
import Guide from '@antv/f2/lib/plugin/guide';
import GroupAnimation from '@antv/f2/lib/animation/group';
F2.Chart.plugins.register([GroupAnimation, Guide]);

const data = [{
    date: '2018-11-01',
    score: 1000
}, {
    date: '2018-11-02',
    score: 10000
}, {
    date: '2018-11-03',
    score: 3040
}, {
    date: '2018-11-04',
    score: 13440
}, {
    date: '2018-11-05',
    score: 33000
}, {
    date: '2018-11-06',
    score: 21004
}, {
    date: '2018-11-07',
    score: 41030
}, ];

export default {
    name: 'LineChart',
    data() {
        return {
            lineColor: '#0099ff',
            textColor: '#f90',
            chart: null,
        };
    },
    mounted() {
        this.drawChart();
    },
    methods: {
        drawChart() {
            let chart = this.chart = new F2.Chart({
                id: 'can',
                padding: [40, 40, 60],
                pixelRatio: window.devicePixelRatio,
            });

            chart.source(data);
            this.dateAxis();
            chart.line()
                .position('date*score')
                .color('score', this.lineColor)
            // .shape('smooth');

            // 绘制点
            chart.point().position('date*score').style({
                stroke: '#fff',
                lineWidth: 1
            });
            chart.render();
            this.drawText();
        },
        drawText() {
            // 绘制折点文本
            let {
                chart,
                textColor
            } = this;
            let offset = -5;
            let canvas = chart.get('canvas');
            let group = canvas.addGroup();
            let shapes = {};
            data.map(obj => {
                let point = chart.getPosition(obj);
                let text = group.addShape('text', {
                    attrs: {
                        x: point.x,
                        y: point.y + offset,
                        text: obj.score,
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        fill: textColor
                    }
                });
                shapes[obj.date] = text; // 缓存该 shape, 便于后续查找
            });
        },
        dateAxis() {
            // date坐标处理
            this.chart.axis('date', {
                tickLine: {
                    length: 4,
                    stroke: '#e8e8e8',
                    lineWidth: 1
                },
                label: {
                    textAlign: 'end',
                    textBaseline: 'middle',
                    rotate: -Math.PI / 4,
                    padding: 10
                }
            });
        },
    }
};
</script>
