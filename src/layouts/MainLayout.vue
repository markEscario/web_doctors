<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          WEB DOCTORS
        </q-toolbar-title>

        <div>BETA V{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Preferences
        </q-item-label>

        <EssentialLink class="list-label" v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
      <q-list>
        <q-icon v-if="loggedUsers" class="q-ml-md logout-icon" size="24px" name="logout" @click="logOut"></q-icon>
        <a v-if="loggedUsers" @click="logOut" href="" class="q-pa-lg logout-label">Logout</a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters } from 'vuex'

const linksList = [
  {
    title: 'Doctors',
    caption: 'List of Web Doctors',
    icon: 'person',
    link: '/doctors'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data() {
    return {
      searchDoctors: ''
    }
  },
  created() {
    this.checkIsLogged()
    this.getDoctors()
  },

  computed: {
    ...mapGetters({
      isLogged: 'doctors/isLogged',
      loggedUsers: 'doctors/loggedUsers',
      doctors: 'doctors/doctors'
    })
  },

  methods: {
    async logOut() {
      return await this.$store.dispatch('doctors/logOut')
    },
    async getDoctors() {
      const listOfDoctors = await this.$store.dispatch('doctors/getDoctors')
    },
    checkIsLogged() {
      this.loggedUsers.accessToken ? this.$router.push('/dashboard') : this.$router.push('/')
      console.log('token: ', this.loggedUsers.accessToken)
    }
  },

  watch: {
    isLogged: {
      handler(val) {
        if (val) {
          console.log('val: ', val)
        }
      },
      immediate: true
    }

  }
})
</script>
<style>
.list-label {
  margin-left: -8px;
}

.logout-icon {
  margin-left: 11px;
}

.logout-label {
  margin-left: 4px;
}
</style>
