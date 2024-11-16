<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
        .completed {
            background-color: #dcdcdc;
            color: #999;
        }
    </style>
</head>
<body>
  <div class="container mt-5">
    <h1 class="text-center">To-Do List</h1>

    <!-- Formulaire pour ajouter/modifier une tâche -->
    <form id="taskForm" class="mt-4">
      <input type="hidden" id="taskId" name="id"> <!-- Champ caché pour l'ID de la tâche -->
      <div class="mb-3">
        <label for="title" class="form-label">Titre de la tâche</label>
        <input type="text" id="title" name="title" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" name="description" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" id="taskSubmitButton">Ajouter</button>
    </form>

    <!-- Liste des tâches -->
    <ul id="taskList" class="list-group mt-4"></ul>
  </div>

  <!-- Modal de confirmation -->
  <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmation de suppression</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Êtes-vous sûr de vouloir supprimer cette tâche ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-danger" id="confirmDeleteButton">Supprimer</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast pour les messages de succès -->
  <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
    <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          Tâche supprimée avec succès
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>

  <!-- Toast pour les messages de succès (modification) -->
  <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
    <div id="editSuccessToast" class="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          Tâche modifiée avec succès
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
