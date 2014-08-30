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

// Init tiles grid
function initTiles(element) {

    $(element).each(function(i){

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
        ],
        [
            " A A A A A B B B B B B B C C C C C C C C C F F F F F I I I I I I J J J J J M M M M M M",
            " A A A A A B B B B B B B C C C C C C C C C F F F F F I I I I I I J J J J J M M M M M M",
            " A A A A A B B B B B B B C C C C C C C C C F F F F F I I I I I I J J J J J M M M M M M",
            " A A A A A B B B B B B B C C C C C C C C C F F F F F I I I I I I K K K K K M M M M M M",
            " A A A A A B B B B B B B P P P P G G G G G F F F F F I I I I I I K K K K K N N N N N N",
            " D D D D D B B B B B B B P P P P G G G G G F F F F F I I I I I I K K K K K N N N N N N",
            " D D D D D E E E E E E E P P P P G G G G G F F F F F I I I I I I K K K K K N N N N N N",
            " D D D D D E E E E E E E P P P P G G G G G F F F F F H H H H H H K K K K K N N N N N N",
            " D D D D D E E E E E E E Q Q Q Q G G G G G F F F F F H H H H H H K K K K K O O O O O O",
            " D D D D D E E E E E E E Q Q Q Q G G G G G F F F F F H H H H H H K K K K K O O O O O O",
            " D D D D D E E E E E E E Q Q Q Q G G G G G F F F F F H H H H H H K K K K K O O O O O O",
            " D D D D D E E E E E E E Q Q Q Q G G G G G F F F F F H H H H H H K K K K K O O O O O O"
        ]
      ];

      var el = $(this),
        grid = new Tiles.Grid(el),
        tiles = el.children('.tile');

      var TILE_IDS = el.data('ids-array');

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

      function updateTemplate(index, template){
        // get the JSON rows for the selection
        var rows = template[index] ? template[index] : template[0];

        // set the new template and resize the grid
        grid.template = Tiles.Template.fromJSON(rows);
        grid.isDirty = true;
        grid.resize();

        // adjust number of tiles to match selected template
        var ids = TILE_IDS.slice(0, grid.template.rects.length);
        grid.updateTiles(ids);
        grid.redraw(true);
      }

      var templateID = i;

      // wait until users finishes resizing the browser
      var debouncedResize = debounce(function() {
          updateTemplate(templateID, demoTemplateRows);
      }, 100);

      // when the window resizes, redraw the grid
      $(window).resize(debouncedResize).trigger('resize');

    });

}

function loadLightbox(selector){
  var el = $(selector);
  var data = {};
  var output;

  data.action = 'getProductInfo';
  data.id = el.data('id');

  $.post('/wp-admin/admin-ajax.php', data, function(response) {
    showModal(response, data.id);
  });
}

function showModal(response, id){
  var _modal = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div><div class="modal-body">' + response + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>');

  _modal.prop('id', 'modal-'+id);
  _modal.modal();
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

      initTiles('.tile-grid');

      $('a[rel=gallery-1]').on('click', function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        if ($(url).length) {
          $(url).modal('show');
        } else {
          loadLightbox(this);
        }
      });
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
        scrollOverflow: false,
        autoScrolling: false,
        verticalCentered: true, //buggy here
        scrollingSpeed: 1000,
        easing: 'easeOutExpo',
        menu: '#navbar',
        anchors: hashArr,
        paddingTop: '10px',
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
          $('#section-'+anchorLink).css({
            'padding-bottom' : $('#navbar').outerHeight()
          });
        },
        afterRender: function(){

        },
        afterResize: function(){
          $('#fullpage .section').each(function(){
            $(this).css({
              'padding-bottom' : $('#navbar').outerHeight()
            });
          });
        },
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
