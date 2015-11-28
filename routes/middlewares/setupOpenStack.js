/** Helper function to iniate open stack authentication */

var Cookies = require('cookies'),
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
            console.log('Setting open stack authentication....');
            var res = dataMassage.getToken(req).then(function(result) {
                try {
                    //console.log(result);
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
                    if(true){

                    }
                    //res.redirect(302, '/dashboard');
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

