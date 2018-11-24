<template>
<div class="canvas-box">
    <canvas id="canvas" class="canvas" ref="canvas" :width=winWidth :height=winHeight></canvas>
    <canvas ref="offScreenCanvas" width=1000 height=1000 style="display: none;"></canvas>
</div>
</template>

<script>
import bgImg from '@/assets/2.jpg';
import cTools from '@/until/canvas_tools';
export default {
    data() {
        return {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            oImg: null,
            can: null,
            ctx: null
        };
    },
    mounted() {
        this.initCtx();
        window.onresize = () => {
            // this.resetCan();
        };
    },
    computed: {},
    methods: {
        initCtx() {
            this.can = this.$refs.canvas;
            this.ctx = this.can.getContext("2d");
            this.resetCan();
            // this.translateTest();
        },
        initOffCan({
            w,
            h
        }) {
            if (!this.offCan) {
                this.offCan = this.$refs.offScreenCanvas;
                this.offCtx = this.offCan.getContext("2d");
            }
            this.offCan.width = w;
            this.offCan.height = h;
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
        drawImg() {
            let w = 100;
            let h = 100;
            for (let i = 0, l = Math.ceil(this.can.height / 100); i < l; i++) {
                for (let m = 0, n = Math.ceil(this.can.width / 100); m < n; m++) {
                    this.drawRadiusRect({
                        w: 100,
                        h: 100,
                        x: m * 101,
                        y: i * 101,
                        // deg: Math.random() * 90,
                        translate: [
                            // m * 101 + 100,
                            0,0
                            // i * 101 + 100
                        ]
                    });
                }
            }

            // this.drawRadiusRect({
            //     w: 100,
            //     h: 100,
            //     x: -10,
            //     y: -10,
            //     // deg: Math.random() * 90,
            //     translate: [
            //         // m * 101 + 100,
            //         // i * 101 + 100
            //         100, 150
            //     ]
            // });

            // this.ctx.drawImage(this.oImg, 0, 0, window.innerWidth, window.innerHeight);
            // this.ctx.drawImage(this.oImg,
            //     0, 0, this.oImg.width, this.oImg.height,
            //     100 + 200, 100 + 100, 200, this.oImg.height * 200 / this.oImg.width);
            // cTools.rotate({
            //     ctx: this.ctx,
            //     deg: 90,
            //     callback: () => {
            //         console.log('rotate ++');
            //     }
            // })
        },
        drawRadiusRect({
            x,
            y,
            w,
            h,
            deg,
            translate
        }) {
            this.ctx.save();
            this.initOffCan({
                w,
                h
            });
            this.offCtx.drawImage(
                this.oImg,
                0,
                0,
                this.oImg.width,
                this.oImg.height,
                0,
                0,
                w,
                h
            );
            // let imgData = this.offCtx.getImageData(0, 0, w, h);
            let pattern = this.ctx.createPattern(this.oImg, 'repeat');
            cTools.radiusRect({
                ctx: this.ctx,
                x,
                y,
                w,
                h,
                r: 5,
                pattern,
                deg,
                translate
            });

            // this.ctx.clip();
            // this.ctx.drawImage(
            //     this.oImg,
            //     0,
            //     0,
            //     this.oImg.width,
            //     this.oImg.height,
            //     x,
            //     y,
            //     w,
            //     h
            // );
            this.ctx.restore();
            // this.initBgImg();
            // this.ctx.save();
            // cTools.radiusRect2({
            //     ctx: this.ctx,
            //     x: 100,
            //     y: 100,
            //     r: 10,
            //     w: 100,
            //     h: 100
            // });
            // this.ctx.restore();
        },
        translateTest() {
            let ctx = this.ctx;
            let w = 200;
            let h = 100;
            ctx.save();
            ctx.fillStyle = "#f00";
            ctx.fillRect(0, 0, 100, 100);
            ctx.fillStyle = "#f90";
            ctx.translate(200, 200);
            ctx.fillRect(-50, -50, 100, 100);

            ctx.restore();

            ctx.fillStyle = "rgba(0,0,255,.5)";
            // ctx.translate(20, 100)
            ctx.rotate(45 * Math.PI / 180);
            ctx.fillRect(-w/2, -h/2, w, h);

            ctx.restore();

        }
    }
};
</script>

<style lang="less">
.canvas {
    box-sizing: border-box;
    display: block;
    background: #ccc; // box-shadow: 1px 1px #f90 inset;
}
</style>
