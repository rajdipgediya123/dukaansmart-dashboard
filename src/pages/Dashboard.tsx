import { IndianRupee, TrendingUp, AlertTriangle, CreditCard, Plus, Package, Users, BarChart3, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { dashboardStats, salesLast7Days, monthlyRevenue, topProducts, lowStockAlerts, expensesData, formatCurrency } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const totalExpenses = expensesData.reduce((s, e) => s + e.amount, 0);
const realProfit = dashboardStats.todayProfit - Math.round(totalExpenses / 30);

const statCards = [
  { title: "Today's Sales", value: formatCurrency(dashboardStats.todaySales), icon: IndianRupee, color: "text-primary" },
  { title: "Real Profit", value: formatCurrency(realProfit), icon: TrendingUp, color: "text-[hsl(var(--success))]", highlight: true },
  { title: "Pending Credit", value: formatCurrency(dashboardStats.pendingCredit), icon: CreditCard, color: "text-[hsl(var(--warning))]" },
  { title: "Low Stock Items", value: String(dashboardStats.lowStockItems), icon: AlertTriangle, color: "text-destructive" },
];

const quickActions = [
  { label: "⚡ Fast Sale", icon: Zap, path: "/fast-sale", variant: "default" as const },
  { label: "Add Sale", icon: Plus, path: "/sales", variant: "outline" as const },
  { label: "Products", icon: Package, path: "/products", variant: "outline" as const },
  { label: "Reports", icon: BarChart3, path: "/reports", variant: "outline" as const },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className={stat.highlight ? "border-2 border-[hsl(var(--success))]" : ""}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`rounded-lg bg-accent p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <Card className="border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Low Stock Alerts
              <Badge variant="destructive">{lowStockAlerts.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {lowStockAlerts.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Stock: <span className="text-destructive font-bold">{item.stock}</span> • Reorder: {item.suggestedReorder}
                    </p>
                  </div>
                  <Badge variant="destructive" className="shrink-0">{item.stock} left</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sales – Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={salesLast7Days}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(value: number) => [formatCurrency(value), "Sales"]} />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue & Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="revenue" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Area type="monotone" dataKey="profit" fill="hsl(var(--success) / 0.15)" stroke="hsl(var(--success))" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Top Products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Button key={action.label} variant={action.variant} className="h-auto flex-col gap-2 py-4" onClick={() => navigate(action.path)}>
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="text-right">{product.sold}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
