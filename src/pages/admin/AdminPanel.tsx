import { Shield, Users, Database, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPanel = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">System management and user overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Users, label: "User Management", desc: "Manage user accounts and roles" },
          { icon: Database, label: "System Logs", desc: "View system activities and errors" },
          { icon: Settings, label: "Platform Settings", desc: "Configure global app settings" },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <item.icon className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">{item.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
            <Button variant="outline" className="w-full">Open</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
