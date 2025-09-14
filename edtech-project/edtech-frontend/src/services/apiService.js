import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  // === Auth Methods ===
  login(credentials) {
    return apiClient.post('/login', credentials)
  },
  logout() {
    return apiClient.post('/logout')
  },
  getMe() {
    return apiClient.get('/me')
  },

  // === Student Methods ===
  getAllStudents() {
    return apiClient.get('/students')
  },
  createStudent(studentData) {
    return apiClient.post('/students', studentData)
  },
  updateStudent(id, studentData) {
    return apiClient.put(`/students/${id}`, studentData)
  },
  deleteStudent(id) {
    return apiClient.delete(`/students/${id}`)
  },
}
