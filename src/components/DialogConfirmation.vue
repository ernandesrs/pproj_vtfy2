<template>
    <v-dialog v-model="data.waitingConfirmation" width="auto" persistent>
        <v-card style="width: 100%; max-width: 375px;">
            <v-card-title v-if="props.title" :class="['px-6 pt-5', 'text-' + props.color]">
                {{ props.title }}
            </v-card-title>
            <v-card-text :class="['py-3', 'text-' + props.color]">
                {{ props.text }}
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-space-between px-6 pt-2 pb-6">
                <v-btn @click.stop="method_cancel" text="Cancelar" color="grey-darken-1"
                    prepend-icon="mdi-close-circle-outline" variant="plain" class="mr-3 px-4"
                    :loading="data.waitingCancelCallback" />
                <v-btn @click.stop="method_confirm" text="Confirmar" :color="props.color"
                    prepend-icon="mdi-check-circle-outline" variant="outlined" class="ml-3 px-4"
                    :loading="data.waitingConfirmationCallback" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

import { watch, ref } from 'vue';

/**
 * 
 * Props
 * 
 */
const props = defineProps({
    modelValue: {
        type: [Boolean],
        default: false
    },
    dataId: {
        type: [Number, String],
        default: null
    },
    dataIndex: {
        type: [Number, String],
        default: null
    },
    color: {
        type: [String, null],
        default: 'primary'
    },
    title: {
        type: [String, null],
        default: null,
        required: true
    },
    text: {
        type: [String, null],
        default: null,
        required: true
    },
    cancelCallback: {
        type: [Function, null],
        default: null
    },
    confirmCallback: {
        type: [Function, null],
        default: null
    }
});

/**
 * 
 * Emits
 * 
 */
const emits = defineEmits({
    'update:modelValue': null
});

/**
 * 
 * Vars
 * 
 */
const data = ref({
    waitingConfirmation: false,
    waitingConfirmationCallback: false,
    waitingCancelCallback: false
});

/**
 * 
 * Methods
 * 
 */
const method_cancel = () => {
    if (!props.cancelCallback) {
        data.value.waitingConfirmation = false
        return;
    }

    data.value.waitingCancelCallback = true;
    try {
        props.cancelCallback().finally(() => {
            data.value.waitingConfirmation = false;
            data.value.waitingCancelCallback = false;
        });
    } catch {
        data.value.waitingConfirmation = false;
        data.value.waitingCancelCallback = false;
    }
};

const method_confirm = () => {
    if (!props.confirmCallback) {
        data.value.waitingConfirmation = false;
        return;
    }

    data.value.waitingConfirmationCallback = true;
    try {
        props.confirmCallback({
            id: props.dataId,
            index: props.dataIndex
        }).finally(() => {
            data.value.waitingConfirmation = false;
            data.value.waitingConfirmationCallback = false;
        });
    } catch {
        data.value.waitingConfirmation = false;
        data.value.waitingConfirmationCallback = false;
    }
};

/**
 * 
 * Watchers
 * 
 */
watch(() => data.value.waitingConfirmation, (nv) => {
    emits('update:modelValue', nv);
});

watch(() => props.modelValue, (nv) => {
    data.value.waitingConfirmation = nv;
}, { deep: true, immediate: true });

</script>
