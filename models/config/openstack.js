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
    "NEW_SERVER": {
        "server": {
            "name": "Server 1",
            "imageRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/images/c71ca2cb-f85c-4f19-b1ae-54859c66c13a",
            "flavorRef": "http://localhost:8774/v2/3888f8ff7d7c4c4a805ba2e5b98416eb/flavors/2",
            "metadata": {
                "My Server Name": "Apache1"
            },
            "personality": [{
                "path": "/etc/banner.txt",
                "contents": "ICAgICAgDQoiQSBjbG91ZCBkb2VzIG5vdCBrbm93IHdoeSBpdCBtb3ZlcyBpbiBqdXN0IHN1Y2ggYSBkaXJlY3Rpb24gYW5kIGF0IHN1Y2ggYSBzcGVlZC4uLkl0IGZlZWxzIGFuIGltcHVsc2lvbi4uLnRoaXMgaXMgdGhlIHBsYWNlIHRvIGdvIG5vdy4gQnV0IHRoZSBza3kga25vd3MgdGhlIHJlYXNvbnMgYW5kIHRoZSBwYXR0ZXJucyBiZWhpbmQgYWxsIGNsb3VkcywgYW5kIHlvdSB3aWxsIGtub3csIHRvbywgd2hlbiB5b3UgbGlmdCB5b3Vyc2VsZiBoaWdoIGVub3VnaCB0byBzZWUgYmV5b25kIGhvcml6b25zLiINCg0KLVJpY2hhcmQgQmFjaA=="
            }],
            "networks": [{
            "uuid": "fb3037f3-1b62-42f1-90b5-efe7ff9b6658"
            }]
        }
    }
}
