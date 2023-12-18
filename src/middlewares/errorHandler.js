import httpStatus from "http-status";

export default function errorHandlingMiddleware(error, req, res, next) {
  if (error.name === "AuthFailureError") {
    return res.status(httpStatus.NOT_FOUND).send(error.message)
  }

  if (error.name === "UserConflictError") {
    return res.status(httpStatus.CONFLICT).send(error.message)
  }

  if (error.name === "ProductConflictError") {
    return res.status(httpStatus.CONFLICT).send(error.message)
  }

  if (error.name === "ProductNotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send(error.message)
  }

  if (error.name === "ProductDeletionPermissionError" || error.name === "ProductUpdatePermissionError") {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message)
  }

  if (error.name === "ProductDoesNotBelongToWishlistError") {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message)
  }

  if (error.name === "WishlistAlreadyExistsError") {
    return res.status(httpStatus.CONFLICT).send(error.message)
  }

  if (error.name === "WishlistConflictError") {
    return res.status(httpStatus.CONFLICT).send(error.message)
  }

  if (error.name === "WishlistNotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send(error.message)
  }

  console.log(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
}