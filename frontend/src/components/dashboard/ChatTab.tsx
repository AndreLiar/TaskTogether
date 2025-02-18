// src/components/dashboard/ChatTab.tsx

import React from "react";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { ChatMessage, Project } from "../../types";

interface ChatTabProps {
  selectedProject: Project | null;
  chatMessages: ChatMessage[];
  chatLoading: boolean;
  newMessage: string;
  onNewMessageChange: (msg: string) => void;
  onSendMessage: () => void;
}

const ChatTab: React.FC<ChatTabProps> = ({
  selectedProject,
  chatMessages,
  chatLoading,
  newMessage,
  onNewMessageChange,
  onSendMessage,
}) => {
  if (!selectedProject) return <Alert variant="info">Select a project to view chat.</Alert>;
  return (
    <div className="p-3" style={{ backgroundColor: "#000", color: "#fff", borderRadius: "8px" }}>
      <h4 style={{ color: "#20c997" }}>Chat - {selectedProject.name}</h4>
      {chatLoading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {chatMessages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{msg.senderName}:</strong> {msg.content}
            </div>
          ))}
        </div>
      )}
      <Form className="mt-3">
        <Form.Group controlId="chatMessage">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            style={{ backgroundColor: "#333", color: "#fff", border: "none" }}
          />
        </Form.Group>
        <Button
          className="mt-2"
          style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
          onClick={onSendMessage}
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ChatTab;
