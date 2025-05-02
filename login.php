<?php
// الاتصال بقاعدة البيانات
include('config.php'); // تأكد من أنك قمت بإعداد الاتصال بقاعدة البيانات في هذا الملف

// تحقق من إرسال النموذج
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // استعلام من قاعدة البيانات للتحقق من بيانات المستخدم
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    // التحقق من وجود المستخدم
    if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // إذا كانت البيانات صحيحة، تخزين البيانات في الكوكيز
        setcookie('username', $user['username'], time() + (86400 * 30), "/"); // الكوكيز سيتبقى لمدة 30 يوم
        setcookie('user_id', $user['id'], time() + (86400 * 30), "/"); // حفظ المعرف في الكوكيز

        // إعادة توجيه المستخدم إلى الصفحة الرئيسية
        header('Location: index.php');
        exit;
    } else {
        echo "بيانات الدخول غير صحيحة!";
    }
}
?>

<!-- نموذج تسجيل الدخول -->
<form method="POST" action="login.php">
    <label for="username">اسم المستخدم:</label>
    <input type="text" id="username" name="username" required><br><br>

    <label for="password">كلمة المرور:</label>
    <input type="password" id="password" name="password" required><br><br>

    <button type="submit">تسجيل الدخول</button>
</form>
