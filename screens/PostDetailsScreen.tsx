import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { FontAwesome } from '@expo/vector-icons';
import usePost, { Post, Comment } from '../hooks/usePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetails'>;

export default function PostDetailsScreen({ route }: Props) {
  const { postId } = route.params;
  const { post, comments, loading, error, fetchPost, fetchComments } = usePost(postId);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleLike = useCallback(async () => {
    setLikeLoading(true);
    const token = await AsyncStorage.getItem('token');
    await fetch(`${API_BASE_URL}posts/${postId}/like`, {
      method: 'POST',
      headers: { 'x-auth-token': token as string }
    });
    fetchPost();
    setLikeLoading(false);
  }, [postId, fetchPost]);

  const handleUnlike = useCallback(async () => {
    setLikeLoading(true);
    const token = await AsyncStorage.getItem('token');
    await fetch(`${API_BASE_URL}posts/${postId}/like`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token as string }
    });
    fetchPost();
    setLikeLoading(false);
  }, [postId, fetchPost]);

  const handleAddComment = useCallback(async () => {
    if (!commentText.trim()) return;
    setCommentLoading(true);
    const token = await AsyncStorage.getItem('token');
    await fetch(`${API_BASE_URL}posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'x-auth-token': token as string, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentText })
    });
    setCommentText('');
    setCommentModal(false);
    fetchComments();
    setCommentLoading(false);
  }, [commentText, postId, fetchComments]);

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Post Details" />
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</Text>
      </View>
    );
  }
  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (!post) {
    return (
      <View style={styles.container}>
        <Header title="Post Details" />
        <Text style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>Post not found or invalid.</Text>
      </View>
    );
  }

  const liked = post.likes && post.likes.includes(post.currentUserId); // You may need to adjust this logic

  return (
    <ScrollView style={styles.container}>
      <Header title="Post Details" />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>By {post.author?.name || 'Unknown'} • {new Date(post.createdAt).toLocaleString()}</Text>
      <Text style={styles.description}>{post.content}</Text>
      <View style={styles.meta}>
        <TouchableOpacity onPress={liked ? handleUnlike : handleLike} disabled={likeLoading} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="heart" size={20} color={liked ? '#e63946' : '#ccc'} />
          <Text style={styles.metaText}>{post.likes?.length || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCommentModal(true)} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
          <FontAwesome name="comment" size={20} color="#457b9d" />
          <Text style={styles.metaText}>{comments.length}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.commentsTitle}>Comments</Text>
      {comments.map((item: Comment) => (
        <View key={item.id} style={styles.commentCard}>
            <Text style={styles.commentAuthor}>{item.author?.name || 'Unknown'}</Text>
            <Text style={styles.commentText}>{item.content}</Text>
            <Text style={styles.commentTime}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      ))}
      {comments.length === 0 && <Text style={{ color: '#888', textAlign: 'center' }}>No comments yet.</Text>}
      <Modal visible={commentModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Comment</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Write your comment..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
            />
            <Button title={commentLoading ? 'Adding...' : 'Add Comment'} onPress={handleAddComment} disabled={commentLoading} />
            <Button title="Cancel" onPress={() => setCommentModal(false)} color="#888" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  author: { fontSize: 14, color: '#888', marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 12 },
  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  metaText: { marginLeft: 6, fontSize: 16 },
  commentsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  commentCard: { backgroundColor: '#f8f9fa', borderRadius: 6, padding: 10, marginBottom: 10 },
  commentAuthor: { fontWeight: 'bold', color: '#22223b' },
  commentText: { fontSize: 15, marginVertical: 2 },
  commentTime: { fontSize: 12, color: '#888' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: 20, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12, minHeight: 60 },
});
