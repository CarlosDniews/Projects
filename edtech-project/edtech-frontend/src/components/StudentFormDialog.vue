<template>
  <v-dialog :model-value="show" @update:model-value="close" persistent max-width="600px">
    <v-card>
      <v-form @submit.prevent="submit">
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Editar Aluno' : 'Cadastrar Novo Aluno' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  label="Nome Completo*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  label="Email*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="ra.value.value"
                  :error-messages="ra.errorMessage.value"
                  :disabled="isEditing"
                  label="RA (Registro Acadêmico)*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cpf.value.value"
                  :error-messages="cpf.errorMessage.value"
                  :disabled="isEditing"
                  label="CPF*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="tonal" type="submit">Salvar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  show: Boolean,
  student: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:show', 'save'])

const isEditing = computed(() => !!props.student?.ra)

// Esquema de validação com Yup
const validationSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: yup.string().email('O email deve ser válido').required('O email é obrigatório'),
  ra: yup.string().required('O RA é obrigatório'),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .length(14, 'O CPF deve ter o formato XXX.XXX.XXX-XX'),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema,
})

const name = useField('name')
const email = useField('email')
const ra = useField('ra')
const cpf = useField('cpf')

// Observa mudanças na prop 'student' para preencher ou limpar o formulário
watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      resetForm({ values: newStudent })
    } else {
      resetForm()
    }
  },
)

const submit = handleSubmit((values) => {
  emit('save', values)
})

function close() {
  emit('update:show', false)
}
</script>
