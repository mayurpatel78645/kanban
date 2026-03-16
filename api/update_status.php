<?php

require_once "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$status = $data["status"];

$sql = "UPDATE tasks SET status = ? WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $status, $id);
$stmt->execute();

echo json_encode(["success" => true]);

$conn->close();

?>