<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区-->
      <div class="avatar_box">
        <img src="./../assets/logo.png" alt="" />
      </div>
      <!--头像区-->
      <!--登录表单区域-->
      <el-form label-width="0px">
        <el-form-item label="">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <!--登录表单区域-->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  // width: 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  // border: 1px #000 solid;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ddd;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>
