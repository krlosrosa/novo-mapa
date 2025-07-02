'use client'
import { convertFileToShipment } from "@/features/mapa/convert/convertFileToShipment";
import { useShipmentStore } from "@/features/mapa/store/shipmentStore";

export default function UploadShipment() {
  const { dataShipment, setDataShipment } = useShipmentStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await convertFileToShipment(file);
      setDataShipment(data);
    }
  };

  return <div>
    <h1>Upload Shipment</h1>
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleFileChange}
      className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
    />
  </div>;
}