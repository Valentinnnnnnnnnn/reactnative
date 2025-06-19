/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'
import { TicketType } from '../types/ticket'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}

export const statusColors: Record<TicketType['status'], string> = {
  new: '#4A90E2',
  assigned: '#F5A623',
  'in-progress': '#9013FE',
  resolved: '#7ED321',
  closed: '#9B9B9B',
}

export const priorityColors: Record<TicketType['priority'], string> = {
  low: '#7ED321',
  medium: '#4A90E2',
  high: '#F5A623',
  critical: '#D0021B',
}

export const categoryColors: Record<TicketType['category'], string> = {
  hardware: '#D0021B',
  software: '#4A90E2',
  network: '#7ED321',
  access: '#9013FE',
  other: '#9B9B9B',
}