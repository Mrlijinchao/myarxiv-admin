<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <el-input type="password" v-model="oldPassword" placeholder="请输入原密码" clearable />
    <el-input type="password" v-model="newPassword" placeholder="请输入新密码" clearable />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="modPassword()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import md5 from "js-md5";
import { changeUserInfo } from "../../../../api/modules/verifier";

const oldPassword = ref("");
const newPassword = ref("");

let verifier = reactive({
  adminVerifierId: 0,
  adminVerifierAccount: "",
  adminVerifierName: "",
  adminVerifierEmail: "",
  isAdmin: "",
  adminVerifierPassword: "",
  adminVerifierIntroduce: ""
});

function modPassword() {
  if (verifier.adminVerifierPassword != md5(oldPassword.value)) {
    ElMessage({
      showClose: true,
      message: "您输入的原密码不正确！",
      type: "warning"
    });
    return;
  }
  changeUserInfo({ adminVerifierId: verifier.adminVerifierId, adminVerifierPassword: md5(newPassword.value) }).then(() => {
    ElMessage({
      showClose: true,
      message: "密码修改成功！",
      type: "success"
    });
    verifier.adminVerifierPassword = md5(newPassword.value);
    localStorage.setItem("userInfo", JSON.stringify(verifier));
    dialogVisible.value = false;
    oldPassword.value = "";
    newPassword.value = "";
    console.log(verifier);
  });
}
function cancel() {
  dialogVisible.value = false;
  oldPassword.value = "";
  newPassword.value = "";
}

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
  console.log(JSON.parse(u));
});

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
