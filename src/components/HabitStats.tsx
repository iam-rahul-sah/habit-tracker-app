import { Paper, Typography } from "@mui/material";
import { RootState } from "../store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Habit } from "../store/habbit.slice";

const HabitStats: React.FC = () => {
  const habits = useSelector(
    (state: RootState) => state.persistedReducer.habits
  );

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter(habit => habit.completeDates.includes(today)).length;
  }

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while(true){
        const dateString = currentDate.toISOString().split("T")[0];
        if(habit.completeDates.includes(dateString)){
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
  }

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  }
  
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits: {habits.length}</Typography>
      <Typography variant="body1">Completed Today: {getCompletedToday()}</Typography>
      <Typography variant="body1">Longest Streak: {getLongestStreak()}</Typography>
    </Paper>
  );
};

export default HabitStats;
