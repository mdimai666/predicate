<?php global $core; ?>
<div class="row row-offcanvas row-offcanvas-right vis-blocks-ani">


    <!--sidebar-->
    <div class="sidebar col-xs-6 col-sm-3 sidebar-offcanvas" role="navigation">
        <div class="list-group"> 
            <a href="#jku" class="list-group-item active"><i class="glyphicon glyphicon-file"></i>Тарифы на ЖКУ</a>
            <a href="#price" class="list-group-item"><i class="glyphicon glyphicon-file"></i>Цены на услуги Кибор</a>
            <a href="#postav_tariv" class="list-group-item"><i class="glyphicon glyphicon-file"></i>Тарифы поставщиков</a>
            <a href="#agency_dogovor" class="list-group-item"><i class="glyphicon glyphicon-file"></i>Агентский договор</a>
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

            <!--ROWS-->
            <div class="row">
                <div class="col-xs-12 col-sm-12">
                    <div class="vis-blocks active" id="jku">
                        <?php $core->RenderPost(70); ?>
                    </div>
                    <div class="vis-blocks" id="price">
                        <?php $core->RenderPost(68); ?>
                    </div>
                    <div class="vis-blocks" id="postav_tariv">
                        <?php $core->RenderPost(81); ?>
                    </div>
                    <div class="vis-blocks" id="agency_dogovor">
                        <?php $core->RenderPostContent(82); ?>
                    </div>

                </div>
            </div>
        </div>


        <!--/ROWS-->

</div>
<!--/span-->


<!--/row-->
</div>
<style>
    #taryff-postoff td {
        border: 1px solid black;
    }

    #taryff-postoff p,
    #taryff-postoff td {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
