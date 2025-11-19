import React, { ReactNode } from 'react';

export interface FumbleDefinition {
  type: string;
  minTone: number;
  maxTone: number;
  text: string;
  systems?: string[]; // e.g., ['dnd5e', 'pf2e'] or undefined for universal
}

export interface FumbleResult {
  id: number;
  text: string;
  type: string;
  toneValue: number;
}

export interface ThemeConfig {
  id: string;
  fontHeader: string;
  fontBody: string;
  bg: string;
  bgStyle: React.CSSProperties;
  container: string;
  textMain: string;
  textMuted: string;
  input: string;
  button: string;
  accentColor: string;
  icon: ReactNode;
  animation: string;
  thumbBorder: string;
}

export interface ToneLabel {
  label: string;
  icon: ReactNode;
  color: string;
}