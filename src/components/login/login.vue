<template>
  <div class="login">
    <div class="content">
         <h2>用户登入</h2>
      <el-form
        :rules="rules"
        :model="userObj"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="word" v-model="userObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userObj.password"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="mybtn" @click.prevent="login">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // 用户数据
            userObj:{
                username: '',
                password: ''
            },
            // 验证表单
            rules:{
                username:[
                     { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                password:[
                     { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        login(){
            // 表单验证
              this.$refs.ruleForm.validate((valid) => {
          if (valid) {
                       this.$http({
                method: 'post',
                url: 'http://localhost:8888/api/private/v1/login',
                data: this.userObj
            }).then(res=>{
                console.log(res)
                let { data, meta } = res.data
                if (meta.status==200){
                    //跳转页面
                    this.$router.push('/')
                    // 保存token
                    window.localStorage.setItem('token',data.token)
                    // 提示消息
                    this.$message({
                        message: meta.msg,
                        type: 'success'
                    })
                } else {
                    this.$message.error(meta.msg)
                }
            }).catch(res=>{
                console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

   
        }
    }
};
</script>

<style>
.login {
  background-color: #324152;
  width: 100%;
  height: 100%;
  position: relative;
}
.content {
  width: 580px;
  height: 440px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  box-sizing: border-box;
}
.mybtn{
    width: 100%;
}
</style>
