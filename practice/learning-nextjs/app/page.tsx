import Link from "next/link";
import style1 from '@/styles/app.module.css'
import style2 from '@/styles/style2.module.css'

export default function Home() {
  return (
    <div> 
      <h1 className="text-6xl font-bold">
        Home Page
      </h1>
      <div className={style1['green']}>
        <span className={style2['green']}>Nội dung trong Homepage</span>
      </div>
      <a href="admin">Chuyển tới trang Admin (thẻ a)</a>
      <br></br>
      <Link href={"/admin"} className="green">Chuyển tới trang Admin (thẻ Link)</Link>
    </div>
  );
}
