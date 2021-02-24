/*
能发送ajax请求
封装axios库
函数返回值使promise对象
*/ 
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){
  return new Promise((resolove,reject)=>{
    let promise
    if(type === 'GET'){
      promise=axios.get(url,{
        params:data
      })
    }else {
      promise=axios.post(url,data)
    }
    promise.then(response=>{
      resolove(response.data)
    }).catch(error=>{
      message.error('请求出错了:'+ error.message)
    })
  })

 
}