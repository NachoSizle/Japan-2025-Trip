import { createSignal, onCleanup, createEffect } from 'solid-js';
import { getLLMResponse } from '../helpers/llmResponse';

type ChatItinerarioSolidProps = {
  itineraryData?: any;
  onClose?: () => void;
};

export default function ChatItinerarioSolid(props: ChatItinerarioSolidProps) {
  const [open, setOpen] = createSignal(false);
  const [messages, setMessages] = createSignal([
    { from: 'bot', text: '¡Hola! Pregúntame cualquier cosa sobre tu viaje a Japón.' }
  ]);
  const [input, setInput] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  // Accesibilidad: cerrar con ESC
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
    onCleanup(() => window.removeEventListener('keydown', handleKeyDown));
  }

  // Ref para autoscroll
  let chatRef: HTMLDivElement | undefined;

  // Autoscroll al final cuando cambian los mensajes
  createEffect(() => {
    // Observa el número de mensajes, no solo el array
    const _ = messages().length;
    if (chatRef) {
      setTimeout(() => {
        if (chatRef) chatRef.scrollTop = chatRef.scrollHeight;
      }, 0);
    }
  });

  const sendMessage = async (customInput?: string) => {
    const question = (typeof customInput === 'string' ? customInput : input()).trim();
    if (!question) return;
    setMessages([...messages(), { from: 'user', text: question }]);
    setInput('');
    setLoading(true);
    try {
      const answer = await getLLMResponse(question);
      setMessages(msgs => [...msgs, { from: 'bot', text: answer }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { from: 'bot', text: '❌ Error al generar respuesta: ' + (e as any)?.message }]);
    }
    setLoading(false);
  };

  const clearChat = () => setMessages([{ from: 'bot', text: '¡Hola! Pregúntame cualquier cosa sobre tu viaje a Japón.' }]);
  const minimize = () => setOpen(false);
  const reopen = () => setOpen(true);

  return (
    <>
      {open() ? (
        <div class="fixed bottom-6 right-6 z-50 flex flex-col w-full max-w-sm min-h-[520px] max-h-[88vh] rounded-2xl shadow-2xl border border-fuchsia-400 bg-gradient-to-br from-fuchsia-700 via-purple-900 to-cyan-900 dark:from-fuchsia-900 dark:via-purple-950 dark:to-cyan-950 bg-opacity-95 dark:bg-opacity-95 overflow-hidden animate-fade-in">
          <div class="flex items-center justify-between px-5 pr-3 py-4 border-b border-fuchsia-400 bg-fuchsia-700/90 dark:bg-fuchsia-900/90 text-white">
            <span class="font-bold text-lg tracking-wide">Pregúntale a tu Itinerario</span>
            <div class="flex gap-1 items-center ml-auto">
              <button
                aria-label="Nuevo chat"
                class="flex items-center justify-center border-none bg-transparent hover:bg-[rgba(255,20,147,0.18)] text-fuchsia-600 hover:text-fuchsia-700 transition-all duration-200 w-9 h-9 shadow-none p-0"
                onClick={clearChat}
                title="Nuevo chat"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8" />
                </svg>
              </button>
              <button
                aria-label="Cerrar chat"
                class="flex items-center justify-center border-none bg-transparent hover:bg-[rgba(255,20,147,0.18)] text-fuchsia-600 hover:text-fuchsia-700 transition-all duration-200 w-9 h-9 shadow-none p-0"
                onClick={minimize}
                title="Cerrar"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            class="flex-1 overflow-y-auto px-6 py-4 space-y-3"
            ref={el => { chatRef = el as HTMLDivElement; }}
          >
            {messages().map((msg, i) => (
              <div class={msg.from === 'user' ? 'text-right' : 'text-left'}>
                <span class={msg.from === 'user'
                  ? 'inline-block bg-cyan-200 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 rounded-lg px-4 py-2 my-1 shadow'
                  : 'inline-block bg-fuchsia-100 dark:bg-fuchsia-800 text-fuchsia-900 dark:text-fuchsia-100 rounded-lg px-4 py-2 my-1 shadow'}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading() && <div class="text-center text-fuchsia-300 animate-pulse">Pensando...</div>}
          </div>
          <form class="flex flex-col gap-2 px-4 py-4 border-t border-fuchsia-400 bg-white/80 dark:bg-neutral-900/80" onSubmit={async e => { e.preventDefault(); await sendMessage(); }}>
            <div class="flex items-center gap-3">
              <input
                class="flex-1 rounded border border-cyan-400 dark:border-cyan-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow"
                type="text"
                placeholder="Escribe tu pregunta..."
                value={input()}
                onInput={e => setInput(e.target.value)}
                aria-label="Pregunta al chat"
                required
              />
              <button type="submit" class="rounded-full border border-fuchsia-300 bg-[rgba(255,20,147,0.08)] hover:bg-[rgba(255,20,147,0.18)] text-fuchsia-600 hover:text-fuchsia-700 px-5 py-2 font-semibold transition-all duration-200 focus:ring-2 focus:ring-fuchsia-300 shadow-none">
                Enviar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          class="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-fuchsia-600 text-white p-4 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
          aria-label="Abrir chat contextual"
          onClick={reopen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
    </>
  );
}
