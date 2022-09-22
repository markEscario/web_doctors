import axios from "axios";
import { SessionStorage } from 'quasar'

export async function getSystemUsers(context) {
  try {
    const response = await axios.get(`${this.state.doctors.apiUrl}/users`)
    context.commit('setUsers', response.data)
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getDoctors(context) {
  try {
    const response = await axios.get(`${this.state.doctors.apiUrl}/doctors`)
    for (const doctor of response.data) {
      doctor.code = doctor.code === null ? '0' : doctor.code
      doctor.schedule = doctor.schedule ? 'By Appointment' : doctor.schedule
    }
    context.commit('setDoctors', response.data)
    return response.data
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function createDoctors(context, payload) {
  try {
    console.log('payload: ', payload)
    const response = await axios.post(`${this.state.doctors.apiUrl}/create_doctors`, payload)
    console.log('reg result: ', response.data)
    context.commit('setSubmitStatus', response.status)
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function searchDoctors(context, payload) {
  try {
    const response = await axios.get(`${this.state.doctors.apiUrl}/search_projects?filter_params=${payload.searchData}`)
    context.commit('setUsersProjects', response.data)
    return response.data
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function searchSystemUsers(context, payload) {
  try {
    const response = await axios.get(`${this.state.doctors.apiUrl}/search_system_users?filter_params=${payload.searchData}`)
    context.commit('setUsers', response.data)
    return response.data
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function register(context, payload) {
  try {
    console.log('payload: ', payload)
    const response = await axios.post(`${this.state.doctors.apiUrl}/register`, payload)
    console.log('reg result: ', response.data)
    context.commit('setRegisterResponse', response.data)
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function handleLogin(context, payload) {
  try {
    console.log('login payload: ', payload)
    const response = await axios.post(`${this.state.doctors.apiUrl}/sign_in`, payload)

    if (response.data.accessToken) {
      SessionStorage.set('userData', response.data)
      context.commit('setProfileData', response.data)
      let userData = SessionStorage.getItem('userData')
      if (userData.accessToken) {
        context.commit('setLoggedUsers', userData)
        context.commit('setIsLogged', true)
      }
    } else {
      context.commit('setLoginResponse', response.data)
    }
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getProfile(context, payload) {
  try {
    const response = await axios.get(`${this.state.doctors.apiUrl}/profile?id=${payload}`)
    context.commit('setProfileData', response.data[0])
    return response.data[0]
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function editProfile(context, payload) {
  try {
    const response = await axios.post(`${this.state.doctors.apiUrl}/update_profile`, payload)
    console.log('edit: ', response.data)
    context.commit('setRegisterResponse', response.data)
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function logOut(context) {
  sessionStorage.removeItem('userData')
  context.commit('setIsLogged', false)
}
export async function updateDoctors(context, payload) {
  try {
    const response = await axios.put(`${this.state.doctors.apiUrl}/doctors/${payload.code}`, payload)
    console.log('reg result: ', response.data)
    context.commit('setSubmitStatus', response.status)
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function deleteDoctor(context, payload) {
  try {
    console.log('d payload id: ', payload.code)
    const response = await axios.delete(`${this.state.doctors.apiUrl}/doctors/${payload.code}`)
    context.commit('setSubmitStatus', response.status)
    return response
  } catch (err) {
    console.log(err);
    return err
  }
}

