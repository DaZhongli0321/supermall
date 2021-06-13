<template>
  <div>
     <detail-bar></detail-bar>
  </div>
</template>

<script>
import DetailBar from './childComponent/DetailNav.vue'
export default {
    name:'detail',
    components:{DetailBar},
    data() {
        return {
            iid:null
        }
    },
    created() {
        this.iid = this.$route.params.iid
         

    },   
}
</script>

<style  scoped>

</style>