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
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
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
        class="treeTable"
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
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-if="scope.row.cat_level === 2"
            >三级</el-tag
          >
        </template>
        <!--操作-->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!--表格区-->
      <!--分页区-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!--分页区-->
    </el-card>
    <!--卡片视图区-->
    <!--添加分类对话框-->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
    >
      <!--添加分类表单-->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类:">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加分类对话框-->

    <!--编辑对话框-->

    <!--编辑对话框-->

    <!--删除对话框-->

    <!--删除对话框-->
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
        },
        {
          label: '操作',
          type: 'template', //将当前列定义为模板
          template: 'opt' //使用模板名称
        }
      ],
      // 添加分类对话框显示与隐藏
      addCateDialogVisible: false,
      //添加分类表单对象
      addCateForm: {
        cat_name: '', //分类名称
        cat_pid: 0, //分类父 ID
        cat_level: 0 //分类层级,默认一级
      },
      //添加分类表单对象规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      //父级分类的数据列表
      parentCateList: [],
      //指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //选择的id的父级数组
      selectedKeys: []
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
    },
    //监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    //监听pagenum改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    //点击按钮展示添加分类对话框
    showAddCateDialog() {
      //先获取父级分类的数据列表
      this.getParentCateList()
      //再展示对话框
      this.addCateDialogVisible = true
    },
    //获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级数据列表失败!')
      }
      this.parentCateList = res.data
      // console.log(res.data)
    },
    //选择项发生变化触发这个对象
    parentCateChanged() {
      console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        //父级id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        //为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    //添加新分类
    addCate() {
      console.log(this.addCateForm)
    }
  }
}
</script>

<style scoped lang="less">
.treeTable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
