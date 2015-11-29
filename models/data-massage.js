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

    function getNetworks(data) {
        return getData('GET_NETWORKS', null, data);
    }

    function getSubnets(data) {
        return getData('GET_SUBNETS', null, data);
    }

    function getLimits(data) {
        return getData('GET_LIMITS', null, data);
    }

    function startVM(data) {
        return getData('START_VM', OPENSTACK_CONFIG.START_VM, data);
    }

    function stopVM(data) {
        return getData('START_VM', OPENSTACK_CONFIG.STOP_VM, data);
    }

    function deleteVM(data) {
        return getData('DELETE_SERVER', null, data);
    }

    function getServerDiagnostic(data) {
        return getData('SERVER_DIAGNOSTIC', null, data);
    }

    function createImage(data) {
        var imageData = OPENSTACK_CONFIG.NEW_IMAGE_1;
        imageData.name = data.imagename;
        return getData('CREATE_IMAGES', imageData, data);
    }

    function createServer(data, size) {
        var serverData = OPENSTACK_CONFIG.NEW_SERVER_SMALL;
        if (size === 'large') {
            serverData = OPENSTACK_CONFIG.NEW_SERVER_LARGE;
        }
        serverData.server.name = data.servername;
        //console.log(serverData);
        return getData('CREATE_SERVER', serverData, data);
    }

    /**
     * Generate REST url
     * @return {String} url
     */
    function getFinalURL(url, obj, data) {
        if (data) {
            return url.replace('{tenant_id}', data.tenant_id || '')
                      .replace('{server_id}', data.server_id || '')
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
        //console.log('Request obj=' + JSON.stringify(obj));
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
            var statusCode = parseInt(response.statusCode, 10);
            //console.log(body);
            if (!error && response && (statusCode >= 200 && statusCode < 300)) {
                return body;
            }
        } catch(ex) {
        }
        return {}; //return empty for failure case
    }

    /** Function interface for openstack API */
    return {
        getToken: getToken,
        getImages: getImages,
        getServers: getServers,
        getFlavors: getFlavors,
        getNetworks: getNetworks,
        getSubnets: getSubnets,
        getLimits: getLimits,
        getServerDiagnostic: getServerDiagnostic,
        startVM: startVM,
        stopVM: stopVM,
        deleteVM: deleteVM,
        createImage: createImage,
        createServer: createServer
    };
}());
