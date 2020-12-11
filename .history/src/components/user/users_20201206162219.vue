<template>
  <div class="page">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区-->
    <el-card>
      <!--搜索与添加-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      //获取用户列表参数
      queryInfo: {
        query: '', //查询参数
        pagenum: '', //当前页码
        pagesize: '' //每页显示条数
      }
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    getUsersList() {
      this.$http.get('users')
    }
  }
}
</script>

<style scoped lang="stylus"></style>
