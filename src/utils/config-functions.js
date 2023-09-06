import { user } from "./../../vtfy.config";

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

export { userConfig };