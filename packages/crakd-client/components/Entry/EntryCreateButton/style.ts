import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
  background-color: transparent;
  margin-bottom: ${(p) => p.theme.spacing.sm};
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

export const Container = styled.div`
  border-radius: ${(p) => p.theme.radius.md};
  background-color: transparent;
  height: 40px;
  justify-content: center;
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: bold;
  width: 100%;
  line-height: 40px;
  cursor: pointer;
  transition: background-color 0.1s;
`;
