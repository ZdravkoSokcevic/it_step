<?php
    function hour_calc($date1,$date2)
    {

        if(is_string($date1) && is_string($date2))
        {
            $date1=strtotime($date1);
            $date2=strtotime($date2);
        }
        var_dump($date1);
        var_dump($date2);
        $dife=abs($date1-$date2);
        $hours=$dife/60/60;
        return $hours;
    }


?>