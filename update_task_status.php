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

// Récupérer les données envoyées via POST
$id = $_POST['id'] ?? null;
$completed = $_POST['completed'] ?? null;

// Vérifier que les champs sont valides
if (!empty($id) && !is_null($completed)) {
    $stmt = $conn->prepare("UPDATE tasks SET completed = ? WHERE id = ?");
    $stmt->bind_param("ii", $completed, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "État de la tâche mis à jour"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de la mise à jour de la tâche"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ID ou état manquant"]);
}

$conn->close();
?>
