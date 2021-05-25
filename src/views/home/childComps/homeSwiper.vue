<template>
    <div>
          <swiper>
              <swiper-item v-for="item in banners" :key="item.link">
                  <a :href="item.link">
                      <img :src="item.image" alt="">
                  </a>
              </swiper-item>
          </swiper>
    </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name: 'Homeswiper',
    components: { 
        Swiper,
        SwiperItem
       
       
      
     },
     props:{
       banners:{
          type:Array,
          default(){
              return [1,2]
          }
       }
     },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style >

</style>