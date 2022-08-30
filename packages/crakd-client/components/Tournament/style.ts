import styled from 'styled-components';
import { Button, Container } from '../../components/ui';

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

export const SelectContainer = styled.div`
  display: flex;
  vertical-align: center;
  margin-top: ${(p) => p.theme.spacing.sm};
  padding: 0 ${(p) => p.theme.spacing.xs};
`;

interface RulesButtonProps {
  isRulesSectionOpen: boolean;
}

export const RulesButton = styled.div<RulesButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  height: 52px;

  ${(p) =>
    !p.isRulesSectionOpen &&
    `border-bottom-left-radius: ${p.theme.radius.sm};
    border-bottom-right-radius: ${p.theme.radius.sm};
    `}
`;

export const StyledButton = styled(Button)`
  padding: ${(p) => p.theme.spacing.xs};
`;

export const StyledRules = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.grey[30]};
`;