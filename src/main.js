import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";

import Card from 'primevue/card';
import Button from "primevue/button"
import SelectButton from 'primevue/selectbutton';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import RadioButton from 'primevue/radiobutton';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue, {ripple: true});
app.use(ToastService);

app.component('Button', Button);
app.component('Card', Card);
app.component('SelectButton', SelectButton);
app.component('Toast', Toast);
app.component('RadioButton', RadioButton);


app.mount("#app");
