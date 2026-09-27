import json,subprocess,re,base64,urllib.request
key=[l.split('=',1)[1].strip().strip('"\'') for l in open('/Users/mipl/ai-work/mcp-agent-builder-go/agent_go/.env') if l.startswith('GEMINI_API_KEY=')][0]
script=json.load(open('script.json'))
total=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','whole.wav']))
out=subprocess.run(['ffmpeg','-hide_banner','-i','whole.wav','-af','silencedetect=noise=-35dB:d=0.2','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',out)]; en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',out)]
cands=[((s+e)/2,e-s) for s,e in zip(st,en) if 0.5<s<total-0.5]
chars=[len(s['text']) for s in script]; cum=0; bounds=[0]
for c in chars[:-1]:
    cum+=c; exp=total*cum/sum(chars)
    # nearest candidate, prefer longer pauses: score = distance - 1.5*length
    best=min((x for x in cands if x[0]>bounds[-1]+1),key=lambda x:abs(x[0]-exp)-1.5*x[1])
    bounds.append(best[0])
import sys
for arg in sys.argv[1:]:  # manual fixes: "<boundary index>=<seconds>", e.g. 4=30.3
    k,v=arg.split('='); bounds[int(k)]=float(v)
bounds.append(total); print([round(b,2) for b in bounds])
durs={}
def post(model,body):
    req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",data=json.dumps(body).encode(),headers={"Content-Type":"application/json","x-goog-api-key":key})
    return json.load(urllib.request.urlopen(req,timeout=300))
for i,s in enumerate(script):
    subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',f'{bounds[i]:.3f}','-to',f'{bounds[i+1]:.3f}','-i','whole.wav','-af','silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse,highpass=f=70,lowpass=f=11000,loudnorm=I=-16:TP=-2:LRA=9,afade=t=in:d=0.02','-ar','48000','t.wav'],check=True)
    dd=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','t.wav']))
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i','t.wav','-af',f'afade=t=out:st={max(0,dd-0.06):.3f}:d=0.06','-c:a','libmp3lame','-b:a','192k',f"{s['id']}.mp3"],check=True)
    b=base64.b64encode(open('t.wav','rb').read()).decode()
    r=post('gemini-2.5-flash',{"contents":[{"parts":[{"text":"Transcribe verbatim, nothing else."},{"inlineData":{"mimeType":"audio/wav","data":b}}]}]})
    durs[s['id']]=round(dd,2); print(s['id'],round(dd,2),'|',r["candidates"][0]["content"]["parts"][0]["text"].strip()[:150])
json.dump(durs,open('durs.json','w'))
