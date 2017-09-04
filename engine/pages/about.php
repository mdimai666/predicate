<?php global $core; ?>
<div class="row row-offcanvas row-offcanvas-right vis-blocks-ani">


  <!--sidebar-->
  <div class="sidebar col-xs-6 col-sm-3 sidebar-offcanvas " role="navigation">
    <div class="list-group">
      <a href="#about" class="list-group-item active">
        <i class="glyphicon glyphicon-briefcase"></i> О компании</a>
      <a href="#fond" class="list-group-item">
        <i class="glyphicon glyphicon-th-list"></i> Обслуживающий фонд</a>
      <a href="#rekvizit" class="list-group-item">
        <i class="glyphicon glyphicon-envelope"></i> Реквизиты</a>
      <a href="#docs" class="list-group-item">
        <i class="glyphicon glyphicon-file"></i> Документация</a>
      <a href="#report" class="list-group-item">
        <i class="glyphicon glyphicon-signal"></i> Отчеты</a>
      <a href="#contacts" class="list-group-item">
        <i class="glyphicon glyphicon-earphone"></i> Контакты</a>
    </div>
  </div>
  <!--/sidebar-->

  <div class="col-xs-12 col-sm-9">
    <!--toggle button-->
    <p class="pull-right visible-xs d-offcanvas-button-toggle">
      <button type="button" class="sidebar-open-button" data-toggle="offcanvas">
        <i class="glyphicon glyphicon-chevron-left"></i>
      </button>
    </p>
    <div class="row">
      <div class="col-xs-12">
        <!--ROWS-->
        <div class="vis-blocks active" id="about">
            <?php $core->RenderPost(60); ?>
        </div>
        <div class="vis-blocks" id="fond">
            <?php $core->RenderPost(65); ?>
        </div>
        <div class="vis-blocks" id="rekvizit">
            <?php $core->RenderPost(66); ?>
        </div>
        <div class="vis-blocks" id="docs">
            <?php $core->RenderPost(83); ?>
        </div>
        <div class="vis-blocks" id="report">
            <?php $core->RenderPost(84); ?>
        </div>
        <div class="vis-blocks" id="contacts">
            <div class="row">
              <div class="col-md-5 cols-xs-12">
                <?php $core->RenderPost(67); ?>
              </div>
              <div class="col-md-7 cols-xs-12">
                <?php $core->RenderHtml('2.map'); ?>
              </div>
          </div>

        </div>
        <!--/ROWS-->
      </div>
    </div>
  </div>
  <!--/span-->


</div>
<!--/row-->