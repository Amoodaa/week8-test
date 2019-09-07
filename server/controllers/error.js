exports.client = (req, res) => {
  const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';

  res.set('Content-Length', notFoundPage.length);
  res.status(404).send(notFoundPage);
};

exports.server = (err, req, res, next) => {
  console.log('err:', err);
  const internalServerError = '<p style="font-size: 10vh; text-align: center;">500!</p>';

  res.set('Content-Length', internalServerError.length);
  res.status(500).send(internalServerError);
};
