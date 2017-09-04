<?php global $core; ?>
<div id="navbar1" class="navbar navbar-fixed-top navbar-default" role="navigation">
    <div class="container">
        <div class="navbar-header navbar-left">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
                <img src="/img/logo_h.svg" height="42" />
            </a>
            <div class="loader"></div>
            <div class="d-mobile-header visible-xs"><span class="get-title">ООО "Кибор"</span></div>
        </div>
        <div class="collapse navbar-collapse ">
            <ul class="nav navbar-nav navbar-right">
                <li class="active"><a href="/">Главная</a></li>
                <li><a href="/about">О компании</a></li>
                <li><a href="/news">Новости</a></li>
                <li><a href="/offer">Тарифы</a></li>
                <li><a href="/info">Информация</a></li>
                <li class="callback"><button onclick="$('#modal-callback').modal('show');" class="btn btn-primary notab noajax">Обратная связь</button></li>
            </ul>
            <hr id="topnav_underline">
        </div>
        <!-- /.nav-collapse -->
    </div>
    <!-- /.container -->
</div>
<!-- /.navbar -->