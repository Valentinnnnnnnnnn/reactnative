import { BackTo } from '@/components/buttons/BackTo'
import { TicketType } from '@/types/ticket'
import React, { useEffect, useState } from 'react'
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export function TicketDetails({ ticketData }: { ticketData: TicketType }) {
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')

  const handleEdit = () => {
    // handle edit logic
  }

  const handleDelete = () => {
    // handle delete logic
  }

  const handleAddComment = () => {
    // add comment logic
  }

  useEffect(() => {
    // fetch comments logic using your db service
  }, [])

  return (
    <View style={styles.container}>
      <BackTo />
      <Text style={styles.title}>{ticketData.title}</Text>
      <Text>Description: {ticketData.description}</Text>
      <Text>Status: {ticketData.status}</Text>
      <Text>Priority: {ticketData.priority}</Text>
      <Text>Category: {ticketData.category}</Text>
      <Text>Created by: {ticketData.createdBy}</Text>
      <Text>
        Created at:{' '}
        {ticketData.createdAt
          ? //@ts-ignore
            ticketData.createdAt.toDate().toLocaleString()
          : 'N/A'}
      </Text>
      <Text>
        Updated at:{' '}
        {ticketData.updatedAt
          ? //@ts-ignore
            ticketData.updatedAt.toDate().toLocaleString()
          : 'N/A'}
      </Text>
      {ticketData.assignedTo && (
        <Text>Assigned to: {ticketData.assignedTo}</Text>
      )}
      {ticketData.dueDate && (
        //@ts-ignore
        <Text>Due Date: {ticketData.dueDate.toDate().toLocaleString()}</Text>
      )}
      {ticketData.location && <Text>Location: {ticketData.location}</Text>}
      {ticketData.deviceInfo && (
        <Text>Device Info: {JSON.stringify(ticketData.deviceInfo)}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={handleEdit} />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>

      <View style={styles.commentSection}>
        <Text>Add Comment:</Text>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Enter your comment"
        />
        <Button title="Submit Comment" onPress={handleAddComment} />
      </View>

      <View style={styles.commentsList}>
        <Text>Comments:</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text>{item.text}</Text>
              <Text style={styles.commentDate}>
                {item.createdAt.toDate().toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 4,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  commentSection: {
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  commentsList: {
    marginVertical: 16,
  },
  comment: {
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  commentDate: {
    fontSize: 10,
    color: '#888',
  },
})
