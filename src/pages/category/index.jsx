import React, { Component } from 'react'
import {Card, Table,Button, message,Modal} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
/*品类路由 */
import LinkButton from '../../components/link-button'
import {reqCategory,reqCategoryUpdate,reqCategoryAdd} from '../../api'
import {ArrowRightOutlined} from '@ant-design/icons'


import AddFrom from './addfrom'
import UpdataFrom from './updatafrom'
export default class Category extends Component {

  state = {
    loading:false,
    categorys :[],//一级分类数组列表
    parentId:'0',//当前需要显示列表的parentId
    parentName:'',//名称
    subCategorys:[],//子分类列表
    showState:0//标识天机和更新的对话框是否显示 ， 0为不显示
  }
  
  //初始化Table所有列的数据
  initColumns =()=>{
    this.columns = [
      {
        title: '分类名称',
        dataIndex:'name',
      },
      {
        title: '操作', 
        width:'300px',
        render: (category) => {
         return(
          <span>
            <LinkButton onClick={()=>this.showUpdata(category)}>修改分类</LinkButton>
            {
              this.state.parentId === '0' ? <LinkButton onClick={()=>{this.showSubCategorys(category)}}>查看子分类</LinkButton> : null
            }
           
          </span>
         )
        }
        
      },
    ];
  }
  //显示二级列表
  showSubCategorys = (category)=>{
    //更新状态
    this.setState({
      parentId : category._id,
      parentName : category.name
    },()=>{
      //获取二级列表
      this.getCategorys()
      console.log(this.state.parentId)
    })
   
  }
  //显示一级列表
  showCategorys =()=>{
    this.setState({
      parentId:'0',
      subCategorys:[]
    })
  }
  //相应点击取消的回调
  handleCancel = ()=>{
    this.setState({
      showState:0
    })
  }
  //点击添加的回调
  showAdd = ()=>{
    this.setState({
      showState:1
    })
  }
  
  //相应添加的回调
  addCategory = ()=>{

  }
  //点击修改的回调
  showUpdata =(category)=>{
    //保存分类对象
    this.category = category
    //更新状态
    this.setState({
      showState:2
    })
  }
  //相应修改的回调
  updataCategory = async ()=>{
    //1隐藏确定框
    this.setState({
      showState:0
    })
    //准备数据
    const categoryId = this.category._id
    const categoryName = this.formRef.current.getFieldsValue('categoryName');
    console.log(categoryName)
    // console.log(this.formRef)
   
    //2发送请求
    const result = await reqCategoryUpdate({categoryId,categoryName})
    if(result.status === 0){
    //3重新显示
      this.getCategorys(this.category)
    }
   
  }
  //异步获取一级/二级列表
  getCategorys = async()=>{
    //再发请求前，显示Loding
    this.setState({loading:true})
    const {parentId} = this.state
    const result = await reqCategory(parentId)
     //在请求完成后，隐藏loading
     this.setState({loading:false})
    if(result.status  === 0){
      //取出数据
      const categorys = result.data
     if(parentId==='0'){
        //更新一级状态
      this.setState({
        categorys
      })
     }else{
      this.setState({
        subCategorys:categorys
      })
     }
    }else{
      message.error('获取失败')
    }
  }
  componentWillMount(){
   this.initColumns()
  }   
  //发布异步ajax请求
  componentDidMount(){
    this.getCategorys()
  }
  render() {
  
    const {categorys,loading,parentId,parentName,subCategorys,showState} = this.state
    
    const category = this.category || {}
    const title = parentId === '0' ? '一级分类' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类</LinkButton>
        <span style={{marginRight:5}}>{<ArrowRightOutlined />}</span>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button onClick={this.showAdd}  type='primary' icon={<PlusOutlined />}>添加</Button>
    )
    return (
      <Card title={title} extra={extra} >       
        <Table 
          rowKey='_id'
          loading={loading}
          bordered 
          dataSource={parentId === '0' ? categorys : subCategorys} 
          columns={this.columns} 
          pagination={{defaultPageSize:5,showQuickJumper:true}}    
          />
          <Modal title="添加分类" visible={showState===1} onOk={this.addCategory} onCancel={this.handleCancel}>
            <AddFrom/>
            
          </Modal>
          <Modal title="更新分类" visible={showState===2} onOk={this.updataCategory} onCancel={this.handleCancel}>
            <UpdataFrom 
              categoryName={category.name} 
              setForm ={(form)=>{this.formRef= form}}/>
           
          </Modal>
      </Card>
    )
  }
}
