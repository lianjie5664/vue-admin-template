<template>
    <div class="main_market_en_ind">
        <table class="dataTable">
            <tbody>
                <tr>
                    <td colspan="2" class="cener">主导产品名称</td>
                    <td><input type="text" v-model="formData.mp.m1" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.mp.m2" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.mp.m3" class="noborIpt"></td>
                </tr>
                <tr>
                    <td rowspan="3" class="cener w50">市场占有份额</td>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.ms.z1" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.ms.z2" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ms.z3" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ms.z4" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.ms.z5" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.ms.z6" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ms.z7" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ms.z8" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.ms.z9" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.ms.z10" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ms.z11" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ms.z12" class="noborIpt"></td>
                </tr>
                <tr>
                    <td rowspan="3" class="cener w50">顾客满意程度</td>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.cl.c1" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.cl.c2" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cl.c3" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cl.c4" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.cl.c5" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.cl.c6" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cl.c7" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cl.c8" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.cl.c9" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.cl.c10" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cl.c11" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cl.c12" class="noborIpt"></td>
                </tr>
                <tr>
                    <td rowspan="3" class="cener w50">顾客忠诚程度</td>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.cs.e1" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.cs.e2" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cs.e3" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cs.e4" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.cs.e5" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.cs.e6" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cs.e7" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cs.e8" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.cs.e9" class="dateIpt">年</td>
                    <td><input type="text" v-model="formData.ei.e0" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cs.e11" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.cs.e12" class="noborIpt"></td>
                </tr>
                <tr>
                    <td colspan="2" rowspan="5" class="cener">环境指标</td>
                    <td class="gray"><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.ei.e1" class="dateIpt">年</td>
                    <td class="gray"><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.ei.e2" class="dateIpt">年</td>
                    <td class="gray"><input type="text" placeholder="输入年份" maxlength="4" v-model="formData.ei.e3" class="dateIpt">年</td>
                </tr>
                <tr>
                    <td><input type="text" v-model="formData.ei.e4" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e5" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e6" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" v-model="formData.ei.e7" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e8" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e9" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" v-model="formData.ei.e10" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e11" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e12" class="noborIpt"></td>
                </tr>
                <tr>
                    <td><input type="text" v-model="formData.ei.e13" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e14" class="noborIpt"></td>
                    <td><input type="text" v-model="formData.ei.e15" class="noborIpt"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import './cs.less'
export default {
    data(){
        return {
            formData:{
                mp:{m1:'',m2:'',m3:''},
                ms:{z1:'',z2:'',z3:'',z4:'',z5:'',z6:'',z7:'',z8:'',z9:'',z10:'',z11:'',z12:''},
                cl:{g1:'',g2:'',g3:'',g4:'',g5:'',g6:'',g7:'',g8:'',g9:'',g10:'',g11:'',g12:''},
                cs:{c1:'',c2:'',c3:'',c4:'',c5:'',c6:'',c7:'',c8:'',c9:'',c10:'',c11:'',c12:''},
                ei:{e1:'',e2:'',e3:'',e4:'',e5:'',e6:'',e7:'',e8:'',e9:'',e10:'',e11:'',e12:'',e13:'',e14:'',e15:''},
            }
        }
    },
    methods:{
        submit(){
            console.log(111,this.formData)
        }
    }
}
</script>