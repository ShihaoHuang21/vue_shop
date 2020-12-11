<template>
  <div class="page">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--面包屑导航区-->
    <!--卡片视图区-->
    <el-card>
      <!--添加角色-->
      <el-button type="primary">添加角色</el-button>
      <!--添加角色-->
    </el-card>
    <!--卡片视图区-->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    //获取角色列表
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败!')
      }
      this.rolesList = res.data
    }
  }
}
</script>

<style scoped lang="less"></style>
