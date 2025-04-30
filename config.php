<?php
$servername = "fdb1030.awardspace.net";  // اسم الخادم الخاص بـ InfinityFree
$username = "4626963_clever";               // اسم المستخدم لقاعدة البيانات
$password = "j/_b]6MN42FbKS9p";               // كلمة المرور لقاعدة البيانات
$dbname = "4626963_clever";          // اسم قاعدة البيانات التي أنشأتها

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "تم الاتصال بنجاح!";
}
?>
