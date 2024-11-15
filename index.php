<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-5">
    <h1 class="text-center">To-Do List</h1>

    <!-- Formulaire pour ajouter une nouvelle tâche -->
    <form id="addTaskForm" class="mt-4">
      <div class="mb-3">
        <label for="title" class="form-label">Titre de la tâche</label>
        <input type="text" id="title" name="title" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" name="description" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>

    <!-- Liste des tâches -->
    <ul id="taskList" class="list-group mt-4"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>
