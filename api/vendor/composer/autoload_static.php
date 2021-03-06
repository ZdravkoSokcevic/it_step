<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitec0c065d7b65df9a308a6cc7bebbcc5f
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Faker\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Faker\\' => 
        array (
            0 => __DIR__ . '/..' . '/fzaninotto/faker/src/Faker',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitec0c065d7b65df9a308a6cc7bebbcc5f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitec0c065d7b65df9a308a6cc7bebbcc5f::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
