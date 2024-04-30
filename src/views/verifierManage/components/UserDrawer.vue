<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}审核员`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="审核学科" prop="subject">
        <el-select v-model="drawerProps.row!.affiliationSubjectId" placeholder="Select">
          <el-option v-for="item in options" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="adminVerifierName">
        <el-input v-model="drawerProps.row!.adminVerifierName" placeholder="请填写审核员姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="adminVerifierAccount">
        <el-input v-model="drawerProps.row!.adminVerifierAccount" placeholder="请填审核员账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="adminVerifierPassword">
        <el-input v-model="drawerProps.row!.adminVerifierPassword" placeholder="请填写审核员账号密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="adminVerifierEmail">
        <el-input v-model="drawerProps.row!.adminVerifierEmail" placeholder="请填写审核员邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="adminVerifierIntroduce">
        <!-- <el-input v-model="drawerProps.row!.adminVerifierIntroduce" placeholder="请填写审核员简介" clearable></el-input> -->
        <el-input
          v-model="drawerProps.row!.adminVerifierIntroduce"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请填写审核员简介"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { getSubjectList } from "../../../api/modules/common";

const rules = reactive({
  subject: [{ required: false, message: "请选择审核学科" }],
  adminVerifierName: [{ required: true, message: "请填写审核员姓名" }],
  adminVerifierAccount: [{ required: true, message: "请输入一个审核员账号" }],
  adminVerifierPassword: [{ required: true, message: "请输入一个初始密码" }],
  adminVerifierEmail: [{ required: true, message: "请输入邮箱" }],
  adminVerifierIntroduce: [{ required: true, message: "请填写审核员简介" }]
});

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
  if (drawerProps.value.row!.affiliationSubjectId == null) {
    ElMessage.warning({ message: `请选择学科` });
    return;
  }
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}审核员成功！` });
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
// interface subjectObj {
//   subjectId: number;
//   subjectName: string;
// }
let options = reactive([
  {
    subjectId: 0,
    subjectName: ""
  }
]);

function getSubject() {
  getSubjectList().then(res => {
    options = res.message;
    console.log(options);
  });
}
onMounted(() => {
  getSubject();
});
</script>
