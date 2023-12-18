export function wishlistAlreadyExists() {
    return {
        name: 'WishlistAlreadyExistsError',
        message: 'O produto não pôde ser adicionado na wishlist porque ele foi inserido por você!',
    };
}
