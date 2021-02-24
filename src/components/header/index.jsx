import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal,okText } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButtom from '../link-button'
import './index.less'
class Header extends Component {
  //退出对话框
  logout = ()=>{
    Modal.confirm({
      title: '确定要退出吗?',
      okText  :"确定",
      cancelText: '取消',
      onOk :()=> {
        
        
        //删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user={}
        //跳转到login
        this.props.history.replace('/login')
      }
      
    })
  }
  render() {
    const user = memoryUtils.user.username
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{user}</span>
          {/* <a href="#" onClick={this.logout}>退出</a> */}
          <LinkButtom onClick={this.logout} >退出</LinkButtom>
        </div>
        <div className="header-bottom">
          {/* <div className="header-bottom-left">首页</div> */}
          <div className="header-bottom-right">
            <span>2021</span>
           
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)