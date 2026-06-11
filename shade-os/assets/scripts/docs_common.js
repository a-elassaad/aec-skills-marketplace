const fs=require('fs');
const D=require('docx');
const {Paragraph,TextRun,Table,TableRow,TableCell,ImageRun,Header,Footer,AlignmentType,WidthType,BorderStyle,ShadingType,VerticalAlign,PageNumber,TabStopType,LevelFormat}=D;
const L="./assets/logos/";
const BLK="111111",GRY="6E6E6E",LN="D8D5CF",SOFT="F4F2EE",BAND="FAF9F7";
const A4W=11906,MAR=720,CW=A4W-2*MAR;
const png=(p,w,h)=>new ImageRun({type:"png",data:fs.readFileSync(p),transformation:{width:w,height:h},altText:{title:"i",description:"i",name:"i"}});
const NB={style:BorderStyle.NONE},NOBORD={top:NB,bottom:NB,left:NB,right:NB};
const thin={style:BorderStyle.SINGLE,size:1,color:LN},allthin={top:thin,bottom:thin,left:thin,right:thin};
function header(){return new Header({children:[new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:CW}],
 border:{bottom:{style:BorderStyle.SINGLE,size:4,color:"C9C6C0",space:6}},
 children:[png(L+"shade logo 2.png",120,30),new TextRun("\t"),png(L+"SG-logo.png",138,27)]})]});}
function footer(){return new Footer({children:[
 new Paragraph({border:{top:{style:BorderStyle.SINGLE,size:4,color:"C9C6C0",space:6}},tabStops:[{type:TabStopType.RIGHT,position:CW}],
  children:[new TextRun({text:"Tel ",bold:true,size:12,color:BLK,font:"Arial"}),new TextRun({text:"+974 44699677    ",size:12,color:GRY,font:"Arial"}),
   new TextRun({text:"Email ",bold:true,size:12,color:BLK,font:"Arial"}),new TextRun({text:"shelter@shelter.co    ",size:12,color:GRY,font:"Arial"}),
   new TextRun({text:"Fax ",bold:true,size:12,color:BLK,font:"Arial"}),new TextRun({text:"+974 44581236",size:12,color:GRY,font:"Arial"}),
   new TextRun("\t"),new TextRun({children:[PageNumber.CURRENT],size:14,color:BLK,font:"Arial"})]}),
 new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:CW}],children:[
   new TextRun({text:"www.shelter.co     SHELTER Qatar W.L.L.     Burj Doha, West Bay",size:12,color:GRY,font:"Arial"}),
   new TextRun("\t"),new TextRun({text:"QATAR  ",bold:true,size:12,color:BLK,font:"Arial"}),
   new TextRun({text:"UAE  LEBANON  KSA  FRANCE  ITALY  RWANDA",size:12,color:GRY,font:"Arial"})]})]});}
function bar(cat,sub,code){const sh={fill:BLK,type:ShadingType.CLEAR};
 const c=(t,w,al)=>new TableCell({width:{size:w,type:WidthType.DXA},shading:sh,borders:NOBORD,margins:{top:60,bottom:60,left:160,right:160},verticalAlign:VerticalAlign.CENTER,
  children:[new Paragraph({alignment:al,children:[new TextRun({text:t,bold:true,size:18,characterSpacing:20,color:"FFFFFF",font:"Arial"})]})]});
 return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[5200,3600,CW-8800],
  rows:[new TableRow({children:[c(cat,5200,AlignmentType.LEFT),c(sub,3600,AlignmentType.RIGHT),c(code,CW-8800,AlignmentType.CENTER)]})]});}
function title(t){return new Paragraph({spacing:{after:60},children:[new TextRun({text:t.toUpperCase(),bold:true,size:36,color:BLK,font:"Arial"})]});}
function H(t){return new Paragraph({spacing:{before:200,after:80},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:BLK,space:4}},children:[new TextRun({text:t,bold:true,size:22,color:BLK,font:"Arial"})]});}
function body(t){return new Paragraph({spacing:{after:100},children:[new TextRun({text:t,size:19,color:"2A2A2A",font:"Arial"})]});}
function infoGrid(pairs){const rows=pairs.map(([k,v])=>new TableRow({children:[
  new TableCell({width:{size:2400,type:WidthType.DXA},shading:{fill:SOFT,type:ShadingType.CLEAR},borders:allthin,margins:{top:40,bottom:40,left:120,right:80},
   children:[new Paragraph({children:[new TextRun({text:k.toUpperCase(),size:14,characterSpacing:10,color:GRY,font:"Arial"})]})]}),
  new TableCell({width:{size:CW-2400,type:WidthType.DXA},borders:allthin,margins:{top:40,bottom:40,left:120,right:80},
   children:[new Paragraph({children:[new TextRun({text:v,size:17,color:BLK,font:"Arial"})]})]})]}));
 return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[2400,CW-2400],rows});}
function thead(cells,widths){return new TableRow({tableHeader:true,children:cells.map((c,i)=>new TableCell({width:{size:widths[i],type:WidthType.DXA},shading:{fill:BLK,type:ShadingType.CLEAR},borders:allthin,margins:{top:50,bottom:50,left:90,right:90},
  children:[new Paragraph({children:[new TextRun({text:c,bold:true,size:14,characterSpacing:10,color:"FFFFFF",font:"Arial"})]})]}))});}
function trow(cells,widths,i){return new TableRow({children:cells.map((c,j)=>new TableCell({width:{size:widths[j],type:WidthType.DXA},borders:allthin,margins:{top:40,bottom:40,left:90,right:90},shading:i%2?{fill:BAND,type:ShadingType.CLEAR}:undefined,
  children:[new Paragraph({children:[new TextRun({text:String(c),size:15,color:BLK,font:"Arial"})]})]}))});}
function grid(headers,rows,widths){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:widths,rows:[thead(headers,widths),...rows.map((r,i)=>trow(r,widths,i))]});}
const bullets={config:[{reference:"b",levels:[{level:0,format:LevelFormat.BULLET,text:"—",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:480,hanging:240}}}}]}]};
function bullet(t){return new Paragraph({numbering:{reference:"b",level:0},spacing:{after:40},children:[new TextRun({text:t,size:19,color:"2A2A2A",font:"Arial"})]});}
const page={size:{width:11906,height:16838},margin:{top:1700,right:MAR,bottom:1500,left:MAR}};
module.exports={D,png,header,footer,bar,title,H,body,infoGrid,grid,bullet,bullets,page,CW,BLK,GRY,L};
