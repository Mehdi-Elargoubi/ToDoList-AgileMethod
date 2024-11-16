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
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';

// Vérifier que le titre n'est pas vide
if (!empty($title)) {
    $stmt = $conn->prepare("INSERT INTO tasks (title, description) VALUES (?, ?)");
    $stmt->bind_param("ss", $title, $description);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Tâche ajoutée avec succès"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'ajout de la tâche"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Le titre est requis"]);
}

$conn->close();
?>
