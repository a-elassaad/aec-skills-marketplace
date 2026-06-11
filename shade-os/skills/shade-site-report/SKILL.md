---
name: shade-site-report
description: >
  Generate a SHADE-branded Site Inspection Report as a Word (.docx) document. Use whenever someone
  at SHADE needs a site report, site visit report, inspection report, or snagging/observation
  record. Produces the SHADE house style: dual-logo header (SHADE + Shelter Group), an info block
  (Project / Location / Report No / Date / Inspected By / Present / Weather), a black section bar
  with report code (e.g. SIR-001), an observations table (#/Location/Observation/Status/Action By),
  a photo log, general notes, and the standard contacts + QATAR·UAE·LEBANON·KSA·FRANCE·ITALY·RWANDA
  footer. Trigger on "site report", "site visit", "inspection report", "snagging", "site observations".
---

# SHADE — Site Inspection Report (Word)

## Gather from user
- Project, location/area, report no (SIR-00x), date/time, inspector, attendees, weather.
- Observations: location, description, status (OPEN/CLOSED), action by; site photos if available.

## Build
- Reference script: `assets/scripts/build_docs.js` (function `siteReport`) + shared helpers `assets/scripts/docs_common.js`. Logos in `assets/logos/`.
- Copy both scripts + the `assets/logos` folder to the working dir, edit the `obs` array and the `infoGrid` values to the user's data, then run `npm install docx` and `node build_docs.js`. Deliver the `.docx`.
- Use the user's photos in the Photo Log; placeholders otherwise.

## House style (must hold)
- Dual-logo header + standard footer + page number on every page.
- Black section bar: "SITE INSPECTION" · "OBSERVATIONS" · report code.
- Observation status uses OPEN / CLOSED. Mark unknowns "TBD".
