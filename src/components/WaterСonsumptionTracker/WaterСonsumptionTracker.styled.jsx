import { styled } from 'styled-components';

export const TrackerContainer = styled.div``;

export const Title = styled.h1`
  color: var(--primery-color-black);
  font-size: 28px;
  margin-bottom: 16px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.h2`
  color: var(--primery-color-black);
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
`;

export const TitleTracker = styled.h3`
  color: var(--primery-color-black);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
`;

export const ListTrackers = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  @media screen and (min-width: 1440px) {
    flex-direction: column;
  }
`;

export const ItemTracker = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextTracker = styled.p`
  color: var(--primery-color-black);
  font-size: 16px;
  height: 18px;
`;

export const ButtonTracker = styled.button`
  font-size: 16px;
  font-weight: 500;
  color: var(--primery-color-white);
  background-color: var(--primery-color-blue);
  box-shadow: 0 4px 8px rgba(64, 123, 255, 0.34);
  border: none;
  border-radius: 10px;
  width: 280px;
  height: 36px;
  transition: box-shadow 500ms ease-in-out;

  &:hover {
    box-shadow: 0 4px 14px rgba(64, 123, 255, 0.54);
  }

  &:active {
    box-shadow: none;
  }

  @media screen and (min-width: 768px) {
    font-size: 18px;
    width: 336px;
    height: 44px;
  }

  @media screen and (min-width: 1440px) {
    width: 384px;
  }
`;
