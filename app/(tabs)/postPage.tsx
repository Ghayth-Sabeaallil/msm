import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PostModal } from '@/components/PostModal';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.Container}>
        <ThemedText type="title">My Posts</ThemedText>
      </ThemedView>
      <PostModal />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'column',
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
