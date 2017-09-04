<?php global $core, $cfg; ?>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="mdimai666@mail.ru">
<link rel="icon" href="favicon.ico" type="image/x-icon">

<title>Predicate</title>

<meta name="description" content="description" />
<meta name="theme-color" content="#FFF">

<!--FONT-->
<!--<link href="https://fonts.googleapis.com/css?family=PT+Serif" rel="stylesheet">-->
<!--<link href="http://allfont.ru/allfont.css?fonts=freeset-cyrillic" rel="stylesheet" type="text/css" />-->
<link href="https://fonts.googleapis.com/css?family=Roboto:300,500,800" rel="stylesheet">

<!--  CSS -->
<link href="/styles/bootstrap.min.css" rel="stylesheet">
<link href="/styles/toastr.min.css" rel="stylesheet">
<!-- <link href="/styles/offcanvas.css" rel="stylesheet"> -->

<!--Scripts-->
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
<script src="/scripts/jquery-2.2.2.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

<script src="/scripts/bootstrap.min.js"></script>
<script src="/scripts/toastr.min.js"></script>
<?php
       echo '<script>';
       echo 'var corep = {};';

        if(!empty($cfg['js']))
            foreach($cfg['js'] as $k => $v)
                echo 'corep.'.$k.' = '.var_export($v,true).';';
        echo '</script>';
        
       ?>
    <script src="/scripts/core.js"></script>
    <script src="/scripts/script.js"></script>
    <!--Modules-->
    <script src="/modules/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="/modules/bootstrap-table/bootstrap-table-ru-RU.min.js"></script>

    <?php if ($core->isAdminPage) : ?>
    <!--Modules-->
    <script src="/modules/tinymce/jquery.tinymce.min.js"></script>
    <script src="/modules/tinymce/tinymce.min.js"></script>
    <?php endif; ?>

    <!--Modules-->
    <link href="/modules/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <?php if ($core->isAdminPage) : ?>
    <!--Modules-->
    <link href="/modules/tinymce/skins/lightgray/skin.min.css" rel="stylesheet">
    <?php endif; ?>

    <!--Self-->
    <link href="/styles/style1.css" rel="stylesheet">