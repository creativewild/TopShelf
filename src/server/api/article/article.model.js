'use strict';

var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    validators = require('mongoose-validators'),
    moment     = require('moment'),
    _          = require('lodash');

var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: '',
    required: 'Title must be provided',
    unique: true,
    validate: [
        function(title) {
          return typeof title !== 'undefined' && title.length <= 120;
        },
        'Title must not be empty or exceed 120 character max limit'
        ]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    required: 'A 140 character description must be provided'
  },
  content:{
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String
  },
  state: {
    type: String,
    default: 'Draft',
    enum: ['Draft', 'Published', 'Archived']
  },
  image: String,
  lrgImage: String,
  views: {
    type: Number,
    default: 1
  }
});

ArticleSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({_id : id})
      .populate({path: 'User', select:'username email'})
      .exec(cb);
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate({path: 'User', select:'username email'})
      .sort({'createdAt': -1}) // sort by date
      .exec(cb);
  }
}

module.exports = mongoose.model('Article', ArticleSchema);
