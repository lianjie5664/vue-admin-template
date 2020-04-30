<template>
    <div class="app-container">
        <el-drawer
            :title=" types == '0' ? '录入指标项' : '修改指标项'"
            :visible.sync="dialog.v"
            custom-class="demo-drawer" size="450px">
            <div class="demo-drawer__content">
                <el-form status-icon label-width="100px" :model="formData" ref="ruleForm">
                    <el-form-item v-for='(item,index) in formData.formItemList' :label="item.label" :prop="'formItemList.' + index + '.value'" :key='index'>
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
                        <!-- <SelectTree v-if="item.type==='TreeSelect'"
                            :props="props"
                            :options="optionData"
                            :clearable="isClearable"
                            :accordion="accordion"
                            :value="valueId"
                            @getValue="getValue($event)"
                            /> -->
                            <treeselect v-if="item.type==='TreeSelect'"
                                :options="optionData"
                                :disable-branch-nodes="true"
                                :show-count="true"
                                v-model="selectValue"
                                @select="selectNode"
                                placeholder="Where are you from?"
                                />
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="$emit('close')">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm',types)" :loading="loading">{{ loading ? '提交中 ...' : '保  存' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    data(){
        return {
            loading:false,
            isClearable: true, // 可清空（可选）
            accordion: true, // 可收起（可选）
            rowSelect: {},
            selectValue:''
        }
    },
    props:['formData','dialog','list','types','row'],
    components:{Treeselect},
    methods: {
        handleClose(done) {
            if (this.loading) {
                return;
            }
        },
        submitForm(formName,types){
            this.$refs[formName].validate((valid) => {
                let jsonArr = {}
                if(valid){
                    this.formData.formItemList.map((v) => {
                        jsonArr[v.prop] = v.value ? v.value : ''
                    })
                    // console.log(Object.assign(jsonArr,{types:types}))
                    // return 
                    this.$emit('submit',Object.assign(jsonArr,{types:types}))
                }
            })
        },
        selectNode(node,instanceId) {
            this.rowSelect = node
            this.formData.formItemList[1].value = node.id
        }
    },
    computed: {
        /* 转树形数据 */
        optionData() {
            this.selectValue = this.row.id
            this.rowSelect = this.row
            this.formData.formItemList[1].value = this.row.id
            let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
            cloneData.map((v) =>{
                v.label = v.name
            })
            return cloneData.filter(father => {
                // 循环所有项，并添加children属性
                let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
                branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
                return father.parentId == 0; //返回第一层
            });
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