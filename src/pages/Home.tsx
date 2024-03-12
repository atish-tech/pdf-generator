import { Button } from "@/components/ui/button";
import { AddProductModel } from "@/model/add-product-model";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { getProductRoute } from "@/lib/apiRoutes";
import { DisplayProduct } from "@/component/DisplayProduct";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export const Home = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();
  const [loading , setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if(!token) return navigateTo("/login");
      const response = await axios.get(getProductRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isOpenDialog]);

  return (
    <div className="h-screen w-screen py-3 flex items-center  flex-col overflow-auto bg-zinc-900 text-zinc-100 gap-5">
      <AddProductModel
        type="addProduct"
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
      <p>All Product</p>
      {products?.length === 0 && <p>No product available</p>}

      {
        loading ? <Loader className="animate-spin" /> : <DisplayProduct products={products} />
      }

      <div className="flex gap-5">
        <Button variant={"secondary"} onClick={() => setIsOpenDialog(true)}>
          Add Product
        </Button>
        <Button
          variant="default"
          className="bg-green-400"
          onClick={() => navigateTo("/invoice")}
        >
          Generate PDF
        </Button>
      </div>
    </div>
  );
};
