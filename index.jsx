import React, { useMemo, useState } from "react"; import { motion } from "framer-motion"; import { CheckCircle2, ChevronRight, Code2, Infinity, Layers3, Sparkles, Star, TimerReset, Workflow } from "lucide-react"; import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Badge } from "@/components/ui/badge"; import { Progress } from "@/components/ui/progress";

const levels = [ { id: "arrays", title: "1. Lista de Heróis", icon: Layers3, concept: "Arrays + map/filter/find/includes", prompt: "Escolha o método certo para transformar uma lista de nomes em cartões na tela.", code: `const heroes = ["Ana", "Bruno", "Lia"];

// Quero mostrar um card para cada herói heroes.____(hero => <HeroCard name={hero} />);, options: [ { label: "map()", correct: true, explanation: "Perfeito. map() transforma cada item e devolve uma nova lista para renderizar." }, { label: "filter()", correct: false, explanation: "filter() serve para selecionar itens, não para transformar cada um." }, { label: "find()", correct: false, explanation: "find() retorna só o primeiro item encontrado." }, ], }, { id: "cond", title: "2. Portal do Login", icon: Workflow, concept: "Ternário + &&", prompt: "Mostre o texto certo dependendo do estado logado.", code: const logado = true;

return (

  <div>
    {logado ____ <h1>Bem-vindo!</h1> : <h1>Faça login</h1>}
  </div>
);`,
    options: [
      { label: "?", correct: true, explanation: "Isso fecha o ternário: condição ? verdadeiro : falso." },
      { label: "&&", correct: false, explanation: "&& mostra algo só quando a condição é verdadeira, sem alternativa para o false." },
      { label: "||", correct: false, explanation: "|| é usado para fallback, não para ternário." },
    ],
  },
  {
    id: "safe",
    title: "3. Dados Invisíveis",
    icon: Sparkles,
    concept: "Optional chaining + nullish coalescing",
    prompt: "Acesse a cidade sem quebrar se o endereço não existir.",
    code: `const user = { name: "Gustavo" };console.log(user____address____city);, options: [ { label: "?.", correct: true, explanation: "Ótimo. ?. evita erro quando uma parte do caminho não existe." }, { label: ".", correct: false, explanation: "Ponto direto quebra quando address é undefined." }, { label: "??", correct: false, explanation: "?? é para valor padrão, não para acessar propriedades." }, ], }, { id: "modules", title: "4. Oficina de Arquivos", icon: Code2, concept: "import + export", prompt: "Organize o projeto trazendo uma função de outro arquivo.", code: // math.js export function sum(a, b) { return a + b; }

// app.js import { sum } from "./math.js"; console.log(sum(2, 3));, options: [ { label: "import / export", correct: true, explanation: "Isso mesmo. export deixa a função disponível e import traz para o arquivo atual." }, { label: "include / use", correct: false, explanation: "Esses nomes não são os módulos padrão do JavaScript." }, { label: "push / pop", correct: false, explanation: "Esses são métodos de array." }, ], }, { id: "promise", title: "5. Missão Assíncrona", icon: Infinity, concept: "Promise + async/await", prompt: "Escolha a melhor forma de lidar com algo que chega no futuro.", code: const data = fetchUser();

// Quero esperar o resultado sem bagunçar o código const user = ____ fetchUser();, options: [ { label: "await", correct: true, explanation: "Exato. await espera a Promise resolver dentro de uma função async." }, { label: "return", correct: false, explanation: "return só devolve valor; não espera a Promise terminar." }, { label: "new", correct: false, explanation: "new cria instâncias; não resolve Promise por si só." }, ], }, { id: "class", title: "6. Arena dos Objetos", icon: Star, concept: "Classes + this", prompt: "Crie um personagem com nome e ação.", code: class Player { constructor(name) { this.name = name; }

attack() { console.log(____.name + " atacou!"); } } `, options: [ { label: "this", correct: true, explanation: "Perfeito. this aponta para o objeto atual que está usando o método." }, { label: "self", correct: false, explanation: "self não é o nome padrão no JavaScript." }, { label: "me", correct: false, explanation: "Não existe como referência automática aqui." }, ], }, ];

const miniChallenges = [ { title: "DOM Rápido", text: "Qual comando adiciona um elemento no final da div?", answer: "append", hint: "É o que 'coloca no fim'.", }, { title: "Console do mago", text: "Qual palavra cria um novo objeto a partir de uma classe?", answer: "new", hint: "É a palavra que cria instâncias.", }, { title: "Ponto de segurança", text: "Qual operador evita erro quando algo pode ser undefined?", answer: "?.", hint: "É o 'optional chaining'.", }, ];

const quickFacts = [ "map transforma", "filter seleciona", "find acha 1", "&& mostra só se true", "? : escolhe entre 2", "?. protege acesso", "?? dá fallback", "import/export divide arquivos", "Promise espera o futuro", "class cria moldes", "this aponta para o objeto atual", ];

function LevelCard({ level, active, solved, onPick, selected, feedback }) { const Icon = level.icon; return ( <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} > <Card className={cursor-pointer border-2 transition-all duration-200 ${ active ? "border-primary shadow-lg" : "border-border hover:border-primary/60" } ${solved ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""}} onClick={() => onPick(level.id)} > <CardHeader className="pb-3"> <div className="flex items-start justify-between gap-3"> <div> <CardTitle className="flex items-center gap-2 text-lg"> <Icon className="h-5 w-5" /> {level.title} </CardTitle> <p className="mt-1 text-sm text-muted-foreground">{level.concept}</p> </div> {solved ? ( <Badge variant="secondary" className="gap-1"> <CheckCircle2 className="h-3.5 w-3.5" /> Feito </Badge> ) : ( <Badge variant="outline">Jogar</Badge> )} </div> </CardHeader> <CardContent className="space-y-4"> <p className="text-sm leading-relaxed text-foreground/90">{level.prompt}</p> <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-relaxed text-slate-100 shadow-inner"> <code>{level.code}</code> </pre>

{active ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {level.options.map((opt) => {
            const isSelected = selected === opt.label;
            return (
              <Button
                key={opt.label}
                variant={isSelected ? "default" : "outline"}
                className="justify-start"
                onClick={(e) => {
                  e.stopPropagation();
                  onPick(level.id, opt.label);
                }}
              >
                {opt.label}
              </Button>
            );
          })}
        </div>
      ) : null}

      {feedback ? (
        <div className="rounded-xl border bg-background p-3 text-sm">
          {feedback}
        </div>
      ) : null}
    </CardContent>
  </Card>
</motion.div>

); }

export default function JSQuestLearningGame() { const [activeLevelId, setActiveLevelId] = useState(levels[0].id); const [solved, setSolved] = useState({}); const [selectedChoices, setSelectedChoices] = useState({}); const [feedback, setFeedback] = useState({}); const [miniIndex, setMiniIndex] = useState(0); const [miniAnswer, setMiniAnswer] = useState(""); const [miniResult, setMiniResult] = useState("");

const activeLevel = useMemo( () => levels.find((lvl) => lvl.id === activeLevelId) ?? levels[0], [activeLevelId] );

const progress = Math.round((Object.values(solved).filter(Boolean).length / levels.length) * 100);

function handleLevelChoice(levelId, choiceLabel) { if (!choiceLabel) { setActiveLevelId(levelId); return; }

const level = levels.find((l) => l.id === levelId);
if (!level) return;

const chosen = level.options.find((o) => o.label === choiceLabel);
if (!chosen) return;

setSelectedChoices((prev) => ({ ...prev, [levelId]: choiceLabel }));
setFeedback((prev) => ({
  ...prev,
  [levelId]: chosen.correct ? `✅ ${chosen.explanation}` : `❌ ${chosen.explanation}`,
}));
if (chosen.correct) {
  setSolved((prev) => ({ ...prev, [levelId]: true }));
}

}

const currentMini = miniChallenges[miniIndex % miniChallenges.length];

function checkMini() { const normalized = miniAnswer.trim().toLowerCase(); if (normalized === currentMini.answer.toLowerCase()) { setMiniResult("✅ Certo! Você entendeu a ideia."); setMiniAnswer(""); setMiniIndex((n) => n + 1); } else { setMiniResult(❌ Ainda não. Dica: ${currentMini.hint}); } }

return ( <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-50"> <div className="mx-auto flex w-full max-w-7xl flex-col gap-6"> <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border bg-white/80 p-6 shadow-xl backdrop-blur dark:bg-slate-900/70" > <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"> <div className="space-y-3"> <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"> <Sparkles className="h-4 w-4" /> JavaScript Quest </div> <div> <h1 className="text-3xl font-bold tracking-tight md:text-4xl"> Aprende JavaScript jogando. </h1> <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"> Cada fase ensina um bloco que a gente viu: arrays, condicionais, segurança, módulos, promessas, classes e DOM/React. </p> </div> </div>

<div className="grid gap-3 rounded-2xl border bg-slate-50 p-4 dark:bg-slate-950/60 sm:grid-cols-3 md:min-w-[520px]">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Progresso</div>
            <div className="mt-1 text-xl font-semibold">{progress}%</div>
            <Progress value={progress} className="mt-2 h-2" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Fases</div>
            <div className="mt-1 text-xl font-semibold">{Object.values(solved).filter(Boolean).length}/{levels.length}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Modo</div>
            <div className="mt-1 text-xl font-semibold">React mini-game</div>
          </div>
        </div>
      </div>
    </motion.header>

    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              active={level.id === activeLevelId}
              solved={Boolean(solved[level.id])}
              selected={selectedChoices[level.id]}
              feedback={feedback[level.id]}
              onPick={handleLevelChoice}
            />
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TimerReset className="h-5 w-5" />
              Fase Ativa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-950 p-4 text-slate-100 shadow-inner">
              <div className="mb-2 text-sm text-slate-300">{activeLevel.title}</div>
              <pre className="overflow-x-auto text-xs leading-relaxed">
                <code>{activeLevel.code}</code>
              </pre>
            </div>
            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="text-sm font-medium">O que essa fase ensina</div>
              <p className="mt-2 text-sm text-muted-foreground">{activeLevel.concept}</p>
            </div>
            <Button onClick={() => setActiveLevelId(levels[(levels.findIndex((l) => l.id === activeLevelId) + 1) % levels.length].id)} className="w-full gap-2">
              Próxima fase
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl">Desafio Relâmpago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant="outline" className="w-fit">Curto e direto</Badge>
            <div className="space-y-2">
              <div className="text-sm font-medium">{currentMini.title}</div>
              <p className="text-sm text-muted-foreground">{currentMini.text}</p>
            </div>
            <div className="flex gap-2">
              <input
                value={miniAnswer}
                onChange={(e) => setMiniAnswer(e.target.value)}
                placeholder="Digite a resposta"
                className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button onClick={checkMini}>Checar</Button>
            </div>
            {miniResult ? (
              <div className="rounded-xl border bg-background p-3 text-sm">{miniResult}</div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl">Resumo ultra-rápido</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {quickFacts.map((fact) => (
              <Badge key={fact} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                {fact}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  </div>
</div>

); }      25% { transform: translateY(-30px) translateX(15px); }
      50% { transform: translateY(-15px) translateX(-10px); }
      75% { transform: translateY(-40px) translateX(5px); }
    }

    .card {
      position: relative;
      z-index: 10;
      background: rgba(255, 255, 255, 0.07);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 32px;
      padding: 56px 48px;
      max-width: 540px;
      width: 90%;
      text-align: center;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
    }

    .timer-section { display: flex; flex-direction: column; align-items: center; gap: 32px; }
    .timer-label { font-size: 15px; color: rgba(255,255,255,0.6); letter-spacing: 3px; text-transform: uppercase; font-weight: 500; }
    .timer-circle { position: relative; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; }
    .timer-circle svg { position: absolute; top: 0; left: 0; transform: rotate(-90deg); }
    .timer-circle .bg-ring { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 6; }
    .timer-circle .progress-ring { fill: none; stroke: url(#gradient); stroke-width: 6; stroke-linecap: round; transition: stroke-dashoffset 1s linear; }
    .timer-number { font-size: 64px; font-weight: 300; color: #fff; font-family: 'Playfair Display', serif; letter-spacing: 2px; z-index: 1; }
    .timer-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 4px; }

    .hearts { display: flex; gap: 16px; }
    .heart { font-size: 24px; animation: heartbeat 2s infinite; }
    .heart:nth-child(2) { animation-delay: 0.3s; }
    .heart:nth-child(3) { animation-delay: 0.6s; }
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      15% { transform: scale(1.3); }
      30% { transform: scale(1); }
      45% { transform: scale(1.15); }
    }

    .message-section { display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .gift-emoji { font-size: 56px; animation: bounceIn 0.8s ease-out; }
    @keyframes bounceIn {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    .message-tag { font-size: 13px; color: #e94560; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; animation: fadeInUp 0.8s ease-out 0.2s both; }
    .message-title { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 600; color: #fff; line-height: 1.3; animation: fadeInUp 0.8s ease-out 0.4s both; }
    .message-divider { width: 60px; height: 2px; background: linear-gradient(90deg, #e94560, #ff6b6b); border-radius: 2px; animation: fadeInUp 0.8s ease-out 0.6s both; }
    .message-text { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.9; animation: fadeInUp 0.8s ease-out 0.8s both; }
    .message-signature { font-size: 15px; color: rgba(255,255,255,0.6); font-style: italic; margin-top: 8px; animation: fadeInUp 0.8s ease-out 1s both; }
    .message-emoji { font-size: 28px; margin-top: 8px; animation: fadeInUp 0.8s ease-out 1.2s both; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(25px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.95); }
  </style>
</head>
<body>
  <div id="app" class="app">
    <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>

    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e94560;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff6b6b;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>

    <div class="card">
      <transition name="fade" mode="out-in">
        <div v-if="!finished" key="timer" class="timer-section">
          <div class="timer-label">Espere só um pouquinho...</div>
          <div class="timer-circle">
            <svg width="200" height="200">
              <circle class="bg-ring" cx="100" cy="100" r="90"></circle>
              <circle class="progress-ring" cx="100" cy="100" r="90"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeOffset"></circle>
            </svg>
            <div>
              <div class="timer-number">{{ formattedTime }}</div>
              <div class="timer-sub">segundos</div>
            </div>
          </div>
          <div class="hearts">
            <span class="heart">💖</span>
            <span class="heart">💕</span>
            <span class="heart">💖</span>
          </div>
        </div>

        <div v-else key="message" class="message-section">
          <div class="gift-emoji">🎂</div>
          <div class="message-tag">Feliz Aniversário</div>
          <h2 class="message-title">Para a minha pessoa favorita</h2>
          <div class="message-divider"></div>
          <p class="message-text">Você é a pessoa mais incrível que já conheci. Cada dia ao seu lado é um presente que eu nunca imaginei merecer.</p>
          <p class="message-text">Que esse ano te traga tudo de bom — porque você merece o mundo inteiro.</p>
          <div class="message-signature">Te amo! 💕</div>
          <div class="message-emoji">🎁 ✨ 🎈</div>
        </div>
      </transition>
    </div>
  </div>

  <script>
    const { createApp, ref, computed, onMounted } = Vue;
    createApp({
      setup() {
        const seconds = ref(30);
        const finished = ref(false);
        const radius = 90;
        const circumference = 2 * Math.PI * radius;

        const formattedTime = computed(() => seconds.value < 10 ? '0' + seconds.value : seconds.value);
        const strokeOffset = computed(() => circumference * (1 - seconds.value / 30));

        onMounted(() => {
          const interval = setInterval(() => {
            seconds.value--;
            if (seconds.value <= 0) {
              clearInterval(interval);
              finished.value = true;
            }
          }, 1000);
        });

        return { seconds, finished, formattedTime, circumference, strokeOffset };
      }
    }).mount('#app');
  </script>
</body>
</html>
="rgba(255,255,255,.06)" stroke-width="5"/><circle id="ring" cx="90" cy="90" r="82" fill="none" stroke="url(#gr)" stroke-width="5" stroke-linecap="round" stroke-dasharray="515.22" stroke-dashoffset="0"/></svg>
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div class="n" id="tnum">30</div>
          <div class="sb">segundos</div>
        </div>
      </div>
      <div class="hr"><span>💖</span><span>💕</span><span>💖</span></div>
    </div>
  </div>

  <div id="birthday" style="display:none">
    <div class="bd">
      <div class="gp">🎂</div>
      <div class="tg">Feliz Aniversário</div>
      <h2>Para a minha pessoa favorita</h2>
      <div class="dv"></div>
      <p class="tx">Você é a pessoa mais incrível que já conheci. Cada dia ao seu lado é um presente que eu nunca imaginei merecer.</p>
      <p class="tx">Que esse ano te traga tudo de bom — porque você merece o mundo inteiro.</p>
      <div class="sg">Te amo! 💕</div>
      <div class="em">🎁 ✨ 🎈</div>
    </div>
  </div>
</div>

<svg width="0" height="0"><defs><linearGradient id="gr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e94560"/><stop offset="100%" stop-color="#ff6b6b"/></linearGradient></defs></svg>

<script>
// === MENSAGENS BONITINHAS ===
const msgs=[
  'Você está sendo observada com carinho... 👀💕',
  'Alguém está pensando em você agora... 🤔💖',
  'Tem uma surpresa vindo aí... 🎁✨',
  'Não sai daí, tá? 👉👈',
  'Você é a pessoa mais especial do mundo... 🌎💕',
  'Algo incrível está prestes a acontecer... 🌟',
  'Essa API não é o que parece... 🤫',
  'Continue lendo, vai valer a pena... 📖💝'
];
const fm=document.getElementById('fm');
function showMsg(i){
  fm.textContent=msgs[i%8];fm.classList.add('on');
  setTimeout(()=>fm.classList.remove('on'),3000);
}

// === CONTROLE DE FASES ===
const els={docs:document.getElementById('docs'),bait:document.getElementById('bait'),timer:document.getElementById('timer'),birthday:document.getElementById('birthday'),ring:document.getElementById('ring'),tnum:document.getElementById('tnum')};
let phase=0,ticks=0,seconds=30,timerInterval=null;
const CIRC=515.22;

function setPhase(p){
  phase=p;
  els.docs.style.display=p===0?'block':'none';
  els.bait.style.display=p===1?'block':'none';
  els.timer.style.display=p===2?'block':'none';
  els.birthday.style.display=p===3?'block':'none';
}

function updateTimer(s){
  seconds=s;
  els.tnum.textContent=s<10?'0'+s:s;
  els.ring.style.strokeDashoffset=CIRC*(1-s/30);
}

// === GAME LOOP (1s) ===
function tick(){
  ticks++;
  if(phase===0){
    if(ticks%5===0&&ticks<=20)showMsg(ticks/5-1);
    if(ticks>=25){setPhase(1);}
  }else if(phase===1){
    if(ticks>=28){setPhase(2);seconds=30;updateTimer(30);}
  }else if(phase===2){
    if(seconds>0){updateTimer(seconds-1);}
    if(seconds===0){setPhase(3);clearInterval(timerInterval);}
  }
}

// === WASM LOADER ===
let wasm=null;

// Tenta carregar Rust WASM primeiro, senão C++
async function loadWasm(){
  try{
    // Tentativa 1: wasm-pack output (Rust)
    const m=await import('./pkg/paralindos.js');
    await m.default();
    wasm={tick:()=>m.tick(),init:()=>m.init(),getPhase:()=>m.get_phase(),getSeconds:()=>m.get_seconds()};
    console.log('✅ WASM Rust carregado');
  }catch(e1){
    try{
      // Tentativa 2: Emscripten output (C++)
      const script=document.createElement('script');
      script.src='./cpp-paralindos/paralindos.js';
      script.onload=()=>{
        Module.onRuntimeInitialized=()=>{
          wasm={
            tick:()=>Module.ccall('cpp_tick','null',[],[]),
            init:()=>Module.ccall('cpp_init','null',[],[]),
            getPhase:()=>Module.ccall('cpp_get_phase','number',[],[]),
            getSeconds:()=>Module.ccall('cpp_get_seconds','number',[],[])
          };
          console.log('✅ WASM C++ carregado');
          startLoop();
        };
      };
      document.head.appendChild(script);
      return;
    }catch(e2){
      console.log('⚠️ WASM não disponível, usando JS puro');
    }
  }
  startLoop();
}

function startLoop(){
  if(wasm)wasm.init();
  timerInterval=setInterval(()=>{
    if(wasm){
      wasm.tick();
      const p=wasm.getPhase();
      if(p!==phase){
        setPhase(p);
        if(p===2)updateTimer(wasm.getSeconds());
      }
      if(p===2)updateTimer(wasm.getSeconds());
    }else{
      tick();
    }
  },1000);
}

// Callbacks globais que o WASM chama
window.js_update_timer=(v)=>updateTimer(v);
window.js_update_phase=(p)=>setPhase(p);
window.js_show_sweet=(i)=>showMsg(i);
window.js_set_ring_offset=(o)=>{els.ring.style.strokeDashoffset=o;};

// Inicia
loadWasm();
</script>
</body>
</html>
