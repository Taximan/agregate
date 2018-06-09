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
$voteMapper = DB::get()->voteMapper();

$vote = 0;

if (\is_bool($req['vote'])) {
    $vote = $req['vote'] ? 1 : -1;
}

$submission_id = $req['submissionId'];

$voteObj = $voteMapper->where(['submission_id' => $submission_id, 'user_id' => $userId])->first();

if ($voteObj) {
    $voteObj->vote = $vote;
    $voteMapper->save($voteObj);
    echo \json_encode($voteObj);
} else {
    $saved = $voteMapper->insert($voteMapper->build([
        'user_id' => $userId,
        'submission_id' => $req['submissionId'],
        'vote' => $vote,
    ]));
    if ($saved) {
        http_response_code(201);
    } else {
        http_response_code(409);
    }
}
