<template>
  <div class="navbar">
      <div class="nav-left"> <slot name="left"></slot></div>
      <div class="nav-mid"> <slot name="middle"></slot></div>
      <div class="nav-right"> <slot name="right"></slot></div>   
  </div>
</template>

<script>
    export default {
        name: 'Navbar',

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
    .navbar {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 1px 1px 1px gray;
    }
    
    .nav-right,
    .nav-left {
        width: 60px;
      
    }
    
    .nav-mid {
        flex: 1;
        
    }
</style>