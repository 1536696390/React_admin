import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../components/left_nav";
import Header from "../../components/header";
import Home from "../home";
import Category from "../category";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

import Product from "../product";
import Role from "../role";
import User from "../user";
import memoryUtils from '../../utils/memoryUtils'

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    if(!user || !user._id){
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{margin:'20px', backgroundColor: "white" }}>
            <Switch>
              <Route path="/admin/home" component={Home}></Route>
              <Route path="/admin/category" component={Category}></Route>
              <Route path="/admin/product" component={Product}></Route>
              <Route path="/admin/role" component={Role}></Route>
              <Route path="/admin/user" component={User}></Route>
              <Route path="/admin/charts/bar" component={Bar}></Route>
              <Route path="/admin/charts/line" component={Line}></Route>
              <Route path="/admin/charts/pie" component={Pie}></Route>
              <Redirect to="/admin/home"/>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#ccc" }}>
            推荐使用谷歌浏览器
          </Footer>
        </Layout>
      </Layout>
      
    );
  }
}
