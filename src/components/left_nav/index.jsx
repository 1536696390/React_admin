import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import {
  HomeOutlined,
  BorderOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  HeartOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import './index.less'
import logo from '../../assets/images/logo.png'
const { SubMenu } = Menu;
class LeftNav extends Component {
  render() {
    const path = this.props.location.pathname
    
    return (
      <div className="left_nav">
        <Link to='/' className="left_nav-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[path]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/admin/home" icon={<HomeOutlined />}>
            <Link to="/admin/home">首页</Link>        
          </Menu.Item>        
          <SubMenu key="sub1" icon={<BorderOutlined />} title="商品">
            <Menu.Item key="/admin/category" icon={<BarsOutlined />}>
              <Link to="/admin/category">品类管理</Link>    
            </Menu.Item>
            <Menu.Item key="/admin/product" icon={<ToolOutlined />}>
              <Link to="/admin/product">商品管理</Link>   
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/user" icon={<UserOutlined />}>
            <Link to="/admin/user">用户管理</Link>        
          </Menu.Item>   
          <Menu.Item key="/admin/role" icon={<HeartOutlined />}>
            <Link to="/admin/role">角色管理</Link>        
          </Menu.Item>   
          <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
            <Menu.Item key="/admin/charts/bar" icon={<BarChartOutlined />}>
              <Link to="/admin/charts/bar">柱状图</Link>    
            </Menu.Item>
            <Menu.Item key="/admin/charts/line"icon={<LineChartOutlined />}>
              <Link to="/admin/charts/line">折线图</Link>   
            </Menu.Item>
            <Menu.Item key="/admin/charts/pie"icon={<PieChartOutlined />}>
              <Link to="/admin/charts/pie">饼图</Link>   
            </Menu.Item>
          </SubMenu>
        </Menu>

      </div>
    )
  }
  
}
export default withRouter(LeftNav)
