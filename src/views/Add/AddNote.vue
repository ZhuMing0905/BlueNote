<template>
  <div class="addNote">
    <van-nav-bar
      title="新增"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="needLogin" v-if="!needLogin">还没有登录账号，<router-link :to="{ name: 'Login'}">请先登录</router-link></div>   
    <div class="addNoteForm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="noteTitle"
          name="title"
          label="标题"
          placeholder="请填写标题"
          :rules="[{ required: true, message: '请填写标题' }]"
        />
        <van-field
          v-model="noteInfo"
          type="textarea"
          rows="5"
          maxlength="500"
          show-word-limit
          autosize
          name="info"
          label="内容"
          placeholder="请填写内容"
          :rules="[{ required: true, message: '请填写内容' }]"
        />
        <van-field v-model="time" label="录入时间" name="time"/>
        <div style="margin: 16px;">
          <van-button round block type="info" :disabled="!needLogin" native-type="submit">
            保存
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar,Field,Button,Form,Toast } from 'vant';
export default {
  name:'AddNote',
  components:{
    [NavBar.name]:NavBar,
    [Field.name]:Field,
    [Button.name]:Button,
    [Form.name]:Form,
    [Toast.name]:Toast
  },
  props:{},
  data(){
    return {
      noteTitle:"",
      noteInfo:"",
      time:"",
      // needLogin:false
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth
    }
  },
  watch:{},
  computed:{
    needLogin(){
      return this.$store.state.member_auth ? true : false
    }
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    },
    getTime(){
      this.time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
    },
    onSubmit(){
      const that = this;
      that.axios.post("/api&appsecret=PHPCMF3458092B107BA&api_auth_code="+that.memberAuth+"&api_auth_uid="+that.member.id+"&s=member&app=note&c=home&m=add",
      that.$qs.stringify({
        is_ajax:1,
        catid: 9,
        "data[title]":that.noteTitle,
        "data[content]":that.noteInfo,
        "data[inputtime]":that.time,
        "data[updatetime]":that.time,
        "data[author]":that.member.username
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
      ).then(function (res) {
        console.log(res);
        if(res.data.code == 0){
          that.$toast(res.data.msg);
        }else if(res.data.code > 0){
          that.$toast.loading({
            message: '发布成功，正在跳转...',
            forbidClick: true,
            onClose:()=>{
              that.$router.push({
                path: '/home',
              })
            }
          })
        }         
      }).catch(function (err) {
        console.log("请求失败" + err);
      })
    }
    //needLogin(){
      
    //}
  },
  created(){},
  mounted(){
    this.getTime()
    //this.needLogin()
  }
}
</script>
<style lang="less" scoped>
.addNote{
    .needLogin {
    padding:15px;
    margin-top:15px;
    font-size: 14px;
    background: #fff;
    color:#666;
    a{
      display: inline-block;
      line-height: 30px;
      font-size: 14px;
      color:#1989fa;
    }      
  }
  .addNoteForm {
    padding:15px;
  }
}
</style>