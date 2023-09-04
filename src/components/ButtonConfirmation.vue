<template>
    <v-btn @click.stop="data.waitingConfirmation = !data.waitingConfirmation" :text="props.text" :color="props.color"
        :prepend-icon="props.text ? props.icon : null" :icon="props.text ? null : props.icon" :variant="props.variant"
        :loading="data.waitingConfirmation" v-bind="props?.size ? { size: props.size } : {}" />

    <dialog-confirmation v-model="data.waitingConfirmation" :title="props.dialogTitle" :text="props.dialogText"
        :color="props.color" :confirm-callback="props.confirmCallback" :cancel-callback="props.cancelCallback"
        :data-id="props.dataId" :data-index="props.dataIndex" />
</template>

<script setup>

import { ref } from 'vue';
import DialogConfirmation from './DialogConfirmation.vue';

const props = defineProps({
    dataId: {
        type: [Number, String],
        default: null
    },
    dataIndex: {
        type: [Number, String],
        default: null
    },
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

</script>