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

function initCrewPersons(holder){
  var crewTiles = $(holder).find('.item');
  var persons = $(holder).find('.persons');

  if(crewTiles.length){
    crewTiles.each(function(i){
      i++;
      $(this).hover(function(){
        persons.toggleClass('active-'+i);
      });

      if(i === crewTiles.length){
        $('body').data('crew_persons_loaded', true);
      }
    });
  }
}

function initCreationBottles(holder){
  var creationBottles = $(holder).find('.item');

  if(creationBottles.length){
    creationBottles.each(function(i){
      i++;
      var range = $(this).find('.range');

      setTimeout(function(){
        range.css('height' , '0').animate({
          'height' : range.data('perc')
        }, 1000, 'easeInOutQuart');
      }, i*200);

      if(i === creationBottles.length){
        $('body').data('creation_bottles_loaded', true);
      }

    });
  }
}

function initializeMaps(myLatlng, image, zoom) {
  var mapOptions = {
    center: myLatlng,
    zoom: zoom,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
    }
  };

  var stylez = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 }
      ]
    }
  ];

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });

  map.mapTypes.set('tehgrayz', mapType);
  map.setMapTypeId('tehgrayz');

  // To add the marker to the map, use the 'map' property
  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Nielsen Design",
    animation: google.maps.Animation.DROP,
    icon: image
  });

  google.maps.event.addListener(marker, 'click', function(){
    toggleBounce(marker);
  });

  marker.setMap(map);
}

function toggleBounce(marker) {
  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function showGmaps(map_holder){
  // Google Maps
  if(typeof google !== "undefined"){

    var mapHolder = $(map_holder);
    var myLatlng = new google.maps.LatLng(mapHolder.data('latitude'), mapHolder.data('longitude'));
    var image = mapHolder.data('marker');
    var zoom = mapHolder.data('zoom');

    mapHolder.removeAttr('data-latitude');
    mapHolder.removeAttr('data-longitude');
    mapHolder.removeAttr('data-marker');
    mapHolder.removeAttr('data-zoom');

    /* google.maps.event.addDomListener(window, 'load', initialize); */

    $('#map img').on('click', function(){
      initializeMaps(myLatlng, image, zoom);
    });

  }
}

function requiredFieldsText(text){
  var required_fields = $('.gfield_required');
  if(required_fields.length){
    required_fields.text(text);
  }
}

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
      initCrewPersons('#crew-tiles');

      if(!$('body.home').length){
        initCreationBottles('#creation-bottles');
      }

      requiredFieldsText('(Required)');

      showGmaps('#map_holder');
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
      //$('#columns').columnize({ columns: 2, buildOnce: false });
      var templatePath = $('body').data('template-path');
      var hashArr = ['home'];
      //var bgArr = [templatePath + '/assets/img/bg/home.jpg'];

      $('#menu-main-menu a').each(function(){
        var re = /\w*-?\w*(?=\/$)/gi;
        var hash = $(this).attr('href').match(re)[0];

        hashArr.push(hash);
        //bgArr.push(templatePath + '/assets/img/bg/' + hash + '.jpg');
        $(this).attr('href', '#' + hash);
      });

      /*$('#fullpage .section').each(function(i){
        $(this).css({
          'background-image' : 'url(' + bgArr[i] + ')'
        });
      });*/

      $('#fullpage').fullpage({
        css3: true,
        resize : false,
        scrollOverflow: true,
        autoScrolling: true,
        verticalCentered: true, //buggy here
        scrollingSpeed: 700,
        easing: 'easeInQuart',
        menu: '#navbar',
        anchors: hashArr,
        paddingTop: 'auto',
        paddingBottom: $('#navbar').outerHeight() + 'px',
        keyboardScrolling: true,
        touchSensitivity: 15,
        continuousVertical: false,
        animateAnchor: true,
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){
          if(anchorLink === 'creation' && !$('body').data('creation_bottles_loaded')){
            initCreationBottles('#creation-bottles');
          }
        },
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
