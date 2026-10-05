# `@codexporer.io/expo-action-sheet`

A customizable, theme-aware action sheet wrapper for React Native and Expo applications with automatic light/dark mode adaptation, safe area inset handling, semantic styling, dynamic icon tinting, and seamless integration with `@codexporer.io/expo-app-theme`.

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/expo-action-sheet
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)
- `@codexporer.io/expo-app-theme` (`*`)
- `@expo/react-native-action-sheet` (`*`)
- `react-native-safe-area-context` (`*`)

## Quick Start

### 1. Wrap your application with `ActionSheetProvider`

The exported `ActionSheetProvider` comes pre-configured with `useCustomActionSheet` enabled for cross-platform theme styling:

```tsx
import React from 'react';
import { ActionSheetProvider } from '@codexporer.io/expo-action-sheet';
import { AppThemeProvider } from '@photo-glide-frontend/app-theme';
import { MainScreen } from './MainScreen';

export function App() {
  return (
    <ActionSheetProvider>
      <AppThemeProvider>
        <MainScreen />
      </AppThemeProvider>
    </ActionSheetProvider>
  );
}
```

### 2. Invoke `useActionSheet` in your components

The `icons` option accepts a render callback function receiving `{ tintColor }`, matching the active action sheet theme tint automatically:

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useActionSheet } from '@codexporer.io/expo-action-sheet';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export function MediaSelector() {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleOpenActionSheet = () => {
    const options = ['Choose from Library', 'Take a Photo', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        title: 'Select Photo',
        options,
        cancelButtonIndex,
        icons: ({ tintColor }) => [
          <MaterialIcons key="library" name="photo-library" size={24} color={tintColor} />,
          <MaterialIcons key="camera" name="photo-camera" size={24} color={tintColor} />,
          <AntDesign key="cancel" name="close-circle" size={24} color={tintColor} />
        ]
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // Choose from Library
        } else if (buttonIndex === 1) {
          // Take Photo
        }
      }
    );
  };

  return (
    <View>
      <Button title="Open Action Sheet" onPress={handleOpenActionSheet} />
    </View>
  );
}
```

## Theming & Automatic Styling

`useActionSheet` automatically queries the active theme from `useAppTheme()` and safe area bottom insets from `useSafeAreaInsets()`. Injected theme defaults include:

- **Surface Background**: `containerStyle.backgroundColor` defaults to `theme.surface` (adapts seamlessly between light and dark modes).
- **Safe Area Insets**: `containerStyle.paddingBottom` defaults to `insets.bottom`.
- **Title Styling**: `titleTextStyle` defaults to `{ color: theme.text, fontWeight: '600' }`.
- **Message Styling**: `messageTextStyle` defaults to `{ color: theme.placeholder }`.
- **Option Text Styling**: `textStyle` defaults to `{ color: theme.text }`.
- **Separators**: `showSeparators` defaults to `true` with `separatorStyle.backgroundColor` set to `theme.surfaceSecondary`.
- **Action Tint**: `tintColor` defaults to `theme.primary`.
- **Dynamic Icons**: `icons` render callback receives `{ tintColor }`, removing the need for callers to manually import or query theme hooks for icon colors.
- **Cancel Button Tint**: `cancelButtonTintColor` defaults to `theme.primary`.
- **Destructive Button Tint**: `destructiveColor` defaults to `theme.danger`.
- **iOS Interface Style**: `userInterfaceStyle` defaults to `theme.variant` (`'light' | 'dark'`).

All defaults can be selectively overridden by passing corresponding fields into `options`.

## Options Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `string[]` | *Required* | List of action sheet button labels |
| `title` | `string` | — | Header title displayed at the top of the action sheet |
| `message` | `string` | — | Descriptive message text below the title |
| `icons` | `({ tintColor }: { tintColor?: string }) => ReactNode[]` | — | Render callback providing calculated `tintColor` and returning icons for each option |
| `cancelButtonIndex` | `number` | — | Index of the cancel option in `options` |
| `destructiveButtonIndex` | `number \| number[]` | — | Index or indices of destructive actions (e.g. delete) |
| `tintColor` | `string` | `theme.primary` | Color for active option text and icon tint |
| `cancelButtonTintColor` | `string` | `theme.primary` | Text color for the cancel button |
| `destructiveColor` | `string` | `theme.danger` | Color for destructive button actions |
| `showSeparators` | `boolean` | `true` | Whether to display dividers between option rows |
| `containerStyle` | `StyleProp<ViewStyle>` | `{ backgroundColor: theme.surface, paddingBottom: insets.bottom }` | Style override for the action sheet container |
| `separatorStyle` | `StyleProp<ViewStyle>` | `{ backgroundColor: theme.surfaceSecondary }` | Style override for row separator lines |
| `titleTextStyle` | `StyleProp<TextStyle>` | `{ color: theme.text, fontWeight: '600' }` | Style override for the title text |
| `messageTextStyle` | `StyleProp<TextStyle>` | `{ color: theme.placeholder }` | Style override for the message text |
| `textStyle` | `StyleProp<TextStyle>` | `{ color: theme.text }` | Style override for option row text labels |
| `userInterfaceStyle` | `'light' \| 'dark'` | `theme.variant` | Native iOS appearance mode override |

## License

MIT