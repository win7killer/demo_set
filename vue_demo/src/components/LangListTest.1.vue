<template>
<div class="list">
    <div class="box" :style="{
        height: boxHeight + 'px',
        maxHeight: '1500000px'
    }"

     >
        <div class="item" v-for="(item, index) in getShowList" :key="index" :style="{
                top: getPosTop(item.index)
            }">
            <div class="_1PGkdM8zd2QzOiFEWieWrk">{{item.id}}</div>
            <div>
                <div class="_113CIjCFcgg_BK6pEtLzCZ">Peter Brimer</div>
                <div class="_3r7cg8jlOKfV2jiVyjb_UE">This is row {{item.index}}</div>
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
            itemOuterHeight: 200,
            screenH: window.screen.height,
            len: 100000,
        }
    },
    created() {
        this.nums = 's'.repeat(this.len).split('');
        this.nums = this.nums.map((item, index) => {
            return {
                index: index,
                id: Math.random(),
                text: item,
                // top: this.getPosTop(index)
            }
        })
        let time = 0;
        let timer = null;
        window.addEventListener('scroll', () => {
            clearTimeout(timer);
            if (Date.now() - time > 50) {
                // console.log('11')
                this.updateRender();
                time = Date.now();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    // console.log('end')
                    this.updateRender();
                }, 50)
            }
        });
        this.updateRender();
    },
    mounted() {

    },
    computed: {
        boxHeight() {
            let cot = this.itemOuterHeight * this.len;
            cot = cot > 1500000 ? 1500000 : cot;
            return cot
        },
        getShowIndex() {
            return parseInt(this.scrollY / this.itemOuterHeight) + 5;
        },
        getShowList() {
            let num = 15;
            let len = this.len
            let index = this.getShowIndex;
            let pre = index - num > 0 ? index - num : 0;
            let next = index + num > len ? len : index + num;
            return this.nums.slice(pre, next);
        }
    },
    methods: {
        getPosTop(index) {
            return index * this.itemOuterHeight + 'px';
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
        overflow: hidden;
        max-height: 1500000px;
        pointer-events: none;
        .item {
            position: absolute;
            left: 0;
            width: 100%;
            height: 190px;
            margin-bottom: 10px;
            background: #9cf;
            overflow: hidden;
        }
    }
}
</style>
