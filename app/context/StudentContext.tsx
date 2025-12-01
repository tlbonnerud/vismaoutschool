'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

// Student preferences derived from the survey
export interface StudentPreferences {
  // Personal info
  name: string;
  currentSchool: string;
  
  // Sosialt - ønsker
  wantBreaksOutside: boolean | null;
  wantSportsInBreaks: boolean | null;
  wantBoardGames: boolean | null;
  wantClassTimeOutside: boolean | null;
  wantPartyEnvironment: boolean | null;
  wantToParty: boolean | null;
  wantCantinaSocial: boolean | null;
  wantTeacherActivities: boolean | null;
  wantShopInBreaks: boolean | null;
  preferCenter: boolean | null;

  // Læringsmiljø - ønsker
  wantEveryoneToWantSuccess: boolean | null;
  wantPeopleRaiseHands: boolean | null;
  wantStudentsWork: boolean | null;
  wantEveryoneWantGoodGrades: boolean | null;
  wantGradePressure: boolean | null;
  wantGoodTeachers: boolean | null;
  wantTalkToTeacherAboutGrades: boolean | null;
  wantTalkToAdultsAtSchool: boolean | null;
  wantShamefulBadGrades: boolean | null;
  wantStrictGymTeachers: boolean | null;
  wantGymTeacherFocusPerformance: boolean | null;

  // Fysisk - ønsker (what you want)
  wantCantine: boolean | null;
  wantSportsCourt: boolean | null;
  wantSeatingArea: boolean | null;
}

interface StudentContextType {
  student: StudentPreferences;
  setStudent: React.Dispatch<React.SetStateAction<StudentPreferences>>;
  updatePreference: (key: keyof StudentPreferences, value: boolean | string | null) => void;
  hasCompletedSurvey: boolean;
}

const defaultStudent: StudentPreferences = {
  name: 'Elev',
  currentSchool: '',
  wantBreaksOutside: null,
  wantSportsInBreaks: null,
  wantBoardGames: null,
  wantClassTimeOutside: null,
  wantPartyEnvironment: null,
  wantToParty: null,
  wantCantinaSocial: null,
  wantTeacherActivities: null,
  wantShopInBreaks: null,
  preferCenter: null,
  wantEveryoneToWantSuccess: null,
  wantPeopleRaiseHands: null,
  wantStudentsWork: null,
  wantEveryoneWantGoodGrades: null,
  wantGradePressure: null,
  wantGoodTeachers: null,
  wantTalkToTeacherAboutGrades: null,
  wantTalkToAdultsAtSchool: null,
  wantShamefulBadGrades: null,
  wantStrictGymTeachers: null,
  wantGymTeacherFocusPerformance: null,
  wantCantine: null,
  wantSportsCourt: null,
  wantSeatingArea: null,
};

// Keys that are metadata and should not be considered as survey responses
const METADATA_KEYS: (keyof StudentPreferences)[] = ['name', 'currentSchool'];

// Helper function to validate parsed data has expected structure
function isValidStudentPreferences(data: unknown): data is StudentPreferences {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  // Check for required fields
  return typeof obj.name === 'string' && typeof obj.currentSchool === 'string';
}

// Helper function to get initial state from localStorage
function getInitialStudent(): StudentPreferences {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('studentProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isValidStudentPreferences(parsed)) {
          return parsed;
        }
        console.warn('Stored student profile has invalid structure, using defaults');
      } catch (e) {
        console.error('Failed to parse saved student profile', e);
      }
    }
  }
  return defaultStudent;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<StudentPreferences>(getInitialStudent);
  const isFirstRender = useRef(true);

  // Save to localStorage on change (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('studentProfile', JSON.stringify(student));
    }
  }, [student]);

  const updatePreference = (key: keyof StudentPreferences, value: boolean | string | null) => {
    setStudent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Check if at least some preferences have been set (excluding metadata fields)
  const hasCompletedSurvey = Object.entries(student).some(
    ([key, value]) => !METADATA_KEYS.includes(key as keyof StudentPreferences) && value !== null
  );

  return (
    <StudentContext.Provider value={{ student, setStudent, updatePreference, hasCompletedSurvey }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
