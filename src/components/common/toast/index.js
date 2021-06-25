import Toast from './Toast.vue'
const toastpuilage= {

}
toastpuilage.install= function(Vue){
    const ToastConstructor = Vue.extend(Toast)
    const toast = new ToastConstructor()
    // console.log(toast);
    toast.$mount(document.createElement('div'))

    // 2.将toast的$el添加到body中
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast =toast

}
export default toastpuilage


