<template>
  <div class="register">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="registerForm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="useremail"
          name="useremail"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ validator:testEmail, required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="toRegister">还没有账号？<router-link :to="{ name: 'Register'}">立即注册</router-link></div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>    
  </div>
</template>

<script>
import { NavBar,Field,Button,Form,Toast,Checkbox, CheckboxGroup,Popup} from 'vant';
export default {
  name:'AddNote',
  components:{
    [NavBar.name]:NavBar,
    [Field.name]:Field,
    [Button.name]:Button,
    [Form.name]:Form,
    [Toast.name]:Toast,
    [Checkbox.name]:Checkbox, 
    [CheckboxGroup.name]:CheckboxGroup,
    [Popup.name]:Popup 
  },
  props:{},
  data(){
    return {
      useremail:"",
      password:""
    }
  },
  watch:{},
  computed:{},
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    },
    testEmail(val){
      console.log(val)
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)
    },
    onSubmit() {
      //console.log('submit', values);
      const that = this;
      that.axios.post("/api&appsecret=PHPCMF3458092B107BA&s=member&c=login",
      that.$qs.stringify({
        is_ajax:1,
        "data[username]":that.useremail,
        "data[password]":that.password
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
      ).then(function (res) {
        console.log(res);
        if(res.data.code == 0){
          that.$toast(res.data.msg);
        }else if(res.data.code > 0){
          let member = JSON.stringify(res.data.data.member)
          let member_auth = res.data.data.auth
          localStorage.setItem('member', member);
          localStorage.setItem('member_auth', member_auth);
          that.$store.commit("setMember", res.data.data.member);
          that.$store.commit("setMemberAuth", member_auth);
          that.$toast.loading({
            message: '登录成功，正在跳转...',
            forbidClick: true,
            onClose:()=>{
              that.$router.push({
                path: '/home',
              })
            }
          })
        }      
      })
      .catch(function (err) {
        console.log("请求失败" + err);
      })
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.register{
  background: #eee;
  width: 100vw;
  height: 100vh;
  .registerForm {
    margin-top:40px;
    padding: 0 15px;
    .toRegister {
      text-align: right;
      margin-top:15px;
      font-size: 14px;
      color:#666;
      a{
        display: inline-block;
        line-height: 30px;
        font-size: 14px;
        color:#1989fa;
      }      
    }
  }
}
</style>