import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Modals } from '@/components/Modals'

export default function SwitchScreen() {
    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
            <ThemedView style={styles.Container}>
                <ThemedText type="title">Accounts</ThemedText>
            </ThemedView>
            <Modals />
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
