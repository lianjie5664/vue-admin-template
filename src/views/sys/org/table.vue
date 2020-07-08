<template>
   <div>
       <el-table
          :data="tableData"
          highlight-current-row
          v-loading="loading"
          tooltip-effect="dark"
          header-cell-class-name="table-header-style"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          @row-click="selectRow"
          border
        >
          <el-table-column prop="name" label="单位名称" sortable></el-table-column>
          <el-table-column prop="code" label="归属区域" sortable width="180">
              <template slot-scope="scope">
                  {{code(scope.row)}}
              </template>
          </el-table-column>
          <el-table-column prop="address" label="联系地址"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="fax" label="传真"></el-table-column>
          <el-table-column prop="email" label="电子邮箱"></el-table-column>
        </el-table>
   </div>
</template>

<script>
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
    data(){
        return {
            regionDataPlus
        }
    },
    props:{
        tableData: {
            type: Array,
            default: []
        },
        loading:{
            type: Boolean,
            default: true
        }
    },
    methods:{
        selectRow(row){
            this.$emit('selectRow',row)
        },
        code(row){
            try{
                return CodeToText[row.code[0]] +' / '+ CodeToText[row.code[1]] +' / '+CodeToText[row.code[2]]
            }catch(err){
                console.log(err)
            }
        }
        
    },
    computed:{
        
    }
}
</script>
