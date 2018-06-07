<?php

namespace Agregate\Entity;

use Spot\EntityInterface;
use Spot\MapperInterface;

class Vote extends \Spot\Entity
{
    protected static $table = 'votes';
    public static function fields()
    {
        return [
            'user_id' => [
                'type' => 'integer',
                'primary' => true,
            ],
            'submission_id' => [
                'type' => 'integer',
            ],
            'vote' => [
                'type' => 'integer',
            ],
        ];
    }

    public static function relations(MapperInterface $mapper, EntityInterface $entity)
    {
        return [
            'submission' => $mapper->belongsTo($entity, 'Agregate\Entity\Submission', 'submission_id'),
            'user' => $mapper->belongsTo($entity, 'Agregate\Entity\User', 'user_id'),
        ];
    }

}
