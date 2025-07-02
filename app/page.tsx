import Kanban from "./components/kanban/Kanban";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col py-6 px-12">
      <div className="flex-none">
        <h1>Kanban Board</h1>
        <p>Blah blah blah, again blah blah blah...</p>
      </div>

      <div className="flex-1 flex items-stretch mt-4 bg-zinc-300 rounded-lg">
        <Kanban />
      </div>
    </section>
  );
}
