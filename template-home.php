<?php
/*
Template Name: Home
*/
?>

<div class="panel" id="panel-home">
    <div class="inner">
        <div class="container">
            <h1 class="brand-name"><?php echo get_bloginfo('name'); ?></h1>
            <p class="brand-description"><?php echo get_bloginfo('description'); ?></p>
        </div>
        <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('templates/content', 'page'); ?>
        <?php endwhile; ?>
    </div>
</div>

<?php
    $menu_name = 'primary_navigation';

    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {

        $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

        $menu_items = wp_get_nav_menu_items($menu->term_id);

        foreach($menu_items as $item){
            $post = get_post($item->object_id);
            setup_postdata($post);
            echo '<div class="panel" id="panel-' . $post->post_name . '">';
            echo '<div class="inner">';
            echo '<div class="container"><h2 class="panel-title">' . get_the_title() . '</h2></div>';
            the_content();
            echo '</div>';
            echo '</div>';
        }
        wp_reset_postdata();
    }
?>