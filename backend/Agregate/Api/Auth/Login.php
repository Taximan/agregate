<?php

namespace Agregate\Api\Auth;

use Agregate\Db\DB;
use Agregate\Fail;
use Agregate\Guard;
use Agregate\Util;
use Firebase\JWT\JWT;

require_once '../../../prelude.php';

Guard::onlyPostRequest();

$input = Util::getRequestJson();

if (!isset($input['username'])) {
    Fail::missing_field('username');
}

if (!isset($input['password'])) {
    Fail::missing_field('password');
}

$username = $input['username'];
$password = $input['password'];

$userMapper = DB::get()->userMapper();

$user = $userMapper->where(['name' => $username])->first();

$split = \explode("$", $user->password);
$salt = $split[0];
$hashedPassword = $split[1];

if (crypt($password, $salt) === $hashedPassword) {
    $token = JWT::encode([
        'id' => $user->id,
    ], Auth::$JWT_SIGNING_KEY);

    echo \json_encode([
        'id' => $user->id,
        'username' => $user->name,
        '$token' => 'Bearer ' . $token,
    ]);
} else {
    \http_response_code(401);
    echo \json_encode([
        'message' => 'Invalid password',
    ]);
}
