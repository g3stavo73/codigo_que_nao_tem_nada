import { createApp, ref, computed, onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const App = {
  setup() {
    const phase = ref('docs');
    const currentMessage = ref('');
    const showMessage = ref(false);
    
    const seconds = ref(30);
    const circumference = 2 * Math.PI * 90;

    const formattedTime = computed(() => seconds.value < 10 ? '0' + seconds.value : seconds.value);
    const strokeOffset = computed(() => circumference * (1 - seconds.value / 30));

    const endpoints = [
      { method: 'GET', path: '/v1/paralindos', desc: 'Retorna uma lista de lindos em formato JSON' },
      { method: 'POST', path: '/v1/paralindos/criar', desc: 'Cria um novo lindo com validação de fofura' },
      { method: 'DELETE', path: '/v1/paralindos/:id', desc: 'Remove um lindo permanentemente (irreversível)' },
      { method: 'PATCH', path: '/v1/paralindos/:id/atualizar', desc: 'Atualiza o nível de fofura de um lindo' },
    ];

    const codeExample = `const paralindos = require('javascriptparalindos');

const motor = paralindos.inicializar({
  nivelFofura: 'extremo',
  modoSorriso: true
});

const resultado = motor.criarLindo({
  nome: 'Sarah',
  tipo: 'especial',
  atributos: ['incrível', 'única', 'maravilhosa']
});

console.log(resultado); // { status: 'sucesso', lindo: true }`;

    const sweetMessages = [
      'Você está sendo observada com carinho... 👀💕',
      'Alguém está pensando em você agora... 🤔💖',
      'Tem uma surpresa vindo aí... 🎁✨',
      'Não sai daí, tá? 👉👈',
      'Você é a pessoa mais especial do mundo... 🌎💕',
      'Algo incrível está prestes a acontecer... 🌟',
      'Essa API não é o que parece... 🤫',
      'Continue lendo, vai valer a pena... 📖💝',
    ];

    let messageInterval = null;
    let docsTimer = null;

    const startSweetMessages = () => {
      let index = 0;
      messageInterval = setInterval(() => {
        currentMessage.value = sweetMessages[index % sweetMessages.length];
        showMessage.value = true;
        setTimeout(() => { showMessage.value = false; }, 3000);
        index++;
      }, 5000);
    };

    const startDocsPhase = () => {
      startSweetMessages();
      docsTimer = setTimeout(() => {
        clearInterval(messageInterval);
        phase.value = 'bait';
        setTimeout(() => {
          phase.value = 'timer';
          startTimer();
        }, 3500);
      }, 25000);
    };

    const startTimer = () => {
      const interval = setInterval(() => {
        seconds.value--;
        if (seconds.value <= 0) {
          clearInterval(interval);
          phase.value = 'birthday';
        }
      }, 1000);
    };

    onMounted(() => {
      startDocsPhase();
    });

    onUnmounted(() => {
      clearInterval(messageInterval);
      clearTimeout(docsTimer);
    });

    return {
      phase, currentMessage, showMessage,
      endpoints, codeExample,
      seconds, formattedTime, circumference, strokeOffset,
    };
  },
  template: `
    <div class="app min-h-screen relative overflow-hidden">
      
      <div class="bubble" style="width:120px;height:120px;top:8%;left:8%;"></div>
      <div class="bubble" style="width:80px;height:80px;top:15%;right:12%;animation-delay:-5s;"></div>
      <div class="bubble" style="width:150px;height:150px;bottom:10%;left:15%;animation-delay:-10s;"></div>
      <div class="bubble" style="width:60px;height:60px;bottom:20%;right:8%;animation-delay:-15s;"></div>
      <div class="bubble" style="width:100px;height:100px;top:45%;left:3%;animation-delay:-7s;"></div>

      <svg width="0" height="0" class="absolute">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e94560" />
            <stop offset="100%" stop-color="#ff6b6b" />
          </linearGradient>
        </defs>
      </svg>

      <transition name="float-msg">
        <div v-if="showMessage" class="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium shadow-2xl max-w-sm text-center">
          {{ currentMessage }}
        </div>
      </transition>

      <div class="card relative z-10 w-11/12 max-w-2xl mx-auto my-8 p-8 md:p-10 rounded-[24px]">
        
        <div v-if="phase === 'docs'" class="fade-in">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-white font-bold text-lg">
              JP
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">JavaScriptParalindos</h1>
              <p class="text-xs text-white/40">v2.4.0 — API de Fofura Avançada</p>
            </div>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            API Online
          </div>

          <p class="text-white/70 text-sm leading-relaxed mb-8">
            JavaScriptParalindos é uma API REST poderosa para gerenciamento de lindos em aplicações web modernas. 
            Oferece endpoints otimizados para criar, ler, atualizar e deletar lindos com validação de fofura em tempo real.
          </p>

          <div class="mb-8">
            <h3 class="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Endpoints</h3>
            <div class="space-y-3">
              <div v-for="(ep, i) in endpoints" :key="i" class="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <span :class="['text-xs font-bold px-2 py-0.5 rounded', ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : ep.method === 'POST' ? 'bg-green-500/20 text-green-400' : ep.method === 'DELETE' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400']">
                  {{ ep.method }}
                </span>
                <div>
                  <code class="text-sm text-white/90 font-mono">{{ ep.path }}</code>
                  <p class="text-xs text-white/40 mt-0.5">{{ ep.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">Exemplo de Uso</h3>
            <div class="bg-[#0d1117] rounded-xl p-4 overflow-x-auto border border-white/5">
              <pre class="text-xs text-white/70 font-mono leading-relaxed">{{ codeExample }}</pre>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-white/5">
            <p class="text-xs text-white/30">© 2026 JavaScriptParalindos Inc.</p>
            <div class="flex gap-2">
              <span class="w-2 h-2 rounded-full bg-white/10"></span>
              <span class="w-2 h-2 rounded-full bg-white/10"></span>
              <span class="w-2 h-2 rounded-full bg-white/10"></span>
            </div>
          </div>
        </div>

        <div v-else-if="phase === 'bait'" class="flex flex-col items-center gap-6 py-12 text-center fade-in">
          <div class="text-[72px] animate-bounce">😏</div>
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            Achou mesmo que isso era real?
          </h2>
          <p class="text-white/50 text-base max-w-md">
            JavaScriptParalindos não existe, meu amor. Mas o que vem agora... existe de verdade. 💕
          </p>
          <div class="flex gap-2 mt-4">
            <span class="w-2 h-2 rounded-full bg-[#e94560] animate-pulse"></span>
            <span class="w-2 h-2 rounded-full bg-[#e94560] animate-pulse" style="animation-delay:0.2s;"></span>
            <span class="w-2 h-2 rounded-full bg-[#e94560] animate-pulse" style="animation-delay:0.4s;"></span>
          </div>
        </div>

        <div v-else-if="phase === 'timer'" class="flex flex-col items-center gap-8 py-8 fade-in">
          <p class="text-sm tracking-[3px] uppercase font-medium text-white/60">
            Só mais um pouquinho...
          </p>

          <div class="relative w-[200px] h-[200px] flex items-center justify-center">
            <svg width="200" height="200" class="absolute top-0 left-0" style="transform: rotate(-90deg);">
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke="url(#gradient)" stroke-width="6" stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeOffset"
                style="transition: stroke-dashoffset 1s linear;"
              />
            </svg>
            <div class="z-10 text-center">
              <div class="text-6xl font-light text-white tracking-wider">
                {{ formattedTime }}
              </div>
              <div class="text-xs text-white/40 mt-1">segundos</div>
            </div>
          </div>

          <div class="flex gap-4">
            <span class="heart text-2xl">💖</span>
            <span class="heart text-2xl" style="animation-delay:0.3s;">💕</span>
            <span class="heart text-2xl" style="animation-delay:0.6s;">💖</span>
          </div>
        </div>

        <div v-else class="flex flex-col items-center gap-5 text-center py-4 fade-in">
          <div class="gift-emoji text-[56px]">🎂</div>
          <div class="message-tag text-xs tracking-[4px] uppercase font-semibold text-[#e94560]">
            Feliz Aniversário
          </div>
          <h2 class="message-title text-3xl md:text-[32px] font-bold text-white leading-tight">
            Para a minha pessoa favorita
          </h2>
          <div class="w-[60px] h-[2px] rounded-full bg-gradient-to-r from-[#e94560] to-[#ff6b6b]"></div>
          <p class="message-text text-base text-white/80 leading-relaxed max-w-md">
            Você é a pessoa mais incrível que já conheci. Cada dia ao seu lado é um presente que eu nunca imaginei merecer.
          </p>
          <p class="message-text text-base text-white/80 leading-relaxed max-w-md">
            Que esse ano te traga tudo de bom — porque você merece o mundo inteiro.
          </p>
          <div class="message-signature text-[15px] text-white/60 italic mt-2">Te amo! 💕</div>
          <div class="message-emoji text-[28px] mt-2">🎁 ✨ 🎈</div>
        </div>

      </div>
    </div>
  `
};

createApp(App).mount('#app');
