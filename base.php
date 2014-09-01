<?php get_template_part('templates/head'); ?>
<body <?php body_class(); ?> data-template-path="<?php echo get_template_directory_uri(); ?>">

  <!--[if lt IE 8]>
    <div class="alert alert-warning">
      <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'roots'); ?>
    </div>
  <![endif]-->

  <?php
    do_action('get_header');
    get_template_part('templates/header');
  ?>

  <div class="wrap" role="document">
    <?php if(get_page_template_slug( get_the_ID() ) != 'template-home.php'): ?><div class="container"><?php endif; ?>
      <div class="content row">
        <main class="main <?php echo roots_main_class(); ?>" role="main">
          <?php include roots_template_path(); ?>
        </main><!-- /.main -->
        <?php if (roots_display_sidebar()) : ?>
          <aside class="sidebar <?php echo roots_sidebar_class(); ?>" role="complementary">
            <?php include roots_sidebar_path(); ?>
          </aside><!-- /.sidebar -->
        <?php endif; ?>
      </div><!-- /.content -->
    <?php if(get_page_template_slug( get_the_ID() ) != 'template-home.php'): ?></div><?php endif; ?>
    <?php get_template_part('templates/footer'); ?>

  </div><!-- /.wrap -->


  <!-- Livereload page -->
  <script src="//localhost:35729/livereload.js"></script>

</body>
</html>
