import type { TAction, TState } from '@/shared/types/types'

/**
 *  Ф-ция редюсер для управления состоянием задач
 * @returns TState
 */

export const taskReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'UPDATE_TASK':
      return state.map((task) => (task.id === action.payload.id ? action.payload : task))
    default:
      return state
  }
}
