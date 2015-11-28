/**
 * Handle routing for apps
 */

var dataSrc = require('../models/data-massage'),
    //openStackClient = require('../models/manage-client');
    helper = require('../models/util/helper'),
    Q = require('q');

//console.log(helper);
/************************************************************************/
/**                            Handle Routing                          **/
/************************************************************************/

/**
 * Helper function to generate auth data
 */
function getAuthData(req) {
    //console.log(req.body.openStack);
    var auth = req.body.openStack;
    var data = {
        'token': auth.id,
        'tenant_id': auth.tenant.id
    };
    //console.log(data);
    return data;
}

/**
 * Display /sigin page
 */
exports.signin = function(req, res, next) {
    res.render('signin', {}, function (err, html) {
        console.log("signin:"+JSON.stringify(req));
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(helper.minifyHTML(html));
    });
};

exports.dashboard = function(req, res, next) {
<<<<<<< HEAD
    //console.log(req.body.openStack);
    console.log("req:"+req);
    var auth = req.body.openStack;
    var data = {
        'token': auth.id,
        'tenant_id': auth.tenant.id
    };
    //console.log(data);
=======
    var data = getAuthData(req);
>>>>>>> 8100af61ca25102a84dd1c4202b7452a49f7f56c
    Q.all([
        dataSrc.getImages(data),
        dataSrc.getFlavors(data),
        dataSrc.getServers(data),
        dataSrc.getNetworks(data),
        dataSrc.getLimits(data)
    ]).then(function(result) {
        //console.log(result);
        var renderData = {
            'images': result[0].images,
            'flavors': result[1].flavors,
            'servers': result[2].servers,
            'networks': result[3].networks,
            'limits': result[4].limits
        };
        //console.log(renderData);
        //console.log(JSON.stringify(renderData));
        res.render('dashboard', renderData, function (err, html) {
            if (err) { return next(err); }
            res.send(helper.minifyHTML(html));
        });
    });
};

exports.instances = function(req, res, next) {
    res.render('createInstance');
};

/** The followings are method to create images, server, DB instances... */
exports.createImages = function(req, res, next) {

};

exports.createServers = function(req, res, next) {

};
