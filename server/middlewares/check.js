function check(req, res, next) {
  const userID = req.session?.user?.id;
  if (userID) {
    return next();
  }
  return res.redirect('/');
}

module.exports = { check };
