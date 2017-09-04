<div class="container">
  <?php

  function post_post(){
    global $p, $cfg;

    if(empty($p['post'])){
      post_error:
      echo '<h1>Страница не найдена</h1>';
      exit();
    }
    $post = $p['post'];
    $file = $cfg['root']."post\\".(cu($post)).'.html';
    
    if(file_exists($file)){
        include $file;
    } else {
      goto post_error;
    }


  }
  post_post();
   ?>
</div>
