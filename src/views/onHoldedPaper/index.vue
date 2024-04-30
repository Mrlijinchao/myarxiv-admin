<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus">
      <div class="topArea">
        <div class="topBar">
          <span class="text"> 已拒绝的论文 🍓🍇🍈🍉</span>
          <div class="pageBtn">
            <div class="paperChange">
              <template v-if="isAdmin == '1'">
                <div class="btnBox">
                  <el-button type="primary" @click="getMyOnHoldSubmission()" plain>我拒绝的论文</el-button>
                </div>
                <div class="btnBox">
                  <el-button type="primary" @click="getAllOnHoldSubmission()" plain>全部已拒绝的论文</el-button>
                </div>
              </template>
            </div>
            <div class="pageBar">
              <pageBar @page="pageRequest" :total="pageTotal"></pageBar>
            </div>
          </div>
        </div>
      </div>
      <div class="paperBody">
        <template v-for="(item, i) in paperList" :key="i">
          <!-- <template v-for="(item, i) in [1, 2, 3, 4, 5]" :key="i"> -->
          <submissionItem :index="i" :paperInfo="item" @refresh="getMyOnHoldSubmission"></submissionItem>
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
import { onBeforeMount, onMounted, reactive, toRef, ref } from "vue";
// import { ResponsePage, RequestPage } from "@/api/interface/index";
import { queryPaper } from "@/api/modules/paper";
let loadingStatus = ref(false);
let isAdmin = ref("");
let verifierId = ref(0);
let paperList = reactive({});
let list: paperInfo[] = [];
let submissionPaperList = toRef(list);
let listLast: paperInfo[] = [];
let pageTotal = ref();
let isAllOrMy = ref(0);
const ReqPage = reactive({
  pageSize: 4,
  pageNum: 1,
  auditCode: "1004",
  userId: null
});

function pageRequest(page: any) {
  console.log("父组件:" + page);
  if (isAllOrMy.value == 0) {
    ReqPage.pageNum = page.pageNum;
    ReqPage.pageSize = page.pageSize;
    ReqPage.userId = verifierId.value;
    getMyOnHoldSubmission();
  } else {
    ReqPage.pageNum = page.pageNum;
    ReqPage.pageSize = page.pageSize;
    getAllOnHoldSubmission();
  }
}

// 其他的生命周期
onBeforeMount(() => {
  let u: string | null = localStorage.getItem("userInfo");
  console.log(u);
  if (u == null) return null;
  isAdmin.value = JSON.parse(u).isAdmin;
  verifierId.value = JSON.parse(u).id;
  console.log("verifierId" + verifierId.value);
});
onMounted(() => {
  getMyOnHoldSubmission();
  loadingStatus.value = true;
});
function getMyOnHoldSubmission() {
  isAllOrMy.value = 0;
  let u: string | null = localStorage.getItem("userInfo");
  if (u == null) return;
  console.log(JSON.parse(u));
  verifierId.value = JSON.parse(u).id;
  console.log("getMySubmission");
  console.log(verifierId.value);
  ReqPage.verifierId = verifierId.value;
  queryPaper(ReqPage).then(function (res) {
    if (res.code != 200) {
      submissionPaperList.value = listLast;
      loadingStatus.value = true;
      return;
    }
    paperList = res.data.records;
    ReqPage.pageNum = res.data.current;
    ReqPage.pageSize = res.data.size;
    pageTotal.value = res.data.total;
    loadingStatus.value = true;
  });
}
function getAllOnHoldSubmission() {
  isAllOrMy.value = 1;
  console.log("getAllSubmission");
  ReqPage.verifierId = null;
  queryPaper(ReqPage).then(function (res) {
    if (res.code != 200) {
      submissionPaperList.value = listLast;
      loadingStatus.value = true;
      return;
    }
    paperList = res.data.records;
    ReqPage.pageNum = res.data.current;
    ReqPage.pageSize = res.data.size;
    pageTotal.value = res.data.total;
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
