<template>
  <el-container>
    <el-button type="info" @click="logout">退出</el-button>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
}
.el-aside {
}
</style>
