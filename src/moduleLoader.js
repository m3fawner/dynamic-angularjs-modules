import dynamicAngularModuleLoader from './dynamicModuleLoader';

export default {
    module1: () => new Promise((resolve, reject) => {
        require.ensure(['./exampleModules/module1'], (require) => {
            const modName = require('./exampleModules/module1').default;
            try {
                dynamicAngularModuleLoader.loadModule(modName);
                // dynamicReducerLoader.injectReducer({
                //     dependent: combineReducers(DependentReducers)
                // });
            } catch (err) {
                reject(err);
            }
            resolve();
        });
    }),
    module2: () => new Promise((resolve, reject) => {
        require.ensure(['./exampleModules/module2'], (require) => {
            const modName = require('./exampleModules/module2').default;
            try {
                dynamicAngularModuleLoader.loadModule(modName);
                // dynamicReducerLoader.injectReducer({
                //     dependent: combineReducers(DependentReducers)
                // });
            } catch (err) {
                reject(err);
            }
            resolve();
        });
    })
};