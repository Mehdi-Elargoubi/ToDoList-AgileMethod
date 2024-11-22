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
$description = $_POST['description'] ?? '';

// Vérifier que les champs obligatoires sont remplis
if (!empty($id)) {
    $stmt = $conn->prepare("UPDATE tasks SET description = ?, updated_at = NOW() WHERE id = ?");
    $stmt->bind_param("si", $description, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Tâche modifiée avec succès"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de la modification de la tâche"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Les champs requis sont manquants"]);
}

$conn->close();
?>
