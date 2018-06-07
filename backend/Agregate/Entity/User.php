<?php

namespace Agregate\Entity;

class User extends \Spot\Entity
{
    protected static $table = 'users';
    public static function fields()
    {
        return [
            'id' => [
                'type' => 'integer',
                'primary' => true,
                'autoincrement' => true
            ],
            'name' => [
                'type' => 'string',
                'required' => true
            ],
            'password' => [
                'type' => 'string',
                'required' => true
            ]
        ];
    }
}
