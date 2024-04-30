<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-title">数据可视化</div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">各科发表总数</span>
              <div class="img-box">
                <img src="./images/book-sum.png" alt="" />
              </div>
              <span class="left-number">848.132w</span>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value">2222</span>
                <span class="traffic-name sle">Computer Science 访问量</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value">2222</span>
                <span class="traffic-name sle">Physics 访问量</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value">4567</span>
                <span class="traffic-name sle">Mathematics 访问量</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/book_sum.png" alt="" />
                </div>
                <span class="item-value">1234</span>
                <span class="traffic-name sle">Economics 访问量</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">昨日 / 今日 发表量占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card bottom-box">
      <div class="bottom-title">各学科发表柱形图</div>
      <div class="bottom-tabs">
        <el-tabs v-model="tabActive" class="demo-tabs">
          <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, onMounted } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";

const tabActive = ref(1);
const pieRef = ref();
const curveRef = ref();

onMounted(() => {
  pieRef.value.initChart(pieData);
  curveRef.value.initChart(curveData);
});

const tab = [
  { label: "近七日", name: 7 },
  { label: "近一月", name: 30 },
  { label: "近三月", name: 90 },
  { label: "近半年", name: 180 },
  { label: "近一年", name: 360 }
];
const pieData = [
  { value: 1000, name: "昨日发表数" },
  { value: 3000, name: "今日发表数" }
];
const curveData = [
  { value: 30, spotName: "Physics" },
  { value: 90, spotName: "Mathematics" },
  { value: 10, spotName: "Computer Science" },
  { value: 70, spotName: "Quantitative Biology" },
  { value: 20, spotName: "Quantitative Finance" },
  { value: 60, spotName: "Statistics" },
  { value: 80, spotName: "Economics" },
  { value: 55, spotName: "Electrical Engineering and Systems Science" }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
