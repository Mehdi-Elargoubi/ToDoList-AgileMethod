document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskIdInput = document.getElementById("taskId");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const taskSubmitButton = document.getElementById("taskSubmitButton");
  const taskList = document.getElementById("taskList");

  let taskIdToDelete = null;

  // Modals et Toasts
  const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
  const successToastElement = document.getElementById("successToast");
  const editSuccessToastElement = document.getElementById("editSuccessToast");

  const successToast = new bootstrap.Toast(successToastElement);
  const editSuccessToast = new bootstrap.Toast(editSuccessToastElement);

  // Fonction pour charger les tâches
  function loadTasks() {
    fetch("get_tasks.php")
      .then((response) => response.json())
      .then((tasks) => {
        taskList.innerHTML = "";
        tasks.forEach((task) => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item d-flex justify-content-between align-items-center";

          // Appliquer des styles directement en fonction de l'état "completed"
          if (task.completed == 1) {
            listItem.style.backgroundColor = "#dcdcdc";
            listItem.style.color = "#999";
          }

          listItem.innerHTML = `
            <div>
              <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${task.completed == 1 ? 'checked' : ''}>
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

        attachEventHandlers();
      })
      .catch((error) => console.error("Erreur lors du chargement des tâches :", error));
  }

  // Fonction pour attacher des événements sur les cases à cocher
  function attachEventHandlers() {
    document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const taskId = event.target.getAttribute("data-id");
        const isChecked = event.target.checked;

        // Mettre à jour le statut de la tâche dans la base de données
        fetch("update_task_status.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `id=${taskId}&completed=${isChecked ? 1 : 0}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Modifier l'apparence de la tâche en fonction de son statut
              const listItem = event.target.closest("li");

              if (isChecked) {
                listItem.style.backgroundColor = "#dcdcdc";
                listItem.style.textDecoration = "line-through";
                listItem.style.color = "#999";
              } else {
                listItem.style.backgroundColor = "";
                listItem.style.textDecoration = "";
                listItem.style.color = "";
              }
            } else {
              alert("Erreur lors de la mise à jour du statut de la tâche");
            }
          })
          .catch((error) => console.error("Erreur lors de la mise à jour du statut :", error));
      });
    });

    // Gestion du clic sur le bouton de suppression
    document.querySelectorAll(".delete-task").forEach((button) => {
      button.addEventListener("click", (event) => {
        taskIdToDelete = event.target.getAttribute("data-id");
        confirmDeleteModal.show();
      });
    });

    // Gestion de la confirmation de suppression
    document.getElementById("confirmDeleteButton").addEventListener("click", () => {
      fetch("delete_task.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${taskIdToDelete}`,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            successToast.show();
            loadTasks();
          } else {
            alert("Erreur lors de la suppression de la tâche");
          }
        })
        .catch((error) => console.error("Erreur lors de la suppression :", error));

      confirmDeleteModal.hide();
    });

    // Gestion du clic sur le bouton de modification
    document.querySelectorAll(".edit-task").forEach((button) => {
      button.addEventListener("click", (event) => {
        const taskId = event.target.getAttribute("data-id");
        const title = event.target.getAttribute("data-title");
        const description = event.target.getAttribute("data-description");

        taskIdInput.value = taskId;
        titleInput.value = title;
        descriptionInput.value = description;
        taskSubmitButton.textContent = "Mettre à jour";
      });
    });
  }

  // Fonction pour soumettre le formulaire de création/édition de tâche
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskId = taskIdInput.value;
    const title = titleInput.value;
    const description = descriptionInput.value;

    const url = taskId ? "update_task.php" : "create_task.php";
    const method = taskId ? "POST" : "POST";

    const data = new URLSearchParams();
    data.append("id", taskId);
    data.append("title", title);
    data.append("description", description);

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (taskId) {
            editSuccessToast.show();
          } else {
            successToast.show();
          }
          loadTasks();
        } else {
          alert("Erreur lors de l'ajout/édition de la tâche");
        }
      })
      .catch((error) => console.error("Erreur lors de l'ajout/édition de la tâche :", error));

    taskForm.reset();
    taskSubmitButton.textContent = "Ajouter";
  });

  loadTasks();
});
