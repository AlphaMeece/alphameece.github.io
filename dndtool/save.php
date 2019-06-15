<?php
$file = fopen($_GET["pName"] + ".txt","w");
fwrite($file,$_GET["pName"]);
fwrite($file,$_GET["cName"]);
fclose($file);
?>