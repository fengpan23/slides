exports.main = {
    pmc: function(req, res) {
        res.redirect('/pmc.html');
        // res.render('pmc.ejs');
    },
    signup: function(req, res) {
        res.redirect('/');
    }
};