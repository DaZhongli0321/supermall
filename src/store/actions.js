import {
    ADD_TO_CART,
    INCREMENT_COUNT
} from './mutations-type.js'
export default {
    addCart(context,payLoad){
       return new  Promise((resove,reject)=>{
        let oldProduct = context.state.cartList.find(item=>{return payLoad.iid===item.iid})
        if(oldProduct){
           context.commit( INCREMENT_COUNT,oldProduct)
           resove("jiayi")
           
        }
        else{
         payLoad.count = 1
         context.commit(ADD_TO_CART,payLoad)
         resove("tianjia")
        }
       })
       }  
}