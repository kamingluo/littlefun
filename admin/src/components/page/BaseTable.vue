<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 单页推广配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <div class="handle-box">
                <el-button type="primary"  class="handle-del mr10" @click="add">新增数据</el-button>
          </div>
           <!--<div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>-->
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->

                <el-table-column prop="id" label="id" width='80'>
                </el-table-column>
                <el-table-column prop="name" label="name" width='150' >
                </el-table-column>
                <el-table-column prop="appid" label="appid"  width='180'>
                </el-table-column>
                <el-table-column prop="Jump" label="跳转链接" width='250'>
                </el-table-column>
                 <el-table-column prop="describe" label="简介" width='180' >
                </el-table-column>
                 <el-table-column prop="extradata" label="extradata" width='100' >
                </el-table-column>
                 <el-table-column prop="imgurl" label="图片链接" width='390' >
                </el-table-column>
                  <el-table-column prop="onshowjump" label="onshowjump(返回时0跳1不跳)" width='220' >
                </el-table-column>
                  <el-table-column prop="open" label="open(0开1关)" width='130' >
                </el-table-column>
                 <el-table-column prop="playtime" label="playtime"  width='100'>
                </el-table-column>
                 <el-table-column prop="score" label="score"  width='100'>
                </el-table-column>
                  <el-table-column prop="type" label="type(0直跳1图片)" width='150' >
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--<div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>-->

        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="120px">

                <el-form-item label="id">
                    <el-input v-model="form.id"  placeholder="id为空就是新增数据" ></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="appid">
                    <el-input v-model="form.appid"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接">
                    <el-input v-model="form.Jump"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item label="extradata">
                    <el-input v-model="form.extradata"></el-input>
                </el-form-item>
                <el-form-item label="图片链接">
                    <el-input v-model="form.imgurl"></el-input>
                </el-form-item>
                <el-form-item label="onshowjump">
                    <el-input v-model="form.onshowjump"></el-input>
                </el-form-item>
                <el-form-item label="open">
                    <el-input v-model="form.open"></el-input>
                </el-form-item>
                <el-form-item label="playtime">
                    <el-input v-model="form.playtime"></el-input>
                </el-form-item>
                <el-form-item label="score">
                    <el-input v-model="form.score"></el-input>
                </el-form-item>
                 <el-form-item label="type">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                
                


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
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
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                deleteid:''
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
                    if (!is_del) {
                        // if (d.address.indexOf(this.select_cate) > -1 &&
                        //     (d.name.indexOf(this.select_word) > -1 ||
                        //         d.address.indexOf(this.select_word) > -1)
                        // ) {
                        //     return d;
                        // }
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
            // 获取 easy-mock 的模拟数据
            // getData() {
            //     // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            //     console.log("基础表格页面",process.env.NODE_ENV)

            //     if (process.env.NODE_ENV === 'development') {
            //         this.url = '/admin.php/configure/extension/extension';
            //     };
            //     this.$axios.post(this.url, {
            //         page: this.cur_page
                    
            //     }).then((res) => {
            //         console.log("基础表格请求返回数据",res)
            //         // this.tableData = res.data.list;
            //     })
            // },

            //获取数据
             getData() {
                this.url = '/admin.php/configure/extension/extension';
                this.$axios.post(this.url).then((res) => {
                    console.log("基础表格请求返回数据",res.data.data)
                    this.tableData = res.data.data;
                })
            },
            add(){
              console.log("点击新增")
              this.form = {}
              this.editVisible = true;

            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                console.log("点击编辑")
                this.idx = index;
                const item = this.tableData[index];
                this.form = item
                // this.form = {
                //     id: item.id,
                //     name: item.name,
                //     appid: item.appid
                // }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                console.log("点击删除按钮",index,"删除id",row.id)
                this.idx = index;
                this.deleteid=row.id;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                console.log("提交修改信息",this.form)
                this.editVisible = false;
                this.$message.success(`操作成功`);

                this.$axios.post('/admin.php/configure/extension/addandupdate',this.form).then((res) => {
                    console.log("修改信息返回数据",res)
                     this.getData();
                })
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                console.log("删除提交数据id",this.deleteid)
                this.$axios.post('/admin.php/configure/extension/deletedata',{id:this.deleteid}).then((res) => {
                    console.log("删除信息返回数据",res)
                })
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
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
