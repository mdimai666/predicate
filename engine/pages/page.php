<?php  global $core; ?>

<div class="container">

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
    } else {
        ;
    }
    ?>

</div>
<!--/container-->


<?php
////////////
//FUNCTIONS
////////////

function postNotFound()
{
    global $core;
    $core->ErrorHtml();
}
        
function renderPost($item)
{
    global $core;

    // $imgs = $item['post_images'];
    // $img1 = explode(',', $imgs)[0];
    // $link = $core->img->Uimg($img1);

    ?>
    <div class="row d-news-post-single">

        <div class="row">
            <div class="col-xs-12 col-sm-2">
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
    </div>
    <?php
}
?>