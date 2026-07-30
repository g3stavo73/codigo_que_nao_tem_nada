# Requer Emscripten instalado (emcc)
emcc main.cpp \
  -O3 \
  -s WASM=1 \
  -s EXPORTED_FUNCTIONS='["_cpp_init","_cpp_get_seconds","_cpp_get_phase","_cpp_get_ring_offset","_cpp_tick"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
  -s INITIAL_MEMORY=65536 \
  -s MAXIMUM_MEMORY=65536 \
  -s ALLOW_MEMORY_GROWTH=0 \
  -s STACK_SIZE=8192 \
  -s MALLOC=none \
  -s FILESYSTEM=0 \
  -s ASSERTIONS=0 \
  -s ENVIRONMENT=web \
  -flto \
  --closure 1 \
  -o paralindos.js
 
