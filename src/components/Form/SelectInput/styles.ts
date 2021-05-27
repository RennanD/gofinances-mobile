import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface SelectInputProps {
  hasPlaceholder: boolean;
}

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;

  padding: 18px 16px;
`;

export const CategoryName = styled.Text<SelectInputProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ hasPlaceholder, theme }) =>
    hasPlaceholder ? theme.colors.text : theme.colors.title};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
