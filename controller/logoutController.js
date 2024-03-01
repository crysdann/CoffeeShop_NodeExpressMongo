const logoutController = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/index");
  });
};
module.exports = logoutController;
