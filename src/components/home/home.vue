<template>
  <!-- 页面容器 -->
  <el-container >
      <el-header>
   <TopHead></TopHead>
    </el-header>
    <!-- 左边和主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <SideBar></SideBar>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopHead from '../layout/tophead'
import SideBar from '../layout/sidebar'
export default {
    components:{
        TopHead:TopHead,
        SideBar:SideBar
    },
    mounted(){
        let token = window.localStorage.getItem('token')
        if (!token) {
            this.$message.error('你还没有登入，请登入')
            this.$router.push({ name: 'login'})
        }
    }
};
</script>

<style>
.el-container{
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header h1 {
  margin: 0;
  color: #fff;
}
.el-header .mylink {
  float: right;
  text-decoration: none;
  color: green;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}
.mymenu{
    height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
 height: 100%;
}
</style>
