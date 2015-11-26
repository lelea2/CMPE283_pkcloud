/** Helper function to iniate open stack authentication */

var Cookies = require('cookies'),
    dataMassage = require('../../models/data-massage'),
    cookieOption = {
        httpOnly: true,
        path: '/',
        overwrite: true
    };

module.exports = (function() {

    function authenticateOSClient() {
        return function (req, res, next) {
            console.log('Setting open stack authentication....');
            dataMassage.getToken(req).then(function(result) {
                try {
                    console.log(result);
                    var access = result.access.token;
                    var cookies = new Cookies(req, res);
                    cookies.set('token', access.id, cookieOption);
                    cookies.set('tenant_id', access.tenant.id);
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

