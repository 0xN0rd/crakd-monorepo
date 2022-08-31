import styled from 'styled-components';
import { Button, Container } from '../ui';

export const Root = styled(Container)`
  border: 1px solid #252729;
`;

export const ButtonContainer = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.grey[30]};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: ${(p) => p.theme.spacing.sm};
`;

export const FAQButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  height: 52px;
`;

export const StyledButton = styled(Button)`
  padding: ${(p) => p.theme.spacing.xs};
`;

export const StyledFAQ = styled.div``;
