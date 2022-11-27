<template>
  <main class="main registration">
    <div class="registration__left-column"></div>
    <div class="registration__right-column">
      <div class="registration__container">
        <BaseLogo
          :size="'lg'"
          class="registration__logo"
        />
        <div class="registration__caption">
          <h1 class="registration__title">Регистрация</h1>
          <h2 class="registration__subtitle">Зарегистрируйтесь сейчас<br>бесплатно и добавьте своего<br>питомца</h2>
        </div>
        <div class="registration__form">
          <form @submit.prevent>
            <FloatLabel
              :class="['registration__fl',
                      {'registration__fl_success': flUsernameSuccess},
                      {'registration__fl_danger': flUsernameDanger}]"
            >
              <BaseInput
                v-model="inputUsername"
                :placeholder="'Имя пользователя'"
                :errorMessage="inputUsernameErrMsg"
                :elemClass="'registration__input'"
              />
            </FloatLabel>
            <FloatLabel
              :class="['registration__fl',
                      {'registration__fl_success': flEmailSuccess},
                      {'registration__fl_danger': flEmailDanger}]"
            >
              <BaseInput
                v-model="inputEmail"
                :placeholder="'Адрес эл. почты'"
                :errorMessage="inputEmailErrMsg"
                :elemClass="'registration__input'"
              />
            </FloatLabel>
            <FloatLabel
              :class="['registration__fl',
                      {'registration__fl_success': flPasswordSuccess},
                      {'registration__fl_danger': flPasswordDanger}]"
            >
              <BaseInput
                v-model="inputPassword"
                :placeholder="'Пароль'"
                :errorMessage="inputPasswordErrMsg"
                :elemClass="'registration__input'"
                :elemInputType="'password'"
              />
            </FloatLabel>
            <BaseButton
              :loading="submitBtnLoading"
              :disabled="submitBtnDisabled"
              @click="doRegistration"
              type="submit"
              class="registration__button"
            >
              Зарегистрироваться
            </BaseButton>
          </form>
        </div>
        <div class="registration__links">
          <p class="registration__text">Уже есть аккаунт?</p>
          <router-link
            to="/login"
            class="registration__link"
          >
            Войти
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
import { firebaseRegister, firebaseSignIn} from '@/firebase/authentication'
import { firestoreSetDoc, firestoreGetDoc } from '@/firebase/firestore'

export default {
  name: 'RegistrationScreen',

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
      inputUsername: '',
      inputUsernameErrMsg: '',
      inputEmail: '',
      inputEmailErrMsg: '',
      inputPassword: '',
      inputPasswordErrMsg: '',
      submitBtnLoading: false,
      submitBtnDisabled: false,
      flUsernameDanger: false,
      flUsernameSuccess: false,
      flEmailDanger: false,
      flEmailSuccess: false,
      flPasswordDanger: false,
      flPasswordSuccess: false
    }
  },

  validations() {
    return {
      inputUsername: {
        required: helpers.withMessage('Заполните имя пользователя', required)
      },

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
    inputUsername(newValue) {
      if (newValue !== '') {
        this.submitBtnDisabled = false
        this.flUsernameDanger = false
        this.flUsernameSuccess = false
      }
    },
    
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
    
    async doRegistration() {
      this.submitBtnLoading = true
      
      if (this.v$.inputUsername.$invalid) {
        this.submitBtnDisabled = true
        this.submitBtnLoading = false
        this.flUsernameDanger = true
        this.inputUsernameErrMsg = this.v$.inputUsername.required.$message
      } else {
        this.flUsernameSuccess = true
        this.flUsernameDanger = false
        this.inputUsernameErrMsg = ''
      }

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

      if ((!this.v$.inputUsername.$invalid) &&
      (!this.v$.inputEmail.$invalid) &&
      (!this.v$.inputPassword.$invalid)) {
        try {
          const userRegistration = await firebaseRegister(this.inputEmail, this.inputPassword)
          await firebaseSignIn(this.inputEmail, this.inputPassword)
          await firestoreSetDoc('users', userRegistration.user.uid, {name: this.inputUsername, groupsID: []})
          const userEntry = await firestoreGetDoc('users', userRegistration.user.uid)
          this.changeUserAuth({auth: true, uid: userRegistration.user.uid})
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

<style lang="scss" src="./RegistrationScreen.scss"/>