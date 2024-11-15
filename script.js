document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskIdInput = document.getElementById("taskId");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const taskSubmitButton = document.getElementById("taskSubmitButton");
    const taskList = document.getElementById("taskList");
  
    // Charger les tâches depuis le serveur
    function loadTasks() {
      fetch("get_tasks.php")
        .then(response => response.json())
        .then(tasks => {
          taskList.innerHTML = ""; // Réinitialiser la liste des tâches
          tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.className = `list-group-item d-flex justify-content-between align-items-center`;
  
            listItem.innerHTML = `
              <div>
                <strong>${task.title}</strong>
                <p class="mb-0 small">${task.description}</p>
                <span class="text-secondary small">Créé le: ${task.created_at}</span>
              </div>
              <div>
                <button class="btn btn-sm btn-warning edit-task" data-id="${task.id}" data-title="${task.title}" data-description="${task.description}">Modifier</button>
                <button class="btn btn-sm btn-danger delete-task" data-id="${task.id}">Supprimer</button>
              </div>
            `;
  
            taskList.appendChild(listItem);
          });
  
          // Ajouter des gestionnaires pour les boutons "Modifier"
          document.querySelectorAll(".edit-task").forEach(button => {
            button.addEventListener("click", event => {
              const id = event.target.getAttribute("data-id");
              const title = event.target.getAttribute("data-title");
              const description = event.target.getAttribute("data-description");
  
              // Remplir le formulaire avec les données existantes
              taskIdInput.value = id;
              titleInput.value = title;
              descriptionInput.value = description;
  
              // Modifier le texte du bouton pour indiquer "Modifier"
              taskSubmitButton.textContent = "Modifier";
            });
          });
  
          // Ajouter des gestionnaires pour les boutons "Supprimer"
          document.querySelectorAll(".delete-task").forEach(button => {
            button.addEventListener("click", event => {
              const id = event.target.getAttribute("data-id");
  
              // Afficher une confirmation avant de supprimer
              if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
                fetch("delete_task.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: `id=${id}`
                })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      alert("Tâche supprimée avec succès");
                      loadTasks();
                    } else {
                      alert("Erreur lors de la suppression : " + data.message);
                    }
                  })
                  .catch(error => console.error("Erreur lors de la suppression :", error));
              }
            });
          });
        })
        .catch(error => console.error("Erreur lors du chargement des tâches :", error));
    }
  
    // Gestion de la soumission du formulaire
    taskForm.addEventListener("submit", event => {
      event.preventDefault(); // Empêche le rechargement de la page
  
      const formData = new FormData(taskForm);
      const isEdit = !!taskIdInput.value; // Vérifie si une tâche est en cours d'édition
  
      fetch(isEdit ? "update_task.php" : "add_task.php", {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Réinitialiser le formulaire
            taskForm.reset();
            taskIdInput.value = "";
            taskSubmitButton.textContent = "Ajouter"; // Revenir en mode "Ajouter"
            loadTasks();
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.error("Erreur lors de l'envoi du formulaire :", error));
    });
  
    // Charger les tâches au démarrage
    loadTasks();
  });
  