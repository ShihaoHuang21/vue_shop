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
      <tree-table
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!--是否有效-->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color:lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <!--排序-->
        <template slot="order" slot-scope="scope">
          <el-tag>一级</el-tag>
          <el-tag>二级级</el-tag>
          <el-tag>三级</el-tag>
        </template>
      </tree-table>
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
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //商品数据分类列表,默认为空
      catelist: [],
      //总数据条数
      total: 0,
      //为table指定列属性
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template', //将当前列定义为模板
          template: 'isok' //使用模板名称
        },
        {
          label: '排序',
          prop: 'cat_level',
          type: 'template', //将当前列定义为模板
          template: 'order' //使用模板名称
        }
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //获取商品数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类列表失败!')
      }
      //把数据类别赋值给catelist
      this.catelist = res.data.result
      //为总数条数赋值
      this.total = res.data.total
      // console.log(this.catelist)
    }
  }
}
</script>

<style scoped lang="less"></style>
