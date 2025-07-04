'use client';
import { defaultColumns } from "@/lib/data/columns";
import { useKanbanStore } from "@/lib/stores/kanban/store";
import { useEffect, useState } from "react";

export default function KanbanInitializer() {
  const columns = useKanbanStore((s) => s.columns);
  const setColumns = useKanbanStore.setState;
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true); // ensures we're on client
  }, []);

  useEffect(() => {
    if (hasHydrated && columns.length === 0) {
      setColumns((state) => {
        state.columns = defaultColumns;
      });
    }
  }, [hasHydrated, columns]);

  return null;
}