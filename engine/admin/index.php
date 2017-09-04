<?php global $core; ?>
<?php
  function showErrors(){
    $er = error_get_last();
    if($er == null)return;
    $er = json_encode($er);
    echo "<script>toastr['error'](core.util.dump($er), 'PHP Error:');</script>";
  }
  showErrors();
?>
<div class="row row-offcanvas row-offcanvas-right">


  <!--sidebar-->
  <div class="sidebar col-xs-6 col-sm-3 sidebar-offcanvas" role="navigation">
    <div class="list-group">
      <a href="#status" class="list-group-item active">Статус</a>
      <!--<a href="#preferences" class="list-group-item">Настройки</a>-->
      <a href="#posts" class="list-group-item">Материалы</a>
      <a href="#editor" class="list-group-item">Страницы</a>
    </div>
  </div><!--/sidebar-->

  <div class="col-xs-12 col-sm-9">
    <p class="pull-right visible-xs d-offcanvas-button-toggle">
      <button type="button" class="btn btn-primary btn-lg" data-toggle="offcanvas">Все разделы</button>
    </p>
    
    <!--ROWS-->
    <div class="vis-blocks active" id="status">
      <h2>Статус</h2>      
      
      <?php $core->RenderHtml('1.about'); ?>
      
    </div>
    <div class="vis-blocks" id="preferences">
      <h2>Настройки</h2>
      Текст

      <button class="btn" onclick="testApi()">Тест api</button>
      <script>
        function testApi(){
          core.api('admin',{action:'loginname'},function(data){},true);
        }

      </script>
    </div>
    <div class="vis-blocks" id="posts">
      <div class="col-xs-12">        
        <h2>Материалы</h2>
        <?php include "_materials.php"; ?>
      </div>
    </div>
    <div class="vis-blocks" id="editor">
      <div class="col-xs-12">        
        <h2>Страницы</h2>
        <?php
          include "_pages.php"; 
          // $core->Render('admin/blocks/editor.php');
        ?>
      </div>
    </div>
    <!--/ROWS-->

  </div><!--/span-->

  
</div><!--/row-->
