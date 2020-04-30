<template>
    <div class="majorSuppliers">
        <el-row :gutter="24">
            <el-col :span="24">
                <el-button type="primary" @click="addEvent">新增一条</el-button>
                <el-button type="danger" @click="deleteSelectedEvent">删除选中</el-button>
                <el-button type="warning" @click="saveSelectedEvent">保存数据</el-button>
                <!-- <el-button type="success" @click="exportCvs">导出数据</el-button> -->
            </el-col>
        </el-row>
        <elx-editable class="tableWrap"
            ref="elxEditable"
            border
            :data.sync="arrData.tableData"
            :edit-config="{trigger: 'dblclick', mode: 'cell',render:'scroll',isDelKey:true}"
            :edit-rules="{name: [{required: true, message: 'Please enter a name.', trigger: 'blur'}]}">
            <elx-editable-column type="selection" width="55"></elx-editable-column>
            <elx-editable-column v-for="(item,index) in tableData.itemList" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :edit-render="{name: item.type}"></elx-editable-column>
        </elx-editable>
        <el-alert style="margin-top:20px;"
            title="①、双击单元格进行编辑。②、填写企业（组织）的主要供应商名单（应包括关键原材料供应商），可另加附页！"
            type="warning"
            show-icon>
        </el-alert>
    </div>
</template>
<script>
import { uuid } from 'vue-uuid';
export default {
    name:'majorSuppliers',//主要供应商名录
    data(){
        return {
            suppliersCount:0,
            value:0,
            // formData:[],
            // tableData: [],
        }
    },
    props:{
        tableData:Object,
        arrData:Object    
    },
    methods:{
        addEvent(){
             let num = this.suppliersCount,
                tempObj = {
                    id: uuid.v1(),
                    name:"",
                    supplyNum:"",
                    unit:"",
                    address:"",
                    zipCode:"",
                    contacter:"",
                    phone:""
                }
          
            this.$refs.elxEditable.insert(tempObj).then(({ row }) => {
                this.$refs.elxEditable.setActiveRow(row)
            })
        },
       deleteSelectedEvent(){
           let removeRecords= this.$refs.elxEditable.getSelecteds(),
               { records }  = this.$refs.elxEditable.getAllRecords()
            for(let i in removeRecords){
                records.filter((el,index) =>{
                    if(removeRecords[i].id == el.id){
                        records.splice(index,1)
                    }
                }) 
            }
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.$emit('saveData',records)
                }).catch(() => {
            });
       },
       saveSelectedEvent(){
           let  { records } = this.$refs.elxEditable.getAllRecords()
           this.$emit('saveData',records)
       },
       exportCvs(){
           
       }
    },
    // watch:{
    //     arrData(newArr){
    //         this.formData = newArr
    //     }
    // },
    created(){
        console.log(this.tableData)
        // this.$emit('getData',false);
        // this.$nextTick(() =>{
            // this.formData = this.tableData.tableData
        // })
    }
}
</script>
<style lang="less">
    .majorSuppliers{
        .tableWrap{
            margin-top: 20px;
            box-shadow: 0 0 10px 2px rgba(30,13,4,.15);
        }
    }

</style>