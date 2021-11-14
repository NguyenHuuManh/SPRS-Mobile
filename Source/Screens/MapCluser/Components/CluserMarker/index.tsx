import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClusterMarker = (props) => {
    const { pointCount, clusterId } = props;
    return (
        <View style={styles.Cluster} key={clusterId}>
            <Text>{pointCount}</Text>
        </View>
    );
};

export default ClusterMarker;
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