import { create } from "zustand";

interface RouteStoreState {
  showRoutes: boolean;
  setShowRoutes: (showRoutes: boolean) => void;
}
