<template>
  <div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--面包屑导航区-->
    <!--卡片视图区-->
    <el-card>
      <!--table表格区-->
      <el-table
        :data="rightsList"
        border
        stripe
        align="center"
        header-align="center"
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>

        <el-table-column prop="authName" label="权限名称"> </el-table-column>

        <el-table-column prop="path" label="路径"> </el-table-column>

        <el-table-column prop="level" label="权限层级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!--table表格区-->
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
      //权限列表
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      this.rightsList = res.data
      console.log(this.rightsList)
      // this.$message.success('获取权限列表成功!')
    }
  }
}
</script>

<style scoped lang="less"></style>
