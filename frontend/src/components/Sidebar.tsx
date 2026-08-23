import {
    LayoutDashboard,
    Users,
    Bot,
  } from "lucide-react";
  
  import { NavLink } from "react-router-dom";
  
  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: Users,
    },
  ];
  
  export default function Sidebar() {
    return (
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950">
  
        <div className="flex h-full flex-col">
  
          {/* Logo */}
  
          <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
  
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-950">
              <Bot size={20} />
            </div>
  
            <div>
              <h1 className="font-semibold text-white">
                Sales Assistant
              </h1>
  
              <p className="text-xs text-slate-500">
                AI Sales CRM
              </p>
            </div>
  
          </div>
  
          {/* Navigation */}
  
          <nav className="flex-1 space-y-1 p-4">
  
            <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-slate-600">
              Workspace
            </p>
  
            {navigation.map((item) => {
  
              const Icon = item.icon;
  
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
                    ].join(" ")
                  }
                >
                  <Icon size={18} />
  
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
  
          </nav>
  
          {/* Bottom */}
  
          <div className="border-t border-slate-800 p-4">
  
            <div className="rounded-lg bg-slate-900 p-3">
  
              <p className="text-xs text-slate-500">
                System status
              </p>
  
              <div className="mt-2 flex items-center gap-2">
  
                <span className="h-2 w-2 rounded-full bg-green-400" />
  
                <span className="text-sm text-slate-300">
                  Backend connected
                </span>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </aside>
    );
  }