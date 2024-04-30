<template>
  <div style="width: 100%">
    <div class="submissionItem">
      <div class="raw">
        <!-- [{{ index + 1 }}] <router-link type="primary" to="/paperDetail">{{ paperInfo.paperLink.name }}</router-link> -->
        [{{ index + 1 }}]
        <el-link @click="gotoPaperDetail(paperInfo.id, JSON.stringify(paperInfo))" type="primary">{{
          paperInfo.identifier
        }}</el-link
        >[
        <!-- <template v-for="(item, i) in paperInfo.paperDto.fileList" :key="i">
          <el-link type="primary">{{ item.suffix + ", " }}</el-link>
        </template> -->

        <el-popover placement="right" :width="400" effect="dark" trigger="click">
          <template #reference>
            <span>
              <el-link @click="flag = true" type="primary">pdf</el-link>,<el-link @click="flag = false" type="primary"
                >other</el-link
              >
            </span>
          </template>
          <template v-for="(item, i) in paperInfo.paperDto.fileList" :key="i">
            <el-link @click="btnClick(item.cid, item.name, false)" v-if="item.suffix == 'pdf' && flag == true" type="primary">{{
              item.name
            }}</el-link
            ><br />
            <el-link @click="btnClick(item.cid, item.name, true)" v-if="item.suffix != 'pdf' && flag == false" type="primary">{{
              item.name
            }}</el-link
            ><br />
          </template>
        </el-popover>

        ]
      </div>
      <div class="raw">
        <b>{{ paperInfo.paperDto.name }}</b>
      </div>
      <div class="raw">
        <b>Subjects:</b>
        {{ paperInfo.paperDto.primaryCategory.name + "," }}
        <template v-for="(item, i) in paperInfo.paperDto.crossCategoryList" :key="i">
          {{ item.name + ", " }}
        </template>
      </div>
      <div class="raw">
        <b>Authors:</b>
        <!-- <template v-for="(item, i) in paperInfo.paperDto.authors" :key="i">
          <el-link type="primary">{{ item + ", " }}</el-link>
        </template> -->
        <el-link type="primary">{{ paperInfo.paperDto.authors }}</el-link>
      </div>
      <div class="raw">
        <div style="word-break: break-all; word-wrap: break-word">
          <b>Abstract: </b>{{ data.isExpand ? paperInfo.paperDto.abstracts : capitalize(paperInfo.paperDto.abstracts) }}
          <span :hidden="expandVisible" @click="expandClick()" style="color: coral">
            {{ data.isExpand ? "收起" : "展开 " }}
          </span>
        </div>
      </div>
      <div class="raw"><b>SubmitDate:</b> {{ moment(paperInfo.paperDto.updateDate).format("YYYY-MM-DD") }}</div>
      <div v-if="paperInfo.paperDto.comments != undefined || paperInfo.paperDto.comments != null" class="raw">
        <b>Comments:</b> {{ paperInfo.paperDto.comments }}
      </div>
      <div class="btn raw">
        <el-popconfirm
          width="220"
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Are you sure this is qualified?"
          @confirm="checkSuccess()"
        >
          <template #reference>
            <el-button type="primary" style="width: 100px">审核通过</el-button>
          </template>
        </el-popconfirm>

        <el-popover :visible="visible" placement="top" :width="200">
          <el-input
            v-model="rejectReason"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="拒绝理由"
            clearable
          />
          <div style="margin: 0; text-align: right">
            <el-button size="small" style="margin-top: 5px" text @click="visible = false">cancel</el-button>
            <el-button size="small" type="primary" style="margin-top: 5px" @click="onHold()">confirm</el-button>
          </div>
          <template #reference>
            <el-button type="danger" style="width: 100px" @click="visible = true">拒绝</el-button>
          </template>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="submissionItem">
import { InfoFilled } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { paperAudit } from "@/api/modules/paper";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { downloadFile } from "@/api/modules/file";
import moment from "moment";
let router = useRouter();
let rejectReason = ref("");
let visible = ref(false);
let expandVisible = ref(false);

const flag = ref(true);

function checkSuccess() {
  // let u: string | null = localStorage.getItem("userInfo");
  // console.log(u);
  // if (u == null) return;
  // let userId = JSON.parse(u).id;
  // console.log("userId: " + userId);

  paperAudit({
    paperId: props.paperInfo.paperDto.id,
    auditCode: 1003,
    feedback: "审核通过"
  }).then(function (res) {
    console.log(res);
    emit("refresh");
  });
  emit("refresh");
}

function onHold() {
  if (rejectReason.value == "") {
    ElMessage({
      showClose: true,
      message: "必须填写拒绝理由！",
      type: "warning"
    });
    return;
  }
  visible.value = false;
  // let u: string | null = localStorage.getItem("userInfo");
  // console.log(u);
  // if (u == null) return;
  // let userId = JSON.parse(u).id;
  paperAudit({
    paperId: props.paperInfo.paperDto.id,
    auditCode: 1004,
    feedback: rejectReason.value
  }).then(function (res) {
    console.log(res);
    emit("refresh");
  });
}
let data = reactive({
  abstract:
    "Humans can easily understand a single image as depicting multiple potential objects permitting interaction. We use this skill to plan our interactions with the world and accelerate understanding new objects without engaging in interaction. In this paper, we would like to endow machines with the similar ability, so that intelligent agents can better explore the 3D scene or manipulate objects. Our approach is a transformer-based model that predicts the 3D location, physical properties and affordance of objects. To power this model, we collect a dataset with Internet videos, egocentric videos and indoor images to train and validate our approach. Our model yields strong performance on our data, and generalizes well to robotics data.",
  isExpand: false
});
// 获取父组件方法
const emit = defineEmits(["refresh"]);
// 获取父组件传值
const props = defineProps({
  paperInfo: {
    type: Object, //类型字符串
    default: null //如果没有传递msg参数,默认值是这个
  },
  index: {
    type: Number,
    default: null
  }
});
// 控制摘要文本的收缩与展开字数
function capitalize(abstract: string) {
  if (!abstract) return "";
  if (abstract.length > 500) {
    expandVisible.value = false;
    return abstract.substring(0, 500);
  } else {
    return abstract;
  }
  console.log(abstract);
}
// 控制摘要文本的收缩与展开
function expandClick() {
  data.isExpand = !data.isExpand;
}
function gotoPaperDetail(submissionId: any, paperInfo: any) {
  console.log(paperInfo);
  router.push({ path: "/paperDetail", query: { submissionId: submissionId, paperInfo: paperInfo } });
}

function btnClick(cid, fileName, flag) {
  downloadFile(cid).then(res => {
    // fileDownload(res, 'xxx.pdf'
    console.log(res);
    let blob = new Blob([res], {
      type: res["type"]
    }); // 获取请求返回的response对象中的blob 设置文件类型

    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    if (flag) {
      a.click();
    } else {
      window.open(url);
    }
    // a.click();
    // window.open(url);
    window.URL.revokeObjectURL(url); //释放blob对象
  });
}
</script>

<style scoped lang="scss">
@import "./submissionItem.scss";
</style>
