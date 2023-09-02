<template>
    <v-sheet class="mb-6">
        <v-card :elevation="props.borderless ? 0 : 1" class="px-6 py-6" :border="!props.borderless">
            <v-card-title v-if="title" class="font-weight-normal">
                <v-icon v-if="icon" :icon="icon" class="mr-2" /> {{ title }}
            </v-card-title>
            <v-card-item>
                <slot name="content" />
            </v-card-item>
        </v-card>
    </v-sheet>
</template>

<script setup>

const props = defineProps({
    borderless: {
        type: [Boolean],
        default: false
    },
    title: {
        type: [String, null],
        default: null
    },
    icon: {
        type: [String, null],
        default: null
    }
});

</script>
