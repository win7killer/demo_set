<template>
<div class="list">
    <div class="box" :style="{
        height: boxHeight
    }" :data-some="scrollY">
        <div class="item" v-for="(k, index) in nums" v-if="getIsShow(index)" :key="index" :style="{
                top: getPosTop(index)
            }">
            <div class="_1PGkdM8zd2QzOiFEWieWrk" style="background-color: rgb(244, 67, 54);">P</div>
            <div>
                <div class="_113CIjCFcgg_BK6pEtLzCZ">Peter Brimer</div>
                <div class="_3r7cg8jlOKfV2jiVyjb_UE">This is row 13300</div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
//
export default {
    data() {
        return {
            nums: [],
            scrollY: 0,
            itemOuterHeight: 50,
            screenH: window.screen.height
        }
    },
    created() {
        this.nums = 's'.repeat(100000).split('');
        let time = 0;
        let timer = null;
        window.addEventListener('scroll', () => {
            if (Date.now() - time > 100) {
                // console.log('11')
                this.updateRender();
                time = Date.now();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    // console.log('end')
                    this.updateRender();
                }, 100)
            }
        })
    },
    mounted() {

    },
    computed: {
        boxHeight() {
            return this.itemOuterHeight * this.nums.length + 'px'
        },
    },
    methods: {
        getPosTop(index) {
            return index * this.itemOuterHeight + 'px';
        },
        getIsShow(index) {
            let top = index * this.itemOuterHeight;
            let sy = window.scrollY;
            let padH = this.itemOuterHeight * 8;
            let res = (top <= sy + this.screenH + padH) && (top >= sy - padH);
            return res;
        },
        updateRender() {
            this.scrollY = window.scrollY;
            // this.$forceUpdate();
        }
    }
}
</script>

<style lang="less" scoped>
.list {
    background: #eee;
    overflow: scroll;

    .box {
        position: relative;

        .item {
            position: absolute;
            left: 0;
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            background: #f09;
            overflow: hidden;
        }
    }
}
</style>
