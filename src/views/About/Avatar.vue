<template>
  <div class="avatar">
    <div class="avatarImg"><img :src="avatarURL" alt=""></div>
    <div class="avatarBtn">
      <van-uploader :before-read="beforeRead" :max-count="1" :max-size="3000 * 1024" @oversize="onOversize">
      <van-button icon="plus" type="primary">更改头像</van-button>
      </van-uploader>
    </div>
    <div class="avatarCropper">
      <van-popup
        v-model="showCropper"
        closeable
        position="top"
        :style="{ height: '100%' }"
      >
        <div class="flex-column-center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :full="option.full"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            :high="option.high"
            :mode="option.mode"
          ></vueCropper>
          <van-row class="cropperwhite" type="flex" justify="space-between">
            <van-col span="8"><span @click="cancelCropper">取消</span></van-col>
            <van-col span="8" class="text-center"><span @click="rotateImage"><van-icon name="replay" /></span></van-col>
            <van-col span="8" class="text-right"><span @click="getCropBlob">确定</span></van-col>
          </van-row>
        </div>
      </van-popup>      
    </div>
  </div>
</template>

<script>
import { Uploader,Toast,Button,Popup,Col,Row,Icon } from 'vant';
import { VueCropper }  from 'vue-cropper' ;
export default {
  name:'Avatar',
  components:{
    [Uploader.name]:Uploader,
    [Toast.name]:Toast,
    [Popup.name]:Popup,
    [Button.name]:Button,
    [Icon.name]:Icon,
    [Col.name]:Col,
    [Row.name]:Row,
    VueCropper
  },
  props:{},
  data(){
    return {
      member:this.$store.state.member,
      memberAuth:this.$store.state.member_auth,
      showCropper: false,
			option: {
		        img: '',
		        outputSize: 0.8,
		        info: false, // 裁剪框的大小信息
		        outputType: 'jpeg', // 裁剪生成图片的格式
		        canScale: false, // 图片是否允许滚轮缩放
		        autoCrop: true, // 是否默认生成截图框
		        autoCropWidth:  200, // 默认生成截图框宽度
		        autoCropHeight: 200, // 默认生成截图框高度
		        high: true, // 是否按照设备的dpr 输出等比例图片
		        fixedBox: true, // 固定截图框大小 不允许改变
		        fixed: true, // 是否开启截图框宽高固定比例
		        fixedNumber: [1, 1], // 截图框的宽高比例
		        full: false, // 是否输出原图比例的截图
		        canMoveBox: false, // 截图框能否拖动
		        original: false, // 上传图片按照原始比例渲染
		        centerBox: false, // 截图框是否被限制在图片里面
		        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
		        mode: '100% auto' // 图片默认渲染方式
         },
      newTime:new Date().getTime()
    }
  },
  watch:{},
  computed:{
    avatarURL(){
      return this.$store.state.member.avatar+'?' + this.newTime;
    }
  },
  methods:{
    onOversize() {
      this.$toast('文件大小不能超过 3M');
    },
    beforeRead(file) {
      console.log(file)
      if (!(file.type == 'image/jpeg' || file.type == 'image/png')) {
        this.$toast('请上传 jpg/png 格式图片');
        return false;
      }
      this.showCropper = true;
		  this.imageToBase64(file);
    },
    // afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file)
    //   this.upAvatar(file)
    // },
    upAvatar(file){
      let that = this;
      that.axios.post("/api&appsecret=PHPCMF3458092B107BA&api_auth_code="+that.memberAuth+"&api_auth_uid="+that.member.uid+"&s=member&c=account&m=avatar&r=9351",
      that.$qs.stringify({
        is_ajax:1,
        file:file
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
      ).then(function (res) {
        console.log(res)
        if(res.data.code == 0){
          that.$toast(res.data.msg);
          that.showCropper = false;
        }else if(res.data.code > 0){
          that.$toast({
            message:"修改成功",
            onClose:function(){
              that.showCropper = false;
              that.$store.dispatch("setMember", res.data.data);
              that.newTime = new Date().getTime();
            }
          });
        }   
      })
      .catch(function (err) {
        console.log("请求失败" + err);
      })
    },
    imageToBase64(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 截图框中的图片
        this.option.img = reader.result;
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    // 确认剪裁并上传图片
    getCropBlob() {
      let that = this;
      this.$refs.cropper.getCropData((data) => {
        // do something
        that.upAvatar(data)
      })
    },

    // 旋转图片
    rotateImage() {
      this.$refs.cropper.rotateRight();
    },

    // 取消截图上传头像
    cancelCropper() {
      this.showCropper = false; // 隐藏切图遮罩
      this.showPopup = true;
    }    
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
.avatar{
  .avatarImg {
    width: 220px;
    height: 220px;
    margin:15px auto;
    text-align: center;
    padding: 10px;
    background: #fff;
    img {
      width: 200px;
      height: 200px;
    }
  }
  .avatarBtn {
    text-align: center;
  }
  .avatarCropper{
    .flex-column-center{ 
      background: #000;
      height: 100vh;
      padding:30px 15px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      .vue-cropper {
        background: #000;
      }
      .cropperwhite{
        width:100%;
        padding:0 20px;
        font-size: 16px;
        color:#fff;
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
      }    
    }

  }
}

</style>