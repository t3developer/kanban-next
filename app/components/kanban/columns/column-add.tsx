import { BASIC_COLUMNS } from "@/lib/data/columns";
import { Popover } from "radix-ui";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface KanbanColumnAddProps {
  type: string,
  columnIndex: number,
  addColumn: (label: string, order: number) => void
}

const KanbanColumnAdd = ({ type, columnIndex, addColumn }: KanbanColumnAddProps) => {
  const [ popoverOpen, setPopoverOpen ] = useState<boolean>(false);
  const [ newColName, setNewColName ] = useState<string | null>(null);

  const handleAddColumn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newColName) return false;
    addColumn(newColName, columnIndex);
    setPopoverOpen(false);
  };

  return (
    <>
      {
        type !== BASIC_COLUMNS.COMPLETED && (
        <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
          <Popover.Trigger asChild>
            <div className="text-gray-300 cursor-pointer hover:text-cyan-500">
              <FaPlus />
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="kanban-card w-3xs mt-3">
              <div className="">
                <div className="uppercase mb-3">New Column</div>
                <div className="text-gray-400 mb-1">Label</div>
                <div className="mb-5">
                  <input type="text" name="new-col-label" className="kanban-input" onChange={e => setNewColName(e.currentTarget.value)} />
                </div>
                <div className="flex justify-end">
                  <button
                    className="kanban-button"
                    onClick={handleAddColumn}
                    disabled={!newColName}>
                      Create
                  </button>
                </div>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </>
  )
}

export default KanbanColumnAdd;