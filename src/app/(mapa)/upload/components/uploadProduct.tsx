'use client'
import { convertFileToProduct } from "@/features/mapa/convert/convertFileToProduct";
import { useWarehouseProductStore } from "@/features/mapa/store/warehouseProductStore";


export default function UploadProduct() {
  const { setDataWarehouseProduct, dataWarehouseProduct} = useWarehouseProductStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await convertFileToProduct(file);
      setDataWarehouseProduct(data);
    }
  };

  return <div>
    <h1>Upload Product</h1>
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileChange}
      className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
    />
  </div>;
}