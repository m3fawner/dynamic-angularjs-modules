import angular from 'angular';

export default angular.module('ew.module1', [])
    .config(($routeProvider) => {
        $routeProvider.when('/module1', {
            template: 'This is a route in Module 1'
        });
    })
    .run(() => console.log('Module loaded'))
    .name;