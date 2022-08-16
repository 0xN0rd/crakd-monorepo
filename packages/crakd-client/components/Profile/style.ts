import styled from 'styled-components';
import { ProfileLoading } from './Profile';
import { ContainerProps } from '../ui/Container/Container';

interface CoverPhotoProps {
  image?: string;
  isLoading: ProfileLoading;
}

export const CoverPhoto = styled.div<CoverPhotoProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: ${(p) => p.theme.screen.lg};
  margin: 0 auto;
  height: 350px;
  ${(p) =>
    p.isLoading !== ProfileLoading.CoverPicture &&
    `background-image: url(${p.image ? p.image : 'https://bit.ly/3pxODji'}) `};
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: ${(p) => p.theme.radius.md};
  border-bottom-right-radius: ${(p) => p.theme.radius.md};
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

export const CoverLoading = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
`;

export const ProfilePhoto = styled.div`
  margin: 0 auto;
  position: relative;
  height: 119px;
  width: 119px;
  margin-bottom: -50px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.general.black};
  display: flex;
  justify-content: center;
`;

export const ProfileImageWrapper = styled.div`
  position: absolute;
  left: 95px;
  bottom: 15px;
`;

export const CoverImageWrapper = styled.div`
  position: absolute;
  right: ${(p) => p.theme.spacing.xs};
  top: ${(p) => p.theme.spacing.xs};

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    top: auto;
    bottom: ${(p) => p.theme.spacing.xs};
  }
`;

export const Info = styled.div`
  margin-top: ${(p) => p.theme.spacing.xl};
  text-align: center;
`;

export const Actions = styled.div`
  margin-top: ${(p) => p.theme.spacing.xs};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Count = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(p) => p.theme.spacing.sm};
`;

export const ProfileInfoWrapper = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  width: 100%;
  max-width: ${(p) => p.maxWidth && p.theme.screen[p.maxWidth]};
  margin: 0 auto;
  margin-bottom: 8px;
  margin-top: ${(p) => (p.marginTop ? p.theme.spacing[p.marginTop] : 0)};
  padding: ${(p) => p.theme.spacing.sm};

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const ProfileInfo1 = styled.div`
  justify-content: left;
  text-align: left;
  margin-top: ${(p) => p.theme.spacing.md};
  margin-left: 1rem;
  width: 100%;
`;

export const ProfileInfoCard = styled.div`
  display: flex;
  position: relative;
  justify-content: left;
  align-items: left;
  text-align: left;
  grid-gap: 0.5rem;
  width: 50%px;
  height: 24rem;
  background-color: ${(p) => p.theme.colors.general.black};
  border-radius: ${(p) => p.theme.radius.md};
  box-shadow: ${(p) => p.theme.shadows.sm};

  @media (max-width: 800px) {
    width: 100%;
    height: 22rem;
    margin-bottom: 0.5rem;
  }
`;

export const Bold = styled.div`
  font-weight: ${(p) => p.theme.font.weight.bold};
  display: inline-block;
  margin-right: ${(p) => p.theme.spacing.xxs};
`;
