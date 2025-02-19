import * as _ from 'underscore';
import moment, { Moment } from 'moment';
import { IMembershipApplication } from '../types';

export default class MembershipApplication {

  private firstName: string;
  private lastName: string;
  private email: string;
  private age: number;
  private height: number;
  private weight: number;
  private validUntil: Moment;

  constructor(membershipApplication: IMembershipApplication) {
    _.extend(this, membershipApplication);
    this.validUntil = membershipApplication.validUntil ? moment(membershipApplication.validUntil) : moment().add(10, "days");
  }

  public expired(): boolean {
    return this.validUntil.isBefore(moment());
  }

  public emailIsValid(): boolean {
    return !!this.email && this.email.length > 3 && this.email.indexOf("@") > -1;
  }

  public heightIsValid (): boolean {
    return !!this.height && this.height > 60 && this.height < 75;
  }

  public ageIsValid(): boolean {
    return !!this.age && this.age < 100 && this.age > 15;
  }

  public weightIsValid(): boolean {
    return !!this.weight && this.weight > 100 && this.weight < 300;
  }

  public nameIsValid(): boolean {
    return !!this.firstName && !!this.lastName;
  }

  public isValid(): boolean {
    return this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      this.nameIsValid();
  }

  public validationMessage(): string {
    if(this.isValid()){
      return "Application is valid";
    }else if(!this.emailIsValid()){
      return "Email is invalid";
    }else if(!this.ageIsValid()){
      return "Age is outside our limits of 15 and 100 years";
    }else if(!this.heightIsValid()){
      return "Height is outside our limits of 60 and 75 inches";
    }else if(!this.weightIsValid()){
      return "Weight is outside our limits of 100 and 300 pounds";
    }else if(!this.nameIsValid()){
      return "A first and last name is required";
    }else if(this.expired()){
      return "This application is expired";
    }
    return 'Unknown';
  }
};
