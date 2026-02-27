import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LogOut, Download, Store } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Store className="h-5 w-5" /> Shop Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Shop Name</Label>
            <Input defaultValue="Sharma General Store" />
          </div>
          <div className="grid gap-2">
            <Label>Owner Name</Label>
            <Input defaultValue="Ramesh Sharma" />
          </div>
          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input defaultValue="+91 98765 43210" />
          </div>
          <div className="grid gap-2">
            <Label>Address</Label>
            <Input defaultValue="Ring Road, Surat, Gujarat" />
          </div>
          <Button onClick={() => toast.success("Shop info updated!")}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Language</CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue="en">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
              <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-semibold">Basic Plan</p>
              <p className="text-sm text-muted-foreground">₹199/month</p>
            </div>
            <Badge active>Current</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div>
              <p className="font-semibold">Premium Plan</p>
              <p className="text-sm text-muted-foreground">₹399/month – WhatsApp automation + advanced reports</p>
            </div>
            <Button size="sm">Upgrade</Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => toast.success("Data export started")}>
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
        <Button variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
};

function Badge({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${active ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
      {children}
    </span>
  );
}

export default SettingsPage;
