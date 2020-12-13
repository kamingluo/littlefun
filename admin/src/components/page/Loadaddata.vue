<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-cascades"></i> 总加载数：{{
            datapages
          }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box"></div>
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="列表id" width="80"> </el-table-column>

        <el-table-column prop="user_id" label="用户id" width="80">
        </el-table-column>

        <el-table-column prop="channel" label="渠道" width="120">
        </el-table-column>

        <el-table-column prop="position" label="点击位置" width="180">
        </el-table-column>

        <el-table-column prop="adtype" label="广告类型" width="150">
          <template slot-scope="scope">
            <el-text>{{
              scope.row.adtype == "1"
                ? "banner"
                : scope.row.adtype == 2
                ? "激励视频"
                : scope.row.adtype == 3
                ? "格子广告"
                : scope.row.adtype == 4
                ? "视频广告"
                : scope.row.adtype == 5
                ? "模板广告"
                : scope.row.adtype == 6
                ? "小盟广告"
                : "未知位置"
            }}</el-text>
          </template>
        </el-table-column>

        <el-table-column prop="state" label="加载状态" width="120">
          <template slot-scope="scope" style="height: 100px">
            <el-text>{{ scope.row.state == 0 ? "成功" : "失败" }}</el-text>
          </template>
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间" width="160">
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="datapages"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "1",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      userdataVisible: false,
      adminuserdata: null,
      admintaskdata: null,
      admincoinsdata: null,
      form: {
        name: "",
        date: "",
        address: "",
      },
      idx: -1,
      delVisible: false,
      imgVisible: false,
      yulanimg: null,
      deleteid: "",
      datapages: 0,
    };
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
      });
    },
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      let select_word = this.select_word;
      if (select_word == null || select_word == "") {
        this.getData();
      } else {
        this.gosearch(val);
      }
    },

    getData() {
      this.url = "admin.php/configure/datalist/loadadlist";
      this.$axios.post(this.url, { pages: this.cur_page }).then((res) => {
        console.log("群列表信息", res);
        this.tableData = res.data.data;
        this.datapages = res.data.countnumber;
      });
    },

    newsearch() {
      this.cur_page = 1;
      this.select_word = "";
      this.select_cate = "1";
      let url = "admin.php/configure/datalist/loadadlist";
      this.$axios.post(url, { pages: 1 }).then((res) => {
        console.log("群列表信息", res);
        this.tableData = res.data.data;
        this.datapages = res.data.countnumber;
      });
    },

    //筛选
    search() {
      console.log("点击筛选");
      let select_word = this.select_word; //关键词
      console.log("打印关键词", select_word);
      if (select_word == null || select_word == "") {
        console.log("11111111");
        this.$message.error(`关键词不能为空！！！`);
        return;
      }

      console.log("去筛选");
      this.gosearch(1);
    },

    gosearch(pages) {
      let select_cate = this.select_cate; //筛选方式
      let select_word = this.select_word; //关键词
      console.log("开始筛选", pages);
      if (select_cate == "1") {
        var resdata = {
          pages: pages,
          id: select_word,
        };
      } else {
        var resdata = {
          pages: pages,
          crowd_name: select_word,
        };
      }
      let url = "admin.php/configure/datalist/loadadlist";
      this.$axios.post(url, resdata).then((res) => {
        console.log("搜索群返回", res);
        this.$message.success(`操作成功`);
        this.tableData = res.data.data;
        this.datapages = res.data.countnumber;
      });
    },

    userdata() {
      this.userdataVisible = true;
    },
  },
};
</script>

<style scoped>
.yulan {
  width: 350px;
  height: 500px;
}

/*.imgscrollable {
  display: flex;
  overflow-x: scroll;
  overflow-y: scroll;

}*/

.taskimg {
  width: 220px;
  height: 280px;
  margin-left: 15px;
  margin-bottom: 10rpx;
}
.logo {
  width: 70px;
  height: 70px;
}

.bodaydata {
  margin-top: 25px;
}
.userdatadiv {
  display: inline;
  margin-left: 15px;
}
.userdatatitle {
  font-size: 30px;
}

.keyname {
  font-size: 20px;
}
.keyvalue {
  font-size: 25px;
  color: red;
  font-weight: 600;
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
