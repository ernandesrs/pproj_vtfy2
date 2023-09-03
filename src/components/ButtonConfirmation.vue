<template>
    <v-btn @click.stop="data.waitingConfirmation = !data.waitingConfirmation" :text="props.text" :color="props.color"
        :prepend-icon="props.text ? props.icon : null" :icon="props.text ? null : props.icon" :variant="props.variant"
        :loading="data.waitingConfirmation" v-bind="props?.size ? { size: props.size } : {}" />

    <v-dialog v-model="data.waitingConfirmation" width="auto">
        <v-card style="width: 100%; max-width: 375px;">
            <v-card-title v-if="props.dialogTitle" :class="['px-6 pt-5', 'text-' + props.color]">
                {{ props.dialogTitle }}
            </v-card-title>
            <v-card-text :class="['py-3', 'text-' + props.color]">
                {{ props.dialogText }}
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

import { ref } from 'vue';

const props = defineProps({
    text: {
        type: [String, null],
        default: null
    },
    color: {
        type: [String, null],
        default: 'primary'
    },
    icon: {
        type: [String, null],
        default: null
    },
    variant: {
        type: [String],
        default: null
    },
    size: {
        type: String,
        default: null
    },
    dialogTitle: {
        type: [String, null],
        default: null,
        required: true
    },
    dialogText: {
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

const data = ref({
    waitingConfirmation: false,
    waitingConfirmationCallback: false,
    waitingCancelCallback: false
});

const method_cancel = () => {
    if (!props.cancelCallback) {
        data.value.waitingConfirmation = !data.value.waitingConfirmation
        return;
    }

    data.value.waitingCancelCallback = true;
    try {
        props.cancelCallback().finally(() => {
            data.value.waitingConfirmation = !data.value.waitingConfirmation;
            data.value.waitingCancelCallback = false;
        });
    } catch {
        data.value.waitingConfirmation = !data.value.waitingConfirmation;
        data.value.waitingCancelCallback = false;
    }
};

const method_confirm = () => {
    if (!props.confirmCallback) {
        data.value.waitingConfirmation = !data.value.waitingConfirmation;
        return;
    }

    data.value.waitingConfirmationCallback = true;
    try {
        props.confirmCallback().finally(() => {
            data.value.waitingConfirmation = !data.value.waitingConfirmation;
            data.value.waitingConfirmationCallback = false;
        });
    } catch {
        data.value.waitingConfirmation = !data.value.waitingConfirmation;
        data.value.waitingConfirmationCallback = false;
    }
};

</script>