'use strict';

angular.module('tapApp')
  .factory('SEO', function ($location, $window) {
    return {
      title: function (title) {
        if (!title) {
          return $window.document.title;
        }
        $window.document.title = title;
      },
      ogUrl: function (url) {
        if (!url) {
          return jQuery('#ogUrl').attr('content');
        }
        jQuery('#ogUrl').attr('content', $location.protocol() + '://' + $location.host() + (($location.port()) ? (':' + $location.port()) : '') + url);
      },
      ogTitle: function (title) {
        if (!title) {
          return jQuery('#ogTitle').attr('content');
        }
        jQuery('#ogTitle').attr('content', title);
      },
      ogDescription: function (description) {
        if (!description) {
          return jQuery('#ogDescription').attr('content');
        }
        jQuery('#ogDescription').attr('content', description);
      },
      description: function (description) {
        if (!description) {
          return jQuery('#metaDescription').attr('content');
        }
        jQuery('#metaDescription').attr('content', description);
      },
      keywords: function (keywords) {
        if (!keywords) {
          return jQuery('#metaKeywords').attr('content');
        }
        var keywordsString = '';
        if (_.isArray(keywords)) {
          angular.forEach(keywords, function (keyword) {
            keywordsString += keyword + ', ';
          });
          keywordsString = keywordsString.substring(0, keywordsString.length - 2);
        } else {
          keywordsString = keywords;
        }
        jQuery('#metaKeywords').attr('content', keywordsString);
      }
    };
  });
