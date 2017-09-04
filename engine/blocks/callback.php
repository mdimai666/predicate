<?php global $core; ?>

<div id="modal-callback" class="modal fade" role="dialog">

    <div class="modal-dialog">


        <!-- Modal content-->

        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Обратная связь</h4>
            </div>

            <div class="modal-body">
                <!--MODAL BODY-->
                <div class="form-callback">
                    <div class="form-group">
                        <form id="call-back-form1" action="?" method="post" accept-charset="utf-8">
                            <input type="hidden" name="action" value="callback"/>
                            <!--<ul class="list-unstyled">-->
                                    <label for="author">Ваше имя</label>
                                    <input type="name" name="author" required="" validate="" />
                                    <label for="contact">Номер телефона</label>
                                    <input type="tel" name="contact" required="" validate="" />
                                    <label for="callbacktext">Текст сообщения</label>
                                    <textarea name="callbacktext" cols="50" rows="5" required="" validate=""></textarea>
                                <!--<li><button type="submit" class="btn btn-primary pull-right">Отправить</button></li>-->
                            <!--</ul>-->
                        </form>
                    </div>

                </div>
                <!--//MODAL BODY-->
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" onclick="$('#call-back-form1').submit();">Отправить</button>
            </div>
        </div>

    </div>
    <script>
        $(function () {

            $('#call-back-form1').submit(function () {

                var form = $(this);

                var f = form[0].checkValidity();

                // if (!f) return false;

                var data = $(this).serialize();
                data.ajax = true;

                $.post('?', data, function (data) {
                    $('#modal-callback').modal('hide');
                });

                return false;
            });
        });
    </script>
</div>