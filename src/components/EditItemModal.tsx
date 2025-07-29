
import { createEffect, Show, createMemo } from "solid-js";
import type { Component } from "solid-js";

interface EditItemModalProps {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditItemModal: Component<EditItemModalProps> = (props) => {
  let inputRef: HTMLInputElement | undefined;
  
  createEffect(() => {
    if (props.open && inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  });
  
  return (
    <Show when={props.open}>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl shadow-2xl p-6 w-full max-w-sm border-2 border-pink-400/40 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
          <h3 class="text-lg font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">✏️ Editar ítem</h3>
          <input
            type="text"
            class="px-4 py-3 rounded-full bg-neutral-800/60 text-white border border-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400 text-base backdrop-blur-sm placeholder-pink-300/60"
            placeholder="Escribe tu ítem..."
            value={props.value}
            onInput={e => props.onChange(e.currentTarget.value)}
            ref={el => (inputRef = el)}
          />
          <div class="flex gap-3 justify-end mt-2">
            <button
              class="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg border border-green-400/30"
              onClick={props.onSave}
              aria-label="Guardar cambios en el ítem"
            >✓ Guardar</button>
            <button
              class="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-200 shadow-md hover:shadow-lg border border-pink-400/30"
              onClick={props.onCancel}
              aria-label="Cancelar edición del ítem"
            >✕ Cancelar</button>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default EditItemModal;
