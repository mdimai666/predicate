<?php global $core; ?>
<div id="navbar1" class="navbar navbar-fixed-top navbar-default navbar-admin" role="navigation">
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
            <ul class="nav navbar-nav navbar-left">
                <li class="active"><a href="/admin/index">Главная</a></li>
                <!--<li><a href="/admin/table">Таблицы</a></li>-->
                <li><a>|</a></li>
                <li><a href="/" class="noajax">На сайт</a></li>
            </ul>
            <hr id="topnav_underline">
            <form method="POST" action="?" class="login-form pull-right">
                <span><?=$core->user->Login(); ?></span>
                <input type="hidden" name="action" value="logout"/>
                <a type="submit" onclick="core.logout();">[Выход]</a>
            </form>
        </div>
        <!-- /.nav-collapse -->
    </div>
    <!-- /.container -->
</div>
<!-- /.navbar -->