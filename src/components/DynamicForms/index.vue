<template>
    <div>
        <dynamic-form
            v-model="formData"
            :descriptors="descriptors">
        </dynamic-form>
    </div>
</template>
<script>
import DynamicForm from 'vue-dynamic-form-component'
export default {
    name:'dynamicForm',
    data(){
        return {
            formData:{}
        }
    },
    components: {
        DynamicForm
    },
    props:{
        descriptors:{
            type:Object,
            default:{}
        }
    }
}
</script>