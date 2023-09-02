<template>
    <div :class="['mb-3', inline ? 'd-flex align-center' : '']">
        <p :class="['d-flex align-center text-subtitle-2 font-weight-regular', inline ? 'mr-2' : '']">
            <v-icon v-if="icon" :icon="icon" :class="title ? 'mr-2' : ''" />
            {{ componentProps.title }}
        </p>
        <v-tooltip v-if="componentProps.tooltip" :text="componentProps.tooltip" location="top">
            <template v-slot:activator="{ props }">
                <p class="font-weight-medium" v-bind="props">{{ componentProps.text }}</p>
            </template>
        </v-tooltip>
        <p v-else class="font-weight-medium">{{ componentProps.text }}</p>
    </div>
</template>

<script setup>

const componentProps = defineProps({
    icon: {
        type: [String, null],
        default: null
    },
    tooltip: {
        type: [String, null],
        default: null
    },
    title: {
        type: [String, null],
        default: null
    },
    text: {
        type: [String, null],
        default: null,
        required: true
    },
    inline: {
        type: [Boolean],
        default: false
    }
});

</script>
