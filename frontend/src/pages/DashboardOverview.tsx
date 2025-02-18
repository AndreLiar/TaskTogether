// src/pages/DashboardOverview.tsx
import React, { useEffect, useState } from "react";
import { Alert, Modal, Form, Button } from "react-bootstrap";
import OverviewTab from "../components/dashboard/OverviewTab";
import { getProjects, createProject } from "../services/projectService";
import { Project } from "../types";

const DashboardOverview: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modal state for creating a project
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [createProjectError, setCreateProjectError] = useState("");

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      try {
        const projs = await getProjects();
        setProjects(projs as Project[]);
        if (projs && projs.length > 0 && !selectedProject) {
          setSelectedProject((projs as Project[])[0]);
        }
      } catch (err) {
        setProjectsError("Failed to load projects.");
      } finally {
        setProjectsLoading(false);
      }
    };
    fetchProjects();
  }, [selectedProject]);

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      try {
        const newProj = await createProject(newProjectName, newProjectDescription);
        if (newProj) {
          setProjects((prev) => [...prev, newProj as Project]);
          setSelectedProject(newProj as Project);
          setShowCreateProjectModal(false);
          setNewProjectName("");
          setNewProjectDescription("");
          setCreateProjectError("");
        }
      } catch (err) {
        setCreateProjectError("Project creation failed.");
      }
    }
  };

  return (
    <>
      <OverviewTab
        projects={projects}
        projectsLoading={projectsLoading}
        projectsError={projectsError}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onCreateProject={() => setShowCreateProjectModal(true)}
      />

      {/* Create Project Modal */}
      <Modal show={showCreateProjectModal} onHide={() => setShowCreateProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newProjectDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
            </Form.Group>
            {createProjectError && <Alert variant="danger" className="mt-3">{createProjectError}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateProjectModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateProject}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardOverview;
