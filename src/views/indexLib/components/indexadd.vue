<template>
    <div class="app-container">
        <el-drawer
            title="录入"
            :visible.sync="dialog.v"
            custom-class="demo-drawer" size="450px">
            <div class="demo-drawer__content">
                <el-form status-icon label-width="100px" v-model="addForm" ref="ruleForm">
                    <el-form-item v-for='item in addForm' :label="item.label" :prop='item.prop' :key='item.prop'>
                        <el-input v-if="item.type==='Input'" v-model="addForm[item.prop]" :placeholder="item.placeholder"></el-input>
                        <el-select v-if="item.type==='Select'" v-model="addForm[item.prop]" :placeholder="item.placeholder" :prop='item.prop' @change="item.change(addForm[item.prop])">
                            <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                        </el-select>
                        <el-input v-if="item.type==='TextArea'" type="textarea" v-model="addForm[item.prop]" :placeholder="item.placeholder"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="$emit('close')">取 消</el-button>
                    <el-button type="primary" @click="$emit('submit',addForm)" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading:false,
        }
    },
    props:{
        addForm:{
            type:Array,
            default:[]
        },
        prev:{
            type:String,
            default:''
        },
        level:{
            type:String,
            default:''
        },
        value:{
            type:Number,
            default:0
        },
        content:{
            type:String,
            default:''
        },
        dialog: {
            type:Object,
            default:{}
        }
    },
    methods: {
        handleClose(done) {
            if (this.loading) {
                return;
            }
        }
    }
}
</script>
<style lang="scss">
    .demo-drawer__content{
        padding:20px;
    }
    .demo-drawer__footer {
        display: flex;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        padding: 10px 16px;
        background: #fff;
        text-align: right;
        button{
            flex:1;
        }
    }
</style>