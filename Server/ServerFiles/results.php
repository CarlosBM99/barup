<?php
echo '¡Hola '.'eeeee ' . htmlspecialchars($_GET["name"]) . '!';
$txt = htmlspecialchars($_GET["name"]);
if ($_GET['run']) {
  # This code will run if ?run=true is set.
  exec("./script.sh ". $txt);
}
?>
