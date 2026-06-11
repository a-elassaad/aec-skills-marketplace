---
name: shade-meeting-minutes
description: >
  Generate SHADE-branded Meeting Minutes as a Word (.docx) document. Use whenever someone at SHADE
  needs meeting minutes, minutes of meeting (MOM), or a record of a project/design/coordination
  meeting with actions. Produces the SHADE house style: dual-logo header, an info block (Project /
  Meeting No / Date / Time / Location / Chaired By / Attendees / Apologies / Distribution), a black
  section bar with code (e.g. MOM-001), a decisions/actions table (#/Item/Action By/Due/Status),
  notes, and the standard footer. Trigger on "meeting minutes", "minutes of meeting", "MOM",
  "meeting notes", "action items from the meeting".
---

# SHADE — Meeting Minutes (Word)

## Gather from user
- Project, meeting no (MOM-00x), date/time, location, chair, attendees, apologies, distribution.
- Discussion items + actions: description, action by, due date, status (OPEN/CLOSED).

## Build
- Reference script: `assets/scripts/build_docs.js` (function `minutes`) + `assets/scripts/docs_common.js`. Logos in `assets/logos/`.
- Copy scripts + `assets/logos` to the working dir, edit the `items` array and `infoGrid` values, run `npm install docx` then `node build_docs.js`. Deliver the `.docx`.
- If raw notes are given, extract decisions and actions into the table; keep one action per row.

## House style (must hold)
- Dual-logo header + standard footer + page number on every page.
- Black section bar: "MEETING MINUTES" · "ACTIONS" · meeting code.
- Each action has an owner and a due date.
