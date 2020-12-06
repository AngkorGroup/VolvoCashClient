import React, { useCallback } from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { theme, palette } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  selectDocumentTypeList,
  selectLoading,
} from 'utils/redux/ui/select-documents-screen/select-documents-screen-reducer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getDocumentsCall } from 'utils/redux/ui/select-documents-screen/select-documents-screen-actions';
import Divider from 'components/layout/Divider';
import { unit } from 'utils/responsive';

const SelectDocumentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(selectLoading);
  const documentTypes = useSelector(selectDocumentTypeList);
  console.log('documentTypes: ', documentTypes);

  const refresh = useCallback(() => {
    dispatch(getDocumentsCall());
  }, [dispatch]);

  useFocusEffect(refresh);

  return (
    <View style={styles.container}>
      <Header
        title="Selecciona un tipo de documento"
        alignment="left"
        leftButton={<BackButton />}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={styles.list}
        data={documentTypes}
        keyExtractor={(documentType) => documentType.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: documentType }) => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            containerStyle={styles.itemContainer}>
            <Text style={styles.itemText}>{documentType.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    ...theme.surface,
  },
  divider: {
    height: 1,
    width: '83%',
    alignSelf: 'flex-end',
    backgroundColor: palette.ocean,
  },
  fullDivider: {
    height: 1,
    alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: palette.ocean,
  },
  itemText: {
    ...theme.mediumLight,
    ...theme.primary,
    margin: unit(5),
  },
});

export default SelectDocumentScreen;
