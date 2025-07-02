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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical, RotateCcw, Save, Settings2 } from "lucide-react";

function DragIcon() {
  return (
    <GripVertical className="w-4 h-4 text-muted-foreground" />
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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md hover:bg-accent/50 transition-all duration-200 cursor-grab select-none group ${
        isDragging ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : ''
      } ${isOver ? 'bg-accent' : ''}`}
      tabIndex={0}
      aria-label={`Mover coluna ${col.label}`}
    >
      <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-150">
        <DragIcon />
      </div>
      <span className="font-medium text-foreground flex-1 text-sm">{col.label}</span>
      <Badge variant="outline" className="text-xs font-medium px-1.5 py-0.5">
        {index + 1}
      </Badge>
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
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button variant="default" className="mb-4 gap-2">
          <Settings2 className="w-4 h-4" />
          Configurar colunas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            Configurar Colunas
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Arraste os itens para reordenar as colunas da tabela conforme sua preferência
          </DialogDescription>
        </DialogHeader>
        
        <Separator />
        
        <div className="flex gap-6">
          <div className="flex-1">
            <ScrollArea className="h-[400px]">
              <div className="pr-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={tempColumns} strategy={verticalListSortingStrategy}>
                    <div className="grid grid-cols-2 gap-2 py-2">
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
              </div>
            </ScrollArea>
          </div>
          
          <div className="flex flex-col gap-3 w-40">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Restaurar padrão
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Salvar configuração
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 