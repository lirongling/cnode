<template>
  <div>
    <div class="top top_____">
      <el-tabs :value="logintype" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <div class="inp__">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="phone">
                <el-input
                  type="text"
                  v-model="ruleForm.phone"
                  autocomplete="off"
                  placeholder="请输入手机号"
                  class="int"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <div class="flex forget0">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <span class="forget">忘记密码</span>
              </div>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
          <div class="split">
            <el-divider>快捷登录</el-divider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <div class="inp__">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="phone">
                <el-input
                  type="text"
                  v-model="ruleForm.phone"
                  autocomplete="off"
                  placeholder="请输入手机号"
                  class="int"
                ></el-input>
              </el-form-item>
              <div class="inp___ flex">
                <el-form-item prop="verification">
                  <el-input
                    type="text"
                    v-model="ruleForm.verification"
                    autocomplete="off"
                    placeholder="请输入验证码"
                  ></el-input>
                  <el-button type="primary" round>获取验证码</el-button>
                </el-form-item>
              </div>
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass1"
                  autocomplete="off"
                  placeholder="请输入验证码"
                ></el-input>
              </el-form-item>

              <!-- <div class="flex forget0">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <span class="forget">忘记密码</span>
              </div>-->
              <div class="register1___">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="split">
            <el-divider>快捷登录</el-divider>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var verification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (this.ruleForm.verification !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var phoneCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号或者用户名"));
      } else {
        let phonest = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
        if (phonest.test(value)) {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      modal1: true,
      checked: false,
      activeName: "login",
      ruleForm: {
        pass: "",
        phone: ""
      },
      ruleForm1: {
        pass: "",
        checkPass: "",
        phone: "",
        verification: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],

        phone: [{ validator: phoneCheck, trigger: "change" }],
        verification: [{ validator: verification, trigger: "change" }]
      }
    };
  },

  props: {
    logintype: {
      type: String,
      default: ""
    }
  },

  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.phone =
            String(this.ruleForm.phone).substring(0, 3) +
            "*****" +
            String(this.ruleForm.phone).substring(8);
          // 传值到父组件
          this.modal1 = false;
          this.$emit("send", this.modal1);
          this.$store.state.loginMsg=this.ruleForm
          // 登录信息保存到localstroage
           
          localStorage.setItem("user", JSON.stringify(this.ruleForm));
          // 登录信息传给vuex
          // this.$store.state.loginMsg = this.ruleForm;
          this.$store.commit('SET_USER', this.ruleForm)
          console.log(this.$store.state.loginMsg);
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
        } else {
          this.$message.error("登陆失败,请输入正确的手机号和密码");
        }
      });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  },
  mounted() {
    this.activeName = this.logintype;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.register1___ {
  margin-top: -20px;
}
.inp__ {
  width: 100%;
  height: 240px;
}
.top {
  width: 100%;
  font-size: 18px;
}
.ipt {
  width: 200px;
  height: 30px;
}
.forget {
  font-size: 14px;
  color: #606266;
}
</style>