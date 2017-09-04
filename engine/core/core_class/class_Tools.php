<?php

function uc($st)
{
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        return mb_convert_encoding($st, "UTF-8", "Windows-1251");
    } else {
        return $st;
    }
}

function cu($st)
{
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        return mb_convert_encoding($st, "Windows-1251", "UTF-8");
    } else {
        return $st;
    }
}

function uu($st)
{
    return str_replace('\\', '/', $st);
}

function dt($date)
{
    return date('H:i d/m', strtotime($date));
}

function dtf($date)
{
    $date = date('Y-m-d H:i:s', strtotime($date));

    $date = date_format(date_create_from_format('Y-m-d H:i:s', $date), 'd.m.Y');

    return $date;

    // return date('j',$date);
    // $date = strtotime($date);
    // return date('D',$date);
    // return date('d', strtotime($date));
    
}

function php_timeDifText($strTimeServer, $strTimeUser, $no_more_one_day = true)
{
    /*как это работает: получение разницы
    указывается две даты Сервера и Пользователя типа (2015-04-15 20:09:03)
    возвращает значения типа (+0 day +00 hour +01 minute +00 second)
    разницу времени пользователя от сервера

    $no_more_one_day = true - ограничивает максимальную разницу 24 часами.Убирает разницу в днях.
    */
    $t1=new DateTime($strTimeServer); //серв
    $t2=new DateTime($strTimeUser); //поль
    $td=date_diff($t1, $t2);
    $no_more_one_day=$no_more_one_day?'':'%R%a day ';
    //убираем разницу секунды, такая точность не нужна
    //$tdd=$td->format($no_more_one_day.'%R%H hour %R%I minute %R%S second');
    $tdd=$td->format($no_more_one_day.'%R%H hour %R%I minute');
    return $tdd;
}

function php_timeFromDifText($strTimeServer, $strUserTimeDiff)
{
    /*как это работает: получение реального времени от разницы
    указывается дата Сервера (2015-04-15 20:09:03) и разница времени Пользователя(+0 day +00 hour +01 minute +00 second)
    возвращает значения типа (2015-04-15 20:09:03)
    реальную дату для пользователя
    */
    $t1=new DateTime($strTimeServer); //серв
    $tdd=$strUserTimeDiff; //поль
    if (!empty($strUserTimeDiff)) {
        $t1->modify($tdd);
    }
    return $t1->format('Y-m-d H:i:s');
}


function my_dump2()
{
    print '<pre>' . htmlspecialchars(print_r(get_defined_vars(), true)) . '</pre>';
    print '<pre>' . htmlspecialchars(print_r($_SERVER, true)) . '</pre>';
}

function phpConsole_sendError($usePhpVarDump = false, $showField_SERVER_inDump = true)
{

    $er=error_get_last();
    if (count($er)>0) {
        echo '<div id="phpError" class="dump_div">';
        echo "<h4>PHP Error #{$er['type']}</h4>on line: {$er['line']}<br>file: {$er['file']}<br>{$er['message']}";
        echo '</div>';
    }
    if ($usePhpVarDump) {
        echo '<div id="phpDump" class="container" style="display:none;">'.my_dump($showField_SERVER_inDump).'</div>';
    }
}

function def($arr, $key, $def){
      return (is_array($arr) &&  array_key_exists($key,$arr))?$arr[$key]:$def;
}

function closetags($html) {
    preg_match_all('#<(?!meta|img|br|hr|input\b)\b([a-z]+)(?: .*)?(?<![/|/ ])>#iU', $html, $result);
    $openedtags = $result[1];
    preg_match_all('#</([a-z]+)>#iU', $html, $result);
    $closedtags = $result[1];
    $len_opened = count($openedtags);
    if (count($closedtags) == $len_opened) {
        return $html;
    }
    $openedtags = array_reverse($openedtags);
    for ($i=0; $i < $len_opened; $i++) {
        if (!in_array($openedtags[$i], $closedtags)) {
            $html .= '</'.$openedtags[$i].'>';
        } else {
            unset($closedtags[array_search($openedtags[$i], $closedtags)]);
        }
    }
    return $html;
} 