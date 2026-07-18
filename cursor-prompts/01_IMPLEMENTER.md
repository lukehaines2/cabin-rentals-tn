# Cursor Implementation Prompt

Read `AGENTS.md`, `PROJECT_CONTEXT.md`, and `docs/IMPLEMENTATION_STATUS.md`.

Select the highest-priority unblocked ticket from `docs/10_TICKET_BACKLOG.md` or the repository-specific implementation plan.

For the selected ticket:

1. Restate the user-visible outcome.
2. Confirm dependencies and scope boundaries.
3. Implement the smallest complete change.
4. Add or update automated tests.
5. Verify keyboard and responsive behaviour where relevant.
6. Update `docs/IMPLEMENTATION_STATUS.md`.
7. Record any new decision in `docs/17_DECISION_LOG.md`.
8. Do not introduce future-phase availability, payment, or reservation behaviour.

Return:

- files changed;
- tests run;
- acceptance criteria satisfied;
- remaining risks;
- recommended next ticket.
