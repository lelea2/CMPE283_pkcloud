/** Configuration for open stack properties **/

module.exports = {
    "AUTHENTICATION": { //Admin data fro open stack login
        "auth": {
            "tenantName":"admin",
            "passwordCredentials": {
                "username":"admin",
                "password":"ab08f97872024503"
            }
        }
    },
    "NEW_SERVER_SMALL": {
        "server": {
            "name": "Server 1",
            "imageRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/images/c71ca2cb-f85c-4f19-b1ae-54859c66c13a",
            "flavorRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/flavors/2",
            "metadata": {
                "My Server Name": "Small Website"
            },
            "personality": [{
                "path": "/etc/banner.txt",
                "contents": "Small Website"
            }],
            "networks": [{
                "uuid": "fb3037f3-1b62-42f1-90b5-efe7ff9b6658"
            }]
        }
    },
    "NEW_SERVER_LARGE": {
        "server": {
            "name": "Server 1",
            "imageRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/images/c71ca2cb-f85c-4f19-b1ae-54859c66c13a",
            "flavorRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/flavors/3",
            "metadata": {
                "My Server Name": "Large Website"
            },
            "personality": [{
                "path": "/etc/banner.txt",
                "contents": "Big website"
            }],
            "networks": [{
                "uuid": "fb3037f3-1b62-42f1-90b5-efe7ff9b6658"
            }]
        }
    },
    "NEW_IMAGE_1": { //hardcode image type
        "name": "Ubuntu 12.10",
        "tags": [
            "ubuntu",
            "quantal"
        ],
        "container_format": "bare",
        "disk_format": "qcow2",
        "visibility": "private",
        "min_disk": 0,
        "protected": false,
        "min_ram": 0
    },
    "START_VM": {
        "os-start": null
    },
    "STOP_VM": {
        "os-stop": null
    },
    "PKGCLOUD_CLIENT": {
        "username": "admin",
        "password": "ab08f97872024503",
        "url": "http://localhost:5000",
        "region": "RegionOne"
    }
}
