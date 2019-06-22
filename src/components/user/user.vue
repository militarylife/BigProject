<template>
  <!-- 卡片 -->
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" @click.prevent="addUserfn">添加用户</el-button>
    <!-- 数据表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
            <!-- {{scope.row}} -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column>
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页内容 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 新增对话框 -->
    <el-dialog  title="添加用户" :visible.sync="dialogFormVisible">
        {{userObj}}
    <el-form :model="userObj">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="userObj.username"  autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="userObj.password"  autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="userObj.email"  autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="手机" :label-width="formLabelWidth">
      <el-input v-model="userObj.mobile"  autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  @click.prevent="addCancel">取 消</el-button>
    <el-button type="primary" @click.prevent="confirmAdd">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        query: '',
        pagenum: 1,
        pagesize: 3,
        pagesizes: [1,3,5],
        total: 0,
        formLabelWidth: '80px',
        dialogFormVisible: false,
        userObj:{
            username: '',
            password: '',
            email: '',
            mobile: ''
        },
      tableData: [],

    };
  },
  methods:{
      getTableDate(){
          this.$http({
              method: 'get',
              url: `http://localhost:8888/api/private/v1/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
              headers:{
                  Authorization:window.localStorage.getItem('token')
              }
          }).then(res=>{
              console.log(res)
              let { data, meta} = res.data
              if (meta.status==200){
                  this.tableData = data.users
                  this.total = data.total
              }
          })
      },
    // 页容量
      handleSizeChange(pagesize){
          this.pagesize=pagesize
          this.getTableDate()
      },
    // 当前页码
    handleCurrentChange(pagenum){
        this.pagenum=pagenum
        this.getTableDate()
    },
    // 弹出添用户加框
    addUserfn(){
        this.dialogFormVisible= true
    },
    // 新增中取消按钮
    addCancel(){
        this.dialogFormVisible= false
    },
    // 点击确认添加用户
    confirmAdd(){
        this.$http({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/users',
            data: this.userObj,
            headers: {
               Authorization: window.localStorage.getItem('token')
            }
        }).then(res=>{
            // console.log(res.data)
            let { meta, data} = res.data
            if (meta.status==201){
                this.$message({
                    message: meta.msg,
                    type: 'success'
                })
                this.getTableDate()
            }else{
                this.$message.error(meta.msg)
            }
             for (var key in this.userObj){
             this.userObj[key] = ''
        }
        this.dialogFormVisible= false
        })
       
    }
  },
  mounted(){
      this.getTableDate()
  }
};
</script>

<style>
.input-with-select {
  margin-top: 30px;
  width: 300px;
}
</style>
