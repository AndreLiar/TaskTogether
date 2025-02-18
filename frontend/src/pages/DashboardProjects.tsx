// src/pages/DashboardProjects.tsx
import React, { useEffect, useState } from "react";
import { Alert, Modal, Form, Button } from "react-bootstrap";
import ProjectsTab from "../components/dashboard/ProjectsTab";
import MembershipModal from "../components/MembershipModal";
import { getProjects, updateProject, deleteProject } from "../services/projectService";
import { Project } from "../types";

const DashboardProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modal state for editing a project
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  // Modal state for managing members
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [updateProjectError, setUpdateProjectError] = useState("");

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

  const handleOpenEditProjectModal = () => {
    if (selectedProject) {
      setEditProjectName(selectedProject.name);
      setEditProjectDescription(selectedProject.description || "");
      setShowEditProjectModal(true);
    }
  };

  const handleUpdateProject = async () => {
    if (selectedProject && editProjectName.trim()) {
      try {
        const updatedProject = await updateProject(
          selectedProject.id,
          editProjectName,
          editProjectDescription
        );
        if (updatedProject) {
          setProjects((prev) =>
            prev.map((proj) =>
              proj.id === selectedProject.id ? (updatedProject as Project) : proj
            )
          );
          setSelectedProject(updatedProject as Project);
          setShowEditProjectModal(false);
          setUpdateProjectError("");
        }
      } catch (err) {
        setUpdateProjectError("Project update failed.");
      }
    }
  };

  const handleDeleteProject = async () => {
    if (selectedProject) {
      if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
        try {
          const success = await deleteProject(selectedProject.id);
          if (success) {
            setProjects((prev) => prev.filter((proj) => proj.id !== selectedProject.id));
            setSelectedProject(projects.length > 1 ? projects[0] : null);
          }
        } catch (err) {
          console.error("Error deleting project:", err);
        }
      }
    }
  };

  return (
    <>
      <ProjectsTab
        projects={projects}
        projectsLoading={projectsLoading}
        projectsError={projectsError}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onOpenEditProjectModal={handleOpenEditProjectModal}
        onDeleteProject={handleDeleteProject}
      />

      {/* Button to open membership management modal */}
      <Button
        variant="info"
        className="mb-3"
        onClick={() => setShowMembershipModal(true)}
        disabled={!selectedProject}
      >
        Manage Members
      </Button>

      {/* Membership Modal */}
      {selectedProject && (
        <MembershipModal
          projectId={selectedProject.id}
          show={showMembershipModal}
          onClose={() => setShowMembershipModal(false)}
        />
      )}

      {/* Edit Project Modal */}
      <Modal show={showEditProjectModal} onHide={() => setShowEditProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editProjectDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={editProjectDescription}
                onChange={(e) => setEditProjectDescription(e.target.value)}
              />
            </Form.Group>
            {updateProjectError && <Alert variant="danger" className="mt-3">{updateProjectError}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditProjectModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardProjects;
