import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

const {Item} = Form

//修改分类的组件
export default class UpdataFrom extends Component {
  formRef = React.createRef();
  static propTypes = {
    categoryName:PropTypes.string,
    setForm:PropTypes.func.isRequired
  }
  
  componentWillMount(){
    this.props.setForm(this.formRef) 
  }
  render() {
    const {categoryName} = this.props
   
    
    const sharedProps = {
      style: {
        width: '100%',
      },
      defaultValue: categoryName,
    };
    // console.log(this.formRef)
    return (
      <Form ref={this.formRef}>
        <Item>
          <Input placeholder="请输入名称"{...sharedProps} /> 
        </Item>
        
      </Form>
    )
  }
}
