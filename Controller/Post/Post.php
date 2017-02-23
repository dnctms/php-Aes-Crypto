<?php
session_start();

include_once "../CyrptoCore/CrytoAes.php";

$CrytoAes = new \CrytoPhp\CrytoAes;

if($_POST['crypto']=="crypto"){
    $RandomNumber=$CrytoAes->randomPassword(22);
    $PassWord=$CrytoAes->CrytoKey($RandomNumber);
    $_SESSION['password'] = $PassWord;
    $CryptoData=$CrytoAes->cryptoJsAesEncrypt($PassWord, $_POST['suggest']);
    //$DataBase=array("CrytoData"=>htmlentities($CryptoData), "password"=>$RandomNumber);
    $DataBase=array("CrytoData"=>$CryptoData, "password"=>$RandomNumber);

    echo json_encode($DataBase);

}

if($_POST['crypto']=="decrypto"){
    $PassWord=$_SESSION['password'];
    $CryptoData=$CrytoAes->cryptoJsAesDecrypt($PassWord, $_POST['suggest']);
    echo $CryptoData;
}

if($_POST['crypto']=="password"){
      echo $_SESSION['password'];
}
?>