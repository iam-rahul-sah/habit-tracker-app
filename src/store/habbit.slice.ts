import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completeDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
        const newHabit: Habit = {
            id: Date.now().toString(),
            name: action.payload.name,
            frequency: action.payload.frequency,
            completeDates: [],
            createdAt: new Date().toISOString(),
        };
        state.habits.push(newHabit);
    },
    toggleHabit: (state, action: PayloadAction<{id: string, date: string}>) => {
        const habit = state.habits.find((h) => h.id == action.payload.id);

        if(habit){
            const index = habit.completeDates.indexOf(action.payload.date);
            if(index > -1){
                habit.completeDates.splice(index, 1);
            } else {
                habit.completeDates.push(action.payload.date)
            }
        }
    },
    removeHabit: (state, action: PayloadAction<{id: string}>) => {
        const habitIndex = state.habits.findIndex((habit) => habit.id == action.payload.id);
        if(habitIndex > -1){
            state.habits.splice(habitIndex, 1);
        }
    }
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
