<template>
    <div class="app-container">
        <el-dialog :title="types == 0 ?'新增奖项':'修改奖项'" 
            :visible.sync="awardFormVisble"
            @close="$emit('update:show', false)" width="600px" :close-on-click-modal="false">
            <div class="demo-drawer__content">
                <!-- awardList:[
                    {type:'Input',label:'奖项名称',prop:'name',placeholder:'请输入奖项名称',value:''},
                    {type:'Input',label:'所在地区',prop:'area',placeholder:'请输入所在地区',value:''},
                    {type:'TextArea',label:'奖项描述',prop:'description',placeholder:'请输入奖项描述',value:''},
                ] -->
                <el-form status-icon label-width="100px" label-position="right" style="padding-bottom:40px" :model="formData" ref="awardAddForm">
                    <el-form-item label="奖项名称" prop='name'>
                        <el-input v-model="formData.name" placeholder="请输入奖项名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" prop='area'>
                        <el-input v-model="formData.area" placeholder="请输入所在地区"></el-input>
                    </el-form-item>
                    <el-form-item label="奖项描述" prop='description'>
                        <el-input v-model="formData.description" type="textarea" placeholder="请输入奖项描述"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="$emit('close')">取 消</el-button>
                    <el-button type="primary" @click="submitForm('awardAddForm',types)" v-if="types == 0" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button type="primary" @click="editForm('awardAddForm',types)" v-else :loading="loading">{{ loading ? '修改中 ...' : '修 改' }}</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formData:{
                name:'',
                area:'', 
                description:'',
            },
            loading:false,
            awardFormVisble:this.show
        }
    },
    props:{
        show:{
            type:Boolean,
            default:false
        },
        indexData:{
            type:Object,
            default:{}
        },
        types:{
            type:Number,
            default:0
        },
    },
    methods: {
        handleClose(done) {
            if (this.loading) {
                return;
            }
        },
        submitForm(formName,types){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log(this.formData)
                   this.$emit('submit',Object.assign(this.formData))
                }
            })
        },
        editForm(formName,types){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$emit('submit',Object.assign(this.formData))
                }
            })
        }
    },
    watch: {
        show () {
            this.awardFormVisble = this.show;
            this.formData = this.indexData
        }
    }
}
</script>
<style lang="scss">
    .demo-drawer__content{
        padding:20px;
    }
    .demo-drawer__footer {
        // display: flex;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 10px 16px;
        background: #fff;
        text-align: right;
        // button{
        //     flex:1;
        // }
    }
</style>