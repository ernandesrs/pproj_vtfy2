<template>
    <v-card :color="props.color" variant="outlined">
        <v-card-item>
            <div class="d-flex flex-column flex-sm-row align-sm-center justify-sm-space-between">
                <v-icon :icon="props.icon" size="50" class="mr-md-4" />
                <div class="d-flex flex-column text-left text-md-right">
                    <h4 class="text-h6">{{ props.title }}</h4>
                    <div class="text-h4 text-md-h3"> {{ props.value }}</div>
                </div>
            </div>
        </v-card-item>
        <v-card-actions v-if="action?.to?.name">
            <v-btn :to="action?.to" :text="action?.text" append-icon="mdi-arrow-right" variant="plain" size="small"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>

const props = defineProps(['color', 'title', 'icon', 'value', 'action']);

</script>