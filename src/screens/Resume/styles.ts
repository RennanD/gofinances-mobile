import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
