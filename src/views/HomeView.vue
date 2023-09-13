<template>
  <div class="home" style="display: flex; justify-content: center; align-items: center">
    <Card style="width: 400px; margin: 0 auto;">
      <template #title> 
        <div>ДАТА!!!</div>
        !!ИМЯ!!
        <span v-if="!value">сегодня питается в школе ?</span>
        <span v-else :style="`color: ${color}`">{{value}}</span>
        <br> 
      </template>
      <template #subtitle> Выберите один из вариантов </template>
      <template #content>
        <form @submit="onSubmit" class="flex flex-column align-items-center gap-2">
          <label for="item" :class="['flex justify-content-center', { 'p-error': errorMessage }]"><b>Ежедневное решение</b></label>
          <SelectButton style="margin-top: 20px; margin-bottom: 40px;" id="item" v-model="value" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" :options="options" />
          <small style="display: block" id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
          <label style="margin-bottom: 15px; display: block;" for="item" :class="['flex justify-content-center', { 'p-error': errorMessage }]"><b>Постоянное решение </b>
            <br>(будет автоматически ежедневно указано, пока вы его не измените)</label>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; grid-gap: 10px">
            <div style="display: flex; grid-gap: 10px;">
              <RadioButton v-model="value" inputId="ingredient1" name="long-decision" value='Всегда питается' />
              <label for="ingredient1" >Всегда питается</label>
            </div>
            <div style="display: flex; grid-gap: 10px;">
              <RadioButton v-model="value" inputId="ingredient2" name="long-decision" value="Болеет" />
              <label for="ingredient2" >Болеет</label>
            </div>
            <div style="display: flex; grid-gap: 10px;">
              <RadioButton v-model="value" inputId="ingredient3" name="long-decision" value="Всегда не питается" />
              <label for="ingredient3">Всегда не питается</label>
            </div>
          </div>
          <Button type="submit" label="Отправить" style="margin-top: 40px;"/>
          <p style="text-decoration: underline;"><b>Чтобы изменения применились, не забудьте отправить решение</b></p>
          <p>Дата последней отправки ДДДМММГГГ</p>
        </form>
        <Toast />
      </template>
      
    </Card>
  </div>
</template>

<script setup lang="js">
import { computed, ref } from "vue";

import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField('value', validateField);
const toast = useToast();

const options = ref(['Питается', 'Не питается']);
const color = computed(() => {
  switch (value.value) {
    case 'Всегда питается': return 'green'
    case 'Питается': return 'green'
    case 'Всегда не питается': return 'red'
    case 'Не питается': return 'red'
    case 'Болеет': return 'blue'
  }
})
function validateField(value) {
  if (!value) {
    return 'Перед отправкой выберите решение';
  }

  return true;
}

const onSubmit = handleSubmit((values) => {
  if (values.value && values.value.length > 0) {
    toast.add({ severity: 'info', summary: 'Решение отправлено', detail: values.value, life: 3000 });
    resetForm();
  }
});
</script>
