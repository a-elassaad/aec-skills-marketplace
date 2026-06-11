from PIL import Image
# refined material hero strip: 5 tonal panels with thin white gaps
tones=["#CFC3B0","#A98C6E","#8A6A4F","#5C5650","#2B2B2B"]
W,H=2600,1000; gap=10
pw=(W-gap*(len(tones)-1))//len(tones)
im=Image.new("RGB",(W,H),"#FFFFFF")
x=0
for c in tones:
    im.paste(Image.new("RGB",(pw,H),c),(x,0)); x+=pw+gap
im.save("assets/hero.png","PNG")
print("hero ok",im.size)
