import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div>
      <h1>Auth</h1>

      <Outlet />
    </div>
  );
}
