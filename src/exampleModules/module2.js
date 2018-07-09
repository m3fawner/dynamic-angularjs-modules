import angular from 'angular';

export default angular.module('ew.module2', [])
    .config(($routeProvider) => {
        $routeProvider.when('/module2', {
            template: 'This is a route in Module 2'
        });
    })
    .run(() => console.log('Module loaded'))
    .name;