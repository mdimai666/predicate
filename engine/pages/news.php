<?php global $core; ?>


    <?php
    $id = $core->Uri(1);
    $id = empty($id)?null:$id;
    $mode = empty($_GET['mode'])?'':$_GET['mode'];

    if (!empty($id)) {
        $item = $core->db->PostById($id);
        if (!$item) {
            postNotFound();
        } else {
            renderPost($item);
        };
    } else if(empty($mode)):
    ?>
    
    <!--<div class="row">-->
    <div class="col-xs-12 vis-blocks-ani">
    <div class="col-xs-12">
        <h2 class="page-header">Новости</h2>
    </div>
    <!--</div>-->
    <div id="news_body">
        <?php
        $count = def($_POST, 'news_count', 6);
        $last_id = def($_POST, 'last_id', -1);
        $a = $core->db->NewsFeed_ajax($count, $last_id);
        
        $c = 0;
        if ($a!=null) {
            foreach ($a as $i) {
                if ($c==0) {
                    // write_row_b();
                }
                $m[] = $i;
                write_col($i);

                $c++;
                if ($c>2) {
                    $c=0;
                    // write_row_e();
                }
            }
        }

 
    ?>
    </div>
    <div class="col-xs-12">
        <p align="center">
            <button id="more_news_button" class="btn btn2" onclick="more_news()">Читать дальше</button>

            <script>

                $(function(){
                    if(<?=(count($a)<$count)?'true':'false';?>)
                        $('#more_news_button').hide();
                });

                function more_news() {
                    var id = $('.d-news-post-block').last().attr('data-id');
                    var called_count = 6;
                    $.post("/news", {
                        ajax: true,
                        news_count: called_count,
                        last_id: id
                    }, function (data) {
                        var count = $('.d-news-post-block', data).length;
                        if(count>0)
                            $('#news_body').append($('#news_body', data).html());
                        if(count<called_count)
                            $('#more_news_button').hide();
                    });
                }

            </script>
        </p>
    </div>
    </div>

    <?php
    else:
        ?>
    <!--mode="moree"-->
    <?php
    endif;
?>

<!--/container-->


<?php
////////////
//FUNCTIONS
////////////

function write_col($item)
{
    global $core;
?>
    <div class="col-md-4 col-sm-6 col-xs-12 ">
        <div class="row">
            <div class="col-sm-12">
                <!--content-->
                <?php
                    $imgs = $item['post_images'];
                    $img1 = explode(',', $imgs)[0];
                    $st = empty($img1)?'':'style="background-image: url('.$img1.')"';
                    $src = (empty($img1))?'none':('src="'.$img1.'"');
                ?>
                <div class="d-news-post-block" data-id="<?=$item['id']; ?>">

                    <div class="thumbnail" style="min-height:250px;">
                        <div class="t_content">
                            <div class="caption">
                                <!--<h3>Caption</h3>-->
                                <div class="row">
                                    <div class="col-xs-12">
                                        <h1><a href="/news/<?=$item['id']; ?>"><?=$item['post_title']; ?></h1></a>
                                    </div>
                                    <!--<div class="col-xs-3">-->
                                        
                                    <!--</div>-->
                                </div>
                            </div>

                            <?php if(empty($img1)): ?>
                                <div class="emptyimage" alt=""><?=strip_tags($item['post_content']);?></div>
                            <?php else: ?>
                                <!--<img < ?=$src; ?> class="img-responsive" alt="">-->
                                <div class="imgcontainer" <?=$st; ?> class="img-responsive" alt=""></div>
                            <?php endif; ?>
                            <div class="link-div">
                                <a href="/news/<?=$item['id']; ?>" class="1btn 1btn-primary 1pull-right link " role="button">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/content-->
            </div>
        </div>
    </div>


    <?php
}//write_col

function write_row_b()
{
?>
<div class="row row-eq-height">
    <!--3 block-->
<?php
}
function write_row_e()
{
    ?>
    </div>
    <!--/ 3 block-->
    <?php
}//write_row


function postNotFound()
{
    echo "<h1>Пост не найден</h1><h3>Ошибка 404</h3>";
}
        
function renderPost($item)
{
    global $core;

    $imgs = $item['post_images'];
    $img1 = explode(',', $imgs)[0];
    $link = $core->img->Uimg($img1);

    ?>
    <div class="row d-news-post-single">
            
        <div class="row">
            <div class="col-xs-12">
                <div id="main_title">
                <h1><?=$item['post_title']; ?></h1>
                </div>
            </div>
        </div>

        
        <div class="col-xs-12 col-sm-2">
        <strong><i class="source"><?=$item['post_source']; ?></i></strong>
            <br>
        <?=($item['post_date']); ?>
        </div>

        <div class="col-xs-12 col-sm-8">
            <div class="row">
                <div class="col-xs-12 col-sm-10 col-sm-offset-1">
                    <div class="post_content">
                    <?=$item['post_content']; ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-2 hidden-xs">
        </div>
        </div>
    <?php
}
?>
