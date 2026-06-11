---
name: shade-selection-deck
description: >
  Generate a SHADE-branded Selection Presentation as a PowerPoint (.pptx) in landscape mock-up
  style. Use whenever someone at SHADE needs a selection deck / mock-up presentation — decorative
  lighting selection, furniture selection, finishes presentation, FF&E mood/selection per room.
  Produces the SHADE house style: dark title slide with the SHADE logo, light textured content
  slides with the SHADE logo top-right, a rotated vertical section label, a plan close-up + key
  plan area, a "/ ROOM NAME" tag, and fixture/item selection grids (image + code + name). Trigger
  on "selection presentation", "lighting selection", "furniture selection", "mock-up deck",
  "selection mockup", "moodboard deck", "present selections".
---

# SHADE — Selection Presentation (PowerPoint)

Generates a branded SHADE selection deck in the landscape mock-up style.

## What to gather from the user
- Project name + reference, the selection type (lighting / furniture / finishes), and the rooms.
- Per room: a plan close-up image + key-plan image if available (else placeholders), and the items selected (code + name + image).

## How to build
1. Reference script: `assets/scripts/build_pptx.py` (python-pptx) + `assets/scripts/gen_ppt_assets.py` (textured backgrounds + placeholders). Logos in `assets/logos/`.
2. Copy the scripts + `assets/logos` to your working dir. Run `gen_ppt_assets.py` to make the textured background + placeholders, then **edit the slide content** (project title, room name, the `fixtures` list) to the user's data. Add one room slide per room.
3. Run: `pip install python-pptx pillow --break-system-packages` then `python3 build_pptx.py`.
4. Deliver the `.pptx`.

## SHADE style (must hold)
- 16:9 landscape. Title slide = dark (`#0E0E0E`) with the white SHADE logo + project title.
- Content slides = light textured background (`bg.png`), black SHADE logo top-right.
- Rotated vertical section label on the left (e.g. "DECORATIVE LIGHT SELECTION").
- Plan close-up (large) + Key Plan (small, right); room tag bottom-left as "/  ROOM NAME".
- Fixture/selection grid: image placeholder + code (bold) + name, in a row.

## Notes
- Use the user's plan exports and product images where provided; placeholders otherwise.
- Keep it monochrome/neutral; let the product images carry the colour.
