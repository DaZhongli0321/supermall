<template>
  <div id="home">
   
    <nav-bar class="home-nav">
      <template v-slot:middle>
         <div>商城</div>
      </template>
</nav-bar>
 <tab-control :titles="['精选','推荐','美妆']" class="tab-control" 
    @tabClick="tabClick"
    ref="tabControl1"
    v-show="iShowTabControl"
   ></tab-control>
<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" 
        :pull-up-load="true"
        @pullingUp="pullingUp">
    <home-swiper :banners="banners"  @homeSwiperImgLoad="homeSwiperImgLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-vue/>
    <tab-control :titles="['精选','推荐','美妆']" 
    @tabClick="tabClick"
    ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods" ></goods-list>
</scroll>

<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>


</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/Scroll.vue'
    import TabControl from 'components/content/tabControl/TabControl.vue'
    import GoodsList from 'components/content/goodsList/GoodsList.vue'
    


    import HomeSwiper from './childComps/homeSwiper.vue'
    import RecommendView from './childComps/RecommendView.vue'
    import FeatureVue from './childComps/FeatureVue.vue'

    import {getHomeMultidata,getHomeGoods} from 'network/home.js'
   
    import {itemImgLinster,backTopMaxins} from 'common/mixins.js'
    
  
    export default {
        name: "Home",
        components: {
            NavBar,
             Scroll,
            HomeSwiper,
            RecommendView,
            FeatureVue,
            TabControl,
            GoodsList,
           
               
              
        },
        data() {
            return {
                banners:[],
                recommends:[],
                goods:{
                 'pop':{page:0,list:[]},
                 'new':{page:0,list:[]},
                 'sell':{page:0,list:[]}
                 },
                 currentType:'pop',  
               
                 tabControlOffsetTop:0,
                 iShowTabControl:false,
                 saveY:0,
                

            }
            
        },
        mixins:[itemImgLinster,backTopMaxins],
        created() {
          this.getHomeMultidata()
          this.getHomeGoods("pop")
          this.getHomeGoods("new")
          this.getHomeGoods("sell")
          

        },
        activated() {
            this.$refs.scroll.scrollTo(0,this.saveY,0);
            this.$refs.scroll.refresh()
            // console.log(this.saveY);  

        },
        deactivated() {
          this.saveY= this.$refs.scroll.scroll.y;
        //    console.log(this.$refs.scroll.scroll.y);   
         this.$bus.$off('imgLoad',this.itemImgListener)
        },
        computed:{
            showGoods() {
            return this.goods[this.currentType].list
      }
        },
        methods: {
            tabClick(index){
            switch (index ){
             case 0:
                 this.currentType='pop';
                 break;
            case 1:
                 this.currentType='new';
                 break;
            case 2:
                 this.currentType='sell';
                 break;


            }
           this.$refs.tabControl1.isactive=index;
            this.$refs.tabControl2.isactive=index;

            },
            getHomeGoods(type){
                const page=this.goods[type].page +1
                getHomeGoods(type,page).then(res=>{ 
                    
                  this.goods[type].list.push(...res.data.list)
                  this.goods[type].page +=1
                  this.$refs.scroll.finishPullUp()
                })
                // console.log(window.location.href)
            },
            getHomeMultidata(){
               getHomeMultidata().then(res=>{
               this.banners=res.data.banner.list;
               this.recommends=res.data.recommend.list
           }) 
            },
           
            contentScroll(option){
                this.isShowBackTop = - option.y > 1000;
                this.iShowTabControl= -option.y > this.tabControlOffsetTop
                
                
            },
            pullingUp(){
                this.getHomeGoods(this.currentType);
                
                
            },
            homeSwiperImgLoad(){
               this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop; 
               
            }
          
        },
        mounted() {
        //     const refresh = debounce( this.$refs.scroll.refresh,50)
        //     this.itemImgListener= ()=>{
        //       refresh()
        //   }
        //     this.$bus.$on('imgLoad',this.itemImgListener)
        // console.log('homemounted');
           
        },
        
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: white;
       
    }
    #home{
        /* padding-top: 44px; */
          height: 100vh;
          /* height: 200px; */
        position: relative;
    }
    .tab-control{
        position: relative;     
        z-index: 9;

        
    }
    .content{
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>