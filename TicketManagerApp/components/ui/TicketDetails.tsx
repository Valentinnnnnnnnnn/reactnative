import { BackTo } from '@/components/buttons/BackTo'
import { createComment, getCommentsByTicketId } from '@/services/db'
import { TicketType } from '@/types/ticket'
import { AuthContext } from '@/utils/AuthProvider'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export function TicketDetails({ ticketData }: { ticketData: TicketType }) {
  const userId = useContext(AuthContext).user?.email
  const [isPosting, setIsPosting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')

  const router = useRouter()

  const handleEdit = () => {
    router.push(`/(tickets)/${ticketData.id}/edit`)
  }

  const handleDelete = () => {}

  const handleAddComment = async () => {
    setIsPosting(true)
    if (!newComment.trim()) {
      alert('Comment cannot be empty.')
      setIsPosting(false)
      return
    }

    try {
      await createComment({
        ticketId: ticketData.id,
        content: newComment,
        userId: userId || 'Anonymous',
      })
      setNewComment('')
      setComments((prevComments) => [
        {
          id: Date.now().toString(),
          content: newComment,
          userId: userId,
          createdAt: new Date(),
        },
        ...prevComments,
      ])
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Error adding comment. Please try again later.')
    }
    setIsPosting(false)
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await getCommentsByTicketId({
          id: ticketData.id,
        })
        setComments(fetchedComments)
      } catch (error) {
        console.error('Error fetching comments:', error)
        alert('Error fetching comments. Please try again later.')
      }
    }
    setIsLoading(true)
    fetchComments()
    setIsLoading(false)
  }, [ticketData])

  if (isLoading) {
    return (
      <>
        <BackTo />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={{ marginTop: '80%', alignItems: 'center' }}
          />
        </ScrollView>
      </>
    )
  }

  return (
    <>
      <BackTo />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{ticketData.title}</Text>
          <View style={styles.statusBadge}></View>
          <Text style={styles.statusText}>{ticketData.status}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="information-circle" size={20} color="#555" />
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailText}>{ticketData.description}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="flag" size={20} color="#555" />
          <Text style={styles.detailLabel}>Priority:</Text>
          <Text
            style={[
              styles.detailText,
              ticketData.priority === 'high'
                ? styles.highPriority
                : ticketData.priority === 'medium'
                  ? styles.mediumPriority
                  : styles.lowPriority,
            ]}
          >
            {ticketData.priority}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="folder" size={20} color="#555" />
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailText}>{ticketData.category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person" size={20} color="#555" />
          <Text style={styles.detailLabel}>Created by:</Text>
          <Text style={styles.detailText}>{ticketData.createdBy}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={20} color="#555" />
          <Text style={styles.detailLabel}>Created at:</Text>
          <Text style={styles.detailText}>
            {ticketData.createdAt
              ? //@ts-ignore
                ticketData.createdAt.toDate().toLocaleString()
              : 'N/A'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time" size={20} color="#555" />
          <Text style={styles.detailLabel}>Updated at:</Text>
          <Text style={styles.detailText}>
            {ticketData.updatedAt
              ? //@ts-ignore
                ticketData.updatedAt.toDate().toLocaleString()
              : 'N/A'}
          </Text>
        </View>

        {ticketData.assignedTo && (
          <View style={styles.detailRow}>
            <Ionicons name="person-add" size={20} color="#555" />
            <Text style={styles.detailLabel}>Assigned to:</Text>
            <Text style={styles.detailText}>{ticketData.assignedTo}</Text>
          </View>
        )}

        {ticketData.dueDate && (
          <View style={styles.detailRow}>
            <Ionicons name="alarm" size={20} color="#555" />
            <Text style={styles.detailLabel}>Due Date:</Text>
            <Text style={styles.detailText}>
              {
                //@ts-ignore
                ticketData.dueDate.toDate().toLocaleString()
              }
            </Text>
          </View>
        )}

        {ticketData.location && (
          <View style={styles.detailRow}>
            <Ionicons name="location" size={20} color="#555" />
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailText}>{ticketData.location}</Text>
          </View>
        )}

        {ticketData.deviceInfo && (
          <View style={styles.detailRow}>
            <Ionicons name="hardware-chip" size={20} color="#555" />
            <Text style={styles.detailLabel}>Device Info:</Text>
            <Text style={styles.detailText} numberOfLines={2}>
              {JSON.stringify(ticketData.deviceInfo)}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="create" size={18} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={18} color="white" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Comments</Text>
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Enter your comment"
              multiline
              editable={!isPosting}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddComment}
              disabled={isPosting}
            >
              <Ionicons name="send" size={18} color="white" />
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {comments.length > 0 ? (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.content}</Text>
                  <Text style={styles.commentDate}>
                    {`${item.userId} - ${new Date(item.createdAt)
                      .toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                      .replace(/^[a-z]/, (match) =>
                        match.toUpperCase()
                      )} ${new Date(item.createdAt).toLocaleTimeString(
                      'fr-FR',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}`}
                  </Text>
                </View>
              )}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.noComments}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#aaa"
              />
              <Text style={styles.noCommentsText}>No comments yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginVertical: 8,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1c1c1e',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#555',
    marginLeft: 8,
    marginRight: 6,
  },
  detailText: {
    flex: 1,
    color: '#333',
  },
  highPriority: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  mediumPriority: {
    color: '#FB8C00',
    fontWeight: 'bold',
  },
  lowPriority: {
    color: '#43A047',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
  commentInput: {
    marginBottom: 16,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comment: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f2f5',
    marginBottom: 12,
  },
  commentText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  noComments: {
    alignItems: 'center',
    paddingVertical: 24,
    opacity: 0.7,
  },
  noCommentsText: {
    marginTop: 8,
    color: '#888',
    fontSize: 16,
  },
})
