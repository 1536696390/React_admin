
import React from 'react'
import { Upload, Modal, message } from 'antd';
import PropTypes from 'prop-types'
import {PlusOutlined} from '@ant-design/icons'
import {reqDeleteImg} from '../../../../api'
import {BASE_IMG_URL} from '../../../../utils/constants'
export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }
  
  state = {
    previewVisible: false,//标识显示大图
    previewImage: '',//大图的url
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
  };

  constructor(props){
    super(props)
    let fileList=[]
    const {imgs } = this.props
    if(imgs && imgs.length>0){
      imgs.map((img,index) =>({
        uid: -index,
        name: img,
        status: 'done',
        url: BASE_IMG_URL + img
      }))
    }

    this.state = {
      previewVisible: false,//标识显示大图
      previewImage: '',//大图的url
      fileList
    }
  }

  //获取所有图片文件问数组
  getImgs = ()=>{
    return this.state.fileList.map(file => file.name)
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview =  file => {
    //指定file对应的大图
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = async ({ file,fileList }) =>{

    //上传成功，将当前信息file修正
    if(file.status === 'done'){
      const result = file.response
      if(result.status===0){
        message.success('上传成功')

        const {name,url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      }else{
        message.error('上传失败')
      }
    }else if(file.status==='removed'){
      const result =  await reqDeleteImg(file.name)
      if(result.status===0){
        message.success('删除成功')
      }else{
        message.error('删除失败')
      }
     
    }
    //在操作过程中（上传/下载）
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept='image/*'
          name="image"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

