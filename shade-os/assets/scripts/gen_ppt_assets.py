from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
F="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(s):
    try:return ImageFont.truetype(F,s)
    except:return ImageFont.load_default()
# subtle light textured bg 1920x1080
random.seed(7)
bg=Image.new("RGB",(1920,1080),"#F1EFEC")
noise=Image.new("L",(1920,1080))
noise.putdata([random.randint(238,250) for _ in range(1920*1080)])
bg=Image.merge("RGB",(noise,noise,noise)).filter(ImageFilter.GaussianBlur(1.2))
bg.save("assets/bg.png","PNG")
# dark title bg
Image.new("RGB",(1920,1080),"#0E0E0E").save("assets/bg_dark.png","PNG")
def ph(name,w,h,label,bg="#FFFFFF",bd="#CFCDC7"):
    im=Image.new("RGB",(w,h),bg);d=ImageDraw.Draw(im)
    d.rectangle([4,4,w-5,h-5],outline=bd,width=3)
    f=font(int(h*0.07)); tw=d.textlength(label,font=f)
    d.text(((w-tw)/2,h/2-h*0.04),label,font=f,fill="#B5B2AC")
    im.save(f"assets/{name}","PNG")
ph("plan_ph.png",1500,820,"PLAN CLOSE-UP")
ph("key_ph.png",520,560,"KEY PLAN")
ph("fix_ph.png",600,600,"FIXTURE IMAGE")
print("ppt assets ok")
