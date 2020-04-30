<template>
    <div class="app-container">
        <el-dialog :title=" types == '0' ? '录入关键点' : '修改关键点'" :visible.sync="dialogFormVisible.v" width="600px">
            <div class="demo-drawer__content">
                <el-form status-icon label-width="100px" label-position="right" style="padding-bottom:40px" :model="formData" ref="rightForm">
                    <el-form-item v-for='(item,index) in formData.rightItemList' :label="item.label" :prop="'rightItemList.' + index + '.value'" :key='index'>
                        <el-input v-if="item.type==='Input'" 
                            v-model="item.value" 
                            :placeholder="item.placeholder"
                            :rules="[{ required: item.required, message:item.message?item.message:'信息必须填写'}]"></el-input>
                        <el-select v-if="item.type==='Select'" 
                            v-model="item.value" 
                            :placeholder="item.placeholder" 
                            @change="item.change(item[item.prop])" :style="{ width: item.width }">
                            <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                        </el-select>
                        <el-input v-if="item.type==='TextArea'" type="textarea" v-model="item.value" :placeholder="item.placeholder"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="$emit('close')">取 消</el-button>
                    <el-button type="primary" v-if="types == 0 " @click="submitForm('rightForm')" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                    <el-button type="primary" v-else @click="submitForm('rightForm')" :loading="loading">{{ loading ? '提交中 ...' : '修 改' }}</el-button>
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
        }
    },
    props:['formData','dialogFormVisible','types'],
    methods: {
        handleClose(done) {
            if (this.loading) {
                return;
            }
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                let jsonArr = {}
                if(valid){
                    this.formData.rightItemList.map((v) => {
                        jsonArr[v.prop] = v.value ? v.value : ''
                    })
                    this.$emit('submit',jsonArr)
                }
            })
        },
        created() {
            alert(1)
        },
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