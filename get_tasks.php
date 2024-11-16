<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les tâches
$sql = "SELECT id, title, description, completed, created_at, updated_at FROM tasks ORDER BY created_at DESC";
$result = $conn->query($sql);

$tasks = [];

// Parcourir les résultats
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

// Retourner les tâches au format JSON
header('Content-Type: application/json');
echo json_encode($tasks);

$conn->close();
?>
