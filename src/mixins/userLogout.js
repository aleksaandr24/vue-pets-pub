import { mapActions } from 'vuex'
import { firebaseSignOut } from '@/firebase/authentication'

export default {
  methods: {
    ...mapActions([
      'changeUserAuth',
      'changeUserName'
    ]),

    doLogout() {
      firebaseSignOut()
      .then(() => {
        this.changeUserAuth({auth: false, uid: null})
        this.changeUserName('')
        this.$router.push({name: 'loading'})
      })
      .catch((e) => console.error(e))
    }
  }
}