# Cursor Orchestrator Prompt

You are the project lead and implementation planner for this repository.

Before writing code, read:

- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- every file under `docs/`

Then do the following:

1. Summarize the Phase 1 product in no more than 300 words.
2. List any contradictions between the documents.
3. List decisions that block implementation and apply documented safe defaults where possible.
4. Inspect the current repository and identify what already exists.
5. Produce a repository-specific phased execution plan.
6. Convert the plan into small tickets with dependencies and acceptance criteria.
7. Identify the smallest vertical slice that can be deployed to preview.
8. Create a task status document at `docs/IMPLEMENTATION_STATUS.md`.
9. Do not implement live availability, PMS integrations, OTA integrations, Stripe, or reservation creation.
10. Do not copy content or assets from the reference website.

The first vertical slice should normally be:

`Homepage search -> results -> property detail -> guest enquiry`

Use fixture data or the configured Payload seed. Dates are preferred dates only.

Stop after producing the plan and status file. Ask for approval before broad implementation unless the project lead has explicitly authorized immediate coding.
