import { SessionStorage } from 'quasar'
export default function () {
  const sessionUser = SessionStorage.getItem('userData')
  return {
    //
    apiUrl: 'http://localhost:3000/backend_api',
    users: [],
    doctors: [],
    usersProjects: [],
    myProjects: [],
    completedProjects: [],
    isLogged: false,
    profileData: {},
    trendsByProject: [],
    loggedUsers: !sessionUser ? {} : sessionUser,
    registerResponse: '',
    loginResponse: '',
    connectionStatus: '',
    submitStatus: ''
  }
}
