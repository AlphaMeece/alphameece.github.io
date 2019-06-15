<html>
    <body>
        <?php
        $file = fopen("chars/" . $_GET["pName"] . ".txt","w");
        fwrite($file,$_GET["pName"]);
        fwrite($file,$_GET["cName"]);
        fclose($file);
        echo "Done";
        ?>
    </body>
</html>