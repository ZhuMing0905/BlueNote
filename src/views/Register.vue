<template>
  <div class="register">
    <van-nav-bar
      title="注册"
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
          v-model="password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password2"
          type="password"
          name="password2"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ validator:testPassword , required: true, message: '请确认密码' }]"
        />
        <div class="agreement">
          <div class="agreementL">
            <van-checkbox v-model="checked" shape="square" icon-size="16px" />
          </div>
          <div class="agreementR">
            <div @click="showPopup" class="openAgree">同意用户注册协议</div>
            <van-popup v-model="show" closeable :style="{ height: '90%',width:'90%' }">
              <div class="AgreeCon">
              <h3>使用规则</h3>
              <p>1、用户注册成功后，本站将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管，用户不应将账号或密码告知第三方，或者将其帐号、密码转让、出借予他人使用或与第三方共用。如用户发现其帐号遭他人非法使用，应立即通知本站，因黑客行为或用户的保管疏忽等非本站原因导致帐号、密码遭他人非法使用或无法正常使用的，本站不承担任何责任；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>

              <p>2、用户应提供及时、详尽及准确的个人资料，并不断更新注册资料，用户须对在本站的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐号导致其他用户误认；否则本站有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。</p>

              <p>3、用户直接或通过各类方式（如 RSS 源和站外 API 引用等）间接使用本站服务和数据的行为，都将被视作已无条件接受本协议全部内容；若用户对本协议的任何条款存在异议，请停止使用本站所提供的全部服务。</p>

              <p>4、本站是一个信息分享、传播及获取的平台，用户通过本站发表的信息为公开的信息，其他第三方均可以通过本站获取用户发表的信息，用户对任何信息的发表即认可该信息为公开的信息，并单独对此行为承担法律责任；任何用户不愿被其他第三人获知的信息都不应该在本站上进行发表。</p>

              <p>5、用户承诺不得以任何方式利用本站直接或间接从事违反中国法律以及社会公德的行为，本站有权对违反上述承诺的内容予以删除。</p>
              </div>
              </van-popup>
          </div>  
        </div>
        <div class="toLogin">已有账号？<router-link :to="{ name: 'Login'}">立即登录</router-link></div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            注册
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
      password1:"",
      password2:"",
      checked:true,
      show: false
    }
  },
  watch:{},
  computed:{
    is_protocol(){
      return this.checked?1:0 
    }
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    },
    testEmail(val){
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)
    },
    testPassword(val) {
      // if(val !== this.password1) {
      //   return false
      // }
      console.log(val)
    },
    showPopup() {
      this.show = true;
    },
    onSubmit() {
      //console.log('submit', values);
      const that = this;
      that.axios.post("/api&appsecret=PHPCMF3458092B107BA&s=member&c=register",
      that.$qs.stringify({
        is_ajax:1,
        "data[email]":that.useremail,
        "data[password]":that.password1,
        "data[password2]":that.password2,
         is_protocol:that.is_protocol
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
          let member_auth = res.data.data.member.auth
          localStorage.setItem('member', member);
          localStorage.setItem('member_auth', member_auth);
          that.$store.commit("setMember", res.data.data.member);
          that.$store.commit("setMemberAuth", member_auth);
          that.$toast.loading({
            message: '注册成功，正在跳转...',
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
  mounted(){
        
  }
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
    .agreement {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      background: #fff;
      padding:15px;
      .agreementL {
        margin-right: 10px;
      }
      .agreementR {
        .openAgree {
          font-size: 14px;
          color: #999;
        }
        .AgreeCon {
          padding: 15px;
          font-size: 14px;
          color: #000;
          line-height: 1.6;
          h3{
            text-align: center;
          }
          }
      }
    }
    .toLogin {
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