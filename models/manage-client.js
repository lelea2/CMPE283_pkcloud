/** Helper dealing with open stack through pkgcloud **/

var pkgcloud = require('pkgcloud'),
    PKGCLOUD_CONFIG = require('./config/openstack').PKGCLOUD_CLIENT;


/*var client = pkgcloud.compute.createClient({
    provider: 'openstack', // required
    username: PKGCLOUD_CONFIG.username,
    password: PKGCLOUD_CONFIG.password,
    authUrl: PKGCLOUD_CONFIG.url
});*/


var client = pkgcloud.database.createClient({
    provider: 'rackspace', // required
    username: PKGCLOUD_CONFIG.username,
    password: PKGCLOUD_CONFIG.password,
    authUrl: PKGCLOUD_CONFIG.url,
    region: PKGCLOUD_CONFIG.region
});

client.getFlavor(1, function(err, flavor) {
    console.log(err);
    console.log(flavor)
});
