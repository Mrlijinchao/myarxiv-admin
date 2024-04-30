<template>
  <div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 2, 3, 4]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts" name="pageBar">
import { ref, reactive } from "vue";

const currentPage = ref(1);
const pageSize = ref(4);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
let pageParam = reactive({
  pageSize: 4,
  pageNum: 1
});
// 获取父组件方法
const emit = defineEmits(["page"]);
// 获取父组件传值
defineProps({
  total: {
    type: Object, //类型字符串
    default: null //如果没有传递msg参数,默认值是这个
  }
});
const handleSizeChange = (val: number) => {
  pageParam.pageSize = val;
  pageSize.value = val;
  emit("page", pageParam);
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  pageParam.pageNum = val;
  emit("page", pageParam);
  console.log(`current page: ${val}`);
};
</script>

<style scoped></style>
