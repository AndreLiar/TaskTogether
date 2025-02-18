// src/components/dashboard/TasksTab.tsx

import React from "react";
import { Alert, ListGroup, Button, Form } from "react-bootstrap";
import { Task, Project } from "../../types";

interface TasksTabProps {
  selectedProject: Project | null;
  tasks: Task[];
  newTask: { title: string; description: string };
  statuses: string[];
  assigningTaskId: string | null;
  assignmentUserId: string;
  onNewTaskChange: (newTask: { title: string; description: string }) => void;
  onCreateTask: () => void;
  onUpdateTaskStatus: (taskId: string, newStatus: string) => void;
  onDeleteTask: (taskId: string) => void;
  onAssignTask: (taskId: string) => void;
  onAssignmentUserIdChange: (id: string) => void;
  onCancelAssignment: () => void;
  onSetAssigningTaskId: (taskId: string) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({
  selectedProject,
  tasks,
  newTask,
  statuses,
  assigningTaskId,
  assignmentUserId,
  onNewTaskChange,
  onCreateTask,
  onUpdateTaskStatus,
  onDeleteTask,
  onAssignTask,
  onAssignmentUserIdChange,
  onCancelAssignment,
  onSetAssigningTaskId,
}) => {
  if (!selectedProject) return <Alert variant="info">Select a project to view tasks.</Alert>;
  return (
    <div className="p-3" style={{ backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}>
      <h4 style={{ color: "#20c997" }}>Kanban Board - {selectedProject.name}</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {statuses.map((status) => (
          <div key={status} style={{ flex: 1, margin: "0 10px" }}>
            <h5 style={{ borderBottom: `2px solid #20c997`, paddingBottom: "5px" }}>
              {status.replace("_", " ")}
            </h5>
            <ListGroup variant="flush">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <ListGroup.Item
                    key={task.id}
                    style={{
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "none",
                      marginBottom: "0.5rem",
                      borderRadius: "4px",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <strong>{task.title}</strong>
                    </div>
                    <div>{task.description}</div>
                    <Form.Select
                      value={task.status}
                      onChange={(e) => onUpdateTaskStatus(task.id, e.target.value)}
                      style={{
                        marginTop: "5px",
                        backgroundColor: "#444",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </Form.Select>
                    <div style={{ marginTop: "5px" }}>
                      {assigningTaskId === task.id ? (
                        <>
                          <Form.Control
                            type="text"
                            placeholder="Enter user ID"
                            value={assignmentUserId}
                            onChange={(e) => onAssignmentUserIdChange(e.target.value)}
                            style={{
                              backgroundColor: "#444",
                              color: "#fff",
                              border: "none",
                              marginBottom: "5px",
                            }}
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => onAssignTask(task.id)}
                          >
                            Submit
                          </Button>
                          <Button variant="secondary" size="sm" onClick={onCancelAssignment}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => onSetAssigningTaskId(task.id)}
                        >
                          Assign
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      style={{ marginTop: "5px" }}
                      onClick={() => onDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        ))}
      </div>
      <hr style={{ borderColor: "#20c997" }} />
      <h5>Create New Task</h5>
      <Form>
        <Form.Group controlId="taskTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => onNewTaskChange({ ...newTask, title: e.target.value })}
            style={{ backgroundColor: "#333", color: "#fff" }}
          />
        </Form.Group>
        <Form.Group controlId="taskDescription" className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => onNewTaskChange({ ...newTask, description: e.target.value })}
            style={{ backgroundColor: "#333", color: "#fff" }}
          />
        </Form.Group>
        <Button
          className="mt-2"
          style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
          onClick={onCreateTask}
        >
          Create Task
        </Button>
      </Form>
    </div>
  );
};

export default TasksTab;
