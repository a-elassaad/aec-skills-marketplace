const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,ImageRun,Header,Footer,
AlignmentType,WidthType,BorderStyle,ShadingType,VerticalAlign,PageNumber,TabStopType,PageBreak}=require('docx');
const L="./assets/logos/";
const BLK="111111",GRY="6E6E6E",LN="D8D5CF",SOFT="F4F2EE";
const A4W=11906,MAR=720,CW=A4W-2*MAR; // 10466
const png=(p,w,h)=>new ImageRun({type:"png",data:fs.readFileSync(p),transformation:{width:w,height:h},altText:{title:"i",description:"i",name:"i"}});
const NB={style:BorderStyle.NONE},NOBORD={top:NB,bottom:NB,left:NB,right:NB};
const thin={style:BorderStyle.SINGLE,size:1,color:LN},allthin={top:thin,bottom:thin,left:thin,right:thin};

// header: SHADE left, SHELTER right, rule under
const header=new Header({children:[new Paragraph({
 tabStops:[{type:TabStopType.RIGHT,position:CW}],
 border:{bottom:{style:BorderStyle.SINGLE,size:4,color:"C9C6C0",space:6}},
 children:[png(L+"shade logo 2.png",120,30), new TextRun("\t"), png(L+"SG-logo.png",138,27)]})]});

const footer=new Footer({children:[
 new Paragraph({border:{top:{style:BorderStyle.SINGLE,size:4,color:"C9C6C0",space:6}},tabStops:[{type:TabStopType.RIGHT,position:CW}],
  children:[new TextRun({text:"Tel ",bold:true,size:12,color:BLK,font:"Arial"}),new TextRun({text:"+974 44699677    ",size:12,color:GRY,font:"Arial"}),
   new TextRun({text:"Email ",bold:true,size:12,color:BLK,font:"Arial"}),new TextRun({text:"shelter@shelter.co    ",size:12,color:GRY,font:"Arial"}),
   new TextRun({text:"Fax ",bold:true,size:12,color:BLK,font:"Arial"}),new TextRun({text:"+974 44581236",size:12,color:GRY,font:"Arial"}),
   new TextRun("\t"),new TextRun({children:[PageNumber.CURRENT],size:14,color:BLK,font:"Arial"})]}),
 new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:CW}],
  children:[new TextRun({text:"www.shelter.co     SHELTER Qatar W.L.L.     Burj Doha, West Bay",size:12,color:GRY,font:"Arial"}),
   new TextRun("\t"),new TextRun({text:"QATAR  ",bold:true,size:12,color:BLK,font:"Arial"}),
   new TextRun({text:"UAE  LEBANON  KSA  FRANCE  ITALY  RWANDA",size:12,color:GRY,font:"Arial"})]})]});

// section bar
function bar(cat,sub,code){const sh={fill:BLK,type:ShadingType.CLEAR};
 const c=(t,w,al)=>new TableCell({width:{size:w,type:WidthType.DXA},shading:sh,borders:NOBORD,margins:{top:60,bottom:60,left:160,right:160},verticalAlign:VerticalAlign.CENTER,
  children:[new Paragraph({alignment:al,children:[new TextRun({text:t,bold:true,size:18,characterSpacing:20,color:"FFFFFF",font:"Arial"})]})]});
 return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[5000,3800,CW-8800],
  rows:[new TableRow({children:[c(cat,5000,AlignmentType.LEFT),c(sub,3800,AlignmentType.RIGHT),c(code,CW-8800,AlignmentType.CENTER)]})]});}

function labelBar(t){return new Paragraph({spacing:{before:160,after:0},shading:{fill:SOFT,type:ShadingType.CLEAR},
 children:[new TextRun({text:" "+t.toUpperCase(),bold:true,size:15,characterSpacing:20,color:BLK,font:"Arial"})]});}
function specTable(title,rows){
 const head=new TableRow({children:[new TableCell({columnSpan:2,shading:{fill:SOFT,type:ShadingType.CLEAR},borders:allthin,margins:{top:60,bottom:60,left:120,right:120},
   children:[new Paragraph({children:[new TextRun({text:title.toUpperCase(),bold:true,size:18,color:BLK,font:"Arial"})]})]})]});
 const trs=rows.map(([k,v])=>new TableRow({children:[
  new TableCell({width:{size:1300,type:WidthType.DXA},borders:allthin,margins:{top:40,bottom:40,left:120,right:80},
   children:[new Paragraph({children:[new TextRun({text:k.toUpperCase(),size:13,characterSpacing:10,color:GRY,font:"Arial"})]})]}),
  new TableCell({width:{size:2400,type:WidthType.DXA},borders:allthin,margins:{top:40,bottom:40,left:120,right:80},
   children:[new Paragraph({children:[new TextRun({text:v,size:16,color:BLK,font:"Arial"})]})]})]}));
 return new Table({width:{size:3700,type:WidthType.DXA},columnWidths:[1300,2400],rows:[head,...trs]});}
function box(lines,minH){return new Table({width:{size:3700,type:WidthType.DXA},columnWidths:[3700],
 rows:[new TableRow({height:minH?{value:minH,rule:"atLeast"}:undefined,children:[new TableCell({borders:allthin,margins:{top:60,bottom:60,left:120,right:120},
  children:lines.length?lines.map(t=>new Paragraph({spacing:{after:30},children:[new TextRun({text:t,size:15,color:"333333",font:"Arial"})]})):[new Paragraph({children:[new TextRun("")]})]})]})]});}

function leftCol(spec){return new TableCell({width:{size:3700,type:WidthType.DXA},verticalAlign:VerticalAlign.TOP,borders:NOBORD,margins:{top:0,bottom:0,left:0,right:200},children:[
 specTable(spec.item,spec.rows),
 labelBar("Location"), box([spec.location]),
 labelBar("Approval Signature"), box([],900),
 labelBar("General Notes"), box(spec.notes),
]});}
function rightCol(imgPath){return new TableCell({width:{size:CW-3700,type:WidthType.DXA},verticalAlign:VerticalAlign.TOP,borders:NOBORD,children:[
 new Paragraph({alignment:AlignmentType.CENTER,children:[png(imgPath,430,430)]}),
 new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:60},children:[new TextRun({text:"Indicative image — subject to physical sample approval",italics:true,size:13,color:GRY,font:"Arial"})]}),
]});}
function itemPage(cat,sub,code,spec,img,instr,first){return [
 new Paragraph({pageBreakBefore:!first,spacing:{after:120},children:[new TextRun("")]}),
 bar(cat,sub,code),
 new Paragraph({spacing:{after:80},children:[new TextRun("")]}),
 new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[3700,CW-3700],rows:[new TableRow({children:[leftCol(spec),rightCol(img)]})]}),
 labelBar("Instructions"), box([instr]),
];}

const coverImg=new Paragraph({children:[png("assets/cover_black.png",794,1123)]});

const items=[
 ["INTERNAL FINISHES","FLOORING","IFF-001",
  {item:"Porcelain Tiles",rows:[["Color","Gray"],["Finish","Matt"],["Size","120×60 / 140×140 cm"],["Brand/Supplier","TBD"],["Origin","TBD"]],
   location:"Living, dining and corridors.",notes:["Subject to sample & mock-up approval.","Refer to flooring plans.","Grout colour to match tile.","Slip resistant (R10 min.)."]},
  "assets/ph_porcelain.png","A 5 mm rubber underlay is to be installed beneath the porcelain."],
 ["INTERNAL FINISHES","JOINERY","IFJ-001",
  {item:"Smoked Oak Veneer",rows:[["Color","Smoked brown"],["Finish","Matt lacquer"],["Size","2440×1220 mm"],["Brand/Supplier","ALPI / approved joiner"],["Origin","TBD"]],
   location:"Wardrobe fronts, TV unit, feature panelling.",notes:["Veneer to be book-matched.","Grain direction vertical unless noted.","Refer to joinery details."]},
  "assets/ph_oak.png","Provide A4 veneer samples with two lacquer sheen levels for approval."],
];
const body=items.flatMap((a,i)=>itemPage(a[0],a[1],a[2],a[3],a[4],a[5],i===0));

const doc=new Document({styles:{default:{document:{run:{font:"Arial",size:18}}}},
 sections:[
  {properties:{page:{size:{width:11906,height:16838},margin:{top:0,right:0,bottom:0,left:0}}},children:[coverImg]},
  {properties:{page:{size:{width:11906,height:16838},margin:{top:1700,right:MAR,bottom:1500,left:MAR}}},
  headers:{default:header},footers:{default:footer},children:[...body]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync("SHADE-Finishes-Booklet-v4.docx",b);console.log("written",b.length);});
