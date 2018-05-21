const gateway = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('passed gateway')
    next()
  } else {
    console.log('blocked by gateway')
    res.redirect('/');
  }
}

export default gateway;