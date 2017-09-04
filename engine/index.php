<?php require_once "./core/core.php"; ?><!DOCTYPE html>
<html lang="ru">
<head>
    <?php $core->RenderBlock('head'); ?>
</head>
<body>
    <?php $core->RenderHeader(); ?>
    <div class="container-fluid" id="dynamicBody">
        <?php $core->Content(); ?>
    </div>

    <?php $core->RenderFooter(); ?>
    <!--plugins-->

</body>

</html>