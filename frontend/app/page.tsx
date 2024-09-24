export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic'

import { VisitsTable } from "@/components/VisitTable"
import { getAllVisits } from "@/lib/fetchers"

export default async function Home() {
  const visits = await getAllVisits()
  console.log(visits)
  return (
    <div>
      <div className="p-4">
        <VisitsTable visits={visits} />

      </div>
    </div>
  );
}
