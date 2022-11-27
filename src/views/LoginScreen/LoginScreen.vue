<template>
  <main class="main login">
    <div class="login__left-column"></div>
    <div class="login__right-column">
      <div class="login__container">
        <BaseLogo
          :size="'lg'"
          class="login__logo"
        />
        <div class="login__caption">
          <h1 class="login__title">Вход</h1>
          <h2 class="login__subtitle">Войдите в систему сейчас, чтобы<br>получить доступ к вашим питомцам</h2>
        </div>
        <div class="login__form">
          <form @submit.prevent>
            <FloatLabel
              :class="['login__fl',
                      {'login__fl_success': flEmailSuccess},
                      {'login__fl_danger': flEmailDanger}]"
            >
              <BaseInput
                v-model="inputEmail"
                :placeholder="'Адрес эл. почты'"
                :errorMessage="inputEmailErrMsg"
                :elemClass="'login__input'"
              />
            </FloatLabel>
            <FloatLabel
              :class="['login__fl',
                      {'login__fl_success': flPasswordSuccess},
                      {'login__fl_danger': flPasswordDanger}]"
            >
              <BaseInput
                v-model="inputPassword"
                :placeholder="'Пароль'"
                :errorMessage="inputPasswordErrMsg"
                :elemClass="'login__input'"
                :elemInputType="'password'"
              />
            </FloatLabel>
            <p class="login__recovery-text">
              <a href="#" class="login__recovery-link">Забыли пароль?</a>
            </p>
            <BaseButton
              :loading="submitBtnLoading"
              :disabled="submitBtnDisabled"
              @click="doLogin"
              type="submit"
              class="login__button"
            >
              Войти
            </BaseButton>
          </form>
        </div>
        <div class="login__links">
          <p class="login__text">У вас ещё нет аккаунта?</p>
          <router-link
            to="/registration"
            class="login__link"
          >
            Зарегистрироваться
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BaseLogo from '@/components/ui/BaseLogo/BaseLogo.vue'
import FloatLabel from '@/components/ui/FloatLabel/FloatLabel.vue'
import BaseInput from '@/components/ui/BaseInput/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import { mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, helpers } from '@vuelidate/validators'
import { firebaseSignIn } from '@/firebase/authentication'
import { firestoreGetDoc } from '@/firebase/firestore'

export default {
  name: 'LoginScreen',

  components: {
    BaseLogo,
    FloatLabel,
    BaseInput,
    BaseButton
  },

  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      inputEmail: '',
      inputEmailErrMsg: '',
      inputPassword: '',
      inputPasswordErrMsg: '',
      submitBtnLoading: false,
      submitBtnDisabled: false,
      flEmailDanger: false,
      flEmailSuccess: false,
      flPasswordDanger: false,
      flPasswordSuccess: false
    }
  },

  validations() {
    return {
      inputEmail: {
        required: helpers.withMessage('Заполните адрес эл. почты (email@example.com)', required),
        email
      },
      
      inputPassword: {
        required: helpers.withMessage('Введите пароль (не менее 6 символов)', required),
        minLengthValue: minLength(6)
      }
    }
  },

  watch: {
    inputEmail(newValue) {
      if (newValue !== '') {
        this.submitBtnDisabled = false
        this.flEmailDanger = false
        this.flEmailSuccess = false
      }
    },

    inputPassword(newValue) {
      if (newValue !== '') {
        this.submitBtnDisabled = false
        this.flPasswordDanger = false
        this.flPasswordSuccess = false
      }
    }
  },

  methods: {
    ...mapActions([
      'changeUserAuth',
      'changeUserName'
    ]),
    
    async doLogin() {
      this.submitBtnLoading = true
      
      if (this.v$.inputEmail.$invalid) {
        this.submitBtnDisabled = true
        this.submitBtnLoading = false
        this.flEmailDanger = true
        this.inputEmailErrMsg = this.v$.inputEmail.required.$message
      } else {
        this.flEmailSuccess = true
        this.flEmailDanger = false
        this.inputEmailErrMsg = ''
      }

      if (this.v$.inputPassword.$invalid) {
        this.submitBtnDisabled = true
        this.submitBtnLoading = false
        this.flPasswordDanger = true
        this.inputPasswordErrMsg = this.v$.inputPassword.required.$message
      } else {
        this.flPasswordSuccess = true
        this.flPasswordDanger = false
        this.inputPasswordErrMsg = ''
      }

      if ((!this.v$.inputEmail.$invalid) && (!this.v$.inputPassword.$invalid)) {
        try {
          const userLogin = await firebaseSignIn(this.inputEmail, this.inputPassword)
          const userEntry = await firestoreGetDoc('users', userLogin.user.uid)
          this.changeUserAuth({auth: true, uid: userLogin.user.uid})
          this.changeUserName(userEntry.name)
          this.$router.push({name: 'home'})
        } catch(e) {
          console.error(e)
        }
      }
    }
  }
}
</script>

<style lang="scss" src="./LoginScreen.scss"/>