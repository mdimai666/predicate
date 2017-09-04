<?php global $core; ?>

<style>
    .error404 {
        padding: 30px;
        margin: 30px;
        border: 1px solid #cad2cf;
        box-shadow: 0 0 14px 5px rgba(0, 0, 0, 0.2);
    }

    .error404 h1 {
        font-size: 5em;
    }
</style>

<div class="container">
    <div class="row">
        <div class="col-xs-12">
            <div class="error404">
                <?php if(empty($_GET['code']) && false && empty($core->errorCode)): ?>
                <h1>404</h1>
                <h3>Страница не найдена</h3>
                <?php else: 

                    function _def($val,$def){
                        return(empty($val))?$def:$val;
                    }

                    $code = _def($core->errorCode,'');
                    if(empty($code))
                    $code = def($_GET, 'code','404');

                    $message = _def($core->errorMessage,'');
                    if(empty($message))
                    $message = def($_GET, 'message','Страница не найдена');

                    echo '<h1>'.$code.'</h1>';
                    echo '<h3>'.$message.'</h3>';

                endif; ?>
                
            </div>
        </div>
    </div>
</div>