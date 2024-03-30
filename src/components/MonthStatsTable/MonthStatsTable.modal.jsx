import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TableContainer = styled.div`
  box-shadow: 0 4px 14px 0 rgba(64, 123, 255, 0.3);
  background: var(--secondary-color-2);
  width: 544px;
  /* height: 332px; */
  height: 550px;
`;
export const TableHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 500px;
  margin-left: 24px;
`;

export const MonthSpan = styled.span`
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 26px;
  line-height: 123%;
  color: var(--primery-color-black);
`;

export const MonthYearSpan = styled.span`
  margin-left: 5px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  text-align: center;
  color: var(--primery-color-blue);
`;
export const CarrentMonthBox = styled.div`
  display: flex;
  justify-content: center;
  width: 90px;
  /* background-color: blue; */
`;
export const IconWrapper = styled.svg`
  width: 14px;
  height: 14px;
  fill: #407bff;
`;
export const BtnMonthBox = styled.div`
  margin: 0;
  padding: 0;
  border: none;
  /* background-color: black; */
  width: 14px;
  height: 14px;
`;

export const BtnMonthStep = styled.button`
  /* width: 50px; */
  background-color: transparent;
  border: none;
`;
export const DayOfWeekSpan = styled.span`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  color: var(--secondary-color-4);
`;
export const MonthStatsControlBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
export const CalendarTab = styled.div`
  display: 'grid';
  grid-template-columns: 'repeat(7, 0fr)';
  gap: '22px 20px';
  align-items: center;
  justify-content: center;
`;
export const CalendarData = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primery-color-white);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PersentRateWoter = styled.span`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  color: var(--secondary-color-4);
`;

export const ContainerData = styled.div`
  width: 34px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const StyledLink = styled(Link)`
  /* padding: 20px; */
`;
