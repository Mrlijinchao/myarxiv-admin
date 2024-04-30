<template>
  <div class="home card">
    <div class="homePage">
      <div class="userInfo">
        <template v-if="userInfo.isAdmin == '0'">
          <el-row :gutter="12">
            <el-col :span="40">
              <el-card shadow="Hover" style="background-color: cornflowerblue">
                <span
                  ><b>{{ "审核学科：" + subject?.name }}</b></span
                >
              </el-card>
            </el-col>
          </el-row>
        </template>
        <el-row :gutter="12">
          <el-col :span="40">
            <el-card shadow="Hover" style="background-color: cornflowerblue">
              <span
                ><b>{{ userInfo?.isAdmin == "1" ? "管理员账号：" : "审核员账号：" }}</b
                >{{ userInfo.code }}</span
              >
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="40">
            <el-card shadow="Hover" style="background-color: chocolate">
              <span
                ><b>{{ userInfo?.isAdmin == "1" ? "管理员邮箱：" : "审核员邮箱：" }}</b
                >{{ userInfo.email }}</span
              >
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="40">
            <el-card shadow="Hover" style="background-color: bisque">
              <span
                ><b>{{ userInfo?.isAdmin == "1" ? "管理员姓名：" : "审核员姓名：" }}</b
                >{{ userInfo.name }}</span
              >
            </el-card>
          </el-col>
          <el-col :span="40">
            <el-card shadow="Hover" style="background-color: gray">
              <span style="word-break: break-all; word-wrap: break-word"
                ><b>{{ userInfo?.isAdmin == "1" ? "管理员简介：" : "审核员简介：" }}</b
                >{{ userInfo.description }}</span
              >
            </el-card>
          </el-col>
        </el-row>
      </div>
      <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted, ref } from "vue";
let subject = ref({
  subjectId: 0,
  subjectName: "",
  subjectDescription: "",
  subjectCreateTime: ""
});
let userInfo = ref({
  adminVerifierAccount: "",
  adminVerifierName: "",
  adminVerifierEmail: "",
  isAdmin: "",
  adminVerifierIntroduce: ""
});
onMounted(() => {
  getUserInfo();
});
function getUserInfo() {
  let u: string | null = localStorage.getItem("userInfo");
  console.log(u);
  if (u == null) return;
  userInfo.value = JSON.parse(u);
  let sub: string | null = localStorage.getItem("subject");
  if (sub == null) return;
  console.log(sub);
  subject.value = JSON.parse(sub);
  console.log(subject);
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
