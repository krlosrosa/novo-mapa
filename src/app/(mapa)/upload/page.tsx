'use client'
import UploadProduct from "./components/uploadProduct";
import UploadRouting from "./components/uploadRouting";
import UploadShipment from "./components/uploadShipment";
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();

  function handleAdd() {
    router.push('/validacao');
  }

  return <div>
    <UploadShipment />
    <UploadProduct />
    <UploadRouting />
    <button onClick={handleAdd}>Adicionar</button>
  </div>;
}