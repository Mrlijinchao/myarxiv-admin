<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus" style="width: 100%">
      <div>
        <el-table :data="filterTableData" style="width: 100%">
          <el-table-column label="num" prop="userId" />
          <el-table-column label="account" prop="userAccount" />
          <el-table-column label="name" prop="userName" />
          <el-table-column label="email" prop="userEmail" />
          <el-table-column label="accountStatus" prop="userStatus" />
          <el-table-column>
            <template #header>
              <el-input v-model="search" size="small" placeholder="enter userAccount to search" />
            </template>
            <template #default="scope">
              <el-button size="small" type="primary" @click="openDrawer('详情', scope.row)">详情</el-button>
              <el-button size="small" @click="frozenAccount(scope.row)">封号</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">永久删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <UserDrawer @call="getUsers" ref="drawerRef" />
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
import { getAllUsers, frozenUserAccount, deleteUserAccount } from "../../api/modules/admin";
import { user } from "../../domain/user";
import UserDrawer from "./components/UserDrawer.vue";
import moment from "moment";
import { ElMessage } from "element-plus";
let loadingStatus = ref(false);
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(data => !search.value || data.userAccount.toLowerCase().includes(search.value.toLowerCase()))
);
// const handleEdit = (index: number, row: verifier) => {
//   console.log(index, row);
// };
// 删除用户
const handleDelete = (index: number, row: user) => {
  console.log(index);
  console.log(row.userId);
  deleteUserAccount({ userId: row.userId }).then(function (data) {
    console.log(data);
    getUsers();
  });
};
// 封号
const frozenAccount = (row: user) => {
  console.log("userId：" + row.userId);
  frozenUserAccount({ userId: row.userId }).then(function (data) {
    console.log(data);
    if (data.meta.status == 400) {
      ElMessage.error({ message: `封号失败！` });
      return;
    }
    getUsers();
    ElMessage.success({ message: `封号成功！` });
  });
};
let list: user[] = [];
let tableData = toRef(list);
onMounted(() => {
  getUsers();
});

// // 添加审核员
// function addOneVerifier() {
//   // addVerifier({});
//   console.log("添加审核员");
// }

// 获取审核员
function getUsers() {
  tableData.value = [];
  console.log("获取用户");
  getAllUsers().then(function (data) {
    console.log(data);
    for (let i = 0; i < data.message.length; i++) {
      let user = {
        userId: data.message[i].userId,
        userAccount: data.message[i].userAccount,
        userName: data.message[i].userName,
        userEmail: data.message[i].userEmail,
        userPassword: data.message[i].userPassword,
        userCountry: data.message[i].userCountry,
        userOrganization: data.message[i].userOrganization,
        careerStatus: data.message[i].careerStatus,
        userCreateTime: moment(data.message[i].userCreateTime).format("YYYY-MM-DD"),
        subject: data.message[i].subject,
        defaultCategory: data.message[i].defaultCategory,
        userHomePage: data.message[i].userHomePage,
        userStatus: data.message[i].userStatus == 0 ? "正常" : "封号"
      };
      tableData.value.push(user);
      loadingStatus.value = true;
    }
    console.log(tableData);
  });
}

// 打开 drawer
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: any = {}) => {
  const params = {
    title,
    isView: title === "详情",
    row: { ...row },
    api: undefined
  };
  drawerRef.value?.acceptParams(params);
};
</script>
<style>
@import "../../utils/css/loading.scss";
</style>
