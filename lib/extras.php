<?php
/**
 * Clean up the_excerpt()
 */
function roots_excerpt_more($more) {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'roots') . '</a>';
}
add_filter('excerpt_more', 'roots_excerpt_more');

/**
 * Manage output of wp_title()
 */
function roots_wp_title($title) {
  if (is_feed()) {
    return $title;
  }

  $title .= get_bloginfo('name');

  return $title;
}
add_filter('wp_title', 'roots_wp_title', 10);

/**
 * Filtering the Wrapper: Custom Post Types
 */
add_filter('roots_wrap_base', 'roots_wrap_base_cpts');

function roots_wrap_base_cpts($templates) {
    $cpt = get_post_type();
    if ($cpt) {
       array_unshift($templates, 'base-' . $cpt . '.php');
    }
    return $templates;
}

/**
 * Home slider shortcode
 */
function home_slider_func($atts, $content = null) {
    $atts = shortcode_atts(array(
      'timeout' => '5000'
    ), $atts);

    $output = '';

    if(have_rows('slider')){

      $output .= '<section id="home-slider" class="carousel carousel-slide carousel-fade" data-ride="carousel" data-interval="'. $atts['timeout'] .'">';

      $output .= '<div class="carousel-inner">';

      $i = 0;

      while(have_rows('slider')){

          the_row();
          $i++;
          $active = ($i == 1) ? 'active' : '';

          $img_src = wp_get_attachment_image_src(get_sub_field('image'), 'full', false);

          $output .= '<div class="item '. $active .'">';

          $target = get_sub_field('new_window') ? 'target="_blank"' : '';

          if(get_sub_field('url')){
            $output .= '<a href="'. get_sub_field('url') .'" '. $target .'>';
          }

          $output .= '<img src="'. $img_src[0].'" alt="">';

          if(get_sub_field('url')){
            $output .= '</a>';
          }

          $output .= '</div>';
      }

      $output .= '</div>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('home_slider', 'home_slider_func');

/**
 * Crew tiles shortcode
 */
function crew_tiles_func($atts, $content = null) {
    $atts = shortcode_atts(array(), $atts);

    $output = '';

    if(have_rows('tiles')){

      $output .= '<section id="crew-tiles" class="tiles">';

      $output .= '<div class="tiles-inner">';

      $i = 0;

      while(have_rows('tiles')){

          the_row();
          $i++;

          $img_src = wp_get_attachment_image_src(get_sub_field('image'), 'full', false);

          $output .= '<div class="item" style="background-image: url('. $img_src[0] .')">';

          $target = get_sub_field('new_window') ? 'target="_blank"' : '';

          if(get_sub_field('url')){
            $output .= '<a href="'. get_sub_field('url') .'" '. $target .'>';
          }

          $output .= '<img src="'. $img_src[0] .'" alt="'. get_sub_field('title') .'" class="img-responsive">';

          $output .= '<span class="overlay">';

          $output .= '<span class="inner-table">';

          $output .= '<span class="inner-table-cell">';

          $output .= '<strong class="title">'. get_sub_field('title') .'</strong>';
          $output .= '<span class="caption">'. get_sub_field('caption') .'</span>';

          $output .= '</span>';

          $output .= '</span>';

          $output .= '</span>';

          if(get_sub_field('url')){
            $output .= '</a>';
          }

          $output .= '</div>';
      }

      $output .= '</div>';

      $output .= '<div class="persons">';

      $output .= '</div>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('crew_tiles', 'crew_tiles_func');

/**
 * Creation tiles shortcode
 */
function creation_tiles_func($atts, $content = null) {
    $atts = shortcode_atts(array(), $atts);

    $output = '';

    if(have_rows('tiles')){

      $output .= '<section id="creation-tiles" class="tiles">';

      $output .= '<div class="tiles-inner">';

      $i = 0;

      while(have_rows('tiles')){

          the_row();
          $i++;

          $img_src = wp_get_attachment_image_src(get_sub_field('image'), 'full', false);

          $output .= '<div class="item" style="background-image: url('. $img_src[0] .')">';

          $target = get_sub_field('new_window') ? 'target="_blank"' : '';

          if(get_sub_field('url')){
            $output .= '<a href="'. get_sub_field('url') .'" '. $target .'>';
          }

          $output .= '<img src="'. $img_src[0] .'" alt="'. get_sub_field('title') .'" class="img-responsive">';

          $output .= '<span class="overlay">';

          $output .= '<strong class="title">'. get_sub_field('title') .'</strong>';

          $output .= '</span>';

          if(get_sub_field('url')){
            $output .= '</a>';
          }

          $output .= '</div>';
      }

      $output .= '</div>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('creation_tiles', 'creation_tiles_func');

/**
 * Creation bottles shortcode
 */
function creation_bottles_func($atts, $content = null) {
    $atts = shortcode_atts(array(), $atts);

    $output = '';

    if(have_rows('bottles')){

      $output .= '<section id="creation-bottles">';

      $output .= '<div class="bottles-inner">';

      $i = 0;

      while(have_rows('bottles')){

          the_row();
          $i++;

          $output .= '<div class="item">';

          $output .= '<span class="overlay">';
          $output .= '<span class="range" data-perc="'. get_sub_field('fill_percentage') .'%">';
          $output .= '</span>';
          $output .= '</span>';

          $output .= '<strong class="title">'. get_sub_field('title') .'</strong>';

          $output .= '</div>';
      }

      $output .= '</div>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('creation_bottles', 'creation_bottles_func');

/**
 * Recognition carousel shortcode
 */
function recognition_carousel_func($atts, $content = null) {
    $atts = shortcode_atts(array(
      'timeout' => '5000',
      'items_in_row' => '4'
    ), $atts);

    $output = '';

    if(have_rows('carousel')){

      $output .= '<section id="recognition-carousel" class="carousel carousel-slide" data-ride="carousel" data-interval="'. $atts['timeout'] .'">';

      $output .= '<div class="carousel-inner">';

      $i = 0;

      while(have_rows('carousel')){

          the_row();
          $i++;
          $active = ($i == 1) ? 'active' : '';

          $img_src = wp_get_attachment_image_src(get_sub_field('image'), 'full', false);

          if($i == 1 || ($i-1)%$atts['items_in_row'] == 0){
            $output .= '<div class="item '. $active .'">';
            $output .= '<ul class="thumbnails">';
          }

          $output .= '<li>';

          $target = get_sub_field('new_window') ? 'target="_blank"' : '';

          if(get_sub_field('url')){
            $output .= '<a href="'. get_sub_field('url') .'" '. $target .'>';
          }

          $output .= '<img src="'. $img_src[0].'" alt="'. get_sub_field('title') .'" class="img-responsive">';

          if(get_sub_field('url')){
            $output .= '</a>';
          }

          $output .= '</li>';

          if($i == count(get_field('carousel')) || $i%$atts['items_in_row'] == 0){
            $output .= '</ul>';
            $output .= '</div>';
          }
      }

      $output .= '</div>';

      $output .= '<a class="left carousel-control" href="#recognition-carousel" role="button" data-slide="prev">';
      $output .= '<span class="glyphicon glyphicon-chevron-left"></span>';
      $output .= '</a>';
      $output .= '<a class="right carousel-control" href="#recognition-carousel" role="button" data-slide="next">';
      $output .= '<span class="glyphicon glyphicon-chevron-right"></span>';
      $output .= '</a>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('recognition_carousel', 'recognition_carousel_func');

/**
 * Recognition testimonials shortcode
 */
function recognition_testimonials_func($atts, $content = null) {
    $atts = shortcode_atts(array(
      'timeout' => '5000'
    ), $atts);

    $output = '';

    if(have_rows('testimonials')){

      $output .= '<section id="recognition-testimonials" class="carousel carousel-slide carousel-fade" data-ride="carousel" data-interval="'. $atts['timeout'] .'">';

      $output .= '<span class="icon icon-quote-left"></span>';

      $output .= '<div class="carousel-inner">';

      $i = 0;

      while(have_rows('testimonials')){

          the_row();
          $i++;
          $active = ($i == 1) ? 'active' : '';

          $output .= '<div class="item '. $active .'">';

          $output .= '<blockquote>';

          $output .= '<cite>'. get_sub_field('author') .'</cite>';

          $output .= '<p>'. get_sub_field('quote') .'</p>';

          $output .= '</blockquote>';

          $output .= '</div>';
      }

      $output .= '</div>';

      $output .= '<span class="icon icon-quote-right"></span>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('recognition_testimonials', 'recognition_testimonials_func');

/**
 * Contacts shortcode
 */
function show_contacts_func($atts, $content = null) {
    $atts = shortcode_atts(array(), $atts);

    $output = '';

    if(get_field('address', 'options') || have_rows('contacts', 'options')){

      $output .= '<section id="contact-info">';

      $output .= '<div class="row">';


      if(get_field('address', 'options')){
        $output .= '<div class="address col-sm-5">'. get_field('address', 'options') .'</div>';
      }

      if(have_rows('contacts', 'options')){

        $output .= '<div class="col-sm-7">';

        $output .= '<ul class="contacts">';

        $i = 0;

        while(have_rows('contacts', 'options')){

            the_row();
            $i++;

            $target = get_sub_field('new_widnow') ? 'target="_blank"' : '';

            $output .= '<li>';

            if(get_sub_field('url')){
              $output .= '<a href="'. get_sub_field('url') .'" '. $target .'>';
            } else{
              $output .= '<span class="text">';
            }

            if(get_sub_field('icon_slug')){
              $output .= '<span class="icon '. get_sub_field('icon_slug') .'"></span>';
            }

            $output .= get_sub_field('text');

            if(get_sub_field('url')){
              $output .= '</a>';
            } else{
              $output .= '</span>';
            }

            $output .= '</li>';
        }

        $output .= '</ul>';

        $output .= '</div>';

      }

      $output .= '</div>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('contacts', 'show_contacts_func');

/**
 * Google maps shortcode
 */
function show_map_func($atts, $content = null) {
    $atts = shortcode_atts(array(), $atts);

    $output = '';

    if(get_field('latitude', 'options') && get_field('longitude', 'options')){

      $output .= '<section id="map_holder">';

      $output .= '<div class="wrapper" id="map">';

      $thumb = wp_get_attachment_image_src( get_field('map_placeholder', 'options'), 'full');

      if($thumb){
        $output .= '<img src="'. $thumb[0] .'" alt="location" title="Click to view interactive map" class="img-responsive"/>';
      }

      $output .= '</div>';

      $output .= '</section>';

    }

    return $output;
}

add_shortcode('map', 'show_map_func');
