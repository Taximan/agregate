<?php

namespace Agregate\Api\Submission;

require_once '../../../prelude.php';

use Agregate\Api\Auth\Auth;
use Agregate\Db\DB;

$submissionMapper = DB::get()->submissionMapper();
$voteMapper = DB::get()->voteMapper();

$submissions = $submissionMapper->all()->with(['author', 'votes']);

$mapped_subs = [];
foreach ($submissions as $index => $sub) {
    $vote = 0;
    if (Auth::isLoggedIn()) {
        $user_id = Auth::getUserClaim()->id;
        $votes = $sub->votes;
        foreach ($votes as $idx => $dbVote) {
            if ($dbVote->user_id === $user_id) {
                $vote = $dbVote->vote;
            }
        }
    }

    $votes = $sub->votes;
    $sum = 0;
    foreach ($votes as $idx => $dbVote) {
        $sum += $dbVote->vote;
    }
    
    \array_push($mapped_subs, [
        'id' => $sub->id,
        'userVote' => $vote,
        'rating' => $sum,
        'createdAt' => $sub->created_at->format('c'),
        'user' => [
            'name' => $sub->author->name,
            'id' => $sub->author->id,
        ],
        'title' => $sub->title,
        'url' => $sub->url,
        'description' => $sub->description,
    ]);
}

echo \json_encode($mapped_subs);
