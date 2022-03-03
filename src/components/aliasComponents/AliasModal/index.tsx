import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {BlurView} from '@react-native-community/blur';
import {H1, H2, H3} from '@Typography';
import {IconButton} from '@ui';
import React from 'react';
import {Modal, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type AliasModalProps = {
  visible: boolean;
  team: any;
  teams: any;
  leftButton: (...args: any) => any;
  rightButton: (...args: any) => any;
};

export const AliasModal: React.FC<AliasModalProps> = ({
  visible,
  team,
  teams = [],
  leftButton,
  rightButton,
}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const color = darkTheme ? colors.white : colors.aliasBlack;
  const backgroundColor = darkTheme ? colors.dark : colors.white;

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalbg}>
        <BlurView style={styles.blur} blurAmount={10} />
        <View style={{...styles.winModal, backgroundColor}}>
          <View style={styles.headerWin}>
            <H1 style={{color: colors.white, textTransform: 'uppercase'}}>
              {team && team.team} won!
            </H1>
            <View style={styles.row}>
              <Icon name="star" size={30} color={colors.yellow} />
              <H1 fontWeight="600" style={{...styles.winScore}}>
                {team && team.points}
              </H1>
            </View>
          </View>

          <View style={{padding: 15}}>
            <H2 style={{color}}>Score:</H2>

            {teams.map((team: any) => (
              <View key={team.team} style={styles.teamItem}>
                <View style={styles.row}>
                  <H3 style={{color}}>{team.team}</H3>

                  <H2 style={{color}} fontWeight="600">
                    {team.points}
                  </H2>
                </View>
              </View>
            ))}

            <View style={styles.buttons}>
              <IconButton
                color={colors.white}
                style={styles.button}
                size={28}
                name="home-outline"
                onPress={leftButton}
              />
              <IconButton
                color={colors.white}
                style={{...styles.button, backgroundColor: colors.aliasBlack}}
                size={28}
                name="reload-outline"
                onPress={rightButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
