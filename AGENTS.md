# AGENTS.md — `@codexporer.io/expo-action-sheet`

## Package Overview
Theme-aware action sheet wrapper around `@expo/react-native-action-sheet` integrating dynamically with `@codexporer.io/expo-app-theme` and `react-native-safe-area-context`.

## Key Exports
- `ActionSheetProvider`: Context provider pre-configured with custom sheet mode and safe area handling.
- `useActionSheet()`: Hook returning `{ showActionSheetWithOptions }`.

## Critical Guidelines for AI Agents
- **Provider Mounting**: Mount `<ActionSheetProvider>` near the root of the app, wrapping the screen hierarchy.
- **Theme Color Injections**: Do NOT pass hardcoded hex values to `tintColor`, `containerStyle`, or `textStyle`. Theme tokens (`surface`, `primary`, `text`, `danger`) are automatically applied by default.
- **Dynamic Icons**: When rendering icons, use the `icons: ({ tintColor }) => [...]` callback function so icons match the resolved action sheet tint automatically.
- **Always Provide `cancelButtonIndex`**: Always specify `cancelButtonIndex` in options to allow safe dismissal on iOS backdrop tap and Android back button press.
- **Destructive Index**: When providing delete or reset actions, set `destructiveButtonIndex` to automatically apply the theme's danger color.
