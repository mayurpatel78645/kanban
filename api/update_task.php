<?php

require_once "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$title = $data["title"];

$sql = "UPDATE tasks SET title = ? WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $title, $id);
$stmt->execute();

echo json_encode(["success" => true]);

$conn->close();

?>