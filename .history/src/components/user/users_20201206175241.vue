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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!--用户列表区-->
      <el-table :data="userlist" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch
          ></template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!--修改按钮-->
            <el-tooltip effect="dark" content="修改按钮" placement="top">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </el-tooltip>

            <!--删除按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除按钮"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>

            <!--分配按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!--添加用户弹框-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!--主体内容-->
      <span>
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
        </el-form>

         <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
        </el-form>

         <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>

         <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <!--底部区-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
        pagenum: 1, //当前页码
        pagesize: 2 //每页显示条数
      },
      userlist: [],
      total: 0,
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //添加用户表单数据
      addForm: {
        username: '',
        password:'',
        email:''
      },
      //添加用户表单数据规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符之间',
            trigger: 'blur'
          }
        ],
         password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '密码长度在 6 到 18 个字符之间',
            trigger: 'blur'
          }
        ],
         email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    async getUsersList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    },
    //监听pagesize改变事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    //监听页码值改变世界
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    //监听switch开关
    async userStateChanged(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新状态失败!')
      }
      this.$message.success('更新状态成功!')
    }
  }
}
</script>

<style scoped lang="less"></style>
