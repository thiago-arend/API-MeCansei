export function UserConflictError() {
    return {
        name: 'UserConflictError',
        message: 'Não pode haver mais de um usuário com o mesmo e-mail.',
    };
}
