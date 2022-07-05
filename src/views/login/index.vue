<template>
  <div class="login-div">
    <div class="login-content">
      <!-- 表单 -->
      <el-form
        ref="loginRuleFormRef"
        :model="loginruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="loginruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="loginruleForm.password" type="password" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model.trim="loginruleForm.code"
            class="logininput"
          ></el-input>
          <div class="loginimg">
            <img id="img" :src="imgSrc" @click="handleClickImg" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="LogintForm">提交</el-button>
          <el-button>获取密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import Login from '../../api/login'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const imgSrc = ref('')

// 提交验证
const loginRuleFormRef = ref()
// 表单
const loginruleForm = reactive({
  username: 'test',
  password: '1234567',
  token: '',
  code: ''
})
// 验证
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    { min: 3, max: 7, message: '请输入最少3个最多7个', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
})

// 点击图片
const handleClickImg = async () => {
  // console.log('11111')
  const logincode = await Login.LoginCode()
  // console.log('logincode', logincode.data.data.token)
  loginruleForm.token = logincode.data.data.token
  imgSrc.value = logincode.data.data.captchaImg
}
handleClickImg()
// 点击登录
const LogintForm = async () => {
  if (!loginRuleFormRef.value) return
  await loginRuleFormRef.value.validate(async (valid) => {
    if (valid) {
      // await store.dispatch('user/loginCode')
      const response = await store.dispatch('user/userLogin', loginruleForm)
      console.log('response', response)
      router.push('/')
    } else {
      console.log('error submit!')
    }
  })
}

// console.log(loginImg())
</script>
<style lang="scss" scoped>
.login-div {
  width: 100vw;
  .login-content {
    width: 500px;
    height: 500px;
    margin: 80px auto;
  }
  .logininput {
    width: 60%;
  }
  .loginimg {
    width: 150px;
    height: 30px;
    #img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
