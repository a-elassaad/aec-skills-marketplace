from PIL import Image, ImageDraw, ImageFont
F="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"; FB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def fnt(s,b=False):
    try:return ImageFont.truetype(FB if b else F,s)
    except:return ImageFont.load_default()
def sp(t,n=2): return (" "*n).join(list(t))
W,H=2480,3508
im=Image.new("RGB",(W,H),"#0B0B0B"); d=ImageDraw.Draw(im)
def center(img_path,y,wfrac):
    lg=Image.open(img_path).convert("RGBA"); w=int(W*wfrac); h=int(lg.height*w/lg.width)
    lg=lg.resize((w,h)); im.paste(lg,((W-w)//2,y),lg); return y+h
# SHADE white logo centered
endy=center("./assets/logos/shade logo.png", int(H*0.30), 0.56)
# rule
ry=endy+120; d.line([(W*0.34,ry),(W*0.66,ry)],fill="#5A5A5A",width=3)
# title
f1=fnt(58); t=sp("MATERIALS BOOKLET"); tw=d.textlength(t,font=f1); d.text(((W-tw)/2,ry+70),t,font=f1,fill="#BFBFBF")
f2=fnt(104,True); t=sp("MOCK-UP FINISHES",1); tw=d.textlength(t,font=f2); d.text(((W-tw)/2,ry+170),t,font=f2,fill="#FFFFFF")
# meta
f3=fnt(40); 
for i,t in enumerate(["MARINA 03  |  LUSAIL, QATAR","260610 - R00      ISSUE 01      JUNE 2026"]):
    tt=sp(t,1); tw=d.textlength(tt,font=f3); d.text(((W-tw)/2,ry+360+i*64),tt,font=f3,fill="#8C8C8C")
# SHELTER white logo bottom
center("./assets/logos/SG-logowhite.png", int(H*0.88), 0.26)
im.save("assets/cover_black.png","PNG"); print("cover ok")
