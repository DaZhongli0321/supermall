<template>
    <div class="tabcontrol">
        <div v-for="(item,index) in titles" :key="index" class="tabcontrol-item"
        :class="{active:isactive===index}" @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tabcontrol',
    components: {  },
    directives: {  },
    data() {
        return {
            isactive:0
        };
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mounted() {
        
    },
    methods: {
       itemclick(index){
           this.isactive=index,
           this.$emit('tabClick', index);
       } 
    },
};
</script>

<style scoped>
.tabcontrol{
    display: flex;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: azure;

}
.tabcontrol-item{
    flex: 1;
}
.active{
    color: brown;
}
.active span{
    padding: 4px;
    border-bottom: 3px solid  brown;
}
</style>