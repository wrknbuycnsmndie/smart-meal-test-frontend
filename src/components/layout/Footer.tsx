export default function Footer() {
  return (
    <footer className="footer p-4 md:p-6 bg-base-200 text-base-content border-t border-base-300">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 mb-2 md:mb-4 w-full justify-center">
          <span className="text-xs md:text-sm opacity-80 whitespace-nowrap">
            Разработано:
          </span>
          <a
            href="https://t.me/wrknbuycnsmndie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg font-bold text-primary hover:text-primary-focus transition-colors text-center break-words px-1"
          >
            @wrknbuycnsmndie
          </a>
        </div>

        <p className="text-xs md:text-sm text-center opacity-70 max-w-md w-full mb-2 md:mb-4 px-2">
          Этот проект сделан в рамках тестового задания и скорее всего в стол :)
        </p>

        <div className="text-[0.7rem] md:text-xs text-center opacity-50 w-full">
          © {new Date().getFullYear()} Все права защищены
        </div>
      </div>
    </footer>
  );
}
