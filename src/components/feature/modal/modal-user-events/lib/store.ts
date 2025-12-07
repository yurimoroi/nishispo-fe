import { create } from "zustand";

/* TODO 
- Event list will be implemented on Phase 2 
- Set the passed events to the store
- Update any[] type to the correct type for events?: any[]
- After setting the events (setUserEvents), update UI Component
- Remove this todo after implementation
*/

export type useModalUserEventsStore = {
  isOpen: boolean;
  events: any[];
};

const initialStore: useModalUserEventsStore = {
  isOpen: false,
  events: [],
};

export const useModalUserEventsStore = create<useModalUserEventsStore>()(
  (set, get) => ({
    ...initialStore,
  }),
);

export const openModalUserEvents = () => {
  useModalUserEventsStore.setState({
    isOpen: true,
  });
};
export const closeModalUserEvents = () => {
  useModalUserEventsStore.setState({
    ...initialStore,
  });
};

export const setUserEvents = (events: any[]) => {
  useModalUserEventsStore.setState({
    events,
  });
};
