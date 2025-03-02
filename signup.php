<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $score = 0;

    if (empty($username) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
        exit;
    }

    $userData = "$username,$password,$score\n";

    if (file_put_contents('usr.txt', $userData, FILE_APPEND) === false) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to write to file']);
        exit;
    }

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>