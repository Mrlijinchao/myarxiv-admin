<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus" style="width: 95%">
      <div class="subjectBody">
        <div class="topBar">
          <el-button type="primary" @click="addNewSubject">添加新的学科</el-button>
        </div>
        <template v-for="(item, i) in subjectList" :key="i">
          <div class="subjectBox">
            <div class="titleBar">
              <div style="margin-top: 5px; margin-left: 5px"><b>学科：</b>{{ item.subjectName }}</div>
              <div style="margin-top: 5px; margin-left: 5px">
                <b>创建时间：</b>{{ moment(item.subjectCreateTime).format("YYYY-MM-DD") }}
              </div>
            </div>
            <div style="margin-top: 5px; margin-left: 5px">
              <span><b>描述：</b></span>
              {{ item.subjectDescription }}
            </div>
            <div style="margin-top: 5px; margin-left: 5px">
              <router-link type="primary" to="/dataDictionary/categoryManage">{{ item.subjectName }}分类详情</router-link>
            </div>
            <div class="btn">
              <el-button type="warning" @click="editSubject(item)">修改学科信息</el-button>
              <el-popover
                ref="popover"
                placement="top"
                title="注意"
                :width="200"
                trigger="focus"
                content="由于删除学科会带来很大的影响，所以此接口暂时不开放"
              >
                <template #reference>
                  <el-button type="danger" @click="deleteSubject(item.subjectId)">删除学科</el-button>
                </template>
              </el-popover>
            </div>
          </div>
        </template>
      </div>
      <SubjectDrawer @call="getCategory" ref="drawerRef"></SubjectDrawer>
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
<script setup lang="ts">
import { onMounted, toRef, ref } from "vue";
import { getCategoryInfo } from "../../../../api/modules/admin";
import moment from "moment";
import SubjectDrawer from "./components/SubjectDrawer.vue";
let loadingStatus = ref(false);
let list: any[] = [];
let subjectList = toRef(list);
// const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
onMounted(() => {
  getCategory();
});
function getCategory() {
  getCategoryInfo().then((res: any) => {
    console.log(res);
    subjectList.value = res.message;
    console.log(subjectList);
    loadingStatus.value = true;
  });
}

function deleteSubject(subjectId: any) {
  console.log(subjectId);
}

function editSubject(params: any) {
  console.log("bbbbb:" + params.subjectId);
  drawerRef.value?.acceptParams({
    editOrAdd: 1,
    subjectId: params.subjectId,
    subjectDescription: params.subjectDescription,
    subjectName: params.subjectName
  });
}

const drawerRef = ref<InstanceType<typeof SubjectDrawer> | null>(null);
function addNewSubject() {
  drawerRef.value?.acceptParams({ editOrAdd: 0, subjectId: null, subjectDescription: "", subjectName: "" });
}
</script>
<style lang="scss">
@import "../../../../utils/css/loading.scss";
@import "./index.scss";
</style>
