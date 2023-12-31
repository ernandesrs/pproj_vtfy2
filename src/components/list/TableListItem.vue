<template>
    <tr>
        <!-- columns -->
        <template v-if="props.columns.length">
            <td v-for="column in props.columns" :key="column" v-html="column.value"></td>
        </template>
        <template v-else>
            <slot name="columns" />
        </template>
        <!-- /columns -->

        <!-- actions -->
        <td class="py-4 text-right">
            <v-btn-group variant="text">
                <v-btn v-if="computed_hasShow && props.showAction?.show" @click.stop="method_show" icon="mdi-eye-outline"
                    color="info" size="small" />

                <v-btn v-if="computed_hasEdit && props.editAction?.show" @click.stop="method_edit"
                    icon="mdi-pencil-box-outline" color="primary" size="small" />

                <button-confirmation v-if="computed_hasDelete && props.deleteConfirmAction?.show"
                    icon="mdi-trash-can-outline" color="danger" :dialog-title="props.deleteConfirmAction?.dialogTitle"
                    :dialog-text="props.deleteConfirmAction?.dialogText" size="small"
                    :confirm-callback="method_deleteConfirmed" :cancel-callback="method_deleteCanceled"
                    :data-id="props.dataId" :data-index="props.dataIndex" />
            </v-btn-group>
        </td>
        <!-- /actions -->
    </tr>
</template>

<script setup>

import ButtonConfirmation from '../ButtonConfirmation.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

/**
 * 
 * Props
 * 
 */

const props = defineProps({
    dataId: {
        type: [String, Number, null],
        default: null,
        required: true
    },
    dataIndex: {
        type: [String, Number, null],
        default: null,
        required: true
    },
    columns: {
        type: [Array],
        default: Array.from([])
    },
    showAction: {
        type: [Object, null],
        default: Object.create({
            show: false,
            to: null,
            callback: null
        })
    },
    editAction: {
        type: [Object, null],
        default: Object.create({
            show: false,
            to: null,
            callback: null
        })
    },
    deleteConfirmAction: {
        type: [Object, null],
        default: Object.create({
            show: false,
            to: null,
            callback: null,
            dialogTitle: 'Tem certeza?',
            dialogText: 'Confirme a exclusão deste item da lista.'
        })
    },
    deleteCancelAction: {
        type: [Object, null],
        default: Object.create({
            to: null,
            callback: null
        })
    },
});

/**
 * 
 * Consts, Vars, Refs and Reactives
 * 
 */

const router = useRouter();

/**
 * 
 * Computeds
 * 
 */
const computed_hasShow = computed(() => {
    return props.showAction?.to || props.showAction?.callback;
});

const computed_hasEdit = computed(() => {
    return props.editAction?.to || props.editAction?.callback;
});

const computed_hasDelete = computed(() => {
    return props.deleteConfirmAction?.to || props.deleteConfirmAction?.callback;
});

/**
 * 
 * Methods
 * 
 */

const method_show = () => {
    method_callAction(props.showAction);
};

const method_edit = () => {
    return method_callAction(props.editAction);
};

const method_deleteConfirmed = () => {
    return method_callAction(props.deleteConfirmAction);
};

const method_deleteCanceled = () => {
    return method_callAction(props.deleteCancelAction);
};

const method_callAction = (action) => {
    if (action?.to) {
        router.push(action.to);
    } else if (action?.callback) {
        try {
            return action.callback({
                id: props.dataId,
                index: props.dataIndex
            });
        } catch {
            // 
        }
    }
};

</script>
