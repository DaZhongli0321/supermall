<template>
  <div>
   
    <nav-bar class="home-nav">
      <template v-slot:middle>
         <div>商城</div>
      </template>
</nav-bar>
<home-swiper :banners="banners"></home-swiper>
<recommend-view :recommends="recommends"></recommend-view>
</div>


</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/homeSwiper.vue'
    import {getHomeMultidata} from 'network/home.js'
    import RecommendView from './childComps/RecommendView.vue'

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView
              
        },
        data() {
            return {
                banners:[],
                recommends:[]
            }
        },
        created() {
           getHomeMultidata().then(res=>{
              
               this.banners=res.data.banner.list;
               this.recommends=res.data.recommend.list
           }) 
        },
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: white;
    }
</style>