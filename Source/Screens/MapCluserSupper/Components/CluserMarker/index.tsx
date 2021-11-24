import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

const ClusterMarker = ({ cluser, onPress }) => {
    const { clusterId, coordinate, pointCount } = cluser;
    return (
        <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
            <View style={styles.Cluster}>
                <Text>
                    {pointCount}
                </Text>
            </View>
        </Marker>
    )
};

export default React.memo(ClusterMarker);
const styles = StyleSheet.create({
    Cluster: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }
});