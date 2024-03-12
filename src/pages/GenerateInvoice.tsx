import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductRoute } from "@/lib/apiRoutes";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import imgHeader from "@/assets/pdf-header.png";
import { Loader } from "lucide-react";
interface productType {
  id: number;
  productName: string;
  productQty: number;
  productRate: number;
}
// Create Document Component
export const GenerateInvoice = () => {
  let total = 0;
  const [products, setProducts] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigateTo("/login");
      const response = await axios.get(getProductRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      //   toPDF();
    } catch (error: any) {
      console.log(error);

      toast(error.response.data.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <Table
          ref={targetRef}
          className="border max-w-[900px] w-full h-fit ml-auto mr-auto"
        >
          <TableHeader>
            <img
              src={imgHeader}
              alt="header"
              className=" flex items-center justify-center w-fit ml-16 h-fit"
            />
            <TableRow>
              {/* <TableHead className="w-[100px]">id</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead className="text-left">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: productType) => {
              total += product.productQty * product.productRate;

              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.productName}
                  </TableCell>
                  <TableCell className="font-medium text-indigo-500">
                    {product.productQty}
                  </TableCell>
                  <TableCell>{product.productRate}</TableCell>
                  <TableCell className="text-left">
                    INR {product.productQty * product.productRate}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className="w-full ml-auto">
            <div className="flex w-full justify-end items-end ml-auto mt-10">
              {/* <div className="w-fit h-fit "> */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="text-bold">Total</TableCell>
                    <TableCell className="text-right">INR {total}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>GST</TableHead>
                    <TableHead className="text-right">18%</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-bold">Grand Total</TableCell>
                    <TableCell className="text-right text-indigo-500">
                      INR {total + (total * 18) / 100}
                    </TableCell>
                  </TableRow>
                </TableHeader>
              </Table>
              {/* </div> */}
            </div>
          </TableFooter>
        </Table>
      )}

      <div className="flex m-5 gap-4">
        <Button variant="secondary" onClick={() => navigateTo("/")}>
          Back
        </Button>
        <Button onClick={() => toPDF()}>Download</Button>
      </div>
    </div>
  );
};
