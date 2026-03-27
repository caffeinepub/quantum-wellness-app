import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";



actor {
  type Gender = {
    #male;
    #female;
    #other : Text;
  };

  module Gender {
    public func toText(gender : Gender) : Text {
      switch (gender) {
        case (#male) { "male" };
        case (#female) { "female" };
        case (#other(text)) { text };
      };
    };
  };

  type Patient = {
    id : Nat;
    name : Text;
    age : Nat;
    gender : Gender;
    contact : Text;
  };

  type Practitioner = {
    icianId : Text;
    name : Text;
    role : Text;
  };

  type MeridianReading = {
    meridian : Text;
    qi : Int;
    pitta : Int;
    kapha : Int;
    vata : Int;
    acidBase : Int;
  };

  type Session = {
    id : Nat;
    patientId : Nat;
    date : Text;
    modalitiesUsed : [Text];
    meridianReadings : [MeridianReading];
  };

  module Session {
    public func compare(sessionA : Session, sessionB : Session) : Order.Order {
      Text.compare(sessionA.date, sessionB.date);
    };
  };

  var nextPatientId = 1;
  var nextSessionId = 1;

  let patients = Map.empty<Nat, Patient>();
  let sessions = Map.empty<Nat, Session>();
  let practitioners = Map.empty<Text, Practitioner>();

  func getPatientInternal(id : Nat) : Patient {
    switch (patients.get(id)) {
      case (?patient) { patient };
      case (null) { Runtime.trap("Patient does not exist") };
    };
  };

  func getSessionInternal(id : Nat) : Session {
    switch (sessions.get(id)) {
      case (?session) { session };
      case (null) { Runtime.trap("Session does not exist") };
    };
  };

  public shared ({ caller }) func addPatient(name : Text, age : Nat, gender : Gender, contact : Text) : async Nat {
    let id = nextPatientId;
    nextPatientId += 1;
    let patient : Patient = {
      id;
      name;
      age;
      gender;
      contact;
    };
    patients.add(id, patient);
    id;
  };

  public query ({ caller }) func getPatient(id : Nat) : async Patient {
    getPatientInternal(id);
  };

  public query ({ caller }) func listPatients() : async [Patient] {
    patients.values().toArray();
  };

  public query ({ caller }) func searchPatients(searchText : Text) : async [Patient] {
    patients.values().toArray().filter(
      func(p) {
        p.name.contains(#text(searchText));
      }
    );
  };

  public shared ({ caller }) func savePractitioner(id : Text, name : Text, role : Text) : async () {
    let practitioner : Practitioner = {
      icianId = id;
      name;
      role;
    };
    practitioners.add(id, practitioner);
  };

  public query ({ caller }) func getPractitioner(id : Text) : async Practitioner {
    switch (practitioners.get(id)) {
      case (?p) { p };
      case (null) { Runtime.trap("Practitioner does not exist") };
    };
  };

  public shared ({ caller }) func createSession(patientId : Nat, date : Text, modalities : [Text], readings : [MeridianReading]) : async Nat {
    let id = nextSessionId;
    nextSessionId += 1;
    let session : Session = {
      id;
      patientId;
      date;
      modalitiesUsed = modalities;
      meridianReadings = readings;
    };
    sessions.add(id, session);
    id;
  };

  public query ({ caller }) func getSession(id : Nat) : async Session {
    getSessionInternal(id);
  };

  public query ({ caller }) func listSessions() : async [Session] {
    sessions.values().toArray();
  };

  public query ({ caller }) func getSessionsByPatient(patientId : Nat) : async [Session] {
    sessions.values().toArray().filter(
      func(s) { s.patientId == patientId }
    );
  };

  public query ({ caller }) func getTodaysSessions(date : Text) : async [Session] {
    sessions.values().toArray().filter(
      func(s) { s.date == date }
    );
  };

  public query ({ caller }) func getTotalPatients() : async Nat {
    patients.size();
  };

  public query ({ caller }) func getTotalSessions() : async Nat {
    sessions.size();
  };
};
