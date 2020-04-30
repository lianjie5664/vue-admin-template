<template>
    <div class="menuWrap">
        <div class="toolbar">
            <el-form :inline="true" :model="filters" size="small">
                <el-form-item>
				    <el-input v-model="filters.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" @click="handleAddMenu">新增菜单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--表格树内容栏-->
        <el-table :data="menuList" stripe size="mini" style="width: 100%;"
            rowKey="id" v-loading="loading" element-loading-text="加载中">
            <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
            </table-tree-column>
            <el-table-column header-align="center" align="center" label="图标">
                <template slot-scope="scope">
                    <i :class="scope.row.icon || ''"></i>
                </template>
            </el-table-column>
            <el-table-column prop="type" header-align="center" align="center" label="类型">
                <template slot-scope="scope">
                <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
                <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
                <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column 
                prop="parentName" header-align="center" align="center" width="120" label="上级菜单">
            </el-table-column>
            <el-table-column
                prop="path" header-align="center" align="center" width="150" 
                :show-overflow-tooltip="true" label="菜单path">
            </el-table-column>
            <el-table-column
                prop="perms" header-align="center" align="center" width="150" 
                :show-overflow-tooltip="true" label="授权标识">
            </el-table-column>
            <el-table-column
                prop="orderNum" header-align="center" align="center" label="排序">
            </el-table-column>
            <el-table-column
                fixed="right" header-align="center" align="center" width="185" label="操作">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" size="small" plain @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button icon="el-icon-delete" type="danger" size="small" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- menu add edit component -->
        <menu-add :dataForm="dataForm" :show.sync="dialogVisible" :menuOptions="menuOptions"></menu-add>
    </div>
</template>
<script>
import TableTreeColumn from "@/views/common/TableTreeColumn";
import MenuAdd from '@/views/sys/menu/components/menuAdd'
import { handleTree } from '@/utils/tools'
export default {
    data(){
        return {
            filters: {
                name: ""
            },
            loading: false,
            menuList: [],
            dialogVisible: false,
            menuTypeList: ["目录", "菜单", "按钮"],
            dataForm: {
                id: 0,
                type: 1,
                name: "",
                parentId: 0,
                parentName: "",
                path: "",
                perms: "",
                orderNum: 0,
                icon: "",
            },
            menuOptions:[]
        }
    },
    components:{TableTreeColumn,MenuAdd},
    methods:{
        handleAddMenu(){
            this.dialogVisible = true;
            this.dataForm = {
                id: 0,
                type: 1,
                name: "",
                parentId: 0,
                parentName: "",
                path: "",
                perms: "",
                sort: 0,
                icon: "",
            }
        },
        handleEdit(row) {
            this.dialogVisible = true;
            Object.assign(this.dataForm, row);
        },
    },
    created(){
        let menuList = [
            {id: 1,label: "系统管理",parentId: 0},
            {id: 2,label: "用户管理",parentId: 1},
            {id: 3,label: "2方法",parentId: 1},
            {id: 4,label: "3试试",parentId: 1},
            {id: 5,label: "4规格",parentId: 1},
            {id: 6,label: "5哈哈",parentId: 1},
        ]
        const menu = { id: 0, label: '顶级栏目', children: [] };
        menu.children = handleTree(menuList, "id");
        this.menuOptions.push(menu);
        this.menuList = [
            {
                createBy: null,
                createTime: null,
                delFlag: 0,
                icon: "el-icon-setting",
                id: 1,
                lastUpdateBy: null,
                lastUpdateTime: null,
                level: 0,
                name: "系统管理",
                sort: 0,
                parentId: 0,
                parentName: null,
                perms: null,
                type: 0,
                path: null,
                children:[
                    {
                        createBy: null,
                        createTime: null,
                        delFlag: 0,
                        icon: "el-icon-service",
                        id: 2,
                        lastUpdateBy: null,
                        lastUpdateTime: null,
                        level: 1,
                        name: "用户管理",
                        sort: 1,
                        parentId: 1,
                        parentName: "系统管理",
                        perms: null,
                        type: 1,
                        path: "/sys/user",
                        children:[
                            {
                                createBy: null,
                                createTime: null,
                                delFlag: 0,
                                icon: null,
                                id: 9,
                                lastUpdateBy: null,
                                lastUpdateTime: null,
                                level: 2,
                                name: "查看",
                                sort: 0,
                                parentId: 2,
                                parentName: "用户管理",
                                perms: "sys:user:view",
                                type: 2,
                                path: null
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
</script>
<style lang="less" scoped>
    .menuWrap{
        margin: 16px 20px 0;
        padding: 15px;
        box-shadow: 0 0 10px #ccc;
    }
</style>