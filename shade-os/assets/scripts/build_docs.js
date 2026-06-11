const fs=require('fs');
const C=require('./docs_common.js');
const {D,header,footer,bar,title,H,body,infoGrid,grid,bullet,bullets,page,png,L}=C;
const {Document,Packer,Paragraph,TextRun,PageBreak,AlignmentType,BorderStyle}=D;
function save(doc,name){return Packer.toBuffer(doc).then(b=>{fs.writeFileSync(name,b);console.log("written",name,b.length);});}

// ---------- SITE INSPECTION REPORT ----------
function siteReport(){
 const obsW=[700,2200,4500,1300,C.CW-8700];
 const obs=[
  ["1","Living Room","Skirting not aligned at NE corner; gap ~4mm.","OPEN","Contractor"],
  ["2","Master Bath","Wall tile lippage exceeds tolerance near vanity.","OPEN","Contractor"],
  ["3","Kitchen","Cabinet handles match approved sample.","CLOSED","—"],
  ["4","Corridor","Paint touch-ups required after MEP works.","OPEN","Contractor"],
  ["5","Balcony","Waterproofing test pending sign-off.","OPEN","SHADE / MEP"],
 ];
 return new Document({styles:{default:{document:{run:{font:"Arial",size:19}}}},
  sections:[{properties:{page},headers:{default:header()},footers:{default:footer()},children:[
   title("Site Inspection Report"),
   infoGrid([["Project","Lusail Marina Heights"],["Location","Tower / Typical Floor"],["Report No","SIR-001"],["Date / Time","2026-06-10  ·  10:30"],["Inspected By","SHADE — A. ELAssaad"],["Present","Contractor, MEP, Client Rep"],["Weather","Clear, 41°C"]]),
   new Paragraph({spacing:{after:120},children:[new TextRun("")]}),
   bar("SITE INSPECTION","OBSERVATIONS","SIR-001"),
   new Paragraph({spacing:{after:80},children:[new TextRun("")]}),
   grid(["#","LOCATION","OBSERVATION","STATUS","ACTION BY"],obs,obsW),
   H("Photo Log"),
   new Paragraph({children:[png("assets/ph_porcelain.png",250,180),new TextRun("   "),png("assets/ph_oak.png",250,180)]}),
   H("General Notes"),
   bullet("Open items to be closed before next inspection."),
   bullet("Refer to marked-up drawings issued with this report."),
  ]}]});
}
// ---------- MEETING MINUTES ----------
function minutes(){
 const aW=[700,5600,2000,1400,C.CW-9700];
 const items=[
  ["1","Confirm final flooring selection for typical units.","SHADE","2026-06-17","OPEN"],
  ["2","Issue revised FF&E BOQ to cost consultant.","SHADE","2026-06-15","OPEN"],
  ["3","Client to approve lighting mock-up.","Client","2026-06-20","OPEN"],
  ["4","Contractor to submit material samples (3 nos).","Contractor","2026-06-18","OPEN"],
 ];
 return new Document({styles:{default:{document:{run:{font:"Arial",size:19}}}},
  sections:[{properties:{page},headers:{default:header()},footers:{default:footer()},children:[
   title("Meeting Minutes"),
   infoGrid([["Project","Lusail Marina Heights"],["Meeting No","MOM-001"],["Date / Time","2026-06-10  ·  14:00"],["Location","SHADE Office / Teams"],["Chaired By","A. ELAssaad (SHADE)"],["Attendees","SHADE, Client, Contractor, MEP"],["Apologies","—"],["Distribution","All attendees"]]),
   new Paragraph({spacing:{after:120},children:[new TextRun("")]}),
   bar("MEETING MINUTES","ACTIONS","MOM-001"),
   new Paragraph({spacing:{after:80},children:[new TextRun("")]}),
   grid(["#","ITEM / DISCUSSION","ACTION BY","DUE","STATUS"],items,aW),
   H("Notes"),
   bullet("Decisions are final unless objected to within 48 hours."),
   bullet("Next meeting: 2026-06-17, 14:00."),
  ]}]});
}
// ---------- DESIGN PROPOSAL ----------
function proposal(){
 const feeW=[1500,C.CW-4000,2500];
 const fees=[
  ["Stage 1","Concept Design","QAR 120,000"],
  ["Stage 2","Design Development","QAR 160,000"],
  ["Stage 3","Tender & Documentation","QAR 140,000"],
  ["Stage 4","Site Supervision (per visit)","QAR 6,000 / visit"],
 ];
 const R=(t,b,sz)=>new Paragraph({alignment:AlignmentType.RIGHT,spacing:{after:30},children:[new TextRun({text:t,bold:!!b,size:sz||22,color:C.BLK,font:"Arial"})]});
 return new Document({numbering:bullets,styles:{default:{document:{run:{font:"Arial",size:19}}}},
  sections:[{properties:{page},headers:{default:header()},footers:{default:footer()},children:[
   ...Array(10).fill(0).map(()=>new Paragraph({children:[new TextRun("")]})),
   R("DESIGN PROPOSAL",false,30),R("INTERIOR FIT-OUT",true,40),
   new Paragraph({alignment:AlignmentType.RIGHT,spacing:{before:20},border:{bottom:{style:BorderStyle.SINGLE,size:12,color:C.BLK,space:8}},children:[new TextRun("")]}),
   R("CLIENT:  PRIVATE CLIENT",false,18),R("PROJECT:  LUSAIL MARINA HEIGHTS",false,18),R("REF:  SHADE-PRO-001 · JUNE 2026",false,18),
   new Paragraph({children:[new PageBreak()]}),
   H("1.  Introduction"),
   body("SHADE Architecture & Design is pleased to submit this proposal for the interior design and fit-out of the above project. This document sets out our scope, approach, deliverables, programme and fee."),
   H("2.  Scope of Services"),
   bullet("Interior concept and design development."),
   bullet("Material, finishes and FF&E selection and booklets."),
   bullet("Tender documentation and BOQ."),
   bullet("Site supervision and inspections."),
   H("3.  Design Approach"),
   body("A monochrome, refined and functional design language consistent with the SHADE identity, tailored to the project context in Lusail, Qatar."),
   H("4.  Deliverables"),
   bullet("Concept presentation and moodboards."),
   bullet("Material / finishes booklets and spec sheets."),
   bullet("FF&E / BOQ schedules."),
   bullet("Site inspection reports."),
   H("5.  Programme"),
   body("Indicative duration: 16 weeks from appointment to tender issue, subject to client approvals."),
   H("6.  Fee Proposal"),
   grid(["STAGE","DESCRIPTION","FEE"],fees,feeW),
   H("7.  Assumptions & Exclusions"),
   bullet("Fees exclude statutory approvals and authority submissions unless stated."),
   bullet("MEP and structural engineering by others."),
   H("8.  Acceptance"),
   body("Signed for and on behalf of the Client:"),
   new Paragraph({spacing:{before:300},children:[new TextRun({text:"Name: ____________________     Signature: ____________________     Date: __________",size:18,color:C.BLK,font:"Arial"})]}),
  ]}]});
}
Promise.all([save(siteReport(),"SHADE-Site-Report-v1.docx"),save(minutes(),"SHADE-Meeting-Minutes-v1.docx"),save(proposal(),"SHADE-Proposal-v1.docx")]).then(()=>console.log("ALL DONE"));
