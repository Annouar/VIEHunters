angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/offers/main', controller: 'mainCtrl'})
        .otherwise({ templateUrl: '/offers/main', controller: 'mainCtrl'});
});


angular.module('app')
    .controller('mainCtrl', ['$scope', 'mainFactory', function($scope, mainFactory) {

        // API GET offers callback function
        var handleSuccess = function(data, status) {
            $scope.offers = data;

            // Setup params for Google Static Map PI links
            var staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap';
            var zoomValue = '2';
            var imgSize = '200x200';
            var markerColor = 'red';
            var googleApiKey = 'AIzaSyD_3rRplDwGNEtvWiEoPK7S8t5xrBiPHqw';

            // Generate link to Google Static Map API for each offer
            $scope.offers.map(function(offer) {
                console.log(offer['job_title']);
                offer['url_map'] = staticMapUrl
                    + '?center='+ offer['city']
                    + '&zoom='+ zoomValue
                    + '&size=' + imgSize
                    + '&markers=color:'+ markerColor + '%7C'+ offer['city']
                    + '&key=' + googleApiKey;
            })
        }

        mainFactory.getLastOffers().success(handleSuccess);
    }])
    .factory('mainFactory', ['$http', function($http) {
        return {
            getLastOffers: function() {
                return $http.get("/offers", {
                    params: {
                        limit: '8'
                    }});
            }
        }
    }]);