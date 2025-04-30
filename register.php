<?php
include 'config.php'; // استيراد إعدادات الاتصال بقاعدة البيانات

// السماح بالوصول من أي مصدر خارجي
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

    // التحقق من أن المستخدم غير موجود مسبقًا
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "اسم المستخدم موجود مسبقًا!";
    } else {
        // تشفير كلمة المرور
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // إدخال المستخدم الجديد
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $hashed_password);

        if ($stmt->execute()) {
            // ✅ الحساب تم إنشاؤه بنجاح، إعادة التوجيه
            header("Location: index.html"); // أو index.php أو رابط خارجي
            exit();
        } else {
            echo "خطأ في إنشاء الحساب: " . $stmt->error;
        }
    }

    $stmt->close();
    $conn->close();
}
?>
