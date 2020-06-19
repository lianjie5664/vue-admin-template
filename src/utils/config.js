export const ueditorConfig = {
    // 编辑器不自动被内容撑高
    autoHeightEnabled: false,
    // 初始容器高度
    initialFrameHeight: 240,
    // 初始容器宽度
    initialFrameWidth: '100%',
    imagePrefix:'https://imgs.cecicloud.com',
    // 上传文件接口
    serverUrl: 'http://em.cecicloud.com/ueditor/editorUpload.do',
    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
    UEDITOR_HOME_URL: '/Ueditor/',
    autoHeightEnabled: true, // 编辑器是否自动被内容撑高
}