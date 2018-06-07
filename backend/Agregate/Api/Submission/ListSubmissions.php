<?php

namespace Agregate\Api\Submission;

require_once '../../../prelude.php';

use Agregate\Api\Auth\Auth;
use Agregate\Db\DB;

$submissionMapper = DB::get()->submissionMapper();

if (Auth::isLoggedIn()) {
    echo 'hi;';
} else {

}
