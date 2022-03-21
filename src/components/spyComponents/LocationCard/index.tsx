import {colors} from '@constants';
import {H1, H2, H3} from '@Typography';
import React, {useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SpyModalRoles} from '../SpyModalRoles';
import {styles} from './styles';

type LocationCardProps = {
  item: any;
};

export const LocationCard: React.FC<LocationCardProps> = ({item}) => {
  const {width} = useWindowDimensions();

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const {name, locations} = item;

  const showModal = (index: number) => {
    setVisible(true);
    setIndex(index);
  };

  const hideModal = () => setVisible(false);

  return (
    <>
      <SpyModalRoles
        visible={visible}
        hideModal={hideModal}
        locations={locations[index]}
      />
      <View style={{...styles.card, width: width - 40}}>
        <H1 fontWeight="600" style={styles.cardTitle}>
          {name}
        </H1>

        {locations.map((item: any, i: number) => (
          <View key={item.name} style={styles.locationItem}>
            <H2 style={styles.cardText}>{item.name}</H2>
            <TouchableOpacity onPress={() => showModal(i)}>
              <Icon name="happy" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};
