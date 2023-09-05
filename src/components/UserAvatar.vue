<template>
    <template v-if="photo_url">
        <v-avatar :image="photo_url" :size="size" />
    </template>
    <template v-else>
        <div class="c-avatar rounded-circle d-flex justify-center align-center" :style="{
            'width': props.size + 'px',
            'height': props.size + 'px'
        }">
            <span class="font-weight-medium" :style="{
                'font-size': (props.size / 2.75) + 'px'
            }">{{ (props.username ? props.username[0] : 'U').toUpperCase() }}</span>
        </div>
    </template>
</template>

<script setup>

const props = defineProps({
    size: {
        type: [Number],
        default: 200
    },
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

<style>
.c-avatar{
    border: 2.5px solid #dedddd;
}
</style>
