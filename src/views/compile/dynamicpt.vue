<template>
    <div>
        <transition mode="out-in">
            <component :is="comp" :id="ids" :awardId="awardId" :key="ids"></component>
        </transition>
    </div>
</template>
<script>
export default {
  data () {
    return {
  
    }
  },
  props: ['name','aid','awardId'],
  computed: {
    comp() {
        try{
            
            let name = this.name
            console.log('已加载模板=======>',this.name)
            if(name !== "" && name !== undefined){
                let path = name.split('-')
                return require(`./${path[0]}/${path[1]}`).default
            }else{
                return require(`./404`).default
            }
            
        }catch(err){
            console.log(err)
        }
    },
    ids(){
        return this.aid
    },
    awardIds(){
        return this.awardId
    }
  },
}
</script>   