<template>
  <div class="home">
    <div class="home-header">
      <el-button type="primary" @click="handleAdd" icon="el-icon-plus"
        >新增</el-button
      >
    </div>
    <div class="home-body">
      <el-table :data="tableData" border stripe>
        <el-table-column width="60" type="index" label="序号" align="center" />
        <el-table-column
          v-for="col in tableColumns"
          :key="col.id"
          :prop="col.id"
          :label="col.label"
          :width="col.width"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>

    <el-drawer title="新增" :visible.sync="visible">
      <div class="search-box">
        <el-form :model="formData" label-width="60px">
          <el-form-item label="名称">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getUsers, addUser } from '@/api/user'

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      visible: false,
      tableData: [],
      tableColumns: [
        {
          id: 'username',
          label: '用户名',
        },
        {
          id: 'password',
          label: '密码',
        },
      ],
      formData: {
        username: '',
        password: '',
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleAdd() {
      this.formData = {
        username: '',
        password: '',
      }
      this.visible = true
    },
    getData() {
      getUsers().then((res) => {
        this.tableData = res.data
      })
    },
    onSubmit() {
      addUser(this.formData).then(() => {
        this.getData()
        this.visible = false
      })
    },
    onCancel() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  .home-header {
    display: flex;
    margin-bottom: 10px;
  }
  .home-body {
  }
}

.search-box {
  padding: 20px;
}
</style>
