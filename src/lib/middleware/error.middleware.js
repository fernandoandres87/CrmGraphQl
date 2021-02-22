const { error } = require('consola')

exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  let statusCode;
  if (err.status) {
    statusCode = err.status;
  } else {
    statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  }
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

exports.errorGeneric = (err) => {
  let { message } = err;
  error({
      badge:true,
      message: `Error: ${message}`
  })
};
