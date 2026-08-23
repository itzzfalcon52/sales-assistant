import { Link } from "react-router-dom";

import type { Lead } from "../types/lead";

import IntentBadge from "./IntentBadge";
import ActionBadge from "./ActionBadge";

interface LeadTableProps {
  leads: Lead[];
}

export default function LeadTable({
  leads,
}: LeadTableProps) {

  return (
    <div className="card overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800 bg-slate-900/60">

              <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                Business
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                Intent
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                Budget
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                Timeline
              </th>

              <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => {

              const latestAction = lead.actions?.[0];

              return (
                <tr
                  key={lead.id}
                  className="border-b border-slate-800 last:border-0 hover:bg-slate-900/60"
                >

                  <td className="px-5 py-4">

                    <Link
                      to={`/leads/${lead.id}`}
                      className="font-medium text-slate-100 hover:text-white hover:underline"
                    >
                      {lead.business ?? "Unknown business"}
                    </Link>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(
                        lead.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </td>

                  <td className="px-5 py-4">
                    <IntentBadge intent={lead.intent} />
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {lead.budget ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-300">
                    {lead.timeline ?? "—"}
                  </td>

                  <td className="px-5 py-4">

                    {latestAction ? (

                      <ActionBadge
                        action={latestAction.action}
                        status={latestAction.status}
                      />

                    ) : (

                      <span className="text-sm text-slate-600">
                        No action
                      </span>

                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {leads.length === 0 && (

        <div className="px-6 py-12 text-center">

          <p className="text-slate-400">
            No leads yet.
          </p>

          <p className="mt-1 text-sm text-slate-600">
            Leads will appear here after a Vapi call.
          </p>

        </div>

      )}

    </div>
  );
}