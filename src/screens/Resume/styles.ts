import styled, { css } from 'styled-components/native';

import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding-bottom: 40px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MonthButton = styled(BorderlessButton)``;

export const MonthIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Month = styled.Text`
  font-size: ${RFValue(24)}px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.title};
  `}
`;
