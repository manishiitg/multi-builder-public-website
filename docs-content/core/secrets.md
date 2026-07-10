# Secrets

Secrets allow sensitive credentials (API keys, database passwords, tokens) to be securely injected into agent queries, workflow steps, and delegated sub-agents without exposing them in chat history or logs.

There are three types of secrets:

| Type | Defined by | Stored in | Scope |
|------|-----------|-----------|-------|
| **Workflow Secrets** | End user via workflow edit UI or builder tools | Server-side per-user encrypted store | One workflow, opt-in selection |
| **User Secrets** | End user via frontend UI | Browser localStorage plus server-side per-user encrypted store when synced | Reusable by the user, opt-in selection |
| **Global Secrets** | Admin via environment variables | Server memory (plaintext from env) | All queries, always included |

## User Secrets

### How It Works

1. User creates a secret in the **Secrets Manager** modal (name + value).
2. The value is encrypted server-side using AES-256-GCM (derived from `AUTH_SECRET`) and stored in the browser's localStorage.
3. When sending a query, the user selects which secrets to include.
4. Selected secrets are decrypted server-side and injected into the agent's prompt at runtime.

## Workflow Secrets

Workflow secrets are encrypted with the same AES-256-GCM mechanism as user secrets, but are stored under a per-user/per-workflow key in workspace docs:

```text
_users/<userID>/workflow_secrets/<workflow-hash>.json
```

Only names are stored in `workflow.json` under `capabilities.selected_secrets`. Runtime resolves each selected name from the workflow store first, then the reusable user store, then global secrets.

### Encryption

- **Algorithm**: AES-256-GCM
- **Key derivation**: HMAC-SHA256 of `AUTH_SECRET` with context `"secrets-encryption-key"`
- **Per-user isolation**: User ID is used as Additional Authenticated Data (AAD), preventing cross-user decryption.

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/secrets/encrypt` | Encrypt a plaintext value |
| POST | `/api/secrets/decrypt` | Decrypt an encrypted value |

## Global Secrets

Global secrets are admin-defined credentials loaded from environment variables at server startup. They are automatically merged into every query (chat, workflow, delegation) without user interaction.

### Configuration

Set environment variables with the `GLOBAL_SECRET_` prefix:

```bash
GLOBAL_SECRET_OPENAI_KEY=sk-xxx
GLOBAL_SECRET_DB_PASSWORD=pass123
GLOBAL_SECRET_GITHUB_TOKEN=ghp_abc123
```

The secret name is derived from the suffix after `GLOBAL_SECRET_`:
- `GLOBAL_SECRET_OPENAI_KEY` becomes secret name `OPENAI_KEY`
- `GLOBAL_SECRET_DB_PASSWORD` becomes secret name `DB_PASSWORD`

Values can be plain strings or JSON:

```bash
GLOBAL_SECRET_CLICKHOUSE_CONFIG={"host":"10.0.0.1","port":"8123","user":"reader","password":"secret"}
```

### Kubernetes Deployment

For K8s deployments, add global secrets to the `deploy/k8s/.env` file (gitignored), then load them into your K8s Secret resource (`prod-mcpagent-secret`). The agent deployment already mounts this secret via `envFrom`.

### API Endpoint

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/secrets/global` | Returns global secret names (no values) |

Response:
```json
[{"name": "OPENAI_KEY"}, {"name": "DB_PASSWORD"}]
```

### Merge Behavior

When a query is processed, global secrets are merged with user-selected secrets:

1. Global secrets are prepended to the list.
2. If a user secret has the same name as a global secret, the **user secret wins** (user override).
3. The merged list is injected into chat queries, workflow orchestrators, and delegated sub-agents.

### Frontend Display

Global secrets appear in both the **Secrets Manager** modal and the **Secret Selection** panel:

- Shown as read-only entries with a "Global" badge
- Values are masked (`••••••••`) — not decryptable from the frontend
- No checkbox — always included automatically
- Displayed above user secrets with a visual separator

## Injection Format

Secrets are injected into agent prompts in this format:

```
🔐 Secrets:
### SECRET_NAME
\```
secret_value
\```
```

For workflow mode, secrets are passed to the orchestrator which injects them into each step's system prompt. For delegation, the parent's merged secrets are inherited by sub-agents.
