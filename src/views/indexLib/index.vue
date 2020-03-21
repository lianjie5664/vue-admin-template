<template>
    <div class="app-container">
        <el-row>
            <el-button type="primary" icon="el-icon-plus" plain>新增</el-button>
            <el-button type="info" icon="el-icon-edit" plain>编辑</el-button>
        </el-row>
        <div class="table">
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                >
                <el-table-column align="center" label="编号" width="95" header-align="center">
                    <template slot-scope="scope">
                    {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="奖项名称" header-align="center">
                    <template slot-scope="scope">
                    {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column label="创建人" align="center" header-align="center">
                    <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" header-align="center">
                    <template slot-scope="scope">
                    {{ scope.row.pageviews }}
                    </template>
                </el-table-column>
                <el-table-column class-name="status-col" label="状态" align="center" header-align="center">
                    <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 0?'danger':'success'">{{ scope.row.status | statusFilter }}</el-tag>
                    </template>
                </el-table-column>
                 <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row,$index}">
                        <el-button type="primary" size="mini" @click="handleUpdate(row)">
                            <router-link :to="'enter/'+row.id">编辑</router-link>
                        </el-button>
                        <el-button size="mini" type="danger">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getList } from '@/api/table'
import {statusFilter} from '@/utils/filter'
export default {
    data(){
        return {
            list: null,
            listLoading: true
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            getList().then(response => {
                this.list = response.data.items
                this.listLoading = false
            })
        }
    }
}
</script>
<style scoped>
    .table{
        margin-top:20px;
    }
</style>