import httpStatus from "http-status";

export default function errorHandlingMiddleware(error, req, res, next) {
  if (error.name === "AuthFailureError") {
    return res.status(httpStatus.NOT_FOUND).send(error.message)
  }

  if (error.name === "UserConflictError") {
    return res.status(httpStatus.CONFLICT).send(error.message)
  }

  console.log(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
}