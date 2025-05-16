"use client";

import NoteForm from "@/components/NoteForm";
import PageModule from "@/assets/styles/page.module.scss";
import { NoteList } from "@/components/NoteList";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";
import { ETheme } from "@/types/theme";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () =>
    setTheme(theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT);

  return (
    <div className={clsx(PageModule.page, theme)}>
      <header className={PageModule.pageHeader}>
        <h1 className={PageModule.pageTitle}>📝 React Notes App</h1>
        <button className={PageModule.pageThemeButton} onClick={() => handleSetTheme()}>
          {theme === ETheme.LIGHT ? "☀️" : "🌙"}
        </button>
      </header>
      <main className={PageModule.pageMain}>
        <NoteForm />
        <NoteList />
      </main>
      <footer className={PageModule.pageFooter}>Hubert Duda Developer</footer>
    </div>
  );
}
