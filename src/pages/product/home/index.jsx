import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../../components/link-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../../api";
import { PAGE_SIZE } from "../../../utils/constants";
const Option = Select.Option;
export default class Home extends Component {
  state = {
    total: 0,
    //商品数组
    products: [],
    loading: false,
    searchName: "", //搜索的关键字
    searchType: "productName",
  };
  //初始化表格的列数
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "￥" + price,
      },
      {
        width: 100,
        title: "状态",
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product;
          const newStatus = status === 1 ? 2 : 1;
          return (
            <span>
              <Button
                type="primary"
                onClick={() => {this.updateStatus(_id,newStatus)
                }}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() => {
                  this.props.history.push("/admin/product/detail", { product });
                }}
              >
                详情
              </LinkButton>
              <LinkButton 
                onClick={() => {
                  this.props.history.push("/admin/product/addupdate", product );
                }}>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };
  //获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    this.setState({ loading: true });

    const { searchName, searchType } = this.state;

    let result;
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType,
      });
    } else {
      //一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    this.setState({ loading: false });
    if (result.status === 0) {
      //去除分页数据更新列表
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
      });
    }
  };
  //更新商品的状态
  updateStatus = async (productId,status)=>{
    const result = await reqUpdateStatus(productId,status)
    if(result.status===0){
      message.success('更新成功')
      this.getProducts(this.pageNum)
    }
  }
  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const { products, total, loading, searchType, searchName } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          value={searchName}
          plactholder="关键字"
          style={{ width: 150, margin: "0 15px" }}
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    );
    const extra = (
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={()=>{this.props.history.push('/admin/product/addupdate')}}
      >
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}
