<template>
  <div class="detail">
     <detail-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-bar>
    <scroll class="content" :pullUpLoad="true" ref="scroll" :probeType='3' @scroll='contentScroll'>
        <detail-swiper :detailImg='detailImg'></detail-swiper>
        <detail-goods :goods='goods'></detail-goods>
        <detail-shop-info :shop='shop'></detail-shop-info>
        <detail-img-info :detailInfo='detailInfo' @detailImgLoad='detailImgLoad'></detail-img-info>
        <detail-param-info :paramInfo='paramInfo' ref="params"></detail-param-info>
        <detail-common-info :commentInfo='commentInfo' ref="comment"></detail-common-info>
        <goods-list :goods='recommendInfo' ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-button-bar @addCar='addToCar'></detail-button-bar>
  </div>
</template>

<script>
import DetailBar from './childComponent/DetailNav.vue'
import DetailSwiper from './childComponent/detailSwiper.vue'
import DetailGoods from './childComponent/DetailGoods.vue'
import DetailShopInfo from './childComponent/DetailShopInfo.vue'
import DetailImgInfo from './childComponent/DetailImgInfo.vue'
import DetailParamInfo from './childComponent/DetailParamInfo.vue'
import DetailCommonInfo from './childComponent/DetailCommonInfo.vue'
import DetailButtonBar from './childComponent/DetailButtonBar.vue'
import {getDedail,Goods,getRecommendsInfo} from 'network/detail.js'
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goodsList/GoodsList.vue'
import {itemImgLinster,backTopMaxins} from 'common/mixins.js'
import {debounce} from 'common/utils.js'

export default {
    name:'detail',
    components:{
        DetailBar,
        DetailSwiper,
        DetailGoods,
        DetailShopInfo,
        DetailImgInfo,
        DetailParamInfo,
        DetailCommonInfo,
        Scroll,
        GoodsList,
        DetailButtonBar,
        
       
        },
    data() {
        return {
            iid:null,
            detailImg:[],
            goods:{},
            shop:{},
            detailInfo: {},
            paramInfo:{},
            commentInfo:{},
            recommendInfo:[],
            comTopY:[],
            getComTopY:null,
            currentIndex:0

        }
    },
    mixins:[itemImgLinster,backTopMaxins],
    created() {
        this.iid = this.$route.params.iid
        getDedail(this.iid).then(res=>{ 
           
            const data = res.result;
            //  console.log(data);
            this.detailImg=data.itemInfo.topImages
           this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
           this.shop = data.shopInfo
           this.detailInfo = data.detailInfo
           this.paramInfo =data.itemParams
           if(data.rate.cRate !==0){
            this.commentInfo= data.rate.list[0]
            // console.log(data.rate.list[0])
           }
           
        }
           
        )
        getRecommendsInfo().then(res=>{
            this.recommendInfo = res.data.list
        }),
        this.getComTopY=debounce(()=>{
          this.comTopY =[]
          this.comTopY.push(0)
          this.comTopY.push(this.$refs.params.$el.offsetTop)
          this.comTopY.push(this.$refs.comment.$el.offsetTop)
          this.comTopY.push(this.$refs.recommend.$el.offsetTop)
        //   console.log( this.comTopY);
        },100)

    },  
    destroyed() {
         this.$bus.$off('imgLoad',this.itemImgListener)
    }, 
    methods: {
        detailImgLoad(){
            this.refresh()
             this.getComTopY()

        },
        titleClick(index){
           this.$refs.scroll.scrollTo(0,-this.comTopY[index],100)
        },
        contentScroll(option){
            this.isShowBackTop = - option.y > 1000;
            let Y = -option.y
            let len =this.comTopY.length
            for(let i=0;i <len;i++){
               
                if((this.currentIndex !==i)&&(i<len-1&&(Y>=this.comTopY[i]&&Y<this.comTopY[i+1]))||(i===len-1&&Y>=this.comTopY[i])){
                    console.log(i);
                    this.currentIndex=i
                    this.$refs.nav.currentIndex=this.currentIndex
                }
            }
           
           
        },
        addToCar(){
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.detailImg[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        this.$store.dispatch('addCart', obj).then(res=>{
            // console.log(this.$toast);
           this.$toast.show(res,3000)
        })
        }
    },
}
</script>

<style  scoped>
.detail{
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 1;
}
.content{
    height:calc(100% - 44px - 49px);
    background-color: #fff;
    position: relative;
    z-index: 1;
    overflow: hidden;
}
</style>