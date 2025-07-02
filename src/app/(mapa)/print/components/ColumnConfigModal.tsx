import React from "react";
import { useColumnConfigStore, allColumns } from "@/features/mapa/store/columnConfigStore";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";

function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-2xl p-0 min-w-[340px] max-w-full w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" aria-label="Fechar">×</button>
        {children}
      </div>
    </div>
  );
}

function DragIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="7" r="1.5"/>
      <circle cx="6" cy="12" r="1.5"/>
      <circle cx="6" cy="17" r="1.5"/>
      <circle cx="12" cy="7" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="12" cy="17" r="1.5"/>
    </svg>
  );
}

function SortableItem({ col, index }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: col.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : 1,
    background: isDragging ? '#e0e7ff' : isOver ? '#f1f5f9' : undefined,
    boxShadow: isDragging ? '0 4px 16px 0 rgba(59,130,246,0.15)' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 px-4 py-3 bg-white border-b last:border-b-0 rounded transition-colors duration-150 cursor-grab select-none group ${isDragging ? 'ring-2 ring-blue-400' : ''}`}
      tabIndex={0}
      aria-label={`Mover coluna ${col.label}`}
    >
      <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-150"><DragIcon /></span>
      <span className="font-medium text-gray-800">{col.label}</span>
      <span className="ml-auto text-xs text-gray-400">{index + 1}</span>
    </div>
  );
}

export default function ColumnConfigModal() {
  const { selectedColumns, columnOrder, setSelectedColumns, setColumnOrder, resetColumns, setColumnVisibility } = useColumnConfigStore();
  const { units, fullPallets, showDateRange } = usePrintConfigStore();
  const [showModal, setShowModal] = React.useState(false);
  const [tempColumns, setTempColumns] = React.useState(selectedColumns);

  React.useEffect(() => {
    if (showModal) {
      // Show only visible columns in the modal, respecting the saved order
      const visibleColumns = columnOrder.filter(key => 
        allColumns.find(col => col.key === key)?.visible
      );
      setTempColumns(visibleColumns);
    } else {
      setTempColumns(selectedColumns);
    }
  }, [selectedColumns, columnOrder, showModal]);

  // Update column visibility based on print configuration
  React.useEffect(() => {
    if (units === "separate") {
      setColumnVisibility("quantityUnits", false);
    } else {
      setColumnVisibility("quantityUnits", true);
    }
    
    if (fullPallets === "separate") {
      setColumnVisibility("quantityPallets", false);
    } else {
      setColumnVisibility("quantityPallets", true);
    }

    // Control date columns visibility based on showDateRange
    if (showDateRange) {
      setColumnVisibility("dataMinima", true);
      setColumnVisibility("dataMaxima", true);
      setColumnVisibility("manufacturingDate", false);
    } else {
      setColumnVisibility("dataMinima", false);
      setColumnVisibility("dataMaxima", false);
      setColumnVisibility("manufacturingDate", true);
    }
  }, [units, fullPallets, showDateRange, setColumnVisibility]);

  const handleReset = () => {
    const defaultVisibleColumns = allColumns.filter(col => col.visible).map(col => col.key);
    setTempColumns(defaultVisibleColumns);
  };
  
  const handleSave = () => {
    setSelectedColumns(tempColumns);
    setColumnOrder(tempColumns); // Salva a nova ordem das colunas
    setShowModal(false);
  };

  // dnd-kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tempColumns.indexOf(active.id);
      const newIndex = tempColumns.indexOf(over.id);
      setTempColumns(arrayMove(tempColumns, oldIndex, newIndex));
    }
  };

  return (
    <>
      <button
        className="mb-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold transition-colors"
        onClick={() => setShowModal(true)}
      >
        Configurar colunas
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="sticky top-0 z-10 bg-white rounded-t-xl border-b px-6 pt-5 pb-3 mb-2">
          <h2 className="text-xl font-bold text-gray-800">Ordenar colunas</h2>
          <p className="text-sm text-gray-500 mt-1">Arraste para reordenar as colunas da tabela</p>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tempColumns} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col bg-gray-50 rounded-b-xl overflow-hidden">
              {tempColumns.map((key, idx) => {
                const col = allColumns.find(c => c.key === key)!;
                return (
                  <SortableItem
                    key={col.key}
                    col={col}
                    index={idx}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
        <div className="flex gap-2 justify-end px-6 py-4 border-t bg-white rounded-b-xl">
          <button className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 font-medium" onClick={handleReset}>Restaurar padrão</button>
          <button className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold" onClick={handleSave}>Salvar</button>
        </div>
      </Modal>
    </>
  );
} 