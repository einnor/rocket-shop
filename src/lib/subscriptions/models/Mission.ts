import moment from 'moment';
import _ from 'underscore';
import { MissionStatuses, Roles } from '../enums';
import { IMission, Assignment } from '../types';

export default class Mission {
  private status: string;
  private commander: string | null;
  private MAVpilot: string | null;
  private colonists: [];
  private tourists: [];
  private assignments: Assignment[];
  private launchDate: string;

  constructor(missionDetails: IMission) {
    this.status = MissionStatuses.Open, //open, closed, canceled
    this.commander = missionDetails.Commander || null,
    this.MAVpilot = missionDetails.MAVPilot || null,
    this.colonists = missionDetails.colonists || [],
    this.tourists = missionDetails.tourists || [],
    this.assignments = [],
    //default to next month on the first
    this.launchDate = missionDetails.launchDate || (moment().add(1,"month").startOf('month')).format("MM-DD-YYYY")
  }

  public passengers() {
    return (this.colonists.length + this.tourists.length) || [];
  };

  public passengersAndCrew() {
    return this.passengers.length + 2;
  };

  public hasRoom() {
    return this.passengersAndCrew() < 10;
  };

  public totalWeight() {
    let weight = 0;
    _.each(this.assignments, (assignment) => {
      if (assignment.passenger.weight) {
        weight += assignment.passenger.weight;
      }
    });
    return weight;
  };

  public getLaunchDate() {
    return this.launchDate;
  }

  public needsRole(role: string) {
    let needed = false;
    if(!this.isFlying()){
      return false;
    }

    switch(role){
      case Roles.Commander :
        needed = !this.commander;
        break;
      case Roles.MavPilot :
        needed = !this.MAVpilot;
        break;
      case Roles.Colonist :
        needed = this.colonists.length <= 10;
        break;
      case Roles.SpaceTourist :
        needed = this.tourists.length <=20;
        break;
    }
    return needed;
  };

  public isFlying() {
    return this.status === MissionStatuses.Open;
  };
};
