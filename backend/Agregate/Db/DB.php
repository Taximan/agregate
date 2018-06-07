<?php

namespace Agregate\Db;

require_once '../../../prelude.php';

class DB
{
    /**
     * @var DB
     */
    private static $instance;

    /**
     * @var \Spot\Locator
     */
    public $locator;

    private function __construct()
    {
        $cfg = new \Spot\Config();
        $cfg->addConnection('postgres', [
            'dbname' => 'agregate',
            'user' => 'postgres',
            'password' => 'postgres',
            'host' => 'localhost',
            'driver' => 'pdo_pgsql',
        ]);
        $this->locator = new \Spot\Locator($cfg);
    }

    /**
     * @return \Agregate\Db\DB
     */
    public static function get()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * @return \Spot\Mapper
     */
    public function userMapper()
    {
        return $this->locator->mapper('Agregate\Entity\User');
    }

    /**
     * @return \Spot\Mapper
     */
    public function submissionMapper()
    {
        return $this->locator->mapper('Agregate\Entity\Submission');
    }

    /**
     * @return \Spot\Mapper
     */
    public function voteMapper()
    {
        return $this->locator->mapper('Agregate\Entity\Vote');
    }

}
