<?php global $core; 

function start(){
    global $core;

    $file = './upload'.'/'.implode('/', array_splice(explode('/',$core->Uri()),1));
    if(file_exists($file))
      file_force_download($file);
    else
      fileNotFound($file);

}

function file_force_download($file) {
    header('X-SendFile: ' . realpath($file));
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' . basename($file));
    exit;
}

function fileNotFound($file){
  ?>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <div class="sysmessage">
          <h1>Файл не найден</h1>
          <p>По ссылке файла <strong>"<?=basename($file)?>"</strong> не существует</p>
        </div>
      </div>
    </div>
  </div>
  <?php
}

start();