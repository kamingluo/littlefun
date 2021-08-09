<template>
  <div class="error-page">
    <div class="error-code">
      测<span>试</span>管<span>理</span>平<span>台</span>
    </div>
    <!-- <div class="error-desc">啊哦~ 你没有权限访问该页面哦</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack"
        >返回上一页</el-button
      >
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>


<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 150px;
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  /* color: #00a854; */
  color: #2d8cf0;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 250px;
}
.error-btn {
  margin-left: 100px;
}
</style>
