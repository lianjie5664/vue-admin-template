<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="24" class="dept-box">
        <el-input
          placeholder="搜索"
          size="small"
          class="mt15 mb15"
          suffix-icon="el-icon-search"
          v-model="searchVal"
        ></el-input>
        <el-tree
          :data="treeData"
          ref="userTree"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          class="user-dept"
          @node-expand="expand"
          @node-collapse="close"
          :render-content="renderContent"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
        ></el-tree>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
    //   data: data,
      searchVal:''
    };
  },
  props:{
    treeData:Array,
    default:[]
  },
  methods: {
    expand(data) {
      data.className = "el-icon-folder-opened mr10 ";
    },
    close(data) {
      data.className = "el-icon-folder mr10";
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.className}></i>
          <span>{node.label}</span>
        </span>
      );
    },
    handleNodeClick(data){
        this.$emit('nodeClick',data)
    },
    filterNode(value,data){
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
  watch:{
    searchVal(oldVal,newVal){
      this.$refs.userTree.filter(oldVal);
    }
  }
};
</script>

<style lang="less" scoped>
    .dept-box{
        height:calc(100vh - 315px);
        padding-bottom:15px;
        border:solid 1px #EBEEF5;
    }
</style>