/** Angular pkcloud app controller */
angular.module('pkcloudApp', [])
    .controller('pkcloudAppController', ['$scope', '$http', function ($scope, $http) {

    $scope.formSigninData = {};
    /** Handle signin */
    $scope.processSignin = function() {
        alert("dddd");
        console.log("formSignin");
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
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-csrf-token': $('input[name="_csrf"]').val()
            }
        }).then(function(data) {
            console.log(data);
            window.location = '/dashboard'; //redirect to dashboard
        }, function(err) {
            alert('Fail to login. Please try again');
        });
    };

    /** Start VM */
    $scope.startVM = function(id) {
        alert('startVM: ' + id);
    };

    /** Stop VM */
    $scope.stopVM = function(id) {
        alert('stopVM: ' + id);
    };

}]);
