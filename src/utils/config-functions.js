import { user, role, notification } from "./../../vtfy.config";

const getIcon = (icon, plural = false) => {
    return typeof icon !== 'object' ? icon : (plural ? icon.plural : icon.normal);
};

const getLabel = (label, plural = false) => {
    return typeof label !== 'object' ? label : (plural ? label.plural : label.normal);
};

const userConfig = {
    levels: () => {
        return Object.entries(user.levels).map((l) => l[1].value);
    },
    levelLabel: (level, plural = false) => {
        return getLabel(user.levels[level].label, plural);
    },

    genders: () => {
        return Object.entries(user.genders).map((g) => g[1].value);
    },
    genderLabel: (gender, plural = false) => {
        return getLabel(user.genders[gender].label, plural);
    }
};

const roleConfig = {
    permissibles: () => {
        return Object.entries(role.permissibles).map((p) => { return [p[1].value] });
    },
    permissibleLabel: (permissible, plural = false) => {
        return getLabel(role.permissibles[permissible].label, plural);
    },

    actions: () => {
        return Object.entries(role.actions).map((a) => { return [a[1].value] });
    },
    actionLabel: (action) => {
        return getLabel(role.actions[action]?.label, false);
    }
};

const notificationConfig = {
    types: () => {
        return Object.entries(notification.types).map((l) => l[1].value);
    },
    typeIcon: (type, plural = false) => {
        return getIcon(notification.types[type].icon, plural);
    },
    typeLabel: (type, plural = false) => {
        return getLabel(notification.types[type].label, plural);
    }
};

export { userConfig, roleConfig, notificationConfig };