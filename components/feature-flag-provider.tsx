"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define the feature flag types
export type UserSegment = "all" | "guest" | "beta" | "premium";
export type RolloutStrategy = "off" | "on" | "percentage" | "userSegment";

export interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  rolloutStrategy: RolloutStrategy;
  rolloutPercentage: number;
  userSegments: UserSegment[];
}

interface FeatureFlagContextType {
  flags: Record<string, FeatureFlag>;
  isEnabled: (flagName: string) => boolean;
  updateFlag: (flagName: string, updates: Partial<FeatureFlag>) => void;
  currentUserSegment: UserSegment;
  setCurrentUserSegment: (segment: UserSegment) => void;
}

const defaultFlags: Record<string, FeatureFlag> = {
  hero_v2: {
    name: "hero_v2",
    description: "Enhanced hero section with rich media and animations",
    enabled: false,
    rolloutStrategy: "off",
    rolloutPercentage: 0,
    userSegments: ["premium", "beta"],
  },
  dashboard_v2: {
    name: "dashboard_v2",
    description: "Enhanced dashboard with budget breakdown and visual charts",
    enabled: false,
    rolloutStrategy: "off",
    rolloutPercentage: 0,
    userSegments: ["premium", "beta"],
  },
  showVirtualCard: {
    name: "showVirtualCard",
    description: "Virtual card widget for premium and verified users",
    enabled: false,
    rolloutStrategy: "userSegment",
    rolloutPercentage: 0,
    userSegments: ["premium"],
  },
  smartSearch: {
    name: "smartSearch",
    description: "AI-powered smart search for transactions",
    enabled: false,
    rolloutStrategy: "percentage",
    rolloutPercentage: 50,
    userSegments: ["premium", "beta", "guest"],
  },
  supportChat: {
    name: "supportChat",
    description: "Live chat support widget",
    enabled: false,
    rolloutStrategy: "off",
    rolloutPercentage: 0,
    userSegments: ["premium", "beta"],
  },
};

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined
);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<Record<string, FeatureFlag>>(defaultFlags);
  const [currentUserSegment, setCurrentUserSegment] =
    useState<UserSegment>("all");

  // Load flags from localStorage on mount
  useEffect(() => {
    const savedFlags = localStorage.getItem("featureFlags");
    const savedUserSegment = localStorage.getItem("userSegment");

    if (savedFlags) {
      try {
        setFlags(JSON.parse(savedFlags));
      } catch (e) {
        console.error("Failed to parse saved feature flags", e);
      }
    }

    if (savedUserSegment) {
      setCurrentUserSegment(savedUserSegment as UserSegment);
    }
  }, []);

  // Save flags to localStorage when they change
  useEffect(() => {
    localStorage.setItem("featureFlags", JSON.stringify(flags));
  }, [flags]);

  // Save user segment to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userSegment", currentUserSegment);
  }, [currentUserSegment]);

  // Determine if a feature flag is enabled
  const isEnabled = (flagName: string): boolean => {
    const flag = flags[flagName];
    if (!flag) return false;

    // If the flag is simply on or off, return that value
    if (flag.rolloutStrategy === "on") return true;
    if (flag.rolloutStrategy === "off") return false;

    // For percentage-based rollout
    if (flag.rolloutStrategy === "percentage") {
      // Generate a consistent random number for this user session
      const userIdForSession =
        localStorage.getItem("userIdForSession") ||
        Math.random().toString(36).substring(2, 15);

      if (!localStorage.getItem("userIdForSession")) {
        localStorage.setItem("userIdForSession", userIdForSession);
      }

      // Use the hash of the user ID to determine if they get the feature
      const hash = Array.from(userIdForSession).reduce(
        (hash, char) => (hash << 5) - hash + char.charCodeAt(0),
        0
      );
      const normalizedHash = Math.abs(hash) / 2147483647; // Normalize to 0-1

      return normalizedHash * 100 <= flag.rolloutPercentage;
    }

    // For user segment-based rollout
    if (flag.rolloutStrategy === "userSegment") {
      if (currentUserSegment === "all") return true;
      return flag.userSegments.includes(currentUserSegment);
    }

    return false;
  };

  // Update a feature flag
  const updateFlag = (flagName: string, updates: Partial<FeatureFlag>) => {
    setFlags((prev) => ({
      ...prev,
      [flagName]: {
        ...prev[flagName],
        ...updates,
      },
    }));
  };

  return (
    <FeatureFlagContext.Provider
      value={{
        flags,
        isEnabled,
        updateFlag,
        currentUserSegment,
        setCurrentUserSegment,
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
}

// Custom hook to use feature flags
export function useFeatureFlag(flagName: string): boolean {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider");
  }
  return context.isEnabled(flagName);
}

// Hook to access the feature flag context
export function useFeatureFlagContext() {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureFlagContext must be used within a FeatureFlagProvider"
    );
  }
  return context;
}
