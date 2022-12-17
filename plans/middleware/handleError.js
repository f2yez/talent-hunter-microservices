const handleError = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const handleError = res.statusCode < 500;
  res.status(statusCode);
  res.json({
    message: handleError ? err.message : "someThis error",
  });
};

module.exports = { handleError };
