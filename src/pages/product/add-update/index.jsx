import React, { Component } from 'react';
import {
  Card,
  Form,
  Input,
  Cascader,
  Button,
  message,
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/link-button'
import {reqCategory ,reqAddProduct} from '../../../api'
import Picureswall from './pictureswall'
import RichTextEditor from  '../richtexteditor'

// const {Item} = Form
const {TextArea } = Input

export default class AddUpdate extends Component {

  state ={
    options:[],
  }
  formRef = React.createRef();
  
  constructor(props){
    super(props)
    this.pw = React.createRef()
    this.editor = React.createRef()
  }
  initOptions=async (categorys)=>{
    
    //根据categorys生成新的数组
   const options = categorys.map(c =>({
        value: c._id,
        label: c.name,
        isLeaf: false,
    }))
    //二级列表的更新
    const {isUpdate,product} = this
    const {pCategoryId,categoryId} = product

    if(isUpdate && pCategoryId!=='0'){
      const subCategroys = await this.getCategorys(pCategoryId)
      //生成二级数组
      const childOptins = subCategroys.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      const targetOption = options.find(option => option.value === pCategoryId)
      targetOption.children = childOptins
    }
    //更新options状态
    this.setState({
      options
    })
  }
  getCategorys = async (parentId) =>{
    
   const result = await reqCategory(parentId)
   if(result.status === 0){
     
    const categorys = result.data
    //如果是一级分类
    if(parentId==='0'){
      this.initOptions(categorys)
    }else{//二级
     return categorys
    }
    
   }
  }

  validatorPrice = (rule, value)=>{
    return new Promise(async (resolve, reject) => {
      if( value * 1 <= 0){
        await reject('价格必须要大于0')
      }else if(value == null){
        await reject('请输入商品价格')
      }
      else{
        await resolve()
      }
    })
  }

  
  submit = ()=>{
    return new Promise((resolve, reject) => {
      this.formRef.current.validateFields().then(async values => {
        if(values){
          const {name, desc,price,categoryIds} = values
          let pCategoryId,categoryId
          if (categoryIds.length === 1 ) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
          }else{
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
          }

          const imgs = this.pw.current.getImgs()
          const detail = this.editor.current.getDetail()

          const product = {name, desc,price,imgs,detail}
          //如果是更新，需要添加_id
          if(this.isUpdate){
            product._id = this.product._id
          }

          const result = await reqAddProduct(product)

          if(result.status === 0){
            message.success(`${this.isUpdate ? '更新': '添加'} 商品成功！`)
            this.props.history.goBack()
          }else{
            message.error(`${this.isUpdate ? '更新': '添加'} 商品失败  ！`)
          }
          console.log(imgs,detail)
          
          console.log(values)
        }
      }).catch(err=>{
        
      })
    }) 

        
  
  }
  loadData = async selectedOptions => {
    //得到options的对象
    const targetOption = selectedOptions[0];
    //显示loading
    targetOption.loading = true;
    //根据选中的分类获取额日记菜单
    const subCategorys = await this.getCategorys(targetOption.value)
     //关闭loading
    targetOption.loading = false;
    if(subCategorys && subCategorys.length>0){
      //生成二级opsitions
      const childOptins = subCategorys.map(c=>({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      targetOption.children = childOptins
    }else{//当前没有二级菜单
      targetOption.isLeaf = true
    }
    //更新状态
    this.setState({
      options: [...this.state.options],
    });
   
  };
  componentDidMount(){
    this.getCategorys('0')
    
  }
 
  componentWillMount(){
    //去除携带的state值
    const product = this.props.location.state
    //保存更新的标识
    this.isUpdate = !!product
    //保存商品(如果没有保存的是{})
    this.product = product || {}
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue({
      product: this.product,
    });
  }
  render() {
    const {isUpdate,product} = this
    const {pCategoryId,categoryId,imgs,detail} = product
    //用来接受商品分类的Id数组
    const categoryIds = []
    if(isUpdate){
      //商品是一个一级分类
      if(pCategoryId ==='0'){
        categoryIds.push(pCategoryId)

      }else{
        //二级分类
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
     
    }
    // console.log(product,isUpdate)
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    const title = (
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined /></LinkButton>
        <span >{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )
    
   
    return (
     <Card title={title}> 
      <Form {...formItemLayout} 
      ref={this.formRef} 
      >
        <Form.Item
          label="商品名称"
          name="name"
          initialValue={product.name}

          rules={[
            {
              required: true,
              message: '请输入商品名称!',
              messageVariables:'aa'
            },
          ]}
        >
         <Input placeholder='请输入商品名称'/>
        </Form.Item>
        <Form.Item  
          label="商品描述"
          name="desc"
          initialValue={product.desc}
          rules={[
            {
              required: true,
              message: '请输入商品描述!',
            },
          ]}>
             <TextArea 
             placeholder="请输入商品描述"
             autoSize={{ minRows: 2, maxRows: 6 }}/>
        </Form.Item >
        <Form.Item  
          label="商品价格"
          name="price"
          initialValue={product.price}
          rules={[
            {
              validator:this.validatorPrice
            },
          
          ]}>
            <Input type='number' 
            placeholder="请输入商品价格" 
            addonAfter="元"/>
        </Form.Item>
        <Form.Item  
          label="商品分类"
          name="categoryIds"
          initialValue={categoryIds}

          rules={[
            {
              required: true,
              message: '请输入商品分类!',
              
            },
          ]}>
           <Cascader 
           placeholder='请输入商品分类'
           options={this.state.options} 
           loadData={this.loadData} 
          />
        </Form.Item >
        <Form.Item  
          label="商品图片"
          >
           <Picureswall ref={this.pw} imgs={imgs}/>
             
        </Form.Item >
      
        <Form.Item   label="商品详情" 
        labelCol={ {span : 2}} 
        wrapperCol={{span:20}}>
            <RichTextEditor ref={this.editor} detail={detail}/>
        </Form.Item >
        <Form.Item  
          >
           <Button type="primary" onClick={this.submit}>提交</Button>
        </Form.Item >
      </Form>
     </Card>
    );
  }
}

