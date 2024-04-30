<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="drawerProps.row!.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="drawerProps.row!.userAccount" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="drawerProps.row!.userEmail" clearable></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="userCountry">
        <el-input v-model="drawerProps.row!.userCountry" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="drawerProps.row!.userPassword" clearable></el-input>
      </el-form-item>
      <el-form-item label="组织" prop="userOrganization">
        <el-input v-model="drawerProps.row!.userOrganization" clearable></el-input>
      </el-form-item>
      <el-form-item label="职业状态" prop="careerStatus">
        <el-input v-model="drawerProps.row!.careerStatus" clearable></el-input>
      </el-form-item>
      <el-form-item label="学科" prop="subject">
        <el-input v-model="drawerProps.row!.subject" clearable></el-input>
      </el-form-item>
      <el-form-item label="个人链接" prop="userHomePage">
        <el-input v-model="drawerProps.row!.userHomePage" clearable></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="userCreateTime">
        <el-input v-model="drawerProps.row!.userCreateTime" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="简介" prop="adminVerifierIntroduce"> -->
      <!-- <el-input v-model="drawerProps.row!.adminVerifierIntroduce" placeholder="请填写审核员简介" clearable></el-input> -->
      <!-- <el-input
          v-model="drawerProps.row!.adminVerifierIntroduce"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请填写审核员简介"
          clearable
        />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";

// const rules = reactive({
//   subject: [{ required: false, message: "请选择审核学科" }],
//   adminVerifierName: [{ required: true, message: "请填写审核员姓名" }],
//   adminVerifierAccount: [{ required: true, message: "请输入一个审核员账号" }],
//   adminVerifierPassword: [{ required: true, message: "请输入一个初始密码" }],
//   adminVerifierEmail: [{ required: true, message: "请输入邮箱" }],
//   adminVerifierIntroduce: [{ required: true, message: "请填写审核员简介" }]
// });

interface DrawerProps {
  title: string;
  isView: boolean;
  row: any;
  api?: (params: any) => Promise<any>;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});
// 调用父组件方法
const emit = defineEmits(["call"]);

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}成功！` });
      // 刷新列表
      emit("call");
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
