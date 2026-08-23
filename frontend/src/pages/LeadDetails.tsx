import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Zap,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getLead } from "../services/api";

import type { Lead } from "../types/lead";

import IntentBadge from "../components/IntentBadge";
import ActionBadge from "../components/ActionBadge";
import Loading from "../components/Loading";

export default function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] =
    useState<Lead | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (!id) {
        setTimeout(() => {
          setError("Lead ID is missing.");
          setLoading(false);
        }, 0);
        return;
      }

    async function loadLead() {
      try {
        const data = await getLead(id as string);
       setLead(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load lead.");
      } finally {
        setLoading(false);
      }
    }

    loadLead();

  }, [id]);

  if (loading) {
    return <Loading text="Loading lead..." />;
  }

  if (error || !lead) {
    return (
      <div className="space-y-4">

        <Link
          to="/leads"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to leads
        </Link>

        <div className="card p-6">
          <p className="text-red-400">
            {error ?? "Lead not found."}
          </p>
        </div>

      </div>
    );
  }

  const latestAction =
    lead.actions?.[0];

  return (
    <div className="space-y-8">

      {/* Back */}

      <Link
        to="/leads"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to leads
      </Link>

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <h1 className="text-3xl font-semibold">
            {lead.business ??
              "Unknown business"}
          </h1>

          <p className="mt-2 font-mono text-xs text-slate-600">
            {lead.id}
          </p>

        </div>

        <IntentBadge
          intent={lead.intent}
        />

      </div>

      {/* Information */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <InfoCard
          title="Products"
          value={lead.products}
        />

        <InfoCard
          title="Budget"
          value={lead.budget}
        />

        <InfoCard
          title="Timeline"
          value={lead.timeline}
        />

        <InfoCard
          title="Barrier"
          value={lead.barrier}
        />

      </div>

      {/* Features */}

      <section className="card p-6">

        <h2 className="font-semibold">
          Required Features
        </h2>

        {lead.features.length === 0 ? (

          <p className="mt-4 text-sm text-slate-500">
            No features specified.
          </p>

        ) : (

          <div className="mt-4 flex flex-wrap gap-2">

            {lead.features.map(
              (feature) => (

                <span
                  key={feature}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300"
                >
                  {feature}
                </span>

              )
            )}

          </div>

        )}

      </section>

      {/* Current action */}

      <section className="card p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
            <Zap size={18} />
          </div>

          <div>

            <h2 className="font-semibold">
              Current Action
            </h2>

            <p className="text-sm text-slate-500">
              Recommended action for this lead.
            </p>

          </div>

        </div>

        <div className="mt-5">

          {latestAction ? (

            <ActionBadge
              action={latestAction.action}
              status={latestAction.status}
            />

          ) : (

            <p className="text-sm text-slate-500">
              No action recorded.
            </p>

          )}

        </div>

      </section>

      {/* Navigation */}

      <div className="grid gap-4 md:grid-cols-2">

        <Link
          to={`/leads/${lead.id}/conversation`}
          className="card card-hover p-6"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
              <MessageSquare size={19} />
            </div>

            <div>

              <h2 className="font-semibold">
                Conversation
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View the complete conversation.
              </p>

            </div>

          </div>

        </Link>

        <Link
          to={`/leads/${lead.id}/actions`}
          className="card card-hover p-6"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
              <Zap size={19} />
            </div>

            <div>

              <h2 className="font-semibold">
                Action History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View actions taken for this lead.
              </p>

            </div>

          </div>

        </Link>

      </div>

    </div>
  );
}


function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string | null;
}) {
  return (
    <div className="card p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-medium text-slate-100">
        {value ?? "Not specified"}
      </p>

    </div>
  );
}