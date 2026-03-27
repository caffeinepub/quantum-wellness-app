import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Session {
    id: bigint;
    modalitiesUsed: Array<string>;
    patientId: bigint;
    date: string;
    meridianReadings: Array<MeridianReading>;
}
export interface Practitioner {
    name: string;
    role: string;
    icianId: string;
}
export type Gender = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "female";
    female: null;
} | {
    __kind__: "male";
    male: null;
};
export interface Patient {
    id: bigint;
    age: bigint;
    contact: string;
    name: string;
    gender: Gender;
}
export interface MeridianReading {
    qi: bigint;
    meridian: string;
    vata: bigint;
    acidBase: bigint;
    pitta: bigint;
    kapha: bigint;
}
export interface backendInterface {
    addPatient(name: string, age: bigint, gender: Gender, contact: string): Promise<bigint>;
    createSession(patientId: bigint, date: string, modalities: Array<string>, readings: Array<MeridianReading>): Promise<bigint>;
    getPatient(id: bigint): Promise<Patient>;
    getPractitioner(id: string): Promise<Practitioner>;
    getSession(id: bigint): Promise<Session>;
    getSessionsByPatient(patientId: bigint): Promise<Array<Session>>;
    getTodaysSessions(date: string): Promise<Array<Session>>;
    getTotalPatients(): Promise<bigint>;
    getTotalSessions(): Promise<bigint>;
    listPatients(): Promise<Array<Patient>>;
    listSessions(): Promise<Array<Session>>;
    savePractitioner(id: string, name: string, role: string): Promise<void>;
    searchPatients(searchText: string): Promise<Array<Patient>>;
}
