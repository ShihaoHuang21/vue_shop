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
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二和三级权限-->
              <el-col :span="19">
                <!--通过for循环，渲染二级权限-->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3, i3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>{{ scope.row }} </pre>-->
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showSetRightDialog(scope.row)"
                >分配按钮</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--TABLE表格区-->
    </el-card>
    <!--卡片视图区-->
    <!--分配权限对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="showSetRightVisible"
      width="50%"
      @close="setRightDialogClose"
    >
      <!--树形控件-->
      <el-tree
        :data="rightlist"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <!--树形控件-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRightVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
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
      rolesList: [],
      //控制分配权限的对话框显示与隐藏
      showSetRightVisible: false,
      rightlist: [], //所有权限列表
      //树形控件绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      //默认选中的节点
      defKeys: [105, 116],
      roleId: '' //当前即将分配权限的ID
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
      // console.log(this.rolesList)
    },
    //根据id删除对应的tag
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('用户取消删除!')
      }
      // console.log('确认了删除!')
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('删除成功!')
      }
      // this.getRolesList()
      role.children = res.data //刷新列表
    },
    //展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      //获取所有权限数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取列表失败!')
      }
      this.rightlist = res.data
      // console.log(this.rightlist)
      this.getLeafKeys(role, this.defKeys) //获取三级节点
      this.showSetRightVisible = true
    },
    //通过递归形式获取角色所有三级权限的id保存到defKeys中
    //如果当前node节点不包含children属性，则是三级节点
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    //监听分配权限对话框的关闭事件
    setRightDialogClose() {
      this.defKeys = []
    },
    //为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys)
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败!')
      }
      this.$message.error('分配权限成功!')
      this.getRolesList()
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
.vcenter {
  display: flex;
  align-items: center;
}
</style>
