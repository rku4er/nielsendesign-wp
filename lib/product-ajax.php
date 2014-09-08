<?php
/**
 * Ajax for Products
 *
 */

add_action("wp_ajax_getProducts", "getProducts");
add_action("wp_ajax_nopriv_getProducts", "getProducts");

function getProducts(){

    $args = array(
        'post_type'        => 'product',
        'orderby'          => 'post_date',
        'order'            => 'DESC',
        'posts_per_page'   => -1,
    );

    $posts = get_posts($args);

    $output = '';

    $output .= '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    $output .= '<div class="modal-dialog modal-lg">';
    $output .= '<div class="modal-content">';

    $output .= '<div class="modal-header">';
        $output .= '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
        $output .= '<h4 class="modal-title" id="myModalLabel">Products</h4>';
    $output .= '</div>';

    $output .= '<div class="modal-body">';

        if($posts){

          $output .= '<section id="product-gallery" class="carousel carousel-slide" data-ride="carousel" data-interval="0">';

          $output .= '<div class="carousel-inner">';

          $i = 0;

          foreach($posts as $post){
            setup_postdata($post);
            $i++;

            $isActive = ($i == 1) ? 'active' : '';

            $output .= '<div class="item '. $isActive .'">';

            $output .= '<h2 class="text-center">'. $post->post_title .'</h2> <br>';

            $post_thumbnail_id = get_post_thumbnail_id( $post->ID );
            $imgSrc = wp_get_attachment_image_src( $post_thumbnail_id, 'lightbox-products', false );

            $output .= '<img src="'. $imgSrc[0] .'" alt="">';

            $output .= '</div>';

          }

          wp_reset_postdata();

          $output .= '</div>';

          $output .= '<a class="left carousel-control" href="#product-gallery" role="button" data-slide="prev">';
          $output .= '<span class="glyphicon glyphicon-chevron-left"></span>';
          $output .= '</a>';

          $output .= '<a class="right carousel-control" href="#product-gallery" role="button" data-slide="next">';
          $output .= '<span class="glyphicon glyphicon-chevron-right"></span>';
          $output .= '</a>';

          $output .= '</section>';

        }

    $output .= '</div>';

    $output .= '</div>';
    $output .= '</div>';
    $output .= '</div>';

    echo $output;


    die();
}