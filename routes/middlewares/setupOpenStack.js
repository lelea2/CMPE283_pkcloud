/** Helper function to iniate open stack authentication */

var Cookies = require('cookies'),
    user = require('../util/user');
    dataMassage = require('../../models/data-massage'),
    cookieOption = {
        httpOnly: true,
        path: '/',
        overwrite: true,
        expires: 0
    };

module.exports = (function() {

    function authenticateOSClient() {
        return function (req, res, next) {
            var uid = user.getUserId(req);
            if(uid == "" ||uid == {} || uid == null) {
                res.redirect(302, '/signin');
            }
            console.log('Setting open stack authentication....');
            var res = dataMassage.getToken(req).then(function(result) {
                try {
                    var access = result.access || {};
                    //console.log(access);
                    var token = access.token || {};
                    //console.log(token.id);
                    //var cookies = new Cookies(req, res);
                    //cookies.set('token', token.id, cookieOption);
                    //cookies.set('tenant_id', token.tenant.id, cookieOption);
                    req.body = req.body || {};
                    req.body.openStack = token;
                    console.log('done settings....');
                } catch(ex) {
                    console.log(ex);
                }
                next();
            });

        };
    }

    /** Return interecept interface method **/
    return {
        authenticateOSClient: authenticateOSClient
    };

}());

