'use client';
import React from "react";
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanTask from "../tasks/task";
import KanbanColumnHeader from "./column-header";
import { Column } from "@/lib/stores/kanban/types";
import { useDroppable } from "@dnd-kit/core";

export interface KanbanColumnProps {
  column: Column,
  columnIndex: number
};

const KanbanColumn = (props: KanbanColumnProps) => {
  const { column: { id: columnId, tasks }  } = props;

  const { isOver, setNodeRef } = useDroppable({ id: columnId });

  const { setNodeRef: setBottomDropRef } = useDroppable({
    id: `bottom-drop-${columnId}`,
  });

  return (
    <section className='flex-1 flex flex-col'>
      <KanbanColumnHeader {...props} />

        <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-5'>
          {tasks && tasks.length > 0 ? (
            tasks.map(task => (
              <KanbanTask key={task.id} task={task} columnId={columnId} />
            ))
          ) : (
            // Empty column drop area
            <div
              ref={setNodeRef}
              className={`flex-1 rounded bg-zinc-100 flex items-center justify-center text-xs text-gray-400 border-2 border-dashed ${isOver ? "border-cyan-400 bg-cyan-50" : "border-gray-200"}`}
              style={{ minHeight: 60 }}
            >
              Drop task here
            </div>
          )}
          {/* bottom drop zone */}
          <div
            ref={setBottomDropRef}
            style={{ minHeight: 24 }}
            className={`transition-all rounded`}
          />
        </div>
    </section>
  );
};

export default KanbanColumn;