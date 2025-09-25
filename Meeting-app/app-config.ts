import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'StandIn.ai',
  pageTitle: 'StandIn.ai',
  pageDescription: 'A voice agent built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/standin-logo.svg',
  accent: '#002cf2',
  logoDark: '/standin-logo-dark.svg',
  accentDark: '#52e2a6',
  startButtonText: 'Join call',

  agentName: undefined,
};
