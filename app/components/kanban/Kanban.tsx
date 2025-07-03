import KanbanColumns from "./columns/columns";

const Kanban = () => {
  return (
    <div className="w-full flex justify-center items-center py-6">
      <KanbanColumns />
    </div>
  );
};

export default Kanban;