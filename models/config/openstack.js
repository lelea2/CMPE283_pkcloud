/** Configuration for open stack properties **/
var TestInfo ={
    Martin_Pwd:"secrete",
    Khanh_Pwd:"ab08f97872024503"
};

module.exports = {
    "AUTHENTICATION": { //Admin data for open stack login
        "auth": {
            "tenantName":"admin",
            "passwordCredentials": {
                "username":"admin",
                "password": TestInfo.Khanh_Pwd
            }
        }
    },
    "NEW_SERVER_SMALL": { //Create small server
        "server": {
            "name": "Server 1",
            "imageRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/images/8c684853-ba93-454b-821d-12a5d7b1b328",
            "flavorRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/flavors/2",
            "metadata": {
                "My Server Name": "Small Website"
            },
            "networks": [{
                "uuid": "fb3037f3-1b62-42f1-90b5-efe7ff9b6658"
            }]
        }
    },
    "NEW_SERVER_LARGE": { //Create large server
        "server": {
            "name": "Server 1",
            "imageRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/images/8c684853-ba93-454b-821d-12a5d7b1b328",
            "flavorRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/flavors/4",
            "metadata": {
                "My Server Name": "Large Website"
            },
            "personality": [{
                "path": "/etc/banner.txt",
                "contents": "ICAgICAgDQoiQSBjbG91ZCBkb2VzIG5vdCBrbm93IHdoeSBpdCBtb3ZlcyBpbiBqdXN0IHN1Y2ggYSBkaXJlY3Rpb24gYW5kIGF0IHN1Y2ggYSBzcGVlZC4uLkl0IGZlZWxzIGFuIGltcHVsc2lvbi4uLnRoaXMgaXMgdGhlIHBsYWNlIHRvIGdvIG5vdy4gQnV0IHRoZSBza3kga25vd3MgdGhlIHJlYXNvbnMgYW5kIHRoZSBwYXR0ZXJucyBiZWhpbmQgYWxsIGNsb3VkcywgYW5kIHlvdSB3aWxsIGtub3csIHRvbywgd2hlbiB5b3UgbGlmdCB5b3Vyc2VsZiBoaWdoIGVub3VnaCB0byBzZWUgYmV5b25kIGhvcml6b25zLiINCg0KLVJpY2hhcmQgQmFjaA=="
            }],
            "networks": [{
                "uuid": "5138d56c-1b6a-4981-b5a7-3072818963e0"
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
    "NEW_DB": { //New DB service
        "instance": {
            "databases": [{
                "character_set": "utf8",
                "collate": "utf8_general_ci",
                "name": "sampledb"
            }, {
                "name": "nextround"
            }],
            "flavorRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/flavors/1",
            "name": "json_rack_instance",
            "users": [{
                "databases": [{
                    "name": "sampledb"
                }],
                "name": "cmpe283",
                "password": "testing"
            }],
            "volume": {
                "size": 2
            }
        }
    },
    "NEW_SUBNET": {
        "subnet": {
            "name": "sample_subnet", //name changed based on FE request
            "network_id": "5138d56c-1b6a-4981-b5a7-3072818963e0",
            "ip_version": 4,
            "cidr": "192.168.199.0/24" //1 IP per subnet, change this ip or network Id to create a new one
        }
    },
    "NEW_NETWORK": {
        "network": {
            "name": "sample_network", //name changed based on FE request
            "admin_state_up": true
        }
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
