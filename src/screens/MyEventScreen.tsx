import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function MyEventScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const snap = await getDocs(collection(db, 'events'));
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEvents(arr);
    } catch (err) {
      console.log('fetch events error', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay eventos aún.</Text>}
      />
    </View>
  );
}
