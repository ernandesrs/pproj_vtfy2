<template>
    <v-sheet>
        <v-card :elevation="props.borderless ? 0 : 1" class="px-6 py-6" :border="!props.borderless">
            <v-card-title class="font-weight-normal">
                {{ title }}
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
        type: [String],
        default: null
    }
});

</script>
