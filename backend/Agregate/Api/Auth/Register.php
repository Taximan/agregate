<?php

namespace Agregate\Api\Auth;

require_once '../../../prelude.php';

use Agregate\Db\DB;
use Agregate\Fail;
use Agregate\Guard;
use Agregate\Util;

Guard::onlyPostRequest();

$input = Util::getRequestJson();

if (!isset($input['username'])) {
    Fail::missing_field('username');
}

if (!isset($input['password'])) {
    Fail::missing_field('password');
}

$u = DB::get()->userMapper();

$salt = Util::randomString(5);
$encrypted_password = $salt . '$' . crypt($input['password'], $salt);

$id = $u->insert($u->build([
    'name' => $input['username'],
    'password' => $encrypted_password,
]));

echo \json_encode([
    'id' => $id
]);