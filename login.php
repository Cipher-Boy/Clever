<?php
include 'config.php'; // استيراد إعدادات الاتصال بقاعدة البيانات

// السماح بالوصول من أي مصدر (مفيد لو كنت تستخدم GitHub Pages)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // تحقق من وجود البيانات
    if (empty($username) || empty($password)) {
        echo "الرجاء ملء جميع الحقول.";
        exit();
    }

    // التحقق من بيانات المستخدم باستخدام Prepared Statements
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // المستخدم موجود
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            // ✅ تسجيل الدخول ناجح → إعادة التوجيه
            header("Location: index.html"); // أو index.php حسب موقعك
            exit();
        } else {
            echo "كلمة المرور غير صحيحة!";
        }
    } else {
        echo "اسم المستخدم غير موجود!";
    }

    $stmt->close();
    $conn->close();
}
?>
