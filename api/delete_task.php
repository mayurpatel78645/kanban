<?php

require_once "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$sql = "DELETE FROM tasks WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();

echo json_encode(["success" => true]);

$conn->close();

?>