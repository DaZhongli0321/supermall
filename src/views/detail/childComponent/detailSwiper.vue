<template>
    <div>
        <swiper class="detail-swiper">
            <swiper-item v-for="(item,index) in detailImg " :key="index">
             <img :src="item" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name: 'Detailswiper',
    props:{
       detailImg:{
           type:Array,
           defauit(){
               return []
           }
       }
   },
    components: { 
        Swiper,
        SwiperItem
       
     },

    directives: {  },

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

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;

}
</style>