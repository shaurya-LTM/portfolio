# Shaurya — Portfolio & Private Portal

## Product areas

| Area | Audience | Purpose |
| --- | --- | --- |
| Public portfolio | Anyone | Projects, skills, achievements, contact, résumé |
| Creator studio | Shaurya (admin) | Create, edit, draft, publish, archive projects and updates |
| Student dashboard | Shaurya | Timetable, tasks, notices, documents, academic progress |
| Parent portal | Invited parent accounts | View-only access to permitted expenses, notices, academics, and deadlines |

## Roles and permission model

| Capability | Admin / Shaurya | Parent | Public visitor |
| --- | :---: | :---: | :---: |
| View public site | Yes | Yes | Yes |
| Manage portfolio content | Yes | No | No |
| View personal tasks/documents | Yes | Only explicitly shared | No |
| Add expenses | Yes | No | No |
| View expenses | Yes | Yes | No |
| View notices/class updates | Yes | Yes | No |
| Manage user access | Yes | No | No |

## First backend entities

```text
User: id, name, email, role, avatar, createdAt
Project: id, title, slug, summary, content, status, coverImage, links, publishedAt
Notice: id, title, body, attachmentUrl, visibility, dueDate, acknowledgedBy
Task: id, title, subject, dueDate, status, visibility
Expense: id, amount, category, date, merchant, receiptUrl, visibility
Document: id, title, fileUrl, category, visibility, uploadedBy
Permission: id, userId, resourceType, resourceId, accessLevel
AuditLog: id, actorId, action, targetType, targetId, createdAt
```

`visibility` is the crucial safety field. It should support `private`, `parents`, and (where appropriate) `public`; parent access must be enforced server-side, not merely hidden in the interface.

## Recommended implementation order

1. Public content management and secure sign-in.
2. Shaurya’s creator studio and project publishing workflow.
3. Student hub: tasks, timetable, notices, document storage.
4. Parent portal with read-only permissions and activity logs.
5. Expense records, receipt uploads, budgets, and parent summaries.
6. Notifications, analytics, backup/export, and two-factor authentication.

## Security baseline before real data

- Use a proper authentication provider with email verification and MFA for admin accounts.
- Store files in private storage; serve them through short-lived authorized links.
- Perform every role/permission check in the backend/API.
- Keep an audit trail for parent access and content sharing changes.
- Do not add school records, spending data, or personal documents until authentication and authorization are live.
