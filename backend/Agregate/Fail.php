<?php

namespace Agregate;

class Fail
{
    public static function with_message($msg)
    {
        echo \json_encode([
            'message' => $msg,
        ]);
        exit;
    }

    public static function missing_field($field)
    {
        Fail::with_message("Field: $field is missing!");
    }

    public static function missing_header($header)
    {
        Fail::with_message("HEADER: $header is missing");
    }

}
