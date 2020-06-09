<template>
<div class="dynamicform">
  <el-form
      v-if="dynamicValidateForm.formType == 'normal'"
      class="demo-dynamic"
      label-position="right"
      :model="dynamicValidateForm"
      ref="dynamicValidateForm">
      <el-row
          :gutter="12"
          style="margin-top:20px;">
          <el-col :span="item.span" v-for="(item,index) in dynamicValidateForm.itemList" :key="index">
              <div v-if="item.type==='block'" class="block"> <i></i> {{item.title}}</div>
              <el-form-item
                  :label="item.label"
                  :prop="'itemList.'+index +'.value'"
                  :rules="item.rules"
                  class="el-form-item-module">
                  <el-input v-model="item.value" :placeholder="item.label" v-if="item.type === 'input'" />
                  <el-input v-if="item.type==='textarea'" type="textarea" v-model="item.value"  :placeholder="item.label"></el-input>
                  <el-radio-group v-model="item.value" size="mini" v-if="item.type==='radio'" style="width:100%;border:solid 1px #fff;line-height:40px">
                      <div class="optionsType" v-for="(item,index) in item.options" :key="index">
                         <el-radio :label="index" border>{{item}}</el-radio>
                      </div>
                  </el-radio-group>
                <el-checkbox v-model="item.value"  v-if="item.type==='checkbox'" :label="item.txt" border size="medium"></el-checkbox>
                  <el-date-picker v-if="item.type==='dateTime'"
                    style="width:100%;"
                    v-model="item.value"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <el-upload v-if="item.type==='uploadFile'"
                    class="upload-demo"
                    action="http://localhost:8080/co_matur/api/file/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
              </el-form-item>
              <vue-ueditor-wrap  v-if="item.type === 'editor'" v-model="item.value" :config="myConfig"></vue-ueditor-wrap>
          </el-col>
      </el-row>
  </el-form>

  <!-- 组件1 -->
  <div v-if="dynamicValidateForm.formType == 'table'"> 
    <table-ass :tableData="table2Data" @dataFor="getDataFor" class="table1"></table-ass>
  </div>
  <!-- 主要供应商名录 -->
  <div v-if="dynamicValidateForm.formType == 'majorSuppliers'"> 
    <major-suppliers @saveData="saveSuppliersData" :arrData="majorSuppliersData" :tableData="dynamicValidateForm"></major-suppliers>
  </div>
  <!-- 主要客户名录 -->
  <div v-if="dynamicValidateForm.formType == 'majorCustomers'"> 
    <major-customers @saveData="saveCustomersData" :arrData="majorCustomersData" :tableData="dynamicValidateForm"></major-customers>
  </div>
  <!-- 三年内获奖情况 -->
  <div v-if="dynamicValidateForm.formType == 'threeYearsAward'"> 
    <thd-award @saveData="saveThdAwradData" :arrData="thdAwardData" :tableData="dynamicValidateForm"></thd-award>
  </div>
  <!-- 三年内质量安全相关情况 -->
  <div v-if="dynamicValidateForm.formType == 'threeYearsQa'"> 
    <thd-qa @saveData="saveThdAwradData" :arrData="thdQardData" :tableData="dynamicValidateForm"></thd-qa>
  </div>
  <div style="height:60px;"></div>
  <div class="opts">
    <el-button v-if="dynamicValidateForm.formType == 'normal'" type="primary" icon="el-icon-position" @click="submitForm('dynamicValidateForm')" >提交保存</el-button>
    <el-button v-if="dynamicValidateForm.formType == 'table'" type="primary" icon="el-icon-position" :disabled="btnDisabled" @click="submit1" >提交保存</el-button>
  </div>
</div> 
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import TableAss from './table1.vue'
import MajorSuppliers from './majorSuppliers.vue'
import MajorCustomers from './majorCustomers.vue'
import ThdAward from './threeYearsAward.vue'
import ThdQa from './threeYearsQa.vue'
export default {
    name:"module-batch",
     //使用props直接引用父组件的数据
    props:{
        moduleIdArray:Array,
        dynamicValidateForm:Object,
        myConfig:Object
    },
    components:{VueUeditorWrap,TableAss,MajorSuppliers,MajorCustomers,ThdAward,ThdQa},
    data(){
      return{
        fileList: [],
        table1Data:[],
        btnDisabled:true,
        table2Data:this.dynamicValidateForm,
        majorCustomersData:this.dynamicValidateForm,
        majorSuppliersData:this.dynamicValidateForm,
        thdAwardData : this.dynamicValidateForm,
        thdQardData : this.dynamicValidateForm,
        // tips:this.dynamicValidateForm.tips
       }
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      getDataFor(data){
        // debugger
        this.table2Data.tableData.push(data)
        this.btnDisabled = false
      },
      submit1(){
        this.$emit('submit',this.table2Data.tableData)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleAvatarSuccess(res, file) {
        this.fileList.push({
          name:file.name,
          url:URL.createObjectURL(file.raw),
          size:file.size
        })
        // this.fileList = URL.createObjectURL(file.raw);
      },
      dataURItoBlob(dataURI, type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
      },
      beforeAvatarUpload(file) {
        const _this = this
        return new Promise(resolve => {
         const reader = new FileReader()
         const image = new Image()
         image.onload = (imageEvent) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const width = image.width * _this.imgQuality
            const height = image.height * _this.imgQuality
            canvas.width = width;
            canvas.height = height;
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(file.type);
            const blobData = _this.dataURItoBlob(dataUrl, file.type);
            resolve(blobData)
         }
         reader.onload = (e => { image.src = e.target.result; });
         reader.readAsDataURL(file);
        })
       },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
            // let jsonArr = {}
            if(valid){
                this.dynamicValidateForm.itemList.map((v) => {
                    // jsonArr[v.prop] = v.value ? v.value : ''
                    if(v.prop == 'files'){
                      v.value = this.fileList
                    }
                    if(v.prop == 'radio'){
                      v.value = v.value.toString()
                    }
                })
                this.$emit('submit',this.dynamicValidateForm.itemList)
            }else{
              this.$notify.error({
                title: '错误',
                message: '信息填写不完整，请检查后提交！'
              });
            }
        })
      },
      saveSuppliersData(data){
        this.$emit('Suppliers',data)
      },
      saveCustomersData(data){
        this.$emit('Customers',data)
      },
      saveThdAwradData(data){
        this.$emit('SaveThdAward',data)
      }
    },
    created(){
      // console.log(this.table2Data)
    }
}
</script>
<style lang="less">
.dynamicform{
  .demo-dynamic{
    padding:0 20px;
    .optionsType{
      display: inline-block;
      padding: 0 8px;
    }
  }
} 
.block{
  font-size: 18px;
  color: #666;
  i{
    width: 5px;
    height: 14px;
    // border-radius: 50%;
    background: #666;
    display: inline-block;
  }
}
.inline{
  display: flex;
}
.el-checkbox{
  // width: 100%;
}
.opts{
  position: absolute;
  bottom: 0;
  right:0;
  width: 100%;
  margin-top: 15px;
  background:#fff;
  z-index: 999;
  text-align: right;
  padding:20px 30px 20px 0;
}
.upload-demo .el-upload-list{
  display: flex !important;
}
.upload-demo .el-upload-list li{
  margin: 0 4px;
}
.table1{
  margin-top: 10px ;
  padding:20px 0;
  box-shadow: 0 0 10px 2px rgba(30,13,4,.15);
}
</style>