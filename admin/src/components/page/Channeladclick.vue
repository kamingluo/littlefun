<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- <el-card shadow="hover" class="mgb20">
          <div class="user-info">
            <img src="../../assets/images/img.jpg" class="user-avator" alt="" />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                    <div class="user-info-list">上次登录地点：<span>东莞</span></div>
        </el-card> -->

        <el-card shadow="hover" v-if="channelif">
          <div slot="header" class="clearfix">
            <span>渠道点击广告比例(总点击数:{{ allusersnumber }})</span>
          </div>
          <div v-for="item in channeldata">
            <div @click="getchannelData(item.channel)">
              {{ item.name }}(渠道号:{{ item.channel }}) (点击次数(不去重):{{
                item.count
              }})
            </div>
            <el-progress
              :percentage="channelnumber(item.count)"
              :stroke-width="8"
              color="#42b983"
            ></el-progress>
          </div>
        </el-card>
      </el-col>

      <!-- 渠道信息框 -->
      <el-dialog
        title="渠道操作信息"
        :visible.sync="channeldataVisible"
        width="70%"
      >
        <div class="bodaydata">
          <div class="userdatatitle">渠道点击广告详情数</div>
          <div class="userdatadiv" v-for="(value, name) in channeltaskdata">
            <span class="keyname">{{ name }}:</span
            ><span class="keyvalue"> {{ value }} </span>
          </div>
        </div>

        <!-- <div class="bodaydata">
          <div class="userdatatitle">7天金币信息</div>
          <div class="userdatadiv" v-for="(value, name) in channelcoinsdata">
            <span class="keyname">{{ name }}:</span
            ><span class="keyvalue"> {{ value }} </span>
          </div>
        </div> -->

        <span slot="footer" class="dialog-footer">
          <el-button @click="channeldataVisible = false">关闭</el-button>
        </span>
      </el-dialog>

      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <!-- <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ alladnumber.allloadbanner }}</div>
                  <div>今日总加载banner广告</div>
                </div>

                <div class="grid-cont-right">
                  <div class="grid-num">
                    {{ alladnumber.allloadmoban }}
                  </div>
                  <div>今日总加载模板广告</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>

                <div class="grid-cont-right">
                  <div class="grid-num">
                    {{ alladnumber.loadbanner }}
                  </div>
                  <div>今日加载banner广告成功数</div>
                </div>

                <div class="grid-cont-right">
                  <div class="grid-num">
                    {{ alladnumber.loadmoban }}
                  </div>
                  <div>今日加载模板广告成功数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ alladnumber.bannerproportion }}</div>
                  <div>加载banner广告成功率</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">
                    {{ alladnumber.mobanproportion }}
                  </div>
                  <div>加载模板广告成功率</div>
                </div>
              </div>
            </el-card>
          </el-col> -->

          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ alladnumber.clickbanner }}</div>
                  <div>今天点击banner广告数(去重)</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">
                    {{ alladnumber.clickmoban }}
                  </div>
                  <div>今天点击模板广告数(去重)</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <div class="grid-cont-right">
                  <div class="grid-num">{{ historycoins.whole }}</div>
                  <div>历史总金币流水</div>
                </div>
                <div class="grid-cont-jia">
                  <div>加</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todaycoins.whole }}</div>
                  <div>今日总流水</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <div class="grid-cont-right">
                  <div class="grid-num">{{ historycoins.gdtad }}</div>
                  <div>历史广点通广告支出</div>
                </div>
                <div class="grid-cont-jia">
                  <div>加</div>
                </div>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todaycoins.gdtad }}</div>
                  <div>今日广点通广告支出</div>
                </div>
              </div>
            </el-card>
          </el-col> -->
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import bus from "../common/bus";
export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      todaycoins: "",
      alladnumber: "",
      historycoins: "",
      channeldata: [],
      allusersnumber: 0,
      channelif: false,
      channeldataVisible: false,
      channeltaskdata: null,
      channelcoinsdata: null,
      data: [],
    };
  },
  components: {
    Schart,
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    },
  },

  created() {
    this.handleListener();
    // this.changeDate();
    this.adminchanneldata();
    // this.admintodaycoins();
    // this.adminhistorycoins();
    this.adminalladnumber();
  },
  activated() {
    this.handleListener();
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    channelnumber: function (number) {
      var num = (number / this.allusersnumber) * 100;
      num = num.toFixed(1); //保留一位小数
      // console.log(typeof num);
      return Number(num); //转变成Number类型才不会报错
    },

    //拿到渠道用户注册数
    adminchanneldata() {
      this.$axios
        .post("/admin.php/configure/adstatistics/channeladclick")
        .then((res) => {
          console.log("拿到渠道用户点击数", res.data);
          this.channeldata = res.data.data;
          this.allusersnumber = res.data.allusersnumber;
          this.channelif = true;
        });
    },

    //拿到今天的消耗数据
    admintodaycoins() {
      //this.url = '/admin.php/configure/extension/extension';
      this.$axios.post("/admin.php/index/todaycoins").then((res) => {
        console.log("拿到今天的消耗数据", res.data);
        this.todaycoins = res.data.data;
      });
    },

    //拿到历史的消耗数据
    adminhistorycoins() {
      //this.url = '/admin.php/index/historycoins';
      this.$axios.post("/admin.php/index/historycoins").then((res) => {
        console.log("拿到历史的消耗数据", res.data);
        this.historycoins = res.data.data[0];
      });
    },
    //拿到用户数据
    adminalladnumber() {
      //this.url = '/admin.php/configure/extension/extension';
      this.$axios
        .post("/admin.php/configure/adstatistics/alladnumber")
        .then((res) => {
          console.log("拿到数据", res.data);
          this.alladnumber = res.data.data;
        });
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`;
      });
    },
    handleListener() {
      bus.$on("collapse", this.handleBus);
      // 调用renderChart方法对图表进行重新渲染
      window.addEventListener("resize", this.renderChart);
    },
    handleBus(msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    renderChart() {
      this.$refs.bar.renderChart();
      this.$refs.line.renderChart();
    },
    getchannelData(channel) {
      this.url = "/admin.php/configure/adstatistics/channeladclickdetails";
      this.$axios.post(this.url, { channel: channel }).then((res) => {
        console.log("渠道用户点击信息", res.data);
        this.channeltaskdata = res.data.data;
        this.channeldataVisible = true;
      });
    },
  },
};
</script>


<style scoped>
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

.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-cont-jia {
  font-size: 18px;
  color: #999;
  text-align: center;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
