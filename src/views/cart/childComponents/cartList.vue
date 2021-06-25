<template>
    <div class="cart-list">
        <scroll class="content" :pullUpLoad='true'>
            <cart-list-item v-for='(item,index) in cartList' :key="index" :item-info='item'></cart-list-item>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue';
import {mapGetters} from 'vuex'
import CartListItem from './cartListItem.vue';
export default {
    name: 'Cartlist',

    components: {Scroll,CartListItem  },

    directives: {  },

    data() {
        return {
            
        };
    },
    computed:{
        ...mapGetters(['cartLength','cartList'])
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
  .cart-list{
      height: calc(100%  - 49px - 44px);
  }
  .content{
      height: 100%;
      overflow: hidden;
  }
</style>