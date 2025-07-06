import Kanban from "./components/kanban/Kanban";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col py-6 px-12 bg-zinc-100">
      <Kanban />
    </section>
  );
}
