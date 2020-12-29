<template>
  <div class="index">
    <router-view />
    <div class="bottomNav">
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item icon="plus">新增</van-tabbar-item>
        <van-tabbar-item icon="search">搜索</van-tabbar-item>
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem} from 'vant';
export default {
  name:'index',
  components:{
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props:{},
  data(){
    return {
      active:0
    }
  },
  watch:{},
  computed:{},
  methods:{
    onChange(index){
        switch(index)
        {
            case 0:
                this.$router.push({name:'Index'})
                break;
            case 1:
                this.$router.push({name:'Note'})
                break;
            case 2:
                this.$router.push({name:'Search'})
                break;
             case 3:
                this.$router.push({name:'About'})
                break;
            default:
                this.$router.push({name:'Index'})
        }
    },
    tabbarActive(value){
      this.active = value.meta.active
    }
  },
  created(){},
  mounted(){},
  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.tabbarActive(to)
    })

  },
  beforeRouteUpdate(to, from, next){
    this.tabbarActive(to)
    next()
  }  
}
</script>
<style lang="less" scoped>
  .index {
    width: 100%;
    padding-bottom: 60px;
  }
</style>