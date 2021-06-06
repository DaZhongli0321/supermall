<template>
  <div id="home">
   
    <nav-bar class="home-nav">
      <template v-slot:middle>
         <div>商城</div>
      </template>
</nav-bar>
<home-swiper :banners="banners"></home-swiper>
<recommend-view :recommends="recommends"></recommend-view>
<feature-vue></feature-vue>
<tab-control :titles="['精选','推荐','美妆']" class="tab-control" @tabClick="tabClick"></tab-control>
<goods-list :goods="showGoods" ></goods-list>

<ul>
    <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>25</li>
        <li>2</li>
      <li>2</li>
     <li>2</li>
      <li>2</li>
</ul>
</div>


</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl.vue'
    import GoodsList from 'components/content/goodsList/GoodsList.vue'


    import HomeSwiper from './childComps/homeSwiper.vue'
    import RecommendView from './childComps/RecommendView.vue'
    import FeatureVue from './childComps/FeatureVue.vue'

    import {getHomeMultidata,getHomeGoods} from 'network/home.js'
  
    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureVue,
            TabControl,
            GoodsList
              
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

                
            }
            
        },
        created() {
          this.getHomeMultidata()
          this.getHomeGoods("pop")
          this.getHomeGoods("new")
          this.getHomeGoods("sell")

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
            },
            getHomeGoods(type){
                const page=this.goods[type].page +1
                getHomeGoods(type,page).then(res=>{ 
                    
                  this.goods[type].list.push(...res.data.list)
                  this.goods[type].page +=1

                })
            },
            getHomeMultidata(){
               getHomeMultidata().then(res=>{
               this.banners=res.data.banner.list;
               this.recommends=res.data.recommend.list
           }) 
            }
        },

    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: white;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    #home{
        padding-top: 44px;
    }
    .tab-control{
        position: sticky;
        top: 44px;
        z-index: 9;
    }
</style>