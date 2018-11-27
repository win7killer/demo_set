<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <LineChart></LineChart>
    <DrawPage></DrawPage>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import LineChart from '@/components/LineChart.vue';
import DrawPage from '@/components/DrawPage.vue';
@Component({
    components: {
        HelloWorld,
        LineChart,
        DrawPage
    }
})
export default class Home extends Vue {}
</script>
