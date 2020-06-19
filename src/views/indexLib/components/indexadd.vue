<template>
    <div class="app-container">
        <el-drawer
            :title=" types == '0' ? '录入指标项' : '修改指标项'"
            :visible.sync="visible" 
            @close="$emit('update:show', false)"
            custom-class="demo-drawer" size="450px">
            <div class="demo-drawer__content">
                <el-form ref="ruleForm" :model="formData" label-width="100px">
                    <el-form-item label="指标名称">
                        <el-input v-model="formData.name" placeholder="请输入指标名称"></el-input>
                    </el-form-item>   
                    <el-form-item label="上级指标库">
                        <treeselect 
                            :options="menuData"
                            :searchable="true"
                            :show-count="true"
                            v-model="formData.parentId"
                            @select="selectNode"
                            placeholder="请选择上级指标库"
                        />
                    </el-form-item> 
                    <!-- <el-form-item label="指标等级">
                        <el-select 
                            v-model="formData.grade" 
                            placeholder="请选择指标等级" 
                            style="width: 310px;">
                            <el-option v-for="op in selectOptions" :label="op.label" :value="op.value" :key="op.value"></el-option>
                        </el-select>
                    </el-form-item>  -->
                     <el-form-item label="分值">
                        <el-input v-model="formData.score" placeholder="请输入指标分值"></el-input>
                    </el-form-item> 
                    <el-form-item label="指标内容">
                        <el-input v-model="formData.content" type="textarea" placeholder="请输入指标内容"></el-input>
                    </el-form-item> 
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="show = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm',types)" :loading="loading">{{ loading ? '提交中 ...' : '保  存' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { handleTree } from '@/utils/tools'
export default {
    data(){
        return {
            formData:{
                content:'',//指标内容
                // grade:'1',//指标等级
                name:'', //指标名称
                parentId:'',//父级指标
                score:0, //指标分值
                types:0 //更新or新增
            },
            visible:this.show,
            // selectOptions:[{value: '1',label: '一级指标' },{value: '2',label: '二级指标' },{value: '3',label: '三级指标' }],
            loading:false,
        }
    },
    props:{
        indexData:{
            type:Object,
            default:{}
        },
        show:{
            type:Boolean,
            default:false
        },
        types:{
            type:Number,
            default:0
        },
        list:{
            type:Array,
            default:[]
        },
        row:{
            type:Object
        }
    },
    components:{ Treeselect },
    methods: {
        submitForm(formName,types){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.$emit('submit',Object.assign(this.formData,{types:types}))
                }
            })
        },
        selectNode(node,instanceId) {
            this.formData.parentId = node.id
        }
    },
    computed: {
        /* 转树形数据 */
        menuData() {
            if(this.row.parentId == 0 || this.row.parentId == undefined){
                // this.formData.parentId = -1
            }else{
                this.formData.parentId = this.row.parentId
            }
            
            let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
            cloneData.map((v) =>{
                v.label = v.name
            })
            let menuTree = handleTree(cloneData, "id"),menuOptions = []
            const menu = { id: 0, label: '顶级项', children: [] }
            menu.children = menuTree
            menuOptions.push(menu)
            return menuOptions
        }
    },
    watch: {
        show () {
            this.visible = this.show;
            this.formData = this.indexData
        }
    }
}
</script>
<style lang="scss" scoped>
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