<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handleSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
    <div @mouseleave="active = -1" class="file-list">
      <div
        v-for="(fileObj, index) in showFileList"
        :key="index"
        class="file-wrap"
        @mouseenter="active = index"
      >
        <video
          v-if="
            videoSuffix.some((val) => fileObj.name.toLowerCase().endsWith(val))
          "
          class="video"
          :src="fileObj.url"
          :controls="active === index"
        ></video>
        <el-image
          v-if="
            imgSuffix.some((val) => fileObj.name.toLowerCase().endsWith(val))
          "
          :src="fileObj.url"
          fit="fill"
          lazy
          :previewSrcList="[fileObj.url]"
        ></el-image>
        <div class="file-name" :title="fileObj.name">{{ fileObj.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFileList, delFile } from "@/api/files";
import { serverPath, wsPath } from "@/api/config";

export default {
  data() {
    return {
      uploadUrl: serverPath + "/upload/",
      fileList: [],
      active: -1,
      videoSuffix: [".mp4", ".mov"],
      imgSuffix: [".jpeg", ".jpg", ".png"],
    };
  },
  computed: {
    showFileList() {
      return this.fileList.filter((fileObj) => {
        return (
          fileObj.url &&
          [...this.videoSuffix, ...this.imgSuffix].some((val) =>
            fileObj.name.toLowerCase().endsWith(val)
          )
        );
      });
    },
  },
  mounted() {
    this.getList();
    let socket = new WebSocket(wsPath);
    socket.onopen = (e) => {
      console.log("WebScoket连接成功!", e);
    };
    socket.onmessage = (e) => {
      console.log("客户端收到：", e);
      this.getList();
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file) {
      if (file.url) {
        delFile({ filename: file.name }).then((res) => {
          if (res.success) {
            this.getList();
            this.$message.success("已移除" + file.name);
          } else {
            this.$message.error(res.reason);
          }
        });
      }
    },
    handlePreview(file) {
      if (file.url) {
        window.open(file.url);
      }
    },
    getList() {
      getFileList().then((res) => {
        this.fileList = res.fileList.map((val) => {
          return {
            name: val,
            url: this.uploadUrl + val,
          };
        });
      });
    },
    handleSuccess() {
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.file-list {
  float: left;
  overflow: hidden;
}
.file-wrap {
  float: left;
  border: 1px dashed #ccc;
  width: 320px;
  overflow: hidden;
  margin-right: 5px;
}
.el-image {
  width: 100%;
  height: 300px;
}
.video {
  width: 100%;
  height: 300px;
}
.file-name {
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
