---
name: shade-ffe-boq
description: >
  Generate a SHADE-branded FF&E / Bill of Quantities (BOQ) schedule as an Excel (.xlsx) workbook.
  Use whenever someone at SHADE needs a list of items, FF&E schedule, BOQ, furniture/appliances/
  sanitary/lighting schedule, or a "list of items" by apartment type or area. Produces the SHADE
  standard: a Project/Title/Date header with the SHADE logo, columns Apartment Type / Room / Item /
  Code / Category / Dimension / Qty / Remarks, styled frozen black header, banded rows, a TOTAL,
  a SUMMARY sheet rolling up quantity by category, and data validation on Category. Uses SHADE item
  coding (1B.DT4, 3B.SF, 3B.SAN1, …). Trigger on "FF&E", "BOQ", "list of items", "furniture
  schedule", "appliances list", "sanitary schedule", "lighting schedule", "bill of quantities".
---

# SHADE — FF&E / BOQ Schedule (Excel)

Generates a branded SHADE FF&E / BOQ workbook in the department standard.

## What to gather from the user
- Project name, title, date, reference (e.g. SG-M03 - R0).
- The items: per row → Apartment Type (1BHK/3BHK/…) or Floor/Area, Room, Item, Code, Category, Dimension, Qty, Remarks.
- Which categories apply (Furniture, Kitchen Appliances, Sanitary Wares, Lighting, Common Area Furniture, Outdoor Furniture, Accessories).

## How to build
1. Reference script: `assets/scripts/build_xlsx.py` (openpyxl). Logo: `assets/logos/shade logo 2.png`.
2. Copy the script to your working dir with the `assets/logos` folder, then **replace the `data` list** (and the title-block values) with the user's real items. Add more sheets (one per category/area) following the same structure if needed — mirror the user's source file's sheet split (e.g. RESIDENTIAL FURN, COMMON AREA FURN, APPLIANCES, SANITARY).
3. Run: `pip install openpyxl --break-system-packages` then `python3 build_xlsx.py`.
4. Deliver the `.xlsx`.

## SHADE standard (must hold)
- Header block: Project / Title / Date (and Ref) top-right, SHADE logo top-left.
- Column header row: black fill, white bold, centred, wrapped; freeze panes below it; repeat on print.
- Item code convention: `<type>.<item><n>` e.g. `1B.DT4` (1BHK Dining Table 4 pax), `3B.SF` (3BHK Sofa), `3B.SAN1` (sanitary).
- TOTAL row sums Qty; SUMMARY sheet = SUMIF roll-up of Qty by Category.
- Data validation drop-down on the Category column.

## Notes
- Keep dimensions as given ("Ø = 100 cm", "380 x 200 cm", "refer to dwgs", "TBD").
- Banded rows + thin light borders for readability; Arial 9.
