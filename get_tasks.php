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

// Récupérer les tâches en triant par l'état de la tâche (complétée ou non), et par updated_at ou created_at
$sql = "SELECT id, 
               title, 
               description, 
               completed, 
               CASE 
                   WHEN updated_at IS NULL THEN 'Non modifié' 
                   ELSE DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') 
               END AS updated_at, 
               DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at 
        FROM tasks 
        ORDER BY completed ASC, updated_at DESC";

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
