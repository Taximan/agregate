<?php

namespace Agregate\Api\Submission;

require_once '../../../prelude.php';

use Agregate\Api\Auth\Auth;
use Agregate\Db\DB;
use Agregate\Guard;
use Agregate\Util;

Guard::onlyPostRequest();
$userId = Auth::getUserClaim()->id;
$req = Util::getRequestJson();

$submissionMapper = DB::get()->submissionMapper();

$saved = $submissionMapper->create([
    'created_at' => new \DateTime('now'),
    'title' => $req['title'],
    'author_id' => $userId,
    'url' => $req['url'],
    'description' => $req['description'],
]);

echo \json_encode($saved);
