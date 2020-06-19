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
import { ueditorConfig} from '@/utils/config'
export default {
    data(){
        return {
            contents:'',
            myConfig: ueditorConfig
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