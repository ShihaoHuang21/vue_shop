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
      <!--TABLE表格区-->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag>
                  {{ item1.authName }}
                </el-tag>
              </el-col>
              <!--渲染二和三级权限-->
              <el-col :span="19"></el-col>
            </el-row>
            <pre>{{ scope.row }} </pre>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template>
            <!--修改按钮-->
            <el-tooltip effect="dark" content="修改按钮" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
            </el-tooltip>

            <!--删除按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除按钮"
              placement="top"
            >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </el-tooltip>

            <!--分配按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"
                >分配按钮</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--TABLE表格区-->
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
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败!')
      }
      this.rolesList = res.data
      console.log(this.rolesList)
    }
  }
}
</script>

<style scoped lang="less">
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>
