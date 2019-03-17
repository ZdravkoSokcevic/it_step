<?php
    $dir=__DIR__;
    echo $dir;

    $foldersToInclude=[
        '../controller',
        '../models'
    ];

    $folderPath="../controller/*.php";
    foreach($foldersToInclude as $folder)
    {
        $docs=glob($folder."/*.php");
        //var_dump($docs);
        foreach($docs as $doc)
        {
            require_once "$doc";
        }
    }
    //var_dump($files);
    // die();



?>