type AuditEvent = {
  level: "info" | "warn";
  message: string;
  request_id: string;
  actor_id?: string;
  action: string;
  target?: string;
  meta?: Record<string, unknown>;
};

export function audit(input: {
  action: string;
  actor_id?: string;
  target?: string;
  meta?: Record<string, unknown>;
  level?: "info" | "warn";
}) {
  const event: AuditEvent = {
    level: input.level ?? "info",
    message: input.action,
    request_id: crypto.randomUUID(),
    actor_id: input.actor_id,
    action: input.action,
    target: input.target,
    meta: input.meta,
  };
  console.info(JSON.stringify(event));
  return event;
}
