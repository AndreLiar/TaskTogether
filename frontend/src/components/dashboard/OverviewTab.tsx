// src/components/dashboard/OverviewTab.tsx

import React from "react";
import { Spinner, Alert, ListGroup, Button } from "react-bootstrap";
import { Project } from "../../types"; 

interface OverviewTabProps {
  projects: Project[];
  projectsLoading: boolean;
  projectsError: string;
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onCreateProject: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  projects,
  projectsLoading,
  projectsError,
  selectedProject,
  onSelectProject,
  onCreateProject,
}) => {
  return (
    <div className="p-3" style={{ backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}>
      <h4 style={{ color: "#20c997" }}>Your Projects</h4>
      {projectsLoading ? (
        <Spinner animation="border" variant="light" />
      ) : projectsError ? (
        <Alert variant="danger">{projectsError}</Alert>
      ) : (
        <ListGroup variant="flush">
          {projects.map((project) => (
            <ListGroup.Item
              key={project.id}
              active={selectedProject?.id === project.id}
              action
              onClick={() => onSelectProject(project)}
              style={{
                backgroundColor: selectedProject?.id === project.id ? "#20c997" : "#333",
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
      )}
      <Button
        className="mt-3"
        style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
        onClick={onCreateProject}
      >
        Create New Project
      </Button>
    </div>
  );
};

export default OverviewTab;
