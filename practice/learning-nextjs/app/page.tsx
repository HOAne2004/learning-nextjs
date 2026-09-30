import Table from "@/components/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is HomePage'
}
export default function Home() {
  return (
    <div className="p-2 m-6 flex flex-col gap-4"> 
      <h1 className="text-6xl font-bold text-center">
        Home Page
      </h1>
      <Table/>
    </div>
  );
}
