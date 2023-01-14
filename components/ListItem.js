import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + item.thumbnails?.w160}} // ? - is checking if the thumbnails exist then it gets them but if they don't exist it just moves along. Suppresses the error if thumbnails don't exist
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  box: {
    flex: 1,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    minHeight: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
    paddingLeft: 5,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
