import cookie from "@/plugins/cookie";
import { useAppStore } from "@/store/app";
import backendErrors from "./backend-errors";

const flash_alert_key = 'flash_alert';

const setAlert = (message, title, type, flash = false) => {
    const alert = {
        timer: 5000,
        title: title,
        text: message,
        type: type,
        uid: (new Date).getTime()
    };

    if (flash) {
        cookie.set(flash_alert_key, JSON.stringify(alert));
    } else {
        useAppStore().setAlert(alert);
    }
};

export const add = {
    success: (message, title = null, flash = false) => {
        return setAlert(message, title, 'success', flash);
    },
    info: (message, title = null, flash = false) => {
        return setAlert(message, title, 'info', flash);
    },
    warning: (message, title = null, flash = false) => {
        return setAlert(message, title, 'warning', flash);
    },
    danger: (message, title = null, flash = false) => {
        return setAlert(message, title, 'danger', flash);
    },
    error: (error, title = null, flash = false) => {
        return setAlert(backendErrors.get(error), title, 'error', flash);
    },
    missingData: (flash = false) => {
        return setAlert('Preencha todos os campos do formulário', 'Faltam dados obrigatórios', 'danger', flash);
    }
};

export const get = {
    /**
     * @returns {Boolean}
     */
    hasFlash: () => {
        return cookie.get(flash_alert_key) ? true : false;
    },

    /**
     * @returns {Object|null}
     */
    getFlash: () => {
        let alert = cookie.get(flash_alert_key);

        if (alert) {
            alert = JSON.parse(alert);
            cookie.remove(flash_alert_key);
            return alert;
        } else {
            return null;
        }
    }
};