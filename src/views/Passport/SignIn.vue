<template>
  <div class="operateDiv">
    <!-- 账号 -->
    <mt-field placeholder="手机/邮箱" v-model="passportForm.username"></mt-field>
    <!-- 密码 -->
    <mt-field placeholder="请输入密码" type="password" v-model="passportForm.password"></mt-field>
    <!-- 登录和切换登录方式块 -->
    <div>
      <mt-button size="large" @click.native="signIn">登录</mt-button>
    </div>
    <div>
      openId: {{openId}}
    </div>
    <div>
      nickname: {{nickname}}
    </div>
    <img :src="avatar"/>
  </div>
</template>
<script>
  import { md5 } from '@/utils/md5'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        passportForm: {
          username: 'admin',
          password: '123456',
          isSubmitting: false
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名'},
            {max: 255, message: '长度不超过255个字符'}
          ],
          password: [
            {required: true, message: '请输入密码'},
            {max: 255, message: '长度不超过255个字符'}
          ]
        }
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'openId',
        'nickname',
        'avatar'
      ])
    },
    methods: {
      signIn () {
        this.passportForm.isSubmitting = true
        this.$store.dispatch('signIn', {
          username: this.passportForm.username,
          password: md5(this.passportForm.password)
        }).then(() => {
          let redirectUrl = this.$route.query.redirect
          this.$router.push({path: redirectUrl || '/'})
        }).catch(({response}) => {
          this.passportForm.isSubmitting = false
          this.$message.warning(response.data.desc)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .passport-form {
    position: absolute;
    width: 350px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -200px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0 auto 40px auto;
      font-size: 20px;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0 0 35px 0;
    }
  }

  .passport-container {
    height: 100%;
    background-size: cover;
    background-image: url('../../assets/images/background.png');
    background-repeat: no-repeat;
  }
</style>
