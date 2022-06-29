import create from 'zustand'
import type { ProjectSlice } from './project'
import { createProjectSlice } from './project'

type StoreState = ProjectSlice

export const useStore = create<StoreState>()((...args) => ({ ...createProjectSlice(...args) }))
