<template>
    <div>
        <van-nav-bar
          :title = "aboutTitle"
          :left-arrow = "leftArrow"
          @click-left="onClickLeft"         
          >
        </van-nav-bar>
        <router-view />
    </div>
</template>

<script>
import {NavBar} from 'vant';
export default {
  name:'About',
  components:{
    [NavBar.name]:NavBar
  },
  props:{},
  data(){
    return {
      aboutTitle:"个人中心",
      leftArrow:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    },
    navBarInfo(value){
      this.aboutTitle = value.meta.title
      this.leftArrow = value.meta.leftArrowShow
    }
  },
  created(){},
  mounted(){},
  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.navBarInfo(to)
    })

  },
  beforeRouteUpdate(to, from, next){
    console.log(to)
    this.navBarInfo(to)
    next()
  }
}
</script>
<style lang="less" scoped>

</style>