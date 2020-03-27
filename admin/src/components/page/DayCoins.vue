<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 每日金币消耗</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable">
            <el-table-column prop="create_time" label="日期" >
                </el-table-column>
                <el-table-column prop="whole" label="全部流水" >
                </el-table-column>
                <el-table-column prop="gdtad" label="广点通ad" >
                </el-table-column>
                <el-table-column prop="wlad" label="微量ad">
                </el-table-column>
                <el-table-column prop="miniappad" label="miniappad" >
                </el-table-column>
                 <el-table-column prop="share" label="分享消耗"  >
                </el-table-column>
                 <el-table-column prop="sign" label="签到消耗" >
                </el-table-column>
                 <el-table-column prop="paytribute" label="进贡消耗" >
                </el-table-column>
                  <el-table-column prop="caiquanwin" label="用户猜拳赢了" >
                </el-table-column>
                  <el-table-column prop="caiquanlose" label="用户猜拳输了" >
                </el-table-column>
                 <el-table-column prop="dicewin" label="用户猜大小赢了" >
                </el-table-column>
                <el-table-column prop="dicelose" label="用户猜大小输了" >
                </el-table-column>
                 <el-table-column prop="exchangecoin" label="兑换商品" >
                </el-table-column>
                  
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="countnumber">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'daycoins',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                countnumber:10,
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            //获取数据
             getData() {
                this.url = '/admin.php/configure/dataquery/coinstatistics';
                this.$axios.post(this.url,{pages:this.cur_page}).then((res) => {
                    console.log("基础每日消耗返回数据",res.data.data)
                    this.tableData = res.data.data;
                    this.countnumber=res.data.countnumber;
                })
            }
        }
    }

</script>

