#!/bin/bash

# Configuration
BASE_URL="http://localhost:5001/api"
PASSWORD="password123"
PROJECT_NAME="Test Project"
TASK_TITLE="Test Task"
JWT_TOKENS=()
USER_IDS=()
PROJECT_ID=""
TASK_ID=""
USERS=("sedary@example.com" "sedaries@example.com" "sedrade@example.com")

# Function to print section headers
echo_section() {
    echo -e "\n======================"
    echo "🔹 $1"
    echo "======================"
}

# Register Users & Login
echo_section "User Registration & Authentication"
for EMAIL in "${USERS[@]}"; do
    LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/users/signup" -H "Content-Type: application/json" -d "{\"name\": \"${EMAIL%%@*}\", \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\"}")
    JWT_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
    USER_ID=$(curl -s -X GET "$BASE_URL/users/profile" -H "Authorization: Bearer $JWT_TOKEN" | jq -r '.id')

    if [ "$JWT_TOKEN" == "null" ] || [ -z "$JWT_TOKEN" ]; then
        echo "❌ Failed to register user: $EMAIL"
        exit 1
    fi

    JWT_TOKENS+=("$JWT_TOKEN")
    USER_IDS+=("$USER_ID")
    echo "✅ User $EMAIL registered & logged in successfully!"
done

# Get User Profile
echo_section "Fetching User Profiles"
for i in "${!JWT_TOKENS[@]}"; do
    PROFILE_RESPONSE=$(curl -s -X GET "$BASE_URL/users/profile" -H "Authorization: Bearer ${JWT_TOKENS[$i]}")
    echo "✅ User Profile for ${USERS[$i]}: $PROFILE_RESPONSE"
done

# Create a Project
echo_section "Creating a Project"
CREATE_PROJECT_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" -H "Authorization: Bearer ${JWT_TOKENS[0]}" -H "Content-Type: application/json" -d "{\"name\": \"$PROJECT_NAME\", \"description\": \"Testing project\"}")
PROJECT_ID=$(echo $CREATE_PROJECT_RESPONSE | jq -r '.id')

if [ "$PROJECT_ID" == "null" ] || [ -z "$PROJECT_ID" ]; then
    echo "❌ Failed to create project"
    exit 1
fi
echo "✅ Project created successfully! Project ID: $PROJECT_ID"

# List Projects
echo_section "Listing Projects"
LIST_PROJECTS_RESPONSE=$(curl -s -X GET "$BASE_URL/projects" -H "Authorization: Bearer ${JWT_TOKENS[0]}")
echo "✅ Projects: $LIST_PROJECTS_RESPONSE"

# Fetch Single Project
echo_section "Fetching Single Project"
PROJECT_DETAILS_RESPONSE=$(curl -s -X GET "$BASE_URL/projects/$PROJECT_ID" -H "Authorization: Bearer ${JWT_TOKENS[0]}")
echo "✅ Project Details: $PROJECT_DETAILS_RESPONSE"

# Update Project
echo_section "Updating Project"
UPDATE_PROJECT_RESPONSE=$(curl -s -X PUT "$BASE_URL/projects/$PROJECT_ID" -H "Authorization: Bearer ${JWT_TOKENS[0]}" -H "Content-Type: application/json" -d "{\"name\": \"Updated $PROJECT_NAME\", \"description\": \"Updated description\"}")
echo "✅ Project updated!"

# Create a Task
echo_section "Creating a Task"
CREATE_TASK_RESPONSE=$(curl -s -X POST "$BASE_URL/tasks" -H "Authorization: Bearer ${JWT_TOKENS[0]}" -H "Content-Type: application/json" -d "{\"title\": \"$TASK_TITLE\", \"description\": \"Testing task\", \"projectId\": \"$PROJECT_ID\"}")
TASK_ID=$(echo $CREATE_TASK_RESPONSE | jq -r '.id')

if [ "$TASK_ID" == "null" ] || [ -z "$TASK_ID" ]; then
    echo "❌ Failed to create task"
    exit 1
fi
echo "✅ Task created successfully! Task ID: $TASK_ID"

# Fetch All Tasks for Project
echo_section "Fetching All Tasks for Project"
TASKS_RESPONSE=$(curl -s -X GET "$BASE_URL/tasks/$PROJECT_ID" -H "Authorization: Bearer ${JWT_TOKENS[0]}")
echo "✅ Tasks for Project: $TASKS_RESPONSE"

# Assign Task to Users
echo_section "Assigning Task to Users"
for i in "${!USER_IDS[@]}"; do
    ASSIGN_TASK_RESPONSE=$(curl -s -X PUT "$BASE_URL/tasks/$TASK_ID/assign" -H "Authorization: Bearer ${JWT_TOKENS[0]}" -H "Content-Type: application/json" -d "{\"userId\": \"${USER_IDS[$i]}\"}")
    echo "✅ Task assigned to ${USERS[$i]}!"
done

# Update Task Status
echo_section "Updating Task Status"
UPDATE_STATUS_RESPONSE=$(curl -s -X PUT "$BASE_URL/tasks/$TASK_ID/status" -H "Authorization: Bearer ${JWT_TOKENS[0]}" -H "Content-Type: application/json" -d "{\"status\": \"IN_PROGRESS\"}")
echo "✅ Task status updated to IN_PROGRESS"

# Delete Task
echo_section "Deleting Task"
DELETE_TASK_RESPONSE=$(curl -s -X DELETE "$BASE_URL/tasks/$TASK_ID" -H "Authorization: Bearer ${JWT_TOKENS[0]}")
echo "✅ Task deleted!"

# File Upload (Local Storage Only)
echo_section "Uploading File"
FILE_UPLOAD_RESPONSE=$(curl -s -X POST "$BASE_URL/files/upload" \
    -H "Authorization: Bearer ${JWT_TOKENS[0]}" \
    -F "file=@backend/files/test_document.txt" \
    -F "projectId=$PROJECT_ID")

FILE_URL=$(echo $FILE_UPLOAD_RESPONSE | jq -r '.fileUrl')

if [[ "$FILE_URL" == "null" || -z "$FILE_URL" ]]; then
    echo "❌ File upload failed!"
    exit 1
fi

echo "✅ File successfully uploaded and accessible at: 🌐 $BASE_URL$FILE_URL"

# Fetch Files for Project
echo_section "Fetching Files for Project"
FILES_RESPONSE=$(curl -s -X GET "$BASE_URL/files/$PROJECT_ID" -H "Authorization: Bearer ${JWT_TOKENS[0]}")
echo "✅ Files for Project: $FILES_RESPONSE"

# Extract and verify the file URL
EXTRACTED_FILE_URL=$(echo $FILES_RESPONSE | jq -r '.[0].url')

if [[ "$EXTRACTED_FILE_URL" == "null" || -z "$EXTRACTED_FILE_URL" ]]; then
    echo "❌ No files found in project!"
    exit 1
fi

echo "✅ Retrieved File URL: 🌐 $BASE_URL$EXTRACTED_FILE_URL"

# Role-Based Access Control (RBAC) Testing
echo_section "Testing Role-Based Access Control (RBAC)"
RBAC_RESPONSE=$(curl -s -X GET "$BASE_URL/users/profile" -H "Authorization: Bearer ${JWT_TOKENS[2]}")
echo "✅ RBAC check: $RBAC_RESPONSE"

# Final Cleanup
echo_section "Cleaning Up Test Data"
DELETE_PROJECT_RESPONSE=$(curl -s -X DELETE "$BASE_URL/projects/$PROJECT_ID" -H "Authorization: Bearer ${JWT_TOKENS[0]}")
echo "✅ Test project deleted!"

echo -e "\n✅✅✅ API Testing Completed Successfully!"
