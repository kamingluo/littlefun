(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5aec7eee"],{"0a49":function(t,e,a){var i=a("9b43"),l=a("626a"),s=a("4bf8"),o=a("9def"),n=a("cd1c");t.exports=function(t,e){var a=1==t,r=2==t,c=3==t,d=4==t,u=6==t,f=5==t||u,p=e||n;return function(e,n,m){for(var b,h,g=s(e),v=l(g),y=i(n,m,3),_=o(v.length),w=0,k=a?p(e,_):r?p(e,0):void 0;_>w;w++)if((f||w in v)&&(b=v[w],h=y(b,w,g),t))if(a)k[w]=h;else if(h)switch(t){case 3:return!0;case 5:return b;case 6:return w;case 2:k.push(b)}else if(d)return!1;return u?-1:c||d?d:k}}},1169:function(t,e,a){var i=a("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"7f7f":function(t,e,a){var i=a("86cc").f,l=Function.prototype,s=/^\s*function ([^ (]*)/,o="name";o in l||a("9e1e")&&i(l,o,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},"9acc":function(t,e,a){},cd1c:function(t,e,a){var i=a("e853");t.exports=function(t,e){return new(i(t))(e)}},d25f:function(t,e,a){"use strict";var i=a("5ca1"),l=a("0a49")(2);i(i.P+i.F*!a("2f21")([].filter,!0),"Array",{filter:function(t){return l(this,t,arguments[1])}})},e853:function(t,e,a){var i=a("d3f4"),l=a("1169"),s=a("2b4c")("species");t.exports=function(t){var e;return l(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!l(e.prototype)||(e=void 0),i(e)&&(e=e[s],null===e&&(e=void 0))),void 0===e?Array:e}},f630:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 总点击数："+t._s(t.datapages))])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"}),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"列表id",width:"80"}}),a("el-table-column",{attrs:{prop:"user_id",label:"用户id",width:"80"}}),a("el-table-column",{attrs:{prop:"channel",label:"渠道",width:"120"}}),a("el-table-column",{attrs:{prop:"position",label:"点击位置",width:"180"}}),a("el-table-column",{attrs:{prop:"adtype",label:"广告类型",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-text",[t._v(t._s("1"==e.row.adtype?"banner":2==e.row.adtype?"激励视频":3==e.row.adtype?"格子广告":4==e.row.adtype?"视频广告":5==e.row.adtype?"模板广告":6==e.row.adtype?"小盟广告":"未知位置"))])]}}])}),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"160"}})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.datapages},on:{"current-change":t.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"预览图片",visible:t.imgVisible,width:"25%"},on:{"update:visible":function(e){t.imgVisible=e}}},[a("img",{staticClass:"yulan",attrs:{src:t.yulanimg}})]),a("el-dialog",{attrs:{title:"删除群",visible:t.delVisible,width:"30%"},on:{"update:visible":function(e){t.delVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[a("el-text",[t._v("确认删除？？")])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.delVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmdelete}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"30%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"id"}},[a("el-input",{model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),a("el-form-item",{attrs:{label:"支付宝姓名"}},[a("el-input",{model:{value:t.form.alipayName,callback:function(e){t.$set(t.form,"alipayName",e)},expression:"form.alipayName"}})],1),a("el-form-item",{attrs:{label:"支付宝账号"}},[a("el-input",{model:{value:t.form.alipayNumber,callback:function(e){t.$set(t.form,"alipayNumber",e)},expression:"form.alipayNumber"}})],1),a("el-form-item",{attrs:{label:"state(1过2失败)"}},[a("el-input",{model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1)],1)},l=[],s=(a("7f7f"),a("d25f"),{name:"basetable",data:function(){return{url:"./static/vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"1",select_word:"",del_list:[],is_search:!1,editVisible:!1,userdataVisible:!1,adminuserdata:null,admintaskdata:null,admincoinsdata:null,form:{name:"",date:"",address:""},idx:-1,delVisible:!1,imgVisible:!1,yulanimg:null,deleteid:"",datapages:0}},created:function(){this.getData()},computed:{data:function(){var t=this;return this.tableData.filter(function(e){for(var a=0;a<t.del_list.length;a++)if(e.name===t.del_list[a].name){!0;break}})}},methods:{handleCurrentChange:function(t){this.cur_page=t;var e=this.select_word;null==e||""==e?this.getData():this.gosearch(t)},getData:function(){var t=this;this.url="admin.php/configure/datalist/clickadlist",this.$axios.post(this.url,{pages:this.cur_page}).then(function(e){console.log("群列表信息",e),t.tableData=e.data.data,t.datapages=e.data.countnumber})},newsearch:function(){var t=this;this.cur_page=1,this.select_word="",this.select_cate="1";var e="admin.php/configure/datalist/clickadlist";this.$axios.post(e,{pages:1}).then(function(e){console.log("群列表信息",e),t.tableData=e.data.data,t.datapages=e.data.countnumber})},search:function(){console.log("点击筛选");var t=this.select_word;if(console.log("打印关键词",t),null==t||""==t)return console.log("11111111"),void this.$message.error("关键词不能为空！！！");console.log("去筛选"),this.gosearch(1)},gosearch:function(t){var e=this,a=this.select_cate,i=this.select_word;if(console.log("开始筛选",t),"1"==a)var l={pages:t,id:i};else l={pages:t,crowd_name:i};var s="admin.php/configure/datalist/clickadlist";this.$axios.post(s,l).then(function(t){console.log("搜索群返回",t),e.$message.success("操作成功"),e.tableData=t.data.data,e.datapages=t.data.countnumber})},handleDelete:function(t,e){console.log("点击删除的id",e.id),this.deleteid=e.id,this.delVisible=!0},confirmdelete:function(){var t=this,e=this.deleteid,a="admin.php/configure/tasks/deletetask?id="+e;this.$axios(a).then(function(e){console.log("删除群返回",e),t.$message.success("操作成功"),t.delVisible=!1,t.gosearch()})},clickimg:function(t){console.log("点击图片",t.target.src),this.imgVisible=!0,this.yulanimg=t.target.src},handleEdit:function(t,e){console.log("点击编辑"),this.idx=t;var a=this.tableData[t];this.form=a,this.editVisible=!0},userdata:function(){this.userdataVisible=!0}}}),o=s,n=(a("f7dd"),a("2877")),r=Object(n["a"])(o,i,l,!1,null,"26970488",null);r.options.__file="Clickaddata.vue";e["default"]=r.exports},f7dd:function(t,e,a){"use strict";var i=a("9acc"),l=a.n(i);l.a}}]);