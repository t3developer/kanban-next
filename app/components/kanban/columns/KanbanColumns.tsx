import KanbanColumn from "./KanbanColumn";

const KanbanColumns = () => {
  return (
    <section className='w-full h-full flex gap-6 lg:gap-12'>
      <KanbanColumn title='Todo' status='TODO' />
      <KanbanColumn title='In Progress' status='IN_PROGRESS' />
      <KanbanColumn title='Done' status='DONE' />
    </section>
  );
};

export default KanbanColumns;