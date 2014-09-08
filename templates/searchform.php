<form role="search" method="get" class="search-form navbar-form form-inline" action="<?php echo esc_url(home_url('/')); ?>">
  <label class="sr-only"><?php _e('Search for:', 'roots'); ?></label>
  <div class="form-group">
    <input type="search" value="<?php echo get_search_query(); ?>" name="s" class="search-field form-control" placeholder="<?php _e('Search', 'roots'); ?>">
    <button type="submit" class="search-submit btn btn-default"><span class="icon icon-search"></span></button>
  </div>
</form>
