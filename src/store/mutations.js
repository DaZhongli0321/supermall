import {
    ADD_TO_CART,
    INCREMENT_COUNT
} from './mutations-type.js'
export default {
    [INCREMENT_COUNT](state,payLoad){
        payLoad.count += 1
     },
     [ADD_TO_CART](state,payLoad){
        payLoad.check = true
        state.cartList.push(payLoad)
     }
}