<?php if(have_rows('contacts', 'options')): ?>
<nav id="navbar" class="navbar-contacts navbar navbar-default navbar-fixed-top" role="banner">
    <div class="container">
        <ul class="nav navbar-nav navbar-right">
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
            <li>
                <?php get_search_form(); ?>
            </li>
        </ul>
    </div>
    <div class="navbar-brand">
        <div class="container">
            <?php if(is_front_page()): ?>
            <h1 class="brand-name">
                <a href="#panel-home"><?php echo get_bloginfo('name'); ?></a>
            </h1>
            <?php else: ?>
            <strong class="brand-name">
                <a href="<?php echo get_bloginfo('url'); ?>"><?php echo get_bloginfo('name'); ?></a>
            </strong>
            <?php endif; ?>
            <p class="brand-description"><?php echo get_bloginfo('description'); ?></p>
        </div>
    </div>
</nav>
<?php endif; ?>

<header id="mainnav" class="navbar-menu navbar navbar-default navbar-fixed-bottom" role="banner">
  <div class="container">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <nav class="collapse navbar-collapse" role="navigation">
      <?php
        if (has_nav_menu('primary_navigation')) :
          wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'nav navbar-nav'));
        endif;
      ?>
    </nav>

  </div>
</header>