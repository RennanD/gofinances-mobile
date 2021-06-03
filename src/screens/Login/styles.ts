import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  text-align: center;
  margin-top: 45px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.shape};
  `}
`;

export const SignInTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-top: 80px;
  margin-bottom: 67px;

  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.shape};
  `}
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const LoginButtonContainer = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
`;
