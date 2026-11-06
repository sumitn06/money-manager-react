import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong please try again.", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    //check if the category is already exists
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() == name.trim().toLowerCase();
    });

    if (isDuplicate) {
      toast.error("Category Name already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name: name.trim(),
        type,
        icon,
      });

      if (response.status === 201) {
        toast.success("Category addedd successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (err) {
      console.log("Error adding category:", err);
      toast.error(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;

    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    if (!id) {
      toast.error("Category ID is missing for update");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      });

      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category Updated Successfully");
      fetchCategoryDetails();
    } catch (error) {
      console.error(
        "Error Updating Category: ",
        error.response?.data?.message || error.message,
      );

      toast.error(
        error.response?.data?.message || "Failed to update category.",
      );
    }
  };

  return (
    <div>
      <Dashboard activeMenu="Category">
        <div className="my-5 mx-auto">
          {/* Add button to add category */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Categories</h2>
            <button
              className="add-btn flex items-center gap-1"
              onClick={() => setOpenAddCategoryModal(true)}
            >
              <Plus size={15} />
              Add Category
            </button>
          </div>

          {/* Category list  */}
          <CategoryList
            categories={categoryData}
            onEditCategory={handleEditCategory}
          />

          {/* Adding category modal */}
          <Modal
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
            title="Add Category"
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Modal>

          {/* updating  category modal */}
          <Modal
            isOpen={openEditCategoryModal}
            onClose={() => {
              setOpenEditCategoryModal(false);
              setSelectedCategory(null);
            }}
            title="Update Category"
          >
            <AddCategoryForm
              initialCategoryData={selectedCategory}
              onAddCategory={handleUpdateCategory}
              isEditing={true}
            />
          </Modal>
        </div>
      </Dashboard>
    </div>
  );
};

export default Category;
