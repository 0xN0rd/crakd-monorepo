import styled from 'styled-components';
import { SettingsSelectProps } from './SettingsSelect';

export const SelectElement = styled.select`
  outline: none;
  appearance: none;
  background: transparent;
  text-overflow: ellipsis;
  padding-top: ${(p) => p.theme.spacing.xs};
  padding-bottom: ${(p) => p.theme.spacing.xs};
  padding-left: ${(p) => p.theme.spacing.xs};
  padding-right: ${(p) => p.theme.spacing.lg};
  background-repeat: no-repeat;
  background-size: 7px 7px, 7px 7px, 0.8em 0.8em;
  background-image: linear-gradient(45deg, transparent 50%, grey 50%),
    linear-gradient(135deg, grey 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 13px) calc(1em + 2px), 100% 0;
  font-size: ${(p) => p.theme.font.size.xs};
  color: #ffffff;
  border-radius: ${(p) => p.theme.radius.sm};
  border-color: ${(p) => p.theme.colors.grey[30]};
`;

export const SettingsSelectElement = styled.select<SettingsSelectProps>`
  outline: none;
  appearance: none;
  background: transparent;
  text-overflow: ellipsis;
  padding-top: ${(p) => p.theme.spacing.xs};
  padding-bottom: ${(p) => p.theme.spacing.xs};
  padding-left: ${(p) => p.theme.spacing.xs};
  padding-right: ${(p) => p.theme.spacing.lg};
  background-repeat: no-repeat;
  background-size: 7px 7px, 7px 7px, 0.8em 0.8em;
  background-image: linear-gradient(45deg, transparent 50%, grey 50%),
    linear-gradient(135deg, grey 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 13px) calc(1em + 2px), 100% 0;
  font-size: ${(p) => p.theme.font.size.xs};
  color: #ffffff;
  border-radius: ${(p) => p.theme.radius.sm};
  border-color: ${(p) => p.theme.colors.grey[30]};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.grey[90]};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

export const Description = styled.p`
  color: ${(p) => p.theme.colors.general.textSecondary};
  margin-top: 0;
  margin-bottom: ${(p) => p.theme.spacing.xs};
`;

export const Error = styled.div`
  color: ${(p) => p.theme.colors.general.error};
  margin-bottom: ${(p) => p.theme.spacing.xs};
`;
