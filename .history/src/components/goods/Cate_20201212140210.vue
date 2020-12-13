<template>
  <div class="page">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!--表格区-->
      <!--表格区-->
      <!--分页区-->
      <!--分页区-->
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
      //查询条件
      queryInfo: {
        type: 1,
        pagenum: 2,
        pagesize: 5
      },
      //商品数据分类列表,默认为空
      catelist: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //获取商品数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', this.queryInfo)
      if (res.meta.stutas !== 200) {
        return this.$message.error('获取商品分类列表失败!')
      }
      this.catelist = res.data
      console.log('获取商品列表成功!')
    }
  }
}
</script>

<style scoped lang="less"></style>
