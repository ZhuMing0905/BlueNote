<template>
    <div class="about">
        <div class="person" v-show="memberAuth">
          <div class="personAvatar"><router-link :to="{name:'Avatar'}"><img :src="avatarURL" ></router-link></div>
          <div class="personName">{{member.email}}</div>
        </div>
        <div class="meList">
          <van-cell-group>
            <van-cell title="我的资料" is-link icon="manager-o"/>
            <van-cell title="修改密码" is-link icon="search"/>
            <van-cell title="垃圾箱" is-link  icon="delete"/>
            <van-cell title="退出登录" is-link icon="exchange" @click="outLogin"/>
          </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Cell, CellGroup, Dialog,Toast } from 'vant';
export default {
  name:'AboutHome',
  components:{
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Dialog.name]:Dialog,
    [Toast.name]:Toast
  },
  props:{},
  data(){
    return {
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth,
      newTime:new Date().getTime()
    }
  },
  watch:{},
  computed:{
    avatarURL(){
      return this.member.avatar+'?' + this.newTime;
    }
  },
  methods:{
    outLogin() {
      this.$dialog.confirm({
      message: "是否退出？"
      }).then(() => {
        localStorage.removeItem('member');
        localStorage.removeItem('member_auth');
        this.$store.commit("setMember", {});
        this.$store.commit("setMemberAuth", "");
        this.$toast.loading({
            message: '退出成功，正在跳转...',
            forbidClick: true,
            onClose:()=>{
              this.$router.push({
                path: '/login',
              })
            }
          })
      })
      .catch(() => {
        // on cancel
      });
    }    
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.about{
  padding:15px;
  .person {
    background: #fff;
    padding:15px;
    margin-bottom: 10px;
    text-align: center;
    .personAvatar {
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .personName {
      margin-top: 15px;
      color: #1989fa;
      font-size: 16px;;
    }
  }
}
</style>