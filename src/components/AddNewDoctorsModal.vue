<template>
  <q-dialog v-if="fModal" :model-value="true">
    <q-card style="width: 1350px; max-width: 80vw;">
      <q-card-section>
        <div class="text-subtitle2 text-weight-bold text-uppercase">{{ title }}</div>
      </q-card-section>
      <div class="q-pa-md" style="max-width: 1350px">

        <q-form @submit="submitForm" class="q-gutter-md" ref="form">

          <div class="container">

            <div class="row bg-grey-2 q-pa-sm rounded-borders" v-if="title !== 'Delete Doctor'">

              <div class="col-md-2 q-mr-sm">
                <b>CODE</b>
                <q-input outlined v-model="webDoctors.code" hint="Doctors Code" lazy-rules
                  :rules="[val => val && val.length > 0 || 'This is required']" />
              </div>
              <div class="col-md-3 q-mr-sm">
                <b>LAST NAME</b>
                <q-input outlined v-model="webDoctors.last_name" hint="Last Name" lazy-rules
                  :rules="[val => val && val.length > 0 || 'This is required']" />
              </div>
              <div class="col-md-3 q-mr-sm">
                <b>FIRST NAME</b>
                <q-input outlined v-model="webDoctors.first_name" hint="First Name" lazy-rules
                  :rules="[val => val && val.length > 0 || 'This is required']" />
              </div>
              <div class="col-md-3 q-mr-sm">
                <b>CATEGORY</b>
                <q-input outlined v-model="webDoctors.category" hint="Category" lazy-rules
                  :rules="[val => val && val.length > 0 || 'This is required']" />
              </div>
            </div>
          </div>
          <div class="row bg-grey-2 q-pa-sm rounded-borders" v-if="title !== 'Delete Doctor'">
            <div class="col-md-2 q-mr-sm">
              <b>ROOM</b>
              <q-input outlined v-model="webDoctors.room" hint="ROOM" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-3 q-mr-sm">
              <b>ALIAS</b>
              <q-input outlined v-model="webDoctors.alias" hint="ALIAS" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-3 q-mr-sm">
              <b>SPECIALTY</b>
              <q-input outlined v-model="webDoctors.specialty" hint="SPECIALTY" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-3 q-mr-sm">
              <b>CLINICAL DEPARTMENT</b>
              <q-input outlined v-model="webDoctors.clinical_department" hint="CLINICAL DEPARTMENT" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-12 q-mr-sm">
              <b>HMO </b>
              <q-input outlined v-model="webDoctors.hmo" hint="HMO" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
          </div>
          <div class="row bg-grey-2 q-pa-sm rounded-borders" v-if="title !== 'Delete Doctor'">
            <div class="col-md-12 q-mr-sm">
              <b>HMO SHORT</b>
              <q-input outlined v-model="webDoctors.hmo_short" hint="HMO SHORT" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-3 q-mr-sm">
              <b>SCHEDULE</b>
              <q-input outlined v-model="webDoctors.schedule" hint="SCHEDULE" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-3 q-mr-sm">
              <b>CONTACT LOCAL</b>
              <q-input outlined v-model="webDoctors.contact_local" hint="CONTACT LOCAL" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-3 q-mr-sm">
              <b>CONTACT DIRECT</b>
              <q-input outlined v-model="webDoctors.contact_direct" hint="CONTACT DIRECT" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
            <div class="col-md-2 q-mr-sm">
              <b>STATUS</b>
              <q-input outlined v-model="webDoctors.status" hint="STATUS" lazy-rules
                :rules="[val => val && val.length > 0 || 'This is required']" />
            </div>
          </div>
          <q-card-section v-else class="q-pt-none text-weight-bold">
            Are you sure you want to delete this Doctor?
          </q-card-section>
          <div>
            <q-btn v-if="title === 'Delete Doctor'" label="Delete" type="submit" color="red" />
            <q-btn v-else label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'AddProjectModal',
  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Doctor was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Doctor was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Doctor was deleted'
        })
      }
    }
  },
  data() {
    return {
      webDoctors: {
        id: 0,
        code: '',
        last_name: '',
        first_name: '',
        category: '',
        room: '',
        alias: '',
        specialty: '',
        clinical_department: '',
        hmo: '',
        hmo_short: '',
        schedule: '',
        contact_local: '',
        contact_direct: '',
        status: ''
      }
    }
  },
  props: ['vData', 'fModal', 'title'],

  created() {
    this.checkIsLogged()
  },

  computed: {
    ...mapGetters({
      isLogged: 'doctors/isLogged',
      loggedUsers: 'doctors/loggedUsers',
      users: 'doctors/users',
      dotors: 'doctors/doctors',
      submitStatus: 'doctors/submitStatus'
    })
  },

  watch: {
    vData: {
      handler(val) {
        if (val) {
          this.webDoctors.id = val.id
          this.webDoctors.code = val.code
          this.webDoctors.last_name = val.last_name
          this.webDoctors.first_name = val.first_name
          this.webDoctors.category = val.category
          this.webDoctors.room = val.room
          this.webDoctors.alias = val.alias
          this.webDoctors.specialty = val.specialty
          this.webDoctors.clinical_department = val.clinical_department
          this.webDoctors.hmo = val.hmo,
            this.webDoctors.hmo_short = val.hmo_short
          this.webDoctors.schedule = val.schedule,
            this.webDoctors.contact_local = val.contact_local,
            this.webDoctors.contact_direct = val.contact_direct,
            this.webDoctors.status = val.status
        } else {
          this.webDoctors.id = ''
          this.webDoctors.code = ''
          this.webDoctors.last_name = ''
          this.webDoctors.first_name = ''
          this.webDoctors.category = ''
          this.webDoctors.room = ''
          this.webDoctors.alias = ''
          this.webDoctors.specialty = ''
          this.webDoctors.clinical_department
          this.webDoctors.hmo = ''
          this.webDoctors.hmo_short = ''
          this.webDoctors.schedule = ''
          this.webDoctors.contact_local = ''
          this.webDoctors.contact_direct = ''
          this.webDoctors.status = ''
        }
      },
      immediate: true
    }

  },

  methods: {
    checkIsLogged() {
      this.loggedUsers.accessToken ? this.$router.push('/doctors') : this.$router.push('/')
    },
    async getDoctors() {
      const doctorsList = await this.$store.dispatch('doctors/getDoctors')
      this.loading = false
    },
    async saveDoctor() {
      let data = {
        code: this.webDoctors.code,
        last_name: this.webDoctors.last_name,
        first_name: this.webDoctors.first_name,
        category: this.webDoctors.category,
        room: this.webDoctors.room,
        alias: this.webDoctors.alias,
        specialty: this.webDoctors.specialty,
        clinical_department: this.webDoctors.clinical_department,
        hmo: this.webDoctors.hmo,
        hmo_short: this.webDoctors.hmo_short,
        schedule: this.webDoctors.schedule,
        contact_local: this.webDoctors.contact_local,
        contact_direct: this.webDoctors.contact_direct,
        status: this.webDoctors.status,
      }
      const result = await this.$store.dispatch('doctors/createDoctors', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerPositive(); this.getDoctors(); })() : null
    },
    async saveUpdatedDoctor() {
      let data = {
        id: this.webDoctors.id,
        code: this.webDoctors.code,
        last_name: this.webDoctors.last_name,
        first_name: this.webDoctors.first_name,
        category: this.webDoctors.category,
        room: this.webDoctors.room,
        alias: this.webDoctors.alias,
        specialty: this.webDoctors.specialty,
        clinical_department: this.webDoctors.clinical_department,
        hmo: this.webDoctors.hmo,
        hmo_short: this.webDoctors.hmo_short,
        schedule: this.webDoctors.schedule,
        contact_local: this.webDoctors.contact_local,
        contact_direct: this.webDoctors.contact_direct,
        status: this.webDoctors.status,
      }
      const result = await this.$store.dispatch('doctors/updateDoctors', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerInfo(); this.getDoctors(); })() : null
    },
    async deleteDoctor() {
      let data = {
        code: this.webDoctors.code,
      }
      const result = await this.$store.dispatch('doctors/deleteDoctor', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerNegative(); this.getDoctors(); })() : null
    },
    submitForm() {
      this.title === 'Add New Doctor' ? this.saveDoctor() : this.title === 'Edit Doctor' ? this.saveUpdatedDoctor() : this.deleteDoctor()
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>
<style>
.container-reg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: auto;
}
</style>