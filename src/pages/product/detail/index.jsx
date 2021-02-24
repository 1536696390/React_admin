import React, { Component } from 'react';
import {
  Card,
  List,
  Icon,
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons' 
import './index.less'
import LinkButton from '../../../components/link-button';
import {BASE_IMG_URL} from '../../../utils/constants'
import {reqCategorys} from '../../../api'
const Item = List.Item
export default class Detail extends Component {

  state ={
    cName1 : '',//一级分类名称
    cName2 : '',//二级分类名称
  }
  async componentDidMount(){
    //的带商品的分类id
    const {pCategorId,categoryId} = this.props.location.state.product
    if(pCategorId==='0'){//以及下的
      const result = await reqCategorys(categoryId)
      const cName1 = result.data.name
      this.setState({
        cName1
      })
    }else{//二级
      //性能不好
       // const result1 = await reqCategorys(pCategorId)
      // const result2 = await reqCategorys(categoryId)
      // const cName1 = result1.data.name
      // const cName2 = result2.data.name
     const results = await Promise.all([reqCategorys(categoryId),reqCategorys(categoryId)])
     
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }
    
  }
  render() {
    const {name,desc,price,detail,imgs} = this.props.location.state.product
    const {cName1,cName2} = this.state
    const title = (
      <span>
        <LinkButton 
        onClick={()=>{this.props.history.goBack()}}
        ><ArrowLeftOutlined  
        style={{color: 'green',marginRight:10,fontSize:15,cursor: 'pointer'}} 
        /></LinkButton>
        <span>商品</span>
      </span>
      )
    return (
      <Card title={title} className='detail'>
        <List>
          <Item>
            <span className='left'>商品名称:</span>
            {name}
          </Item>
          <Item>
            <span className='left'>商品描述:</span>
            {desc}
          </Item>
          <Item>
            <span className='left'>商品价格:</span>
            {price}元
          </Item>
          <Item>
            <span className='left'>所属分类:</span>
            <span>{cName1}  {cName2 ? '-->'+ cName2 : ''}</span>
            
          </Item>
          <Item>
            <span className='left'>商品图片:</span>
            {
              imgs.map( img=>(
                <img 
                key={img}
                src={BASE_IMG_URL + img}
                alt="img"/>
              ))
            }
          
          </Item>
          <Item>
            <span className='left'>商品详情:</span>
            <span 
               dangerouslySetInnerHTML={{__html:detail}}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}

