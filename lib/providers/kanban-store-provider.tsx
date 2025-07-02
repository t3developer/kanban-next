// 'use client'

// import { type ReactNode, createContext, useRef, useContext } from 'react';
// import { useStore } from 'zustand';

// import { type KanbanStore, createKanbanStore } from '@/lib/store/kanban-store';

// export type KanbanStoreApi = ReturnType<typeof createKanbanStore>;

// export const KanbanStoreContext = createContext<KanbanStoreApi | undefined>(undefined);

// export interface KanbanStoreProviderProps {
//   children: ReactNode
// };

// export const KanbanStoreProvider = ({
//   children,
// }: KanbanStoreProviderProps) => {
//   const storeRef = useRef<KanbanStoreApi | null>(null)
//   if (storeRef.current === null) {
//     storeRef.current = createKanbanStore()
//   }

//   return (
//     <KanbanStoreContext.Provider value={storeRef.current}>
//       {children}
//     </KanbanStoreContext.Provider>
//   );
// };

// export const useKanbanStore = <T,>(
//   selector: (store: KanbanStore) => T,
// ): T => {
//   const kanbanStoreContext = useContext(KanbanStoreContext)

//   if (!kanbanStoreContext) {
//     throw new Error(`useCounterStore must be used within CounterStoreProvider`)
//   }

//   return useStore(kanbanStoreContext, selector)
// };