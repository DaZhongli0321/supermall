import {debounce} from './utils'
import BackTop  from 'components/content/backTop/BackTop.vue'
export const itemImgLinster ={
    data() {
        return {
            itemImgListener: null,
            refresh:null
        };
    },
    mounted() {
        this.refresh = debounce( this.$refs.scroll.refresh,50)
        this.itemImgListener= ()=>{
            this.refresh()
      }
        this.$bus.$on('imgLoad',this.itemImgListener)
        // console.log('混入');
    },
   
}
export const backTopMaxins={
    data() {
        return {
            isShowBackTop:false,
        };
    },
    components:{
        BackTop
    },
    methods: {
        backClick(){
            this.$refs.scroll.scrollTo(0,0,400)
        },
    }
}