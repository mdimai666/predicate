<?php global $core; ?>

<style>
<?php include "./styles/signin.css"; ?>
</style>

<!--<link href="/styles/signin.css" rel="stylesheet">-->

<div class="container">

  <form class="form-signin" role="form" method="POST" action="/login">
    <h2 class="form-signin-heading">Авторизация</h2>

    <div class="alert alert-danger actionMessage"><?=$core->user->actionMessage ?></div>
    
    <input type="hidden" name="action" value="login">
    <input type="text" class="form-control" placeholder="Login" name="login" required autofocus 
      value="<?=empty($_POST['email'])?'':$_POST['email']; ?>">
    <input type="password" class="form-control" placeholder="Password" name="pass" required>
    <label class="checkbox">
      <!--<input type="checkbox" value="remember-me"> Запомнить меня-->
    </label>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
  </form>

</div> <!-- /container -->