<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <div>
      <b>账号名称:</b
      ><el-input
        class="inputBar"
        :disabled="true"
        v-model="verifier.adminVerifierAccount"
        :placeholder="verifier.adminVerifierAccount"
        clearable
      ></el-input>
      <b>姓名:</b
      ><el-input
        class="inputBar"
        :disabled="isDisabled"
        v-model="verifier.adminVerifierName"
        :placeholder="verifier.adminVerifierName"
        clearable
      ></el-input>
      <b>邮箱:</b
      ><el-input
        class="inputBar"
        :disabled="isDisabled"
        v-model="verifier.adminVerifierEmail"
        :placeholder="verifier.adminVerifierEmail"
        clearable
      ></el-input>
      <b>简介:</b
      ><el-input
        class="inputBar"
        :disabled="isDisabled"
        v-model="verifier.adminVerifierIntroduce"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        :placeholder="verifier.adminVerifierIntroduce"
        clearable
      ></el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">关闭</el-button>
        <el-button @click="edit()">编辑</el-button>
        <el-button type="primary" @click="confirm()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { changeUserInfo } from "../../../../api/modules/verifier";
const isDisabled = ref(true);
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
let verifier = reactive({
  adminVerifierId: 0,
  adminVerifierAccount: "",
  adminVerifierName: "",
  adminVerifierEmail: "",
  isAdmin: "",
  adminVerifierPassword: "",
  adminVerifierIntroduce: ""
});
onMounted(() => {
  let u = localStorage.getItem("userInfo");
  if (u == null) {
    return;
  }
  verifier.adminVerifierId = JSON.parse(u).adminVerifierId;
  verifier.adminVerifierAccount = JSON.parse(u).adminVerifierAccount;
  verifier.adminVerifierName = JSON.parse(u).adminVerifierName;
  verifier.adminVerifierEmail = JSON.parse(u).adminVerifierEmail;
  verifier.isAdmin = JSON.parse(u).isAdmin;
  verifier.adminVerifierPassword = JSON.parse(u).adminVerifierPassword;
  verifier.adminVerifierIntroduce = JSON.parse(u).adminVerifierIntroduce;
});

function edit() {
  isDisabled.value = false;
}

function cancel() {
  dialogVisible.value = false;
  isDisabled.value = true;
}

function confirm() {
  if (isDisabled.value == true) {
    dialogVisible.value = false;
    return;
  }
  changeUserInfo(verifier).then(res => {
    console.log(res);
    localStorage.setItem("userInfo", JSON.stringify(verifier));
    console.log(verifier);
    dialogVisible.value = false;
    isDisabled.value = true;
  });
}

defineExpose({ openDialog });
</script>
<style lang="scss">
.inputBar {
  display: inline-block;
  margin-top: 3px;
}
</style>
