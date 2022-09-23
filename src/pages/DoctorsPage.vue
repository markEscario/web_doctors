<template>
  <q-page>
    <div class="q-pa-md">
      <q-btn color="primary" label="Add Doctor" icon="camera_enhance" class="q-mb-sm" @click="openAdd" />

      <q-input borderless dense debounce="300" color="primary" placeholder="Search" v-model="filter">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      {{ pageError }}
      <AddNewDoctorsModal :fModal="medium" :vData="webDoctors" :title="formTitle" @close="closeDialog"
        @hide="closeDialog" />
      <q-table title="DOCTORS" :rows="doctors" :columns="columns" :filter="filter" :loading="loading" row-key="title">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn round icon="mode_edit" color="primary" @click="openEdit(props.row)" class="q-mr-sm" />
            <q-btn round icon="delete" color="red" @click="openDelete(props.row)" />
          </q-td>
        </template>
        <template #loading>
          <q-inner-loading showing color="primary" size="90px" />
        </template>
      </q-table>

    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import AddNewDoctorsModal from 'components/AddNewDoctorsModal.vue'

export default defineComponent({
  name: 'DoctorsPage',
  components: {
    AddNewDoctorsModal
  },
  setup() {
    return {
      columns,
      loading,
      filter,
    }
  },
  data() {
    return {
      medium: false,
      formTitle: '',
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
        contact_local: '',
        contact_direct: '',
        schedule: '',
        status: ''
      }
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
      users: 'doctors/users',
      doctors: 'doctors/doctors'
    })
  },

  methods: {
    async getDoctors() {
      const doctorsList = await this.$store.dispatch('doctors/getDoctors')
      this.loading = false
    },

    openAdd() {
      this.medium = true
      this.formTitle = "Add New Doctor"
      this.webDoctors = {
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
        contact_local: '',
        contact_direct: '',
        schedule: '',
        status: ''
      }
    },
    openEdit(details) {
      this.medium = true
      this.formTitle = 'Edit Doctor'
      this.webDoctors = {
        id: details.ID,
        code: details.code,
        last_name: details.lastName,
        first_name: details.firstName,
        category: details.category,
        room: details.room,
        alias: details.alias,
        specialty: details.specialty,
        clinical_department: details.clinicalDepartment,
        hmo: details.hmo,
        hmo_short: details.hmoShort,
        contact_local: details.contactLocal,
        contact_direct: details.contactDirect,
        schedule: details.schedule,
        status: details.status
      }
    },
    openDelete(details) {
      this.medium = true
      this.formTitle = 'Delete Doctor'
      this.webDoctors = {
        code: details.code
      }
    },
    checkIsLogged() {
      this.loggedUsers.accessToken ? this.$router.push('/doctors') : this.$router.push('/')
    },

    closeDialog() {
      this.medium = false
    },
    closeTDialog() {
      this.trendModal = false
    }

  },

})
const columns = [
  {
    name: 'code',
    required: true,
    label: 'CODE',
    align: 'left',
    field: row => row.code,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'lastName',
    align: 'left',
    label: 'LASTNAME',
    field: 'lastName',
    sortable: true
  },
  {
    name: 'firstName',
    align: 'left',
    label: 'FIRSTNAME',
    field: 'firstName',
    sortable: true
  },
  {
    name: 'specialty',
    align: 'left',
    label: 'SPECIALTY',
    field: 'specialty',
    sortable: true
  },
  {
    name: 'clinical_departmenyt',
    align: 'left',
    label: 'CLINICAL DEPARTMENT',
    field: 'clinicalDepartment',
    sortable: true
  },
  {
    name: 'contactLocal',
    align: 'left',
    label: 'CONTACT LOCAL',
    field: 'contactLocal',
    sortable: true
  },
  {
    name: 'contactDirect',
    align: 'left',
    label: 'CONTACT DIRECT',
    field: 'contactDirect',
    sortable: true
  },
  {
    name: 'hmo',
    align: 'left',
    label: 'HMO',
    field: 'hmo',
    sortable: true
  },
  {
    name: 'hmo_short',
    align: 'left',
    label: 'HMO SHORT',
    field: 'hmoShort',
    sortable: true
  },
  {
    name: 'schedule',
    align: 'left',
    label: 'SCHEDULE',
    field: 'schedule',
    sortable: true
  },
  {
    name: 'status',
    align: 'left',
    label: 'STATUS',
    field: 'status',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'ACTION',
    field: 'actions',
    sortable: false
  }
]
const loading = ref(true)
const filter = ref('')
</script>
<style>
.update-btn {
  margin-top: 10px;
}
</style>