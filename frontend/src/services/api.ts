import type {
    Lead,
    Conversation,
    LeadActionRecord,
  } from "../types/lead";
  
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:4000/api";
  
  
  // ==========================================
  // GET ALL LEADS
  // ==========================================
  
  export async function getLeads(): Promise<Lead[]> {
    const response = await fetch(`${API_URL}/leads`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }
  
    return response.json();
  }
  
  
  // ==========================================
  // GET SINGLE LEAD
  // ==========================================
  
  export async function getLead(
    id: string
  ): Promise<Lead> {
    const response = await fetch(
      `${API_URL}/leads/${id}`
    );
  
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Lead not found");
      }
  
      throw new Error("Failed to fetch lead");
    }
  
    return response.json();
  }
  
  
  // ==========================================
  // GET CONVERSATION
  // ==========================================
  
  export async function getConversation(
    leadId: string
  ): Promise<Conversation> {
    const response = await fetch(
      `${API_URL}/leads/${leadId}/conversation`
    );
  
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Conversation not found");
      }
  
      throw new Error(
        "Failed to fetch conversation"
      );
    }
  
    return response.json();
  }
  
  
  // ==========================================
  // GET ACTIONS
  // ==========================================
  
  export async function getActions(
    leadId: string
  ): Promise<LeadActionRecord[]> {
    const response = await fetch(
      `${API_URL}/leads/${leadId}/actions`
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch actions");
    }
  
    return response.json();
  }