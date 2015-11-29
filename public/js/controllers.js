/** Angular pkcloud app controller */
angular.module('pkcloudApp', [])
    .controller('pkcloudAppController', ['$scope', '$http', function ($scope, $http) {

    $scope.formSigninData = {};

    $scope.formCreate = { //default for small website
        size: 'small'
    };

    function getHeaders() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-csrf-token': $('input[name="_csrf"]').val()
        };
    }
    /** Handle signin */
    $scope.processSignin = function() {
        if (!$scope.formSigninData.name) {
            $('.signin .userNameRow .err').removeClass('hidden');
            return false;
        }
        if (!$scope.formSigninData.password) {
            $('.signin .passwordNameRow .err').removeClass('hidden');
            return false;
        }
        $http({
            method  : 'POST',
            url     : '/ajax/signin',
            data    : $.param($scope.formSigninData),  // pass in data as strings
            headers : getHeaders()
        }).then(function(data) {
            console.log(data);
            window.location = '/dashboard'; //redirect to dashboard
        }, function(err) {
            alert('Fail to login. Please try again');
        });
    };

    /** Start VM */
    $scope.startVM = function(id) {
        var data = angular.extend({}, window.CMPE283_AuthData);
        data.server_id = id;
        //console.log(data);
        $http({
            method  : 'POST',
            url     : '/startVM',
            data    : $.param(data),  // pass in data as strings
            headers : getHeaders()
        }).then(function(data) {
            alert('Start VM success');
            $('.startVM[data-id="' + id + '"]').addClass('hidden');
            $('.stopVM[data-id="' + id + '"]').removeClass('hidden');
        }, function(err) {
            alert('Start VM failed');
        });
    };

    /** Stop VM */
    $scope.stopVM = function(id) {
        var data = angular.extend({}, window.CMPE283_AuthData);
        data.server_id = id;
        //console.log(data);
        $http({
            method  : 'POST',
            url     : '/stopVM',
            data    : $.param(data),  // pass in data as strings
            headers : getHeaders()
        }).then(function(data) {
            alert('Stop VM success');
            $('.startVM[data-id="' + id + '"]').removeClass('hidden');
            $('.stopVM[data-id="' + id + '"]').addClass('hidden');
        }, function(err) {
            alert('Stop VM failed');
        });
    };

    /** Create images */
    $scope.createImage = function() {
        var data = angular.extend({}, window.CMPE283_AuthData);
        data.image = $scope.formImage.name;
        //console.log(data);
        alert("Create images, image name: " + $scope.formImage.name);
        $http({
            method  : 'POST',
            url     : '/createImage',
            data    : $.param(data),  // pass in data as strings
            headers : getHeaders()
        }).then(function(data) {
            alert('Create image successfully');
            window.location.reload(true);
        }, function(err) {
            alert('Create image failed');
        });
    };

    /** Create servers */
    $scope.createServer = function() {
        //alert($scope.formCreate.size);
        var data = angular.extend({}, window.CMPE283_AuthData);
        data.size = $scope.formCreate.size;
        data.servername = $scope.formCreate.name;
        alert('Creating server "' + $scope.formCreate.name + '" as ' + $scope.formCreate.size + ' instance');
        $http({
            method  : 'POST',
            url     : '/createServer',
            data    : $.param(data),  // pass in data as strings
            headers : getHeaders()
        }).then(function(data) {
            alert('Create server successfully');
            window.location = '/serverDetail'; //redirect back to dashboard
        }, function(err) {
            alert('Create image failed');
        });
    };

}]);
