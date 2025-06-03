"use client";

import type React from "react";
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/features/users/types/user-types";
import { getClientName } from "@/features/clients/services/client-service";
import { getClientIdByUserId } from "@/features/clients/services/client-service";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  isClient: boolean;
  isSE: boolean;
  isLoading: boolean;
  clientName?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState<string | null>(null);
  const supabase = createClient();

  const fetchUser = async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .single();
    if (error || !data) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return {
      admin: data.admin ?? null,
      avatar_initial: data.avatar_initial ?? null,
      bill_rate: data.bill_rate ?? null,
      billing: data.billing ?? null,
      cost_rate: data.cost_rate ?? null,
      created_at: data.created_at ?? null,
      email: data.email ?? null,
      full_name: data.full_name ?? null,
      id: data.id ?? null,
      notes: data.notes ?? null,
      phone: data.phone ?? null,
      role: data.role ?? null,
      updated_at: data.updated_at ?? null,
    };
  };

  useEffect(() => {
    const getSessionAndProfile = async () => {
      setIsLoading(true);
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getUser();
        if (sessionError || !sessionData.user) {
          setUser(null);
        } else {
          const userId = sessionData.user.id;
          const user = await fetchUser(userId);
          if (user?.role === "client") {
            const clientId = await getClientIdByUserId(user.id);
            const clientName = await getClientName(clientId);
            setClientName(clientName);
          }
          setUser(user);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setUser(null);
      }
      setIsLoading(false);
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const user = await fetchUser(session.user.id);
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, user]);

  const isAdmin = user?.role === "admin";
  const isClient = user?.role === "client";
  const isSE = user?.role === "se";

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAdmin, isClient, isSE, isLoading, clientName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
