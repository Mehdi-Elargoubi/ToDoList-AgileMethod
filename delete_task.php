<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer l'ID de la tâche à supprimer
$id = $_POST['id'] ?? null;

if (!empty($id)) {
    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Tâche supprimée avec succès"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de la suppression"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ID manquant"]);
}

$conn->close();
?>
