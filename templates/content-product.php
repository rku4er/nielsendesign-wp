<?php while (have_posts()) : the_post(); ?>
  <article <?php post_class('container'); ?>>

    <header>
      <h1 class="page-header"><?php the_title(); ?></h1>
    </header>

    <div class="entry-content">
      <?php the_content(); ?>
      <br>
      <?php
        $ID = get_the_ID();

        $post = get_post($ID);

        $output = '';

        if(have_rows('gallery', $ID)){

          $output .= '<section id="product-gallery-'. $ID .'" class="carousel carousel-slide" data-ride="carousel" data-interval="0">';

          $output .= '<div class="carousel-inner">';

          $i = 0;

          while(have_rows('gallery', $ID)){
            the_row();
            $i++;

            $isActive = ($i == 1) ? 'active' : '';

            $output .= '<div class="item '. $isActive .'">';

            $imgSrc = wp_get_attachment_image_src( get_sub_field('image'), 'lightbox-products', false );

            $output .= '<img src="'. $imgSrc[0] .'" alt="">';

            $output .= '</div>';

          }

          $output .= '</div>';

          $output .= '<a class="left carousel-control" href="#product-gallery-'. $ID .'" role="button" data-slide="prev">';
          $output .= '<span class="glyphicon glyphicon-chevron-left"></span>';
          $output .= '</a>';

          $output .= '<a class="right carousel-control" href="#product-gallery-'. $ID .'" role="button" data-slide="next">';
          $output .= '<span class="glyphicon glyphicon-chevron-right"></span>';
          $output .= '</a>';

          $output .= '</section>';

        }

        echo $output;
    ?>
    </div>

    <footer>
      <br>
      <br>
      <div class="text-center"><a href="<?php echo get_bloginfo('url') ?>/showcase/" class="btn btn-primary" style="border-radius: 0; font-size: 20px">Return to showcase</a></div>
      <br>
      <br>
    </footer>

  </article>
<?php endwhile; ?>
