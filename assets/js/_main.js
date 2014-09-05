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

var debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate){
        func.apply(context, args);
      }
    };
    if (immediate && !timeout){
      func.apply(context, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

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

function initializeMaps(selector, myLatlng, image, zoom) {
  var mapOptions = {
    scrollwheel: false,
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

  var map = new google.maps.Map(document.getElementById(selector.substr(1) + "-wrapper"), mapOptions);

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

function showGmaps(selector){
  // Google Maps
  if(typeof google.maps !== "undefined"){

    var mapHolder = $(selector);
    var myLatlng = new google.maps.LatLng(mapHolder.data('latitude'), mapHolder.data('longitude'));
    var image = mapHolder.data('marker');
    var zoom = mapHolder.data('zoom');

    mapHolder.removeAttr('data-latitude');
    mapHolder.removeAttr('data-longitude');
    mapHolder.removeAttr('data-marker');
    mapHolder.removeAttr('data-zoom');

    /* google.maps.event.addDomListener(window, 'load', initialize); */

    $(selector).find('img').waypoint(function() {
      if(!$(this).data('map_loaded')){
        initializeMaps(selector, myLatlng, image, zoom);
        $(this).data('map_loaded', true);
      }
    }, { offset: 'bottom-in-view'});

  }
}

function requiredFieldsText(text){
  var required_fields = $('.gfield_required');
  if(required_fields.length){
    required_fields.text(text);
  }
}

// Init tiles grid
function initTiles(element) {

    $(element).each(function(i){

      var dataTemplate = $(this).data('template');
      var demoTemplateRows = [
        [
            " A A A A B B B B B B C C C F F F F F F F F F I I I I I I J J J J L L L L L M M M M M M",
            " A A A A B B B B B B C C C F F F F F F F F F I I I I I I J J J J L L L L L M M M M M M",
            " A A A A B B B B B B C C C F F F F F F F F F I I I I I I J J J J L L L L L M M M M M M",
            " A A A A B B B B B B C C C F F F F F F F F F I I I I I I J J J J L L L L L M M M M M M",
            " A A A A B B B B B B C C C F F F F F F F F F I I I I I I J J J J L L L L L N N N N N N",
            " D D D D E E E E E E E E E F F F F F F F F F I I I I I I J J J J L L L L L N N N N N N",
            " D D D D E E E E E E E E E F F F F F F F F F I I I I I I K K K K K K K K K N N N N N N",
            " D D D D E E E E E E E E E G G G G G H H H H I I I I I I K K K K K K K K K N N N N N N",
            " D D D D E E E E E E E E E G G G G G H H H H I I I I I I K K K K K K K K K O O O O O O",
            " D D D D E E E E E E E E E G G G G G H H H H I I I I I I K K K K K K K K K O O O O O O",
            " D D D D E E E E E E E E E G G G G G H H H H I I I I I I K K K K K K K K K O O O O O O",
            " D D D D E E E E E E E E E G G G G G H H H H I I I I I I K K K K K K K K K O O O O O O"
        ]
      ];

      demoTemplateRows.push(dataTemplate);

      $(this).removeAttr('data-template');

      var el = $(this),
        grid = new Tiles.Grid(el),
        tiles = el.children('.tile');

      var TILE_IDS = el.data('ids-array');

      $(this).removeAttr('data-ids-array');

      // template is selected by user, not generated so just
      // return the number of columns in the current template
      grid.resizeColumns = function() {
          return this.template.numCols;
      };

      grid.cellPadding = 0;

      // by default, each tile is an empty div, we'll override creation
      // to add a tile number to each div
      grid.createTile = function(tileId) {
          var tile = new Tiles.Tile(tileId);
          tile.$el.append(tiles[tileId]);
          return tile;
      };

      function updateTemplate(template){
        // get the JSON rows for the selection
        var rows = template[1] ? template[1] : template[0];

        // set the new template and resize the grid
        grid.template = Tiles.Template.fromJSON(rows);
        grid.isDirty = true;
        grid.resize();

        // adjust number of tiles to match selected template
        var ids = TILE_IDS.slice(0, grid.template.rects.length);
        grid.updateTiles(ids);
        grid.redraw(true);
      }

      // wait until users finishes resizing the browser
      var debouncedResize = debounce(function() {
          updateTemplate(demoTemplateRows);
      }, 100);

      // when the window resizes, redraw the grid
      $(window).resize(debouncedResize).trigger('resize');

    });

}

function productsLightbox(selector){
  var el = $(selector);
  var data = {};
  var output;

  data.action = 'getProducts';

  $.post('/wp-admin/admin-ajax.php', data, function(response) {
    showModal(response, 'products');
  });
}

function showModal(response, id){
  var _modal = $(response);

  _modal.prop('id', 'modal-'+id);
  _modal.modal();
}

function initProductsModal(selector){
  $(selector).on('click', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
    if ($(url).length) {
      $(url).modal('show');
    } else {
      productsLightbox(this);
    }
  });
}

function panelShowCallback(target){
  var $this = $(target);
  var id = target.id.replace(/panel-/g, '');

  if(id === 'creation' && !$('body').data('creation_bottles_loaded')){
    initCreationBottles('#creation-bottles');
  }

  if(id === 'home'){
    var slider = $('#home-slider');
    if(slider.length){
      var sliderOffset = slider.offset();
      var sliderHeight = $(window).height() - $('#navbar').height() - sliderOffset.top;
      slider.css({
        'height' : Math.round(sliderHeight) + 'px'
      });
    }
  }

  if(!$('body').data(id + '-shown')){
    $this.addClass('animated');
    $('body').data(id + '-shown', true);
  }

  window.location.hash = '#' + target.id;
}

function panelFitScreen(){
  $('.panel').each(function(){
    var self = $(this);
    self.css({
      'padding-top' : $('#navbar').outerHeight(),
      'min-height' : $.waypoints('viewportHeight')
    });
  });
}


// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages

      // Replacement for required text
      requiredFieldsText('(Required)');

      // crew persons highlight
      initCrewPersons('#crew-tiles');

      // creation bottles animation
      if(!$('body.home').length){
        initCreationBottles('#creation-bottles');
      }

      // google maps
      showGmaps('#map');

      // tile grid gallery
      initTiles('.tile-grid');

      // lightbox for 'view all products' link
      initProductsModal('a[rel=gallery-2]');
    }
  },
  // Home page
  home: {
    init: function() {

      // set menu hash
      var templatePath = $('body').data('template-path');

      $('#mainnav').find('ul.navbar-nav li a').each(function(){
        var re = /\w*-?\w*(?=\/$)/gi;
        var hash = $(this).attr('href').match(re)[0];

        $(this).attr('href', '#panel-' + hash);
      });

      // Define scroll element
      var $scrollElement;

      /* Smooth scrolling of links between panels */
      $('.panel').each(function() {
        var $panel = $(this);
        var hash = '#' + this.id;

        $('a[href="' + hash + '"]').click(function(event){
          $('html, body').stop().animate({
            scrollTop: $panel.offset().top
          }, 500, 'easeOutExpo', function() {
            window.location.hash = hash;
          });

          event.preventDefault();
        });
      });

      /* Panel classes */
      $('.panel')
        .waypoint(function(direction) {
          //$('body').toggleClass(this.id + '-visible', direction === 'down');
          $(this).toggleClass('visible', direction === 'down');
          $('a[href="#' + this.id + '"]').parent().toggleClass('active', direction === 'down');
          panelShowCallback(this);
        }, {
          offset: '50%'
        })
        .waypoint(function(direction) {
          //$('body').toggleClass(this.id + '-visible', direction === 'up');
          $(this).toggleClass('visible', direction === 'up');
          $('a[href="#' + this.id + '"]').parent().toggleClass('active', direction === 'up');
        }, {
          offset: function() {
            return -$(this).outerHeight();
          }
        });

      /* Show/hide menu */
      $('.content-info')
        .waypoint(function(direction) {
          $('#mainnav').toggleClass('hidden', direction === 'down');
        }, {
          offset: 'bottom-in-view'
        });

      /* Force snap to panel on resize. */
      var timer;

      $(window).resize(function() {
        window.clearTimeout(timer);
        timer = window.setTimeout(function() {
          var hash = window.location.hash ? window.location.hash : '#panel-home';

          $('html, body').stop().animate({
            scrollTop: $(hash).offset().top
          }, 200);
        }, 100);
      });

      /* Fit panel size equal to screen  */
      $(window).load(panelFitScreen).resize(panelFitScreen);

      $(window).load(function(){
        $(this).trigger('resize');
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
