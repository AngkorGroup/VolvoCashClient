import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { unit } from 'utils/responsive';
import Img from 'react-native-fast-image';
import { theme } from 'utils/styles';

export default function IconWithBadge({ name, badgeCount, size }: any) {
    return (
        <View style={{ width: size * 1.5, height: size * 1 }}>
            <Img source={name} style={{ width: unit(37), height: unit(30) }} />
            {badgeCount > 0 && (
                <View
                    style={styles.container}
                >
                    <Text style={styles.text}>
                        {badgeCount}
                    </Text>
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: unit(-9),
        top: unit(-6),
        backgroundColor: theme.accent.color,
        borderRadius: unit(6),
        width: unit(16),
        height: unit(16),
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: theme.surface.backgroundColor,
        fontSize: unit(10),
        fontWeight: "bold",
    }
})