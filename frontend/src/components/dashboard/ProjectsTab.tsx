// src/components/dashboard/ProjectsTab.tsx

import React from "react";
import { Spinner, Alert, ListGroup, Button } from "react-bootstrap";
import { Project } from "../../types";

interface ProjectsTabProps {
  projects: Project[];
  projectsLoading: boolean;
  projectsError: string;
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onOpenEditProjectModal: () => void;
  onDeleteProject: () => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  projectsLoading,
  projectsError,
  selectedProject,
  onSelectProject,
  onOpenEditProjectModal,
  onDeleteProject,
}) => {
  const accentColor = "#20c997";

  return (
    <div
      className="p-3"
      style={{ backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}
    >
      <h4 style={{ color: accentColor }}>Projects</h4>
      {projectsLoading ? (
        <Spinner animation="border" variant="light" />
      ) : projectsError ? (
        <Alert variant="danger">{projectsError}</Alert>
      ) : (
        <>
          <ListGroup variant="flush">
            {projects.map((project) => (
              <ListGroup.Item
                key={project.id}
                active={selectedProject?.id === project.id}
                action
                onClick={() => onSelectProject(project)}
                style={{
                  backgroundColor: selectedProject?.id === project.id ? accentColor : "#333",
                  color: "#fff",
                  border: "none",
                  marginBottom: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                {project.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {selectedProject && (
            <div className="mt-3 d-flex justify-content-between">
              <Button
                style={{ backgroundColor: accentColor, borderColor: accentColor }}
                onClick={onOpenEditProjectModal}
              >
                Edit Project
              </Button>
              <Button variant="danger" onClick={onDeleteProject}>
                Delete Project
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsTab;
