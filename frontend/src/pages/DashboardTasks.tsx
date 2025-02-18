// src/pages/DashboardTasks.tsx
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import TasksTab from "../components/dashboard/TasksTab";
import { getProjects } from "../services/projectService";
import { getTasks, createTask, updateTaskStatus, deleteTask, assignTask } from "../services/taskService";
import { Project, Task } from "../types";

const DashboardTasks: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsError, setProjectsError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [assigningTaskId, setAssigningTaskId] = useState<string | null>(null);
  const [assignmentUserId, setAssignmentUserId] = useState("");
  const statuses = ["TODO", "IN_PROGRESS", "DONE"];

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projs = await getProjects();
        setProjects(projs as Project[]);
        if (projs && projs.length > 0 && !selectedProject) {
          setSelectedProject((projs as Project[])[0]);
        }
      } catch (err) {
        setProjectsError("Failed to load projects.");
      }
    };
    fetchProjects();
  }, [selectedProject]);

  // Fetch tasks when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const fetchTasks = async () => {
        try {
          const t = await getTasks(selectedProject.id);
          setTasks(t as Task[]);
        } catch (err) {
          console.error("Error fetching tasks:", err);
        }
      };
      fetchTasks();
    }
  }, [selectedProject]);

  const handleCreateTask = async () => {
    if (newTask.title && selectedProject) {
      try {
        await createTask({ ...newTask, projectId: selectedProject.id });
        const t = await getTasks(selectedProject.id);
        setTasks(t as Task[]);
        setNewTask({ title: "", description: "" });
      } catch (err) {
        console.error("Error creating task:", err);
      }
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      if (selectedProject) {
        const t = await getTasks(selectedProject.id);
        setTasks(t as Task[]);
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const success = await deleteTask(taskId);
      if (success && selectedProject) {
        const t = await getTasks(selectedProject.id);
        setTasks(t as Task[]);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleAssignTask = async (taskId: string) => {
    if (assignmentUserId.trim()) {
      try {
        await assignTask(taskId, assignmentUserId);
        if (selectedProject) {
          const t = await getTasks(selectedProject.id);
          setTasks(t as Task[]);
        }
        setAssigningTaskId(null);
        setAssignmentUserId("");
      } catch (err) {
        console.error("Error assigning task:", err);
      }
    }
  };

  return (
    <>
      {projectsError && <Alert variant="danger">{projectsError}</Alert>}
      <div>Number of projects: {projects.length}</div>
      <TasksTab
        selectedProject={selectedProject}
        tasks={tasks}
        newTask={newTask}
        statuses={statuses}
        assigningTaskId={assigningTaskId}
        assignmentUserId={assignmentUserId}
        onNewTaskChange={setNewTask}
        onCreateTask={handleCreateTask}
        onUpdateTaskStatus={handleUpdateTaskStatus}
        onDeleteTask={handleDeleteTask}
        onAssignTask={handleAssignTask}
        onAssignmentUserIdChange={setAssignmentUserId}
        onCancelAssignment={() => {
          setAssigningTaskId(null);
          setAssignmentUserId("");
        }}
        onSetAssigningTaskId={setAssigningTaskId}
      />
    </>
  );
};

export default DashboardTasks;
