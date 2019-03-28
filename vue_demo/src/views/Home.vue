<template>
<div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <!-- <LineChart></LineChart> -->
    <!-- <DrawPage></DrawPage> -->
    <!-- <WashCard></WashCard> -->
    <!-- <ImgTest/> -->
    <LangListTest/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LineChart from '@/components/LineChart.vue';
import DrawPage from '@/components/DrawPage.vue';
import WashCard from '@/components/WashCard.vue';
import ImgTest from '@/components/ImgTest.vue';
import LangListTest from '@/components/LangListTest.1.vue';
@Component({
    components: {
        HelloWorld,
        LineChart,
        DrawPage,
        // WashCard,
        ImgTest,
        LangListTest,
    }
})
export default class Home extends Vue {
    data() {
        return {
            a:1
        }
    }
    mounted() {
        console.log(this);
    }
}
</script>
