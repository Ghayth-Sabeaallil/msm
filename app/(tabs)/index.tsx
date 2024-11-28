import { ScrollView, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import data from '../../lib/db.json';
import { PostView } from '@/components/PostView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.Container}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>
      <ScrollView style={styles.scroll}>
        {data.posts.map((post) => (post && <PostView id={post.id} title={post.title} des={post.description} date={post.date} time={post.time} creator={post.creator} />))}
      </ScrollView>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  scroll: {
    gap: 15,
  }, Container: {
    flexDirection: 'column',
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});

