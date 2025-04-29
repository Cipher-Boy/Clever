<?php
$servername = "sql208.infinityfree.com";  // اسم الخادم الخاص بـ InfinityFree
$username = "if0_38865558";               // اسم المستخدم لقاعدة البيانات
$password = "maSBZDcgZ2AB";               // كلمة المرور لقاعدة البيانات
$dbname = "if0_38865558_clever";          // اسم قاعدة البيانات التي أنشأتها

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "تم الاتصال بنجاح!";
}
?>
