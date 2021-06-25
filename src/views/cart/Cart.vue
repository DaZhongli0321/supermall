<template>
 <div class="cart">
   <nav-bar class="nav-bar">
     <template #middle>
       <div>购物车({{cartLength}})</div>
     </template>
   </nav-bar>
   <cart-list></cart-list>
   <cart-bottom-bar></cart-bottom-bar>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {mapGetters} from 'vuex'
import CartList from './childComponents/cartList.vue'
import CartBottomBar from './childComponents/CartBottomBar.vue'

  export default {
    name: "Cart",
    components:{
        NavBar,
        CartList,
        CartBottomBar  
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color:violet;
  color: #fff;
}
</style>
