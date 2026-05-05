import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function PurchaseHistory({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return <p className="text-white">No purchase history found.</p>;
  }
  console.log(data)
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle className="text-white">Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/20">
              <TableHead className="text-white">Plan</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data?.map((purchase: any) => (
              <TableRow key={purchase.id} className="border-b border-white/10">
                <TableCell className="text-white">{purchase.planType}</TableCell>
                <TableCell className="text-white">{purchase.createdAt.slice(0, 10)}</TableCell>
                <TableCell className="text-white ">{purchase.amount}$</TableCell>
                <TableCell className="text-white">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      purchase.planStatus === "Active"
                        ? "bg-green-500/20 text-green-300"
                        : purchase.planStatus === "Expired"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {purchase.planStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

