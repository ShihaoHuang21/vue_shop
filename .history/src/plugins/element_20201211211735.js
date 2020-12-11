import { Aside, Breadcrumb, BreadcrumbItem, Button, Card, Col, Container, Dialog, Form, FormItem, Header, Input, Main, Menu, MenuItem, MenuItemGroup, Message, MessageBox, Pagination, Row, Submenu, Switch, Table, TableColumn, Tag, Tooltip, Tree } from 'element-ui'
import Vue from 'vue'
//挂载信息组件
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)

