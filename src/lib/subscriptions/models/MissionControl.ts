import moment from 'moment';
import assert from 'assert';
import Mission from '../models/Mission';
import {IMembershipApplication} from '../types';

export default class MissionControl {
  private db;
  constructor(params) {
    assert(params.db, 'Need a DB instance');
    this.db = params.db;
  }

  public currentMission(next) {
    //the current mission is the one that starts the first
    //of next month
    const nextMission = moment().add(1, "month").startOf("month");
    const formattedMissionDate = nextMission.format("MM-DD-YYYY");

    //pull from the DB
    this.db.getMissionByLaunchDate(formattedMissionDate, (err,foundMission) => {
      //no bubbling here, throw
      assert.ok(err === null, err);
      //if there's a saved mission, send it along...
      if(foundMission){
        next(null,new Mission(foundMission));
      }else{
        //create it and save
        foundMission = new Mission({});
        this.db.createNextMission(foundMission, (err, result) => {
          next(err,foundMission);
        });
      }
    });
  };

  public hasSpaceForRole(role, next) {
    this.currentMission((err,mission: Mission) => {
      const hasRoom = mission.needsRole(role);
      next(null,hasRoom);
    });
  };

  public assignRole(application: IMembershipApplication, next) {
    var missionArgs = {
      role: application.role,
      user: {
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email
      }
    };

    this.currentMission(function(err,mission){
      mission.assignRole(missionArgs);
      this.db.update({launchDate : mission.launchDate}, mission, {},function(err,res){
        next(null,mission);
      });
    });
  };
};
