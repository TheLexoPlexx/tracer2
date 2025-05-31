"use client"

import { ReactNode, useState, createContext, useContext, useCallback } from 'react';

export interface AppbarAction {
  id: string;
  icon: ReactNode;
  position: AppbarActionPosition;
  href?: string;
  onClick?: () => void;
}

export enum AppbarActionPosition {
  LEFT = "left",
  RIGHT = "right"
}

export interface AppbarContextType {
  appbarActions: AppbarAction[];
  setAppbarActions: (actions: AppbarAction[]) => void;
  addAppbarAction: (action: AppbarAction) => void;
  clearAppbarActions: () => void;
  appbarTitle: string;
  setAppbarTitle: (title?: string) => void;
}

const AppbarContext = createContext<AppbarContextType | undefined>(undefined);

export function AppbarProvider(props: { children: ReactNode }) {
  const [appbarActions, setAppbarActions] = useState<AppbarAction[]>([]);
  const [appbarTitle, setAppbarTitleState] = useState<string>("Tracer");

  const addAppbarAction = useCallback((action: AppbarAction) => {
    setAppbarActions(prevActions => [...prevActions, action]);
  }, []);

  const clearAppbarActions = useCallback(() => {
    setAppbarActions([]);
  }, []);

  const setAppbarTitle = useCallback((title?: string) => {
    if (title) {
      setAppbarTitleState(title);
    } else {
      setAppbarTitleState("Tracer");
    }
  }, []);

  return (
    <AppbarContext.Provider value={{ appbarActions, setAppbarActions, addAppbarAction, clearAppbarActions, appbarTitle, setAppbarTitle }}>
      {props.children}
    </AppbarContext.Provider>
  );
}

export function useAppbar(): AppbarContextType {
  const context = useContext(AppbarContext);
  if (context === undefined) {
    throw new Error('useAppbar must be used within an AppbarProvider');
  }
  return context;
} 