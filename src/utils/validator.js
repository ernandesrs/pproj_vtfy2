// const emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const emailReg = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
const genders = ['m', 'n', 'f'];

export default {
    required: value => {
        return value && value.length > 0 ? true : 'Obrigatório'
    },
    email: value => {
        return emailReg.test(value) ? true : 'E-mail inválido';
    },
    gender: value => {
        return genders.includes(value) ? true : 'Escolha opção válida';
    },
    first_name: value => {
        return value.length > 1 ? true : 'Mínimo 2 caracteres'
    },
    last_name: value => {
        return value.length > 1 ? true : 'Mínimo 2 caracteres'
    },
    password: value => {
        return value.length >= 6 ? true : 'Mínimo 6 caracteres'
    },
    images: value => {
        const mimes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
        ]
        const image = value ? value[0] ?? null : null;

        if (!image) {
            return true;
        }

        return mimes.includes(image.type) ? true : 'Tipo de imagem não aceita';
    }
};