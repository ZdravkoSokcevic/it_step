<?php
    require_once 'vendor/autoload.php';
    require_once 'models/worker.php';
    // $faker=Faker\Factory::create();
    class myFaker extends Faker\Factory
    {
        public $faker;
        public function __construct()
        {
            $this->faker=Faker\Factory::create();
        }
        public function insert()
        {
            $idS=Work::getAll();
            $arr=[];
            foreach($idS as $id)
            {
                $arr[]=$id->id;
            }

            $id=array_rand($arr);
            $data=Work::insertWorker($this->faker->name,$this->faker->lastname,'admin',$id);
            echo $data;
        }
    }
    $fak=new myFaker;
    echo $fak->insert();
    echo "\n";
    ?>