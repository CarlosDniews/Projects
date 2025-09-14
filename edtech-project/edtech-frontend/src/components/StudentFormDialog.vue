<template>
  <v-dialog :model-value="show" @update:model-value="close" persistent max-width="800px">
    <v-card>
      <v-toolbar color="white" flat>
        <v-toolbar-title class="text-grey-darken-3 font-weight-medium">
          {{ isEditing ? t('studentForm.editTitle') : t('studentForm.registerTitle') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-container>
            <v-row align="center" class="mb-2">
              <v-col cols="12" sm="2" class="text-sm-right">
                <label class="text-grey-darken-1 font-weight-medium">{{
                  t('studentForm.labels.name')
                }}</label>
              </v-col>
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  :placeholder="t('studentForm.placeholders.name')"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" class="mb-2">
              <v-col cols="12" sm="2" class="text-sm-right">
                <label class="text-grey-darken-1 font-weight-medium">{{
                  t('studentForm.labels.email')
                }}</label>
              </v-col>
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  :placeholder="t('studentForm.placeholders.email')"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" class="mb-2">
              <v-col cols="12" sm="2" class="text-sm-right">
                <label class="text-grey-darken-1 font-weight-medium">{{
                  t('studentForm.labels.ra')
                }}</label>
              </v-col>
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="ra.value.value"
                  :error-messages="ra.errorMessage.value"
                  :disabled="isEditing"
                  :placeholder="t('studentForm.placeholders.ra')"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" class="mb-2">
              <v-col cols="12" sm="2" class="text-sm-right">
                <label class="text-grey-darken-1 font-weight-medium">{{
                  t('studentForm.labels.cpf')
                }}</label>
              </v-col>
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="cpf.value.value"
                  :error-messages="cpf.errorMessage.value"
                  :disabled="isEditing"
                  :placeholder="t('studentForm.placeholders.cpf')"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4 bg-grey-lighten-4">
          <v-spacer></v-spacer>
          <v-btn text @click="close" class="me-2">{{ t('studentForm.buttons.cancel') }}</v-btn>
          <v-btn color="grey-darken-4" variant="flat" type="submit">{{
            t('studentForm.buttons.save')
          }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  show: Boolean,
  student: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:show', 'save'])
const isEditing = computed(() => !!props.student?.id)
const validationSchema = yup.object({
  name: yup
    .string()
    .required('The name is required')
    .min(3, 'The name must be at least 3 characters long'),
  email: yup.string().email('The email must be valid').required('The email is required'),
  ra: yup.string().required('The RA is required'),
  cpf: yup
    .string()
    .required('The CPF is required')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'The CPF must be in the format XXX.XXX.XXX-XX'),
})
const { handleSubmit, resetForm } = useForm({
  validationSchema,
})
const name = useField('name')
const email = useField('email')
const ra = useField('ra')
const cpf = useField('cpf')

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
