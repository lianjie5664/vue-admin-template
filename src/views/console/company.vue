<template>
    <div class="company-console-wrap">
        <el-row :gutter="15">
            <el-col :span="12">
                <div class="business-entrance">
                    <div class="block">
                        <div class="head">
                            <span>常用入口</span>
                        </div>
                        <div class="content">
                            <div class="business-item">
                                <div class="icon">
                                    <img src="../../assets/imgs/bus-role.png" alt="">
                                </div>
                                <div class="desc">
                                    权限管理
                                </div>
                            </div>
                            <div class="business-item">
                                <div class="icon">
                                    <img src="../../assets/imgs/bus-user.png" alt="">
                                </div>
                                <div class="desc">用户管理</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="company-baseInfo">
                    <div class="block">
                        <div class="head">
                            <span>企业基本信息</span>
                        </div>
                        <div class="content">
                            test
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import './console.less'
export default {
    data(){
        return {

        }
    }
}
</script>
