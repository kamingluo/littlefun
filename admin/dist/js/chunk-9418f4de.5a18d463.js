(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9418f4de"],{"04f3":function(e,t,l){"use strict";var i=l("cef2"),a=l.n(i);a.a},"0a49":function(e,t,l){var i=l("9b43"),a=l("626a"),o=l("4bf8"),n=l("9def"),s=l("cd1c");e.exports=function(e,t){var l=1==e,r=2==e,c=3==e,d=4==e,u=6==e,f=5==e||u,m=t||s;return function(t,s,p){for(var b,h,v=o(t),x=a(v),g=i(s,p,3),w=n(x.length),y=0,_=l?m(t,w):r?m(t,0):void 0;w>y;y++)if((f||y in x)&&(b=x[y],h=g(b,y,v),e))if(l)_[y]=h;else if(h)switch(e){case 3:return!0;case 5:return b;case 6:return y;case 2:_.push(b)}else if(d)return!1;return u?-1:c||d?d:_}}},1169:function(e,t,l){var i=l("2d95");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"3e92":function(e,t,l){"use strict";l.r(t);var i=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"table"},[l("div",{staticClass:"crumbs"},[l("el-breadcrumb",{attrs:{separator:"/"}},[l("el-breadcrumb-item",[l("i",{staticClass:"el-icon-lx-cascades"}),e._v(" 单页推广配置")])],1)],1),l("div",{staticClass:"container"},[l("div",{staticClass:"handle-box"},[l("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary"},on:{click:e.add}},[e._v("新增数据")])],1),l("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:""},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{prop:"id",label:"id",width:"80"}}),l("el-table-column",{attrs:{prop:"name",label:"name",width:"150"}}),l("el-table-column",{attrs:{prop:"appid",label:"appid",width:"180"}}),l("el-table-column",{attrs:{prop:"Jump",label:"跳转链接",width:"250"}}),l("el-table-column",{attrs:{prop:"describe",label:"简介",width:"180"}}),l("el-table-column",{attrs:{prop:"extradata",label:"extradata",width:"100"}}),l("el-table-column",{attrs:{prop:"imgurl",label:"图片链接",width:"390"}}),l("el-table-column",{attrs:{prop:"onshowjump",label:"onshowjump(返回时0跳1不跳)",width:"220"}}),l("el-table-column",{attrs:{prop:"open",label:"open(0开1关)",width:"130"}}),l("el-table-column",{attrs:{prop:"playtime",label:"playtime",width:"100"}}),l("el-table-column",{attrs:{prop:"score",label:"score",width:"100"}}),l("el-table-column",{attrs:{prop:"type",label:"type(0直跳1图片)",width:"150"}}),l("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(l){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),l("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(l){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),l("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"id"}},[l("el-input",{attrs:{placeholder:"id为空就是新增数据"},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),l("el-form-item",{attrs:{label:"appid"}},[l("el-input",{model:{value:e.form.appid,callback:function(t){e.$set(e.form,"appid",t)},expression:"form.appid"}})],1),l("el-form-item",{attrs:{label:"跳转链接"}},[l("el-input",{model:{value:e.form.Jump,callback:function(t){e.$set(e.form,"Jump",t)},expression:"form.Jump"}})],1),l("el-form-item",{attrs:{label:"简介"}},[l("el-input",{model:{value:e.form.describe,callback:function(t){e.$set(e.form,"describe",t)},expression:"form.describe"}})],1),l("el-form-item",{attrs:{label:"extradata"}},[l("el-input",{model:{value:e.form.extradata,callback:function(t){e.$set(e.form,"extradata",t)},expression:"form.extradata"}})],1),l("el-form-item",{attrs:{label:"图片链接"}},[l("el-input",{model:{value:e.form.imgurl,callback:function(t){e.$set(e.form,"imgurl",t)},expression:"form.imgurl"}})],1),l("el-form-item",{attrs:{label:"onshowjump"}},[l("el-input",{model:{value:e.form.onshowjump,callback:function(t){e.$set(e.form,"onshowjump",t)},expression:"form.onshowjump"}})],1),l("el-form-item",{attrs:{label:"open"}},[l("el-input",{model:{value:e.form.open,callback:function(t){e.$set(e.form,"open",t)},expression:"form.open"}})],1),l("el-form-item",{attrs:{label:"playtime"}},[l("el-input",{model:{value:e.form.playtime,callback:function(t){e.$set(e.form,"playtime",t)},expression:"form.playtime"}})],1),l("el-form-item",{attrs:{label:"score"}},[l("el-input",{model:{value:e.form.score,callback:function(t){e.$set(e.form,"score",t)},expression:"form.score"}})],1),l("el-form-item",{attrs:{label:"type"}},[l("el-input",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1)],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1),l("el-dialog",{attrs:{title:"提示",visible:e.delVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delVisible=t}}},[l("div",{staticClass:"del-dialog-cnt"},[e._v("删除不可恢复，是否确定删除？")]),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:e.deleteRow}},[e._v("确 定")])],1)])],1)},a=[],o=(l("7f7f"),l("d25f"),{name:"basetable",data:function(){return{url:"./static/vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"",select_word:"",del_list:[],is_search:!1,editVisible:!1,delVisible:!1,form:{name:"",date:"",address:""},idx:-1,deleteid:""}},created:function(){this.getData()},computed:{data:function(){var e=this;return this.tableData.filter(function(t){for(var l=0;l<e.del_list.length;l++)if(t.name===e.del_list[l].name){!0;break}})}},methods:{handleCurrentChange:function(e){this.cur_page=e,this.getData()},getData:function(){var e=this;this.url="/admin.php/configure/extension/extension",this.$axios.post(this.url).then(function(t){console.log("基础表格请求返回数据",t.data.data),e.tableData=t.data.data})},add:function(){console.log("点击新增"),this.form={},this.editVisible=!0},search:function(){this.is_search=!0},formatter:function(e,t){return e.address},filterTag:function(e,t){return t.tag===e},handleEdit:function(e,t){console.log("点击编辑"),this.idx=e;var l=this.tableData[e];this.form=l,this.editVisible=!0},handleDelete:function(e,t){console.log("点击删除按钮",e,"删除id",t.id),this.idx=e,this.deleteid=t.id,this.delVisible=!0},delAll:function(){var e=this.multipleSelection.length,t="";this.del_list=this.del_list.concat(this.multipleSelection);for(var l=0;l<e;l++)t+=this.multipleSelection[l].name+" ";this.$message.error("删除了"+t),this.multipleSelection=[]},handleSelectionChange:function(e){this.multipleSelection=e},saveEdit:function(){var e=this;this.$set(this.tableData,this.idx,this.form),console.log("提交修改信息",this.form),this.editVisible=!1,this.$message.success("操作成功"),this.$axios.post("/admin.php/configure/extension/addandupdate",this.form).then(function(t){console.log("修改信息返回数据",t),e.getData()})},deleteRow:function(){this.tableData.splice(this.idx,1),console.log("删除提交数据id",this.deleteid),this.$axios.post("/admin.php/configure/extension/deletedata",{id:this.deleteid}).then(function(e){console.log("删除信息返回数据",e)}),this.$message.success("删除成功"),this.delVisible=!1}}}),n=o,s=(l("04f3"),l("2877")),r=Object(s["a"])(n,i,a,!1,null,"1acdb10d",null);r.options.__file="BaseTable.vue";t["default"]=r.exports},"7f7f":function(e,t,l){var i=l("86cc").f,a=Function.prototype,o=/^\s*function ([^ (]*)/,n="name";n in a||l("9e1e")&&i(a,n,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},cd1c:function(e,t,l){var i=l("e853");e.exports=function(e,t){return new(i(e))(t)}},cef2:function(e,t,l){},d25f:function(e,t,l){"use strict";var i=l("5ca1"),a=l("0a49")(2);i(i.P+i.F*!l("2f21")([].filter,!0),"Array",{filter:function(e){return a(this,e,arguments[1])}})},e853:function(e,t,l){var i=l("d3f4"),a=l("1169"),o=l("2b4c")("species");e.exports=function(e){var t;return a(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!a(t.prototype)||(t=void 0),i(t)&&(t=t[o],null===t&&(t=void 0))),void 0===t?Array:t}}}]);