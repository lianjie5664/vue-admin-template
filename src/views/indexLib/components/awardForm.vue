<template>
    <div class="app-container">
        <el-dialog title="新增奖项" :visible.sync="awardFormVisble.v" width="600px">
            <div class="demo-drawer__content">
                <el-form status-icon label-width="100px" label-position="right" style="padding-bottom:40px" :model="formData" ref="awardAddForm">
                    <el-form-item v-for='(item,index) in formData.awardList' :label="item.label" :prop="'awardList.' + index + '.value'" :key='index'>
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
                    <el-button type="primary" @click="submitForm('awardAddForm')" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
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
    props:['formData','awardFormVisble'],
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
                    this.formData.awardList.map((v) => {
                        jsonArr[v.prop] = v.value ? v.value : ''
                    })
                    this.$emit('submit',jsonArr)
                }
            })
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