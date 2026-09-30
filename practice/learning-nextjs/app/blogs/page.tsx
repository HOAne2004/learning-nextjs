import DataTable from "@/components/table"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'This is BlogsPage'
}

export default function BlogPage () {
return(
    <div>
        <DataTable/>
    </div>
)
}