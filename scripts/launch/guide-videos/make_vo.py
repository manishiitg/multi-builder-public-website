import json,base64,subprocess,urllib.request,re,sys
key=[l.split('=',1)[1].strip().strip('"\'') for l in open('/Users/mipl/ai-work/mcp-agent-builder-go/agent_go/.env') if l.startswith('GEMINI_API_KEY=')][0]
script=json.load(open('script.json'))
notes="""# AUDIO PROFILE: Arjun, product narrator
## THE SCENE
A calm, clear software walkthrough video.
### DIRECTOR'S NOTES
Voice: male, early thirties, warm and clear.
Accent: natural Indian English, as spoken by an educated professional from Bengaluru. Keep the same accent from the first line to the last.
Pace: unhurried and friendly. Leave a clear pause between paragraphs.
#### TRANSCRIPT
"""
def post(model,body):
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),headers={"Content-Type":"application/json","x-goog-api-key":key})
    return json.load(urllib.request.urlopen(req,timeout=300))
d=post('gemini-2.5-pro-preview-tts',{"contents":[{"parts":[{"text":notes+"\n\n".join(s['text'] for s in script)}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Charon"}},"languageCode":"en-IN"}}})
open('whole.pcm','wb').write(base64.b64decode(d["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]))
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','s16le','-ar','24000','-ac','1','-i','whole.pcm','whole.wav'],check=True)
out=subprocess.run(['ffmpeg','-hide_banner','-i','whole.wav','-af','silencedetect=noise=-35dB:d=0.35','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',out)]; en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',out)]
gaps=sorted([(e-s,s,e) for s,e in zip(st,en) if s>0.5],reverse=True)[:len(script)-1]
cuts=sorted(gaps,key=lambda g:g[1]); total=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','whole.wav']))
bounds=[0]+[(g[1]+g[2])/2 for g in cuts]+[total]; durs={}
for i,s in enumerate(script):
    subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',f'{bounds[i]:.3f}','-to',f'{bounds[i+1]:.3f}','-i','whole.wav','-af','silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse,highpass=f=70,lowpass=f=11000,loudnorm=I=-16:TP=-2:LRA=9,afade=t=in:d=0.02','-ar','48000','t.wav'],check=True)
    dd=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','t.wav']))
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i','t.wav','-af',f'afade=t=out:st={max(0,dd-0.06):.3f}:d=0.06','-c:a','libmp3lame','-b:a','192k',f"{s['id']}.mp3"],check=True)
    b=base64.b64encode(open('t.wav','rb').read()).decode()
    r=post('gemini-2.5-flash',{"contents":[{"parts":[{"text":"Transcribe verbatim, nothing else."},{"inlineData":{"mimeType":"audio/wav","data":b}}]}]})
    durs[s['id']]=round(dd,2); print(s['id'],round(dd,2),'|',r["candidates"][0]["content"]["parts"][0]["text"].strip()[:120])
json.dump(durs,open('durs.json','w'))
b=base64.b64encode(open('whole.wav','rb').read()).decode()
r=post('gemini-2.5-pro',{"contents":[{"parts":[{"text":"Accent of this male speaker (Indian/American/British)? Same throughout? Any static, clicks or glitches (timestamps)? Two short sentences."},{"inlineData":{"mimeType":"audio/wav","data":b}}]}]})
print('CHECK:',r["candidates"][0]["content"]["parts"][-1]["text"].strip()[:300])
for f in ['whole.pcm','t.wav']: 
    import os; os.remove(f)
