import styled from 'styled-components';
import { Container } from '../../components/ui';

export const Root = styled(Container)`
  border: 1px solid #252729;
`;

export const Heading = styled.div`
  text-align: center;
  margin-bottom: ${(p) => p.theme.spacing.md};
  padding-bottom: ${(p) => p.theme.spacing.sm};
  border-bottom: 1px solid ${(p) => p.theme.colors.grey[30]};
`;

export const LabelAndToggle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.grey[30]};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: ${(p) => p.theme.spacing.sm};
`;
