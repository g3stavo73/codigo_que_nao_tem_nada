#include <emscripten.h>

static unsigned char g_seconds = 30;
static unsigned char g_phase = 0;
static unsigned char g_ticks = 0;
static const float CIRCUMFERENCE = 515.4867f;

extern "C" {
    EMSCRIPTEN_KEEPALIVE void cpp_init() {
        g_seconds = 30; g_phase = 0; g_ticks = 0;
    }
    EMSCRIPTEN_KEEPALIVE unsigned char cpp_get_seconds() { return g_seconds; }
    EMSCRIPTEN_KEEPALIVE unsigned char cpp_get_phase() { return g_phase; }
    EMSCRIPTEN_KEEPALIVE float cpp_get_ring_offset(unsigned char s) {
        return CIRCUMFERENCE * (1.0f - (float)s / 30.0f);
    }
    EMSCRIPTEN_KEEPALIVE void cpp_tick() {
        g_ticks++;
        if (g_phase == 0) { if (g_ticks >= 25) g_phase = 1; return; }
        if (g_phase == 1) { if (g_ticks >= 28) { g_phase = 2; g_seconds = 30; } return; }
        if (g_phase == 2) {
            if (g_seconds > 0) g_seconds--;
            if (g_seconds == 0) g_phase = 3;
        }
    }
}
