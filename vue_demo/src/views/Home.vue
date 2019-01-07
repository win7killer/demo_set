<template>
<div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <!-- <LineChart></LineChart> -->
    <!-- <DrawPage></DrawPage> -->
    <!-- <WashCard></WashCard> -->
    <ImgTest/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LineChart from '@/components/LineChart.vue';
import DrawPage from '@/components/DrawPage.vue';
import WashCard from '@/components/WashCard.vue';
import ImgTest from '@/components/ImgTest.vue';
@Component({
    components: {
        HelloWorld,
        LineChart,
        DrawPage,
        // WashCard,
        ImgTest,
    }
})
export default class Home extends Vue {}
</script>
