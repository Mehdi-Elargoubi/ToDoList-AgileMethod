document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");

  // Récupérer les tâches depuis le backend
  fetch("get_tasks.php")
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = `list-group-item d-flex justify-content-between align-items-center ${
          task.completed ? "bg-light text-muted" : ""
        }`;

        listItem.innerHTML = `
          <div>
            <strong>${task.title}</strong>
            <p class="mb-0 small">${task.description}</p>
            <span class="text-secondary small">Created: ${task.created_at}</span>
          </div>
          <span class="badge bg-${task.completed ? "success" : "danger"}">
            ${task.completed ? "Done" : "En attente"}
          </span>
        `;

        taskList.appendChild(listItem);
      });
    })
    .catch(error => console.error("Error fetching tasks:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const addTaskForm = document.getElementById("addTaskForm");
  
    // Fonction pour charger les tâches
    function loadTasks() {
      fetch("get_tasks.php")
        .then(response => response.json())
        .then(tasks => {
          taskList.innerHTML = ""; // Réinitialiser la liste
          tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.className = `list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "bg-light text-muted" : ""
            }`;
  
            listItem.innerHTML = `
              <div>
                <strong>${task.title}</strong>
                <p class="mb-0 small">${task.description}</p>
                <span class="text-secondary small">Created: ${task.created_at}</span>
              </div>
              <span class="badge bg-${task.completed ? "success" : "danger"}">
                ${task.completed ? "Completed" : "Pending"}
              </span>
            `;
  
            taskList.appendChild(listItem);
          });
        })
        .catch(error => console.error("Error fetching tasks:", error));
    }
  
    // Charger les tâches au chargement de la page
    loadTasks();
  
    // Gérer la soumission du formulaire d'ajout de tâche
    addTaskForm.addEventListener("submit", event => {
      event.preventDefault(); // Empêcher le rechargement de la page
      const formData = new FormData(addTaskForm);
  
      fetch("add_task.php", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            addTaskForm.reset(); // Réinitialiser le formulaire
            loadTasks(); // Recharger la liste des tâches
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.error("Error adding task:", error));
    });
  });
  