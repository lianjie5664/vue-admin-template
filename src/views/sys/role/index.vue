<template>
    <div class="roleWrap">
        <el-row :gutter="10">
            <div class="role-search">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <el-button round icon="el-icon-circle-plus-outline" size="small">新建角色</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-col :span="15">
                <el-table
                    ref="userTable"
                    v-loading="listLoading"
                    :data="roleList"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    @row-click="selectRow"
                    @selection-change="selectRow">
                    >
                    <el-table-column align="center" label="编号" width="120">
                        <template slot-scope="scope">
                        {{ scope.$index + 1}}
                        </template>
                    </el-table-column>
                        <el-table-column align="center" label="角色编码" width="120">
                        <template slot-scope="scope">
                        {{ scope.row.roleKey }}
                        </template>
                    </el-table-column>
                    <el-table-column label="角色名称" align="center" width="150">
                        <template slot-scope="scope">
                        {{ scope.row.roleName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <template slot-scope="{row}">
                                <el-button size="mini" plain type="primary">
                                编辑
                            </el-button>
                            <el-button size="mini" plain type="danger">
                                删除
                            </el-button>
                            <el-button size="mini" plain type="warning" @click="showModal('user',row)">
                                用户
                            </el-button>
                            <el-button size="mini" plain type="success" @click="showModal('role',row)">
                                权限
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="9">
                <div v-if="modal.roleUserCtx == true">
                    <el-card class="box-card" shadow="always">
                        <div slot="header" class="clearfix">
                            <span>{{roleForm.roleName}}用户列表</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        
                    </el-card>
                </div>
                <div v-else>
                    <el-card class="box-card" shadow="always">
                        <div slot="header" class="clearfix">
                            <span>{{roleForm.roleName}}权限菜单</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        <el-tree
                            :data="menuData"
                            :expand-on-click-node="true"
                            class="project-tree"
                            unselectable="on"
                            show-checkbox
                            :render-content="renderContent"
                        ></el-tree>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <!--  编辑角色 -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            roleFormVisible:false,
            roleForm:{
                roleKey:1,
                roleName:1,
            },
            roleList:[{
                id:0,
                roleName:'普通用户',
                roleKey:'100101'
            },{
                id:1,
                roleName:'管理员',
                roleKey:'100102'
            },{
                id:2,
                roleName:'评审员',
                roleKey:'100103'
            },{
                id:3,
                roleName:'政府人员',
                roleKey:'100104'
            }],
            listLoading:false,

            modal:{
                roleUserCtx:false,
                roleConfigCtx:false,
            },
            "menuData": [
                {
                "id": 1,
                "label": "haha",
                "className": "first-level",
                "children": [
                    {
                    "id": 11,
                    "label": "hehe",
                    "className": "second-level",
                    "children": [
                            {
                                "id": 111,
                                "className": "third-level",
                                "label": "heihei"
                            }
                        ]
                    }
                    ]
                }
            ]
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
            this.roleForm = Object.assign({},this.roleForm,row)
        }
    },
    created(){
        this.roleForm = this.roleList[0]
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