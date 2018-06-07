<?php

namespace Agregate\Entity;

use Spot\EntityInterface;
use Spot\MapperInterface;

class Submission extends \Spot\Entity
{
    protected static $table = 'submissions';
    public static function fields()
    {
        return [
            'id' => [
                'type' => 'integer',
                'primary' => true,
                'autoincrement' => true,
            ],
            'created_at' => [
                'type' => 'datetime',
            ],
            'title' => [
                'type' => 'string',
            ],
            'author_id' => [
                'type' => 'integer',
            ],
            'url' => [
                'type' => 'string',
            ],
            'description' => [
                'type' => 'string',
            ],
        ];
    }

    public static function relations(MapperInterface $mapper, EntityInterface $entity)
    {
        return [
            'votes' => $mapper->hasMany($entity, 'Agregate\Entity\Vote', 'submission_id'),
            'author' => $mapper->belongsTo($entity, 'Agregate\Entity\User', 'author_id'),
        ];
    }

}
