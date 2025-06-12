import { NavLink } from "react-router";

export default function Hero() {
  return (
    <div className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Smart Meal Service Test Task</h1>
          <p className="py-6 prose">
            Тестовое задание для компании Smart Meal Service: CRUD с товарами в
            таблице, с возможностью добавления, редактирования и удаления
            товаров.
          </p>
          <NavLink to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" end>
            <button className="btn btn-primary px-8">
              Здесь ничего нет. Реально.
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
