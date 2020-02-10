<template>
  <!-- 容器 -->
  <div class="container-login">
    <!-- 弹框 -->
    <el-card class="my-card">
      <img src="../../assets/imgs/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- :value="true" 选中复选框不能进行修改  必须同意 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth.js";
export default {
  name: "app-login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        //校验失败
        callback(new Error("手机号格式错误"));
      } else {
        //校验成功
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "13333333333",
        code: "246810"
      },
      loginRules: {
        mobile: [
          //required 是否必写，message 提示信息，trigger 触发条件
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "验证码错误，为六位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        //valid为true 校验成功  为false 校验失败
        if (valid) {
          //TODO 进行登录
          // this.$http.post(
          //   'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //   this.loginForm
          // ).then(res=>{
          //   // console.log(res.data);
          //   auth.setUser(res.data.data)
          //   this.$router.push('/')
          // }).catch(()=>{
          //   //element-ui的错误提示
          //   this.$message.error('手机号或验证码错误');
          // })
          try {
            const res = await this.$http.post("authorizations", this.loginForm);
            auth.setUser(res.data.data);
            this.$router.push("/");
          } catch (error) {
            this.$message.error("手机号或验证码错误");
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/imgs/login_bg.jpg) no-repeat;
  // 让背景图等比例缩放 去铺满容器
  background-size: cover;
  top: 0;
  left: 0;
  .my-card {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 400px;
    height: 350px;
    img {
      width: 200px;
      display: block;
      margin: 0px auto 20px;
    }
  }
}
</style>