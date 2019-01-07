<template>
<div class="can-bxo">
    <canvas id="can" width=375 height=667></canvas>
</div>
</template>

<script>
import Card from './Card';
import ct from '../components/index/ct';

export default {
    data() {
        return {
            num: 78,
            cardList: [],
            positions: [{
                x: 0, y: 0,
            }, {
                x: 280, y: 130
            }]
        };
    },
    mounted() {
        this.can = document.getElementById('can');
        this.ctx = this.can.getContext('2d');
        this.initCan()
    },
    methods: {
        initCan() {
            let {can, ctx} = this;
            this.center = [can.width / 2 - 90 / 2, can.height / 2 - 150 / 2,];
            this.drawOneCard(...this.center, 90, 150);
            this.animate();
        },
        initCard() {
            for (let i  = 0; i < this.num; i++) {
                this.cardList.push(new Card(i));
            }
        },
        animate() {
            var _this = this;
            var flag = true;
            var raf = window.requestAnimationFrame(loop);

            function loop() {
                flag = !flag;
                // if (flag) {
                    _this.draw();
                // }
                window.requestAnimationFrame(loop);
            }
        },
        draw() {
            this.animateFromTo(this.center, [100, 100]);
        },
        animateFromTo(from ,to) {
            let xPath = to[0] - from[0];
            let yPath = to[1] - from[1];
            if (xPath <= 0 && yPath <= 0) {
                this.drawOneCard(from[0]-=2, from[1]-=4, 90, 150)
            } else {
                this.drawOneCard(from[0]+=2, from[1]+=4, 90, 150)
            }


        },
        drawOneCard(x, y, w, h) {
            let {can, ctx} = this;
            ctx.save();
            ctx.fillStyle = '#f90';
            ctx.fillRect(x, y, w, h);
            ctx.restore();
        }

    }
}
</script>

<style lang="less" scoped>
#can {
    background: #ddd;
    margin: 0a auto;
}
</style>
