<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-uppercase">
          <!-- <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar> -->
          Web Doctors
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-banner inline-actions rounded v-if="loginResponse" class="bg-red text-white">
          {{ loginResponse.message }}
        </q-banner>
      </div>
      <div class="q-pa-md container-pos" style="max-width: 400px">

        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input outlined v-model="loginInput.username" hint="Username" lazy-rules
            :rules="[val => val && val.length > 0 || 'This is required']" />

          <q-input v-model="loginInput.password" outlined :type="isPwd ? 'password' : 'text'" hint="Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'This is required']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
          <div>
            <q-btn label="Login" type="submit" color="primary" />
            <q-btn label="Create Account" type="button" color="primary" flat class="q-ml-sm" to="/registration" />
          </div>
        </q-form>

      </div>
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-subtitle2">V Projects. Beta 1.0</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
  
<script>
import { mapGetters } from 'vuex'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SignPage',
  setup() {
    const $q = useQuasar()
    return {
      isPwd: ref(true),
    }
  },

  data() {
    return {
      loginInput: {
        username: '',
        password: ''
      },
      formMessage: '',
      bannerBg: 'red'
    }
  },

  created() {
    this.checkIsLogged()
  },

  computed: {
    ...mapGetters({
      loggedUsers: 'doctors/loggedUsers',
      loginResponse: 'doctors/loginResponse',
      usersProjects: 'doctors/usersProjects',
    })
  },

  methods: {
    async handleLogin() {
      let data = {
        username: this.loginInput.username,
        password: this.loginInput.password
      }
      const res = await this.$store.dispatch('doctors/handleLogin', data)

      this.loggedUsers.accessToken ? this.$router.push('/doctors') : this.$router.push('/')
    },
    checkIsLogged() {
      this.loggedUsers.accessToken ? this.$router.push('/doctors') : this.$router.push('/')
    },
  }
})
</script>
<style>
.container-pos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>