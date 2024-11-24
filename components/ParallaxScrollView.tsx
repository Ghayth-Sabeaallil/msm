import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';



type Props = PropsWithChildren<{
  children: React.ReactNode,
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
}: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
