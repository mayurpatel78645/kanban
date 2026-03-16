<?php

require_once "../db.php";

$sql = "SELECT * FROM tasks";
$result = $conn->query($sql);

$tasks = [];

while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode($tasks);

$conn->close();

?>