import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

// const ListItem = (props) => {
//   const item = props.singleMedia;
//   return (
//     <TouchableOpacity>
//       <Image
//         style={{width: 100, height: 100}}
//         source={{uri: uploadsUrl + item.thumbnails?.w160}}
//       ></Image>
//       <View>
//         <Text>{item.title}</Text>
//         <Text>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

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
    flexDirection: 'row',
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    minHeight: 100,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
