export function ProductConflictError() {
    return {
        name: 'ProductConflictError',
        message: 'Não pode haver mais de um produto com o mesmo nome.',
    };
}
