<template>
<div class="box">
    <img class="img-dom" :src="src" alt="">
    <audio autoplay ref="audio" preload="load" :src="audioSrc"></audio>
    <a href="javascript:;" @click="playChange">{{getStage}}</a>
</div>
</template>

<script>
import imgSrc from './1.jpg';
import audioSrc from './1.mp3';
// let audioSrc = http://fs.w.kugou.com/201901072211/00022f6f3ec9f96b71ade68a190bb580/G107/M0A/02/10/qw0DAFwvUgeAFaLZAChdcXmND30843.mp3;

export default {
    data() {
        return {
            src: imgSrc,
            audioSrc,
            status: false
        }
    },
    mounted() {
        this.audioDom = this.$refs.audio;
        this.audioDom.oncanplay = () => {
            this.audioDom.play();
        }
    },
    computed: {
        getStage() {
            return this.status ? '播放' : '暂停';
        }
    },
    methods: {
        playChange() {
            if (!this.status) {
                this.audioDom.pause();
            } else {
                this.audioDom.play();

            }
            this.status = !this.status;
        }
    }


}
</script>

<style lang="less">
.box {
    .img-dom {

    }
}
</style>
