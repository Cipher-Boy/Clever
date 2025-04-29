<?php
include 'config.php'; // استيراد إعدادات الاتصال بقاعدة البيانات

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // تحقق من وجود البيانات
    if (empty($username) || empty($password)) {
        echo "الرجاء ملء جميع الحقول.";
        exit();
    }

    // تحقق من أن المستخدم غير موجود مسبقًا
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "اسم المستخدم موجود مسبقًا!";
    } else {
        // تشفير كلمة المرور باستخدام hash
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // إدخال المستخدم الجديد
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            echo "تم إنشاء الحساب بنجاح!";
        } else {
            echo "خطأ في إنشاء الحساب: " . $conn->error;
        }
    }
}
?>
