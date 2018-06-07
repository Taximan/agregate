<?php

namespace Agregate\Api\Auth;

require_once '../../../prelude.php';

use Agregate\Fail;
use Firebase\JWT\JWT;

class Auth
{
    public static $JWT_SIGNING_KEY = "a4eed4a5";

    public static function getUserClaim()
    {
        $rawToken = $_SERVER['HTTP_AUTHORIZATION'];
        if (!isset($rawToken)) {
            Fail::missing_header("Authorization");
        }

        $tokenParts = \explode(" ", $rawToken);
        if (count($tokenParts) !== 2 && $tokenParts[0] === "Bearer") {
            Fail::with_message("Invalid token schema, should be: Bearer XXX, is: $rawToken");
        }

        $token = $tokenParts[1];

        return JWT::decode($token, Auth::$JWT_SIGNING_KEY, array('HS256'));

    }

}
