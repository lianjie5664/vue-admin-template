<template>
    <div class="menuAdd">
        <el-dialog :title="!dataForm.id ? '新增' : '编辑'" width="40%" :visible.sync="dialogVisible" @close="$emit('update:show', false)">
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()" 
                label-width="80px" size="small" style="text-align:left;">
                <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="dataForm.type">
                    <el-radio v-for="(type, index) in menuTypeList" :label="index" :key="index">{{ type }}</el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item :label="menuTypeList[dataForm.type] + '名称'" prop="name">
                <el-input v-model="dataForm.name" :placeholder="menuTypeList[dataForm.type] + '名称'"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" prop="parentName">
                    <treeselect
                    :options="menuOptions"
                    v-model="dataForm.parentId"
                    :searchable="true"
                    :show-count="true"
                    placeholder="选择上级菜单"
                    @select="updateValue"
                    />
                </el-form-item>
                <el-form-item v-if="dataForm.type !== '101100001'" label="授权标识" prop="permission">
                <el-input v-model="dataForm.permission" placeholder="如: sys:user:add, sys:user:edit, sys:user:delete"></el-input>
                </el-form-item>
                <el-form-item v-if="dataForm.type === '101100002' || dataForm.type === '101100001'" label="菜单路由" prop="path">
                <el-row>
                    <el-col :span="24">
                        <el-input v-model="dataForm.path" placeholder="菜单路由"></el-input>
                    </el-col>
                </el-row>
                </el-form-item>
                 <el-row v-if="dataForm.type !== '101100003' && dataForm.type !== '101100001'">
                    <el-col :span="22">
                        <el-form-item label="组件路径" prop="href">
                            <el-input v-model="dataForm.href" placeholder="组件路径"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" class="icon-list__tips">
                        <el-tooltip placement="top" effect="light" style="padding: 10px;">
                            <div slot="content">
                                <p>URL格式：</p>
                                <p>1.常规业务开发的功能URL，如用户管理，Views目录下页面路径为 /sys/user。</p>
                            </div>
                            <i class="el-icon-warning"></i>
                        </el-tooltip>
                    </el-col>
                </el-row>
                <el-form-item v-if="dataForm.type !== '101100003'" label="排序编号" prop="sort">
                    <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序编号"></el-input-number>
                </el-form-item>
                <el-form-item label="菜单图标" v-if="dataForm.type != '101100003'">
                    <e-icon-picker v-model="dataForm.icon" placeholder="点击选择图标" :options="options" />
                </el-form-item>
                <el-form-item label="是否可见" v-if="dataForm.type !== '101100003' && dataForm.type !== '101100001'">
                     <el-checkbox v-model="dataForm.hidden" true-label="1" false-label="0">勾选后菜单将不显示在左侧菜单列表中，默认false</el-checkbox>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small"  @click="dialogVisible = false">取消</el-button>
                <el-button size="small"  type="primary" @click="submitForm()">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {EIconPicker} from 'e-icon-picker';
import 'e-icon-picker/dist/index.css'; //基础样式
import 'e-icon-picker/dist/main.css';  //fontAwesome 图标库样式
// import IconSelect from "@/components/IconSelect"
export default {
    data(){
        return {
            dialogVisible: this.show,
            options: {FontAwesome: false, ElementUI: true, addIconList: ['fa fa-slack'], removeIconList: []},
            menuTypeList:{
                "101100001":"目录",
                "101100002":"菜单",
                "101100003":"按钮",
            },
            dataRule: {
                name: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
                path: [{ required: true, message: "组件路径不能为空", trigger: "blur" }],
                href: [{ required: true, message: "菜单路由不能为空", trigger: "blur" }],
            },
            popupTreeProps: {
                label: "name",
                children: "children"
            }
        }
    },
    components:{Treeselect,EIconPicker },
    props:{
        dataForm:{
            type:Object,
            default:{}
        },
        show:{
            type:Boolean,
            default:false
        },
        menuOptions:{
            type:Array,
            default:[]
        }
    },
    methods:{
        updateValue(data){
            // this.dataForm.parentName = data.label
            this.dataForm.parentId = data.id
        },
        selected(name) {
            this.dataForm.icon = name;
        },
        submitForm(){
            this.$refs['dataForm'].validate((valid) => {
                if(valid){
                    this.$emit('save',this.dataForm)
                }
            })
        },
       
    },
    watch: {
        show () {
            this.dialogVisible = this.show;
        }
    }
}
</script>