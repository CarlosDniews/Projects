// src/stores/studentStore.js

import { defineStore } from 'pinia'
import api from '@/services/apiService'

export const useStudentStore = defineStore('students', {
  state: () => ({
    students: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        const response = await api.getAllStudents()
        this.students = response.data
      } catch (error) {
        this.error = 'Falha ao carregar os alunos.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addStudent(studentData) {
      try {
        await api.createStudent(studentData)
        await this.fetchStudents() // Atualiza a lista após o cadastro
        return true // Sucesso
      } catch (error) {
        console.error(error)
        return false // Falha
      }
    },

    async editStudent(ra, studentData) {
      try {
        await api.updateStudent(ra, studentData)
        await this.fetchStudents() // Atualiza a lista após a edição
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },

    async removeStudent(ra) {
      try {
        await api.deleteStudent(ra)
        await this.fetchStudents() // Atualiza a lista após a exclusão
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
  },
})
