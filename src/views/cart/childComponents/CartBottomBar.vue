<template>
  <div class="bottom-menu">
    <check-button class="select-all" @click.native="checkBtnClick" :value="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="goBuy">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'

	export default {
	name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters([
      	'cartList',
        'cartLength'
      ]),
		  totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      isSelectAll: function () {
          if(!this.cartLength) return false;
        return this.cartList.find(item => item.check === false) === undefined;
      }
    },
    methods: {
      checkBtnClick: function () {
        //   console.log(this.cartList);
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.check);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.check = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.check = false;
          });
        }
      },
      goBuy(){
          if(!this.isSelectAll){
              this.$toast.show('请选择要购买商品',3000)
          }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
