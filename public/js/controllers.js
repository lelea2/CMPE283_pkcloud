/** Angular pkcloud app controller */
angular.module('pkcloudApp', [])
    .controller('pkcloudAppController', ['$scope', '$http', function ($scope, $http) {

    $scope.formSigninData = {};

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
        var data = window.CMPE283_AuthData || {};
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
        var data = window.CMPE283_AuthData || {};
        data.server_id = id;
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

}]);
