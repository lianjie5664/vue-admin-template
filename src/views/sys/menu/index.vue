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
        <el-table :data="optionData" border size="mini" style="width: 100%;"
            rowKey="id" v-loading="loading" element-loading-text="加载中">
            <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column header-align="center" align="center" label="图标">
                <template slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                </template>
            </el-table-column>
            <el-table-column prop="type" header-align="center" align="center" label="类型">
                <template slot-scope="scope">
                <el-tag v-if="scope.row.type === '101100001'" size="small">目录</el-tag>
                <el-tag v-else-if="scope.row.type === '101100002'" size="small" type="success">菜单</el-tag>
                <el-tag v-else-if="scope.row.type === '101100003'" size="small" type="info">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="parentName" header-align="center" align="center" label="上级菜单">
            </el-table-column>
            <el-table-column
                prop="href" header-align="center" align="center"
                :show-overflow-tooltip="true" label="组件路径">
            </el-table-column>
            <el-table-column
                prop="permission" header-align="center" align="center"
                :show-overflow-tooltip="true" label="授权标识">
            </el-table-column>
            <el-table-column
                prop="sort" header-align="center" align="center" label="排序">
            </el-table-column>
            <el-table-column
                fixed="right" header-align="center" align="center" width="185" label="操作">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" size="small" plain @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button icon="el-icon-delete" type="danger" size="small" plain @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- menu add edit component -->
        <menu-add :dataForm="dataForm" @save="handleSaveMenu" :show.sync="dialogVisible" :menuOptions="menuOptions"></menu-add>
    </div>
</template>
<script>
import TableTreeColumn from "@/views/common/TableTreeColumn";
import MenuAdd from '@/views/sys/menu/components/menuAdd'
import { handleTree } from '@/utils/tools'
import {menuList,menuSave,menuDel} from '@/api/menu'
export default {
    data(){
        return {
            filters: {
                name: ""
            },
            loading: false,
            menuList: [],
            dialogVisible: false,
            dataForm: {
                id: 0,
                type: 1,
                name: "",
                parentId: 0,
                parentName: "",
                href: "",
                perms: "",
                orderNum: 0,
                icon: "",
                hidden:0,
                alwaysShow:0
            },
            menuOptions:[]
        }
    },
    components:{TableTreeColumn,MenuAdd},
    methods:{
        handleAddMenu(){
            this.dialogVisible = true;
            this.getMenuList()
            this.dataForm = {
                // id: 1,
                type: "101100002",
                name: "",
                parentId: 0,
                href: "",
                permission: "",
                sort: 0,
                icon: "",
                hidden:0
            }
        },
        handleEdit(row) {
            this.dialogVisible = true;
            this.dataForm = row;
        },
        handleDel(row){
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                menuDel({id:row.id}).then((res) =>{
                    if(res.code == 1){
                        this.getMenuList()
                    }
                })
                }).catch(() => {
            });
        },
        getMenuList(){
            menuList({}).then((res) =>{
                res.data.map((v) =>{
                    v.label = v.name
                })
                let menuTree = handleTree(res.data, "id")
                this.menuList = menuTree
                this.menuOptions = []
                const menu = { id: 0, label: '顶级项', children: [] }
                menu.children = menuTree
                this.menuOptions.push(menu)
            })
        },
        handleSaveMenu(data){
            menuSave(data).then((res) =>{
                if(res.code == 1){
                    this.getMenuList()
                }
                this.dialogVisible = false
            })
        },
    },
    computed: {
        /* 转树形数据 */
        optionData() {
            let cloneData = JSON.parse(JSON.stringify(this.menuList)); // 对源数据深度克隆
            return cloneData.filter(father => {
                // 循环所有项，并添加children属性
                let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
                branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
                return father.parentId == 0; //返回第一层
            });
        }
    },
    created(){
        this.getMenuList()
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