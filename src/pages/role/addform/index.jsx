import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

const {Item} = Form


//添加分类的组件
export default class AddFrom extends Component {
  form = React.createRef();
  static propTpes ={
    setForm : PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.setForm(this.form)
    
  }
  render() {
    return (     
      <Form ref={this.form} >
        <Item
        label="用户名称"
        name="roleName"
          rules={[
            {
              required: true,
              message: '输入角色名称!',
              
            },
          ]}
        >
          <Input placeholder="请输入角色"></Input>
        </Item>      
      </Form>
    )
  }
}
