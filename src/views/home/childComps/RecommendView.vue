<template>
    <div class="recommend">
        <div v-for="item in recommends" :key="item.link" class="recommend-item">
             <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
        </div>
       
    </div>
</template>

<script>
export default {
    name: 'Recommendview',
    props:{
        recommends:{
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

<style scoped>
.recommend{
    display:flex;
    text-align: center;
    font-size: 12px;
    border-bottom: 7px solid gainsboro;


}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 67px;
    height: 67px;
}
</style>