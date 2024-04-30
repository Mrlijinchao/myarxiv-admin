<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus">
      <div class="topArea">
        <div class="topBar">
          <span class="text title"> 审核论文 🍓🍇🍈🍉</span>
          <div class="pageBar">
            <pageBar @page="pageRequest" :total="pageTotal"></pageBar>
          </div>
        </div>
      </div>
      <div class="paperBody">
        <!-- <template v-for="(item, i) in submissionPaperList" :key="i"> -->
        <template v-for="(item, i) in submissionList" :key="i">
          <submissionItem :index="i" :paperInfo="item" @refresh="getSubmission"></submissionItem>
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
import { getSubmissionList, getUnreviewedSubmissionBySubjectId } from "../../api/modules/submission";
let loadingStatus = ref(false);
let pageTotal = ref();
let submissionList = ref([]);
let list: paperInfo[] = [];
let submissionPaperList = toRef(list);
let listLast: paperInfo[] = [];
const ReqPage = reactive({
  pageSize: 4,
  pageNum: 1
  // orderByCode: 0
});
let userInfo = reactive({
  isAdmin: "",
  subjectId: 0
});

function pageRequest(page: any) {
  console.log("父组件:" + page);

  ReqPage.pageNum = page.pageNum;
  ReqPage.pageSize = page.pageSize;
  getSubmission();
}
onMounted(() => {
  setUserInfo();
  getSubmission();
});
function setUserInfo() {
  let sub: string | null = localStorage.getItem("subject");
  if (sub == null) return;
  console.log(sub);
  let subject = JSON.parse(sub);
  userInfo.subjectId = subject.id;
  let isAdmin: string | null = localStorage.getItem("isAdmin");
  if (isAdmin == null) return;
  userInfo.isAdmin = isAdmin;
}
function getSubmission() {
  console.log("isAdmin: " + userInfo.isAdmin);
  console.log("subjectId: " + userInfo.subjectId);
  if (userInfo.isAdmin == "0") {
    getUnreviewedSubmissionBySubjectId({
      pageNum: ReqPage.pageNum,
      pageSize: ReqPage.pageSize,
      subjectId: userInfo.subjectId
    }).then(function (res) {
      if (res.code != 200) {
        submissionPaperList.value = listLast;
        return;
      }
      submissionList.value = res.data.records;
      ReqPage.pageNum = res.data.current;
      ReqPage.pageSize = res.data.size;
      pageTotal.value = res.data.total;
      console.log(submissionList.value);
      // setPaperInfo(submissionList);
      loadingStatus.value = true;
    });
  } else {
    getSubmissionList(ReqPage).then(function (res) {
      // console.log(res);
      if (res.code != 200) {
        submissionPaperList.value = listLast;
        return;
      }
      console.log(res.data.records);
      submissionList.value = res.data.records;
      ReqPage.pageNum = res.data.current;
      ReqPage.pageSize = res.data.size;
      pageTotal.value = res.data.total;
      console.log(submissionList.value);
      // setPaperInfo(submissionList);
      loadingStatus.value = true;
    });
  }
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
