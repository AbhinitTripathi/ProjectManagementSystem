/*
An object representing the possible roles a user can have.
This acts as a simple "enum" in JavaScript, providing a central
source of truth for all role identifiers used in the application.
*/
export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

/*
An array containing only the values of UserRolesEnum.
Example: ["admin", "project_admin", "member"]
 */
export const AvailableUserRole = Object.values(UserRolesEnum);

/*
Enum-like object listing all possible statuses a task can have.
 */
export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

/*
Array of only the values from TaskStatusEnum.
Example: ["todo", "in_progress", "done"]\
 */
export const AvailableTaskStatus = Object.values(TaskStatusEnum);
