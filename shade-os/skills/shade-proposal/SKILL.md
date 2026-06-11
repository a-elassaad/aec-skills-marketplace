---
name: shade-proposal
description: >
  Generate a SHADE-branded Design Proposal / fee proposal as a Word (.docx) document. Use whenever
  someone at SHADE needs a design proposal, fee proposal, scope-of-services document, or a client
  offer for interior/architecture services. Produces the SHADE house style: a branded cover
  (DESIGN PROPOSAL + project/client/ref), dual-logo header + standard footer, and numbered sections
  — Introduction, Scope of Services, Design Approach, Deliverables, Programme, Fee Proposal (table),
  Assumptions & Exclusions, and an Acceptance/signature block. Trigger on "proposal", "fee proposal",
  "design proposal", "scope of services", "client offer", "EOI".
---

# SHADE — Design Proposal (Word)

## Gather from user
- Client, project, reference (SHADE-PRO-00x), date.
- Scope items, deliverables, programme duration, and the fee schedule (stage / description / fee in QAR).
- Any assumptions/exclusions specific to the job.

## Build
- Reference script: `assets/scripts/build_docs.js` (function `proposal`) + `assets/scripts/docs_common.js`. Logos in `assets/logos/`.
- Copy scripts + `assets/logos` to the working dir, edit the cover text, section bodies, bullet lists and the `fees` table, run `npm install docx` then `node build_docs.js`. Deliver the `.docx`.

## House style (must hold)
- Cover-style first page with the project/client/ref block and a black rule.
- Dual-logo header + standard footer + page number on content pages.
- Numbered section headings with a black underline rule; fees in a black-header table; QAR currency.
- Keep an Acceptance signature line at the end.
