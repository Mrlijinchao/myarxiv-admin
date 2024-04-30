<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="title">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps">
      <el-form-item label="学科名称" prop="subjectName">
        <el-input v-model="drawerProps.subjectName" placeholder="请填写学科名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="subjectDescription">
        <!-- <el-input v-model="drawerProps.row!.adminVerifierIntroduce" placeholder="请填写审核员简介" clearable></el-input> -->
        <el-input
          v-model="drawerProps.subjectDescription"
          :autosize="{ minRows: 6, maxRows: 10 }"
          type="textarea"
          placeholder="请填写学科简介"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { addSubject, editSubjectInfo } from "../../../../../api/modules/admin";

const rules = reactive({
  subjectName: [{ required: true, message: "请填写学科名称" }],
  subjectDescription: [{ required: true, message: "请填写学科简介" }]
});

const drawerVisible = ref(false);

const editOrAdd = ref();

const title = ref("");

const drawerProps = reactive({
  subjectId: -1,
  subjectName: "",
  subjectDescription: ""
});

// 调用父组件方法
const emit = defineEmits(["call"]);

const cancel = () => {
  drawerProps.subjectDescription = "";
  drawerProps.subjectName = "";
  drawerVisible.value = false;
};

function handleSubmit() {
  if (editOrAdd.value == 0) {
    addSubject(drawerProps).then(() => {
      emit("call");
      drawerVisible.value = false;
      drawerProps.subjectDescription = "";
      drawerProps.subjectName = "";
    });
  } else {
    editSubjectInfo(drawerProps).then(res => {
      emit("call");
      drawerVisible.value = false;
      console.log(res);
      drawerProps.subjectDescription = "";
      drawerProps.subjectName = "";
      drawerProps.subjectId = -1;
      console.log("修改成功");
    });
  }
}

function acceptParams(param: any) {
  drawerVisible.value = true;
  editOrAdd.value = param.editOrAdd;
  drawerProps.subjectId = param.subjectId;
  drawerProps.subjectDescription = param.subjectDescription;
  drawerProps.subjectName = param.subjectName;
  console.log("dfvfv: " + param.subjectId);
  if (editOrAdd.value == 0) {
    title.value = "新增学科";
  } else {
    title.value = "编辑学科";
  }
}
defineExpose({
  acceptParams
});
</script>
