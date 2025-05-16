import NoteForm from "@/components/NoteForm";
import PageModule from "@/assets/styles/page.module.scss";
import { NoteList } from "@/components/NoteList";

export default function Home() {
  
  
  return (
    <div className={PageModule.page}>
      <h1 className={PageModule.pageTitle}>📝 React Notes App</h1>
      <main className={PageModule.pageMain}>
        <NoteForm />
        <NoteList />
      </main>
      <footer className={PageModule.pageFooter}>Hubert Duda Developer</footer>
    </div>
  );
}
