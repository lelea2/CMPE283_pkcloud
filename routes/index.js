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
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(helper.minifyHTML(html));
    });
};

exports.dashboard = function(req, res, next) {
    var data = getAuthData(req);
    Q.all([
        dataSrc.getImages(data),
        dataSrc.getFlavors(data),
        dataSrc.getServers(data),
        dataSrc.getNetworks(data),
        dataSrc.getSubnets(data),
        dataSrc.getLimits(data)
    ]).then(function(result) {
        //console.log(result);
        var renderData = {
            'images': result[0].images,
            'flavors': result[1].flavors,
            'servers': result[2].servers,
            'networks': result[3].networks,
            'subnets': result[4].subnets,
            'limits': result[5].limits
        };
        //console.log(renderData);
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
exports.createImage = function(req, res, next) {
    res.status(200).send('OK');
};

exports.createServer = function(req, res, next) {
    res.status(200).send('OK');
};


/**
 * the followings are methods to handle ajax request
 */
exports.ajaxLogin = function(req, res, next) {
    res.render('signin', {}, function (err, html) {
        console.log("signin:"+JSON.stringify(req));
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(helper.minifyHTML(html));
    });
   /* var name = req.body.name,
        pwd = req.body.password;
    console.log("name:"+name);
    console.log("pwd:"+pwd);
    res.status(200).json("testing");*/
/*    dataSrc.logIn(name, pwd).then(function(result) {
        if (result && result.userId) {
            user.setUserCookie(req, result.userId);
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    }, function(err) {
        res.status(500).json(err);
    });*/

};
