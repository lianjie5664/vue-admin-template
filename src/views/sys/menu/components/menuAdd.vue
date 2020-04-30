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
                <el-form-item v-if="dataForm.type !== 0" label="授权标识" prop="perms">
                <el-input v-model="dataForm.perms" placeholder="如: sys:user:add, sys:user:edit, sys:user:delete"></el-input>
                </el-form-item>
                <el-form-item v-if="dataForm.type === 1" label="菜单路由" prop="path">
                <el-row>
                    <el-col :span="22">
                        <el-input v-model="dataForm.path" placeholder="菜单路由"></el-input>
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
                </el-form-item>
                <el-form-item v-if="dataForm.type !== 2" label="排序编号" prop="sort">
                <el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序编号"></el-input-number>
                </el-form-item>
                 <el-form-item label="菜单图标" v-if="dataForm.type != 2">
                    <el-popover
                        placement="bottom-start"
                        width="460"
                        trigger="click"
                        @show="$refs['iconSelect'].reset()"
                    >
                        <IconSelect ref="iconSelect" @selected="selected" />
                        <el-input slot="reference" v-model="dataForm.icon" placeholder="点击选择图标" readonly>
                        <svg-icon
                            v-if="dataForm.icon"
                            slot="prefix"
                            :icon-class="dataForm.icon"
                            class="el-input__icon"
                            style="height: 32px;width: 16px;"
                        />
                        <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                        </el-input>
                    </el-popover>
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
import IconSelect from "@/components/IconSelect"
export default {
    data(){
        return {
            dialogVisible: this.show,
            menuTypeList: ["目录", "菜单", "按钮"],
            dataRule: {
                name: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }]
            },
            popupTreeProps: {
                label: "name",
                children: "children"
            }
        }
    },
    components:{Treeselect,IconSelect },
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
            this.dataForm.parentName = data.label
            this.dataForm.parentId = data.id
        },
        selected(name) {
            this.dataForm.icon = name;
        },
        submitForm(){
            console.log(this.dataForm)
        },
       
    },
    watch: {
        show () {
            this.dialogVisible = this.show;
        }
    }
}
</script>