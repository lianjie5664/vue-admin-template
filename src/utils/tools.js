import { Notification } from 'element-ui'
const _import = file => require('@/views/' + file + '.vue').default
/**
 * @param {string} msg
 * @returns {Boolean}
 */
export function notice(title,msg,type) {
    Notification({
        title: title == 1?'成功': '失败',
        message: msg,
        type: type == 1?'success':'error'
    });
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || '0'
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData =  cloneData.filter(father => {
	  let branchArr = cloneData.filter(child => {
		//返回每一项的子级数组
		if(father[id] === child[parentId]) child.parentName = father.name
		return father[id] === child[parentId]
	  });
	  branchArr.length > 0 ? father.children = branchArr : '';
	  //返回第一层
	  return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
  }

/**
 * 树形结构转换
 * @param {*} routers 路由列表
 * @param {*} menuList 菜单列表'
 */
  export function convertTree(routers,menuList){
	routers.forEach(r => {
		menuList.forEach((m, i) => {
		  if (m.parentId && m.parentId == r.meta.id) {
			  if (!r.children) r.children = []
			  m.fullPath = r.meta.fullPath
			  let menu = {
				  path: '/' + m.path,
				  component: _import(m.href),  //href ---> component
				  meta: { id: m.id, title: m.name, icon:m.icon, fullPath: r.meta.fullPath + '/' + m.path },
				  hidden:m.hidden == '0'? false : true ,
				  name:m.name
			  }
			  r.children.push(menu)
		  }
		})
		if (r.children) convertTree(r.children,menuList)
	})
  }
  