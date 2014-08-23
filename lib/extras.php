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
    }

    $output .= '</section>';

    return $output;
}

add_shortcode('home_slider', 'home_slider_func');