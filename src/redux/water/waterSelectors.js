import { createSelector } from '@reduxjs/toolkit';

export const selectDayWaterStat = (state) => state.water.dayWaterStat;
export const selectSelectMonth = (state) => state.water.selectMonth;
export const selectStateWaterMonthList = (state) => state.water.month;
export const selectStateWaterDayList = (state) => state.water.dayWaterList;
export const selectSelectDay = (state) => state.water.selectDay;
export const selectFilter = (state) => state.filter.filter;
export const selectLoading = (state) => state.water.isLoading;
export const selectError = (state) => state.water.error;

export const selectVisibleDrinking = createSelector(
  [selectStateWaterDayList, selectFilter],
  (dayWaterList, filter) => {
    return filter.length > 0
      ? dayWaterList.filter((water) => water._id.includes(filter))
      : dayWaterList;
  }
);









