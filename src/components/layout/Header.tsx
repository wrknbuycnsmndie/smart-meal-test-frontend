import { useEffect } from "react";
import { themeChange } from "theme-change";
import { NavLink } from "react-router";

export default function Header() {
  useEffect(() => {
    themeChange(false);
  }, []);

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  return (
    <header className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <div className="flex gap-4 items-center">
          <NavLink to="/" end>
            <p className="text-xl font-bold">Smart Meal Service</p>
          </NavLink>
        </div>
      </div>

      <div className="flex-none gap-2 items-center px-2">
        <label className="hidden sm:block text-sm font-medium">Тема:</label>
        <select
          data-choose-theme
          className="select select-sm select-bordered max-w-xs"
          defaultValue="coffee"
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
