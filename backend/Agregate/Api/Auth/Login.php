<?php

namespace Agregate\Api\Auth;

use Agregate\Fail;
use Agregate\Util;
use Agregate\Guard;

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

echo \json_encode($input);
