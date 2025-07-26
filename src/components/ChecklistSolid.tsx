import { createSignal, onMount } from "solid-js";
import type { Component } from "solid-js";

export interface ChecklistItem {
  categoria: string;
  emoji: string;
  items: string[];
}

interface Props {
  checklist: ChecklistItem[];
}

const icons: Record<string, string> = {
  "Neceser": "🧴",
  "Ropa": "👕",
  "Medicinas": "💊",
  "Electrónica": "🔌",
  "Documentación": "📄",
  "Varios": "🎒",
};

function getInitialState() {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("checklist-state");
    return saved ? JSON.parse(saved) : {};
  }
  return {};
}

const ChecklistSolid: Component<Props> = (props) => {
  const [state, setState] = createSignal<{ [key: string]: boolean }>(getInitialState());

  // Guardar en localStorage cada vez que cambia el estado
  const updateState = (key: string, checked: boolean) => {
    const newState = { ...state(), [key]: checked };
    setState(newState);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("checklist-state", JSON.stringify(newState));
    }
  };

  // Sincronizar con localStorage al montar
  onMount(() => {
    setState(getInitialState());
  });

  // Convertir props.checklist (array) a objeto {categoria: items[]}
  const checklistObj: Record<string, string[]> = {};
  props.checklist.forEach(cat => {
    checklistObj[cat.categoria] = cat.items;
  });

  // Gradientes de borde por categoría
  const borderGradients: Record<string, string> = {
    "Neceser": "linear-gradient(135deg, #f472b6, #a21caf, #ec4899)",
    "Ropa": "linear-gradient(135deg, #22d3ee, #3b82f6, #06b6d4)",
    "Medicinas": "linear-gradient(135deg, #fbbf24, #ef4444, #f59e42)",
    "Electrónica": "linear-gradient(135deg, #818cf8, #a78bfa, #6366f1)",
    "Documentación": "linear-gradient(135deg, #6ee7b7, #10b981, #34d399)",
    "Varios": "linear-gradient(135deg, #fde68a, #fb923c, #facc15)",
  };

  return (
    <div class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {Object.entries(checklistObj).map(([categoria, items]) => {
          const border = borderGradients[categoria] || "linear-gradient(135deg, #e5e7eb, #d1d5db)";
          return (
            <div
              class="rounded-3xl shadow-lg hover:scale-[1.01] transition-transform duration-200"
              style={`background: ${border}; padding: 2px; border-radius: 1.5rem;`}
            >
              <div class="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl h-full w-full" style="border-radius: 1.35rem; padding: 1rem;">
                <div class="flex items-center justify-between mb-3">
                  <h2 class="text-xl font-bold text-white mb-0">
                    <span class="mr-2">{icons[categoria] ?? "📦"}</span> {categoria}
                  </h2>
                  <span class="text-sm text-pink-300">{items.length} ítems</span>
                </div>
                <ul class="max-h-96 overflow-y-auto px-2 m-0">
                  {items.map((item, idx) => {
                    const key = `${categoria}-${idx}`;
                    return (
                      <li class="flex items-start gap-2 text-white/90 text-sm">
                        <input
                          type="checkbox"
                          id={key}
                          class="accent-pink-500 mt-1"
                          checked={state()[key] ?? false}
                          onChange={e => updateState(key, e.currentTarget.checked)}
                        />
                        <label for={key} class="cursor-pointer">{item}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistSolid;
