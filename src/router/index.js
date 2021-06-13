import Vue from 'vue'
import VueRouter from 'vue-router'
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

const Home = () =>
    import ('views/home/Home')
const Category = () =>
    import ('views/category/Category')
const Cart = () =>
    import ('views/cart/Cart')
const Profile = () =>
    import ('views/profile/Profile')
const Detail = () =>
    import ('views/detail/detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }

]
const router = new VueRouter({
    routes,
    mode: 'history'

})

// 3.导出router
export default router