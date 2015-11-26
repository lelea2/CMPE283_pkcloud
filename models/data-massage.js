/**
 * Helper module handle data massaging
 */

var request = require('request'),
    Q = require('q'),
    OPENSTACK_CONFIG = require('./config/openstack'),
    URL = require('./config/api');

//console.log(OPENSTACK_CONFIG);
module.exports = (function() {

    function getToken(req) {
        return getData('GET_TOKEN', OPENSTACK_CONFIG.AUTHENTICATION);
    }

    /**
     * Generate REST url
     * @return {String} url
     */
    function getFinalURL(url, obj) {
        var reqObj = obj || {};
        return url.replace('{tenant_id}');
    }

    //Helper function to get current partnerId (default walgreen)
    function generateReqBody(callname, obj) {
        var restcall = URL[callname],
            reqObj = obj || {};
        return {
            url: getFinalURL(restcall.url, reqObj),
            method: restcall.method,
            headers: {
                'Accept': 'application/json'
            },
            json: reqObj || true,
            timeout: 5000
        }
    }

    //Helper function get data from REST
    function getData(calltype, reqObj) {
        var d = Q.defer(),
            obj = generateReqBody(calltype, reqObj);
        console.log('Request obj=' + JSON.stringify(obj));
        request(obj, function(error, response, body) {
            var result = getReturnObj(error, response, body);
            d.resolve(result);
        });
        return d.promise;
    }

    /**
     * Helper function checking for successful response
     * @method isSuccessfulRESTCall
     */
    function getReturnObj(error, response, body) {
        try {
            //console.log(response.statusCode);
            console.log(error);
            if (!error && response && (response.statusCode === 200 || response.statusCode === 201)) {
                return body;
            }
        } catch(ex) { /* istanbul ignore next */
            console.log(ex);
        }
        return {}; //return empty for failure case
    }

    return {
        getToken: getToken
    };
}());
