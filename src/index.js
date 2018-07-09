import angular from 'angular';
import angularRoute from 'angular-route';
import moduleLoader from './moduleLoader';
import dynamicModuleLoader from './dynamicModuleLoader';

export default angular.module('ew', [
        angularRoute
    ])
    .config(($routeProvider) => {
        $routeProvider.when('/', {
            template: '<module-loader />'
        });
        $routeProvider.otherwise('/');
    })
    .component('moduleLoader', {
        template: `
            <div>
                <span ng-click="$ctrl.loadModule('module1')">Load Module 1</span>
                <span ng-click="$ctrl.loadModule('module2')">Load Module 2</span>
            </div>
        `,
        controller: class {
            constructor($location, $timeout) {
                this.$location = $location;
                this.$timeout = $timeout;
            }
            loadModule(module) {
                moduleLoader[module]()
                    .then(() => {
                        this.$timeout(() => {
                            this.$location.path(module);
                        });
                    });
            }
        }
    })
    .config(($injector, $compileProvider, $controllerProvider, $filterProvider, $provide) => {
        dynamicModuleLoader.providers = {
            $injector,
            $compileProvider,
            $controllerProvider,
            $filterProvider,
            $provide
        };
        dynamicModuleLoader.rootApplicationModule = 'ew';
    });
