# MySkills
A web app for showcasing skills and finding talent

### Build
App uses ES6, CSS4, HTML5, WebPack, and grunt-add-view. ES6 has been limited to current browser support to avoid use of poly fills.
#### Build Steps
grunt--- build views
gulp build-css:prod--- trans-pile css4 into css3
gulp webpack:prod--- combine JavaScript modules into bundle.js

### Client Routing
Client side routing is controlled by intercepting the default behavior for anchor tags using the firstDo function in index.js. Using window.history and local storage, refresh, prev, and back buttons are properly mapped to the correct views. The loadView function in viewRouter is used to change views and load the views corresponding script if it has one. View scripts are registered in pageScript.js.

### Shared Objects
Properties and methods that are required by multiple views are provied by sharedObjects.js and helperMethods.js. The methods and objects available in these files are passed around via the mySkills object created in index.js.

### OpenShift Deployment
Node.js on OpenShift
====================================================================
This package includes a dynamic Node.js build stage that will provide your application with a customized Node.js runtime.
The version of Node that is available will depend on the requirements listed in your application's `package.json` file.

See: `.openshift/action_hooks/` for more informaiton on how the OpenShift build process works.

Basic Setup
-----------

If this is your first time using OpenShift Online or Node.js, you'll have some quick prep-work to do:

1. [Create an OpenShift Online account](http://openshift.redhat.com/app/account/new)
2. If you don't already have the rhc (Red Hat Cloud) command-line tools, run: `sudo gem install rhc`
3. Run `rhc setup` to link your OpenShift Online account with your local development environment, and to select an application namespace
4. [Download and install Node.js](http://nodejs.org) for use in your local development environment: http://nodejs.org

If you need any additional help getting started, these links may come in handy:

 * https://openshift.redhat.com/community/get-started#cli
 * https://openshift.redhat.com/community/developers/rhc-client-tools-install

Host your Node.js applications on OpenShift
-------------------------------------------

Create a Node.js application.  This example will produce an application named **nodeapp**:

    rhc app create nodeapp nodejs --from-code=git://github.com/ryanj/nodejs-custom-version-openshift.git

The above example will output a folder named after your application which contains your local development source.  Make sure to run it from within a directory where you would like to store your development code.

That's it!  You should be able to access your application at:

    http://nodeapp-$yournamespace.rhcloud.com

If your app requires a specific version of Node.js, just update the 'engines' section of your app's `package.json` file to specify your runtime requirements:

    "engines": {
        "node": ">= 0.12.0"
     },

Commit your changes locally:

    git add package.json
    git commit -m 'updating package.json to select Node.js version 0.10.38'

Then push your updates to OpenShift

    git push

Additional updates can be made via the same `git add`, `git commit`, and `git push` workflow.
