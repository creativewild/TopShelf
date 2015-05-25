'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var rolesSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: validators.isTitle()
  },
  permissions: {
    editContent: {
      type: Boolean,
      default: false
    },
    publishContent: {
      type: Boolean,
      default: false
    },
    deleteContent: {
      type: Boolean,
      default: false
    },
    manageMedia: {
      type: Boolean,
      default: false
    },
    restrictAccess: {
      type: Boolean,
      default: false
    },
    manageExtensions: {
      type: Boolean,
      default: false
    },
    moderateComments: {
      type: Boolean,
      default: false
    },
    manageUsers: {
      type: Boolean,
      default: false
    },
    manageRoles: {
      type: Boolean,
      default: false
    },
    changeSiteSettings: {
      type: Boolean,
      default: false
    },
    importExportData: {
      type: Boolean,
      default: false
    },
    deleteSite: {
      type: Boolean,
      default: false
    },
    allPrivilages: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = mongoose.model('Roles', rolesSchema);
