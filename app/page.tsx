import QRCodeGenerator from "../components/qrCodeGenerator";

export default function Home() {
  return (
   <div className="relative min-h-[100vh] flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500"> 
    <QRCodeGenerator />
   </div>
  );
}
