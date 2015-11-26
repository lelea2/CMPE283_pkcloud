/**
 * Handle routing for apps
 */

var dataSrc = require('../models/data-massage'),
    helper = require('../models/util/helper'),
    Q = require('q');

//console.log(helper);
/************************************************************************/
/**                            Handle Routing                          **/
/************************************************************************/

/**
 * Display /sigin page
 */
exports.signin = function(req, res, next) {
    res.render('signin', {}, function (err, html) {
        if (err) { console.log(err); return next(err); }
        res.send(helper.minifyHTML(html));
    });
};

exports.dashboard = function(req, res, next) {
    //console.log(req.body.openStack);
    var auth = req.body.openStack;
    var data = {
        'token': auth.id,
        'tenant_id': auth.tenant.id
    };
    //console.log(data);
    Q.all([
        dataSrc.getImages(data),
        dataSrc.getFlavors(data),
        dataSrc.getServers(data)
    ]).then(function(result) {
        console.log(result);
        res.render(index);
    });
};
