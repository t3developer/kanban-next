import Kanban from "./components/kanban/Kanban";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col py-6 px-12 bg-zinc-100">
      <div className="flex-none">
        <h1>Board</h1>
      </div>

      <div className="flex-1 flex items-stretch">
        <Kanban />
      </div>
    </section>
  );
}
