---
name: expo-action-sheet
description: Instructions and guidelines for using @codexporer.io/expo-action-sheet (Expo Action Sheet) in React Native and Expo applications.
---

# `@codexporer.io/expo-action-sheet` Skill

## Overview
`@codexporer.io/expo-action-sheet` provides a customizable, theme-aware action sheet wrapper for React Native and Expo applications. It automatically adapts to light and dark themes via `@codexporer.io/expo-app-theme`, handles safe area insets via `react-native-safe-area-context`, and supports dynamic icon tinting.

---

## When to Use
- Presenting contextual options (e.g., photo picker sources, export formats, share sheets).
- Confirmation flows with destructive actions (e.g., delete item, discard draft).
- Bottom sheet style menu selections.

---

## Required Setup

Mount `<ActionSheetProvider>` around your application screens:

```tsx
import React from 'react';
import { ActionSheetProvider } from '@codexporer.io/expo-action-sheet';
import { ThemeProvider, defaultThemeConfig } from '@codexporer.io/expo-app-theme';

export function RootApp() {
  return (
    <ThemeProvider themeConfig={defaultThemeConfig}>
      <ActionSheetProvider>
        <MainNavigation />
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
```

---

## Usage Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { useActionSheet } from '@codexporer.io/expo-action-sheet';
import { Button } from '@codexporer.io/expo-button';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export function MediaSelector() {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleOpenActionSheet = () => {
    const options = ['Choose from Library', 'Take Photo', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        title: 'Select Photo Source',
        options,
        cancelButtonIndex,
        icons: ({ tintColor }) => [
          <MaterialIcons key="lib" name="photo-library" size={24} color={tintColor} />,
          <MaterialIcons key="cam" name="photo-camera" size={24} color={tintColor} />,
          <AntDesign key="cancel" name="close-circle" size={24} color={tintColor} />
        ]
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // Library
        } else if (buttonIndex === 1) {
          // Camera
        }
      }
    );
  };

  return <Button title="Select Photo" onPress={handleOpenActionSheet} />;
}
```

---

## API Reference

### `useActionSheet()`
Returns `{ showActionSheetWithOptions }`.

#### `showActionSheetWithOptions(options, callback)`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `string[]` | *Required* | List of action sheet button labels |
| `title` | `string` | — | Header title displayed at top |
| `message` | `string` | — | Subtitle or descriptive message text |
| `icons` | `({ tintColor }: { tintColor?: string }) => ReactNode[]` | — | Render callback providing theme tint and returning icons |
| `cancelButtonIndex` | `number` | — | Index of cancel button in `options` |
| `destructiveButtonIndex` | `number \| number[]` | — | Index or indices of destructive actions (e.g. Delete) |
| `tintColor` | `string` | `theme.primary` | Color for active option text and icon tint |
| `cancelButtonTintColor` | `string` | `theme.primary` | Text color for the cancel button |
| `destructiveColor` | `string` | `theme.danger` | Color for destructive button actions |
| `showSeparators` | `boolean` | `true` | Whether to display dividers between rows |
| `containerStyle` | `StyleProp<ViewStyle>` | `{ backgroundColor: theme.surface, paddingBottom: insets.bottom }` | Container style override |
| `separatorStyle` | `StyleProp<ViewStyle>` | `{ backgroundColor: theme.surfaceSecondary }` | Row separator style override |
| `titleTextStyle` | `StyleProp<TextStyle>` | `{ color: theme.text, fontWeight: '600' }` | Header title style override |
| `messageTextStyle` | `StyleProp<TextStyle>` | `{ color: theme.placeholder }` | Message description style override |
| `textStyle` | `StyleProp<TextStyle>` | `{ color: theme.text }` | Option row text label style override |
| `userInterfaceStyle` | `'light' \| 'dark'` | `theme.variant` | Native iOS appearance mode override |

---

## Critical Rules & Guidelines

1. **Mount Provider Once**: Ensure `<ActionSheetProvider>` wraps screens.
2. **Dynamic Theming**: Never pass hardcoded color literals for tints or background styles; all defaults automatically sync with `useAppTheme()`.
3. **Always Include `cancelButtonIndex`**: Prevents broken back gestures on Android and backdrop dismissals on iOS.
