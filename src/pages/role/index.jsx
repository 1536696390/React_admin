import React, { Component } from 'react'

import {
  Card,
  Table,
  Button,
  Modal,
  message
} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles,reqAddRole} from '../../api'
import AddForm from './addform'
/*角色路由 */


export default class Role extends Component {
  state ={
    roles:[],
    role:{},
    isShowAdd:false
  }
  initColumn = ()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
  }
  getRoles= async()=>{
    const result = await reqRoles()
    if(result.status === 0){
      const roles = result.data
      this.setState({
        roles
      })
    }
    
   
  }
  //添加角色
  addRole =  () =>{
    //1收集输入的数据
    this.form.current.validateFields().then(async values=>{
      
      if (values) {
        
        this.setState({
          isShowAdd:false
        })
        const {roleName} = values
        
        // this.form.resetFields()
         // 2添加
         const result = await reqAddRole(roleName)
          //3根据结果更新列表
          
         if(result.status === 0){
           message.success('添加角色成功')
           //新的角色
            const role = result.data
            
            this.setState(state =>({
              roles:[...state.roles,role]
            }))
            // const roles = this.state.roles
            // roles.push(role)
            // this.setState({
            //   roles
            // })
            
         }else{
          message.error('添加角色失败')
          
           
         }
      }
    }).catch(error=>{

    })
  
    

  
   
   
  }
  componentWillMount(){
    this.initColumn()
  }
  componentDidMount(){
    this.getRoles();
  }
  onRow =(role)=>{
    return {
      // 点击行
      onClick: event => {
        this.setState({
          role
        })
      }, 
    }
  }
  render() {
    const {roles,role,isShowAdd} = this.state
    const title = (
      <span>
        <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>添加角色</Button>&nbsp;&nbsp;
        <Button type='primary' disabled={!role._id}>角色权限</Button>
      </span>
    )
    return (
     <Card title={title}>
       <Table 
          rowKey='_id'
          bordered
          dataSource={roles} 
          columns={this.columns} 
          pagination={{defaultPageSize:PAGE_SIZE}}
          rowSelection={{type:'radio', selectedRowKeys:[role._id]}}
          onRow={this.onRow}
        />
        <Modal title="添加角色" 
          visible={isShowAdd} 
          onOk={this.addRole} 
          onCancel={()=>{this.setState({isShowAdd:false})}}>
            <AddForm 
              setForm ={(form)=>this.form = form}/> 
          </Modal>
     </Card>
    )
  }
}
