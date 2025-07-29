import { createSignal, onMount, createMemo } from "solid-js";
import EditItemModal from "./EditItemModal";
import type { Component } from "solid-js";

// Componentes SVG extraídos para evitar duplicación en línea:
interface IconProps {
  isLight: boolean;
}

const EditIcon: Component<IconProps> = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5z"
      fill={props.isLight ? "#374151" : "#FFD600"}
      stroke={props.isLight ? "none" : "white"}
      stroke-width="1"
    />
    <path
      d="M17.71 6.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.13 1.13 3.75 3.75 1.13-1.13z"
      fill={props.isLight ? "#374151" : "#FFD600"}
      stroke={props.isLight ? "none" : "white"}
      stroke-width="1"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="8" width="10" height="8" rx="2" fill="#FF1744" />
    <rect x="8" y="4" width="4" height="2" rx="1" fill="#FF1744" />
    <rect x="3" y="6" width="14" height="2" rx="1" fill="#FF5252" />
  </svg>
);

export interface ChecklistItem {
  categoria: string;
  emoji: string;
  items: string[];
}

interface Props {
  checklist: ChecklistItem[];
}

const icons: Record<string, string> = {
  Neceser: "🧴",
  Ropa: "👕",
  Medicinas: "💊",
  Electrónica: "🔌",
  Documentación: "📄",
  Varios: "🎒",
};

const ChecklistSolid: Component<Props> = (props) => {
  // Estados principales
  const [checkboxState, setCheckboxState] = createSignal<
    Record<string, boolean>
  >({});
  const [filter, setFilter] = createSignal<
    "todos" | "completados" | "pendientes"
  >("todos");
  const [search, setSearch] = createSignal("");
  const [adding, setAdding] = createSignal<Record<string, boolean>>({});
  const [newItemText, setNewItemText] = createSignal<Record<string, string>>(
    {},
  );
  const [isLightTheme, setIsLightTheme] = createSignal(false);

  // Estados para edición
  const [editing, setEditing] = createSignal<{
    cat: string | null;
    idx: number | null;
  }>({ cat: null, idx: null });
  const [editValue, setEditValue] = createSignal<string>("");
  const [modalOpen, setModalOpen] = createSignal<boolean>(false);

  // Estado de ítems editables (inicializado desde props)
  const [editableItems, setEditableItems] = createSignal<
    Record<string, string[]>
  >({});

  // Timers para debounce de actualizaciones a localStorage
  let checkboxTimer: ReturnType<typeof setTimeout> | null = null;
  let editableTimer: ReturnType<typeof setTimeout> | null = null;

  // Inicialización desde localStorage o props
  onMount(() => {
    // Detectar tema inicial
    const theme = document.documentElement.getAttribute("data-theme");
    setIsLightTheme(theme === "light");

    // Observer para detectar cambios de tema
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setIsLightTheme(currentTheme === "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

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
        // Inicializar desde props
        const initialItems: Record<string, string[]> = {};
        props.checklist.forEach((cat) => {
          initialItems[cat.categoria] = [...cat.items]; // Copia defensiva de los ítems
        });
        setEditableItems(initialItems);
        localStorage.setItem(
          "checklist-editable-items",
          JSON.stringify(initialItems),
        );
      }
    }

    return () => observer.disconnect();
  });

  // Funciones de persistencia con debounce
  const saveCheckboxState = (newState: Record<string, boolean>) => {
    setCheckboxState(newState);
    if (typeof localStorage !== "undefined") {
      if (checkboxTimer) clearTimeout(checkboxTimer);
      checkboxTimer = setTimeout(() => {
        localStorage.setItem("checklist-state", JSON.stringify(newState));
      }, 300);
    }
  };

  const saveEditableItems = (newItems: Record<string, string[]>) => {
    setEditableItems(newItems);
    if (typeof localStorage !== "undefined") {
      if (editableTimer) clearTimeout(editableTimer);
      editableTimer = setTimeout(() => {
        localStorage.setItem(
          "checklist-editable-items",
          JSON.stringify(newItems),
        );
      }, 300);
    }
  };

  // Actualizar estado de checkbox
  const updateCheckbox = (key: string, checked: boolean) => {
    const newState = { ...checkboxState(), [key]: checked };
    saveCheckboxState(newState);
  };

  // Gradientes de borde para cada categoría
  const borderGradients: Record<string, string> = {
    Neceser: "linear-gradient(135deg, #f472b6, #a21caf, #ec4899)",
    Ropa: "linear-gradient(135deg, #22d3ee, #3b82f6, #06b6d4)",
    Medicinas: "linear-gradient(135deg, #fbbf24, #ef4444, #f59e42)",
    Electrónica: "linear-gradient(135deg, #818cf8, #a78bfa, #6366f1)",
    Documentación: "linear-gradient(135deg, #6ee7b7, #10b981, #34d399)",
    Varios: "linear-gradient(135deg, #fde68a, #fb923c, #facc15)",
  };

  // Memo para obtener los ítems filtrados por cada categoría
  const filteredItems = createMemo(() => {
    const result: Record<string, { item: string; idx: number }[]> = {};
    Object.entries(editableItems()).forEach(([categoria, items]) => {
      result[categoria] = items
        .map((item, idx) => ({ item, idx }))
        .filter(({ item, idx }) => {
          const key = `${categoria}-${idx}`;
          const isChecked = checkboxState()[key] ?? false;
          if (filter() === "completados" && !isChecked) return false;
          if (filter() === "pendientes" && isChecked) return false;
          if (
            search().trim() &&
            !item.toLowerCase().includes(search().toLowerCase())
          )
            return false;
          return true;
        });
    });
    return result;
  });

  // Añadir nuevo ítem
  const addNewItem = (categoria: string) => {
    const text = (newItemText()[categoria] || "").trim();
    if (!text) return;
    const currentItems = editableItems()[categoria] || [];
    const updatedItems = {
      ...editableItems(),
      [categoria]: [...currentItems, text],
    };
    saveEditableItems(updatedItems);
    setNewItemText({ ...newItemText(), [categoria]: "" });
    setAdding({ ...adding(), [categoria]: false });
  };

  // Eliminar ítem
  const deleteItem = (categoria: string, idx: number) => {
    const currentItems = editableItems()[categoria] || [];
    const newItems = currentItems.filter((_, i) => i !== idx);
    const updatedItems = { ...editableItems(), [categoria]: newItems };
    saveEditableItems(updatedItems);
    if (editing().cat === categoria && editing().idx === idx) {
      setEditing({ cat: null, idx: null });
      setModalOpen(false);
    }
  };

  // Guardar edición de ítem
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
    setModalOpen(false);
  };

  const cancelEdit = () => {
    setEditing({ cat: null, idx: null });
    setModalOpen(false);
  };

  // Memos para estilos basados en el tema
  const cardStyles = createMemo(() =>
    isLightTheme()
      ? "bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-pink-400/30"
      : "bg-neutral-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-pink-400/30",
  );

  const toolbarStyles = createMemo(() =>
    isLightTheme()
      ? "sticky top-16 z-30 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl mb-8 px-4 py-4 border border-gray-200"
      : "sticky top-16 z-30 bg-neutral-900/90 backdrop-blur-md rounded-2xl shadow-xl mb-8 px-4 py-4 border border-white/10",
  );

  const inputStyles = createMemo(() =>
    isLightTheme()
      ? "w-full px-4 py-3 sm:px-3 sm:py-2 rounded-full bg-gray-100 text-gray-800 border border-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400 text-base sm:text-sm backdrop-blur-sm placeholder-gray-500"
      : "w-full px-4 py-3 sm:px-3 sm:py-2 rounded-full bg-neutral-800/60 text-white border border-pink-400/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400 text-base sm:text-sm backdrop-blur-sm placeholder-pink-300/60",
  );

  const textClasses = createMemo(() => ({
    title: isLightTheme()
      ? "text-xl font-bold text-neutral-800 mb-0"
      : "text-xl font-bold text-white mb-0",
    count: isLightTheme() ? "text-sm text-pink-600" : "text-sm text-pink-300",
    item: isLightTheme()
      ? "flex items-start gap-2 text-neutral-700 text-sm group"
      : "flex items-start gap-2 text-white/90 text-sm group",
  }));

  return (
    <div class="p-4">
      {/* Toolbar sticky de filtros y búsqueda */}
      <div class={toolbarStyles()}>
        <div class="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
          <button
            class={`px-5 py-2.5 sm:px-4 sm:py-1.5 rounded-full font-semibold text-sm sm:text-xs transition-all border-2 focus:outline-none focus:ring-2 focus:ring-pink-400/70 shadow-sm min-w-[90px] sm:min-w-auto
              ${
                filter() === "todos"
                  ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white border-pink-500 shadow-lg shadow-pink-500/30"
                  : "bg-transparent text-pink-400 border-pink-400 hover:bg-pink-500/10"
              }`}
            onClick={() => setFilter("todos")}
            aria-label="Mostrar todos los elementos del checklist"
          >
            Todos
          </button>
          <button
            class={`px-5 py-2.5 sm:px-4 sm:py-1.5 rounded-full font-semibold text-sm sm:text-xs transition-all border-2 focus:outline-none focus:ring-2 focus:ring-green-400/70 shadow-sm min-w-[110px] sm:min-w-auto
              ${
                filter() === "completados"
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-400/30"
                  : "bg-transparent text-green-400 border-green-400 hover:bg-green-400/10"
              }`}
            onClick={() => setFilter("completados")}
            aria-label="Mostrar solo elementos completados del checklist"
          >
            Completados
          </button>
          <button
            class={`px-5 py-2.5 sm:px-4 sm:py-1.5 rounded-full font-semibold text-sm sm:text-xs transition-all border-2 focus:outline-none focus:ring-2 focus:ring-yellow-300/70 shadow-sm min-w-[100px] sm:min-w-auto
              ${
                filter() === "pendientes"
                  ? "bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 border-yellow-300 shadow-lg shadow-yellow-300/30"
                  : "bg-transparent text-yellow-300 border-yellow-300 hover:bg-yellow-300/10"
              }`}
            onClick={() => setFilter("pendientes")}
            aria-label="Mostrar solo elementos pendientes del checklist"
          >
            Pendientes
          </button>
        </div>
        <div class="relative">
          <input
            type="text"
            class={inputStyles()}
            placeholder="🔍 Buscar ítem..."
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          {search() && (
            <button
              class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-pink-500/20 hover:bg-pink-500/40 transition-all"
              onClick={() => setSearch("")}
              aria-label="Limpiar búsqueda"
              title="Limpiar búsqueda"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L14 14M6 14L14 6"
                  stroke="#ec4899"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Object.entries(editableItems()).map(([categoria]) => {
          const filtered = filteredItems()[categoria];
          if (!filtered || filtered.length === 0) return null;
          const border =
            borderGradients[categoria] ||
            "linear-gradient(135deg, #e5e7eb, #d1d5db)";
          return (
            <div
              class="rounded-3xl shadow-lg hover:scale-[1.01] transition-transform duration-200"
              style={`background: ${border}; padding: 2px; border-radius: 1.5rem;`}
            >
              <div class={cardStyles()}>
                <div class="flex items-center justify-between mb-3">
                  <h2 class={textClasses().title}>
                    <span class="mr-2">{icons[categoria] ?? "📦"}</span>{" "}
                    {categoria}
                  </h2>
                  <span class={textClasses().count}>
                    {filtered.length} ítems
                  </span>
                </div>
                <div class="mb-2 flex gap-2 items-center">
                  <button
                    class="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white text-xs font-semibold hover:from-pink-600 hover:to-fuchsia-600 transition-all duration-200 shadow-md hover:shadow-lg border border-pink-400/30"
                    onClick={() =>
                      setAdding({
                        ...adding(),
                        [categoria]: !adding()[categoria],
                      })
                    }
                    aria-label={adding()[categoria] ? `Cancelar añadir ítem en ${categoria}` : `Añadir nuevo ítem en ${categoria}`}
                  >
                    {adding()[categoria] ? "✕ Cancelar" : "+ Añadir ítem"}
                  </button>
                  {adding()[categoria] && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addNewItem(categoria);
                      }}
                      class="flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        class={inputStyles()}
                        placeholder="Nuevo ítem..."
                        value={newItemText()[categoria] || ""}
                        onInput={(e) =>
                          setNewItemText({
                            ...newItemText(),
                            [categoria]: e.currentTarget.value,
                          })
                        }
                      />
                      <button
                        type="submit"
                        class="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg border border-green-400/30"
                      >
                        ✓ Agregar
                      </button>
                    </form>
                  )}
                </div>
                <ul class="max-h-96 overflow-y-auto px-2 m-0">
                  {filtered.map(({ item, idx }) => {
                    const key = `${categoria}-${idx}`;
                    return (
                      <li class={textClasses().item}>
                        <input
                          type="checkbox"
                          id={key}
                          class="accent-pink-500 mt-1"
                          checked={checkboxState()[key] ?? false}
                          onChange={(e) =>
                            updateCheckbox(key, e.currentTarget.checked)
                          }
                        />
                        <label for={key} class="cursor-pointer flex-1">
                          {item}
                        </label>
                        <button
                          class="ml-1 p-1.5 rounded-full transition-all duration-200 opacity-70 hover:opacity-100 focus:opacity-100 outline-none bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/40 hover:to-orange-400/40 border border-yellow-400/30 hover:border-yellow-400/60 w-8 h-8 flex items-center justify-center mb-2"
                          title="Editar"
                          aria-label="Editar ítem"
                          onClick={() => {
                            setEditing({ cat: categoria, idx });
                            setEditValue(item);
                            setModalOpen(true);
                          }}
                        >
                          <EditIcon isLight={isLightTheme()} />
                        </button>
                        <button
                          class="ml-1 p-1.5 rounded-full transition-all duration-200 opacity-70 hover:opacity-100 focus:opacity-100 outline-none bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 border border-red-400/30 hover:border-red-400/60 w-8 h-8 flex items-center justify-center mb-2"
                          title="Eliminar"
                          aria-label="Eliminar ítem"
                          onClick={() => deleteItem(categoria, idx)}
                        >
                          <DeleteIcon />
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
      <EditItemModal
        open={modalOpen()}
        value={editValue()}
        onChange={setEditValue}
        onSave={saveEdit}
        onCancel={cancelEdit}
      />
    </div>
  );
};

export default ChecklistSolid;
