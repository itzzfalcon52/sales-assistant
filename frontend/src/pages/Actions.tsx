import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  XCircle,
  Zap,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getActions } from "../services/api";

import type {
  LeadActionRecord,
} from "../types/lead";

import ActionBadge from "../components/ActionBadge";
import Loading from "../components/Loading";

export default function Actions() {
  const { id } = useParams();

  const [actions, setActions] =
    useState<LeadActionRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (!id) {
      return;
    }

    async function loadActions() {

      try {

        const data =
          await getActions(id as string );

        setActions(data);

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load actions."
        );

      } finally {

        setLoading(false);

      }
    }

    loadActions();

  }, [id]);

  if (loading) {
    return (
      <Loading text="Loading actions..." />
    );
  }

  return (
    <div className="space-y-6">

      <Link
        to={`/leads/${id}`}
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to lead
      </Link>

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
            <Zap size={19} />
          </div>

          <div>

            <h1 className="text-3xl font-semibold">
              Action History
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Actions generated and executed for this lead.
            </p>

          </div>

        </div>

      </div>

      {error ? (

        <div className="card p-6">
          <p className="text-red-400">
            {error}
          </p>
        </div>

      ) : actions.length === 0 ? (

        <div className="card p-10 text-center">

          <p className="text-slate-400">
            No actions recorded yet.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {actions.map((action) => (

            <div
              key={action.id}
              className="card flex items-center justify-between p-5"
            >

              <div className="flex items-center gap-4">

                <StatusIcon
                  status={action.status}
                />

                <div>

                  <ActionBadge
                    action={action.action}
                    status={action.status}
                  />

                  <p className="mt-1 text-xs text-slate-600">
                    {new Date(
                      action.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


function StatusIcon({
  status,
}: {
  status:
    | "PENDING"
    | "COMPLETED"
    | "FAILED";
}) {

  if (status === "COMPLETED") {

    return (
      <CheckCircle2
        size={22}
        className="text-green-400"
      />
    );

  }

  if (status === "FAILED") {

    return (
      <XCircle
        size={22}
        className="text-red-400"
      />
    );

  }

  return (
    <Clock3
      size={22}
      className="text-yellow-400"
    />
  );
}