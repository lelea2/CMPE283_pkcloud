/** Configuration for API end point **/

module.exports = {
    "GET_TOKEN": {
        "url": "http://localhost:5000/v2.0/tokens",
        "method": "POST"
    },
    "GET_IMAGES": {
        "url": "http://localhost:8774/v2/{tenant_id}/images/detail",
        "method": "GET"
    },
    "GET_SERVERS": {
        "url": "http://localhost:8774/v2/{tenant_id}/servers/detail",
        "method": "GET"
    },
    "GET_FLAVORS": {
        "url": "http://localhost:8774/v2/{tenant_id}/flavors/detail",
        "method": "GET"
    },
    "GET_NETWORKS": {
        "url": "http://localhost:9696/v2.0/networks",
        "method": "GET"
    },
    "GET_SUBNETS": {
        "url": "http://localhost:9696/v2.0/subnets",
        "method": "GET"
    },
    "GET_LIMITS": {
        "url": "http://localhost:8774/v2/{tenant_id}/limits",
        "method": "GET"
    },
    "CREATE_SERVER": {
        "url": "http://localhost:8774/v2/{tenant_id}/servers",
        "method": "POST"
    },
    "CREATE_IMAGES": { //Glance
        "url": "http://localhost:9292/v2/images",
        "method": "POST"
    },
    "START_VM": {
        "url": "http://localhost:8774/v2/{tenant_id}/servers/{server_id}",
        "method": "POST"
    },
    "STOP_VM": {
        "url": "http://localhost:8774/v2/{tenant_id}/servers/{server_id}",
        "method": "POST"
    },
    "SERVER_DIAGNOSTIC": {
        "url": "http://localhost:8774/v2/{tenant_id}/servers/{server_id}/diagnostics",
        "method": "GET"
    }
}
