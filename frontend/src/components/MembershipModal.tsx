// src/components/MembershipModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, ListGroup } from "react-bootstrap";
import { addProjectMember, getProjectMembers } from "../services/projectService";

interface MembershipModalProps {
  projectId: string;
  show: boolean;
  onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ projectId, show, onClose }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [newMemberId, setNewMemberId] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    const data = await getProjectMembers(projectId);
    if (data) {
      setMembers(data);
    } else {
      setError("Failed to fetch project members.");
    }
  };

  useEffect(() => {
    if (show) {
      fetchMembers();
    }
  }, [show, projectId]);

  const handleAddMember = async () => {
    setError("");
    if (!newMemberId.trim()) {
      setError("Please provide a valid user ID.");
      return;
    }
    const result = await addProjectMember(projectId, newMemberId.trim(), newMemberRole);
    if (result) {
      fetchMembers(); // Refresh member list
      setNewMemberId("");
    } else {
      setError("Failed to add member.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <h6>Current Members:</h6>
        {members.length > 0 ? (
          <ListGroup className="mb-3">
            {members.map((member) => (
              <ListGroup.Item key={member.user.id}>
                {member.user.name} ({member.user.email}) - {member.role}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No members found.</p>
        )}
        <Form.Group controlId="newMemberId">
          <Form.Label>Add Member (User ID)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="newMemberRole" className="mt-2">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={newMemberRole}
            onChange={(e) => setNewMemberRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddMember}>
          Add Member
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MembershipModal;
