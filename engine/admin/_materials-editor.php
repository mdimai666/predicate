<?php global $core; ?>

<?php
  $postId = -1;
  $mode = 'new';
  $saveLink = '';

  global $post;

if (!empty($core->Uri(2))) {
    $postId = $core->Uri(2);
    $mode = 'edit';
}
$post = array();
if ($mode==='edit') {
    $post = $core->db->PostById($postId);
    ////id,post_title,post_content,post_date,post_seen_count,post_comment_count
    echo "<input type=\"hidden\" id=\"buffer-title\" value=\"{$post['post_title']}\">";
    echo "<textarea class=\"hidden\" id=\"buffer-text\">{$post['post_content']}</textarea>";
}

?>

  <div class="container">
    <div class="editor-toolbar" data-mode="<?=$mode;?>" data-postId="<?=$postId;?>">
      <button class="btn btn-default <?=($mode=='new')?'hidden':''; ?>" onclick="js_zmydelete()" btn-action="delete">Удалить</button>
      <a class="btn btn-default" href="/admin/index#posts"><i class="glyphicon glyphicon-remove-sign"></i> Закрыть</a>
      <button onclick="js_zmysave()" class="btn btn-primary"><i class="glyphicon glyphicon-floppy-disk"></i> Сохранить</button>
    </div>

    <div class="row">
      <div class="col-sm-8 col-xs-12 col-sm-offset-1">
        <!--editor-->
        <?php $core->RenderBlock('editor', './admin/blocks') ?>

        <button data-toggle="collapse" data-target="#style_hints">Подсказки</button>
        <div id="style_hints" class="collapse">
        <p>Для стилизации таблиц - <b><?=htmlspecialchars ('<table class="table table-hover">');?></b></p>
        <p>Рамки - <b><?=htmlspecialchars ('<table class="well well-sm">');?></b></p>
        <p>Скролл - <b><?=htmlspecialchars ('<table class="scroll-x">');?></b></p>
        <p>Кнопка скачивания - <b><?=htmlspecialchars ('<a class="btn btn-primary" href="../download/docs/agence_dog.doc"><i class="glyphicon glyphicon-download"> Скачать</i></a>');?></b></p>
        </div>

      </div>

      <div class="col-sm-3 col-xs-12">
        <!-- post params-->
        <br><br>
        <!--attributes-->
        <div class="panel panel-default">
          <div class="panel-heading">Сведения</div>
          <div class="panel-body">
            <div class="form-group">
              ID: 
              <?=def($post,'id',''); ?>
            </div>
            <div class="form-group">
              ссылка: <a href="/news/<?=def($post,'id',''); ?>">/news/<?=def($post,'id',''); ?></a>
            </div>
            <div class="form-group">
              Дата:
              <?=def($post, 'post_date',''); ?>
            </div>
            <div class="form-group">
              Дата изменения:
              <?=def($post, 'post_modified',''); ?>
            </div>
          </div>
        </div>
        <!--settings-->

        <div class="panel panel-default">
          <div class="panel-heading">Настройки</div>
          <div class="panel-body">

            <div class="form-group">
              <label><input type="checkbox" <?= (def($post,'post_status','publish')=='publish')?' checked ':''; ?> id="f_post_status"> Опубликовать</label>
            </div>

            <div class="form-group">
              <label><input type="checkbox" <?= (def($post,'post_on_main',true))?' checked ':''; ?> id="f_post_on_main"> На главной</label>
            </div>

            <div class="form-group">
              <label>
                Источник: 
                <input type="text" class="form-control" id="f_post_source" placeholder="" value="<?= (def($post,'post_source',''))?>">
              </label>
            </div>

            <div class="form-group">
              Тип: 
              <div class="dropdown" id="f_post_type" data-value="<?=def($post, 'post_type','post'); ?>">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                Тип
                <span class="caret"></span>
              </button>

                <ul class="dropdown-menu">
                  <li><a data-value="post">Новость </a></li>
                  <li><a data-value="staticpage">Страница</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- //post params-->
      </div>
    </div>


  </div>

  <script>
    var editor_mode;
    $(document).ready(function () {
      editor_mode = $('.editor-toolbar').attr('data-mode');

      if (editor_mode === 'edit') {
        var $t = $('#buffer-title');
        var $b = $('#buffer-text');
        $('#edit1').val($t.val());
        $('#memo1').val($b.val());
      }
    });

    function js_zmysave() {
      if (edit1.value.length < 1) {
        toastr['error']('редактор', 'Название заголовка должно быть длиннее 5 символов');
        return 0;
      }

      //  var _data = tinyMCE.activeEditor.getContent()
      var _data = tinyMCE.activeEditor.getContent({
        format: 'raw'
      });

      var imgs = [];

      $('img', _data).each(function(){
        imgs[imgs.length] = $(this).attr('src');
      });
      imgs = imgs.join(',');

      var post = {
        post_content: _data,
        post_title: $('#edit1').val(),
        post_type: $('#f_post_type').attr('data-value'),
        post_status: $('#f_post_status').is(':checked')?'publish':'unpublish',
        post_on_main: $('#f_post_on_main').is(':checked'),
        post_source: $('#f_post_source').val(),
        post_images: imgs,
      }

      var pid = $('.editor-toolbar').attr('data-postId');
      if (pid !== '') post.id = pid * 1;

      var action = (editor_mode === 'edit') ? 'save' : 'add';

      core.api('editor', {
        action: action,
        post: post
      }, function (data) {
        if (data.result === 'ok') {
          toastr['success']('Сохранено', data.message);
          if (action === 'add')
            // core.load('/'+data.newid);
            core.pushLocation(data.newid);
          editor_mode = 'edit';
          $('.editor-toolbar').attr('data-mode', editor_mode);
          $('.editor-toolbar').attr('data-postId', data.newid);
          $(".btn[btn-action='delete']").removeClass('hidden');

        } else {
          toastr['error']('Ошибка сохранения', data.message);
        }
      });

    }

    function js_zmydelete() {
      var pid = $('.editor-toolbar').attr('data-postId');
      core.news.delete(pid, function (data) {
        console.log(data);
        if (data.result === 'ok') core.nav('/admin/index#posts');
      });



    }

    $(function () {

      $(".dropdown-menu").on('click', 'li a', function (data) {
        var $p = $(this).parent().parent().parent();
        $a = $(this);
        var caret = ' <span class="caret"></span>';
        // $(".btn:first-child", $p).text($(this).text());
        $(".btn:first-child", $p).html($a.text()+caret);
        $p.attr('data-value',$a.attr('data-value'));
      });

      $(".dropdown").each(function(e,i){
        var $t = $(this);
        var v = $t.attr('data-value');
        if(!v)return;
        var $a = $('a[data-value="'+v+'"');
        var caret = ' <span class="caret"></span>';
        $(".btn:first-child", $t).html($a.text()+caret);
      });
    });
  </script>