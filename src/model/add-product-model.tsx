import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { addProductRoute } from "@/lib/apiRoutes";
import { Loader } from "lucide-react";

interface AddProductModelProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
  type: "addProduct";
}

const addProductInputSchema = z.object({
  productName: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" }),
  productQty: z
    .string()
    .min(1, { message: "Product quantity must be at least 0" }),
  productRate: z
    .string()
    .min(1, { message: "Product rate must be at least 1" }),
});

export function AddProductModel({
  isOpenDialog,
  setIsOpenDialog,
  type,
}: AddProductModelProps) {
  const [data, setData] = useState({
    productName: "",
    productQty: 0,
    productRate: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onInputchange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const closeHandler = () => {
    setIsOpenDialog(false);
  };

  const addProductHandler = async() => {
    const result = addProductInputSchema.safeParse(data);
    if (!result.success) {
      return toast(result.error.errors[0].message);
    }
    try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.post(addProductRoute, data, {
          headers: {    
            Authorization: `Bearer ${token}`,
          },
        });
        toast(response.data.message);
        setIsOpenDialog(false);
        data.productName = "";
        data.productQty = 0;
        data.productRate = 0;
    } catch (error : any) {
        console.log(error);
        toast(error.response.data.message);
    }finally{
        setIsLoading(false);
    }
    
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={closeHandler}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-200">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add product. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col  items-start gap-1">
            <Label htmlFor="Product Name" className="text-right">
              Product Name
            </Label>
            <Input
              name="productName"
              className="col-span-3"
              type="text"
              value={data.productName}
              onChange={onInputchange}
            />
          </div>
          <div className="flex flex-col  items-start gap-1">
            <Label htmlFor="name" className="text-right">
              Product Qty
            </Label>
            <Input
              name="productQty"
              className="col-span-3"
              type="number"
              value={data.productQty}
              onChange={onInputchange}
            />
          </div>
          <div className="flex flex-col  items-start gap-1">
            <Label htmlFor="username" className="text-right">
              Product Rate
            </Label>
            <Input
              name="productRate"
              className="col-span-3"
              type="number"
              value={data.productRate}
              onChange={onInputchange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={addProductHandler} type="submit">
            {isLoading ? <Loader className="animate-spin" /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
