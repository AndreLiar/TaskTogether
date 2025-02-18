// src/pages/DashboardChat.tsx
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import ChatTab from "../components/dashboard/ChatTab";
import { getProjects } from "../services/projectService";
import { getChatHistory, sendMessage } from "../services/chatService";
import { Project, ChatMessage } from "../types";

const DashboardChat: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsError, setProjectsError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

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

  // Fetch chat messages when a project is selected
  useEffect(() => {
    if (selectedProject) {
      const fetchChatMessages = async () => {
        setChatLoading(true);
        try {
          const messages = await getChatHistory(selectedProject.id);
          setChatMessages(messages as ChatMessage[]);
        } catch (err) {
          console.error("Error fetching chat messages:", err);
        } finally {
          setChatLoading(false);
        }
      };
      fetchChatMessages();
    }
  }, [selectedProject]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedProject) {
      try {
        await sendMessage(selectedProject.id, newMessage);
        const messages = await getChatHistory(selectedProject.id);
        setChatMessages(messages as ChatMessage[]);
        setNewMessage("");
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  return (
    <>
      {projectsError && <Alert variant="danger">{projectsError}</Alert>}
      <div>Projects count: {projects.length}</div>
      <ChatTab
        selectedProject={selectedProject}
        chatMessages={chatMessages}
        chatLoading={chatLoading}
        newMessage={newMessage}
        onNewMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default DashboardChat;
