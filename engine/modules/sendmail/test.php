<form action="test.php" method="post">
<input type="text" name="fio" placeholder="Укажите ФИО" required>
<input type="text" name="email" placeholder="Укажите e-mail" required>
<input type="text" name="text" placeholder="Текст" required>
<input type="submit" value="Отправить">
</form>
<?php

    if (!empty($_POST)) {
        echo $_POST['fio']." ".$_POST['email']." ".$_POST['text'];
        require_once "SendMailSmtpClass.php";
        $mailSMTP = new SendMailSmtpClass('glider.4d.5a@mail.ru', 'password', 'ssl://smtp.mail.ru', $_POST['fio'], 465); // создаем экземпляр класса
        // $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');


        // заголовок письма
        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
        $headers .= "From: ". $mailSMTP->smtp_from  ." <". $mailSMTP->smtp_username .">\r\n"; // от кого письмо !!! тут e-mail, через который происходит авторизация
        $result =  $mailSMTP->send($_POST['email'], 'Форма сайта', $_POST['text'], $headers); 
        // $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');
        if($result === true){
            echo "Письмо успешно отправлено";
        }else{
            echo "Письмо не отправлено. Ошибка: " . $result;
        }
    }
?>