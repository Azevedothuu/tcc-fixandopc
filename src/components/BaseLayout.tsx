interface BaseLayoutProps {
  children: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-white">
      <header className="bg-blue-900 p-4 text-center text-lg font-semibold shadow-md">
        <h1>Fixando</h1>
      </header>

      <main className="flex-1 p-6">
        {children} {/* conteúdo*/}
      </main>

      <footer className="bg-blue-900 p-4 text-center text-sm shadow-inner">
        <p>© {new Date().getFullYear()} Fixando. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default BaseLayout;
