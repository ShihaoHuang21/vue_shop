<template>
  <div class="login_container">
    <div class="login_box"></div>
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
  border: 1px #000 solid;
  border-radius: 3px;
  position: absolute;
  left: 35%;
  top: 25%;
}
</style>
