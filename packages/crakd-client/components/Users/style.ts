import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => p.theme.colors.general.black};
  padding: ${(p) => p.theme.spacing.sm};
  border-radius: ${(p) => p.theme.radius.sm};
  transition: border-color 0.1s;
  box-shadow: ${(p) => p.theme.shadows.sm};
  cursor: pointer;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${(p) => p.theme.screen.lg};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${(p) => p.theme.spacing.lg};
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InitialLetters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.general.white};
  font-size: ${(p) => p.theme.font.size.xl};
  background-color: ${(p) => p.color};
`;

export const Gamertag = styled.span`
  max-width: 200px;
  font-weight: bold;
  font-size: ${(p) => p.theme.font.size.md};
  line-height: 1.4;
`;

export const UserName = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.grey[50]};
  margin-top: 4px;
`;
