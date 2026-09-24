from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.upload import router as upload_router
from app.api.process import router as process_router
from app.api.status import router as status_router
from app.api.download import router as download_router
from app.core.config import UPLOAD_DIR, OUTPUT_DIR, SUPPORTED_LANGUAGES
from app.services.job_manager import job_manager

app = FastAPI(
    title="DubSync AI",
    version="2.0.0",
    description="AI-powered multilingual video dubbing platform with Next.js studio frontend"
)

# CORS Middleware for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def normalize_slashes_middleware(request, call_next):
    # Normalize accidental double slashes (e.g. //health -> /health)
    path = request.scope.get("path", "")
    if "//" in path:
        import re
        request.scope["path"] = re.sub(r"/+", "/", path)
    return await call_next(request)

# Mount media static directories for in-browser video playback
app.mount("/media/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
app.mount("/media/outputs", StaticFiles(directory=str(OUTPUT_DIR)), name="outputs")

app.include_router(upload_router)
app.include_router(process_router)
app.include_router(status_router)
app.include_router(download_router)


@app.get("/languages")
async def get_supported_languages():
    return {
        "languages": [
            {"code": code, **data} for code, data in SUPPORTED_LANGUAGES.items()
        ]
    }


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "DubSync AI Backend", "version": "2.0.0"}


@app.get("/jobs")
async def list_jobs():
    return {"jobs": list(job_manager.jobs.values())}


@app.get("/", response_class=HTMLResponse)
async def home():
    return """
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DubSync AI</title>

<style>
:root{
  --accent:#3b82f6;
  --accent-2:#8b5cf6;
  --glass:rgba(255,255,255,0.08);
  --glass-border:rgba(255,255,255,0.18);
}

*{box-sizing:border-box;}

body{
  margin:0;
  min-height:100vh;
  font-family:'Segoe UI',Arial,Helvetica,sans-serif;
  background:#0b1120;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  overflow:hidden;
  position:relative;
}

/* Ambient background */
.bg-gradient{
  position:fixed;
  inset:0;
  background:
    radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 45%),
    radial-gradient(circle at 80% 30%, rgba(139,92,246,0.35), transparent 45%),
    radial-gradient(circle at 50% 80%, rgba(56,189,248,0.25), transparent 45%),
    linear-gradient(135deg,#0b1120,#111827 60%,#0b1120);
  z-index:0;
}

.orb{
  position:fixed;
  border-radius:50%;
  filter:blur(60px);
  opacity:0.5;
  z-index:0;
  animation:float 12s ease-in-out infinite;
}
.orb1{width:280px;height:280px;background:var(--accent);top:-60px;left:-60px;}
.orb2{width:320px;height:320px;background:var(--accent-2);bottom:-80px;right:-60px;animation-delay:3s;}
.orb3{width:200px;height:200px;background:#22d3ee;top:60%;left:75%;animation-delay:6s;}

@keyframes float{
  0%,100%{transform:translate(0,0);}
  50%{transform:translate(20px,-25px);}
}

/* Glass card */
.card{
  position:relative;
  z-index:1;
  background:var(--glass);
  backdrop-filter:blur(24px) saturate(160%);
  -webkit-backdrop-filter:blur(24px) saturate(160%);
  border:1px solid var(--glass-border);
  padding:44px 40px;
  border-radius:24px;
  width:480px;
  max-width:90vw;
  box-shadow:
    0 25px 50px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.15);
  text-align:center;
  animation:rise .6s ease;
}

@keyframes rise{
  from{opacity:0;transform:translateY(20px);}
  to{opacity:1;transform:translateY(0);}
}

.badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  background:rgba(255,255,255,0.08);
  border:1px solid var(--glass-border);
  padding:6px 14px;
  border-radius:999px;
  font-size:12px;
  color:#93c5fd;
  margin-bottom:18px;
  letter-spacing:.5px;
  text-transform:uppercase;
}

h1{
  margin:0 0 8px;
  font-size:30px;
  font-weight:700;
  background:linear-gradient(90deg,#fff,#bfdbfe);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}

p.subtitle{
  color:#cbd5e1;
  margin:0 0 28px;
  font-size:14.5px;
}

/* Drop zone */
.dropzone{
  border:1.5px dashed rgba(255,255,255,0.25);
  background:rgba(255,255,255,0.04);
  border-radius:16px;
  padding:28px 20px;
  cursor:pointer;
  transition:.25s;
  position:relative;
}
.dropzone:hover, .dropzone.dragover{
  border-color:var(--accent);
  background:rgba(59,130,246,0.08);
}
.dropzone .icon{font-size:32px;margin-bottom:8px;}
.dropzone .main-text{font-size:14.5px;color:#e2e8f0;font-weight:600;}
.dropzone .sub-text{font-size:12.5px;color:#94a3b8;margin-top:4px;}
#video{display:none;}

#filename{
  margin-top:14px;
  font-size:13px;
  color:#7dd3fc;
  word-break:break-all;
  min-height:16px;
}

button.primary{
  margin-top:26px;
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  color:white;
  border:none;
  padding:14px 34px;
  border-radius:12px;
  font-size:15.5px;
  font-weight:600;
  cursor:pointer;
  transition:.25s;
  box-shadow:0 8px 20px rgba(59,130,246,0.35);
  width:100%;
}
button.primary:hover{
  transform:translateY(-2px);
  box-shadow:0 12px 28px rgba(59,130,246,0.5);
}
button.primary:disabled{
  opacity:.5;
  cursor:not-allowed;
  transform:none;
}

/* Status */
#status-wrap{margin-top:24px;display:none;}
#status-text{
  font-weight:600;
  font-size:14px;
  color:#38bdf8;
  margin-bottom:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
}

.progress-track{
  width:100%;
  height:8px;
  background:rgba(255,255,255,0.08);
  border-radius:999px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,0.1);
}
.progress-fill{
  height:100%;
  width:0%;
  border-radius:999px;
  background:linear-gradient(90deg,var(--accent),var(--accent-2));
  transition:width .4s ease;
}
.progress-fill.indeterminate{
  width:40%;
  animation:slide 1.3s ease-in-out infinite;
}
@keyframes slide{
  0%{margin-left:-40%;}
  100%{margin-left:100%;}
}

.spinner{
  width:14px;height:14px;
  border:2px solid rgba(56,189,248,0.3);
  border-top-color:#38bdf8;
  border-radius:50%;
  animation:spin .7s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg);}}

#download{
  display:none;
  margin-top:20px;
}
button.download-btn{
  background:rgba(34,197,94,0.15);
  border:1px solid rgba(34,197,94,0.4);
  color:#86efac;
  padding:13px 30px;
  border-radius:12px;
  font-size:15px;
  font-weight:600;
  cursor:pointer;
  transition:.25s;
  width:100%;
}
button.download-btn:hover{
  background:rgba(34,197,94,0.25);
  transform:translateY(-2px);
}

.error-text{color:#fca5a5 !important;}
</style>

</head>

<body>

<div class="bg-gradient"></div>
<div class="orb orb1"></div>
<div class="orb orb2"></div>
<div class="orb orb3"></div>

<div class="card">

  <div class="badge">✨ AI Dubbing Engine</div>
  <h1>DubSync AI</h1>
  <p class="subtitle">Upload a video and generate a dubbed version using AI.</p>

  <div class="dropzone" id="dropzone" onclick="document.getElementById('video').click()">
    <div class="icon">🎬</div>
    <div class="main-text">Click to browse or drag a video here</div>
    <div class="sub-text">MP4, MOV, MKV supported</div>
    <input id="video" type="file" accept="video/*">
  </div>

  <div id="filename"></div>

  <button class="primary" id="processBtn" onclick="uploadVideo()">Process Video</button>

  <div id="status-wrap">
    <div id="status-text"><span class="spinner"></span><span id="status-label">Uploading...</span></div>
    <div class="progress-track">
      <div class="progress-fill indeterminate" id="progressFill"></div>
    </div>
  </div>

  <div id="download">
    <button class="download-btn" id="downloadBtn">⬇ Download Dubbed Video</button>
  </div>

</div>

<script>

const dropzone = document.getElementById("dropzone");
const videoInput = document.getElementById("video");
const filenameEl = document.getElementById("filename");
const processBtn = document.getElementById("processBtn");
const statusWrap = document.getElementById("status-wrap");
const statusLabel = document.getElementById("status-label");
const progressFill = document.getElementById("progressFill");
const downloadWrap = document.getElementById("download");

["dragenter","dragover"].forEach(evt=>{
  dropzone.addEventListener(evt, e=>{
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
});
["dragleave","drop"].forEach(evt=>{
  dropzone.addEventListener(evt, e=>{
    e.preventDefault();
    dropzone.classList.remove("dragover");
  });
});
dropzone.addEventListener("drop", e=>{
  const file = e.dataTransfer.files[0];
  if(file){
    videoInput.files = e.dataTransfer.files;
    showFilename(file);
  }
});
videoInput.addEventListener("change", ()=>{
  if(videoInput.files[0]) showFilename(videoInput.files[0]);
});

function showFilename(file){
  filenameEl.textContent = "📄 " + file.name;
}

function setStatus(text, isError=false){
  statusLabel.textContent = text;
  statusLabel.parentElement.classList.toggle("error-text", isError);
}

async function uploadVideo(){

  let file = videoInput.files[0];

  if(!file){
    alert("Select a video first.");
    return;
  }

  processBtn.disabled = true;
  statusWrap.style.display = "block";
  downloadWrap.style.display = "none";
  progressFill.classList.add("indeterminate");
  setStatus("Uploading...");

  try{
    let form = new FormData();
    form.append("file", file);

    let upload = await fetch("/upload/", {
      method:"POST",
      body:form
    });
    let uploadResult = await upload.json();
    let jobId = uploadResult.job_id;

    setStatus("Processing... this may take a moment");

    let process = await fetch("/process/"+jobId, {
      method:"POST"
    });
    let result = await process.json();

    if(result.status === "completed"){
      progressFill.classList.remove("indeterminate");
      progressFill.style.width = "100%";
      setStatus("✅ Completed");

      let btn = document.getElementById("downloadBtn");
      btn.onclick = function(){
        window.location = "/download/"+jobId;
      };
      downloadWrap.style.display = "block";
    } else {
      setStatus("❌ Processing Failed", true);
    }
  } catch(err){
    setStatus("❌ Something went wrong", true);
  } finally {
    processBtn.disabled = false;
  }
}

</script>

</body>

</html>
"""