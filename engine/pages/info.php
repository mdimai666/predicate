<?php global $core; ?>
    <div class="row row-offcanvas row-offcanvas-right vis-blocks-ani">


        <!--sidebar-->
        <div class="sidebar col-xs-6 col-sm-3 sidebar-offcanvas" role="navigation">
            <div class="list-group">
                <a href="#ob_oplate" class="list-group-item active">
                    <i class="glyphicon glyphicon-info-sign"></i> О плате за Общедомовые нужды</a>
                <a href="#iz_chego" class="list-group-item">
                    <i class="glyphicon glyphicon-question-sign"></i> Из чего складывается платежный документ</a>
                <a href="#kaeff" class="list-group-item">
                    <i class="glyphicon glyphicon-circle-arrow-up"></i> О повышающем коэффициенте</a>
                <a href="#peredacha_PU" class="list-group-item">
                    <i class="glyphicon glyphicon-refresh"></i> Передача ПУ статья для УК и ТСЖ от 28 марта</a>
                <a href="#ocheredi" class="list-group-item">
                    <i class="glyphicon glyphicon-record"></i> Сократить очереди</a>
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

            <!--<div class="container">-->
                <!--ROWS-->
                <div class="row">
                    <div class="col-xs-12 col-sm-12">
                        <div class="vis-blocks active" id="ob_oplate">
                            <?php $core->RenderPost(85); ?>
                        </div>
                        <div class="vis-blocks" id="kaeff">
                            <?php $core->RenderPost(88); ?>
                        </div>
                        <div class="vis-blocks" id="iz_chego">
                            <?php $core->RenderPost(89); ?>
                        </div>
                        <div class="vis-blocks" id="peredacha_PU">
                            <?php $core->RenderPost(86); ?>
                        </div>
                        <div class="vis-blocks" id="ocheredi">
                            <?php $core->RenderPost(87); ?>
                        </div>
                    </div>
                <!--</div>-->
            </div>


            <!--/ROWS-->
        </div>

    </div>
    <!--/span-->


</div>
<!--/row-->