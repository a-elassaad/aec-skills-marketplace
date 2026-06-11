---
name: shade-material-booklet
description: >
  Generate a SHADE-branded Material / Finishes Booklet as a Word (.docx) document. Use whenever
  someone at SHADE needs a materials booklet, finishes booklet, mock-up finishes document, or a
  material/finish spec sheet set. Produces the SHADE house style: black logo cover, dual-logo
  header (SHADE + Shelter Group), black section bar with item code (e.g. IFF-001), a spec table
  (Color/Finish/Size/Brand-Supplier/Origin), Location / Approval Signature / General Notes boxes,
  a product image area, an Instructions box, and the standard footer (contacts + QATAR · UAE ·
  LEBANON · KSA · FRANCE · ITALY · RWANDA + page number). Trigger on "material booklet", "finishes
  booklet", "mock-up finishes", "finish spec sheet", "IFF / IFJ item sheet".
---

# SHADE — Material / Finishes Booklet (Word)

Generates a branded SHADE finishes booklet in the department house style.

## What to gather from the user
- Project name + location (e.g. "Marina 03 | Lusail, Qatar"), reference code + revision (e.g. "260610 - R00").
- For each material/finish: section group (e.g. INTERNAL FINISHES), sub-section (FLOORING / JOINERY / WALL / CEILING…), item code (IFF-001, IFJ-001…), item name, and spec fields (Color, Finish, Size, Brand/Supplier, Origin), Location, General Notes, Instructions, and an image if available.

## How to build
1. Working assets live in this skill folder: `assets/logos/` (use `shade logo 2.png` = black for white pages, `shade logo.png` = white for the black cover, `SG-logo.png` = Shelter Group for the header, `SG-logowhite.png` for the cover foot). Reference build script: `assets/scripts/build4.js` (docx-js) + cover/image generators `assets/scripts/gen_cover.py`, `gen2.py`.
2. Copy `build4.js` to your working dir, copy the `assets/logos` folder next to it, then **edit the `items` array** (and cover project/ref text) to the user's real data. Each item = `[GROUP, SUBSECTION, CODE, {item, rows:[[label,value]...], location, notes:[...]}, imagePath, instructions, isFirst]`.
3. For product images, use the user's supplied images; otherwise `gen2.py` makes neutral placeholders.
4. Setup + run (sandbox): `npm install docx` then `node build4.js`. Validate with the docx skill's `validate.py`. Optionally render to PDF/PNG to preview.
5. Deliver the `.docx` to the user (save to their folder / SharePoint).

## Brand rules (must hold)
- Monochrome: black `#111111` + white. Arial (safe in Word) unless SHADE specifies a brand font.
- Cover = black, white SHADE logo centred, title block, Shelter Group logo at foot.
- Every content page: dual-logo header + the standard contacts/countries footer + page number.
- Black section bar carries GROUP (left) · SUBSECTION (right) · CODE (far right).
- Item codes follow SHADE convention: IFF = Internal Finishes Flooring, IFJ = Joinery, IFW = Wall, etc.

## Notes
- This is the v4 layout approved by SHADE. Keep the Approval Signature box for sign-off.
- Mark unknowns "TBD" and flag anything code-related for verification.
