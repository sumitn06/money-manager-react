import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);

    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);

    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>

        <div className="flex items-end gap-1">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            onClick={handleEmail}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={15} className="text-base" />
                Email
              </>
            )}
          </button>

          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium hover:text-purple-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-base" />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display the incomes */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
