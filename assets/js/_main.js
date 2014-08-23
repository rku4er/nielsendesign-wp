/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
      //$('#columns').columnize({ columns: 2, buildOnce: false });
      var templatePath = $('body').data('template-path');
      var hashArr = ['home'];
      var bgArr = [templatePath + '/assets/img/bg/home.jpg'];

      $('#menu-main-menu a').each(function(){
        var re = /\w*-?\w*(?=\/$)/gi;
        var hash = $(this).attr('href').match(re)[0];

        hashArr.push(hash);
        bgArr.push(templatePath + '/assets/img/bg/' + hash + '.jpg');
        $(this).attr('href', '#' + hash);
      });

      $('#fullpage .section').each(function(i){
        $(this).css({
          'background-image' : 'url(' + bgArr[i] + ')'
        });
      });

      $('#fullpage').fullpage({
        css3: true,
        resize : false,
        scrollOverflow: false,
        autoScrolling: true,
        verticalCentered: false, //buggy here
        scrollingSpeed: 700,
        easing: 'easeInQuart',
        menu: '#navbar',
        anchors: hashArr,
        paddingTop: '0',
        paddingBottom: $('#navbar').outerHeight() + 'px',
        keyboardScrolling: true,
        touchSensitivity: 15,
        continuousVertical: false,
        animateAnchor: true,
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction){}
      });
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
