import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill flex justify-center items-center gap-2"
          onClick={handleDelete}
          type="button"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>Delete</>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
