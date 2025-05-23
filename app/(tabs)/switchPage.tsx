import { ScrollView, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UserModal } from '@/components/UserModal'
import { Cards } from '@/components/Cards';
import data from '../../lib/db.json';


export default function SwitchScreen() {
    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
            <ThemedView style={styles.Container}>
                <ThemedText type="title">Accounts</ThemedText>
            </ThemedView>
            <UserModal />
            <ScrollView style={styles.scroll}>
                {data.users.map((user) => (user && <Cards sessionUser={data.session.user} key={user.id} id={user.id} emails={user.email} img={user.img} name={user.username} />))}
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
