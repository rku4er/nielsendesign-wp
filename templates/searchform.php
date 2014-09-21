<form role="search" method="get" class="search-form navbar-form form-inline" action="<?php echo esc_url(home_url('/')); ?>">
  <div class="form-group">
      <label for="search-field"><span class="icon icon-search"></span></label>
      <input id="search-field" type="search" value="<?php echo get_search_query(); ?>" name="s" class="form-control" placeholder="<?php _e('Search', 'roots'); ?>">
  </div>
</form>
