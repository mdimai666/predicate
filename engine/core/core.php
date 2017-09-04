<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);
require_once "cfg.php";
require_once "core_class/class_Tools.php";
require_once "db.php";

//================================================
//CORE
//================================================
class Core
{

    private $REDIRECT_URL;
    private $REDIRECT_URL_ARRAY;
    private $ACTION = '';

    //public vars
    public $isAjax = false;
    public $isAdminPage = false;
    public $isApi = false;
    public $isModules = false;
    public $user;
    
    public $test = "Test work!";

    //ext class
    public $db;
    public $tool;
    public $img;

    public $errorMessage = '';
    public $errorCode = '';
    public $isHeaderSended = false;


  //constructor
    public function __construct()
    {
        $this->init_url_construct();

        if(!empty($_POST['action'])){
            $this->ACTION = $_POST['action'];
        }
    }

    public function init()
    {
        $this->db = new DB_controller();
        $getmsg = $this->db->connectionMessage;
        if ($getmsg!=='Connected!') {
            $this->errorCode = 'DataBase';
            $this->errorMessage = $this->db->connectionMessage;
            $this->RenderPage('errorpage');
            exit();
        }
        $this->user = new MyUser($this->db);
        $this->img = new Mimg();

        //check login
        
        $this->first();
    }


//Init
//------------------------------------------
    private function first()
    {
        $action = empty($_POST['action'])?'':$_POST['action'];
        
        if ($action==='login') {
            $result = $this->db->Login();
            parse_str($result, $r);
            if ($r['code']=='1') { //get '1' char
                $this->Redirect('admin');
                exit();
            } else {
                // $this->user->actionMessage = 'Логин или пароль указан неверно';
                $this->user->actionMessage = $r['r'];
            }
        } elseif ($action=='logout') {
            $result = $this->db->Logout();
            $this->Redirect('index');
        }
        
        //check cookie
        
        if (($action!="login")&&($action!="logout")) {
            
            if ((!empty($_COOKIE["login"]))&&(!empty($_COOKIE["password"]))) {
                $login = $_COOKIE["login"];
                $password = $_COOKIE["password"];
                $result = $this->db->Login($login, $password);
                parse_str($result, $r);
                
                if ($r['code']==1) {
                    $this->user->isAuth = true;
                    $this->user->login = $login;
                    $this->user->passHash = $password;
                    $this->user->data = $this->db->GetUserData();
                    
                } else {
                    $result = $this->db->Logout();
                }
            }
        }

        if($this->isAdminPage && !$this->user->isAuth()){
            $this->Redirect('login');
        }
    }


    private function init_url_construct()
    {
        //REDIRECT_URL = "/aefaef/aefaef/zero"
        //REDIRECT_QUERY_STRING "efaef=aef"
        //REQUEST_URI = "/aefaef/aefaef/zero?efaef=aef"

        $r=!empty($_SERVER['REDIRECT_URL'])?urldecode($_SERVER['REDIRECT_URL']):'';
        $r=trim($r, '/');
        $this->REDIRECT_URL = $r;
        $p=explode('/', $r);
        $this->REDIRECT_URL_ARRAY = $p;

        if ($this->Uri(0)=="admin") {
            $this->isAdminPage = true;
        }
        if ($this->Uri(0)=="api") {
            $this->isApi = true;
        }
        if (($this->Uri(0)=="modules")||($this->Uri(0)=="filemanager")) {
            $this->isModules = true;
        }
        $this->isAjax = def($_POST, 'ajax', false);
    }

//Render
//------------------------------------------
    public function Render($pagePath)
    {
        
        $file = $pagePath;

        if (file_exists($file)) {
            include($file);
        } else {
            $this->ErrorHtml('Page file not found');
        }
    }

    public function RenderPage($pageName, $folder = 'pages')
    {
        
        $file = $folder.DIRECTORY_SEPARATOR.$pageName.'.php';
        if (file_exists($file)) {
            $this->Render($file);
        } else {
            $this->RenderPage('errorpage');
        }
    }

    public function RenderBlock($blockName, $folder = 'blocks')
    {
        // $file = '..'.DIRECTORY_SEPARATOR.$folder.DIRECTORY_SEPARATOR.$blockName.'.php';

        // if (file_exists($file)) {
            // include($file);
            // $this->RenderPage($blockName, $folder);
        // } else {
            // die("Block not found! : ".$file);
        // }

        $file = $folder.DIRECTORY_SEPARATOR.$blockName.'.php';
        if (file_exists($file)) {
            // $this->Render($file);
            include $file;
        } else {
            // $this->RenderPage('errorpage');
        }
    }

    public function RenderHtml($blockName)
    {
        $file = 'pages/texts/'.$blockName.'.html';

        if (file_exists($file)) {
            include($file);
        } else {
            die("File {$blockName} not found!");
        }
    }

    public function RenderPost($id)
    {
        $post = $this->db->PostById($id);
        if (!$post) {
            $this->RenderPage('errorpage');
            return;
        }
        
        $body = '<h1>'.$post['post_title'].'</h1>';
        $body .= closetags($post['post_content']);
        $body .=  '<span class="date">'.dtf($post['post_modified']).'</span>';
        echo $body;
    }

    public function RenderPostContent($id)
    {
        $post = $this->db->PostById($id);
        if (!$post) {
            $this->RenderPage('errorpage');
            return;
        }
        echo closetags($post['post_content']);
    }

    public function ErrorHtml($msg)
    {
        echo '<h2 class="errorHtml">'.$msg.'</h2>';
    }

    public function Content()
    {

        $name = $this->Uri(0);
        $page = empty($name)?"index":$name;
        if ($this->isAdminPage) {
          //is authorized
            if (!$this->user->IsAuth()) {
                $this->Redirect('login');
                exit();
                // echo 'sd';
            }
            $name2 = $this->Uri(1);
            $page2 = empty($name2)?"index":$name2;
            $this->RenderPage($page2, 'admin');
        } else if($page=='login' && $this->user->IsAuth()){
            $this->Redirect('admin');
        }
         else {
            $this->RenderPage($page);
        }
        // echo ">>>".$this->user->IsAuth();
        // echo 'login='.$this->user->Login();
        //         echo ">>>".$this->user->passHash;
    }

    public function RenderHeader()
    {
        if ($this->isAdminPage) {
            $this->RenderBlock('header', 'admin/blocks');
        } else {
            $this->RenderBlock('header');
        }
    }

    public function RenderFooter()
    {
        if ($this->isAdminPage) {
            // $this->RenderBlock('header', 'admin/blocks');
        } else {
            $this->RenderBlock('footer');
        }
    }

//Ext
//------------------------------------------    
    public function Uri($index = -1)
    {
        if ($index===-1) {
            return $this->REDIRECT_URL;
        } else {
            if (count($this->REDIRECT_URL_ARRAY)>$index) {
                return strtolower($this->REDIRECT_URL_ARRAY[$index]);
            } else {
                return null;
            }
        }
    }

    public function Redirect($pageName)
    {
        if (!$this->isHeaderSended) {
            $host = $_SERVER['SERVER_NAME'];
            $url = "http://".$host."/".$pageName;
            header("Location: ".$url);
            echo 'redirect to ... '.$url;
            exit();
        } else {
            echo '<script>window.location.href = "/'.$pageName.'";</script>';
        }

        
    }

    public function Action(){
        return $this->ACTION;
    }

    public function Mail_callback($name, $contact, $text){

        global $cfg;

        function adopt($text) {
            return '=?UTF-8?B?'.base64_encode($text).'?=';
        }


        $fromname = $cfg['callback_name'];
        $email = $cfg['callback_main'];
        $subject = $cfg['callback_subject'].'-'.$contact;

        $message = '<h1>Обратная связь</h1>';
        $message .= '<h2>От '.$name.' ('.$contact.')</h2>';
        $message .= '<p>'.$text.'</p>';

        echo "<h1>EMAIL=$email</h1>";


        // $headers = "MIME-Version: 1.0" . PHP_EOL .
        // "Content-Type: text/html; charset=utf-8" . PHP_EOL .
        // 'From: '.adopt($fromname).' <'.$mail.'>' . PHP_EOL .
        // 'Reply-To: '.$mail.'' . PHP_EOL;
        
        // echo "MAIN::";


        // echo mail($email, adopt($subject), $message, $headers );
        // exit();return;
        /////////////////////////////////////
        require_once "./modules/sendmail/SendMailSmtpClass.php";
        $mailSMTP = new SendMailSmtpClass($cfg['mail_user'], $cfg['mail_pass'], $cfg['mail_host'], '', $cfg['mail_host_port']); // создаем экземпляр класса
        // заголовок письма

        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
        $headers .= "From: ". $mailSMTP->smtp_from  ." <". $mailSMTP->smtp_username .">\r\n"; // от кого письмо !!! тут e-mail, через который происходит авторизация
        $result =  $mailSMTP->send($email, $subject, $message, $headers); 
        // $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');
        if($result === true){
            echo "Письмо успешно отправлено";
        }else{
            echo "Письмо не отправлено. Ошибка: " . $result;
        }
        ///////////////////////////////////////

        /*
        require './modules/PHPMailer/PHPMailerAutoload.php';

        $mail = new PHPMailer;
        $mail->setLanguage('ru', './modules/PHPMailer/optional/path/to/language/directory/');

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->SMTPDebug = 2;
        $mail->Host = $cfg['mail_host'];  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = $cfg['mail_user'];                 // SMTP username
        $mail->Password = $cfg['mail_pass'];                           // SMTP password
        // $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = $cfg['mail_host_port'];                                    // TCP port to connect to

        $mail->setFrom($email, 'Kibor');
        $mail->addAddress($email, 'Форма обратной связи');     // Add a recipient
        // $mail->addAddress('ellen@example.com');               // Name is optional
        $mail->addReplyTo($email, 'Форма обратной связи1');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');

        // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = $message;

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }

        exit();
    }
    */
    }

}

//================================================
//User class
//================================================

class MyUser
{
    //private
    private $db;
    //public
    public $isAuth = false;
    public $login = 'guest';
    public $passHash;
    public $data;
    public $actionMessage;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function IsAuth()
    {
        return $this->isAuth;
    }

    public function Login()
    {
        return $this->login;
    }
}

//================================================
//IMG class
//================================================

class MImg
{
    public function Uimg($name)
    {
        $path = '/upload/images/'.$name;
        return $path;
    }
}

//================================================
//Start
//================================================

$core = new Core();

function core_start()
{
    global $core;
    
    $core->init();

    if ($core->isAjax) {
        if ($core->isApi) {
            $core->Render('core/api.php');
            exit();
        }
        $core->Content();
        exit();
    } elseif ($core->isModules) {
        echo $core->Render($core->Uri());
        exit();
    }
    $core->isHeaderSended = true;

    //call back from recive
    if($core->Action() == 'callback'){
        $author = def($_POST, 'author','');
        $contact = def($_POST, 'contact','');
        $callbacktext = def($_POST, 'callbacktext','');

        if(empty($author) || empty($contact) || empty($callbacktext))return;
        $core->Mail_callback($author, $contact, $callbacktext);
    }
}

core_start();
