<template>
    <div class="single-editor">
        <vue-ueditor-wrap v-model="contents" :config="myConfig"></vue-ueditor-wrap>
        <div style="height:80px;"></div>
        <div class="submit-box">
            <el-button type="primary" @click="handleSubmit">提交保存</el-button>
        </div>
    </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import './cs.less'
import {savaQaRept,getReptCompileDetail} from '@/api/award' 
import {notice} from '@/utils/tools'
export default {
    data(){
        return {
            contents:'',
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: 'http://35.201.165.105:8000/controller.php',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: '/Ueditor/'
            }
        }
    },
    components:{VueUeditorWrap},
    props:['id','awardId'],  
    methods:{
        handleSubmit(){
            let data = {
                awardId:this.awardId,
                standardId:this.id,
                description:this.contents
            }
            savaQaRept(data).then( res => {
                if(res.code == 1){
                    notice(1,'保存成功！',1)
                }else{
                    notice(0,'保存失败，请重试！',0)
                }
            })
        },
        getDetail(){
            getReptCompileDetail({standardId:this.id}).then((res) =>{
                if(res.code == 1){
                    this.contents = res.data.description
                }
            })
        }
    },
    created(){
        this.getDetail()
    }
}
</script>