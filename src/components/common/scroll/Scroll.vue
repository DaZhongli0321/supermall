<template>
    <div  class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
        
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
    name: 'Scroll',
    components: {  },
    directives: {  },
    props:{
        probeType:{
            type:Number,
            default(){
               return 0;
            }
        },
        pullUpLoad:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    data() {
        return {
           scroll:null 
        };
    },
    mounted() {
       this.scroll = new BetterScroll(this.$refs.wrapper,{
           observeDOM:true,
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad

       })
       this.scroll.on("scroll",(option)=>{
           this.$emit('scroll', option);
       })
       this.scroll.on("pullingUp",()=>{
           console.log("2212")
           this.$emit('pullingUp');
       })
    },
    methods: {
       scrollTo(x,y,time=300){
          this.scroll && this.scroll.scrollTo(x,y,time)
           
       },
       finishPullUp(){
        this.scroll &&  this.scroll.finishPullUp()
       },
        refresh(){
         this.scroll && this.scroll.refresh()
        //  console.log("000");
       }
    },
};
</script>

<style scoped>

</style>