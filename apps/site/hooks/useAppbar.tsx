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
  appbarTitleElement: ReactNode | null;
  setAppbarTitle: (title?: string, element?: ReactNode) => void;
}

const AppbarContext = createContext<AppbarContextType | undefined>(undefined);

export function AppbarProvider(props: { children: ReactNode }) {
  const [appbarActions, setAppbarActions] = useState<AppbarAction[]>([]);
  const [appbarTitle, setAppbarTitleState] = useState<string>("Tracer");
  const [appbarTitleElement, setAppbarTitleElement] = useState<ReactNode | null>(null);

  const addAppbarAction = useCallback((action: AppbarAction) => {
    setAppbarActions(prevActions => [...prevActions, action]);
  }, []);

  const clearAppbarActions = useCallback(() => {
    setAppbarActions([]);
  }, []);

  const setAppbarTitle = useCallback((title?: string, element?: ReactNode) => {
    if (!title && !element) {
      setAppbarTitleState("Tracer");
      setAppbarTitleElement(null);
    } else {
      if (title) {
        setAppbarTitleState(title);
      } else {
        setAppbarTitleState("Tracer");
      }
      if (element) {
        setAppbarTitleElement(element);
      } else {
        setAppbarTitleElement(null);
      }
    }
  }, []);

  return (
    <AppbarContext.Provider value={{ appbarActions, setAppbarActions, addAppbarAction, clearAppbarActions, appbarTitle, appbarTitleElement, setAppbarTitle }}>
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