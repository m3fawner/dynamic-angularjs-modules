import angular from 'angular';
class DynamicAngularModuleLoader {     
  constructor() {
    this._initializedModules = {};
  }
  
  // This is the only function that is intended to be called by the application. It will push it to the root module's
  // list of required modules (the requires property on the module).
  // It will then initialize all of the pieces of the module by calling _initializeModule.
  // After that is done, it will execute the configuration and run blocks associated with all of the newly defined modules.  
  loadModule(moduleName) {
    this._rootApplicationModule.requires.push(moduleName);
    this._initializeModule(moduleName);
    this._executeRunsAndConfigs();     
  }     
  
  // This function will subsequently mark all of the modules that the root application has already initialized
  // (this is the module that was bootstrapped). It also keeps a reference to the Angular module to dynamically
  // push new dependency modules to.
  set rootApplicationModule(module) {
    this._markChildModulesInitialized(module);
    this._rootApplicationModule = angular.module(module);
  } 
  _executeRunsAndConfigs() {         
    const $injector = angular.element(document.querySelector('[ng-app]')).injector();
    this._configBlocks.forEach(this._executeInvocation.bind(this));
    this._runBlocks.forEach($injector.invoke);
    delete this._configBlocks;
    delete this._runBlocks;
  }     
  // This is where the bulk of the work is being done. It will iterate over the _invokeQueue, which is the list of services,
  // factories, etc that are associated with a module.
  // It will also push configuration and run blocks onto a collection to be executed post-initialization.
  // It then marks it as an already initialized module. If this step is skipped, singletons like services are overwritten,
  // configuration blocks are executed multiple times, all of which leads to problems down the line.
  // Lastly, it will iterate over the list of dependency modules and initialize those, too.
  _initializeModule(moduleName) {
    const module = angular.module(moduleName);
    module._invokeQueue.reverse().forEach(this._executeInvocation.bind(this));
    this._configBlocks = this._configBlocks ? this._configBlocks.concat(module._configBlocks) : module._configBlocks;
    this._runBlocks = this._runBlocks ? this._runBlocks.concat(module._runBlocks) : module._runBlocks;
    this._initializedModules[moduleName] = true;
    module.requires.forEach((nestedModule) => {
      if (!this._initializedModules[nestedModule]) {
        this._initializeModule(nestedModule);
      }
    });
  }
  // This function simply put, takes an entry from the _invokeQueue and initializes it by calling a specific provider's
  // method against a specific construct (like a service). These are specified in an array such as:
  // ['$compileProvider', 'component', ['componentName' ...]].
  _executeInvocation([providerName, providerMethod, construct]) {
    const provider = this.providers[providerName];
    provider[providerMethod].apply(provider, construct);
  }
  _markChildModulesInitialized(module) {
    if (!this._initializedModules[module]) {
      this._initializedModules[module] = true;
      const angularModule = angular.module(module);
      angularModule.requires.forEach((key) => {
        this._markChildModulesInitialized(key);
      });
    }
  }
}

export default new DynamicAngularModuleLoader();