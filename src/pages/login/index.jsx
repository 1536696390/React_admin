import React, { Component } from 'react'
import {withRouter,Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd';

import  './index.less';
import {reqLogin} from '../../api'
import login from '../../assets/images/logo.png'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default class Login extends Component {
  // formRef = React.createRef();
  // onReset = () => {
  //   this.formRef.current.resetFields();
  // };
  onFinish = async val => {
    // console.log("成功", val);
    
    const {username,password} = val
    const result = await reqLogin(username,password)
    // console.log('请求成功',result,'aa:',history)
    if (result.status === 0) {
      message.success('登录成功');
      const user = result.data
      memoryUtils.user = user
      storageUtils.saveUser(user)
      this.props.history.push('/admin')
      
     console.log()
    }else{
      message.error(result.msg);
    }
    
  };

  
  render() {

   const user =  memoryUtils.user
   if(user && user._id){
     return <Redirect to='/'/>
   }
    return (   
      <div className='login'>
        <header className='login-header'>
          <img src={login} alt="login"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form  
          ref={this.formRef}
          onFinish={this.onFinish}
          onReset={this.onReset} className="login-form">
            <Form.Item name="username" 
            rules={[
              { required: true,message:'请输入用户名' },
              { min: 4,message:'长度必须大于4位' },
              { max: 12,message:'长度必须小于12位' },
              { pattern: /^[a-zA-Z0-9]+$/,message:'用户名要以数字字母组成' }
              ]}
            initialValue={'admin'}
              >
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item name="password" 
            rules={[
              { required: true,message:'请输入密码'},
              { min: 4,message:'长度必须大于4位' },
              { max: 12,message:'长度必须小于15位' },
              ]}>
              <Input
                prefix={<Icon type="lock" style={{
                  color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
                />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
              登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

// export default withRouter(Login)

