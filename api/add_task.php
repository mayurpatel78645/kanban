<?php

require_once "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$title = $data["title"];
$status = $data["status"];

$sql = "INSERT INTO tasks (id, title, status) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $id, $title, $status);
$stmt->execute();

echo json_encode(["success" => true]);

$conn->close();

?>