import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';


const ListItem = (props) => {
  const item = props.singleMedia;
  return (
    <TouchableOpacity>
      <Image
        style={{width: 100, height: 100}}
        source={{uri: uploadsUrl + item.thumbnails?.w160}} // ? - is checking if the thumbnails exist then it gets them but if they don't exist it just moves along. Suppresses the error if thumbnails don't exist
      ></Image>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
