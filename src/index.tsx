import React, { useCallback } from 'react';
import {
    useActionSheet as useOriginalActionSheet,
    ActionSheetOptions as OriginalActionSheetOptions
} from '@expo/react-native-action-sheet';
import { useAppTheme } from '@codexporer.io/expo-app-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionSheetProvider as OriginalActionSheetProvider } from '@expo/react-native-action-sheet';

type ActionSheetCallback = (i?: number) => void | Promise<void>;

type ActionSheetOptions = OriginalActionSheetOptions & {
    icons?: ({ tintColor }: { tintColor: string }) => React.ReactNode[]
};

export const ActionSheetProvider = ({ children }: { children: React.ReactNode; }) => {
    return (
        <OriginalActionSheetProvider useCustomActionSheet>
            {children}
        </OriginalActionSheetProvider>
    );
};

export const useActionSheet = () => {
    const { showActionSheetWithOptions: originalShowActionSheetWithOptions } = useOriginalActionSheet();
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();

    const showActionSheetWithOptions = useCallback(
        (options: ActionSheetOptions, callback: ActionSheetCallback) => {
            const {
                containerStyle,
                titleTextStyle,
                messageTextStyle,
                textStyle,
                separatorStyle,
                icons,
                ...restOptions
            } = options;

            const tintColor = theme.primary;

            return originalShowActionSheetWithOptions(
                {
                    userInterfaceStyle: theme.variant,
                    tintColor,
                    cancelButtonTintColor: theme.primary,
                    destructiveColor: theme.danger,
                    showSeparators: true,
                    ...restOptions,
                    containerStyle: {
                        backgroundColor: theme.surface,
                        paddingBottom: insets.bottom,
                        ...containerStyle
                    },
                    titleTextStyle: {
                        color: theme.text,
                        fontWeight: '600',
                        ...titleTextStyle
                    },
                    messageTextStyle: {
                        color: theme.placeholder,
                        ...messageTextStyle
                    },
                    textStyle: {
                        color: theme.text,
                        ...textStyle
                    },
                    separatorStyle: {
                        backgroundColor: theme.surfaceSecondary,
                        ...separatorStyle
                    },
                    icons: icons ? icons({ tintColor }) : undefined
                },
                callback
            );
        },
        [originalShowActionSheetWithOptions, theme, insets]
    );

    return {
        showActionSheetWithOptions
    };
};
