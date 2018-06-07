<?php

namespace Agregate\Entity;


use Spot\EntityInterface;
use Spot\MapperInterface;

class User extends \Spot\Entity
{
    protected static $table = 'users';
    public static function fields()
    {
        return [
            'id' => [
                'type' => 'integer',
                'primary' => true,
                'autoincrement' => true,
            ],
            'name' => [
                'type' => 'string',
                'required' => true,
            ],
            'password' => [
                'type' => 'string',
                'required' => true,
            ],
        ];
    }

    public static function relations(MapperInterface $mapper, EntityInterface $entity)
    {
        return [
            'votes' => $mapper->hasMany($entity, 'Agregate\Entity\Vote', 'user_id'),
            'submissions' => $mapper->hasMany($entity, 'Agregate\Entity\Submission', 'author_id'),
        ];
    }
}
