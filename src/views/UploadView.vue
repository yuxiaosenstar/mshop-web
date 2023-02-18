<template>
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
</template>
<script>
import { getFileList, delFile } from "@/api/files";
import { serverPath } from "@/api/config";
export default {
  data() {
    return {
      uploadUrl: serverPath + "/upload/",
      fileList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file) {
      if (file.url) {
        delFile({ filename: file.name }).then((res) => {
          if (res.success) {
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
    handleSuccess(response, file, fileList) {
      let target = fileList.find((val) => val.name === file.name);
      this.$set(target, "url", this.uploadUrl + response.filename);
    },
  },
};
</script>
