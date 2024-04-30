<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus">
      <div class="topArea">
        <div class="topBar">
          <span class="text"> 已审核通过论文 🍓🍇🍈🍉</span>
          <div class="pageBtn">
            <div class="paperChange">
              <template v-if="isAdmin == '1'">
                <div class="btnBox"><el-button type="primary" @click="getMySubmission()" plain>我审核的论文</el-button></div>
                <div class="btnBox"><el-button type="primary" @click="getAllSubmission()" plain>全部论文</el-button></div>
              </template>
            </div>
            <div class="pageBar">
              <pageBar :total="pageTotal" @page="pageRequest"></pageBar>
            </div>
          </div>
        </div>
      </div>
      <div class="paperBody">
        <template v-for="(item, i) in paperList" :key="i">
          <!-- <template v-for="(item, i) in [1, 2, 3, 4]" :key="i"> -->
          <submissionItem :index="i" :paperInfo="item"></submissionItem>
        </template>
      </div>
    </div>
    <div :hidden="loadingStatus" class="loading-position">
      <div class="loading">
        <div class="loading-square"></div>
        <div class="loading-square"></div>
        <div class="loading-square"></div>
        <div class="loading-square"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="reviewManage">
import pageBar from "../../components/page/pageBar.vue";
import submissionItem from "./components/submissionItem.vue";
// import Pagination from "../../components/ProTable/components/Pagination.vue";
// import moment from "moment";
import { paperInfo } from "../../domain/submission";
import { onMounted, reactive, toRef, ref } from "vue";
// import { ResponsePage, RequestPage } from "@/api/interface/index";
import { getAllReviewedByVerifierId, getReviewedPaperByVerifierId } from "../../api/modules/submission";
let loadingStatus = ref(false);
let isAdmin = ref("");
let isAllOrMy = ref(0);
let verifierId = ref(0);
let pageTotal = ref();
let paperList = ref([]);
let list: paperInfo[] = [];
let submissionPaperList = toRef(list);
let listLast: paperInfo[] = [];
const ReqPage = reactive({
  pageSize: 4,
  pageNum: 1,
  // orderByCode: 0,
  verifierId: verifierId.value
});
const ReqPage1 = reactive({
  pageSize: 4,
  pageNum: 1
  // orderByCode: 0
});
// let paperInfo1 = reactive({
//   paperLink: {
//     name: "arXiv:2305.09664",
//     link: "http"
//   },
//   paperTitle: "Understanding 3D Object Interaction from a Single Image",
//   paperFileList: [
//     {
//       type: "pdf",
//       link: "http"
//     },
//     {
//       type: "pdf",
//       link: "http"
//     }
//   ],
//   subjectList: ["Graphics (cs.GR)", "Computational Geometry (cs.CG)"],
//   authorList: ["Shengyi Qian", "David F. Fouhey"],
//   abstract:
//     "Humans can easily understand a single image as depicting multiple potential objects permitting interaction. We use this skill to plan our interactions with the world and accelerate understanding new objects without engaging in interaction. In this paper, we would like to endow machines with the similar ability, so that intelligent agents can better explore the 3D scene or manipulate objects. Our approach is a transformer-based model that predicts the 3D location, physical properties and affordance of objects. To power this model, we collect a dataset with Internet videos, egocentric videos and indoor images to train and validate our approach. Our model yields strong performance on our data, and generalizes well to robotics data.",
//   submitDate: "2023.5.19",
//   comments: " arXiv admin note: text overlap with arXiv:2304.07410"
// });
function pageRequest(page: any) {
  console.log("父组件:" + page);
  if (isAllOrMy.value == 0) {
    ReqPage.pageNum = page.pageNum;
    ReqPage.pageSize = page.pageSize;
    getMySubmission();
  } else {
    ReqPage1.pageNum = page.pageNum;
    ReqPage1.pageSize = page.pageSize;
    console.log("pageNum:" + ReqPage1.pageNum);
    console.log("pageSize:" + ReqPage1.pageSize);
    getAllSubmission();
  }
}

onMounted(() => {
  let u: string | null = localStorage.getItem("userInfo");
  console.log(u);
  if (u == null) return null;
  isAdmin.value = JSON.parse(u).isAdmin;
  verifierId.value = JSON.parse(u).id;
  console.log("verifierId" + verifierId.value);
  getMySubmission();
});
function getMySubmission() {
  isAllOrMy.value = 0;
  let u: string | null = localStorage.getItem("userInfo");
  if (u == null) return;
  console.log(JSON.parse(u));
  verifierId.value = JSON.parse(u).id;
  console.log("getMySubmission");
  console.log(verifierId.value);
  ReqPage.verifierId = verifierId.value;
  getReviewedPaperByVerifierId(ReqPage).then(function (res) {
    if (res.code != 200) {
      submissionPaperList.value = listLast;
      return;
    }
    paperList.value = res.data.records;
    ReqPage.pageNum = res.data.current;
    ReqPage.pageSize = res.data.size;
    pageTotal.value = res.data.total;
    console.log(paperList.value);
    // setPaperInfo(submissionList);
    loadingStatus.value = true;
  });
}
function getAllSubmission() {
  isAllOrMy.value = 1;
  console.log("getAllSubmission");
  getAllReviewedByVerifierId(ReqPage1).then(function (res) {
    if (res.code != 200) {
      submissionPaperList.value = listLast;
      return;
    }
    paperList.value = res.data.records;
    ReqPage1.pageNum = res.data.current;
    ReqPage1.pageSize = res.data.size;
    pageTotal.value = res.data.total;
    console.log(paperList.value);
    // setPaperInfo(submissionList);
    loadingStatus.value = true;
  });
}
// function setPaperInfo(submissionList: any) {
//   submissionPaperList.value = [];
//   for (let i = 0; i < submissionList.length; i++) {
//     const sub = new paperInfo();
//     sub.setSubmissionId(submissionList[i].submission.submissionId);
//     sub.setComments(submissionList[i].paperRoughly.paperComments);
//     sub.setAuthorList(submissionList[i].paperRoughly.paperAuthors.split(";"));
//     sub.setPaperTitle(submissionList[i].paperRoughly.paperTitle);
//     sub.setAbstract(submissionList[i].paperRoughly.paperAbstract);
//     sub.submitDate = moment(submissionList[i].paperRoughly.paperCreateTime).format("YYYY-MM-DD");
//     const paperLink = {
//       link: "http://127.0.0.1/submission?submissionId=" + submissionList[i].submission.submissionId,
//       name: submissionList[i].paperRoughly.paperIdentifier
//     };
//     sub.paperLink = paperLink;
//     submissionList[i].fileList.forEach((element: any) => {
//       let file = {
//         type: element.fileType.replace(".", ""),
//         link: element.fileUrl
//       };
//       sub.paperFileList.push(file);
//     });
//     sub.subjectList.push(submissionList[i].paperRoughly.subject);
//     submissionList[i].paperRoughly.priAndSecDetailList.forEach((element: any) => {
//       sub.subjectList.push(element.categorySecondary);
//     });
//     submissionPaperList.value.push(sub);
//   }
//   console.log(submissionPaperList);
// }
</script>
<style scoped lang="scss">
@import "./index.scss";
@import "../../utils/css/loading.scss";
</style>
