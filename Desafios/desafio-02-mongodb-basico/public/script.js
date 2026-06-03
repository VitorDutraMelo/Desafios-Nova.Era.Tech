const API_URL = "http://localhost:3000/tasks";

const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const taskCount = document.getElementById("taskCount");

const filterStatus = document.getElementById("filterStatus");
const filterTag = document.getElementById("filterTag");
const search = document.getElementById("search");
const clearFilters = document.getElementById("clearFilters");

async function fetchTasks() {
  const params = new URLSearchParams();

  if (filterStatus.value) {
    params.append("status", filterStatus.value);
  }

  if (filterTag.value.trim()) {
    params.append("tag", filterTag.value.trim());
  }

  if (search.value.trim()) {
    params.append("search", search.value.trim());
  }

  const response = await fetch(`${API_URL}?${params.toString()}`);
  const result = await response.json();

  renderTasks(result.data || []);
}

function renderTasks(tasks) {
  taskCount.textContent = tasks.length;
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML = `<div class="empty">No tasks found.</div>`;
    return;
  }

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-item";

    div.innerHTML = `
      <div class="check ${task.status === "done" ? "done" : ""}">
        ${task.status === "done" ? "✓" : ""}
      </div>

      <div class="task-info">
        <h4>${task.title}</h4>
        <p>${task.description || "No description"}</p>
        <div>
          ${task.tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>
      </div>

      <div>
        <span class="status ${task.status}">
          ${task.status}
        </span>
      </div>

      <div class="actions">
        <button class="btn-pending" onclick="updateStatus('${task._id}', 'pending')">
          Pending
        </button>

        <button class="btn-progress" onclick="updateStatus('${task._id}', 'in_progress')">
          In Progress
        </button>

        <button class="btn-done" onclick="updateStatus('${task._id}', 'done')">
          Done
        </button>

        <button class="btn-delete" onclick="deleteTask('${task._id}')">
          Delete
        </button>
      </div>
    `;

    tasksList.appendChild(div);
  });
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const status = document.getElementById("status").value;
  const tagsInput = document.getElementById("tags").value.trim();

  const tags = tagsInput
    ? tagsInput.split(",").map((tag) => tag.trim())
    : [];

  const task = {
    title,
    description,
    status,
    tags,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    alert("Error creating task");
    return;
  }

  taskForm.reset();
  fetchTasks();
});

async function updateStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    alert("Error updating task status");
    return;
  }

  fetchTasks();
}

async function deleteTask(id) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (!confirmDelete) return;

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Error deleting task");
    return;
  }

  fetchTasks();
}

filterStatus.addEventListener("change", fetchTasks);
filterTag.addEventListener("input", fetchTasks);
search.addEventListener("input", fetchTasks);

clearFilters.addEventListener("click", () => {
  filterStatus.value = "";
  filterTag.value = "";
  search.value = "";
  fetchTasks();
});

fetchTasks();