/**
 * Helper module handle data massaging
 */

var request = require('request'),
    Q = require('q'),
    URL = require('./URL');

module.exports = (function() {

    /**
     * Generate REST url
     * @return {String} url
     */
    function getFinalURL(url, obj) {
        var reqObj = obj || {};
        return url.replace('{tenant_id}',
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
            json: reqObj.reqBody || true,
            timeout: 5000
        }
    }

    //Helper function get data from REST
    function getData(calltype, reqObj) {
        var d = Q.defer(),
            obj = generateReqBody(calltype, reqObj);
        console.log('Request obj=' + JSON.stringify(obj));
        request(obj, function(error, response, body) {
        });
        return d.promise;
    }

    return {

    };
}());
