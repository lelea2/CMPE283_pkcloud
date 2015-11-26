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

    function getImages(data) {
        //console.log(data);
        return getData('GET_IMAGES', null, data);
    }

    function getServers(data) {
        return getData('GET_SERVERS', null, data);
    }

    function getFlavors(data) {
        return getData('GET_FLAVORS', null, data);
    }

    /**
     * Generate REST url
     * @return {String} url
     */
    function getFinalURL(url, obj, data) {
        if (data && data.tenant_id) {
            return url.replace('{tenant_id}', data.tenant_id);
        } else {
            return url;
        }
    }

    //Helper function to get current partnerId (default walgreen)
    function generateReqBody(callname, obj, data) {
        var restcall = URL[callname],
            reqObj = obj || {},
            headers = {};
        if (!!data) {
            headers = {
                'Accept': 'application/json',
                'X-Auth-Token': data.token
            }
        } else {
            headers = {
                'Accept': 'application/json'
            };
        }
        return {
            url: getFinalURL(restcall.url, reqObj, data),
            method: restcall.method,
            headers: headers,
            json: reqObj || true,
            timeout: 20000
        }
    }

    //Helper function get data from REST
    function getData(calltype, reqObj, data) {
        var d = Q.defer(),
            obj = generateReqBody(calltype, reqObj, data);
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
        getToken: getToken,
        getImages: getImages,
        getServers: getServers,
        getFlavors: getFlavors
    };
}());
