const messages = {
    // defaults
    default: 'Oops, parece que houve um erro desconhecido.',

    // all
    AppDemoException: 'Recurso desabilitado pois esta aplicação está em modo demonstração.',
    InvalidDataException: 'Um ou mais dados informados são inválidos.',
    NotFoundException: 'URL ou recurso não encontrado.',
    HasDependentsException: 'Este recurso possui um ou mais recursos dependentes.',

    // auth
    LoginFailException: 'E-mail e/ou senha inválido(s).',
    UnauthenticatedException: 'Você não está autenticado.',
    UnauthorizedException: 'Você não possui autorização.',
    UnauthorizedActionException: 'Você não possui autorização para esta ação.',
    UpdatePasswordTokenInvalidException: 'O token de atualização de senha é inválido.',
    VerificationTokenInvalidException: 'O token de verificação de conta é inválido, solicite um novo token.',
    LoginWithGoogleFailException: 'Falha na autorização do acesso a sua conta Google',
    SocialLoginEmailAlreadyRegisteredException: 'Email já registrado, faça login com email e senha.'
};

export default {
    get: (errorName) => {
        return messages[errorName] ?? messages['default'];
    }
};