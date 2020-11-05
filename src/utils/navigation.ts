import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import React, { createRef } from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> = createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}
