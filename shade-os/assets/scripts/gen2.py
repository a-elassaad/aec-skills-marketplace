from PIL import Image, ImageDraw, ImageFont
F="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(s):
    try:return ImageFont.truetype(F,s)
    except:return ImageFont.load_default()
def placeholder(name,bg):
    im=Image.new("RGB",(1300,1300),bg);d=ImageDraw.Draw(im)
    d.rectangle([8,8,1291,1291],outline="#CFCdc8",width=3)
    t="MATERIAL IMAGE";f=font(46);w=d.textlength(t,font=f)
    d.text(((1300-w)/2,630),t,font=f,fill="#B5B2AC")
    im.save(f"assets/{name}","PNG")
placeholder("ph_porcelain.png","#E7E7E4")
placeholder("ph_oak.png","#E9E2D8")
print("ok")
