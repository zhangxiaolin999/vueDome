<template>
  <div class="login-page-home" ref="loginPage">
    <div class="box-card">
      <h2 class="textLogin">Login</h2>
      <div class="temp">
        <el-form :model="loginData" :rules="rules" ref="ruleForm">
          <el-form-item label="账号:" prop="user">
            <el-input
              clearable
              v-model="loginData.user"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              show-password
              type="password"
              v-model="loginData.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <div @click="getCode" v-html="svg" class="code"></div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="code" class="codeform">
                <el-input
                  clearable
                  v-model="loginData.code"
                  placeholder="请输入验证码"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button style="width:100%" type="primary" @click="submitForm()"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login, code, getImage } from "@/api/login/index";
import { Base64 } from "js-base64";
export default {
  data() {
    return {
      svg: "",
      loginData: {
        user: "",
        password: "",
        code: ""
      },
      rules: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCode() {
      code().then(res => {
        this.svg = res.data;
      });
    },
    getimg() {
      getImage().then(res => {
        this.$refs.loginPage.style.backgroundImage = `url('${res.data}')`;
      });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        login(Base64.encode(JSON.stringify(this.loginData))).then(res => {
          if (res.data.code === 200) {
            this.$message.success({ message: `${res.data.message}` });
            this.$router.push("/");
          } else if (res.data.code === 3001) {
            this.$message.error(`${res.data.message}`);
            this.getCode();
          } else {
            this.$message.error(`${res.data.message}`);
          }
        });
      });
    }
  },
  mounted() {
    this.getCode();
    this.getimg();
  }
};
</script>
<style lang="scss" scoped>
.login-page-home {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  z-index: -99999;
  .box-card {
    width: 400px;
    height: 450px;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    right: 100px;
    top: 20%;
    border-radius: 4px;
    .textLogin {
      text-align: center;
      padding-top: 15px;
    }
    .code {
      cursor: pointer;
      border: 1px solid #999;
      width: 150px;
      height: 50px;
      margin-bottom: 20px;
    }
    .temp {
      padding: 5px 25px;
    }
    .codeform {
      /deep/ {
        .el-input__inner {
          height: 50px;
        }
      }
    }
  }
}
</style>
