<template>
    <div class="border rounded-circle user-avatar">
        <template v-if="photo_url">
            <v-img :src="photo_url" cover />
        </template>
        <template v-else>
            <span class="text-h2 font-weight-medium">{{ props.username[0].toUpperCase() }}</span>
        </template>
    </div>
</template>

<script setup>

const props = defineProps({
    photo_url: {
        type: [String, null],
        default: null
    },
    username: {
        type: [String, null],
        default: 'user'
    }
});

</script>

<style scoped>
.user-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 175px;
    min-width: 175px;
    min-height: 175px;
    border-width: 5px !important;
}

@media(min-width: 600px) {
    .user-avatar {
        max-width: 225px;
        min-height: 225px;
    }
}

@media(min-width: 800px) {
    .user-avatar {
        max-width: 250px;
        min-height: 250px;
    }
}
</style>