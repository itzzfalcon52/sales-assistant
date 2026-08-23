import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

import { getLeads } from "../services/api";
import type { Lead } from "../types/lead";

import StatCard from "../components/StatCard";
import LeadTable from "../components/LeadTable";
import Loading from "../components/Loading";

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  const stats = useMemo(() => {
    return {
      total: leads.length,

      hot: leads.filter(
        (lead) => lead.intent === "HOT"
      ).length,

      warm: leads.filter(
        (lead) => lead.intent === "WARM"
      ).length,

      cold: leads.filter(
        (lead) => lead.intent === "COLD"
      ).length,
    };
  }, [leads]);

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="card p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Overview of your AI-generated sales leads.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Leads"
          value={stats.total}
          description="All captured leads"
          icon={Users}
        />

        <StatCard
          title="Hot Leads"
          value={stats.hot}
          description="High buying intent"
          icon={Flame}
        />

        <StatCard
          title="Warm Leads"
          value={stats.warm}
          description="Need further discussion"
          icon={TrendingUp}
        />

        <StatCard
          title="Cold Leads"
          value={stats.cold}
          description="Potential future leads"
          icon={Clock}
        />

      </div>

      {/* Recent Leads */}

      <section>

        <div className="mb-4">

          <h2 className="text-lg font-semibold">
            Recent Leads
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest leads captured by the sales assistant.
          </p>

        </div>

        <LeadTable
          leads={leads.slice(0, 10)}
        />

      </section>

    </div>
  );
}