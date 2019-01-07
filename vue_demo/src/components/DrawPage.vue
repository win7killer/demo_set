<template>

</template>

<script>
import MergeImg from './MergeImg';
import logo from '@/assets/logo.png';
import star from '@/assets/star_300_300.jpg';

let list = [{
    src: logo,
    source: null,
    w: 100,
    h: 100,
    x: 200,
    y: 200,
    bgColor: 'rgba(100, 0, 200, .9)'
}, {
    src: star,
    source: null,
    w: 200,
    h: 200,
    x: 350,
    y: 150
}];

function loadImg (obj) {
    return new Promise((resolve, inject) => {
        let img = obj.source = new Image();
        img.onload = () => {
            resolve(obj);
        };
        img.src = obj.src;
    })
}

export default {
    data() {
        return {
            bgImg: null,
            chartCan: null,
        };
    },
    mounted() {
        // this.loadBgImg();

        this.chartCan = document.getElementById('can');
        setTimeout(() => {
            this.getImgList();
        }, 300)
    },
    methods: {
        getImgList() {
            let arr = list.map(item => loadImg(item));
            Promise.all([this.loadBgImg(), ...arr]).then(res => {
                console.log('promiseall', res);
                this.drawMergeIma(res.slice(1));
            })
        },
        loadBgImg() {
            return new Promise((resolve, inject) => {
                loadImg({
                    src: logo
                }).then(res => {
                    console.log(res);
                    this.bgImg = res.source;
                    resolve();
                })
            });
        },
        drawMergeIma(res) {
            let {
                chartCan,
                bgImg
            } = this;
            let mimg = new MergeImg({
                width: 600,
                height: 400,
                ratio: window.devicePixelRatio,
                bgImg: bgImg,
                eleList: [{
                    source: chartCan,
                    w: chartCan.width,
                    h: chartCan.height,
                    x: 0,
                    y: 20,
                    bgColor: '#fff',
                }, {
                    fontSize: 50,
                    fontWeight: 'bold',
                    color: '#90f',
                    fontFamily: 'Monospace',
                    text: '测试文案，哈哈ABC123😀',
                    x: 100,
                    y: 10
                }, ...res, ]
            });
        }
    }
}
</script>
