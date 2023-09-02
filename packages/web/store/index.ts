import { create } from 'zustand'
import { createProjectSlice } from './project'
import { type ProjectSlice } from './project'

type StoreState = ProjectSlice

export const useStore = create<StoreState>()((...args) => ({ ...createProjectSlice(...args) }))
