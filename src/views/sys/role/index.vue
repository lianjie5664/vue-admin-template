<template>
    <div class="roleWrap">
        <el-row :gutter="10">
            <div class="role-search">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <el-button round icon="el-icon-circle-plus-outline" size="small" @click="showDialog">新建角色</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-col :span="24">
                <el-table
                    ref="userTable"
                    v-loading="listLoading"
                    :data="roleList"
                    element-loading-text="Loading"
                    border
                    fit
                    @row-click="selectRow"
                    @selection-change="selectRow">
                    <el-table-column align="center" label="编号" width="120">
                        <template slot-scope="scope">
                        {{ scope.$index + 1}}
                        </template>
                    </el-table-column>
                        <el-table-column align="center" label="角色编码">
                        <template slot-scope="scope">
                        {{ scope.row.enname }}
                        </template>
                    </el-table-column>
                    <el-table-column label="角色名称" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <div class="">
                                <span style="width:8px;height:8px;boder-radius:50%;background:red;"></span>
                            </div>
                        {{ scope.row.useable == '1'?'可用':'禁用' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center">
                        <template slot-scope="scope">
                        {{ scope.row.createDate }}
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="操作" align="center">
                        <template slot-scope="{row}">
                                <el-button size="mini" plain type="primary" @click.stop="editRole(row)">
                                编辑
                            </el-button>
                            <el-button size="mini" plain type="danger" @click.stop="delRole(row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!--  编辑角色 -->
        <el-dialog
            :title="dialogType == 0 ? '新建角色' : '编辑角色'"
            :visible.sync="roleFormVisible"
            :close-on-click-modal="false"
            width="600px">
            <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="80px">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="角色标识" prop="enname">
                            <el-input v-model="roleForm.enname" placeholder="请输入角色标识"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="roleForm.name" placeholder="请输入角色名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="角色状态" prop="useable">
                            <el-radio-group v-model="roleForm.useable">
                                <el-radio :label="'1'">启用</el-radio>
                                <el-radio :label="'0'">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>    
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="菜单权限" prop="menuIdList">
                            <el-tree
                                :data="menuList"
                                show-checkbox
                                ref="menu"
                                node-key="id"
                                empty-text="加载中，请稍后"
                                :props="defaultProps"
                            ></el-tree>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remarks">
                             <el-input v-model="roleForm.remarks" type="textarea" placeholder="请输入角色备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="roleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleRoleSave('roleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { roleList,roleSave,roleDel,getRole } from '@/api/role'
import { menuList } from '@/api/menu'
import { handleTree } from '@/utils/tools'
import {notice} from '@/utils/tools'
export default {
    data(){
        return {
            roleFormVisible:false,//新建/编辑角色dialog
            selectLine:{},
            dialogType:0,
            defaultProps: {
                children: "children",
                label: "label"
            },
            roleForm:{
                enname:'',
                name:'',
                useable:'1',
                officeId:1,
                dataScope:1,
                sysData:1,
                remarks:'',
                menuIdList:[]
                // menuIdList:this.getDeptAllCheckedKeys() || []
            },
            roleList:[],
            listLoading:false,

            modal:{
                roleUserCtx:false,
                roleConfigCtx:false,
            },
            menuList:[],
            rules:{
                enname: [
                    { required: true, message: '请输入角色标识', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        showModal(type,row){
            if(type == 'role'){
                // show role config
                this.modal.roleConfigCtx = true
                this.modal.roleUserCtx = false
            }else{
                // show user config
                this.modal.roleUserCtx = true
                this.modal.roleConfigCtx = false
            }
        },
         renderContent(h, { node, data, store }) {
            return (
              <span class="custom-tree-node">
                <i class={data.className}></i>
                <span style="margin-left:5px;">{node.label}</span>
              </span>
              );
        },
        selectRow(row){
            this.selectLine = Object.assign({},this.roleForm,row)
        },
        showDialog(){
            this.dialogType = 0
            this.reset()
            this.roleFormVisible = true
            
        },
        reset() {
            if (this.$refs.menu != undefined) {
                this.$refs.menu.setCheckedKeys([]);
            }
            this.roleForm = {
                enname:'',
                name:'',
                useable:'1',
                officeId:1,
                dataScope:1,
                sysData:1,
                remarks:'',
                menuIdList:[]
            }
        },
        editRole(row){
            this.getSingleRole(row.id)
            this.dialogType = 1
            this.roleFormVisible = true
            this.roleForm = row
        },
        delRole(row){
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            roleDel({id:row.id}).then(res =>{
                if(res.code == 1){
                        notice(1,res.msg,1) 
                    }else{
                        notice(0,res.msg,0) 
                    } 
                }).then(()=>{
                    this.getRoleList()
                })
            });
        },
        handleRoleSave(formName){
            this.$refs[formName].validate((valid) => {
                let checkedNodes = this.$refs.menu.getCheckedNodes(),menuIds = []
                if(checkedNodes.length > 0 ){
                    checkedNodes.map((v) =>{
                        menuIds.push(v.id)
                    })
                }
                this.roleForm.menuIdList = menuIds
                let data = {officeId:1}
                if(valid){
                    roleSave(Object.assign({},this.roleForm,data)).then(res =>{
                        if(res.code == 1){
                            notice(1,res.msg,1) 
                        }else{
                            notice(0,res.msg,0) 
                        }
                        this.roleFormVisible = !this.roleFormVisible
                    }).then(()=>{
                        this.getRoleList()
                    })
                }
            })
        },
        getRoleList(){
            this.listLoading = true
            roleList({}).then(res => {
                if(res.code == 1){
                    let result = res.data
                    this.roleList = result
                }
            })
            this.listLoading = false
        },
        getSingleRole(roleId){
            getRole({id:roleId}).then((res) =>{
                if(res.code == 1){
                    let menuList = res.data.menuIdList
                    this.$refs.menu.setCheckedKeys(menuList);
                }
            })
        },
        getMenuList(){
            menuList({}).then((res) =>{
                res.data.map((v) =>{
                    v.label = v.name
                })
                let menuTree = handleTree(res.data, "id")
                this.menuList = menuTree
            })
        },
        getMenuAllCheckedKeys() {
            debugger
            // 目前被选中的菜单节点
            let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
            // 半选中的菜单节点
            let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
            checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
            return checkedKeys;
        },
    },
    created(){
        this.getRoleList()
        this.getMenuList()
    }
}
</script>
<style lang="less" scoped>
    .roleWrap{
        margin: 16px 20px 0;
        padding: 15px;
        box-shadow: 0 0 10px #ccc;
        .role-search{
            margin-bottom: 15px;
        }
    }
    .el-card__header{
        span{
            font-size: 14px;
            font-weight: 700;
        }
    }
</style>