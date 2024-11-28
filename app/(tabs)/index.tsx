import { ScrollView, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import data from '../../lib/db.json';
import { PostView } from '@/components/PostView';

export default function HomeScreen() {
  const getImg = (creator: string): string | undefined => {
    const user = data.users.find(user => user.username === creator);
    return user?.img;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.Container}>
        <ThemedText type="title">All Posts</ThemedText>
      </ThemedView>
      <ScrollView style={styles.scroll}>
        {data.posts.map((post) => (post && <PostView key={post.id} id={post.id} title={post.title} des={post.description} date={post.date} time={post.time} creator={post.creator} img={getImg(post.creator)} session={data.session.user} />))}
      </ScrollView>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  scroll: {
    display: "flex",
    gap: 15,
  }, Container: {
    flexDirection: 'column',
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});

