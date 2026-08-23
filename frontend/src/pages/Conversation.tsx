import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getConversation } from "../services/api";

import type {
  Conversation as ConversationType,
} from "../types/lead";

import Loading from "../components/Loading";

export default function Conversation() {
  const { id } = useParams();

  const [
    conversation,
    setConversation,
  ] = useState<ConversationType | null>(
    null
  );

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

    async function loadConversation() {

      try {

        const data =
          await getConversation(id as string );

        setConversation(data);

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load conversation."
        );

      } finally {

        setLoading(false);

      }
    }

    loadConversation();

  }, [id]);

  if (loading) {
    return (
      <Loading text="Loading conversation..." />
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
            <MessageSquare size={19} />
          </div>

          <div>

            <h1 className="text-3xl font-semibold">
              Conversation
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Full transcript from the AI sales call.
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

      ) : !conversation ? (

        <div className="card p-6">
          <p className="text-slate-500">
            Conversation not found.
          </p>
        </div>

      ) : (

        <div className="card p-6">

          {/* Call information */}

          <div className="border-b border-slate-800 pb-5">

            <p className="text-xs uppercase tracking-wider text-slate-600">
              Call ID
            </p>

            <p className="mt-2 break-all font-mono text-sm text-slate-400">
              {conversation.callId}
            </p>

          </div>

          {/* Transcript */}

          <div className="mt-6">

            <p className="mb-4 text-xs uppercase tracking-wider text-slate-600">
              Transcript
            </p>

            <div className="whitespace-pre-wrap rounded-lg bg-slate-950 p-5 text-sm leading-7 text-slate-300">
              {conversation.transcript ??
                "No transcript available."}
            </div>

          </div>

        </div>

      )}

    </div>
  );
}