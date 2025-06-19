import { createTicket, updateTicket } from '@/services/db'
import { categoryType, priorityType, statusType } from '@/types/ticket'
import { TicketFormProps } from '@/types/ticketForm'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { SubmitTicket } from '../buttons/SubmitTicket'

export function TicketForm({ editMode = false, initialData }: TicketFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [priority, setPriority] = useState<priorityType>(
    initialData?.priority || 'low'
  )
  const [category, setCategory] = useState<categoryType>(
    initialData?.category || 'hardware'
  )
  const [dueDate, setDueDate] = useState<Date>(
    initialData?.dueDate
      ? //@ts-ignore
        new Date(initialData.dueDate.toDate())
      : new Date(new Date().setDate(new Date().getDate() + 7))
  )
  const [location, setLocation] = useState(initialData?.location || '')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showPrioritySelector, setShowPrioritySelector] = useState(false)
  const [showCategorySelector, setShowCategorySelector] = useState(false)
  const [showStatusSelector, setShowStatusSelector] = useState(false)
  const [status, setStatus] = useState<statusType>(initialData?.status || 'new')
  const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || '')
  const [deviceInfo, setDeviceInfo] = useState(initialData?.deviceInfo || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function resetData() {
    setTitle('')
    setDescription('')
    setPriority('low')
    setCategory('hardware')
    setDueDate(new Date())
    setLocation('')
    setAssignedTo('')
    setDeviceInfo('')
    setStatus('new')
  }

  async function handleSubmit(): Promise<void> {
    setLoading(true)
    setError('')

    if (!title.trim() || !description.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.')
      setLoading(false)
      return
    }

    const ticketData = {
      title,
      description,
      priority,
      category,
      dueDate: dueDate,
      location,
      status,
      assignedTo,
      deviceInfo,
    }

    try {
      if (editMode) {
        //@ts-ignore
        await updateTicket({ ticketData, id: initialData?.id })
      } else {
        //@ts-ignore
        await createTicket({ ticketData })
      }
    } catch (err) {
      console.log('Error creating/updating ticket:' + err)
      setError('Une erreur est survenue lors de la soumission du ticket.' + err)
      setLoading(false)
      alert(err)
      return
    }
    resetData()
    alert(
      editMode ? 'Ticket mis à jour avec succès !' : 'Ticket créé avec succès !'
    )
    if (editMode) {
      router.back()
    }
    setLoading(false)
  }

  const getPriorityColor = () => {
    switch (priority) {
      case 'critical':
        return '#FF4444'
      case 'high':
        return '#FF8800'
      case 'medium':
        return '#FFBB33'
      case 'low':
        return '#00AA00'
      default:
        return '#666'
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.header}>
          {editMode ? 'Edit Ticket' : 'Create New Ticket'}
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter ticket title"
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the issue in detail"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
            placeholderTextColor="#999"
            textAlignVertical="top"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Priority *</Text>
          <TouchableOpacity
            style={[
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
            onPress={() => setShowPrioritySelector(true)}
          >
            <Text style={{ color: getPriorityColor(), fontSize: 16 }}>
              {priority}
            </Text>
            <Text style={{ fontSize: 18, color: '#999' }}>{'\u25BE'}</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showPrioritySelector} transparent animationType="fade">
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowPrioritySelector(false)}
          >
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 'auto',
                backgroundColor: '#f5f5f5',
                borderRadius: 12,
                padding: 15,
              }}
            >
              {(['low', 'medium', 'high', 'critical'] as priorityType[]).map(
                (level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => {
                      setPriority(level)
                      setShowPrioritySelector(false)
                    }}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          level === 'critical'
                            ? '#FF4444'
                            : level === 'high'
                              ? '#FF8800'
                              : level === 'medium'
                                ? '#FFBB33'
                                : '#00AA00',
                      }}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category *</Text>
          <TouchableOpacity
            style={[
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
            onPress={() => setShowCategorySelector(true)}
          >
            <Text style={{ fontSize: 16, color: '#2c3e50' }}>{category}</Text>
            <Text style={{ fontSize: 18, color: '#999' }}>{'\u25BE'}</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showCategorySelector} transparent animationType="fade">
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowCategorySelector(false)}
          >
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 'auto',
                backgroundColor: '#f5f5f5',
                borderRadius: 12,
                padding: 15,
              }}
            >
              {(
                [
                  'hardware',
                  'software',
                  'network',
                  'access',
                  'other',
                ] as categoryType[]
              ).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setCategory(cat)
                    setShowCategorySelector(false)
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16, color: '#2c3e50' }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={[styles.input, styles.dateButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={dueDate ? styles.dateText : styles.placeholderText}>
              {dueDate
                ? `📅 ${dueDate.toLocaleDateString()}`
                : 'Select Due Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={dueDate || new Date()}
            onConfirm={(date) => {
              setDueDate(date)
              setShowDatePicker(false)
            }}
            onCancel={() => setShowDatePicker(false)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location {!editMode && '(optional)'}</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Room, building, or department"
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        {editMode && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Status *</Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}
                onPress={() => setShowStatusSelector(true)}
              >
                <Text style={{ fontSize: 16, color: '#2c3e50' }}>{status}</Text>
                <Text style={{ fontSize: 18, color: '#999' }}>{'\u25BE'}</Text>
              </TouchableOpacity>
              <Modal
                visible={showStatusSelector}
                transparent
                animationType="fade"
              >
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={() => setShowStatusSelector(false)}
                >
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginVertical: 'auto',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 12,
                      padding: 15,
                    }}
                  >
                    {(
                      [
                        'new',
                        'assigned',
                        'in-progress',
                        'resolved',
                        'closed',
                      ] as const
                    ).map((s) => (
                      <TouchableOpacity
                        key={s}
                        onPress={() => {
                          setStatus(s)
                          setShowStatusSelector(false)
                        }}
                        style={{ paddingVertical: 10 }}
                      >
                        <Text style={{ fontSize: 16, color: '#2c3e50' }}>
                          {s}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Assigned To (optional)</Text>
              <TextInput
                value={assignedTo}
                onChangeText={setAssignedTo}
                placeholder="Enter user ID"
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
            {false && ( // pas encore implémenté
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Device Info (optional)</Text>
                <TextInput
                  value={deviceInfo}
                  onChangeText={setDeviceInfo}
                  placeholder="Enter device information"
                  multiline
                  numberOfLines={3}
                  style={[styles.input, styles.textArea]}
                  placeholderTextColor="#999"
                  textAlignVertical="top"
                />
              </View>
            )}
          </>
        )}
        {loading ? (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <SubmitTicket handleSubmit={handleSubmit} editMode={editMode} />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
})
