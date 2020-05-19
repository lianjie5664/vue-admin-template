<template>
    <div>
        <transition mode="out-in">
            <component :is="comp"></component>
            {{name}}
        </transition>
    </div>
</template>
<script>
export default {
  data () {
    return {
    //   compName: this.name
    }
  },
  props: ['name'],
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
    }
  },
}
</script>   