import React, { Component } from 'react'

import {Form,Select,Input} from 'antd'

const {Item} = Form
const {Option} = Select

//添加分类的组件
export default class AddFrom extends Component {
  
  render() {
 
    return (     
      <Form>
        <Item>
          <Select defaultValue="jack" style={{ width: '100%' }}>
            <Option value="jack">一级分类</Option>
            <Option value="lucy">家用电器</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Item>
        <Item>
          <Input placeholder="请输入名称"></Input>
        </Item>      
      </Form>
    )
  }
}
