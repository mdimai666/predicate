<?php global $core; ?>

<div class="pull-right" style="color:white;">
  <a class="btn btn-primary" href="/admin/_materials-editor"><i class="glyphicon glyphicon-plus"></i>Создать новый</a>  
</div>


<table class="table table-hover">
  <thead>
    <tr>
        <td style="width:43px;">
            <strong>№</strong><br />
        <td width="*">
            <strong>Название</strong></td>
        <td width="5%">
            <strong>Дата</strong></td>
        <td width="5%">
            <strong>Статус</strong></td>
        <td width="5%">
            <strong>Инструменты</strong></td>
    </tr>
</thead>

<tbody>
    <?php 

    $news = $core->db->PostList(50,'staticpage',false);
    if(!empty($news)):
        foreach($news as $n):
        ?>
        <tr data-id="<?=$n['id'] ?>">
        <td><?=$n['id'] ?></td>
        <td><a href="/admin/_materials-editor/<?=$n['id'] ?>"><?=$n['post_title'] ?></a></td>
        <td><?=$n['post_date'] ?></td>
        <td><?=$n['post_status'] ?></td>
        <td>
            <button class="btn" data-id="<?=$n['id']?>" onclick="js_delete(<?=$n['id']?>)">Удалить</button>
        </td>
        </tr>
        <?php endforeach; ?>
    <?php else: ?>
        <tr><td colspan="5" ><h3>Нет материалов</h3></td></tr>
    <?php endif; ?>
  </tbody>
</table>
        
<script>
    function js_delete(id){

        core.news.delete(id, function(data){
            if(data.result==='ok')
                $("tr[data-id="+id+"]").remove();
        });

    }
</script>        