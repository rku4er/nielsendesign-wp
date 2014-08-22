<?php
/*
Template Name: Home
*/
?>

<div id="fullpage">

    <div class="section">
        <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('templates/page', 'header'); ?>
            <?php get_template_part('templates/content', 'page'); ?>
        <?php endwhile; ?>
    </div>

    <?php
        $menu_name = 'primary_navigation';

        if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {

            $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

            $menu_args = array(
                'order'                  => 'ASC',
                'orderby'                => 'menu_order',
                'post_type'              => 'nav_menu_item',
                'post_status'            => 'publish',
                'output'                 => ARRAY_A,
                'output_key'             => 'menu_order',
                'nopaging'               => true,
            );

            $menu_items = wp_get_nav_menu_items($menu->term_id, $menu_args);

            foreach($menu_items as $item){
                $post = get_post($item->object_id);
                setup_postdata($post);
                echo '<div class="section">';
                echo '<h2>' . get_the_title() . '</h2>';
                the_content();
                echo '</div>';
            }
            wp_reset_postdata();

        }
    ?>


    <script>
        $(function(){
          //anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
            //'slidesColor': ['#4A6FB1', '#939FAA', '#323539'],
            //'scrollOverflow': true

            $('#menu-main-menu a').each(function(){
                var href = $(this).attr('href');
                var expr = /\w*-?\w*(?=\/$)/gi;
                $(this).attr('href', '#' + href.match(expr)[0]);
            });

          $('#fullpage').fullpage({
            verticalCentered: true,
            resize : false,
            sectionsColor : ['#4A6FB1', '#939FAA', '#323539'],
            anchors: ['home', 'nielsen-design', 'showcase', 'crew', 'creation', 'recognition', 'contact'],
            menu: '#navbar', //'#menu-main-menu'
            scrollingSpeed: 700,
            easing: 'easeInQuart',
            navigation: false,
            navigationPosition: 'right',
            navigationTooltips: ['home', 'nielsen-design', 'showcase', 'crew', 'creation', 'recognition', 'contact'],
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            autoScrolling: true,
            scrollOverflow: true,
            css3: true,
            paddingTop: '0',
            paddingBottom: '50px',
            normalScrollElements: '#element1, .element2',
            normalScrollElementTouchThreshold: 5,
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
        });
    </script>


</div>