<?php
$servername = "185.234.75.138";  // اسم الخادم الخاص بـ InfinityFree
$username = "clever";               // اسم المستخدم لقاعدة البيانات
$password = "";               // كلمة المرور لقاعدة البيانات
$dbname = "users";          // اسم قاعدة البيانات التي أنشأتها

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "تم الاتصال بنجاح!";
}
?>
