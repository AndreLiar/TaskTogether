// src/components/dashboard/VideoCallsTab.tsx

import React from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import { VideoCall, Project } from "../../types";

interface VideoCallsTabProps {
  selectedProject: Project | null;
  videoCalls: VideoCall[];
  onStartVideoCall: () => void;
}

const VideoCallsTab: React.FC<VideoCallsTabProps> = ({ selectedProject, videoCalls, onStartVideoCall }) => {
  if (!selectedProject) return <Alert variant="info">Select a project to view video calls.</Alert>;
  return (
    <div className="p-3" style={{ backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}>
      <h4 style={{ color: "#20c997" }}>Video Calls - {selectedProject.name}</h4>
      <Button style={{ backgroundColor: "#20c997", borderColor: "#20c997" }} onClick={onStartVideoCall}>
        Start Video Call
      </Button>
      <ListGroup className="mt-3" variant="flush">
        {videoCalls.map((call) => (
          <ListGroup.Item
            key={call.id}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              marginBottom: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {new Date(call.createdAt).toLocaleString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default VideoCallsTab;
