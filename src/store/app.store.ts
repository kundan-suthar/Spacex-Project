import axios from "axios";
import { create } from "zustand";

interface Dimensions {
  meters: number;
  feet: number;
}
interface Height {
  meters: number;
  feet: number;
}
interface Mass {
  kg: number;
  lb: number;
}
interface HeatShield {
  material: string;
  size_meters: number;
  temp_degrees: number;
  dev_partner: string;
}

type Rocket = {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
  diameter: Dimensions;
  first_flight: string;
  height: Height;
  type: string;
  cost_per_launch: string;
  company: string;
  success_rate_pct: string;
  active: boolean;
  country: string;
  stages: number;
  mass: Mass;
  wikipedia: string;
};

type Launch = {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
};
type Dragon = {
  id: string;
  name: string;
  type: string;
  dry_mass_kg: number;
  flickr_images: string[];
  description: string;
  first_flight: string;
  crew_capacity: number;
  active: boolean;
  heat_shield: HeatShield;
  wikipedia:string;
};

type AppStore = {
  rockets: Rocket[] | null;
  singleRocket: Rocket | null;
  dragons: Dragon[] | null;
  singleDragon: Dragon | null;
  launches: Launch[] | null;
  isLoading: boolean;
  error: string | null;
  fetchRockets: () => Promise<void>;
  fetchSingleRocket: (id: string) => Promise<void>;
  fetchLaunches: () => Promise<void>;
  fetchDragons: () => Promise<void>;
  fetchSingleDragon: (id: string) => Promise<void>;
};
export const useAppStore = create<AppStore>((set) => ({
  rockets: null,
  dragons: null,
  singleDragon: null,
  singleRocket: null,
  launches: null,
  isLoading: false,
  error: null,
  fetchRockets: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<Rocket[]>(
        "https://api.spacexdata.com/v4/rockets"
      );
      set({ rockets: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch rockets", isLoading: false });
    }
  },
  fetchSingleRocket: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<Rocket>(
        `https://api.spacexdata.com/v4/rockets/${id}`
      );
      set({ singleRocket: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch rockets", isLoading: false });
    }
  },
  fetchLaunches: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<Launch[]>(
        "https://api.spacexdata.com/v4/launches"
      );
      set({ launches: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch launches", isLoading: false });
    }
  },
  fetchDragons: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Dragon[]>(
        "https://api.spacexdata.com/v4/dragons"
      );
      set({ dragons: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch rockets", isLoading: false });
    }
  },
  fetchSingleDragon: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<Dragon>(
        `https://api.spacexdata.com/v4/dragons/${id}`
      );
      set({ singleDragon: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch rockets", isLoading: false });
    }
  },
}));
