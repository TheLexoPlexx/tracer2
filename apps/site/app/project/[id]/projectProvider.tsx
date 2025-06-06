"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { Project, Node, Component, Configuration } from "@prisma/client";
import { CanvasConnection } from "@/lib/auxPrismaTypes";

export type CanvasNode = Node & {
  component: Component
}

type ProjectContextType = {
  project: Project;
  nodes: CanvasNode[];
  configurations: Configuration[];
  connections: CanvasConnection[];
  setProject: (project: Project) => void;
  setNodes: (nodes: CanvasNode[]) => void;
  setConfigurations: (configurations: Configuration[]) => void;
  setConnections: (connections: CanvasConnection[]) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

type ProjectProviderProps = {
  children: ReactNode;
  project: Project;
  nodes: CanvasNode[];
  configurations: Configuration[];
  connections: CanvasConnection[];
};

export function ProjectProvider({
  children,
  project: initialProject,
  nodes: initialNodes,
  configurations: initialConfigurations,
  connections: initialConnections
}: ProjectProviderProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes);
  const [configurations, setConfigurations] = useState<Configuration[]>(initialConfigurations);
  const [connections, setConnections] = useState<CanvasConnection[]>(initialConnections);

  const value = {
    project,
    nodes,
    configurations,
    connections,
    setProject,
    setNodes,
    setConfigurations,
    setConnections,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}
