import React, { useCallback, useMemo, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFeed from '../hooks/useFeed';

export default function FeedScreen({ navigation }) {
  const { posts, loading, error, fetchPosts, refresh, hasMore } = useFeed();

  useEffect(() => {
    fetchPosts(true); // Initial load
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [posts]);

  const onRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  const onEndReached = useCallback(() => {
    if (!loading && hasMore) fetchPosts();
  }, [loading, hasMore, fetchPosts]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.postCard} onPress={() => navigation.navigate('PostDetails', { postId: item._id })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>By {item.author?.name || 'Unknown'}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.meta}>
        <FontAwesome name="heart" size={16} color="#e63946" />
        <Text style={styles.metaText}>{item.likes?.length || 0}</Text>
        <FontAwesome name="comment" size={16} color="#457b9d" style={{ marginLeft: 10 }} />
        <Text style={styles.metaText}>{item.commentsCount || 0}</Text>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <Header title="Feed" />
      {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
      <FlatList
        data={sortedPosts}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && hasMore ? <ActivityIndicator size="small" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContent: { padding: 16 },
  postCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  author: { fontSize: 14, color: '#888', marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 8 },
  meta: { flexDirection: 'row', alignItems: 'center' },
  metaText: { marginLeft: 4, marginRight: 8, fontSize: 14 },
});
