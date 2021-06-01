import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(113)}px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
