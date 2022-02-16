import React from 'react';

import {ProfileItemHeader} from '@components';
import {ProfileEditForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';

export const ProfileEditScreen: React.FC = () => {
  return (
    <Screen style={styles.container} type="ScrollView">
      <ProfileItemHeader
        title="Edit profile"
        description="Here you can change the name, email and avatar of your profile."
      />
      <ProfileEditForm onSubmit={() => {}} />
    </Screen>
  );
};
