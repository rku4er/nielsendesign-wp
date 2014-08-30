<?php
/**
 * Ajax for Products
 *
 */
add_action("wp_ajax_getProductInfo", "getProductInfo");
add_action("wp_ajax_nopriv_getProductInfo", "getProductInfo");

function getProductInfo(){
    $ID = $_POST['id'];

    $post = get_post($ID);

    $output = '';

    $output .= '<h2>'. $post->post_title .'</h2>';
    $output .= '<div class="content">'. $post->post_content .'</div>';

    echo $output;


    die();
}