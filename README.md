# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template


**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

## Build Setup


```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.



静态路由格式
  // let menuList = [
    //   {"id":7,"title":"指标库","parentId":0,"path":"indexLib","icon":"el-icon-s-data","hidden": false,"alwaysShow":true},
    //   {"id":8,"title":"奖项列表","parentId":7,"path":"indexLib/index","href":"indexLib/index","icon":"el-icon-trophy-1","hidden": false,"alwaysShow":true},
    //   {"id":4,"title":"配置奖项","parentId":7,"path":"indexLib/enter/:id","href":"indexLib/enter","icon":"book","hidden": true,"alwaysShow":true},

    //   {"id":5,"title":"报告编制","parentId":0,"path":"report","icon":"el-icon-edit","hidden": false,"visiable":false},
    //   {"id":9,"title":"报告编制","parentId":5,"path":"report/index","icon":"el-icon-edit","href":"report/index","hidden": false},
    //   {"id":6,"title":"进入编制","parentId":5,"path":"report/compile/:id","href":"report/compile","icon":"el-icon-edit","hidden": true},

    //   {"id":1,"title":"系统管理","name":"sys","parentId":0,"path":"sys","icon":"el-icon-setting","hidden": false,"alwaysShow":true},
    //   {"id":2,"title":"菜单管理","name":"menu","icon":"el-icon-menu","parentId":1,"path":"sys/menu","href":"sys/menu/index","hidden": false,"alwaysShow":true},
    //   {"id":2,"title":"角色管理","name":"role","icon":"el-icon-bangzhu","parentId":1,"path":"sys/role","href":"sys/role/index","hidden": false,"alwaysShow":true},
    //   {"id":3,"title":"用户管理","name":"user","icon":"el-icon-user","parentId":1,"path":"sys/user","href":"sys/user/index","hidden": false,"alwaysShow":true},
    // ],menuRouters =[]
