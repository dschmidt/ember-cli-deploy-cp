/* jshint node: true */
'use strict';


var Promise   = require('ember-cli/lib/ext/promise');
var DeployPluginBase = require('ember-cli-deploy-plugin');
var cpr = require('cpr');
var SilentError         = require('silent-error');

module.exports = {
  name: 'ember-cli-deploy-cp',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        distDir: function(context) {
          return context.distDir;
        },
        deleteFirst: false,
        overwrite: true,
        confirm: true,
        filePattern: undefined,

        didDeployMessage: function(context){
          if (context.revisionKey) {
            return "Copied revision " + context.revisionKey + ".";
          }
        },
      },
      requiredConfig: ['destDir'],
      configure: function(/* context */) {
        this.log('validating config');

        ['distDir', 'deleteFirst', 'overwrite', 'confirm', 'didDeployMessage', 'filePattern'].forEach(this.applyDefaultConfigProperty.bind(this));

        this.log('config ok');
      },

      upload: function(/* context */) {
        var distDir = this.readConfig('distDir');
        var destDir = this.readConfig('destDir');

        var options = {
          deleteFirst: this.readConfig('deleteFirst'),
          overwrite: this.readConfig('overwrite'),
          confirm: this.readConfig('confirm')
        };

        if(this.readConfig('filePattern') !== undefined) {
          options.filter = this.readConfig('filePattern');
        }

        return new Promise(function(resolve, reject) {
          cpr(distDir, destDir, options, function(err, files) {
            if(err) {
              return reject(new SilentError('Could not copy files' + err));
            }

            resolve();
          });
        });
      },
      didDeploy: function(/* context */){
        var didDeployMessage = this.readConfig('didDeployMessage');
        if (didDeployMessage) {
          this.log(didDeployMessage);
        }
      }
    });
    return new DeployPlugin();
  }


};
