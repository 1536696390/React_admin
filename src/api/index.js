/**
 * 包含应用中所以接口请求函数的模块
 */
import ajax from "./ajax";

//登录
//  export function reqLogin(){
//   return ajax('/login',{username,password},'post')
//  }

export const reqLogin = (username, password) => ajax("/login", { username, password }, "POST");

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')


//获取一级/二级分类的列表
export const reqCategory = (parentId) => ajax('/manage/category/list',{parentId})
//添加分类

export const reqCategoryAdd = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'POST')

//修改分类
export const reqCategoryUpdate = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId ,categoryName },'POST')

//获取商品分类

export const reqProducts = (pageNum ,pageSize) => ajax('/manage/product/list',{pageNum ,pageSize})

//搜索商品分页
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax('/manage/product/search',{
  pageNum,
  pageSize,
  [searchType]:searchName
})
//获取一个分类
export const reqCategorys = (categoryId) => ajax('/manage/category/info',{categoryId })

//更新商品状态
export const reqUpdateStatus = ({productId,status}) => ajax('/manage/product/updateStatus',{productId,status},'POST')
//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete',{name},'POST')
//添加商品
export const reqAddProduct = (product) =>ajax('/manage/product/' + (product._id ? 'update' : 'add'),product,'POST')
//获取角色列表

export const reqRoles =()=>ajax('/manage/role/list')

//添加角色
export const reqAddRole= (rolename) =>ajax('/manage/role/add',{rolename},'POST')