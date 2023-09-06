/**
 * 
 * Este é um arquivo de configurações
 * 
 */

/**
 * 
 * Necessário adicionar manualmente novos 'níveis' ou 'gêneros' sempre que um novo for adicionado na api, ver lista aqui:
 * https://documenter.getpostman.com/view/15369452/2s935oL4Dv (Na documentação da pasta \Admin\User)
 * 
 */
const user = {
    levels: {
        0: {
            label: {
                normal: 'Comum',
                plural: 'Comuns'
            },
            value: 0
        },
        8: {
            label: {
                normal: 'Administrador',
                plural: 'Administradores'
            },
            value: 8
        },
        9: {
            label: {
                normal: 'Super usuário',
                plural: 'Super usuários'
            },
            value: 9
        }
    },
    genders: {
        'n': {
            label: {
                normal: 'Não definir',
                plural: 'Não definir'
            },
            value: 'n'
        },
        'm': {
            label: {
                normal: 'Masculino',
                plural: 'Masculinos'
            },
            value: 'm'
        },
        'f': {
            label: {
                normal: 'Feminino',
                plural: 'Femininos'
            },
            value: 'f'
        }
    }
};

/**
 * 
 * Necessário adicionar manualmente novas 'funções' e 'actions' sempre que um novo for adicionado na api, ver lista aqui:
 * https://documenter.getpostman.com/view/15369452/2s935oL4Dv (Na documentação da pasta \Admin\Role)
 * 
 */
const role = {
    permissibles: {
        App_Models_User: {
            label: {
                normal: "Usuário",
                plural: "Usuários"
            },
            value: "App_Models_User",
        },
        App_Models_Role: {
            label: {
                normal: "Função",
                plural: "Funções"
            },
            value: "App_Models_Role",
        },
    },
    actions: {
        viewAny: {
            label: "Ver todos",
            value: "viewAny"
        },
        view: {
            label: "Ver um",
            value: "view"
        },
        create: {
            label: "Criar",
            value: "create"
        },
        update: {
            label: "Atualizar",
            value: "update"
        },
        delete: {
            label: "Excluir",
            value: "delete"
        },
        forceDelete: {
            label: "Força exclusão",
            value: "forceDelete"
        },
        restore: {
            label: "Recuperar",
            value: "restore"
        },
        promote: {
            label: "Promover",
            value: "promote"
        },
        demote: {
            label: "Rebaixar",
            value: "demote"
        }
    }
};

/**
 * 
 * Necessário adicionar manualmente novos 'tipos' sempre que um novo for adicionado na api, ver lista aqui:
 * https://documenter.getpostman.com/view/15369452/2s935oL4Dv (Na documentação da pasta \Admin\Notification)
 * 
 */
const notification = {
    types: {
        'App_Notifications_UserRegisteredNotification': {
            icon: {
                normal: 'mdi-account-plus-outline',
                plural: 'mdi-account-multiple-plus-outline'
            },
            label: {
                normal: 'Usuário registrado',
                plural: 'Usuários registados'
            },
            value: 'App_Notifications_UserRegisteredNotification'
        }
    }
};

export { user, role, notification };