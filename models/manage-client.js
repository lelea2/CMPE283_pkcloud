/** Helper dealing with open stack through pkgcloud **/

var pkgcloud = require('pkgcloud'),
    PKGCLOUD_CONFIG = require('./config/openstack').PKGCLOUD_CLIENT;


/*var client = pkgcloud.compute.createClient({
    provider: 'openstack', // required
    username: PKGCLOUD_CONFIG.username,
    password: PKGCLOUD_CONFIG.password,
    authUrl: PKGCLOUD_CONFIG.url
});*/


var client = pkgcloud.compute.createClient({
    provider: 'openstack', // required
    username: PKGCLOUD_CONFIG.username,
    password: PKGCLOUD_CONFIG.password,
    authUrl: PKGCLOUD_CONFIG.url,
    region: PKGCLOUD_CONFIG.region
});

console.log(client);

client.getImages(function(err, images) {
    console.log(err);
    console.log(images)
});

console.log('hi');
