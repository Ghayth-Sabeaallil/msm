import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SwitchScreen() {
    return (
        <ParallaxScrollView>
            <ThemedView style={styles.Container}>
                <ThemedText type="title">Accounts</ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
        gap: 8,
    },
});
