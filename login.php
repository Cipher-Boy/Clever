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

    // تحقق من بيانات المستخدم
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // إذا تم العثور على المستخدم
        $user = $result->fetch_assoc();

        // تحقق من كلمة المرور باستخدام password_verify
        if (password_verify($password, $user['password'])) {
            echo "تم تسجيل الدخول بنجاح!";
        } else {
            echo "كلمة المرور غير صحيحة!";
        }
    } else {
        echo "اسم المستخدم غير موجود!";
    }
}
?>
