// import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface productType {
  id: number;
  productName: string;
  productQty: number;
  productRate: number;
}

export function DisplayProduct({ products }: { products: productType[] }) {
  let total = 0;
  return (
    <Table className="border max-w-[900px] w-full h-fit ml-auto mr-auto">
      <TableHeader>
        <TableRow>
          {/* <TableHead className="w-[100px]">id</TableHead> */}
          <TableHead>Name</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead className="text-right">Total</TableHead>
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
              <TableCell>{product.productQty}</TableCell>
              <TableCell>{product.productRate}</TableCell>
              <TableCell className="text-right">
                {product.productQty * product.productRate}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
