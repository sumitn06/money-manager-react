import { Plus } from "lucide-react";

const IncomeOverview = ({ onAddIncome }) => {
  return (
    <div className="card mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          className="add-btn flex justify-center items-center gap-1"
          onClick={onAddIncome}
        >
          <Plus size={15} className="text-lg" />
          Add Income
        </button>
      </div>
    </div>
  );
};

export default IncomeOverview;
