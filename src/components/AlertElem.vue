<template>
    <v-snackbar v-model="data.show" variant="text" :timeout="data.alert.timer" location="right top">
        <v-alert @click:close="method_close" :icon="computed_icon" :title="data.alert.title" :text="data.alert.text"
            :color="computed_color" closable close-label="Fechar" border variant="elevated" elevation="3"
            style="width: 100%; max-width: 400px;"></v-alert>
    </v-snackbar>
</template>

<script setup>

import { useAppStore } from '@/store/app';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

/**
 * 
 * Props
 * 
 */

/**
 * 
 * Vars, Refs ands Reactives
 * 
 */
const appStore = useAppStore();

const vueRoute = useRoute();

let data = ref({
    show: false,
    alert: {
        type: null,
        title: null,
        text: null,
        color: null,
        uid: null,
    }
});

/**
 * 
 * Computeds
 * 
 */
const computed_icon = computed(() => {
    const icons = {
        success: 'check-circle',
        info: 'information',
        warning: 'alert-circle',
        danger: 'alert-circle',
        error: 'alpha-x-circle',
        default: '',
    };
    return data.value.alert.type ? 'mdi-' + icons[data.value.alert.type] : null;
});

const computed_color = computed(() => {
    const colors = {
        success: 'green-lighten-1',
        info: 'light-blue-darken-1',
        warning: 'amber-lighten-1',
        danger: 'red-lighten-1',
        error: 'red-lighten-1',
        default: 'blue-grey-lighten-5'
    };
    return data.value.alert.type ? colors[data.value.alert.type] : colors['default'];
});

/**
 * 
 * Methods
 * 
 */
const method_show = () => {
    data.value.show = true;
};

const method_close = () => {
    data.value.show = false;
    data.value.alert.uid = null;
};

const method_getFlash = () => {
    if (appStore.hasFlashAlert()) {
        data.value.alert = appStore.getFlashAlert();
    }
}

/**
 * 
 * Watchers
 * 
 */
watch(() => appStore.getAlert, (nv, ov) => {
    if (nv.uid !== ov?.uid) {
        if (data.value.show) {
            method_close();

            setTimeout(() => {
                data.value.alert = nv;
            }, 250);
        } else {
            data.value.alert = nv;
        }
    }
});

watch(() => data.value.alert, (nv, ov) => {
    if (!nv?.text) {
        return;
    }

    if (nv.uid !== ov?.uid && !data.value.show) {
        method_show();
    }
});

watch(() => vueRoute.name, (nv, ov) => {
    if (nv != ov) {
        method_getFlash();
    }
});

/**
 * Created
 */
method_getFlash();

</script>
