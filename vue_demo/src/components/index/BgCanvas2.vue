<template>
<div class="canvas-box">
    <canvas id="canvas" class="canvas" ref="canvas" :width=winWidth :height=winHeight></canvas>
    <div class="fix-info">{{time}}</div>
</div>
</template>

<script>
import bgImg from '@/assets/7.jpg';
import cTools from './ct';
export default {
    data() {
        return {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            oImg: null,
            can: null,
            ctx: null,
            time: 0
        };
    },
    mounted() {
        this.initCtx();
        window.onresize = () => {
            this.resetCan();
        };
    },
    computed: {

    },
    methods: {
        animationLoop() {
            this.time = 'random: ' + Math.random();
            this.can.width = window.innerWidth;
            // let deg = 360 / 180 * Math.PI * Math.random();
            this.drawImg();
            this.animationFrame = window.requestAnimationFrame(this.animationLoop);
            // setTimeout(this.animationLoop, 1000 / 60);
        },
        setFrame() {
            // this.animationLoop();
        },
        initCtx() {
            this.can = this.$refs.canvas;
            this.ctx = this.can.getContext('2d');
            this.resetCan();
            this.setFrame();
            // this.translateTest();
        },
        resetCan() {
            this.can.width = window.innerWidth;
            this.can.height = window.innerHeight;
            if (!this.oImg) {
                this.initBgImg();
            } else {
                this.drawImg();
            }
        },
        initBgImg() {
            this.oImg = new Image();
            this.oImg.onload = () => {
                this.drawImg();
            };
            this.oImg.src = bgImg;
        },
        drawImg(deg = 0) {
            let w = 100;
            let h = 100;
            for (let i = 0, l = Math.ceil(this.can.height / h); i < l; i++) {
                for (let m = 0, n = Math.ceil(this.can.width / w); m < n; m++) {
                    this.drawRadiusRect({
                        w,
                        h,
                        // deg: 2 / 180 * Math.PI * +(Math.random() * 2 - 1 > 0),
                        translate: [
                            m * (w + 1) + w / 2,
                            i * (h + 1) + h / 2
                        ]
                    });
                }
            }
        },
        drawRadiusRect({w, h, deg, translate}) {
            this.ctx.save();

            cTools.radiusRect2({
                ctx: this.ctx,
                w,
                h,
                r: 5,
                deg,
                translate,
                img: this.oImg
            });

            this.ctx.restore();
        },
        translateTest() {
            let ctx = this.ctx;
            let w = 200;
            let h = 100;
            ctx.save();

            ctx.fillStyle = '#f00';
            ctx.fillRect(0, 0, 100, 100);

            ctx.fillStyle = '#f90';
            ctx.translate(200, 200);
            ctx.fillRect(-50, -50, 100, 100);

            ctx.fillStyle = 'rgba(0,0,255,.5)';
            ctx.rotate(45 * Math.PI / 180);
            ctx.fillRect(-w / 2, -h / 2, w, h);

            ctx.restore();
        }
    }
};
</script>

<style lang="less">
.canvas {
    box-sizing: border-box;
    display: block;
    background: #ccc;
}
.fix-info {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, .5)
}
</style>
