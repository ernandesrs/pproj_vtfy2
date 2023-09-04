<template>
    <v-table hover>
        <thead>
            <tr>
                <th v-for="col in theads" :key="col">{{ col.label }}</th>
                <th class="py-4 text-right">Ações</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="item, itemIndex in props.items" :key="itemIndex">
                <slot :index="itemIndex" :item="item" />
            </template>
        </tbody>
    </v-table>
</template>

<script setup>

const props = defineProps({
    theads: {
        type: Array,
        default: Array
    },
    items: {
        type: Array,
        default: Array
    },
    resource: {
        type: [String, null],
        default: null
    }
});

</script>
