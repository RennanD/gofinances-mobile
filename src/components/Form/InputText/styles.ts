import styled, { css } from 'styled-components/native';

import { TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputProps {
  error: boolean;
}

export const Container = styled(TextInput)<InputProps>`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  margin-bottom: 8px;

  color: ${({ theme }) => theme.colors.title};

  ${({ error, theme }) =>
    error &&
    css`
      border: 0.5px solid ${theme.colors.attention};
    `}
`;

export const Error = styled.Text`
  font-size: ${RFValue(11)}px;

  margin: 4px 0;

  ${({ theme }) => css`
    color: ${theme.colors.attention};
    font-family: ${theme.fonts.regular};
  `}
`;
