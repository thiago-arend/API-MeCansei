export function wishlistConflict() {
    return {
        name: 'WishlistConflictError',
        message: 'Não pode haver mais de um produto com o mesmo nome.',
    };
}
