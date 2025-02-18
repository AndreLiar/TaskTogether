// src/pages/DashboardVideoCalls.tsx
import React, { useEffect, useState } from "react";
import { Alert, Modal, Button, Form } from "react-bootstrap";
import VideoCallsTab from "../components/dashboard/VideoCallsTab";
import { getProjects } from "../services/projectService";
import { getVideoCallHistory, startVideoCall } from "../services/videoCallService";
import { Project, VideoCall } from "../types";

const DashboardVideoCalls: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsError, setProjectsError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [videoCalls, setVideoCalls] = useState<VideoCall[]>([]);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [videoCallRoomUrl, setVideoCallRoomUrl] = useState("");

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

  // Fetch video call history when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const fetchVideoCalls = async () => {
        try {
          const v = await getVideoCallHistory(selectedProject.id);
          setVideoCalls(v as VideoCall[]);
        } catch (err) {
          console.error("Error fetching video calls:", err);
        }
      };
      fetchVideoCalls();
    }
  }, [selectedProject]);

  const handleStartVideoCall = async () => {
    if (selectedProject) {
      try {
        const result = await startVideoCall(selectedProject.id);
        if (result && result.roomUrl) {
          setVideoCallRoomUrl(result.roomUrl);
          setShowVideoCallModal(true);
        }
        const v = await getVideoCallHistory(selectedProject.id);
        setVideoCalls(v as VideoCall[]);
      } catch (err) {
        console.error("Error starting video call:", err);
      }
    }
  };

  return (
    <>
      {projectsError && <Alert variant="danger">{projectsError}</Alert>}
      {projects.length === 0 && (
        <Alert variant="warning">No Projects Found</Alert>
      )}
      <VideoCallsTab
        selectedProject={selectedProject}
        videoCalls={videoCalls}
        onStartVideoCall={handleStartVideoCall}
      />

      {/* Video Call Modal */}
      <Modal show={showVideoCallModal} onHide={() => setShowVideoCallModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Video Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Join the video call using the link below:</p>
          <Form.Control type="text" readOnly value={videoCallRoomUrl} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVideoCallModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardVideoCalls;
