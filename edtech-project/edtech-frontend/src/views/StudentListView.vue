<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      {{ t('studentList.title') }}
      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        :label="t('studentList.searchPlaceholder', 'Search Students...')"
        variant="outlined"
        flat
        hide-details
        single-line
        class="me-4"
        style="max-width: 350px"
      ></v-text-field>

      <v-btn prepend-icon="mdi-plus" color="primary" variant="flat" @click="openCreateDialog">
        {{ t('studentList.registerStudent') }}
      </v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="filteredStudents"
      :loading="loading"
      :loading-text="t('studentList.loading')"
      :no-data-text="t('studentList.noData')"
      hover
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="openEditDialog(item)"> mdi-pencil </v-icon>
        <v-icon size="small" color="error" @click="openDeleteDialog(item)"> mdi-delete </v-icon>
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
    :title="t('confirmationDialog.title')"
    :message="t('confirmationDialog.message', { name: selectedStudent?.name })"
    @confirm="handleDeleteConfirm"
    @cancel="closeDeleteDialog"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import StudentFormDialog from '@/components/StudentFormDialog.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import api from '@/services/apiService'

const { t } = useI18n()
const toast = useToast()

const students = ref([])
const loading = ref(false)
const selectedStudent = ref(null)

const searchQuery = ref('')

const filteredStudents = computed(() => {
  if (!searchQuery.value) {
    return students.value
  }

  const lowerCaseQuery = searchQuery.value.toLowerCase()

  return students.value.filter((student) => {
    const inName = student.name.toLowerCase().includes(lowerCaseQuery)
    const inRa = student.ra.toLowerCase().includes(lowerCaseQuery)
    const inCpf = student.cpf.includes(lowerCaseQuery)

    return inName || inRa || inCpf
  })
})

const isFormDialogVisible = ref(false)
const isDeleteDialogVisible = ref(false)

const headers = computed(() => [
  { title: t('studentList.headers.ra'), key: 'ra', align: 'start' },
  { title: t('studentList.headers.name'), key: 'name' },
  { title: t('studentList.headers.email'), key: 'email' },
  { title: t('studentList.headers.cpf'), key: 'cpf' },
  { title: t('studentList.headers.actions'), key: 'actions', sortable: false, align: 'end' },
])

async function fetchStudents() {
  loading.value = true
  try {
    const response = await api.getAllStudents()
    students.value = response.data
  } catch (error) {
    toast.error('Failed to load students.')
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStudents()
})

async function handleSaveStudent(studentFormData) {
  try {
    console.log('Saving student:', selectedStudent, studentFormData)
    if (selectedStudent.value?.id) {
      await api.updateStudent(selectedStudent.value.id, studentFormData)
      toast.success('Student updated successfully!')
    } else {
      await api.createStudent(studentFormData)
      toast.success('Student registered successfully!')
    }
    isFormDialogVisible.value = false
    selectedStudent.value = null
    await fetchStudents()
  } catch (error) {
    toast.error('An error occurred. Please check the data and try again.')
    console.error(error)
  }
}

async function handleDeleteConfirm() {
  if (!selectedStudent.value?.id) return
  try {
    await api.deleteStudent(selectedStudent.value.id)
    toast.success('Student deleted successfully!')
    await fetchStudents()
  } catch (error) {
    toast.error('An error occurred while deleting the student.')
    console.error(error)
  } finally {
    closeDeleteDialog()
  }
}

function openCreateDialog() {
  selectedStudent.value = null
  isFormDialogVisible.value = true
}
function openEditDialog(student) {
  selectedStudent.value = { ...student }
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
</script>
