<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 单页推广配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <div class="handle-box">
                
          </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="id" label="id" width='80'>
                </el-table-column>
                <el-table-column prop="openid" label="openid" width='200' >
                <template slot-scope="scope">{{ scope.row.openid }} <el-button type="text" @click="getuserData(scope.row.openid)" >查看信息</el-button></template>
                
                </el-table-column>
                <el-table-column prop="alipayName" label="支付宝名称"  width='120'>
                </el-table-column>
                <el-table-column prop="alipayNumber" label="支付宝号码" width='120'>
                </el-table-column>
                 <el-table-column prop="goodsPrice" label="商品金币数" width='100' >
                </el-table-column>
                 <el-table-column prop="goodsName" label="商品名称" width='150' >
                </el-table-column>
                 <el-table-column prop="goodsType" label="商品类型(0现金1商品)" width='120' >
                </el-table-column>
                  <el-table-column prop="state" label="state(0待审核1通过2失败)" width='150' >
                </el-table-column>
                  <el-table-column prop="master_id" label="师傅id" width='100' >
                </el-table-column>
                 <el-table-column prop="channel" label="渠道"  width='100'>
                </el-table-column>
                 <el-table-column prop="create_time" label="创建时间"  width='100'>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                        <!--<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="datapages">
                </el-pagination>
            </div>

        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="120px">

                <el-form-item label="id">
                    <el-input v-model="form.id"  ></el-input>
                </el-form-item>
                <el-form-item label="支付宝姓名">
                    <el-input v-model="form.alipayName"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号">
                    <el-input v-model="form.alipayNumber"></el-input>
                </el-form-item>
                <el-form-item label="state(1过2失败)">
                    <el-input v-model="form.state"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>







         <!-- 编辑用户信息框 -->
        <el-dialog title="用户信息操作信息" :visible.sync="userdataVisible" width="70%">

          <div class="bodaydata"> 
                 <div  class="userdatatitle"> 用户信息</div>
                <div class="userdatadiv"  v-for="(value, name) in adminuserdata" >
                <span class="keyname" >{{ name }}:</span><span  class="keyvalue" > {{ value }} </span>
                </div>
          </div>

           <div class="bodaydata"> 
                 <div  class="userdatatitle"> 7天任务信息</div>
                <div class="userdatadiv"  v-for="(value, name) in admintaskdata" >
                <span class="keyname" >{{ name }}:</span><span  class="keyvalue" > {{ value }} </span>
                </div>
          </div>


          <div class="bodaydata"> 
                 <div  class="userdatatitle">7天金币信息</div>
                <div class="userdatadiv"  v-for="(value, name) in admincoinsdata" >
                <span class="keyname" >{{ name }}:</span><span  class="keyvalue" > {{ value }} </span>
                </div>
          </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="userdataVisible = false">关闭</el-button>
            </span>
        </el-dialog>






    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                userdataVisible:false,
                adminuserdata:null,
                admintaskdata:null,
                admincoinsdata:null,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                deleteid:'',
                datapages:0,
            }
        },
        created() {
            this.getData();
           
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
           
             getData() {
                this.url = '/admin.php/configure/examine/exchangedata';
                this.$axios.post(this.url,{pages:this.cur_page}).then((res) => {
                    console.log("11用户兑换列表信息",res)
                    this.tableData = res.data.data;
                    this.datapages=res.data.countnumber;
                })
            },
            handleEdit(index, row) {
                console.log("点击编辑")
                this.idx = index;
                const item = this.tableData[index];
                this.form = item
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                console.log("提交修改信息",this.form)
                this.editVisible = false;
                this.$message.success(`操作成功`);

                this.$axios.post('/admin.php/configure/examine/sendrewards',this.form).then((res) => {
                    console.log("修改信息返回数据",res)
                     this.getData();
                })
            },

            getuserData(openid) {
                this.url = '/admin.php/configure/dataquery/userdata';
                this.$axios.post(this.url,{openid:openid}).then((res) => {
                    console.log("用户操作信息",res.data)
                    this.adminuserdata = res.data.userdata;
                    this.admintaskdata = res.data.task;
                    this.admincoinsdata = res.data.coins;
                     this.userdataVisible = true;
                    
                })
            },

            userdata(){
                this.userdataVisible = true;
            },





        }
    }

</script>

<style scoped>

 .bodaydata{
     margin-top:25px;
 }
.userdatadiv{
     display:inline;
     margin-left:15px;
      
} 
.userdatatitle{
    font-size: 30px;
}

.keyname{
font-size: 20px;
}
.keyvalue{
font-size: 25px;
color:red;
font-weight:600;
}
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
