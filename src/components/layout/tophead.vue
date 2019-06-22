<template>
     <!-- 头部 -->
     <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/css/imgs/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <h1>电商后台管系统</h1>
          </div>
        </el-col>
        <el-col :span="4">
          <a class="mylink" @click.prevent="logout" href>退出</a>
        </el-col>
      </el-row>
</template>

<script>
export default {
    methods:{
        logout(){
             this.$confirm('你确定要退出吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.$router.push('/login')
            window.localStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
          
        }
    }
}
</script>

<style>

</style>
