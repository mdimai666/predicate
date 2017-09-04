<?php  global $core; ?>

MAIL TEST::<br>

                <div class="form-callback">
                    <div class="form-group">
                        <form id="call-back-form2" action="?" method="post" accept-charset="utf-8">
                            <input type="hidden" name="action" value="callback"/>
                            <!--<ul class="list-unstyled">-->
                                    <label for="author">Ваше имя</label>
                                    <input type="name" name="author" required="" validate="" />
                                    <label for="contact">Номер телефона</label>
                                    <input type="tel" name="contact" required="" validate="" />
                                    <label for="callbacktext">Текст сообщения</label>
                                    <textarea name="callbacktext" cols="50" rows="5" required="" validate=""></textarea>
                                <li><button type="submit" class="btn btn-primary pull-right">Отправить</button></li>
                            <!--</ul>-->
                        </form>
                    </div>

                </div>