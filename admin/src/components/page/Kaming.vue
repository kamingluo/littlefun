<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-cascades"></i> 问题报备</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="select_cate"
          placeholder="反馈来源"
          class="handle-select mr10"
        >
          <el-option key="1" label="本人" value="0"></el-option>
          <el-option key="2" label="组内同学" value="1"></el-option>
          <el-option key="3" label="监控" value="2"></el-option>
          <el-option key="4" label="用户" value="3"></el-option>
          <el-option key="5" label="其他同事等" value="4"></el-option>
        </el-select>

        <el-select
          v-model="select_cate"
          placeholder="问题类型"
          class="handle-select mr10"
        >
          <el-option key="1" label="功能问题" value="0"></el-option>
          <el-option key="2" label="兼容问题" value="1"></el-option>
          <el-option key="3" label="体验问题" value="0"></el-option>
          <el-option key="4" label="性能问题" value="1"></el-option>
          <el-option key="5" label="安全问题" value="0"></el-option>
          <el-option key="6" label="策略问题" value="1"></el-option>
        </el-select>
        <el-input
          v-model="select_word"
          placeholder="根据报备人搜索"
          class="handle-input mr10"
        ></el-input>

        <el-button
          type="primary"
          icon="search"
          class="search searchbtn"
          @click="search"
          >搜索</el-button
        >
        <el-button
          type="primary"
          icon="search"
          class="search"
          @click="newsearch"
          >重置</el-button
        >
        <el-button type="primary" class="handle-del mr10" @click="add"
          >新增数据</el-button
        >
      </div>

      <!-- 问题描述：详细说明问题
反馈来源：本人、组内同学、监控、用户、其他同事等
问题归类：外发版本遗漏、详细测试遗漏、发布策略 
影响范围：版本/需求延期、RC测试返工、版本重发、外网故障
问题类型：功能问题、兼容问题、体验问题、性能问题、安全问题、策略问题
漏/晚发现原因：描述从测试角度的原因
问题改进点：列出能形成内部推广的规范或方法 -->

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="序号" width="80"> </el-table-column>
        <el-table-column prop="name" label="报备人" width="150">
        </el-table-column>
        <el-table-column prop="name" label="问题描述" width="150">
        </el-table-column>
        <el-table-column prop="channel" label="反馈来源" width="180">
        </el-table-column>

        <el-table-column prop="name" label="问题归类" width="150">
        </el-table-column>
        <el-table-column prop="channel" label="影响范围" width="180">
        </el-table-column>

        <el-table-column prop="name" label="问题类型" width="150">
        </el-table-column>
        <el-table-column prop="channel" label="漏/晚发现原因" width="180">
        </el-table-column>

        <el-table-column prop="channel" label="问题改进点" width="180">
        </el-table-column>

        <el-table-column prop="channel" label="创建时间" width="180">
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="渠道名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="渠道号">
          <el-input v-model="form.channel"></el-input>
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
  name: "basetable",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      cur_page: 1,
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {},
      idx: -1,
      deleteid: "",
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
      this.getData();
    },

    //获取数据
    getData() {
      this.url = "/admin.php/configure/channel/channel";
      this.$axios.post(this.url).then((res) => {
        console.log("基础表格请求返回数据", res.data.data);
        this.tableData = res.data.data;
      });
    },
    add() {
      console.log("点击新增");
      this.form = {};
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
      console.log("点击编辑");
      this.idx = index;
      const item = this.tableData[index];
      this.form = item;
      // this.form = {
      //     id: item.id,
      //     name: item.name,
      //     appid: item.appid
      // }
      this.editVisible = true;
    },
    handleDelete(index, row) {
      console.log("点击删除按钮", index, "删除id", row.id);
      this.idx = index;
      this.deleteid = row.id;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      console.log("提交修改信息", this.form);
      this.editVisible = false;
      this.$message.success(`操作成功`);

      this.$axios
        .post("/admin.php/configure/channel/channelupdate", this.form)
        .then((res) => {
          console.log("修改信息返回数据", res);
          this.getData();
        });
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      console.log("删除提交数据id", this.deleteid);
      this.$axios
        .post("/admin.php/configure/channel/deletedata", {
          id: this.deleteid,
        })
        .then((res) => {
          console.log("删除信息返回数据", res);
        });
      this.$message.success("删除成功");
      this.delVisible = false;
    },
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.searchbtn {
  margin-left: 10px;
}

.handle-select {
  width: 120px;
  margin-right: 10px;
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
