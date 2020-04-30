<template>
    <div class="userTable">
        <el-table
            ref="userTable"
            v-loading="listLoading"
            :data="userList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            @selection-change="selectRow">
            >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="编号" width="95">
                <template slot-scope="scope">
                {{ scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column label="用户账号" >
                <template slot-scope="scope">
                    {{ scope.row.loginName }}
                </template>
            </el-table-column>
            <el-table-column label="用户名称">
                <template slot-scope="scope">
                {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="用户角色">
                <template slot-scope="scope">
                    {{ scope.row.roleNames }}
                </template>
            </el-table-column>
            <el-table-column label="用户类型">
                <template slot-scope="scope">
                    {{ scope.row.userType }}
                </template>
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.loginFlag"
                        :active-value="'1'"
                        :inactive-value="'0'"
                        active-color="#13ce66"
                        @change="handleSwitchChange(scope.row)"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                {{ scope.row.createDate }}
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <template slot-scope="scope">
                {{ scope.row.updateDate }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                        <el-button size="mini" type="primary" plain @click="editUser(row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" plain @click="deleteUser(row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageStyle">
            <el-pagination class="pageStyle"
                background
                @current-change="current_change"
                :page-size="pageSize"
                layout="total,prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            editRow :{ },
        }
    },
    props:{
        listLoading:{
            type:Boolean,
            default:true
        },
        userList:{
            type:Array,
            default:[]
        },
        pageSize:{
            type:Number,
            default:10
        },
        total:{
            type:Number,
            default:1000
        }
    },
    methods:{
        editUser(row){
            this.$emit('editUser',row)
        },
        deleteUser(row){
            this.$emit('deleteUser',row)
        },
        selectRow(selection){
            if(selection.length > 1){
                let del_row = selection.shift();
                this.$refs.userTable.toggleRowSelection(del_row, false);
            }

            if(selection.length == 1){
                this.editRow = selection[0]
            }
            this.$emit('giveData',selection[0])
        },
        current_change(currentPage){
            this.$emit('pageChange',currentPage)
        },
        handleSwitchChange(row){
            if(parseInt(row.loginFlag) == 0){
                this.$emit('lockUser',{id:row.id})
            }else{
                this.$emit('activationUser',{id:row.id})
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .userTable{
        overflow: hidden;
        .pageStyle{
            float: right;
            margin-top: 15px;
        }
    }
</style>