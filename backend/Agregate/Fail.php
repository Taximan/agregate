<?php

namespace Agregate;

class Fail
{
    public static function missing_field($field)
    {
        echo \json_encode([
            'message' => "$field is missing",
        ]);

        exit;
    }
}
