<?php
/*
Template Name: Home
*/
?>

<style>
    html, body {
        margin: 0;
        padding: 0;
        overflow:hidden;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
</style>

<div id="fullpage">

    <div class="section" id="section-home">
        <?php if(have_rows('contacts', 'options')): ?>
        <nav class="navbar-contacts navbar navbar-default">
            <div class="container">
                <ul class="nav navbar-nav">
                <?php while(have_rows('contacts', 'options')): the_row(); ?>
                    <li>
                        <?php if(get_sub_field('url')): ?>
                            <a href="<?php echo get_sub_field('url'); ?>" <?php if(get_sub_field('new_widnow')) echo 'target="_blank"'; ?>>
                        <?php else: ?>
                            <span class="navbar-text">
                        <?php endif; ?>

                        <?php if(get_sub_field('icon_slug')): ?>
                            <span class="icon <?php echo get_sub_field('icon_slug'); ?>"></span>
                        <?php endif; ?>

                        <?php echo get_sub_field('text'); ?>

                        <?php if(get_sub_field('url')): ?>
                            </a>
                        <?php else: ?>
                            </span>
                        <?php endif; ?>
                    </li>
                <?php endwhile; ?>
                </ul>
            </div>
        </nav>
        <?php endif; ?>

        <div class="container">
            <h1 class="brand-name"><?php echo get_bloginfo('name'); ?></h1>
            <p class="brand-description"><?php echo get_bloginfo('description'); ?></p>
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
                echo '<div class="section" id="section-' . $post->post_name . '">';
                echo '<div class="container">';
                echo '<h2 class="section-title">' . get_the_title() . '</h2>';
                the_content();
                echo '</div>';
                echo '</div>';
            }
            wp_reset_postdata();
        }
    ?>

</div>