// Base URL for the backend API
const API_URL = "http://localhost:5000/api";

// ---------- AUTHENTICATION HANDLERS ---------- //

// Sign Up
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        window.location.href = "login.html"; // Redirect to login
      } else {
        alert(data.error || "Sign-up failed!");
      }
    } catch (error) {
      console.error("Sign-up Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

// Log In
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token to local storage
        alert("Logged in successfully!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

// Logout
const logoutButton = document.getElementById("logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "sample.html"; // Redirect to homepage
  });
}

// ---------- TASK MANAGEMENT HANDLERS ---------- //

// Fetch Tasks
const tasksContainer = document.getElementById("tasks-container");

const fetchTasks = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to log in to access tasks.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        "Authorization": `Bearer ${token}`, // Ensure token is included in the header
      },
    });

    const tasks = await response.json();

    if (response.ok) {
      tasksContainer.innerHTML = ""; // Clear container before appending tasks

      tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
          <span>${task.title}</span>
          <button class="update-btn" onclick="updateTask('${task._id}')">Update</button>
          <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
        `;
        tasksContainer.appendChild(taskElement);
      });
    } else {
      alert(tasks.error || "Failed to fetch tasks.");
    }
  } catch (error) {
    console.error("Fetch Tasks Error:", error);
    alert("An error occurred while fetching tasks.");
  }
};

// Add Task
const taskForm = document.getElementById("task-form");
if (taskForm) {
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const taskInput = document.getElementById("task-input");
    const title = taskInput.value;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach token for authentication
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (response.ok) {
        taskInput.value = ""; // Clear input field
        fetchTasks(); // Refresh tasks list
      } else {
        alert(data.error || "Failed to add task.");
      }
    } catch (error) {
      console.error("Add Task Error:", error);
      alert("An error occurred while adding the task.");
    }
  });
}

// Delete Task
const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`, // Attach token for authentication
      },
    });

    if (response.ok) {
      fetchTasks(); // Refresh tasks list
    } else {
      const data = await response.json();
      alert(data.error || "Failed to delete task.");
    }
  } catch (error) {
    console.error("Delete Task Error:", error);
    alert("An error occurred while deleting the task.");
  }
};

// Update Task
const updateTask = async (taskId) => {
  const newTitle = prompt("Enter the new title for the task:");
  if (!newTitle) return;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Attach token for authentication
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (response.ok) {
      fetchTasks(); // Refresh tasks list after update
    } else {
      const data = await response.json();
      alert(data.error || "Failed to update task.");
    }
  } catch (error) {
    console.error("Update Task Error:", error);
    alert("An error occurred while updating the task.");
  }
};

// Fetch tasks on dashboard load
if (tasksContainer) {
  fetchTasks();
}
