import KanbanColumns from "./columns/kanban-columns";

const Kanban = () => {
  return (
    <div className="w-full flex justify-center items-center py-6 px-6">
      <KanbanColumns />
    </div>
  );
};

export default Kanban;