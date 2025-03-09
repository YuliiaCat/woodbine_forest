import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { setTreeData } from '../redux/forest/slice';
import { fonts } from '../constants/fonts';
import SearchIcon from '../assets/icons/SearchIcon';
import { colors } from '../constants/colors';

interface IMap {
  location?: {latitude: number | null; longitude: number | null; address?: string}
  searchable?: boolean;
  onLocationSelect?: (location: { latitude: number; longitude: number; address: string }) => void;
}

const MapComponent: React.FC<IMap> = ({ location, searchable = true, onLocationSelect }) => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState(location?.address || '');
  const [places, setPlaces] = useState<{ place_id: string; description: string }[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: location?.latitude ?? location?.latitude ?? 37.7749,
    longitude: location?.longitude ?? location?.longitude ?? -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    }
  }, [location]);

  const mapRef = useRef<MapView>(null);

  const searchPlaces = async (text: string) => {
    setQuery(text);
    if (text.length < 3) {
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAPS_API_KEY}&language=en`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.predictions) {
        setPlaces(data.predictions);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const selectPlace = async (placeId: string) => {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}&language=en`;

    try {
      const response = await fetch(detailsUrl);
      const data = await response.json();
      if (data.result) {
        const { geometry, formatted_address } = data.result;
        const { lat, lng } = geometry.location;

        const newLocation = { latitude: lat, longitude: lng, address: formatted_address };

        dispatch(setTreeData({ location: newLocation }));

        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }

        const newRegion = { latitude: lat, longitude: lng, latitudeDelta: 0.05, longitudeDelta: 0.05 };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);

        setPlaces([]);
        setQuery(formatted_address);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mapText}>Map</Text>

      {searchable && places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => selectPlace(item.place_id)}>
              <Text style={styles.text}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
      >
        {location?.latitude && location?.longitude && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}
        {searchable && (
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Search</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Search for an address"
                placeholderTextColor={'#FDF9F980'}
                value={query}
                onChangeText={searchPlaces}
                style={styles.input}
              />
              <SearchIcon />
            </View>
          </View>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    gap: 8,
  },
  mapText: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  map: {
    position: 'relative',
    width: '100%',
    height: 182,
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: colors.inputColor,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: '95%',
  },
  text: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  input: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionItem: {

  },
});

export default MapComponent;
