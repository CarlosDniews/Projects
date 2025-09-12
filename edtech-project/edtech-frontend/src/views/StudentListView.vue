<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-account-school"></v-icon> &nbsp; Gerenciamento de Alunos

        <v-spacer></v-spacer>

        <v-btn prepend-icon="mdi-plus" color="primary" @click="openCreateDialog">
          Cadastrar Aluno
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table
        :headers="headers"
        :items="studentStore.students"
        :loading="studentStore.loading"
        loading-text="Carregando dados..."
        no-data-text="Nenhum aluno encontrado"
        hover
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="me-2" size="small" @click="openEditDialog(item.raw)"> mdi-pencil </v-icon>
          <v-icon size="small" color="error" @click="openDeleteDialog(item.raw)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <student-form-dialog
      v-model:show="isFormDialogVisible"
      :student="selectedStudent"
      @save="handleSaveStudent"
    />

    <confirmation-dialog
      v-model:show="isDeleteDialogVisible"
      title="Confirmar Exclusão"
      :message="`Tem certeza que deseja excluir o aluno ${selectedStudent?.name}?`"
      @confirm="handleDeleteConfirm"
      @cancel="closeDeleteDialog"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStudentStore } from '@/stores/studentStore'
import { useToast } from 'vue-toastification'
import StudentFormDialog from '@/components/StudentFormDialog.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

const studentStore = useStudentStore()
const toast = useToast()

const isFormDialogVisible = ref(false)
const isDeleteDialogVisible = ref(false)
const selectedStudent = ref(null)

const headers = [
  { title: 'RA', key: 'ra', align: 'start' },
  { title: 'Nome', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
]

onMounted(() => {
  studentStore.fetchStudents()
})

function openCreateDialog() {
  selectedStudent.value = null
  isFormDialogVisible.value = true
}

function openEditDialog(student) {
  selectedStudent.value = { ...student } // Cria uma cópia para edição
  isFormDialogVisible.value = true
}

function openDeleteDialog(student) {
  selectedStudent.value = student
  isDeleteDialogVisible.value = true
}

function closeDeleteDialog() {
  isDeleteDialogVisible.value = false
  selectedStudent.value = null
}

async function handleSaveStudent(studentData) {
  let success = false
  if (selectedStudent.value?.ra) {
    // Modo Edição
    success = await studentStore.editStudent(selectedStudent.value.ra, studentData)
    if (success) toast.success('Aluno atualizado com sucesso!')
  } else {
    // Modo Cadastro
    success = await studentStore.addStudent(studentData)
    if (success) toast.success('Aluno cadastrado com sucesso!')
  }

  if (success) {
    isFormDialogVisible.value = false
    selectedStudent.value = null
  } else {
    toast.error('Ocorreu um erro. Verifique os dados e tente novamente.')
  }
}

async function handleDeleteConfirm() {
  if (!selectedStudent.value) return
  const success = await studentStore.removeStudent(selectedStudent.value.ra)
  if (success) {
    toast.success('Aluno excluído com sucesso!')
  } else {
    toast.error('Ocorreu um erro ao excluir o aluno.')
  }
  closeDeleteDialog()
}
</script>
