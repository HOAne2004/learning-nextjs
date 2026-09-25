import Link from "next/link";

export default function Home() {
  return (
    <div> 
      <h1 className="text-6xl font-bold">
        Home Page
      </h1>
      <a href="admin">Chuyển tới trang Admin (thẻ a)</a>
      <br></br>
      <Link href={"/admin"}>Chuyển tới trang Admin (thẻ Link)</Link>
    </div>
  );
}
