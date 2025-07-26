import { createSignal, onMount, createMemo } from "solid-js";
import EditItemModal from "./EditItemModal";
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

const ChecklistSolid: Component<Props> = (props) => {
  // Estados principales
  const [checkboxState, setCheckboxState] = createSignal<Record<string, boolean>>({});
  const [filter, setFilter] = createSignal<'todos' | 'completados' | 'pendientes'>('todos');
  const [search, setSearch] = createSignal('');
  const [adding, setAdding] = createSignal<Record<string, boolean>>({});
  const [newItemText, setNewItemText] = createSignal<Record<string, string>>({});
  
  // Estados para edición
  const [editing, setEditing] = createSignal<{ cat: string | null; idx: number | null }>({ cat: null, idx: null });
  const [editValue, setEditValue] = createSignal<string>("");

  // Estado de ítems editables (inicializado desde props)
  const [editableItems, setEditableItems] = createSignal<Record<string, string[]>>({});

  // Inicializar desde localStorage o props
  onMount(() => {
    // Cargar estado de checkboxes
    if (typeof localStorage !== "undefined") {
      const savedCheckboxes = localStorage.getItem("checklist-state");
      if (savedCheckboxes) {
        setCheckboxState(JSON.parse(savedCheckboxes));
      }

      // Cargar ítems editables
      const savedItems = localStorage.getItem("checklist-editable-items");
      if (savedItems) {
        setEditableItems(JSON.parse(savedItems));
      } else {
        // Inicializar con datos de props
        const initialItems: Record<string, string[]> = {};
        props.checklist.forEach(cat => {
          initialItems[cat.categoria] = [...cat.items]; // Copia defensiva
        });
        setEditableItems(initialItems);
        localStorage.setItem("checklist-editable-items", JSON.stringify(initialItems));
      }
    }
  });

  // Funciones de persistencia
  const saveCheckboxState = (newState: Record<string, boolean>) => {
    setCheckboxState(newState);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("checklist-state", JSON.stringify(newState));
    }
  };

  const saveEditableItems = (newItems: Record<string, string[]>) => {
    setEditableItems(newItems);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("checklist-editable-items", JSON.stringify(newItems));
    }
  };

  // Actualizar estado de checkbox
  const updateCheckbox = (key: string, checked: boolean) => {
    const newState = { ...checkboxState(), [key]: checked };
    saveCheckboxState(newState);
  };

  // Gradientes de borde por categoría
  const borderGradients: Record<string, string> = {
    "Neceser": "linear-gradient(135deg, #f472b6, #a21caf, #ec4899)",
    "Ropa": "linear-gradient(135deg, #22d3ee, #3b82f6, #06b6d4)",
    "Medicinas": "linear-gradient(135deg, #fbbf24, #ef4444, #f59e42)",
    "Electrónica": "linear-gradient(135deg, #818cf8, #a78bfa, #6366f1)",
    "Documentación": "linear-gradient(135deg, #6ee7b7, #10b981, #34d399)",
    "Varios": "linear-gradient(135deg, #fde68a, #fb923c, #facc15)",
  };

  // Función de filtrado
  const getFilteredItems = (categoria: string) => {
    const items = editableItems()[categoria] || [];
    return items
      .map((item, idx) => ({ item, idx }))
      .filter(({ item, idx }) => {
        const key = `${categoria}-${idx}`;
        const isChecked = checkboxState()[key] ?? false;
        
        // Filtrar por estado
        if (filter() === 'completados' && !isChecked) return false;
        if (filter() === 'pendientes' && isChecked) return false;
        
        // Filtrar por búsqueda
        if (search().trim() && !item.toLowerCase().includes(search().toLowerCase())) return false;
        
        return true;
      });
  };

  // Añadir nuevo ítem
  const addNewItem = (categoria: string) => {
    const text = (newItemText()[categoria] || '').trim();
    if (!text) return;

    const currentItems = editableItems()[categoria] || [];
    const updatedItems = { ...editableItems(), [categoria]: [...currentItems, text] };
    
    saveEditableItems(updatedItems);
    setNewItemText({ ...newItemText(), [categoria]: '' });
    setAdding({ ...adding(), [categoria]: false });
  };

  // Eliminar ítem
  const deleteItem = (categoria: string, idx: number) => {
    const currentItems = editableItems()[categoria] || [];
    const newItems = currentItems.filter((_, i) => i !== idx);
    const updatedItems = { ...editableItems(), [categoria]: newItems };
    
    saveEditableItems(updatedItems);
    
    // Cerrar modal de edición si estaba editando este ítem
    if (editing().cat === categoria && editing().idx === idx) {
      setEditing({ cat: null, idx: null });
    }
  };

  // Editar ítem
  const saveEdit = () => {
    const cat = editing().cat;
    const idx = editing().idx;
    if (!cat || idx === null) return;
    
    const text = editValue().trim();
    if (!text) return;

    const currentItems = editableItems()[cat] || [];
    const newItems = [...currentItems];
    newItems[idx] = text;
    const updatedItems = { ...editableItems(), [cat]: newItems };
    
    saveEditableItems(updatedItems);
    setEditing({ cat: null, idx: null });
  };

  return (
    <div class="p-4">
      {/* Toolbar sticky de filtros y búsqueda */}
      <div class="sticky top-16 z-30 bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-md mb-8 flex flex-col sm:flex-row items-center gap-2 px-4 py-3 border border-white/10">
        <div class="flex gap-2 mb-2 sm:mb-0">
          <button
            class={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-pink-400/70 shadow-sm
              ${filter() === 'todos'
                ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white border-pink-500 shadow-lg shadow-pink-500/30'
                : 'bg-transparent text-pink-400 border-pink-400 hover:bg-pink-500/10'}
            `}
            onClick={() => setFilter('todos')}
          >Todos</button>
          <button
            class={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400/70 shadow-sm
              ${filter() === 'completados'
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-400/30'
                : 'bg-transparent text-green-400 border-green-400 hover:bg-green-400/10'}
            `}
            onClick={() => setFilter('completados')}
          >Completados</button>
          <button
            class={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 shadow-sm
              ${filter() === 'pendientes'
                ? 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 border-yellow-300 shadow-lg shadow-yellow-300/30'
                : 'bg-transparent text-yellow-300 border-yellow-300 hover:bg-yellow-300/10'}
            `}
            onClick={() => setFilter('pendientes')}
          >Pendientes</button>
        </div>
        <input
          type="text"
          class="flex-1 px-3 py-1 rounded-lg bg-neutral-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          placeholder="🔍 Buscar ítem..."
          value={search()}
          onInput={e => setSearch(e.currentTarget.value)}
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Object.entries(editableItems()).map(([categoria, items]) => {
          const filtered = getFilteredItems(categoria);
          if (filtered.length === 0) return null;
          
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
                  <span class="text-sm text-pink-300">{filtered.length} ítems</span>
                </div>
                
                {/* Añadir ítem */}
                <div class="mb-2 flex gap-2 items-center">
                  <button
                    class="px-2 py-1 rounded-full bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-all"
                    onClick={() => setAdding({ ...adding(), [categoria]: !adding()[categoria] })}
                  >
                    {adding()[categoria] ? 'Cancelar' : '+ Añadir ítem'}
                  </button>
                  
                  {adding()[categoria] && (
                    <form 
                      onSubmit={e => {
                        e.preventDefault();
                        addNewItem(categoria);
                      }} 
                      class="flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        class="px-2 py-1 rounded-lg bg-neutral-800 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"
                        placeholder="Nuevo ítem..."
                        value={newItemText()[categoria] || ''}
                        onInput={e => setNewItemText({ ...newItemText(), [categoria]: e.currentTarget.value })}
                      />
                      <button type="submit" class="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-all">
                        Agregar
                      </button>
                    </form>
                  )}
                </div>
                
                <ul class="max-h-96 overflow-y-auto px-2 m-0">
                  {filtered.map(({ item, idx }) => {
                    const key = `${categoria}-${idx}`;
                    return (
                      <li class="flex items-start gap-2 text-white/90 text-sm group">
                        <input
                          type="checkbox"
                          id={key}
                          class="accent-pink-500 mt-1"
                          checked={checkboxState()[key] ?? false}
                          onChange={e => updateCheckbox(key, e.currentTarget.checked)}
                        />
                        <label for={key} class="cursor-pointer flex-1">{item}</label>
                        
                        <button
                          class="ml-1 p-1 rounded-full transition-opacity opacity-80 hover:opacity-100 focus:opacity-100 outline-none border-none shadow-none ring-0 focus:ring-0"
                          style="background: none; border: none; box-shadow: none; outline: none;"
                          title="Editar"
                          aria-label="Editar ítem"
                          onClick={() => {
                            setEditing({ cat: categoria, idx });
                            setEditValue(item);
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5z" fill="#FFD600"/>
                            <path d="M17.71 6.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.13 1.13 3.75 3.75 1.13-1.13z" fill="#FFD600"/>
                          </svg>
                        </button>
                        
                        <button
                          class="ml-1 p-1 rounded-full transition-opacity opacity-80 hover:opacity-100 focus:opacity-100 outline-none border-none shadow-none ring-0 focus:ring-0"
                          style="background: none; border: none; box-shadow: none; outline: none;"
                          title="Eliminar"
                          aria-label="Eliminar ítem"
                          onClick={() => deleteItem(categoria, idx)}
                        >
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="8" width="10" height="8" rx="2" fill="#FF1744"/>
                            <rect x="8" y="4" width="4" height="2" rx="1" fill="#FF1744"/>
                            <rect x="3" y="6" width="14" height="2" rx="1" fill="#FF5252"/>
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal global de edición de ítem */}
      <EditItemModal
        open={editing().cat !== null && editing().idx !== null}
        value={editValue()}
        onChange={setEditValue}
        onSave={saveEdit}
        onCancel={() => setEditing({ cat: null, idx: null })}
      />
    </div>
  );
};

export default ChecklistSolid;
