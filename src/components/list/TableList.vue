<template>
    <div v-if="reloadingList" class="bkdrop bkdrop-light">
        <v-progress-circular indeterminate color="primary" size="45" />
    </div>

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

    <v-pagination v-if="(pages.length - 2) > 0" v-model="cPage" :length="(pages.length - 2)" total-visible="4"
        class="mt-6" />
</template>

<script setup>

import { watch, ref } from 'vue';

/**
 * 
 * Props
 * 
 */

const props = defineProps({
    theads: {
        type: Array,
        default: Array
    },
    items: {
        type: Array,
        default: Array
    },
    pages: {
        type: [Array, null],
        default: new Array
    },
    resource: {
        type: [String, null],
        default: null
    },
    changePageCallback: {
        type: Function,
        default: null
    }
});

/**
 * 
 * Consts, vars, refs
 * 
 */
const cPage = ref(1);

const reloadingList = ref(false);

/**
 * 
 * Methods
 * 
 */
const method_pageChange = (page) => {
    reloadingList.value = true;
    try {
        props.changePageCallback(page).finally(() => {
            reloadingList.value = false;
        });
    } catch {
        reloadingList.value = false;
    }
}

/**
 * 
 * Watchers
 * 
 */
watch(cPage, (nv) => {
    method_pageChange(nv);
});

</script>

<style scoped>
.bkdrop {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 999;
}

.bkdrop-light {
    background-color: rgba(208, 207, 207, 0.25);
}

.bkdrop-dark {
    background-color: rgba(79, 79, 79, 0.25);
}
</style>