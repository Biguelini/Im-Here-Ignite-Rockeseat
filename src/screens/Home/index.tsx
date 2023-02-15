import { useState } from 'react'
import {
    Alert,
    FlatList,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { Participant } from '../../components/Participant'
import { styles } from './styles'

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState('')

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert(
                'Erro ao adicionar',
                'Esse participate já está na lista'
            )
        }
        setParticipants((prevState) => [...prevState, participantName])
        setParticipantName('')
    }
    function handleParticipantRemove(name: string) {
        Alert.alert('Remover', `Você deseja remover ${name}`, [
            {
                text: 'Sim',
                onPress: () => {
                    Alert.alert('Deletado!')
                    setParticipants((prevState) =>
                        prevState.filter((participant) => participant !== name)
                    )
                },
            },
            { text: 'Não', style: 'cancel' },
        ])
    }
    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>
            <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6b6b6b"
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleParticipantAdd}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={participants}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmpty}>
                        Ninguém chegou no evento ainda? Adicione participantes a
                        sua lista de presença.
                    </Text>
                )}
            />
        </View>
    )
}
