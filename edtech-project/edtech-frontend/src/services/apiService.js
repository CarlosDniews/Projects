// src/services/apiService.js

import axios from 'axios'

// Configura a URL base da sua API. Altere se for diferente.
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Endereço do seu back-end
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  // Listar todos os alunos
  getAllStudents() {
    return apiClient.get('/students')
  },
  // Criar um novo aluno
  createStudent(studentData) {
    return apiClient.post('/students', studentData)
  },
  // Atualizar um aluno existente pelo RA
  updateStudent(ra, studentData) {
    return apiClient.put(`/students/${ra}`, studentData)
  },
  // Excluir um aluno pelo RA
  deleteStudent(ra) {
    return apiClient.delete(`/students/${ra}`)
  },
}
