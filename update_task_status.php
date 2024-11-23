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

// Récupérer les données envoyées
$id = $_POST['id'];
$completed = $_POST['completed'];

// Mettre à jour le statut de la tâche
$sql = "UPDATE tasks SET completed = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $completed, $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

$stmt->close();
$conn->close();
?>
