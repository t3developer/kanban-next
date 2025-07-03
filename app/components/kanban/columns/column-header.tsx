'use client';

import { useKanbanStore } from "@/lib/store/kanban-store";
import classnames from "classnames";
import { KanbanColumnProps } from "./column";
import { useState } from "react";
import { BASIC_COLUMNS } from "@/lib/data/columns";
import { FaRegCircleCheck } from "react-icons/fa6";
import KanbanColumnRemove from "./column-remove";
import KanbanColumnAdd from "./column-add";

const KanbanColumnHeader = (props: KanbanColumnProps) => {
  const { columnId, label, type, columnIndex } = props;
  const [ newColName, setNewColName ] = useState<string>(label);
  const renameColumn = useKanbanStore(state => state.renameColumn);
  const deleteColumn = useKanbanStore(state => state.deleteColumn);
  const addColumn = useKanbanStore(state => state.addColumn);

  const canRename = newColName !== '' && label !== newColName;
  const onColumnRename = (e: React.MouseEvent) => {
    e.preventDefault();
    renameColumn(columnId, newColName);
  };

  return (
    <div
      className={classnames(
        "flex items-center justify-between gap-6",
        "p-3 rounded-md bg-white border-1 border-gray-200 shadow-md shadow-gray-300/50 border-t-3",
        { "border-t-lime-500": type === BASIC_COLUMNS.COMPLETED },
        { "border-t-cyan-500": type !== BASIC_COLUMNS.COMPLETED },
        
      )}
    >
      <input
        type="text"
        name="column-label"
        className="uppercase w-full focus:outline-0"
        defaultValue={label}
        onChange={e => setNewColName(e.currentTarget.value)}
      />
      
      <div className="flex items-center gap-3">
        { 
          canRename && 
          <div className="text-lime-500 cursor-pointer text-lg" onClick={onColumnRename}>
            <FaRegCircleCheck />
          </div>
        }
        
        <KanbanColumnRemove
          type={type}
          columnId={columnId}
          deleteColumn={deleteColumn}
        />

        <KanbanColumnAdd
          type={type}
          columnIndex={columnIndex}
          addColumn={addColumn}
        />
      </div>
    </div>
  )
}

export default KanbanColumnHeader