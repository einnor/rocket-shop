import { IMembershipApplication } from './IMembershipApplication';

export interface Assignment {
  passenger: IMembershipApplication;
};

export interface IMission {
  colonists: [];
  tourists: [];
  passengers: [];
  passengersAndCrew: number;
  assignments: Assignment[];
  status: string;
  Commander: string | null;
  MAVPilot: string | null;
      //default to next month on the first
  launchDate?: string;
};
