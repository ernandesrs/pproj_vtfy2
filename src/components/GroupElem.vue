<template>
    <v-sheet>
        <div v-if="props.title" class="mb-4">
            <h4 :class="['text-h7', !props.description ? 'mb-6' : 'mb2']">{{ props.title }}</h4>
            <p class="text-subtitle-2 font-weight-regular">{{ props.description }}</p>
        </div>

        <slot name="content" />
    </v-sheet>
</template>

<script setup>

const props = defineProps({
    title: {},
    description: {}
});

</script>
