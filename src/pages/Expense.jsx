import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Expense = () => {
  useUser();

  return (
    <div>
      <Dashboard activeMenu="Expense">This is expense page</Dashboard>
    </div>
  );
};

export default Expense;
