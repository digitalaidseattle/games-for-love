/**
 *  SelectedHospitalContext.tsx
 * 
 *  Provides application-wide holder for a selected hospital
 * 
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from 'react';
import { HospitalInfo } from '../models/hospitalInfo';

interface HospitalContextType {
    hospital: HospitalInfo | undefined,
    setHospital: (hospitals: HospitalInfo | undefined) => void
}

export const SelectedHospitalContext = createContext<HospitalContextType>({
    hospital: undefined,
    setHospital: () => { },
});

export const DonationHospitalContext = createContext<HospitalContextType>({
    hospital: undefined,
    setHospital: () => { },
});

export const LearnMoreHospitalContext = createContext<HospitalContextType>({
    hospital: undefined,
    setHospital: () => { },
});

export const SelectedHospitalsContextProvider = (props: { children: ReactNode }) => {
    const [hospital, setHospital] = useState<HospitalInfo>();
    return (
        <SelectedHospitalContext.Provider value={{ hospital, setHospital }}>
            {props.children}
        </SelectedHospitalContext.Provider>
    );
};

export const DonationHospitalContextProvider = (props: { children: ReactNode }) => {
    const [hospital, setHospital] = useState<HospitalInfo>();
    return (
        <DonationHospitalContext.Provider value={{ hospital, setHospital }}>
            {props.children}
        </DonationHospitalContext.Provider>
    );
};
export const LearnMoreHospitalContextProvider = (props: { children: ReactNode }) => {
    const [hospital, setHospital] = useState<HospitalInfo>();
    return (
        <LearnMoreHospitalContext.Provider value={{ hospital, setHospital }}>
            {props.children}
        </LearnMoreHospitalContext.Provider>
    );
};