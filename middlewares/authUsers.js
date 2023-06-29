const checkLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) next();
    else{
        res.redirect('/login');
    }
}

const checkAdmin = (req, res, next) => {
    if(req.user.isAdmin) next();
    else{
        res.redirect('back');
    }
}

const verifyUser = (req, res, next) => {
    if(req.user.isAdmin || req.user._id.equals(req.params.id)) next();
    else{
        res.redirect('/login');
    }
}

module.exports = {
    checkLoggedIn,
    checkAdmin,
    verifyUser
}