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
    selectedHospital: HospitalInfo | undefined,
    setSelectedHospital: (hospitals: HospitalInfo | undefined) => void
}

export const SelectedHospitalContext = createContext<HospitalContextType>({
    selectedHospital: undefined,
    setSelectedHospital: () => { },
});

export const SelectedHospitalsContextProvider = (props: { children: ReactNode }) => {
    const [selectedHospital, setSelectedHospital] = useState<HospitalInfo>();
    return (
        <SelectedHospitalContext.Provider value={{ selectedHospital, setSelectedHospital }}>
            {props.children}
        </SelectedHospitalContext.Provider>
    );
};