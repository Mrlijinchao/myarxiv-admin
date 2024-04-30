<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus" style="width: 98%">
      <div>
        <div class="topBar">
          <el-button type="danger" @click="openDrawer('新增')">添加审核员</el-button>
        </div>
        <el-table :data="filterTableData" style="width: 100%">
          <el-table-column label="num" prop="adminVerifierId" />
          <el-table-column label="account" prop="adminVerifierAccount" />
          <el-table-column label="name" prop="adminVerifierName" />
          <el-table-column label="email" prop="adminVerifierEmail" />
          <el-table-column>
            <template #header>
              <el-input v-model="search" size="small" placeholder="enter name to search" />
            </template>
            <template #default="scope">
              <el-button size="small" type="primary" @click="openDrawer('详情', scope.row)">Detail</el-button>
              <el-button size="small" @click="openDrawer('编辑', scope.row)">Edit</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <UserDrawer @call="getVerifiers" ref="drawerRef" />
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
<script setup lang="ts">
import { computed, ref, onMounted, toRef } from "vue";
import { getVerifierList, addVerifier, editVerifier, removeVerifier } from "../../api/modules/admin";
import { verifier } from "../../domain/verifier";
import UserDrawer from "./components/UserDrawer.vue";
let loadingStatus = ref(false);
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(data => !search.value || data.adminVerifierName.toLowerCase().includes(search.value.toLowerCase()))
);
// const handleEdit = (index: number, row: verifier) => {
//   console.log(index, row);
// };
// 删除审核员
const handleDelete = (index: number, row: verifier) => {
  console.log(index);
  console.log(row.adminVerifierId);
  removeVerifier({ adminVerifierId: row.adminVerifierId }).then(function (data) {
    console.log(data);
    getVerifiers();
  });
};
let list: verifier[] = [];
let tableData = toRef(list);
onMounted(() => {
  getVerifiers();
});

// // 添加审核员
// function addOneVerifier() {
//   // addVerifier({});
//   console.log("添加审核员");
// }

// 获取审核员
function getVerifiers() {
  tableData.value = [];
  console.log("获取审核员");
  getVerifierList().then(function (data) {
    console.log(data);
    for (let i = 0; i < data.message.length; i++) {
      let user = {
        adminVerifierId: data.message[i].adminVerifierId,
        adminVerifierAccount: data.message[i].adminVerifierAccount,
        adminVerifierName: data.message[i].adminVerifierName,
        adminVerifierEmail: data.message[i].adminVerifierEmail,
        isAdmin: data.message[i].isAdmin,
        adminVerifierPassword: data.message[i].adminVerifierPassword,
        adminVerifierIntroduce: data.message[i].adminVerifierIntroduce,
        affiliationSubjectId: data.message[i].affiliationSubjectId
      };
      tableData.value.push(user);
      loadingStatus.value = true;
    }
    console.log(tableData);
  });
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: any = {}) => {
  const params = {
    title,
    isView: title === "详情",
    row: { ...row },
    api: title === "新增" ? addVerifier : title === "编辑" ? editVerifier : undefined
  };
  drawerRef.value?.acceptParams(params);
};
</script>
<style>
@import "./index.scss";
@import "../../utils/css/loading.scss";
</style>
