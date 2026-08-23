import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { getLeads } from "../services/api";
import type {
  Lead,
  LeadIntent,
} from "../types/lead";

import LeadTable from "../components/LeadTable";
import Loading from "../components/Loading";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [intentFilter, setIntentFilter] =
    useState<LeadIntent | "ALL">("ALL");

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {

      const matchesSearch =
        search.trim() === "" ||
        lead.business
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        lead.budget
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesIntent =
        intentFilter === "ALL" ||
        lead.intent === intentFilter;

      return matchesSearch && matchesIntent;
    });
  }, [leads, search, intentFilter]);

  if (loading) {
    return <Loading text="Loading leads..." />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-semibold">
          Leads
        </h1>

        <p className="mt-2 text-slate-400">
          Manage and review all captured leads.
        </p>
      </div>

      {/* Filters */}

      <div className="flex flex-col gap-3 md:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full py-2.5 pl-10 pr-4"
          />

        </div>

        {/* Intent */}

        <select
          value={intentFilter}
          onChange={(event) =>
            setIntentFilter(
              event.target.value as
                | LeadIntent
                | "ALL"
            )
          }
          className="px-4 py-2.5"
        >
          <option value="ALL">
            All intents
          </option>

          <option value="HOT">
            Hot
          </option>

          <option value="WARM">
            Warm
          </option>

          <option value="COLD">
            Cold
          </option>

          <option value="UNKNOWN">
            Unknown
          </option>
        </select>

      </div>

      {/* Result count */}

      <div className="text-sm text-slate-500">
        Showing {filteredLeads.length} of{" "}
        {leads.length} leads
      </div>

      {/* Table */}

      <LeadTable
        leads={filteredLeads}
      />

    </div>
  );
}