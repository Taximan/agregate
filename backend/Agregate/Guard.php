<?php

namespace Agregate;

class Guard
{

    private static function throwInvalidMethod(string $requiredMethodName)
    {
        echo \json_encode([
            'message' => 'Unsupported method. Must be ' . $requiredMethodName . '.',
        ]);

        die;
    }

    public static function onlyPostRequest()
    {
        if (!($_SERVER['REQUEST_METHOD'] === 'POST')) {
            Guard::throwInvalidMethod('POST');
        }
    }
}
