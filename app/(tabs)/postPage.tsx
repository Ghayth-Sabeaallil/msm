import { ScrollView, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PostModal } from '@/components/PostModal';
import data from '../../lib/db.json';
import { PostView } from '@/components/PostView';

export default function TabTwoScreen() {
  const creator = data.session.user;
  const posts = data.posts.filter(user => user.creator === creator);
  const getImg = (creator: string): string | undefined => {
    const user = data.users.find(user => user.username === creator);
    return user?.img;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.Container}>
        <ThemedText type="title">My Posts</ThemedText>
      </ThemedView>
      <PostModal />
      <ScrollView style={styles.scroll}>
        {posts.map((post) => (post && <PostView key={post.id} id={post.id} title={post.title} des={post.description} date={post.date} time={post.time} creator={post.creator} img={getImg(post.creator)} session={data.session.user} likes={post.likes} comments={post.comments} />))}
      </ScrollView>
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
  scroll: {
    gap: 15,
  },
});
