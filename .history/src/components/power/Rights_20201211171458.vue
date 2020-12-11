<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区-->
    <el-card> 2223</el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      //权限列表
      rightsList: [
        {
          id: '',
          authName: '',
          level: '',
          pid: '',
          path: ''
        }
      ]
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/', this.rightsList)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      this.$message.success('获取权限列表成功!')
    }
  }
}
</script>

<style scoped lang="less"></style>
