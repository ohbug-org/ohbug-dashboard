import { type Project } from '@prisma/client'
import { type StateCreator } from 'zustand'

export interface ProjectSlice {
  project?: Project
  setProject: (project: Project) => void
}

export const createProjectSlice: StateCreator<ProjectSlice, [], []> = set => ({
  project: undefined,
  setProject: project => set(() => ({ project })),
})
