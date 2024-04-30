<template>
  <div class="card content-box">
    <div class="bodyBox">
      <div class="leftBox">
        <div>[Submitted on {{ sub.submitDate }}]</div>
        <div class="title">
          <b>{{ sub.paperTitle }}</b>
        </div>
        <div class="authors">
          <template v-for="(item, i) in sub.authorList" :key="i">
            <el-link style="font-size: 20px" type="primary">{{ item + ", " }}</el-link>
          </template>
        </div>
        <div class="abstract" style="word-break: break-all; word-wrap: break-word">
          {{ sub.abstract }}
        </div>
        <div class="bottom">
          <div>Comments: {{ sub.comments }}</div>
          <div>
            Subject:
            <template v-for="(item, i) in sub.subjectList" :key="i">
              {{ item + ", " }}
            </template>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div>Files</div>
        <template v-for="(item, i) in sub.paperFileList" :key="i">
          <div>
            <el-link style="font-size: 20px" type="primary" :href="item.link">{{ item.type }}</el-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { paperInfo } from "../../domain/submission";
// import { getSubmissionInfoById } from "../../api/modules/submission";
import { onMounted, onUpdated, toRef } from "vue";
let route = useRoute();
let sub1 = new paperInfo();
let sub = toRef(sub1);
// let paperInfo = route.query.paperInfo;
function getSubmissionInfo() {
  // getSubmissionInfoById({ submissionId: route.query.submissionId }).then(res => {
  //   submissionInfo = res.message;
  //   console.log(res);
  //   console.log(submissionInfo);
  // });
  // console.log(route.query.submissionId);
  if (route.query.paperInfo == null) {
    return;
  }
  sub.value = JSON.parse(route.query.paperInfo.toString());
  console.log(sub);
}
onUpdated(() => {
  getSubmissionInfo();
});
onMounted(() => {
  getSubmissionInfo();
});
// const authors = computed(() => {
//   return (submissionInfo?.paperRoughly?.paperAuthors || "scec;ecr;d").split(";");
// });
</script>
<style lang="scss">
@import "./index.scss";
</style>
