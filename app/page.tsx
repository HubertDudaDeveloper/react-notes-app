import NoteForm from "@/components/NoteForm";
import styles from "@/app/page.module.scss";
import { NoteList } from "@/components/NoteList";

export default function Home() {
  
  
  return (
    <div className={styles.page}>
      <h1 style={{ textAlign: "center" }}>📝 React Notes App</h1>
      <main className={styles.main}>
        <NoteForm />
        <NoteList />
      </main>
      <footer className={styles.footer}>Hubert Duda Developer</footer>
    </div>
  );
}
