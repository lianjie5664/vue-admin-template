<template>
    <div class="app-container">
        <el-dialog :title=" types == '0' ? '录入关键点' : '修改关键点'" width="600px" :visible.sync="visible" @close="$emit('update:dialogFormVisible', false)" :before-close="handleDialogClose">
            <div class="demo-drawer__content">
                <el-form status-icon label-width="100px" label-position="right" style="padding-bottom:40px" :model="formData" ref="rightForm">
                    <el-form-item label="序号">
                        <el-input v-model="formData.sort" placeholder="请输入序号"></el-input>
                    </el-form-item>
                    <el-form-item label="关键点">
                        <el-input v-model="formData.keyPoint" placeholder="请输入关键点"></el-input>
                    </el-form-item>
                    <el-form-item label="详细说明">
                        <el-input type="textarea" v-model="formData.description" placeholder="请输入详细说明"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="$emit('close')">取 消</el-button>
                    <el-button type="primary" v-if="types == 0 " @click="submitForm('rightForm')" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button type="primary" v-else @click="editForm('rightForm')" :loading="loading">{{ loading ? '提交中 ...' : '修 改' }}</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading:false,
            visible:this.dialogFormVisible,
        }
    },
    props:['formData','dialogFormVisible','types'],
    methods: {
        handleDialogClose() {
            this.$emit('close')
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$emit('submit',this.formData)
                }
            })
        },
        editForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$emit('edit',this.formData)
                }
            })
        }
    },
    watch:{
        dialogFormVisible(newVal){
            this.visible = newVal
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