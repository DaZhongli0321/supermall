<template>
    <div>
       <div class="toast" v-show="isShow">{{message}}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast',

    components: {  },

    directives: {  },

    data() {
        return {
           isShow:false,
           message:'222'
        }
    },

    mounted() {
        
    },

    methods: {
       show(message='弹窗',time='2000'){
         this.isShow = true
         this.message = message
         setTimeout(()=>{
          this.isShow = false
          this.message = ''

         },time)
       } 
    },
};
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
  }
</style>