<template>
  <div class="card content-box">
    <div :hidden="!loadingStatus" style="width: 90%" class="custom-tree-container">
      <p>Using scoped slot</p>
      <el-tree
        :data="dataSource"
        icon="Setting"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        highlight-current="true"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-popover :visible="visibleSign == node.label" placement="top" :width="400" trigger="click">
                <template #reference>
                  <el-button type="primary" style="margin-left: 8px" @click="visibleSign = node.label"> Append </el-button>
                </template>
                <input v-model.trim="text" type="text" placeholder="Please Input" />
                <el-button @click="append(node, data)">confirm</el-button>
                <el-button @click="appendCancel()">cancel</el-button>
              </el-popover>
              <el-popover :visible="visibleSignDelete == node.label" placement="top" :width="160" trigger="click">
                <p style="color: red">谨慎删除，因为这可能已经关联论文了</p>
                <div style="margin: 0; text-align: right">
                  <el-button size="small" text @click="visibleSignDelete = ' '">cancel</el-button>
                  <el-button size="small" type="primary" @click="removeCategory(node, data)">confirm</el-button>
                </div>
                <template #reference>
                  <el-button type="danger" @click="visibleSignDelete = node.label">Delete</el-button>
                </template>
              </el-popover>
            </span>
          </span>
        </template>
      </el-tree>
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

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type Node from "element-plus/es/components/tree/src/model/node";
import { getCategoryInfo, addCategoryInfo, removeCategoryInfo } from "../../../../api/modules/admin";
import { ElMessage } from "element-plus";
let loadingStatus = ref(false);
let text = ref();
const visibleSign = ref(" ");
const visibleSignDelete = ref(" ");
interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}
let id = 1000;

// const updateKeyChildren = (node: any, data: Tree) => {
//   visibleSign.value = " ";
//   console.log(text.value);
//   console.log(node);
//   console.log(data);
//   text.value = "";
// };

const append = (node: Node, data: Tree) => {
  // 层数限制
  if (node.parent != null) {
    if (node.parent.parent != null) {
      if (node.parent.parent.parent != null) {
        visibleSign.value = " ";
        text.value = "";
        ElMessage({
          showClose: true,
          message: "层数超出规定值，添加失败！",
          type: "warning"
        });
        return;
      }
    }
  }
  // 检查是否为空字符串
  if (text.value == "" || text.value == null) {
    ElMessage({
      showClose: true,
      message: "输入不能为空！",
      type: "warning"
    });
    return;
  }

  visibleSign.value = " ";
  console.log(text.value);
  console.log(data);
  const newChild = { id: id++, label: text.value, children: [] };
  // if (!data.children) {
  //   data.children = [];
  // }
  // data.children.push(newChild);
  // dataSource.value = [...dataSource.value];
  // text.value = "";
  addCategory(node, newChild, data);
};
// 取消添加
const appendCancel = () => {
  visibleSign.value = " ";
  text.value = "";
};
// 添加分类
const addCategory = (node: Node, newNode: Tree, data: Tree) => {
  console.log(node);
  console.log(newNode);
  let str: string = node.data.id;
  if (node.parent != null && node.parent.data.id != null) {
    str = node.parent.data.id + "," + str;
  }
  console.log(str);
  addCategoryInfo({
    categoryStr: str,
    text: newNode.label
  }).then(function (res: any) {
    console.log(res.message);
    newNode.id = res.message.categorySecondaryId;
    if (!data.children) {
      data.children = [];
    }
    data.children.push(newNode);
    dataSource.value = [...dataSource.value];
    text.value = "";
    getCateInfo();
  });
};
// 删除
const remove = (node: Node, data: Tree) => {
  visibleSignDelete.value = " ";
  const parent = node.parent;
  const children: Tree[] = parent.data.children || parent.data;
  const index = children.findIndex(d => d.id === data.id);
  children.splice(index, 1);
  dataSource.value = [...dataSource.value];
};
// 移除分类
const removeCategory = (node: Node, data: Tree) => {
  console.log(node);
  let str: string = node.data.id + "";
  if (node.parent != null && node.parent.data.id != null) {
    str = node.parent.data.id + "," + str;
    if (node.parent.parent != null && node.parent.parent.data.id != null) {
      str = node.parent.parent.data.id + "," + str;
    }
  }
  if (str.length == 1) {
    visibleSignDelete.value = " ";
    ElMessage({
      showClose: true,
      message: "不能在这里删除学科，请去学科操作页面删除！",
      type: "warning"
    });
    return;
  }
  console.log(typeof str);
  console.log(str);
  remove(node, data);
  removeCategoryInfo({
    categoryStr: str
  }).then(function (res: any) {
    console.log(res);
    remove(node, data);
  });
};

// 获取分类信息
const getCateInfo = () => {
  getCategoryInfo().then(function (data: any) {
    console.log(data.message);
    dataSource.value = getName(data.message);
    console.log("渲染树：");
    console.log(dataSource.value);
    loadingStatus.value = true;
  });
};
function getName(list: any) {
  return list.map((v: any) => {
    return {
      id: v.subjectId || v.categoryPrimaryId || v.categorySecondaryId,
      label: v.subjectName || v.categoryPrimaryName || v.categorySecondaryName,
      children: v.categoryPrimary || v.categorySecondary?.length ? getName(v.categoryPrimary || v.categorySecondary) : null
    };
  });
}
onMounted(() => {
  getCateInfo();
});

const dataSource = ref<Tree[]>([]);
</script>

<style lang="scss">
@import "../../../../utils/css/loading.scss";
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;
}
</style>
