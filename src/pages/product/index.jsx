import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
/*商品路由 */
import AddUpdate from './add-update'
import Detail from './detail'
import Home from './home'
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/admin/product' component={Home}></Route>
        <Route path='/admin/product/detail' component={Detail}></Route>
        <Route path='/admin/product/addupdate' component={AddUpdate}></Route>
        <Redirect to='/admin/product'/>
      </Switch>
    )
  }
}
